'use client';
import type { HistoryChatProps } from '@/types/components';
import type { ChangeEvent, FC, UIEvent } from 'react';

import { Input, Popover } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, WheelEvent } from 'react';

import {
  chatSelector,
  deleteChatItem,
  getAllChatItems,
  getAllConversations,
  menuHistoryChat,
  resetDeleteChat,
  resetHistoryChat,
  updateChatItem,
} from '@/api/chat';
import { themeSelector, toggleTheme } from '@/api/theme';
import { DARK_MODE, KEY_CHAT_ITEM_DATA, LIGHT_MODE, PAGE_SIZE_TABLE } from '@/config/constants';

import checkIcon from '@/assets/icons/check-icon.svg';
import conversationIcon from '@/assets/icons/conversation-icon.svg';
import pencilIcon from '@/assets/icons/pencil-icon.svg';
import trashIcon from '@/assets/icons/trash-icon.svg';
import xIcon from '@/assets/icons/x-icon.svg';
import { useAppDispatch, useAppSelector, useDebouncedCallback, useResize } from '@/hooks';
import styles from './HistoryChat.module.scss';

import { ChatItem } from '@/types/api/chat';
import { authLogout, authSelector, changeAuthInformation } from '@/api/auth';

const KEY_EDIT = 'KEY_EDIT';
const KEY_DELETE = 'KEY_DELETE';

