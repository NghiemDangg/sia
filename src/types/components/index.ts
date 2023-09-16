import { ReactNode } from 'react';
import { ConfigItem } from '../api/config';

export type AppLayoutProps = {
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  locale?: string;
  children: ReactNode | JSX.Element;
  name_screen?: string;
};

export type NavLinkProps = {
  href: string;
};

export type ModalDefaultProps = {
  isOpen: boolean;
  onCancel: () => void;
};
export type ModalPromptAndAssistantProps = {
  // theme: string;
  topicName?: { name: string; id: number };
  onCancel: () => void;
  idChat?: string | null;
  handleOnClickTopic: (data: { left: number[]; right: number[]; message: string[]; descriptionVi: string }) => void;
  onGetAssistantContent: (assistantContent: string, assistantTitle: string) => void;
};

export type HistoryChatProps = {
  isOpenSideBar: boolean;
  closeSideBar: () => void;
  // getTheme: (theme: string) => void;
  chatScreenId: number;
};

export type ChatContentProps = {
  chatId: number;
  fistTimeRender: boolean;
  // theme: string;
};

export type ModalExpirationDateProps = {
  isOpen: boolean;
  onCancel: () => void;
};
