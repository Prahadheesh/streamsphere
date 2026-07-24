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
} from "../../utils/validators";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const result = authService.login(email, password);

    if (result.success) {
      login(result.user);
      navigate("/");
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

      <Button
        text="Sign In"
        type="submit"
      />
      <p style={{ marginTop: "16px" }}>
  Don't have an account?{" "}
  <Link to="/signup">Create one</Link>
</p>
    </form>
  );
}

export default LoginForm;