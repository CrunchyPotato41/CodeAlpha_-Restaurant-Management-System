const Reservation = require('../models/Reservation');
const Table = require('../models/Table');

// get all reservations and show table details
const getAllReservations = async (req, res) => {
  try {
    // populate tableId to get the actual table doc
    const reservations = await Reservation.find().populate('tableId');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error: error.message });
  }
};

// create a reservation
const createReservation = async (req, res) => {
  try {
    const { customerName, phone, tableId, date, time, partySize } = req.body;

    // check if it's already booked at this time
    const existingReservation = await Reservation.findOne({
      tableId,
      date,
      time,
      status: 'confirmed'
    });

    // if yes, block it
    if (existingReservation) {
      return res.status(400).json({ message: 'Table is not available at that date and time' });
    }

    // make it
    const newReservation = new Reservation({
      customerName,
      phone,
      tableId,
      date,
      time,
      partySize
    });

    const savedReservation = await newReservation.save();

    // mark table as reserved
    await Table.findByIdAndUpdate(tableId, { status: 'reserved' });

    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ message: 'Error creating reservation', error: error.message });
  }
};

// update reservation
const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;

    // update it
    const updatedReservation = await Reservation.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // if cancelled, free up the table
    if (updatedReservation.status === 'cancelled') {
      await Table.findByIdAndUpdate(updatedReservation.tableId, { status: 'available' });
    }

    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: 'Error updating reservation', error: error.message });
  }
};

module.exports = {
  getAllReservations,
  createReservation,
  updateReservation
};
