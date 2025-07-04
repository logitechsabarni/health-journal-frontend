const BASE_URL = process.env.REACT_APP_API_URL;;

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// and similar for login, entries, etc.
