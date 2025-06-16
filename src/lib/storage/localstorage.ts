import * as localStorage from "local-storage";

export const storage = {
  async save(key: string, value: string) {
    localStorage.set(key, value);
    // sessionStorage.setItem("key", "value");
  },
  async getValueFor(key: string) {
    return localStorage.get(key);
    // return sessionStorage.getItem(key);
  },
  async remove(key: string) {
    localStorage.clear();
    // sessionStorage.clear();
  },
  async clearAuth() {
    sessionStorage.clear();
  },
};
