import mongoose from 'mongoose';

const takenDateTimeSchema = new mongoose.Schema({
  takenDates: {
    type: Array,
    required: [true, 'Date unset'],
  },
  takenTimes: {
    type: Array,
    required: [true, 'Time unset']
  }
}, {timestamps: true});

const TakenDateTime = mongoose.model('taken-datetime', takenDateTimeSchema);
export default TakenDateTime;