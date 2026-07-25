import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../ui/Input";
import Button from "../ui/Button";
import PasswordInput from "./PasswordInput";

import useAuth from "../../hooks/useAuth";
import {
  validateEmail,
  validatePassword,
} from "../../utils/validators";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setSubmitting(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome Back</h2>

      <p>
        Sign in to access your personal media library.
      </p>

      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p style={{ color: "#e74c3c" }}>{error}</p>}

      <Button
        text={submitting ? "Signing in..." : "Sign In"}
        type="submit"
        disabled={submitting}
      />
      <p style={{ marginTop: "16px" }}>
  Don't have an account?{" "}
  <Link to="/signup">Create one</Link>
</p>
    </form>
  );
}

export default LoginForm;