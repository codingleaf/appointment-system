import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  appointmentDate: {
    type: Date,
    required: [true, 'Pick a valid Date and Time'],
  },
  services: {
    type: Array,
    required: [true, 'Choose Service(s)']
  }
}, {timestamps: true});

const Appointment = mongoose.model('appointment', appointmentSchema);
export default Appointment;