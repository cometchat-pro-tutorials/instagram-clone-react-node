import { useEffect, useState, useContext, useCallback} from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Context from '../../context';

const Detail = (props) => {
  const { toggleModal, isCloseHidden } = props;

  const [post, setPost] = useState(null);

  const { cometChat, user, setIsLoading, selectedPost, setSelectedPost } = useContext(Context);

  const history = useHistory();

  let loadPost = null;
  let loadPostReaction = null;

  useEffect(() => {
    if (selectedPost) {
      loadPost();
    }
  }, [selectedPost, loadPost]);

  loadPost = useCallback(async () => {
    if (!selectedPost) {
      return;
    }
    try {
      setIsLoading(true);
      const { id } = selectedPost;
      const url = `http://localhost:8080/posts/${id}`;
      const response = await axios.get(url);
      if (response && response.data && response.data.message) {
        alert(response.data.message);
        setIsLoading(false);
        return;
      } else {
        setPost(response.data[0]);
        await loadPostReaction();
      }
    } catch (error) {
      setIsLoading(false);
    }

  }, [loadPostReaction, setIsLoading, selectedPost]);

  loadPostReaction = async () => {
    const userId = user.id;
    const postId = selectedPost.id;
    if (!userId || !postId) {
      return;
    }
    try {
      setIsLoading(true);
      const url = 'http://localhost:8080/reactions/get';
      const response = await axios.post(url, { post_id: postId, user_id: userId });
      setPost(prevPost => ({ ...prevPost, hasLiked: response && response.data && response.data.message ? false : true }));
      setIsLoading(false);
      await loadUserFollower();
    } catch (error) {
      setIsLoading(false);
    }
  };

  const loadUserFollower = async () => {
    const { id } = user;
    const { post_created_by } = selectedPost;
    if (!id || !post_created_by) {
      return;
    }
    try {
      setIsLoading(true);
      const url = 'http://localhost:8080/followers/get';
      const response = await axios.post(url, { followerId: id, userId: post_created_by });
      setPost(prevPost => ({ ...prevPost, hasFollowed: response && response.data && response.data.message ? false : true }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const close = () => {
    setSelectedPost(null);
    toggleModal(false);
  };

  const viewProfile = () => {
    if (!post.post_created_by) {
      return;
    }
    history.push(`/profile/${post.post_created_by}`);
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

  const removeFollow = async () => {
    const url = 'http://localhost:8080/followers/delete';
    return await axios.post(url, { followerId: user.id, userId: post.post_created_by });
  };

  const updateNumberOfFollowers = async (numberOfFollowers) => {
    const url = 'http://localhost:8080/users/followers';
    return await axios.post(url, { id: post.post_created_by, numberOfFollowers });
  };

  const follow = async () => {
    const url = 'http://localhost:8080/followers/create';
    return await axios.post(url, { followerId: user.id, userId: post.post_created_by });
  };

  const toggleFollow = async () => {
    try {
      if (post.hasFollowed) {
        await removeFollow();
        await updateNumberOfFollowers(post.user_number_of_followers ? post.user_number_of_followers - 1 : 0);
      } else {
        await follow();
        await updateNumberOfFollowers(post.user_number_of_followers ? post.user_number_of_followers + 1 : 1);
        const customMessage = { message: `${user.user_full_name} has followed you`, type: 'notification', receiverId: post.post_created_by };
        sendCustomMessage(customMessage);
        await createNotification(customMessage.message);
      }
      await loadPost();
    } catch (error) {

    }
  };

  const removeLike = async () => {
    const url = 'http://localhost:8080/reactions/delete';
    return await axios.post(url, { postId: post.id, userId: user.id });
  };

  const like = async () => {
    const url = 'http://localhost:8080/reactions/create';
    return await axios.post(url, { postId: post.id, userId: user.id });
  };

  const updateNumberOfReactions = async (numberOfReactions) => {
    const url = 'http://localhost:8080/posts/reactions';
    return await axios.post(url, { id: post.id, numberOfReactions });
  };

  const createNotification = async (notificationMessage) => {
    const url = 'http://localhost:8080/notifications/create';
    return await axios.post(url, { notificationImage: user.user_avatar, notificationMessage, userId: post.post_created_by  });
  };

  const toggleReaction = async () => {
    try {
      if (post.hasLiked) {
        await removeLike();
        await updateNumberOfReactions(post.post_number_of_reactions ? post.post_number_of_reactions - 1 : 0);
      } else {
        await like();
        await updateNumberOfReactions(post.post_number_of_reactions ? post.post_number_of_reactions + 1 : 1);
        const customMessage = { message: `${user.user_full_name} has liked your post`, type: 'notification', receiverId: post.post_created_by };
        sendCustomMessage(customMessage);
        await createNotification(customMessage.message);
      }
      await loadPost();
    } catch (error) {
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`http:/localhost:3000/post/${selectedPost.id}`);
    alert('Link was copied!');
  };

  return (
    <div className="post-detail">
      <div className="post-detail__content">
        <div className="post-detail__container">
          {!isCloseHidden && <div className="post-detail__close">
            <svg onClick={close} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>}
        </div>
        <div className="post-detail__main">
          <div className="post-detail__main-left">
            <img src={`http://localhost:8080${post?.post_content}`} alt={`${post?.post_created_by} - ${post?.post_created_date}`} />
          </div>
          <div className="post-detail__main-right">
            <div className="post-detail__creator">
              <img src={`http://localhost:8080${post?.user_avatar}`} alt={user.avatar} />
              <span className="post-detail__post-creator" onClick={viewProfile}>{post?.user_full_name}</span>
              {user.id !== post?.post_created_by && <div className="post-detail__dot"></div>}
              {user.id !== post?.post_created_by && <span className="post-detail__follow" onClick={toggleFollow}>{post?.hasFollowed ? 'Followed' : 'Follow'}</span>}
            </div>
            <div className="post-detail__reactions">
              <svg onClick={toggleReaction} aria-label="Like" className="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
              <svg onClick={copyLink} aria-label="Share Post" className="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
            </div>

            <div className="post-detail__number-of-reactions">
              <span>{post?.post_number_of_reactions ? `${post?.post_number_of_reactions} liked` : '0 Liked'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;