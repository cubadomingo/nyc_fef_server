import { Router } from 'express';
import { authenticate } from '../models/auth';

const router = Router();

router.post('/', (req, res, next) => {
  authenticate(req.body)
  .then((response) => {
    if (response === 'password is not valid') {
      const err = new Error(response);
      err.status = 404;
      next(err);
    } else {
      res.status(200).json({
        token: response
      });
    }
  })
  .catch((error) => {
    next(error);
  });
});

export default router;
