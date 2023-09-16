import { BaseResponse, ErrorResponse } from '..';

export type Topic = {
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
  titleEn: string;
  titleVi: string;
};

export type TopicInitialState = {
  pendingGetTopicList?: boolean;
  error?: boolean;
  responseTopicList?: BaseResponse<Topic[]>;
  responseError?: ErrorResponse;
};
