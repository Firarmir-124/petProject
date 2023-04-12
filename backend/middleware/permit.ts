import { NextFunction, Request, Response } from 'express';
import { RequestWitUser } from './authAnonymous';

const permit = (...roles: string[]) => {
  return (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as RequestWitUser;

    if (!req.user) {
      return res.status(401).send({ message: 'Unauthenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ message: 'Unauthorized' });
    }

    return next();
  };
};

export default permit;
