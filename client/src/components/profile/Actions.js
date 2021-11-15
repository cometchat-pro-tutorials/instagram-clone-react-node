import { useState } from 'react';

const Actions = (props) => {
  const [selectedAction, setSelectedAction] = useState(1);

  const { onItemClicked } = props;

  const selectAction = (selectedAction) => () => {
    setSelectedAction(() => selectedAction);
    onItemClicked(selectedAction);
  };

  return (
    <div className="profile-actions">
      <div className={`profile-actions__item ${selectedAction === 1 ? 'profile-actions__item--active' : ''}`} onClick={selectAction(1)}>
        <svg aria-label="" className="_8-yf5 " color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 48 48" width="12"><path clipRule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fillRule="evenodd"></path></svg>
        <span>Posts</span>
      </div>
      <div className={`profile-actions__item ${selectedAction === 2 ? 'profile-actions__item--active' : ''}`} onClick={selectAction(2)}>
        <svg aria-label="" className="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5zm5-11.8l-6.8-3.9c-.5-.3-1-.3-1.5 0-.4.3-.7.7-.7 1.3v7.8c0 .5.3 1 .8 1.3.2.1.5.2.8.2s.5-.1.8-.2l6.8-3.9c.5-.3.8-.8.8-1.3s-.5-1-1-1.3zm-7.5 5.2V8.1l6.8 3.9-6.8 3.9z"></path></svg>
        <span>Videos</span>
      </div>
    </div>
  );
};
export default Actions;