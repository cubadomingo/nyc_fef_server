import { Router } from 'express';
import {
  getAll,
} from '../models/events';

const router = Router();

router.get('/', function(req, res, next) {
  getAll()
  .then((scholarships) => {
    res.status(200).json({ scholarships });
  });
});

export default router;
