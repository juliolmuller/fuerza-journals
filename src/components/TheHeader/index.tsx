import { MouseEvent, ReactNode } from 'react';

import logo from '~/assets/images/logo.png';
import { useAuth } from '~/stores';
import './styles.scss';

function DefaultHeaderButton() {
  const signOut = useAuth((state) => state.signOut);

  function handleSignOut(event: MouseEvent) {
    event.preventDefault();
    signOut();
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#" onClick={handleSignOut}>
        Sign Out
      </a>
    </>
  );
}

type TheHeaderProps = {
  children?: ReactNode | null;
};

function TheHeader({ children = <DefaultHeaderButton /> }: TheHeaderProps) {
  return (
    <header id="the-header">
      <img src={logo} alt="logo" />
      {children}
    </header>
  );
}

export default TheHeader;
