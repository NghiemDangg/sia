import React, { FC, useEffect, useState } from 'react';

import { Button, Col, Form, Input, Row } from 'antd';
import styles from './styles.module.scss';

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
import { KEY_TOKEN, REGEX_PASSWORD } from '@/config/constants';

import Logo from '@/assets/icons/brain.svg';

const Login: FC = () => {
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
    if (responseAuthLogin?.success === true) {
      router.push('/sendOTP');
    }
  }, [responseAuthLogin]);

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
                <Row align="middle">
                  <Image src={Logo} alt="" width={70} />
                  <Col style={{ fontSize: 27 }}>SIA</Col>
                </Row>
                <div style={{ fontSize: 27, marginTop: 30 }}>Chào mừng quay trở lại</div>
              </h1>

              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Vui lòng nhập user name' },
                  // { type: 'email', message: 'Vui lòng nhập đúng địng dạng mail' },
                ]}
              >
                <Input placeholder="user name" className={styles.enter_input} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu' },
                  {
                    pattern: REGEX_PASSWORD,
                    message: 'Mật khẩu tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!',
                  },
                ]}
              >
                <Input.Password placeholder="Mật khẩu" className={styles.enter_password} />
              </Form.Item>
              <div className={styles.button_login}>
                <Button block htmlType="submit" loading={pending}>
                  Đăng nhập
                </Button>
              </div>
              <div className={styles.register_wrap}>
                <span className={styles.link_register} onClick={() => router.push('/register')}>
                  Đăng ký
                </span>
                {/* <span className={styles.link_register} onClick={() => router.push('/forgotpassword')}>
                  Quên mật khẩu
                </span> */}
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Login;
