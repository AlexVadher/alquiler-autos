const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
    contractName: String,
    address: String,
    deployedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Contract', ContractSchema);
