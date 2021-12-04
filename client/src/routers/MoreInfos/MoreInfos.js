import { Fragment, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import Button from "@mui/material/Button";
import { Modal } from "react-responsive-modal";
import { useHistory, useParams } from "react-router";

import "react-responsive-modal/styles.css";
import logo from "../../assets/logo.png";
import { TextField } from "@mui/material";

import { toast } from "react-toastify";
import { getHours, registerProject } from "../../services/services";

import "./moreinfos.css";

export default function MoreInfos() {
  const { logout, setLoadingAuth, loadingAuth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [horas, setHoras] = useState([]);

  const { id } = useParams();
  console.log("ID MORE INFOS", id);

  const history = useHistory();

  useEffect(() => {
    const onSubmitRegister = async () => {
      try {
        const { data: responsive } = await getHours();
        console.log("HORAS MORE INFO AQUI:", responsive);
        //   console.log("BODY:", body);
        const filterProject = responsive.filter((item) => item.project === id);
        setHoras(filterProject);
      } catch (error) {
        console.log(error);
      }
    };

    onSubmitRegister();
  }, [id]);

  if (!horas) return null;

  const openModal = () => {
    setOpen(true);
    setLoadingAuth(false);
  };
  console.log("HORAS MORE INFO", horas);
  return (
    <Fragment>
      <div className="container">
        <div className="container-interno">
          <img src={logo} alt="Logo BlockHub" />
          <div className="cards">
            <div className="card-moreinfos">
              {horas.map((item) => (
                <Fragment>
                  <div>
                    <h4>
                      Foi adicionado{" "}
                      <b style={{ color: "#1665C0", fontSize: "18px" }}>
                        {item.hours}
                      </b>{" "}
                      horas nesse projeto no dia{" "}
                      <b
                        style={{ color: "#1665C0", fontSize: "18px" }}
                      >{`${item.day.slice(8, 10)}/${item.day.slice(
                        5,
                        7
                      )}/${item.day.slice(0, 4)}.`}</b>
                    </h4>
                  </div>
                </Fragment>
              ))}
              <div>
                <h1>
                  O tempo investido nesse projeto é de{" "}
                  <b style={{ color: "#1665C0", fontSize: "40px" }}>
                    {horas.reduce((acc, elem) => {
                      return acc + elem.hours;
                    }, 0)}{" "}
                  </b>
                  horas.
                </h1>
              </div>

              <Button
                variant="contained"
                size="small"
                onClick={() => history.push("/projects")}
              >
                voltar para projetos
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
              onClick={() => "onSubmitRegister()"}
            >
              {loadingAuth ? "Cadastrando..." : "ADICIONAR"}
            </Button>
          </div>
          <br />
        </Modal>
      </div>
    </Fragment>
  );
}
