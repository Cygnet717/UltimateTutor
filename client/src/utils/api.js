export const getMe = async () => {
  const result = await fetch (`/api/user/me`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

export const getAllUser = async () => {
  const result = await fetch(`/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
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
};

export const updateUser = async(userData) => {
  const result = await fetch(`/api/user/update`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
}

export const makeFriend = async(userData) => {
  const result = await fetch(`/api/user/make-friend`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

export const dropFriend  =async(userData) => {
  const result = await fetch(`/api/user/drop-friend`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
}