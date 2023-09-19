import { Request, Response, NextFunction } from 'express';

const nameValidator = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  console.log(name);

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (typeof name !== 'string') {
    return res.status(422).json({ message: '"name" must be a string' });
  }
  if (name.length < 4) {
    return res.status(422).json({ message: '"name" length must be at least 3 characters long' });
  }

  next();
};

const priceValidator = (req: Request, res: Response, next: NextFunction) => {
  const { price } = req.body;
  
  if (!price) {
    return res.status(400).json({ message: '"price" is required' });
  }
  if (typeof price !== 'string') {
    return res.status(422).json({ message: '"price" must be a string' });
  }
  if (price.length < 4) {
    return res.status(422).json({ message: '"price" length must be at least 3 characters long' });
  }
  next();
};

export { nameValidator, priceValidator };