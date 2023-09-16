import { BaseResponse, BaseResponseChatItems } from '..';

export type NewChatRequest = {
  title: string;
};

export type NewChatResponse = {
  title: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  type?: string;
  id: number;
};

export type GetAllChatRequest = {
  page: number;
};

export type ChatItem = {
  deleted: boolean;
  createdAt: string;
  type?: string;
  updatedAt: string;
  id: number;
  title?: string;
  userId: number;
};

export type NewConversationRequest = {
  content: string;
  chatId: number;
  // userId: number;
  // type?: string;
};
export type NewConversationResponse = {
  role: string;
  type?: string;
  content: string;
  chatId: number;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  userId: number;
  id: number;
};

export type ConversationsRequest = {
  page: number;
  chatId: number;
};

export type ConversationItem = {
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
  role: string;
  content: string;
  chatId: number;
};

export type DeleteChatItemRequest = {
  id: number;
};

export type UpdateChatItemRequest = {
  title: string;
};

export type DeleteOrUpdateChatItemResponse = {
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
  title: string;
  userId: number;
};

export type ChatInitialState = {
  pending?: boolean;
  error?: boolean;
  pendingNewConversation?: boolean;
  pendingNewConversationBot?: boolean;
  responseNewChat?: BaseResponse<NewChatResponse>;
  responseGetAllChatItems?: BaseResponseChatItems<ChatItem[]>;
  responseMenuHistoryChat?: ChatItem[];
  responseMenuPage?: number;
  responseNewConversation?: BaseResponse<NewConversationResponse>;
  responseGetAllConversations?: BaseResponseChatItems<ConversationItem[]>;
  responseDeleteChatItem?: BaseResponse<DeleteOrUpdateChatItemResponse>;
  responseUpdateChatItem?: BaseResponse<DeleteOrUpdateChatItemResponse>;
};
