import { Router } from 'express';
import { authenticate } from '../models/auth';

const router = Router();

router.post('/', (req, res, next) => {
  authenticate(req.body)
  .then((response) => {
    if (response instanceof Error) {
      const err = response;
      err.status = 404;
      next(err);
    } else {
      res.status(200).json({
        token: response
      });
    }
  });
});

export default router;
