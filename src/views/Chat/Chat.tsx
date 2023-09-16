import type { FC, WheelEvent } from 'react';

import { chatSelector, getAllConversations, getPageConversations } from '@/api/chat';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ChatContentProps } from '@/types/components';
import { useEffect, useRef, useState } from 'react';
import styles from './Chat.module.scss';
import { Button, Row, Spin } from 'antd';
import { log } from 'console';
import { Fade, Slide } from 'react-awesome-reveal';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { themeSelector } from '@/api/theme';

const ChatView: FC<ChatContentProps> = ({ chatId, fistTimeRender }) => {
  const dispatch = useAppDispatch();
  const { responseGetAllConversations, pendingNewConversationBot, responseNewConversation } =
    useAppSelector(chatSelector);
  const { theme } = useAppSelector(themeSelector);

  const [displayResponse, setDisplayResponse] = useState('');
  const [completedTyping, setCompletedTyping] = useState(true);
  const pageCurrent = useRef(0);
  const handleScrollChat = (e: WheelEvent<HTMLElement>) => {
    if (
      e.currentTarget.scrollTop === 0 &&
      responseGetAllConversations &&
      responseGetAllConversations.items &&
      responseGetAllConversations.items.length < Number(responseGetAllConversations?.total)
    ) {
      pageCurrent.current += 1;

      dispatch(getPageConversations({ page: pageCurrent.current, chatId: chatId }));
    }
  };

  const dataRender = () => {
    return (
      <div
        className={`${styles.boxChat} flex-1 overflow-auto mt-16 lg:mt-12`}
        id="box_chat"
        onWheel={(e) => handleScrollChat(e)}
      >
        <div
          id="list-chat"
          className={`overflow-hidden transform backdrop-blur-xl ${styles.boxChatList}`}
          style={{ opacity: '1', transform: 'none' }}
        >
          {responseGetAllConversations &&
            responseGetAllConversations.items &&
            responseGetAllConversations.items.map(({ content, role }, index, array) => (
              <div
                key={index}
                id={`item-chat-${index}`}
                className={`flex justify-center py-[20px] sm:py-[30px] ${
                  theme === 'dark' ? 'text-white' : 'text-[#343541]'
                } no-scrollbar ${
                  theme === 'dark'
                    ? role === 'user' || role === 'system'
                      ? styles.background_dark_user
                      : styles.background_dark_ai
                    : role === 'user' || role === 'system'
                    ? styles.background_light_user
                    : styles.background_light_ai
                }`}
                style={{ overflowWrap: 'anywhere' }}
              >
                <div className="w-full flex" style={{ padding: '0 15%' }}>
                  <div className={`mr-1 sm:mr-2 font-bold min-w-[40px]`}>
                    {role === 'user' || role === 'system' ? 'You:' : 'AI:'}
                  </div>
                  <div
                    className={`${
                      theme === 'dark' ? 'text-white' : 'text-[#343541]'
                    } prose prose-invert min-w-full pr-12 mt-[1px]`}
                  >
                    {role === 'assistant' &&
                    responseGetAllConversations.items &&
                    index === responseGetAllConversations.items.length - 1 ? (
                      <span
                        className={styles.typewriter}
                        dangerouslySetInnerHTML={{
                          __html: displayResponse.replaceAll('\n', '<br/>'),
                        }}
                      />
                    ) : (
                      <span
                        className={styles.typewriter}
                        dangerouslySetInnerHTML={{
                          __html: content.replaceAll('\n', '<br/>'),
                        }}
                      />
                    )}
                    {!completedTyping &&
                      role === 'assistant' &&
                      responseGetAllConversations.items &&
                      index === responseGetAllConversations.items.length - 1 && (
                        <svg viewBox="8 4 8 16" xmlns="http://www.w3.org/2000/svg" className={styles.cursor}>
                          <rect x="10" y="6" width="4" height="12" fill={theme === 'dark' ? '#fff' : '#000'} />
                        </svg>
                      )}
                  </div>
                </div>
              </div>
            ))}
          <div id="scroll-bottom"></div>
          {pendingNewConversationBot && !fistTimeRender && (
            <div
              className={`flex justify-center py-[20px] sm:py-[30px] ${
                theme === 'dark' ? 'text-white' : 'text-[#343541]'
              } no-scrollbar
              ${theme === 'dark' ? styles.background_dark_ai : styles.background_light_ai}
              `}
              style={{ overflowWrap: 'anywhere', padding: '30px 15%' }}
              id="pendingNewConversationBot"
            >
              <div className="w-full flex">
                <div className="mr-1 sm:mr-2 font-bold min-w-[40px]">
                  AI:{' '}
                  <svg viewBox="8 4 8 16" xmlns="http://www.w3.org/2000/svg" className={styles.cursor}>
                    <rect x="10" y="6" width="4" height="12" fill={theme === 'dark' ? '#fff' : '#000'} />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (responseGetAllConversations) {
      if (!fistTimeRender && responseNewConversation) {
        if (!responseGetAllConversations.items?.length) {
          return;
        }

        setCompletedTyping(false);

        let i = 0;
        const stringResponse = responseGetAllConversations.items[responseGetAllConversations.items.length - 1].content;

        const intervalId = setInterval(() => {
          setDisplayResponse(stringResponse.slice(0, i));

          i++;

          if (i > stringResponse.length) {
            clearInterval(intervalId);
            setCompletedTyping(true);
          }
        }, 35);

        return () => clearInterval(intervalId);
      } else {
        if (
          responseGetAllConversations.items &&
          responseGetAllConversations.items[responseGetAllConversations.items.length - 1]
        ) {
          setCompletedTyping(true);
          setDisplayResponse(responseGetAllConversations.items[responseGetAllConversations.items.length - 1]?.content);
        }
      }
    }
  }, [responseGetAllConversations, responseGetAllConversations?.items]);

  useEffect(() => {
    dispatch(getAllConversations({ page: 0, chatId: chatId }));

    setTimeout(() => {
      const element = document.getElementById(`scroll-bottom`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }, [chatId]);

  useEffect(() => {
    const element = document.getElementById(`pendingNewConversationBot`);

    if (element && pendingNewConversationBot) {
      element.scrollIntoView();
    }
  }, [pendingNewConversationBot]);

  return <>{dataRender()}</>;
};

export default ChatView;
