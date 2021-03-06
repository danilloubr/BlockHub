import { Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { Modal } from "react-responsive-modal";

import { AuthContext } from "../../contexts/auth";
import {
  TextField,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import {
  getProjects,
  editProjects,
  getUsers,
  postHours,
} from "../../services/services";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoNotTouchIcon from "@mui/icons-material/DoNotTouch";

import logo from "../../assets/logo.png";
import "react-responsive-modal/styles.css";
import "./projects.css";

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [busca, setBusca] = useState("");
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [colaborador, setColaborador] = useState("");
  const [colaboradorSelected, setColaboradorSelected] = useState("");
  const [nomeProjeto, setNomeProjeto] = useState("");

  const { logout, setLoadingAuth, loadingAuth } = useContext(AuthContext);

  const history = useHistory();

  const body = {
    hours: hours,
    day: date,
    project: nomeProjeto,
    user: colaboradorSelected,
  };

  useEffect(() => {
    const onSubmitRegister = async () => {
      try {
        const { data: responsive } = await getProjects();

        setProjects(responsive);
      } catch (error) {
        console.log(error);
      }
    };

    onSubmitRegister();
  }, []);

  useEffect(() => {
    const onSubmitRegister = async () => {
      try {
        const { data: responsive } = await getUsers();

        setColaborador(responsive);
      } catch (error) {
        console.log(error);
      }
    };

    onSubmitRegister();
  }, []);

  if (!colaborador) return null;

  const handleModal = () => {
    setOpen(true);
    setLoadingAuth(false);
  };

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
      await editProjects(id, {
        ...projects,
        name: projects.name,
        active: false,
      });

      toast.success("Projeto destivado com sucesso!");
      history.push("/dashboard");
    } catch (error) {
      toast.error("EITA, algo deu errado.");
    }
  };

  const addHours = async () => {
    try {
      await postHours(body);

      setOpen(false);
      setHours("");
      setNomeProjeto("");
      setColaboradorSelected("");

      setDate("");
      toast.success("Hora adicionada com sucesso!");
    } catch (error) {
      toast.error("EITA, algo deu errado.");
    }
  };

  return (
    <Fragment>
      <div className="container-projeto">
        <div className="container-interno-projeto ">
          <div className="div-nav">
            <img src={logo} alt="Logo BlockHub" />
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={() => handleModal()}
            >
              Adicionar hora ao projeto
            </Button>
          </div>
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
                  <Fragment>
                    {projeto.active ? (
                      <div className="card-projeto" key={projeto._id}>
                        <h2>{projeto.name}</h2>
                        <h5>
                          PROJETO: ATIVO
                          {projeto.active && <CheckCircleIcon />}
                        </h5>
                        <div className="botoes-projeto">
                          <Button
                            variant="contained"
                            size="large"
                            onClick={() =>
                              history.push(`/moreinfos/${projeto._id}`)
                            }
                          >
                            Mais Informa????es
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
                            size="large"
                          >
                            Mais Informa????es
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
          <div className="div-btn-fim">
            <Button
              color="error"
              variant="outlined"
              size="large"
              onClick={() => logout()}
            >
              {" "}
              LOGOUT{" "}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => history.push("/dashboard")}
            >
              {" "}
              voltar{" "}
            </Button>
          </div>
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
            <h1>ADICIONAR HORAS AO PROJETO</h1>
            <p>Tenha o total controle do tempo gasto nos seus projetos.</p>

            <FormControl sx={{ margin: "10px 0 10px 0" }}>
              <InputLabel id="input-horas">Quantidade de Horas</InputLabel>
              <Select
                labelId="input-horas"
                id="input-horas"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                autoWidth
                label="Quantidade de Horas"
              >
                <MenuItem value={1}>1 hora</MenuItem>
                <MenuItem value={2}>2 horas</MenuItem>
                <MenuItem value={3}>3 horas</MenuItem>
                <MenuItem value={4}>4 horas</MenuItem>
                <MenuItem value={5}>5 horas</MenuItem>
                <MenuItem value={6}>6 horas</MenuItem>
                <MenuItem value={7}>7 horas</MenuItem>
                <MenuItem value={8}>8 horas</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ margin: "10px 0 10px 0" }}>
              <InputLabel id="input-projetos">Selecionar Projeto</InputLabel>
              <Select
                labelId="input-projetos"
                id="input-projetos"
                value={nomeProjeto}
                onChange={(e) => setNomeProjeto(e.target.value)}
                autoWidth
                label="Selecionar Projeto"
              >
                {projects.map((projeto) => {
                  return (
                    <MenuItem value={projeto._id}>{projeto.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl sx={{ margin: "10px 0 10px 0" }}>
              <InputLabel id="input-colaborador">
                Selecionar Colaborador
              </InputLabel>
              <Select
                labelId="input-colaborador"
                id="input-colaborador"
                value={colaboradorSelected}
                onChange={(e) => setColaboradorSelected(e.target.value)}
                autoWidth
                label="Selecionar Projeto"
              >
                {colaborador.map((colaborador) => {
                  return (
                    <MenuItem value={colaborador._id}>
                      {colaborador.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              label="Selecionar Data"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button variant="outlined" size="large" onClick={() => addHours()}>
              {loadingAuth ? "Cadastrando..." : "ADICIONAR"}
            </Button>
          </div>
          <br />
        </Modal>
      </div>
    </Fragment>
  );
}
