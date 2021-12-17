export const getMe = async (token) => {
  const result = await fetch (`/api/users/me`, {
    headers: {
      "Content-Type": "application/json",
      'authorization': `Bearer ${token}`
    },
  });
  return result;
};

export const getAllUser = async () => {
  const result = await fetch(`/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return result;
};

export const createUser = async (userData) => {
  console.log(userData)
  const result = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accepts":"application/json"
    },
    body: JSON.stringify(userData),
  });
  return result;
};

export const loginUser = async (userData) => {
  const result = await fetch(`/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return result;
};

export const updateUser = async(userData) => {
  const result = await fetch(`/api/users/update`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
}

export const makeFriend = async(userData) => {
  const result = await fetch(`/api/users/make-friend`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

export const dropFriend  =async(userData) => {
  const result = await fetch(`/api/users/drop-friend`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
}