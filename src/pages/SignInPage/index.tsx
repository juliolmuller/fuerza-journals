import { FormEvent, MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/images/logo.png';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { useAuth } from '~/stores';
import './styles.scss';

function SignInPage() {
  const signIn = useAuth((state) => state.signIn);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleForgotPassword(event: MouseEvent) {
    event.preventDefault();
    alert('Ops! Password recovery is not functional yet.');
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    signIn(username, password);
  }

  return (
    <div id="sign-in-page">
      <div className="container">
        <img src={logo} alt="logo" />

        <header>
          <h1>Sign In</h1>
          <Link to="/signup">Sign up</Link>
        </header>

        <form onSubmit={handleSubmit}>
          <Input
            label="Your username"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            label="Your password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={handleForgotPassword}>
            Forgot password?
          </a>

          <Button type="submit">Log in</Button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
