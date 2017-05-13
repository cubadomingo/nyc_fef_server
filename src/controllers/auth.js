import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from '../models/auth';

const router = Router();

router.post('/', (req, res, next) => {
  authenticate(req.body)
  .then((user) => {
    bcrypt.compare(req.body.password, user[0].password, (error, authenticated) => {
      if (authenticated) {
        const payload = {
          username: user[0].username
        };

        const token = jwt.sign(payload, process.env.SECRET, {
         expiresIn: '24h' // expires in 24 hours
       });

       res.status(200).json({
         success: true,
         token: token,
       });
     } else {
       res.status(404).json({
         message: 'password is not valid'
       });
     }
    });
  })
  .catch((error) => {
    next(error);
  });
});

export default router;
