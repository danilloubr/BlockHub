import { Fragment, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import Button from "@mui/material/Button";
import { Modal } from "react-responsive-modal";
import { useHistory, useParams } from "react-router";

import "react-responsive-modal/styles.css";
import logo from "../../assets/logo.png";
import { TextField } from "@mui/material";

import { getHours } from "../../services/services";
import { PieChart } from "reaviz";

import "./moreinfos.css";

export default function MoreInfos() {
  const { logout, loadingAuth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [horas, setHoras] = useState([]);
  const [pizza, setPizza] = useState([]);

  const { id } = useParams();

  console.log("HORAS", horas);

  const history = useHistory();

  useEffect(() => {
    const onSubmitRegister = async () => {
      try {
        const { data: responsive } = await getHours();
        console.log("HORAS MORE INFO AQUI:", responsive);

        const filterProject = responsive.filter((item) => item.project === id);
        setHoras(filterProject);
        setPizza(filterProject);
      } catch (error) {
        console.log(error);
      }
    };

    onSubmitRegister();
  }, [id]);

  // console.log(
  //   `${horas[0].day.slice(8, 10)}/${horas[0].day.slice(
  //     5,
  //     7
  //   )}/${horas[0].day.slice(0, 4)}.`,
  //   horas[0].hours
  // );

  // const teste = horas.reduce((acc, elem) => {
  //   return acc + elem.hours;
  // }, 0);

  const teste = horas
    .filter((item) => {
      // eslint-disable-next-line no-self-compare
      return item.day === item.day;
    })
    .map((item) => {
      return {
        key: `${item.day.slice(8, 10)}/${item.day.slice(5, 7)}/${item.day.slice(
          0,
          4
        )}.`,
        data: `${item.hours}`,
      };
    });

  // const array2 = [5, 15, -3, 54, -10];
  // const soma = pizza.reduce(
  //   (acc, elem) => {
  //     console.log("acc", acc);

  //     if (elem.day === "") {
  //       acc.negativos.push(elem);
  //     }
  //     if (elem.hours > 0) {
  //       acc.positivos.push(elem);
  //     } else {
  //     }
  //     {
  //     }
  //     return acc;
  //   },
  //   {
  //     negativos: [],
  //     positivos: [],
  //   }
  // );
  // console.log("SOMA:", soma);

  // exemplo de saida: { key: 25/09/2000, data: 8}
  console.log("teste", teste);

  if (!horas) return null;
  if (!pizza) return null;

  console.log("HORAS MORE INFO", horas);
  return (
    <Fragment>
      <div className="container-moreinfos">
        <div className="container-interno-moreinfos">
          <img src={logo} alt="Logo BlockHub" />
          <div className="cards-moreinfos">
            <div className="card-moreinfos">
              {horas.map((item) => (
                <Fragment>
                  <div className="tabela-moreinfos">
                    <h4 style={{ margin: "5px 0 5px 0" }}>
                      Foi adicionado{" "}
                      <b style={{ color: "white", fontSize: "18px" }}>
                        {item.hours}
                      </b>{" "}
                      horas nesse projeto no dia{" "}
                      <b
                        style={{ color: "white", fontSize: "18px" }}
                      >{`${item.day.slice(8, 10)}/${item.day.slice(
                        5,
                        7
                      )}/${item.day.slice(0, 4)}.`}</b>
                    </h4>
                  </div>
                </Fragment>
              ))}
            </div>
            <div className="grafico-pizza">
              <PieChart width={300} height={250} data={teste} />
            </div>
            <div className="resultado-total">
              <h1>
                O tempo investido nesse projeto é de{" "}
                <b style={{ color: "white", fontSize: "60px" }}>
                  {horas.reduce((acc, elem) => {
                    return acc + elem.hours;
                  }, 0)}
                </b>{" "}
                horas.
              </h1>
            </div>
          </div>
          <Button
            variant="contained"
            size="small"
            onClick={() => history.push("/projects")}
          >
            voltar para projetos
          </Button>
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
