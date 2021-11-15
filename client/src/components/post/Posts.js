import { useContext } from 'react';
import Post from './Post';
import Detail from './Detail';
import withModal from '../common/Modal';
import Context from '../../context';

const Posts = (props) => {
  const { toggleModal, posts, customStyle } = props;

  const { setSelectedPost } = useContext(Context);

  const onItemClicked = (post) => {
    if (!post) {
      return;
    }
    setSelectedPost(post);
    toggleModal(true);
  };

  if (!posts || !posts.length) {
    return <></>
  }

  return (
    <div className="posts" style={{ ...customStyle }}>
      {posts.map(post => <Post key={post.id} post={post} onItemClicked={onItemClicked} />)}
    </div>
  );
};
export default withModal(Detail)(Posts);