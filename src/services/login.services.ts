import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { TokenPayload } from '../types/Token';
import generateToken from './token.services';

type LoginResponse = {
  status: 'SUCCESS',
  data: TokenPayload
} | {
  status: 'ERROR' | 'TYPEERROR', data: string
};

const login = async (username: string, password: string): Promise<LoginResponse> => {
  if (!username || !password) {
    return { status: 'TYPEERROR', data: '"username" and "password" are required' };
  }

  const user = await UserModel.findOne({ where: { username } });
  
  if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
    return { status: 'ERROR', data: 'Username or password invalid' };
  }

  const token = generateToken(username, password);
  return { status: 'SUCCESS', data: token };
};

export default login;