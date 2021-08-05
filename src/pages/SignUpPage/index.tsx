import { useAuth } from '../../hooks';

function SignUpPage() {
  const { signIn } = useAuth();

  return (
    <>
      <h1>SignUpPage</h1>
      <button type="button" onClick={signIn}>
        Sign In
      </button>
    </>
  );
}

export default SignUpPage;
