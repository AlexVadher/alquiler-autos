const express = require('express');

const {getAllCars, addCar} = require('../controllers/carController');

const router = express.Router();

router.get('/allCars', getAllCars);
router.post('/addCar', addCar);

module.exports = router;
