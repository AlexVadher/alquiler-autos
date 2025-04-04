const Contract = require('../models/Contract');

const getLatestContract = async (req, res) => {
    try {
        const latestContract = await Contract.findOne({
            contractName: 'CarRental',
        }).sort({deployedAt: -1});
        if (!latestContract) {
            return res
                .status(404)
                .json({error: 'No se encontró un contrato desplegado'});
        }
        res.json(latestContract);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {getLatestContract};
