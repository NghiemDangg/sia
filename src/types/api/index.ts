export type ErrorResponse = {
  data: {
    message: string;
  };
  statusCode?: number;
  statusText?: string;
  status?: number;
};

export type ErrorMessage = {
  message: string;
  statusCode: number;
};

export type BaseResponse<T> = {
  data?: T;
  message: string;
  totalRecord?: number;
  records?: T;
};
export type BaseResponsePromptCharacter<T> = {
  items?: T;
  message: string;
  total?: number;
  records?: T;
};
export type BaseResponseChatItems<T> = BaseResponsePromptCharacter<T>;

export type CustomImg = {
  src: string;
  alt: string;
  height: number;
  width: number;
};
