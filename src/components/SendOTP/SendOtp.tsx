import React, { FC, useEffect, useState } from 'react';

import { Button, Col, Form, Input, Row } from 'antd';
import styles from '../Login/styles.module.scss';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { authSelector, sendOTP } from '@/api/auth';
import { useRouter } from 'next/navigation';
import Logo from '@/assets/icons/brain.svg';
import { KEY_AUTH_INFO } from '@/config/constants';
import { AuthLoginResponse } from '@/types/api/auth';

const SendOTP: FC = () => {
  const dispatch = useAppDispatch();
  const { responseSendOTP, responseAuthLogin, pending } = useAppSelector(authSelector);
  const [form] = Form.useForm();
  const [responseLogin, setResponseLogin] = useState<AuthLoginResponse>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        dispatch(
          sendOTP({
            userId: `${responseAuthLogin ? responseAuthLogin?.data : responseLogin ? responseLogin.data : ''}`,
            otp: parseInt(form.getFieldValue('OTP')),
          }),
        );
      })
      .catch(() => {
        form.submit();
      });
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // if (responseAuthLogin === undefined) {
    //   router.push('/login');
    // }
    if (responseSendOTP?.success === true) {
      window.localStorage.setItem(KEY_AUTH_INFO, JSON.stringify(null));
      router.push('/welcome');
    }
    setResponseLogin(JSON.parse(`${window.localStorage.getItem(KEY_AUTH_INFO)}`));
  }, [responseAuthLogin, responseSendOTP]);

  return (
    <div className="w-screen h-screen bg-white">
      <div className={`w-full h-full flex  ${styles.form_login}`}>
        <Form onFinish={handleSubmit} form={form}>
          {loading ? (
            <div className={styles.container}>
              <div className={styles.ring}>
                <div>
                  <Image src={Logo} alt="" width={70} />
                </div>

                <div className={`${styles.text_loading} font-semibold`}>SIA</div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="flex flex-col max-w-xl mx-auto mt-2 mb-8 sm:mt-10 sm:mb-10 text-3xl font-semibold tracking-tighter text-center md:leading-tight md:text-4xl font-display text-black">
                {/* SIA */}
                <Row align="middle">
                  <Image src={Logo} alt="" width={70} />
                  <Col style={{ fontSize: 27 }}>SIA</Col>
                </Row>
                <div style={{ fontSize: 27, marginTop: 30, letterSpacing: 1 }}>
                  Nhập mã OTP trên ứng dụng OTPClient của bạn!
                </div>
              </h1>

              <Form.Item name="OTP">
                <Input placeholder="Nhập mã OTP" className={styles.enter_input} />
              </Form.Item>

              <div className={styles.button_login}>
                <Button block htmlType="submit" loading={pending}>
                  Gửi
                </Button>
              </div>
              {/* <div className={styles.register_wrap}>
                <span className={styles.link_register} onClick={() => router.push('/login')}>
                  Đăng nhập
                </span>
              </div> */}
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default SendOTP;
