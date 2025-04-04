const web3 = require('./web3');
const fs = require('fs');
const path = require('path');

const constractsPath = path.resolve(
    __dirname,
    '../artifacts/AlquilerAutos.json',
);

const contractJson = JSON.parse(fs.readFileSync(constractsPath, 'utf8'));
const abi = contractJson.abi;
const address = '0x294de91B9d33AEc20f974A4e9FF566473376A786';

// Función para obtener la instancia del contrato
const getLatestContract = () => {
    return new web3.eth.Contract(abi, address);
};

module.exports = getLatestContract;
