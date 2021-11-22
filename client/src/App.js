import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Share from './components/post/Share';
import Profile from './components/profile/Profile';
import Notifications from './components/notification/Notifications';
import Chat from './components/chat/Chat';
import Loading from './components/common/Loading';
import PrivateRoute from './components/common/PrivateRoute';
import Context from './context';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [cometChat, setCometChat] = useState(null);
  const [hasNewPost, setHasNewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(false);

  let listenCustomMessages = null;

  useEffect(() => {
    initAuthUser();
    initCometChat();
  }, []);

  useEffect(() => {
    if (cometChat && user) { 
      listenCustomMessages();
    }
    return () => {
      if (cometChat && user) {
        cometChat.removeMessageListener(user.id);
      }
    }
  }, [cometChat, user, listenCustomMessages]);

  const initAuthUser = () => {
    const authenticatedUser = localStorage.getItem('auth');
    if (authenticatedUser) {
      setUser(JSON.parse(authenticatedUser));
    }
  };

  const initCometChat = async () => {
    const { CometChat } = await import('@cometchat-pro/chat');
    const appID = `${process.env.REACT_APP_COMETCHAT_APP_ID}`;
    const region = `${process.env.REACT_APP_COMETCHAT_REGION}`;
    const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
    CometChat.init(appID, appSetting).then(
      () => {
        setCometChat(() => CometChat);
      },
      error => {
      }
    );
  };

  listenCustomMessages = () => {
    cometChat.addMessageListener(
      user.id,
      new cometChat.MessageListener({
        onCustomMessageReceived: customMessage => {
          if (customMessage && customMessage.sender && customMessage.sender.uid && customMessage.sender.uid !== user.id && customMessage.data && customMessage.data.customData && customMessage.data.customData.message) {
            if (customMessage && customMessage.type && customMessage.type === 'notification') {
              alert(customMessage.data.customData.message);
            }
          }
        }
      })
    );
  };

  return (
    <Context.Provider value={{ isLoading, setIsLoading, user, setUser, cometChat, hasNewPost, setHasNewPost, selectedPost, setSelectedPost }}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/post/:id" component={Share} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/notifications" component={Notifications} />
          <PrivateRoute exact path="/chat" component={Chat} />
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
      {isLoading && <Loading />}
    </Context.Provider>
  );
}

export default App;
