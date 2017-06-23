import { Router } from 'express';
import {
  getAll,
  getSingle,
} from '../models/scholarships';

const router = Router();

router.get('/', function(req, res, next) {
  getAll()
  .then((scholarships) => {
    res.status(200).json({ scholarships });
  });
});

router.get('/:id', function(req, res, next) {
  getSingle(req.params.id)
  .then((scholarship) => {
    res.status(200).json({ scholarship });
  })
  .catch((error) => {
    error.status = 404;
    next(error);
  });
});

export default router;
