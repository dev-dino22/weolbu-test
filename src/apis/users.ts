import { joinAsPath } from '@utils/createUrl';
import { apiClient } from './apiClient';
import { accessToken } from '@domains/auth/login/utils/authStorage';

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

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: 'STUDENT' | 'INSTRUCTOR';
  };
};

export const users = {
  postSignUp: async (signUpData: SignUpRequest) => {
    const path = joinAsPath(BASE_PATH, 'signup');

    const data = await apiClient.post<SignUpResponse>(path, signUpData);

    if (!data) throw new Error('회원가입 응답이 없습니다');

    return data;
  },

  postLogin: async (loginData: LoginRequest) => {
    const path = joinAsPath(BASE_PATH, 'login');

    const data = await apiClient.post<LoginResponse>(path, loginData);

    if (!data) throw new Error('로그인 응답이 없습니다');

    accessToken.save(data.accessToken);

    return data;
  },
};
