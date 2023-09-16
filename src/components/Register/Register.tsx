import React, { FC, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import styles from '../Login/styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { authSelector, registerUser, resetSignUpSuccess } from '@/api/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import GoogleIcon from '@/assets/icons/google.svg';
import Logo from '@/assets/icons/brain.svg';

const Register: FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { responseSignUp, pending } = useAppSelector(authSelector);
  const router = useRouter();

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        dispatch(registerUser({ ...form.getFieldsValue(), deviceKey: localStorage.getItem('SET_DEVICE_KEY') }));
      })
      .then(() => router.push('/login'))
      .catch(() => {
        form.submit();
      });
  };

  return (
    // <AuthLayout name_screen="Xin chào" title="Đăng ký để tiếp tục">
    <div className="w-screen h-screen bg-white">
      <div className={`w-full h-full flex ${styles.form_login}`}>
        <Form form={form} onFinish={handleSubmit}>
          <h1 className="flex flex-col max-w-xl mx-auto mt-2 mb-8 sm:mt-10 sm:mb-10 text-3xl font-semibold tracking-tighter text-center md:leading-tight md:text-4xl font-display text-black">
            <Image src={Logo} alt="" width={70} />
            <div style={{ fontSize: 27 }}>SIA</div>
            <div style={{ fontSize: 27, marginTop: 30 }}>Tạo tài khoản của bạn</div>
          </h1>
          <Form.Item name="name" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
            <Input placeholder="Họ và tên" className={styles.enter_input} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Vui lòng nhập đúng địng dạng mail' },
            ]}
          >
            <Input placeholder="Email" className={styles.enter_input} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { whitespace: true, message: 'Vui lòng không nhập khoảng trắng' },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" className={styles.enter_password} />
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
          <div className={styles.line}>
            <span className={styles.line_text}>hoặc</span>
          </div>
          <div className={styles.another_sign_up_wrap}>
            <Button className={styles.another_sign_up}>
              <Image className={styles.sign_up_icon} src={GoogleIcon} width={20} height={20} alt="google icon" />
              Đăng ký bằng google
            </Button>
          </div>
        </Form>
      </div>
    </div>
    // </AuthLayout>
  );
};

export default Register;
