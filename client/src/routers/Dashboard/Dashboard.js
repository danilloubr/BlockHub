import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Button from "@mui/material/Button";
import { Modal } from "react-responsive-modal";
import { useHistory } from "react-router";

import "./dashboard.css";
import "react-responsive-modal/styles.css";
import logo from "../../assets/logo.png";
import { TextField } from "@mui/material";

import { toast } from "react-toastify";
import { registerProject } from "../../services/services";

export default function Dashboard() {
  const { logout, setLoadingAuth, loadingAuth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const history = useHistory();

  const body = { name: name, active: true };

  const onSubmitRegister = async () => {
    try {
      setLoadingAuth(true);
      const { data } = await registerProject(body);
      console.log("DATA AQUI:", data);
      console.log("BODY:", body);
      toast.success(`Projeto criado com sucesso!`);
      setTimeout(() => history.push("/projects"), 2000);
      setLoadingAuth(false);
    } catch (error) {
      toast.error("Algo deu errado, verifique os campos.");
      console.log(error);
      setLoadingAuth(false);
    }
  };

  return (
    <div className="container">
      <div className="container-interno">
        <img src={logo} alt="Logo BlockHub" />
        <div className="cards">
          <div className="card">
            <h2>NOVO PROJETO</h2>
            <Button
              variant="contained"
              size="large"
              onClick={() => setOpen(true)}
            >
              ADICIONAR
            </Button>
          </div>
          <div className="card">
            <h2>TODOS OS PROJETOS</h2>
            <Button
              variant="contained"
              size="large"
              onClick={() => history.push("/projects")}
            >
              ACESSAR
            </Button>
          </div>
        </div>
        <Button variant="outlined" size="large" onClick={() => logout()}>
          {" "}
          LOGOUT{" "}
        </Button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
      >
        <br />

        <div className="container-modal">
          <h1>ADICIONAR NOVO PROJETO</h1>
          <p>Organize as horas trabalhadas nos seus projetos.</p>

          <TextField
            type="text"
            placeholder="Nome do projeto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="outlined"
            size="large"
            onClick={() => onSubmitRegister()}
          >
            {loadingAuth ? "Cadastrando..." : "ADICIONAR"}
          </Button>
        </div>
        <br />
      </Modal>
    </div>
  );
}
