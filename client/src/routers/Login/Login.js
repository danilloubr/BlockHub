import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import "./login.css";
import logo from "../../assets/logo.png";
import { useHistory } from "react-router";
import { Button, TextField } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const { onSubmit, loadingAuth, setLoadingAuth } = useContext(AuthContext);

  const body = { email: email, password: password };

  useEffect(() => {
    localStorage.setItem("token", "tokenValid");
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(body);
    setLoadingAuth(true);
    setTimeout(() => history.push("/dashboard"), 3000);
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Sistema Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <div className="inputs-form">
            <TextField
              type="text"
              label="Usuário"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="Senha"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="botao-form">
            <Button variant="contained" size="large" type="submit">
              {loadingAuth ? "Carregando..." : "Acessar"}
            </Button>
          </div>
        </form>

        <Link to="/register">Não tem uma conta? Cadastre-se</Link>
      </div>
    </div>
  );
}

export default Login;
