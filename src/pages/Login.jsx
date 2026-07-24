import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <h1>🎬 StreamSphere</h1>
        </div>

        <p className="auth-tagline">
          Your Media. Your Server. Your Control.
        </p>

        <LoginForm />

      </div>
    </div>
  );
}

export default Login;