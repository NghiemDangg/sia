import { BaseResponse } from '..';

export type AuthLoginRequest = {
  email?: string;
  password?: string;
  name?: string;
  deviceKey?: string;
};

export interface AuthLoginResponse {
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  email: string;
  idOpenAi: any;
  isAccept: boolean;
  role: number;
  password: string;
  token: string;
  expirationDate: string;
}

export interface User {
  id: number;
  code: any;
  name: string;
  gender: string;
  birthday: string;
  email: string;
  phone: string;
  socialFacebookId: string;
  socialGoogleId: string;
  password: string;
  medias: any;
  address: string;
  verified: boolean;
  authorities: Authority[];
  departmentalId: any;
  position: any;
  joinDate: any;
  mediaId: any;
  status: any;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

export type Register = {
  name: string;
  email: string;
  password: string;
  deviceKey: string;
};

export type RegisterResponse = {
  name: string;
  email: string;
  isAccept: boolean;
  role: number;
  password: string;
  createdAt: string;
  updatedAt: string;
  idOpenAi: any;
  deleted: boolean;
  id: number;
};

export type OtpRequest = {
  email: string;
  code?: string;
  otpType: number;
  password?: string;
};

export type ProfileRequest = {
  name: string;
  phone: string;
  email: string;
  gender: string;
  birthday: string;
};

export interface UpdateProfileResponse {
  id: number;
  code: any;
  name: string;
  gender: string;
  birthday: string;
  email: string;
  phone: string;
  socialFacebookId: string;
  socialGoogleId: string;
  password: string;
  medias: any;
  address: string;
  verified: boolean;
  authorities: Authority[];
  departmentalId: any;
  position: any;
  joinDate: any;
  mediaId: any;
  status: any;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

export interface Authority {
  authorityName: string;
}

export type GoogleRequest = {
  accessToken?: string;
};

export type CheckAccountRequest = {
  email: string;
  idOpenAi: string;
  deviceKey: string;
};

export type CheckAccountResponse = {
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
  email: string;
  idOpenAi: string;
  isAccept: boolean;
  role: number;
  password: any;
  token: string;
  expirationDate: string;
};

export type SignUpSuccess = {
  name: string;
  email: string;
  isAccept: boolean;
  role: number;
  password: string;
  createdAt: string;
  updatedAt: string;
  idOpenAi: any;
  deleted: boolean;
  id: number;
};

export type AuthInitialState = {
  pending?: boolean;
  error?: boolean;
  // responseAgentSignUp?: AgentSignUpResponse;
  responseAuthLogin?: AuthLoginResponse;
  // responseCheckOTP?: AgentSignUpResponse;
  // responseSendOTP?: AgentSignUpResponse;
  // responseRecovery?: AgentSignUpResponse;
  responseSignUp?: SignUpSuccess;
  responseCheckAccount?: BaseResponse<CheckAccountResponse>;
};
