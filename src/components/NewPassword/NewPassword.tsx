import React, { FC, useEffect } from 'react';

import { Button, Form, Input } from 'antd';
import styles from '../Login/styles.module.scss';
import LayoutPassword from '../LayoutPassword/LayoutPassword';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { authSelector } from '@/api/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { OTPCodeType } from '@/config/enum';

const NewPassword: FC = () => {
  const dispatch = useAppDispatch();
  const { pending } = useAppSelector(authSelector);
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const router = useRouter();

  // useEffect(() => {
  //   dispatch(resetCheckOtpResponse());
  // }, []);

  const handleSubmit = () => {
    // form
    //   .validateFields()
    //   .then(() => {
    //     dispatch(
    //       passwordRecovery({
    //         ...form.getFieldsValue(),
    //         email: searchParams.get('email'),
    //         code: searchParams.get('code'),
    //         otpType: OTPCodeType.FORGOT_PASSWORD,
    //       }),
    //     );
    //   })
    //   .catch(() => {
    //     form.submit();
    //   });
  };

  // useEffect(() => {
  //   if (responseRecovery) {
  //     router.push('/login');
  //   }
  // }, [responseRecovery]);

  return (
    <LayoutPassword name_screen="Tạo mật khẩu" title="Khởi tạo mật khẩu mới cho tài khoản của bạn">
      <div>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { whitespace: true, message: 'Không nhập khoảng trắng' },
            ]}
          >
            <Input.Password placeholder="Mật khẩu mới" className={styles.enter_password} />
          </Form.Item>
          <Form.Item
            name="confirm-password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { whitespace: true, message: 'Không nhập khoảng trắng' },
              {
                validator: (_, value) => {
                  if (value) {
                    if (value === form.getFieldValue('password')) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Mật khẩu không trùng khớp');
                  }
                  return Promise.reject();
                },
              },
            ]}
          >
            <Input.Password placeholder="Xác thực mật khẩu" className={styles.enter_password} />
          </Form.Item>
          <div className={styles.button_login}>
            <Button block htmlType="submit" loading={pending}>
              Khôi phục mật khẩu
            </Button>
          </div>
        </Form>
      </div>
    </LayoutPassword>
  );
};

export default NewPassword;
