 const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/";

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${apiUrl}api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const signupUser = async (name: string, email: string, password: string) => {
    const res = await fetch(`${apiUrl}api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

export const fetchJournal = async (token: string) => {
 
  const res = await fetch(`${apiUrl}api/journal`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  
  return res.json();
};
