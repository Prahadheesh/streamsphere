import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../ui/Input";
import Button from "../ui/Button";
import PasswordInput from "./PasswordInput";

import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../utils/validators";

function SignupForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateRequired(name)) {
      alert("Please enter your name.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const result = authService.signup(name, email, password);

    if (result.success) {
      login(result.user);
      navigate("/");
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

      <Button
        text="Create Account"
        type="submit"
      />

      <p style={{ marginTop: "16px" }}>
        Already have an account?{" "}
        <Link to="/login">Sign In</Link>
      </p>
    </form>
  );
}

export default SignupForm;