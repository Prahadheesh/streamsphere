import api from "./api";

const authService = {
  async login(email, password) {
    const data = await api.post("/auth/login", { email, password }, { auth: false });
    localStorage.setItem("streamsphere-token", data.token);
    return { success: true, user: data.user };
  },

  async signup(name, email, password) {
    const data = await api.post("/auth/register", { name, email, password }, { auth: false });
    localStorage.setItem("streamsphere-token", data.token);
    return { success: true, user: data.user };
  },

  async getMe() {
    const data = await api.get("/auth/me");
    return data.user;
  },

  logout() {
    localStorage.removeItem("streamsphere-token");
    return true;
  },
};

export default authService;
