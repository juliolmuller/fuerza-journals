import { MouseEvent } from 'react';
import { useAuth } from '../../hooks';
import logo from '../../assets/images/logo.png';
import './styles.scss';

function TheHeader() {
  const { signOut } = useAuth();

  function handleSignOut(event: MouseEvent) {
    event.preventDefault();
    signOut();
  }

  return (
    <header id="the-header">
      <img src={logo} alt="logo" />
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#" onClick={handleSignOut}>
        Sign Out
      </a>
    </header>
  );
}

export default TheHeader;
