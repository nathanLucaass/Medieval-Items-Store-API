import { Request, Response } from 'express';
import login from '../services/login.services';

const loginController = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const response = await login(username, password);

  if (response.status === 'SUCCESS') {
    res.status(200).json(response.data);
  } 
  if (response.status === 'TYPEERROR') {
    res.status(400).json({ message: response.data });
  }
  if (response.status === 'ERROR') {
    res.status(401).json({ message: response.data });
  }
};

export default loginController;