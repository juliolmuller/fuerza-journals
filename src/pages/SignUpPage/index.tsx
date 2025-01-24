import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/images/logo.png';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { useAuth } from '~/stores';
import './styles.scss';

function SignUpPage() {
  const signUp = useAuth((state) => state.signUp);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    signUp(username, password, email);
  }

  return (
    <div id="sign-up-page">
      <div className="container">
        <img src={logo} alt="logo" />

        <header>
          <h1>Sign Up</h1>
          <Link to="/signin">Already have an account</Link>
        </header>

        <form onSubmit={handleSubmit}>
          <Input
            label="Define a username"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            label="Set your password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Input
            label="Email (optional)"
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button type="submit">Create account</Button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
