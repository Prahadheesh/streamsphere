import SignupForm from "../components/auth/SignupForm";

function Signup() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>🎬 StreamSphere</h1>
        </div>

        <p className="auth-tagline">
          Your Media. Your Server. Your Control.
        </p>

        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;