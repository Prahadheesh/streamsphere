import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  name,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>

      <div className="password-wrapper">
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;