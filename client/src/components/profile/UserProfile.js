const UserProfile = (props) => {
  const { userProfile, onFollowClicked, authenticatedUser } = props;

  if (!userProfile) {
    return <></>;
  }

  return (
    <div className="user-profile">
      <div className="user-profile__left">
        <img src={`http://localhost:8080${userProfile.user_avatar}`} alt={userProfile.user_full_name}/>
      </div>
      <div className="user-profile__right">
        <div className="user-profile__name">
          <span>{userProfile.user_full_name}</span>
          {authenticatedUser.id !== userProfile.id && <span className="user-profile__follow" onClick={onFollowClicked}>{userProfile.hasFollowed ? 'Followed' : 'Follow'}</span>}
        </div>
        <div className="user-profile__famous">
          <div className="user-profile__famous-item">
            <span className="user-profile__famous-item-content">{userProfile.user_number_of_posts}</span>
            <span>posts</span>
          </div>
          <div className="user-profile__famous-item">
            <span className="user-profile__famous-item-content">{userProfile.user_number_of_followers ? userProfile.user_number_of_followers : '0'}</span>
            <span>followers</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;