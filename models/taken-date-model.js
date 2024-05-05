import mongoose from 'mongoose';

const takenDateTimeSchema = new mongoose.Schema({
  takenDate: {
    type: Date,
    required: [true, 'Date unset'],
  },
  takenTime: {
    type: Date,
    required: [true, 'Time unset']
  }
}, {timestamps: true});

const TakenDateTime = mongoose.model('taken-datetime', takenDateTimeSchema);
export default TakenDateTime;