export type AuthLoginRequest = {
  username: string;
  password: string;
};

export interface AuthLoginResponse {
  success: boolean;
  data: string;
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
  username: string;
  password: string;
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
  userId: string;
  otp: number;
};
export type OtpResponse = {
  success: boolean;
  message: string;
};

export interface Authority {
  authorityName: string;
}

export type SignUpSuccess = {
  success: boolean;
  data: string;
};

export type AuthInitialState = {
  pending?: boolean;
  error?: boolean;
  responseAuthLogin?: AuthLoginResponse;
  responseSendOTP?: OtpResponse;
  responseSignUp?: SignUpSuccess;
};
