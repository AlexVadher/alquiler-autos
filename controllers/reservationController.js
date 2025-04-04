const Reservation = require('../models/Reservervation.js');
const getLatestContract = require('../config/contracts.js');
const web3 = require('../config/web3'); // Importa web3 desde el archivo de configuración

const createReservation = async (req, res) => {
    try {
        const {user, car, startDate, endDate, totalPrice} = req.body;

        console.log('Datos recibidos:', req.body);

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0]; // Cuenta de Ganache
        console.log('Cuenta Ganache:', sender);

        // Convertir valores a los tipos esperados por el contrato
        const carId = car; // Mantener `car` como string
        const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000); // Convertir fecha de inicio a timestamp UNIX
        const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000); // Convertir fecha de fin a timestamp UNIX

        // Obtener contrato más reciente
        const contract = getLatestContract();

        const gasPrice = await web3.eth.getGasPrice(); // Obtiene el precio actual del gas
        console.log(
            'Precio de gas:',
            web3.utils.fromWei(gasPrice, 'gwei'),
            'Gwei',
        );

        // Estimar el gas necesario para la transacción
        const gas = await contract.methods
            .alquilarAuto(carId, startTimestamp, endTimestamp, totalPrice)
            .estimateGas({
                from: sender,
                value: web3.utils.toWei(totalPrice.toString(), 'ether'),
            });

        // Calcular el costo total de la transacción
        const totalCost =
            BigInt(gas) * BigInt(gasPrice) +
            BigInt(web3.utils.toWei(totalPrice.toString(), 'ether'));
        const balance = BigInt(await web3.eth.getBalance(sender));

        console.log('Gas estimado:', gas);
        console.log(
            'Costo total estimado:',
            web3.utils.fromWei(totalCost.toString(), 'ether'),
            'ETH',
        );
        console.log(
            'Saldo disponible:',
            web3.utils.fromWei(balance.toString(), 'ether'),
            'ETH',
        );

        if (balance < totalCost) {
            throw new Error(
                'Saldo insuficiente para cubrir el costo total de la transacción',
            );
        }

        // Realizar transacción en blockchain
        const result = await contract.methods
            .alquilarAuto(carId, startTimestamp, endTimestamp, totalPrice)
            .send({
                from: sender,
                value: web3.utils.toWei(totalPrice.toString(), 'ether'),
                gas,
                gasPrice, // Incluye el precio del gas
            });

        console.log('Transacción realizada:', result);

        // Convertir valores BigInt a Number antes de guardar en MongoDB
        const reservation = new Reservation({
            user,
            car: carId,
            startDate: startTimestamp,
            endDate: endTimestamp,
            totalPrice,
            transactionHash: result.transactionHash,
            gasFee: Number(result.gasUsed), // Convertir BigInt a Number
            gasLimit: Number(gas), // Convertir BigInt a Number
        });
        await reservation.save();

        res.status(201).json({success: true, reservation});
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).json({error: error.message});
    }
};

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({});
        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        res.status(500).json({error: error.message});
    }
};

module.exports = {createReservation, getReservations};
