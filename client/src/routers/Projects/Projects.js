import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Button from "@mui/material/Button";
import { Modal } from "react-responsive-modal";
import { useHistory } from "react-router";

import "./projects.css";
import "react-responsive-modal/styles.css";
import logo from "../../assets/logo.png";
import { TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoNotTouchIcon from "@mui/icons-material/DoNotTouch";

import { toast } from "react-toastify";
import { getProjects, editProjects } from "../../services/services";

export default function Projects() {
  const { logout, setLoadingAuth, loadingAuth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [busca, setBusca] = useState("");

  const history = useHistory();

  //   const body = { name: name, active: true };

  useEffect(() => {
    const onSubmitRegister = async () => {
      try {
        const { data: responsive } = await getProjects();
        console.log("RESPONSIVE AQUI:", responsive);
        //   console.log("BODY:", body);

        setProjects(responsive);
      } catch (error) {
        console.log(error);
      }
    };

    onSubmitRegister();
  }, []);

  const activeProject = async (id) => {
    try {
      const { data: resp } = await editProjects(id, {
        ...projects,
        name: projects.name,
        active: true,
      });
      console.log(resp);

      toast.success("Projeto ativado com sucesso!");
      history.push("/dashboard");
    } catch (error) {
      toast.error("EITA, algo deu errado.");
    }
  };
  const disableProject = async (id) => {
    try {
      const { data: resp } = await editProjects(id, {
        ...projects,
        name: projects.name,
        active: false,
      });
      console.log(resp);

      toast.success("Projeto destivado com sucesso!");
      history.push("/dashboard");
    } catch (error) {
      toast.error("EITA, algo deu errado.");
    }
  };

  console.log("PROJETOS", projects);
  return (
    <Fragment>
      <div className="container-projeto">
        <div className="container-interno-projeto ">
          <img src={logo} alt="Logo BlockHub" />
          <div className="div-input">
            <TextField
              value={busca}
              onChange={(ev) => setBusca(ev.target.value)}
              label={"PESQUISAR PROJETO"}
              type="text"
              color="primary"
              focused
            />
          </div>
          <div className="cards-projeto">
            {projects
              .filter((item) =>
                item.name.toLowerCase().includes(busca?.toLowerCase())
              )
              .map((projeto) => {
                return (
                  <Fragment key={projeto._id}>
                    {projeto.active ? (
                      <div className="card-projeto">
                        <h2>{projeto.name}</h2>
                        <h5>
                          PROJETO: ATIVO
                          {projeto.active && <CheckCircleIcon />}
                        </h5>
                        <div className="botoes-projeto">
                          <Button variant="contained" size="small">
                            Mais Informações
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                          >
                            Adicionar hora
                          </Button>
                        </div>
                        <p onClick={() => disableProject(projeto._id)}>
                          DESATIVAR PROJETO
                        </p>
                      </div>
                    ) : (
                      <div key={projeto._id} className="card-projeto-false">
                        <h2>{projeto.name}</h2>
                        <h5>
                          PROJETO: DESATIVADO
                          {!projeto.active && <DoNotTouchIcon />}
                        </h5>
                        <div className="botoes-projeto">
                          <Button
                            variant="contained"
                            style={{ opacity: 0.2, cursor: "not-allowed" }}
                            size="small"
                          >
                            Mais Informações
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            style={{ opacity: 0.2, cursor: "not-allowed" }}
                          >
                            Adicionar hora
                          </Button>
                        </div>
                        <p onClick={() => activeProject(projeto._id)}>
                          ATIVAR PROJETO
                        </p>
                      </div>
                    )}
                  </Fragment>
                );
              })}
          </div>
          <Button variant="outlined" size="large" onClick={() => logout()}>
            {" "}
            LOGOUT{" "}
          </Button>
        </div>

        {/* <Modal
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
        </Modal> */}
      </div>
    </Fragment>
  );
}
