import { BaseResponse, BaseResponsePromptCharacter } from ".."
  
export type Item ={
 titleVi: string
 descriptionVi: string
 id: number
 priority: number
}

export type PromptRequest ={
 page: number
 name?: string
 categoryId?: string | number
}

export type UsePrompt = {
    deleted: boolean
    createdAt: string
    updatedAt: string
    id: number
    titleEn: string
    titleVi: string
    descriptionEn: string
    descriptionVi: string
    categoryId: number
    numberUse: number
    priority: number
}

export type UsePromptRequest = {
    id: number
}
  
export type PromptInitialState = {
  pending?: boolean
  error?: boolean
  responsePromptList?: BaseResponsePromptCharacter<Item[]>
  responsePromptUsed?: BaseResponse<UsePrompt>
}