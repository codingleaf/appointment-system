import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  appointmentDate: {
    type: String,
    required: [true, 'Pick a Date'],
  },
  appointmentTime: {
    type: String,
    required: [true, 'Pick a Time']
  },
  services: {
    type: Array,
    required: [true, 'Choose Service(s)']
  }
}, {timestamps: true});

const Appointment = mongoose.model('appointment', appointmentSchema);
export default Appointment;