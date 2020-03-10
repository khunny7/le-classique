import React from 'react';
import { Link } from 'react-router-dom';

const UserInline = (props) => {
  const {
    photoURL,
    displayName,
    uid,
  } = props;

  const linkAddress = `/user/${uid}`;

  if (!uid) {
    return (<div className="no-user-present" />);
  }

  return (
    <Link to={linkAddress} className="user-inline-container">
      <img
        className="user-photo"
        alt="user profile"
        src={photoURL}
        width={20}
        height={20}
      />
      <span className="displayName">
        {displayName}
      </span>
    </Link>
  )
};

export default UserInline;
