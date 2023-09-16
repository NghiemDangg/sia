import React, { FC, useEffect, useState } from 'react';

import { Button, Col, Form, Input, Row } from 'antd';
import styles from '../Login/styles.module.scss';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  authLogin,
  authSelector,
  // authLoginGoogle,
  // authLoginWithFacebook,
  // authSelector,
  // resetCheckOtpResponse,
  // resetRecoveryResponse,
  // sendOTP,
} from '@/api/auth';
import { useRouter } from 'next/navigation';
import { KEY_TOKEN } from '@/config/constants';
import Cookies from 'js-cookie';
import GoogleIcon from '@/assets/icons/google.svg';
// import { OTPCodeType, OTPCodeTypeString } from '@/config/enum';
// import { AuthLayout } from '../AuthLayout';
import Logo from '@/assets/icons/brain.svg';

const SendOTP: FC = () => {
  const dispatch = useAppDispatch();
  const { responseAuthLogin, pending } = useAppSelector(authSelector);
  const [form] = Form.useForm();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        dispatch(authLogin({ ...form.getFieldsValue() }));
      })
      .then(() => router.push('/login'))
      .catch(() => {
        form.submit();
      });
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
                <div style={{ fontSize: 27, marginTop: 30 }}>
                  Mã OTP đã được gửi đến Email của bạn, vui lòng không chia sẻ mã này.
                </div>
              </h1>

              <Form.Item name="code">
                <Input placeholder="Nhập mã OTP" className={styles.enter_input} />
              </Form.Item>

              <div className={styles.button_login}>
                <Button block htmlType="submit" loading={pending}>
                  Gửi
                </Button>
              </div>
              <div className={styles.register_wrap}>
                <span className={styles.link_register} onClick={() => router.push('/login')}>
                  Đăng nhập
                </span>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default SendOTP;
