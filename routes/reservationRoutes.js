const express = require('express');
const {
    createReservation,
    getReservations,
} = require('../controllers/reservationController');

const router = express.Router();

router.post('/create', createReservation);
router.get('/getall', getReservations);
module.exports = router;
