import { useEffect, useRef, useContext } from "react";
import validator from "validator";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import withModal from "../common/Modal";
import SignUp from "../register/SignUp";
import Context from "../../context";

const Login = (props) => {
  const { toggleModal } = props;

  const { setUser, setIsLoading, cometChat } = useContext(Context);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const history = useHistory();

  useEffect(() => { 
    const authenticatedUser = JSON.parse(localStorage.getItem('auth'));
    if (authenticatedUser) { 
      history.push('/');
    }
  }, [history]);

  const getInputs = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    return { email, password };
  };

  const isUserCredentialsValid = (email, password) => {
    return validator.isEmail(email) && password;
  };

  const loginCometChat = async (user) => {
    const authKey = `${process.env.REACT_APP_COMETCHAT_AUTH_KEY}`;
    return await cometChat.login(user.id, authKey);
  };

  const signin = async (email, password) => {
    const url = 'http://localhost:8080/login';
    return await axios.post(url, { email, password });
  }

  const login = async () => {
    const { email, password } = getInputs();
    if (isUserCredentialsValid(email, password)) {
      setIsLoading(true);
      const authenticatedUser = await signin(email, password);
      const cometChatAccount = await loginCometChat({id: authenticatedUser.data.id});
      if (cometChatAccount) {
        localStorage.setItem('auth', JSON.stringify(authenticatedUser.data));
        setUser(authenticatedUser.data);
        setIsLoading(false);
        history.push('/');
      } else { 
        alert('Failure to log in, please try again');
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login__container">
      <div className="login__welcome">
        <div className="login__logo">
          <img src='https://assets-global.website-files.com/5f3c19f18169b65d9d0bf384/5f3c19f18169b655820bf3d4_asset%2021.svg' alt='logo'/>
        </div>
        <p>Build Instagram Clone with React & Node</p>
      </div>
      <div className="login__form-container">
        <div className="login__form">
          <input
            type="text"
            placeholder="Email or phone number"
            ref={emailRef}
          />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <button className="login__submit-btn" onClick={login}>
            Login
          </button>
          <span className="login__forgot-password">Forgot password?</span>
          <span className="login__signup" onClick={() => toggleModal(true)}>Create New Account</span>
        </div>
      </div>
    </div>
  );
}

export default withModal(SignUp)(Login);
