'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';

import { Carousel, Col, Form, Row, Select } from 'antd';
import Image from 'next/image';

import { getTopicList, topicSelector } from '@/api/topic';
import { useAppDispatch, useAppSelector, useResize } from '@/hooks';

import { HistoryChat } from '../HistoryChat';

import { configSelector, getConfig } from '@/api/config';
import { getPrompt } from '@/api/prompt';
import sendIconWhite from '@/assets/icons/send-icon(white).svg';
import sendIconBlack from '@/assets/icons/send-icon.svg';

import { addNewChat, chatSelector, createNewChat, createNewConversation, createNewConversationV2 } from '@/api/chat';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NewChat.module.scss';

import { characterSelector } from '@/api/character';
import { ModalPromptAndAssistant } from '@/components/ModalPromptAndAssistant';
import { KEY_TAB_PROMPT } from '@/components/ModalPromptAndAssistant/ModalPromptAndAssitant';
import { DARK_MODE, KEY_CHAT_ITEM_DATA } from '@/config/constants';
import { ConfigItem } from '@/types/api/config';
import { arrayIndexBracket } from '@/utils';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { ChatView } from '../Chat';
import { themeSelector } from '@/api/theme';

const KEY_CONFIG_LANGUAGE = 'KEY_CONFIG_LANGUAGE';
const KEY_CONFIG_DETAIL = 'KEY_CONFIG_DETAIL';
const KEY_CONFIG_STYLE = 'KEY_CONFIG_STYLE';
const KEY_CONFIG_TONE = 'KEY_CONFIG_TONE';
const KEY_NEW_CHAT = 0;
const KEY_ENTER_SEND_CHAT = 'Enter';

