import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.sass';
import { fetchOtherUserInfoRoutine } from '@routines/userRoutines';
import userImage from '@assets/user-page.gif';
import { useParams } from 'react-router-dom';
import { ShortUserInfo } from '@models/userData';

interface IHomePageProps {
  user: ShortUserInfo;
  currentUserId: string;
  fetchOtherUserInfo: (id: string) => any;
}

const UserPage: React.FC<IHomePageProps> = ({
  user,
  currentUserId,
  fetchOtherUserInfo
}) => {
  const { id } = useParams() as { id: string };

  useEffect(() => {
    fetchOtherUserInfo(id);
  }, [id]);

  return (
    <div className={styles.user_container}>
      <div className={styles.image_container}>
        <img src={userImage} alt="Moving lamp"/>
      </div>
      <div className={styles.info_container}>
        <div className={styles.name}>{user.firstName || ''} {user.lastName || ''}</div>
        <div className={styles.email}>{user.email || ''}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  currentUserId: state.auth.id,
  user: state.userPage.user,
});

const mapDispatchToProps = {
  fetchOtherUserInfo: fetchOtherUserInfoRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