const HistoryChat: FC<HistoryChatProps> = ({ isOpenSideBar, closeSideBar, chatScreenId }) => {
  const [isEditChatItem, setIsEditChatItem] = useState(0);
  const [isDeleteChatItem, setIsDeleteChatItem] = useState(0);
  const [itemSelected, setItemSelected] = useState(0);
  const [editValue, setEditValue] = useState('');
  const [typeAction, setTypeAction] = useState('');
  const dispatch = useAppDispatch();
  const { responseAuthLogin } = useAppSelector(authSelector);
  const {
    responseGetAllChatItems,
    responseNewChat,
    responseUpdateChatItem,
    responseDeleteChatItem,
    responseMenuHistoryChat,
    responseMenuPage,
  } = useAppSelector(chatSelector);
  const { theme } = useAppSelector(themeSelector);
  const router = useRouter();
  const pageChatCurrent = useRef<number>(0);

  const handleSwitchTheme = () => {
    dispatch(toggleTheme(theme === DARK_MODE ? LIGHT_MODE : DARK_MODE));
  };

  const handSrollList = (e: UIEvent<HTMLDivElement>): void => {
    if (
      (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight - 100 ||
        e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight - 100) &&
      responseGetAllChatItems
    ) {
      if (
        Number(responseGetAllChatItems.total) >= 0 &&
        Number(responseGetAllChatItems.total) > PAGE_SIZE_TABLE * pageChatCurrent.current
      ) {
        debounceHistory();
      }
    }
  };

  const debounceHistory = useDebouncedCallback(() => {
    pageChatCurrent.current += 1;
    dispatch(
      getAllChatItems({
        page: pageChatCurrent.current,
      }),
    );
  }, 200);

  const handleConfirmActionsChatItem = (keyAction: string, id: number) => {
    if (keyAction === KEY_EDIT) {
      setIsEditChatItem(id);
      setIsDeleteChatItem(0);
      setTypeAction(keyAction);
    } else {
      setIsDeleteChatItem(id);
      setIsEditChatItem(0);
      setTypeAction(keyAction);
    }
  };

  const OnchangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const handleSelectItem = (id: number, title?: string) => {
    if (id === 0) {
      router.push(`/newchat`);
    } else {
      router.push(`/chat-history?id=${id}`);
      setItemSelected(id);
      dispatch(getAllConversations({ page: 0, chatId: id }));
      window.localStorage.setItem(KEY_CHAT_ITEM_DATA, JSON.stringify({ id: id, title: title }));
    }
  };
  console.log(responseGetAllChatItems);

  const handleEditTitleChatItem = (title: string, id: number) => {
    dispatch(updateChatItem({ payload: { title: title }, id: id }));
    if (responseGetAllChatItems && responseGetAllChatItems.items) {
      Object.freeze(responseGetAllChatItems.items);
      const dataItem: ChatItem[] = [...responseGetAllChatItems.items];
      const obj = responseGetAllChatItems.items[responseGetAllChatItems.items.findIndex((x) => x.id === id)];
      Object.freeze(obj);
      const objCopy = { ...obj };
      objCopy.title = editValue;
      dataItem[responseGetAllChatItems.items.findIndex((x) => x.id === id)] = objCopy;
      dispatch(menuHistoryChat(dataItem));
    }
    setTypeAction('');
    setIsEditChatItem(0);
    setEditValue('');
  };

  const handleDeleteTitleChatItem = (id: number) => {
    dispatch(deleteChatItem({ id: id }));
    if (responseGetAllChatItems && responseGetAllChatItems.items) {
      Object.freeze(responseGetAllChatItems.items);
      const dataItem: ChatItem[] = [...responseGetAllChatItems.items.filter((x) => x.id !== id)];
      dispatch(menuHistoryChat(dataItem));
    }
    setTypeAction('');
    setIsEditChatItem(0);
    setIsDeleteChatItem(0);
  };

  const onCancelAction = () => {
    setIsEditChatItem(0);
    setIsDeleteChatItem(0);
    setTypeAction('');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    dispatch(toggleTheme(String(window.localStorage.getItem('theme') ?? 'dark')));

    if (responseMenuPage) {
      pageChatCurrent.current = responseMenuPage;
    }
  }, []);

  useEffect(() => {
    if (responseDeleteChatItem) {
      router.push(`/newchat`);
      dispatch(resetDeleteChat());
    }
  }, [responseDeleteChatItem]);

  useEffect(() => {
    dispatch(getAllChatItems({ page: pageChatCurrent.current }));
    setItemSelected(chatScreenId);
    dispatch(changeAuthInformation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseNewChat, responseUpdateChatItem]);

  return (
    <nav className={`${styles.sidebar} ${isOpenSideBar ? styles['sidebar-open'] : styles['sidebar-close']}`}>
      <div className={styles.sidebar_box}>
        <div className={`flex items-center justify-between ${styles.sidebar__top}`}>
          {/* <div className="flex justify-center items-center gap-2 lg:pt-4 pb-2">
            <h1 className={`text-white text-2xl font-bold`}>SIA</h1>
          </div> */}

          <div
            className={styles.sidebar__newchat}
            onClick={() => {
              handleSelectItem(0);
            }}
          >
            <span>+</span>
            <span>New chat</span>
          </div>

          <div className={styles.sidebar__toggle} onClick={closeSideBar}>
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="h-4 w-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </div>
        </div>

        <div className={styles.sidebar__middle} onScroll={handSrollList}>
          {isOpenSideBar ? (
            <div className={styles.sidebar__middle_list}>
              {responseGetAllChatItems?.items?.map((item, index) => (
                <button
                  onClick={() => handleSelectItem(item.id, item.title)}
                  key={index}
                  className={`flex items-center gap-3 justify-start min-h-[40px] dark:hover:bg-slate-800 hover:bg-slate-700 cursor-pointer ${
                    item.id === itemSelected ? 'dark:bg-[#2A2B32] bg-[#343541] bg-slate-700' : ''
                  }`}
                  style={item.id === itemSelected ? { background: '#343541' } : {}}
                >
                  <Image
                    src={conversationIcon}
                    width="18"
                    height="18"
                    alt="conversationIcon"
                    // className="mr-2 min-w-[20px]"
                  />
                  {isEditChatItem === item.id ? (
                    <Input
                      // className="flex-1 bg-transparent border-b border-neutral-400 focus:border-neutral-100 text-left overflow-hidden overflow-ellipsis pr-1 outline-none text-white"
                      type="text"
                      value={editValue !== '' ? editValue : item.title}
                      onChange={OnchangeInput}
                    />
                  ) : (
                    <div className="overflow-hidden whitespace-nowrap overflow-ellipsis pr-1 flex-1 text-left">
                      <span>{item.title}</span>
                    </div>
                  )}
                  {itemSelected === item.id ? (
                    <div className="flex w-[40px] mr-0">
                      {isEditChatItem === item.id || isDeleteChatItem === item.id ? (
                        <Image
                          onClick={
                            typeAction === KEY_EDIT
                              ? () => handleEditTitleChatItem(editValue, item.id)
                              : () => handleDeleteTitleChatItem(item.id)
                          }
                          src={checkIcon}
                          width="18"
                          height="18"
                          alt="pencilIcon"
                          className="mr-2 min-w-[20px]"
                        />
                      ) : (
                        <Image
                          onClick={() => {
                            handleConfirmActionsChatItem(KEY_EDIT, item.id);
                          }}
                          src={pencilIcon}
                          width="18"
                          height="18"
                          alt="pencilIcon"
                          className="mr-2 min-w-[20px]"
                        />
                      )}
                      {isDeleteChatItem === item.id || isEditChatItem === item.id ? (
                        <Image
                          src={xIcon}
                          width="18"
                          height="18"
                          alt="xIcon"
                          className=" min-w-[20px] text-neutral-400 hover:text-neutral-100"
                          onClick={onCancelAction}
                        />
                      ) : (
                        <Image
                          onClick={() => {
                            handleConfirmActionsChatItem(KEY_DELETE, item.id);
                          }}
                          src={trashIcon}
                          width="18"
                          height="18"
                          alt="trashIcon"
                          // className="min-w-[20px] text-neutral-400 hover:text-neutral-100"
                        />
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <>
              {/* <div className="w-full h-full mt-4 flex justify-center items-center">
                <svg
                  aria-hidden="true"
                  className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div> */}
            </>
          )}
        </div>

        <div className={styles.switch_theme_container}>
          <label className={styles.switch}>
            <span className={styles.sun}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g fill="#000">
                  <circle r="5" cy="12" cx="12"></circle>
                  <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path>
                </g>
              </svg>
            </span>

            <span className={styles.moon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
              </svg>
            </span>

            <Input type="checkbox" className={styles.input} onClick={handleSwitchTheme} />
            <span className={`${theme === DARK_MODE ? styles.slider_dark : styles.slider_light}`}></span>
          </label>
        </div>

        <div className={styles.button_logout}>
          <Popover
            content={
              <div
                onClick={() => {
                  dispatch(authLogout());
                  router.push('/login');
                }}
                style={{ cursor: 'pointer', width: '100%' }}
              >
                Đăng xuất
              </div>
            }
            placement="topLeft"
            trigger="click"
            rootClassName="popover_logout"
          >
            <div className={styles.image_name}>{responseAuthLogin?.name.substring(0, 2)}</div>
            <div className={styles.text_email}>{responseAuthLogin?.email}</div>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default HistoryChat;
