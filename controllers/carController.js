const Car = require('../models/Car');

const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({message: 'Error fetching cars', error});
    }
};

const addCar = async (req, res) => {
    try {
        const {
            brand,
            model,
            year,
            category,
            pricePerDay,
            location,
            available,
            image,
        } = req.body;
        const car = new Car({
            brand,
            model,
            year,
            category,
            pricePerDay,
            location,
            available,
            image,
        });
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {getAllCars, addCar};
