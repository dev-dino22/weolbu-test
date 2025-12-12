import { joinAsPath } from '@utils/createUrl';
import { apiClient } from './apiClient';

const BASE_PATH = 'users';

export type SignUpRequest = {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'STUDENT' | 'INSTRUCTOR';
};

export type SignUpResponse = {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: 'STUDENT' | 'INSTRUCTOR';
  message: string;
};

export const users = {
  postSignUp: async (signUpData: SignUpRequest) => {
    const path = joinAsPath(BASE_PATH, 'signup');

    const data = await apiClient.post<SignUpResponse>(path, signUpData);

    return data;
  },
};
