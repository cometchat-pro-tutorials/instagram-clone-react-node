import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Detail from './Detail';
import Context from '../../context';

const Share = (props) => {
  const [hasPost, setHasPost] = useState(false);
  const { setIsLoading, setSelectedPost } = useContext(Context);

  useEffect(async () => {
    await loadPost();
  }, []);

  const loadPost = async () => {
    const postId = props.match.params.id;
    if (!postId) {
      return;
    }
    try {
      setIsLoading(true);
      const url = `http://localhost:8080/posts/${postId}`;
      const response = await axios.get(url);
      if (response && response.data && response.data.message) {
        alert(response.data.message);
        setIsLoading(false);
        return;
      } else {
        setSelectedPost(response.data[0]);
        setHasPost(true);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  if (!hasPost) {
    return <></>;
  }

  return <Detail isCloseHidden={true} />;
};
export default Share;