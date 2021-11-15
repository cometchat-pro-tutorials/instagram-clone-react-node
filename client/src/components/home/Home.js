import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Header from '../common/Header';
import Posts from '../post/Posts';
import Context from '../../context';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const { setIsLoading, hasNewPost, setHasNewPost } = useContext(Context);

  useEffect(async () => {
    await loadPosts();
    return () => {
      setPosts([]);
    }
  }, []);

  useEffect(() => {
    if (hasNewPost) {
      loadPosts();
      setHasNewPost(false);
    }
  }, [hasNewPost]);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const url = 'http://localhost:8080/posts';
      const response = await axios.get(url);
      setPosts(() => response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <div id="header">
        <Header />
      </div>
      <Posts posts={posts} />
    </div>
  );
};
export default Home;