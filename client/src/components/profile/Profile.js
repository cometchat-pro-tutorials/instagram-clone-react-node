import { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import Header from '../common/Header';
import UserProfile from './UserProfile';
import Actions from './Actions';
import Posts from '../post/Posts';
import Context from '../../context';

const Profile = (props) => {
  const params = props.match.params;

  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedAction, setSelectedAction] = useState(1);

  const { cometChat, user, setIsLoading, hasNewPost, setHasNewPost } = useContext(Context);

  let loadUser = null;
  let loadPosts = null;
  let loadUserFollower = null;

  useEffect(() => {
    loadUser();
    loadPosts(selectedAction);
  }, [loadUser, loadPosts, selectedAction]);

  useEffect(() => {
    if (hasNewPost) {
      loadPosts(selectedAction);
      setHasNewPost(false);
    }
  }, [hasNewPost, loadPosts, selectedAction, setHasNewPost]);

  loadUserFollower = useCallback(async () => {
    const userId = params.id;
    if (!user.id || !userId) {
      return;
    }
    try {
      setIsLoading(true);
      const url = 'http://localhost:8080/followers/get';
      const response = await axios.post(url, { followerId: user.id, userId: userId });
      setUserProfile(prevUserProfile => ({ ...prevUserProfile, hasFollowed: response && response.data && response.data.message ? false : true }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [params, setIsLoading, user]);

  loadUser = useCallback(async () => {
    try {
      const userId = params.id;
      if (!userId) {
        return;
      }
      setIsLoading(true);
      const url = `http://localhost:8080/users/${userId}`
      const response = await axios.get(url);
      if (response && response.data && response.data.message) {
        alert(response.data.message);
      } else {
        setUserProfile(response.data[0]);
        await loadUserFollower();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [setIsLoading, params, loadUserFollower]);

  loadPosts = useCallback(async (postCategory) => {
    try {
      const userId = params.id;
      if (!userId) {
        return;
      }
      setIsLoading(true);
      const url = 'http://localhost:8080/posts/categories';
      const response = await axios.post(url, { userId, postCategory });
      setPosts(() => response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [params, setIsLoading]);

  const onItemClicked = (selectedAction) => {
    loadPosts(selectedAction);
    setSelectedAction(selectedAction);
  };

  const sendCustomMessage = ({ message, type, receiverId }) => {
    const receiverID = receiverId;
    const customType = type;
    const receiverType = cometChat.RECEIVER_TYPE.USER;
    const customData = { message };
    const customMessage = new cometChat.CustomMessage(receiverID, receiverType, customType, customData);
    cometChat.sendCustomMessage(customMessage).then(
      message => {
      },
      error => {
      }
    );
  };

  const createNotification = async (notificationMessage) => {
    const url = 'http://localhost:8080/notifications/create';
    return await axios.post(url, { notificationImage: user.user_avatar, notificationMessage, userId: userProfile.id  });
  };

  const removeFollow = async () => {
    const url = 'http://localhost:8080/followers/delete';
    return await axios.post(url, { followerId: user.id, userId: userProfile.id });
  };

  const updateNumberOfFollowers = async (numberOfFollowers) => {
    const url = 'http://localhost:8080/users/followers';
    return await axios.post(url, { id: userProfile.id, numberOfFollowers });
  };

  const follow = async () => {
    const url = 'http://localhost:8080/followers/create';
    return await axios.post(url, { followerId: user.id, userId: userProfile.id });
  };

  const onFollowClicked = async () => {
    try {
      if (userProfile.hasFollowed) {
        await removeFollow();
        await updateNumberOfFollowers(userProfile.user_number_of_followers ? userProfile.user_number_of_followers - 1 : 0);
      } else {
        await follow();
        await updateNumberOfFollowers(userProfile.user_number_of_followers ? userProfile.user_number_of_followers + 1 : 1);
        const customMessage = { message: `${user.user_full_name} has followed you`, type: 'notification', receiverId: userProfile.id };
        sendCustomMessage(customMessage);
        await createNotification(customMessage.message);
      }
      await loadUser();
    } catch (error) {

    }
  };

  if (!userProfile) {
    return <></>;
  }

  return (
    <div className="profile">
      <div id="header">
        <Header />
      </div>
      <UserProfile userProfile={userProfile} onFollowClicked={onFollowClicked} authenticatedUser={user} />
      <Actions onItemClicked={onItemClicked} />
      <Posts posts={posts} customStyle={{ paddingTop: 0 }} />
    </div>
  );
};
export default Profile;