const NewChat: FC<{ idChat?: string | null; fistTime?: string | null }> = ({ idChat, fistTime }) => {
  const [form] = Form.useForm();
  const { responseTopicList } = useAppSelector(topicSelector);
  const { responseConfig } = useAppSelector(configSelector);
  const { responseTabCharacter } = useAppSelector(characterSelector);
  const { theme } = useAppSelector(themeSelector);
  const { responseNewChat, responseNewConversation } = useAppSelector(chatSelector);
  const dispatch = useAppDispatch();
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(true);
  // const [theme, setTheme] = useState('dark');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topicName, setTopicName] = useState<{ name: string; id: number }>();
  const [configData, setConfigData] = useState({
    language: 'Tiếng Việt',
    detail: 'Mặc định',
    style: 'Mặc định',
    tone: 'Mặc định',
  });
  const [valueInput, setValueInput] = useState('');
  const [chatScreenId, setChatScreenId] = useState(KEY_NEW_CHAT);
  // const [dataUser, setDataUser] = useState<AuthLoginResponse | undefined>();
  const [dataChatItem, setDataChatItem] = useState<{ id: number; title: string }>();
  const [dataSelectedTopic, setDataSelectedTopic] = useState<{
    left: number[];
    right: number[];
    message: string[];
    descriptionVi: string;
  }>();
  const [fistTimeRender, setFistTimeRender] = useState(true);
  const [assistantContent, setAssistantContent] = useState({ title: '', content: '' });
  const router = useRouter();
  const { screenWidth } = useResize();

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModalPromptAndAssistant = (id: number, topicName: string) => {
    setIsModalOpen(true);
    setTopicName({ name: topicName, id });
    dispatch(
      getPrompt({
        page: 0,
        categoryId: id,
      }),
    );
  };

  const handleChatConfig = (data: string, type: string) => {
    switch (type) {
      case KEY_CONFIG_LANGUAGE:
        setConfigData((prevState) => ({ ...prevState, language: data }));
        break;
      case KEY_CONFIG_DETAIL:
        setConfigData((prevState) => ({ ...prevState, detail: data }));
        break;
      case KEY_CONFIG_STYLE:
        setConfigData((prevState) => ({ ...prevState, style: data }));
        break;
      case KEY_CONFIG_TONE:
        setConfigData((prevState) => ({ ...prevState, tone: data }));
        break;
      default:
        return;
    }
  };

  // const getTheme = (theme: string) => {
  //   setTheme(theme);
  // };

  const openSideBar = () => {
    setIsOpenSideBar(true);
  };
  const closeSideBar = () => {
    setIsOpenSideBar(false);
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
  };

  const arrayConcat = (data1: string[], data2: string[], data3: string[]) => {
    const value = [];

    for (let index = 0; index < data1.length; index++) {
      value.push(data1[index]?.trim());
      value.push(data2[index] && data2[index].trim().length > 0 ? data2[index] : data3[index]);
    }

    return value;
  };

  const renderValueInpur = (data: string) => {
    var dataRender = [];
    var dataBracket = [];

    for (let index = 0; index < arrayIndexBracket(data).left.length; index++) {
      if (index === 0) {
        dataRender.push(data.slice(0, arrayIndexBracket(data).left[0] - 1));
        dataRender.push(
          data.slice(arrayIndexBracket(data).right[index] + 1, arrayIndexBracket(data).left[index + 1] - 1),
        );
      } else if (index === arrayIndexBracket(data).left.length - 1) {
        dataRender.push(data.slice(arrayIndexBracket(data).right[index] + 1, data.length));
      } else {
        dataRender.push(
          data.slice(arrayIndexBracket(data).right[index] + 1, arrayIndexBracket(data).left[index + 1] - 1),
        );
      }

      dataBracket.push(data.slice(arrayIndexBracket(data).left[index], arrayIndexBracket(data).right[index] + 1));
    }

    if (arrayIndexBracket(data).left.length === 1) {
      dataRender.push(data.slice(arrayIndexBracket(data).right[0] + 1, data.length - 1));
    }

    const valueInputData = arrayConcat(
      dataRender,
      arrayIndexBracket(data).left?.map((indexKey) => form.getFieldValue(`input-text-${indexKey}`)?.trim()),
      dataBracket,
    ).join(' ');

    return valueInputData;
  };

  const onChangeSelectTopicInput = (value: number, data: string) => {
    setValueInput(renderValueInpur(data));
  };

  const handleGetAssistantContent = (assistantContent: string, assistantTitle: string) => {
    setAssistantContent({ content: assistantContent, title: assistantTitle });
  };

  const sendChat = (key: string) => {
    if (valueInput !== '' || assistantContent.content !== '') {
      if (key === KEY_ENTER_SEND_CHAT) {
        setFistTimeRender(false);
        if (Number(idChat ?? KEY_NEW_CHAT) === KEY_NEW_CHAT) {
          dispatch(createNewChat({ payload: { title: valueInput !== '' ? valueInput : assistantContent.title } }));
        } else {
          if (responseConfig) {
            const indexTone = responseConfig.tone.findIndex((o) => o.vi == configData.tone);
            const indexStyle = responseConfig.style.findIndex((o) => o.vi == configData.style);
            const indexDetail = responseConfig.detail.findIndex((o) => o.vi == configData.detail);

            const contentValueInput =
              (valueInput !== '' ? valueInput : assistantContent.content) +
              `. Vui lòng phản hồi bằng ngôn ngữ ${configData.language}` +
              `${indexTone && indexTone > 0 ? `,giọng điệu ${configData.tone}` : ''}` +
              `${indexStyle && indexStyle > 0 ? `,phong cách ${configData.style}` : ''}` +
              `${indexDetail && indexDetail > 0 ? `. Trả lời ${configData.detail}` : ''}`;

            dispatch(
              addNewChat({
                chatId: Number(idChat ?? KEY_NEW_CHAT),
                content: contentValueInput,
                type: undefined,
                createdAt: dayjs().format(),
                deleted: false,
                id: Number(responseNewChat?.data?.userId),
                role: 'user',
                updatedAt: dayjs().format(),
                userId: 0,
              }),
            );
            dispatch(
              createNewConversation({
                payload: {
                  chatId: Number(idChat ?? KEY_NEW_CHAT),
                  content: contentValueInput,
                },
              }),
            );
            // dispatch(
            //   createNewConversationV2({
            //     payload: {
            //       chatId: Number(idChat ?? KEY_NEW_CHAT),
            //       content: contentValueInput,
            //     },
            //   }),
            // );
            form.resetFields();
            setValueInput('');

            setDataSelectedTopic(undefined);
          }
        }
      }
    }
  };

  const handleChangeChatScreen = (chatId: number) => {
    setChatScreenId(chatId);
    setIsModalOpen(true);
    router.push(`/chat-history?id=${chatId}&fistTimeRender=false`);
  };

  const handleOnClickTopic = (data: { left: number[]; right: number[]; message: string[]; descriptionVi: string }) => {
    setDataSelectedTopic(data);
    setTopicName(undefined);
  };

  const renderList = (data: ConfigItem[], key: string) => {
    return (
      <Col
        span={screenWidth < 1024 ? 8 : 5}
        className={theme === 'dark' ? styles.selector_dark : styles.selector_light}
      >
        <Select
          defaultValue="Mặc định"
          suffixIcon={
            <FontAwesomeIcon className={`${theme === 'dark' ? 'text-white' : 'text-[#343541]'}`} icon={faChevronDown} />
          }
          onChange={(value) => handleChatConfig(value, key)}
          style={{
            boxShadow: '0 0 15px rgba(0,0,0,0.1)',
          }}
          className="shadow-xs dark:shadow-xs"
        >
          {data.map(({ vi }, index) => (
            <Select.Option key={index} value={vi}>
              {vi}
            </Select.Option>
          ))}
        </Select>
      </Col>
    );
  };

  useEffect(() => {
    if (
      responseNewChat &&
      responseConfig &&
      responseNewChat.data &&
      (valueInput !== '' || assistantContent.content !== '')
    ) {
      const indexTone = responseConfig.tone.findIndex((o) => o.vi == configData.tone);
      const indexStyle = responseConfig.style.findIndex((o) => o.vi == configData.style);
      const indexDetail = responseConfig.detail.findIndex((o) => o.vi == configData.detail);

      const contentValueInput =
        (valueInput !== '' ? valueInput : assistantContent.content) +
        `. Vui lòng phản hồi bằng ngôn ngữ ${configData.language}` +
        `${indexTone && indexTone > 0 ? `,giọng điệu ${configData.tone}` : ''}` +
        `${indexStyle && indexStyle > 0 ? `,phong cách ${configData.style}` : ''}` +
        `${indexDetail && indexDetail > 0 ? `. Trả lời ${configData.detail}` : ''}`;

      dispatch(
        addNewChat({
          chatId: Number(idChat ?? KEY_NEW_CHAT),
          content: contentValueInput,
          type: 'new',
          createdAt: dayjs().format(),
          deleted: false,
          id: Number(responseNewChat?.data?.userId),
          role: 'user',
          updatedAt: dayjs().format(),
          userId: 0,
        }),
      );

      dispatch(
        createNewConversation({
          payload: {
            chatId:
              Number(idChat ?? KEY_NEW_CHAT) === KEY_NEW_CHAT ? Number(responseNewChat?.data?.id) : Number(idChat ?? 0),
            content: contentValueInput,
          },
        }),
      );

      handleChangeChatScreen(responseNewChat.data.id);
    }
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseNewChat]);

  useEffect(() => {
    dispatch(getTopicList());
    dispatch(getConfig());
    // if (window.localStorage.getItem(KEY_AUTH_INFO)) {
    //   setDataUser(JSON.parse(String(window.localStorage.getItem(KEY_AUTH_INFO))));
    // }
    // if (window.localStorage.getItem(KEY_SELECTED_CONVERSATION_DATA)) {
    //   setDataSelectedConversation(JSON.parse(String(window.localStorage.getItem(KEY_SELECTED_CONVERSATION_DATA))));
    // }
    if (window.localStorage.getItem(KEY_CHAT_ITEM_DATA)) {
      setDataChatItem(JSON.parse(String(window.localStorage.getItem(KEY_CHAT_ITEM_DATA))));
    }
    setIsModalOpen(window.location.href.includes('/chat-history'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (responseNewConversation) {
      setValueInput('');

      setDataSelectedTopic(undefined);
    }
  }, [responseNewConversation]);

  useEffect(() => {
    setChatScreenId(dataChatItem ? dataChatItem.id : KEY_NEW_CHAT);
  }, [dataChatItem]);

  useEffect(() => {
    if (assistantContent.content !== '') {
      sendChat(KEY_ENTER_SEND_CHAT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assistantContent]);

  useEffect(() => {
    if (dataSelectedTopic && dataSelectedTopic.descriptionVi) {
      setValueInput(renderValueInpur(dataSelectedTopic.descriptionVi));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSelectedTopic]);
  useEffect(() => {
    if (idChat) {
      setFistTimeRender(fistTime === 'false' ? false : true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idChat]);

  return (
    <div
      className="flex h-screen text-white relative"
      style={{
        background: theme === 'dark' ? '#343541' : '#fff',
        flexDirection: screenWidth < 1024 ? 'column' : 'row',
      }}
    >
      <HistoryChat
        isOpenSideBar={isOpenSideBar}
        closeSideBar={closeSideBar}
        // getTheme={getTheme}
        chatScreenId={chatScreenId}
      />
      {(screenWidth < 1024 ? true : !isOpenSideBar) && (
        <div
          className={`${styles.sidebar__toggle} ${theme === 'dark' ? styles.icon_menu_dark : styles.icon_menu_light}`}
          onClick={openSideBar}
        >
          <svg
            stroke={`${theme === 'dark' ? 'currentColor' : '#000'}`}
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
      )}

      <div
        style={{
          marginLeft: isOpenSideBar ? (screenWidth && screenWidth < 1024 ? 0 : 260) : 0,
          height: screenWidth < 1024 ? 'calc(100% - 82px)' : 'auto',
        }}
        className="w-full h-full relative"
      >
        {/* <div className="absolute top-[0px] w-full h-screen overflow-hidden pointer-events-none">
          <div className="relative w-full max-w-lg mx-auto mt-96">
            <div className="absolute top-0 w-64 h-64 bg-indigo-300 rounded-full -left-4 filter blur-3xl opacity-20 sm:opacity-30 animate-blob"></div>
            <div className="absolute top-0 rounded-full w-72 h-72 bg-sky-300 -right-4 filter blur-3xl opacity-20 sm:opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute rounded-full w-72 h-72 bg-emerald-300 -bottom-8 left-20 filter blur-3xl opacity-20 sm:opacity-30 animate-blob animation-delay-4000"></div>
          </div>
        </div> */}
        <div className="w-full h-full flex flex-col dark:bg-[#343541]" style={{ justifyContent: 'end' }}>
          {Number(idChat ?? 0) === KEY_NEW_CHAT ? (
            (screenWidth > 1024 ? valueInput === '' || !isModalOpen : !isModalOpen) && (
              <div
                className={` ${screenWidth < 1024 ? '' : 'flex-1 no-scrollbar'}`}
                style={screenWidth < 1024 ? { height: 'calc(100% - 100px)', overflow: 'scroll' } : {}}
              >
                <div className={`sm:pb-10 ${screenWidth < 1024 ? '' : 'pt-10'}`}>
                  {/* <h1 className="max-w-xl mx-auto mt-2 mb-8 sm:mt-10 sm:mb-10 text-3xl font-semibold tracking-tighter text-center md:leading-tight md:text-4xl font-display dark:text-slate-200 text-slate-700">
                    SIA
                    <br />
                    <em
                      className="not-italic text-transparent bg-clip-text "
                      style={{ color: theme === 'dark' ? '#ffffff' : '#000' }}
                    >
                      Khai phá sức mạnh ChatGPT
                    </em>
                  </h1> */}
                  <div className="w-4/5 mx-auto mt-10 ">
                    <div className="mt-3 text-3xl font-semibold dark:text-white/80 text-[#343541] md:text-left">
                      <span>Hãy bắt đầu với các chủ đề bạn quan tâm</span>
                    </div>
                    {screenWidth && screenWidth < 1024 ? (
                      <Carousel dots={{ className: styles.dot_carousel }}>
                        <button
                          key={0}
                          onClick={() => handleOpenModalPromptAndAssistant(0, 'Tất cả')}
                          className={`${theme === 'dark' ? styles.button_click_dark : styles.button_click_light}`}
                        >
                          Tất cả
                        </button>
                        <div>
                          {responseTopicList &&
                            responseTopicList.data &&
                            responseTopicList?.data?.map(({ titleVi, id }) => (
                              <button
                                key={id}
                                onClick={() => handleOpenModalPromptAndAssistant(id, titleVi)}
                                className={`${theme === 'dark' ? styles.button_click_dark : styles.button_click_light}`}
                              >
                                {titleVi}
                              </button>
                            ))}
                        </div>
                      </Carousel>
                    ) : (
                      <div className="flex flex-wrap gap-3 sm:gap-3 mt-4 text-sm text-scale-1100">
                        <button
                          key={0}
                          onClick={() => handleOpenModalPromptAndAssistant(0, 'Tất cả')}
                          className={`${theme === 'dark' ? styles.button_click_dark : styles.button_click_light}`}
                        >
                          Tất cả
                        </button>
                        {responseTopicList &&
                          responseTopicList.data &&
                          responseTopicList?.data?.map(({ titleVi, id }) => (
                            <button
                              key={id}
                              onClick={() => handleOpenModalPromptAndAssistant(id, titleVi)}
                              className={`${theme === 'dark' ? styles.button_click_dark : styles.button_click_light}`}
                            >
                              {titleVi}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          ) : (
            <ChatView chatId={Number(idChat ?? KEY_NEW_CHAT)} fistTimeRender={fistTimeRender} />
          )}

          <div className="w-full lg:w-[80%] md:mx-4 last:mb-6 last:mt-3 lg:mx-auto bg-transparent z-KEY_NEW_CHAT ">
            <div className="bottom-[0px] left-[0px] w-full pt-6 md:pt-2 px-4">
              {responseTabCharacter === KEY_TAB_PROMPT &&
                dataSelectedTopic &&
                valueInput &&
                valueInput.length > 0 &&
                isModalOpen && (
                  <div className={`text ${theme === DARK_MODE ? 'text-white' : 'text-[#343541]'}`}>{valueInput}</div>
                )}
              <div className="z-10 h-auto mx-auto">
                <div className="lg:w-[80%] text-center mx-auto xs:px-3 text-sm font-normal sm:font-medium ">
                  {responseConfig && (
                    <Row className={`${screenWidth < 1024 && styles.selectedTopic}`} justify="space-between">
                      {renderList(responseConfig?.language, KEY_CONFIG_LANGUAGE)}
                      {renderList(responseConfig?.tone, KEY_CONFIG_TONE)}
                      {renderList(responseConfig?.style, KEY_CONFIG_STYLE)}
                      {renderList(responseConfig?.detail, KEY_CONFIG_DETAIL)}
                    </Row>
                  )}
                </div>
              </div>
              <Form form={form}>
                <Row
                  className={`mx-auto lg:w-[80%]  stretch  flex flex-row gap-2 md:mt-4 last:mt-3 lg:mx-auto items-center `}
                >
                  {dataSelectedTopic && dataSelectedTopic?.left.length > 0 ? (
                    dataSelectedTopic.left.map((data, index, array) => (
                      <Col
                        span={
                          array.length === 1 ? 24 : index + 1 === array.length ? ((index + 1) % 2 === 0 ? 11 : 24) : 11
                        }
                        className="flex flex-col w-full flex-grow  md:pl-4 relative border border-black/10 dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs py-2"
                        key={data}
                        style={{
                          boxShadow: '0 0 15px rgba(0,0,0,0.1)',
                          background: theme === 'dark' ? 'rgb(64,65,79)' : '#fff',
                          border: '1px solid rgba(0,0,0,0.1)',
                        }}
                      >
                        <Form.Item name={`input-text-${data}`} style={{ margin: 0 }}>
                          <input
                            onChange={(event) => onChangeSelectTopicInput(data, dataSelectedTopic.descriptionVi)}
                            autoComplete="off"
                            className={`${
                              theme === 'dark' ? 'text-white' : 'text-[#343541]'
                            } mx-auto m-0 w-full resize-none outline-none border-0 bg-transparent pr-12 focus:ring-0 focus-visible:ring-0  pl-2 md:pl-0 shadow-xs dark:shadow-xs`}
                            placeholder={dataSelectedTopic.message[index]}
                            style={{
                              resize: 'none',
                              maxHeight: '400px',
                              overflow: 'hidden',
                              height: '24px',
                              bottom: '24px',
                            }}
                          />
                        </Form.Item>
                        {dataSelectedTopic.left.length - 1 === index && (
                          <button
                            onClick={() => sendChat(KEY_ENTER_SEND_CHAT)}
                            className="absolute bottom-3 right-4 focus:outline-none dark:text-white text-[#343541]"
                          >
                            <Image src={theme === 'dark' ? sendIconWhite : sendIconBlack} alt="send-icon" />
                          </button>
                        )}
                      </Col>
                    ))
                  ) : (
                    <>
                      <div
                        style={{
                          background: theme === 'dark' ? 'rgb(64,65,79)' : '#fff',
                          boxShadow: '0 0 15px rgba(0,0,0,0.1)',
                          border: '1px solid rgba(0,0,0,0.1)',
                        }}
                        className="flex flex-col w-full flex-grow md:pl-4 relative dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs py-2"
                      >
                        <Form.Item name="input-text" style={{ margin: 0 }}>
                          <input
                            onChange={onChangeInput}
                            autoComplete="off"
                            className={`${
                              theme === 'dark' ? 'text-white' : 'text-[#343541]'
                            } mx-auto m-0 w-full resize-none outline-none border-0 bg-transparent pr-12 focus:ring-0 focus-visible:ring-0  pl-2 md:pl-0 shadow-xs dark:shadow-xs`}
                            placeholder="Type a message ..."
                            style={{
                              resize: 'none',
                              maxHeight: '400px',
                              overflow: 'hidden',
                              height: '24px',
                              bottom: '24px',
                            }}
                          />
                        </Form.Item>
                        <button
                          onClick={() => sendChat(KEY_ENTER_SEND_CHAT)}
                          style={{ top: '50%', transform: 'translateY(-50%)' }}
                          className="absolute bottom-3 right-4 focus:outline-none dark:text-white text-[#343541]"
                        >
                          <Image src={theme === 'dark' ? sendIconWhite : sendIconBlack} alt="send-icon" />
                        </button>
                      </div>
                    </>
                  )}
                </Row>
              </Form>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <ModalPromptAndAssistant
            topicName={topicName}
            onCancel={handleCancelModal}
            // theme={theme}
            idChat={idChat}
            handleOnClickTopic={handleOnClickTopic}
            onGetAssistantContent={handleGetAssistantContent}
          />
        )}
      </div>
    </div>
  );
};

export default NewChat;
