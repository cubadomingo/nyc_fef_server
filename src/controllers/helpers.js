import jwt from 'jsonwebtoken';

export const verifyToken = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.json({ message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({ message: 'No token provided.' });
  }
};

export const allowedParams = (whitelist) => {
  return function(req, res, next) {
    Object.keys(req.body).map((param) => {
      if (!whitelist.includes(param)) {
        const err = new Error('invalid param(s)');
        err.status = 404;
        next(err);
      }
    });
    next();
  };
};

export const requiredParams = (params) => {
  return function(req, res, next) {
    const validationErrors = [];

    for (const param of params) {
      if (!req.body[param]) {
        validationErrors.push(`${param} is required`);
      }
    }

    if (validationErrors.length > 0) {
      const err = new Error(validationErrors);
      err.status = 404;
      next(err);
    }
    next();
  };
};
