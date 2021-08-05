import { useAuth } from '../../hooks';

function SignInPage() {
  const { signIn } = useAuth();

  return (
    <>
      <h1>SignInPage</h1>
      <button type="button" onClick={signIn}>
        Sign In
      </button>
    </>
  );
}

export default SignInPage;
