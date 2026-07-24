import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("streamsphere-user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem(
      "streamsphere-user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("streamsphere-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;