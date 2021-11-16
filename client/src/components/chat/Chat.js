import { useEffect, useContext } from 'react';
import Header from '../common/Header';
import { CometChatUI } from '../../cometchat-pro-react-ui-kit/CometChatWorkspace/src';
import Context from '../../context';

const Chat = () => {
  const { cometChat } = useContext(Context);

  useEffect(() => {
    document.body.style = 'background: #fff';
    return () => {
      document.body.style = 'background: #fafafa';
    }
  }, []);

  return (
    <div>
      <div id="header">
        <Header />
      </div>
      <div style={{ width: '60.9375rem', height: '100vh', margin: '0 auto', paddingTop: '3.5625rem' }}>
        {cometChat && <CometChatUI />}
      </div>
    </div>
  );
};
export default Chat;