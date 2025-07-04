const BASE_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// and similar for login, entries, etc.
