export type ActiveAccountRequest = {
  license: string;
  deviceKey: string;
};

export type ActiveAccountResponse = {
  message: string;
};

export type ActiveAccountInitialState = {
  pending?: boolean;
  error?: boolean;
  responseActiveAccount?: ActiveAccountResponse;
};
