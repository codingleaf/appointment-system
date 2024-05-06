import User from '../models/user-model.js';
import Appointment from '../models/appointment-model.js';
import jwt from 'jsonwebtoken';

export const create_appointment_get = (req, res) => res.render('create-appointment', { title: 'Create Appointment' });

export const create_appointment_post= async (req, res) => {
    let { appointmentDate, appointmentTime, services } = req.body;
    services = JSON.parse(services);
  
    let userID = null;
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.status(400);
        } else {
          let user = await User.findById(decodedToken.id);
          if (user) {
            userID = decodedToken.id;
            await Appointment.create({ userID, appointmentDate, appointmentTime, services });
            console.log(req.body);
            res.status(200).json(req.body);
          }
        }
      })
    } else {
      res.status(400);
    }
  };

export const appointment_details_get = (req, res) => res.render('appointment-details', { title: 'Appointment Details' });
export const admin_appointment_details_get= (req, res) => res.render('admin-appointment-details', { title: 'View All Appointments' });