import * as appointmentController from '../controllers/appointment-controllers.js'
import { requireAuth } from '../middleware/auth-middleware.js';
import { Router } from 'express';
const router = Router();

router.get('/create-appointment', requireAuth, appointmentController.create_appointment_get);
router.post('/create-appointment', appointmentController.create_appointment_post);
router.delete('/create-appointment/:id', appointmentController.create_appointment_delete);
router.get('/appointment-details', requireAuth, appointmentController.appointment_details_get);
router.get('/admin-appointment-details', requireAuth, appointmentController.admin_appointment_details_get);

export default router;