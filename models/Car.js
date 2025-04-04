// models/Car.js
const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    brand: {type: String, required: true},
    model: {type: String, required: true},
    year: {type: Number, required: true},
    category: {
        type: String,
        enum: ['SUV', 'Sedan', 'Hatchback', 'Convertible', 'Truck'],
        required: true,
    },
    pricePerDay: {type: Number, required: true},
    location: {type: String, required: true},
    available: {type: Boolean, default: true},
    image: {type: String}, // URL de la imagen del auto
});

module.exports = mongoose.model('Car', CarSchema);
