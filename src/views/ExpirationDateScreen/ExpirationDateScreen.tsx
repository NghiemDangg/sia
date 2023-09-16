import { useState, type FC } from 'react';

import styles from './ExpirationDateScreen.module.scss';
import { ExpirationDateModal } from '@/components/ExpirationDateModal';
const ExpirationDateScreen: FC = () => {
  const [isOpenModalExpirationDate, setIsOpenModalExpirationDate] = useState(false);

  const handleOpenModalExpirationDate = () => {
    setIsOpenModalExpirationDate(true);
  };
  const handleCancelModalExpirationDate = () => {
    setIsOpenModalExpirationDate(false);
  };
  return (
    <div>
      <div className={styles.box_notification}>
        <div>
          <div className={styles.title_notification}>NÂNG CẤP EXTENSION </div>
          <div className={styles.content_notification}>
            <div className={styles.text_notification}>Bản đăng ký của bạn đã hểt hạn.</div>
            <div className={styles.text_notification}>Nâng cấp gói ngay để sử dụng tính năng này.</div>
            <div className={styles.text_notification}>Liên hệ 0901676262 để được hỗ trợ!</div>
          </div>
          <div>
            <button onClick={handleOpenModalExpirationDate} className={styles.button_update} id={'button_notification'}>
              Nâng cấp ngay
            </button>
          </div>
        </div>
      </div>
      <ExpirationDateModal isOpen={isOpenModalExpirationDate} onCancel={handleCancelModalExpirationDate} />
    </div>
  );
};

export default ExpirationDateScreen;
