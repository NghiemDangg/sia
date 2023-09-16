import { BaseResponse, BaseResponsePromptCharacter } from '..';
export type Item = {
  titleVi: string;
  descriptionVi: string;
  id: number;
};
export type CharacterRequest = {
  page: number;
  name?: string;
  type?: number;
};

export type UseCharacter = {
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
  titleEn: string;
  titleVi: string;
  descriptionEn: string;
  descriptionVi: string;
  categoryId: number;
  numberUse: number;
};

export type UseCharacterRequest = {
  id: number;
};

export type CharacterInitialState = {
  pendingCharacter?: boolean;
  error?: boolean;
  responseCharacterList?: BaseResponsePromptCharacter<Item[]>;
  responseCharacterUsed?: BaseResponse<UseCharacter>;
  responseTabCharacter?: number;
};
