import { useState, createContext } from "react";
import { toast } from "react-toastify";

import { loginService, registerService } from "../services/services";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [userToken, setUserToken] = useState();

  function login() {
    setIsAuthenticated(true);
  }

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    setLoadingAuth(false);
  };

  const onSubmit = async (body) => {
    try {
      const { data } = await loginService(body);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("tokenValited", data.access_token);
      setUserToken(data.access_token);
      login();
      toast.success(`Seja Bem Vindo!`);
    } catch (error) {
      toast.error("Senha e/ou email inválidos!");
      console.log(error);
      setLoadingAuth(false);
      setIsAuthenticated(false);
    }
  };

  const onSubmitRegister = async (body) => {
    try {
      const { data } = await registerService(body);
      console.log("DATA AQUI:", data);
      console.log("BODY:", body);
      toast.success(`Usuário criado com sucesso!`);
      setLoadingAuth(false);
    } catch (error) {
      toast.error("Algo deu errado, verifique os campos.");
      console.log(error);
      setLoadingAuth(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loadingAuth,
        onSubmit,
        logout,
        setLoadingAuth,
        login,
        userToken,
        onSubmitRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
