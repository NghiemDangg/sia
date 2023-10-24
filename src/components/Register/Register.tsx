'use client';
import React, { FC, useEffect } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import styles from '../Login/styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { authSelector, registerUser } from '@/api/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/assets/icons/brain.svg';
import { REGEX_PASSWORD } from '@/config/constants';

const Register: FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { responseSignUp, pending } = useAppSelector(authSelector);
  const router = useRouter();

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        dispatch(registerUser({ username: form.getFieldValue('username'), password: form.getFieldValue('password') }));
      })
      .then(() => {
        if (responseSignUp?.success === true) {
          router.push('/qrcode');
        }
      })
      .catch(() => {
        form.submit();
      });
  };

  useEffect(() => {
    if (responseSignUp?.success === true) {
      router.push('/qrcode');
    }
  }, [responseSignUp]);

  return (
    <div className="w-screen h-screen bg-white">
      <div className={`w-full h-full flex ${styles.form_login}`}>
        <Form form={form} onFinish={handleSubmit}>
          <h1 className="flex flex-col max-w-xl mx-auto mt-2 mb-8 sm:mt-10 sm:mb-10 text-3xl font-semibold tracking-tighter text-center md:leading-tight md:text-4xl font-display text-black">
            <Row align="middle">
              <Image src={Logo} alt="" width={70} />
              <Col style={{ fontSize: 27 }}>SIA</Col>
            </Row>
            <div style={{ fontSize: 27, marginTop: 30 }}>Tạo tài khoản mới</div>
          </h1>
          <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập username' }]}>
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
          <Form.Item
            className="mb-4"
            name="confirm_password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập lại mật khẩu!',
              },
              {
                validator: (_, value) => {
                  if (value) {
                    if (value === form.getFieldValue('password')) {
                      return Promise.resolve();
                    }

                    return Promise.reject('Mật khẩu không trùng khớp!');
                  }

                  return Promise.reject();
                },
              },
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu" className={styles.enter_password} />
          </Form.Item>
          <div className={styles.button_login}>
            <Button block htmlType="submit" loading={pending}>
              Đăng ký
            </Button>
          </div>
          <div className={styles.register_wrap}>
            <span className={styles.link_register} onClick={() => router.push('/login')}>
              Đăng nhập
            </span>
          </div>
        </Form>
      </div>
    </div>
    // </AuthLayout>
  );
};

export default Register;
