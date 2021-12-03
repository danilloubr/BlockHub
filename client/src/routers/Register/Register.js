import React from "react";

import { useState, useContext } from "react";
import { registerService } from "../../services/services";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { AuthContext } from "../../contexts/auth";
import logo from "../../assets/logo.png";

import "./register.css";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const { loadingAuth, setLoadingAuth } = useContext(AuthContext);

  const body = { name: name, email: email, password: password };

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      setLoadingAuth(true);
      const { data } = await registerService(body);
      console.log("DATA AQUI:", data);
      console.log("BODY:", body);
      toast.success(`Usuário criado com sucesso!`);
      setTimeout(() => history.push("/"), 2000);
      setLoadingAuth(false);
    } catch (error) {
      toast.error("Algo deu errado, verifique os campos.");
      console.log(error);
      setLoadingAuth(false);
    }
  };

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Sistema Logo" />
        </div>

        <form onSubmit={onSubmitRegister}>
          <h1>Cadastrar uma conta</h1>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            {loadingAuth ? "Carregando..." : "Cadastrar"}
          </button>
        </form>

        <Link to="/">Já possui uma conta? Entre</Link>
      </div>
    </div>
  );
}
export default Register;
