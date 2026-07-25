import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../ui/Input";
import Button from "../ui/Button";
import PasswordInput from "./PasswordInput";

import useAuth from "../../hooks/useAuth";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../utils/validators";

function SignupForm() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateRequired(name)) {
      setError("Please enter your name.");
      return;
    }

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
      await signup(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Account</h2>

      <p>Create your StreamSphere account.</p>

      <Input
        label="Full Name"
        name="name"
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PasswordInput
        label="Password"
        name="password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p style={{ color: "#e74c3c" }}>{error}</p>}

      <Button
        text={submitting ? "Creating account..." : "Create Account"}
        type="submit"
        disabled={submitting}
      />

      <p style={{ marginTop: "16px" }}>
        Already have an account?{" "}
        <Link to="/login">Sign In</Link>
      </p>
    </form>
  );
}

export default SignupForm;