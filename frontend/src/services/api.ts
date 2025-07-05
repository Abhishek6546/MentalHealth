export const API = "http://localhost:5000/api";

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const signupUser = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

export const fetchJournal = async (token: string) => {
  
  const res = await fetch(`${API}/journal`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  console.log("res frontend",res)
  return res.json();
};
