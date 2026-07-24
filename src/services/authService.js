const authService = {
  login(email, password) {
    return {
      success: true,
      user: {
        name: "Demo User",
        email,
      },
    };
  },

  signup(name, email, password) {
    return {
      success: true,
      user: {
        name,
        email,
      },
    };
  },

  logout() {
    return true;
  },
};

export default authService;