const Post = (props) => {
  const { post, onItemClicked } = props;

  const selectPost = () => {
    onItemClicked(post);
  };

  return (
    <div className="post" onClick={selectPost}>
      <img src={`http://localhost:8080${post.post_content}`} alt={`${post.post_created_by} - ${post.post_created_date}`}/>
    </div>
  );
};
export default Post;