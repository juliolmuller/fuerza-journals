import { Response, Request } from 'miragejs';

import { User } from '../../../interfaces/user.interface';
import { handleErrors } from '../server';

function generateToken() {
  const randomFloatNumber = Math.random();
  const randomIntNumber = Math.floor(randomFloatNumber * Math.pow(10, 16));
  const randomHexNumber = randomIntNumber.toString(16);
  const randomSlicedHexNumber = randomHexNumber.slice(0, 8);

  return randomSlicedHexNumber;
}

export interface AuthResponse {
  token: string;
  user: User;
}

function login(schema: any, req: Request): AuthResponse | Response {
  const { username, password } = JSON.parse(req.requestBody);
  const user = schema.users.findBy({ username });
  if (!user) {
    return handleErrors(null, 'No user with that username exists');
  }
  if (password !== user.password) {
    return handleErrors(null, 'Password is incorrect');
  }
  const token = generateToken();
  return {
    user: user.attrs as User,
    token,
  };
}

function signup(schema: any, req: Request): AuthResponse | Response {
  const data = JSON.parse(req.requestBody);
  const exUser = schema.users.findBy({ username: data.username });
  if (exUser) {
    return handleErrors(null, 'A user with that username already exists.');
  }
  const user = schema.users.create(data);
  const token = generateToken();
  return {
    user: user.attrs as User,
    token,
  };
}

export default {
  login,
  signup,
};
