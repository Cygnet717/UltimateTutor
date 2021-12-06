export const getMe = async () => {
  const result = await fetch (`/api/user/me`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;

};

export const createUser = async (userData) => {
  const result = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return result;
};

export const loginUser = async (userData) => {
  const result = await fetch(`/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return result;
}