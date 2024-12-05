import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");

    if (userToken) {
      setUser(JSON.parse(userToken)); 
    }
  }, []);

  const signin = async (email, password) => {
    try {
      const response = await fetch(`http://localhost:8080/loginFuncionarios?username=${email}&password=${password}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, token });
        return null; 
      } else {
        return data.message || "Erro ao fazer login";
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return "Erro ao fazer login"; 
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token"); 
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};