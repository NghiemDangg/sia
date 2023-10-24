'use client';
import { authSelector } from '@/api/auth';
import { useAppSelector } from '@/hooks';
import { Button, QRCode } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from '../Login/styles.module.scss';
import Image from 'next/image';
import Logo from '@/assets/icons/brain.svg';
import { useRouter } from 'next/navigation';

const QRCodeComponent = () => {
  const [userData, setUserData] = useState<string>('');
  const { responseSignUp, pending } = useAppSelector(authSelector);
  const router = useRouter();
  useEffect(() => {
    console.log(responseSignUp);

    if (responseSignUp?.data && responseSignUp.success === true) {
      setUserData(responseSignUp.data);
    }
  }, [responseSignUp]);

  console.log('register', userData);

  return (
    <div>
      {pending ? (
        <div className={styles.container}>
          <div className={styles.ring}>
            <div>
              <Image src={Logo} alt="" width={70} />
            </div>

            <div className={`${styles.text_loading} font-semibold`}>SIA</div>
          </div>
        </div>
      ) : (
        <div className={styles.qr_code}>
          <div>
            <div>
              <h1 style={{ fontSize: 27, marginBottom: 30, fontWeight: 'bold' }}>
                Quét mã QR bằng app OTP Client để đăng ký!
              </h1>
            </div>
            <QRCode style={{ margin: '0 auto' }} size={400} value={userData || '-'} />
            <div style={{ marginTop: 30 }} className={styles.button_login}>
              <Button block loading={pending} onClick={() => router.push('/login')}>
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default QRCodeComponent;
