import { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import Header from '../common/Header';
import Posts from '../post/Posts';
import Context from '../../context';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const { setIsLoading, hasNewPost, setHasNewPost } = useContext(Context);

  let loadPosts = null;

  useEffect(() => {
    loadPosts();
    return () => {
      setPosts([]);
    }
  }, [loadPosts]);

  useEffect(() => {
    if (hasNewPost) {
      loadPosts();
      setHasNewPost(false);
    }
  }, [hasNewPost, loadPosts, setHasNewPost]);

  loadPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = 'http://localhost:8080/posts';
      const response = await axios.get(url);
      setPosts(() => response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [setIsLoading]);
  
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