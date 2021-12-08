/* eslint-disable no-self-compare */
import { Fragment, useContext, useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { PDFExport } from "@progress/kendo-react-pdf";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Modal } from "react-responsive-modal";
import { getHours } from "../../services/services";

import { PieChart } from "reaviz";
import { TextField, Button } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import TableViewIcon from "@mui/icons-material/TableView";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { AuthContext } from "../../contexts/auth";

import logo from "../../assets/logo.png";
import "react-responsive-modal/styles.css";
import "./moreinfos.css";

export default function MoreInfos() {
  const { logout, loadingAuth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [horas, setHoras] = useState([]);

  const { id } = useParams();

  const pdfExportComponent = useRef(null);

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const actions = [
    {
      icon: (
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="Tabela de Horas do Projeto"
          sheet="Tabela de Horas do Projeto"
          buttonText={<TableViewIcon />}
        />
      ),
      name: "Salvar Tabela para EXCEL",
    },
    {
      icon: (
        <ReactHTMLTableToExcel
          className="download-table-xls-button"
          buttonText={<PictureAsPdfIcon />}
        />
      ),
      name: "Salvar PDF",
      do: () => exportPDFWithComponent(),
    },
  ];

  const history = useHistory();

  useEffect(() => {
    const onSubmitRegister = async () => {
      try {
        const { data: responsive } = await getHours();

        const filterProject = responsive.filter((item) => item.project === id);
        setHoras(filterProject);
      } catch (error) {
        console.log(error);
      }
    };

    onSubmitRegister();
  }, [id]);

  const menuPizza = horas
    .filter((item) => {
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

  if (!horas) return null;

  return (
    <Fragment>
      <table className="tabela-moreinfos-excel" id="table-to-xls">
        <tr>
          <th>Projeto ID</th>
          <th>Colaborador ID</th>
          <th>Horas</th>
          <th>Data</th>
        </tr>

        {horas.map((item) => {
          return (
            <>
              <tr key={item._id}>
                <td>{item.project}</td>
                <td>{item.user}</td>
                <td>{item.hours}</td>
                <td>{item.day}</td>
              </tr>
            </>
          );
        })}
      </table>

      <div className="container-moreinfos">
        <div className="container-interno-moreinfos">
          <img src={logo} alt="Logo BlockHub" />
          <div className="teste">
            <PDFExport
              ref={pdfExportComponent}
              paperSize="auto"
              margin={40}
              fileName={`Resumo do Projeto - ${new Date().getFullYear()}`}
              author="Danilo Sousa"
            >
              <div className="cards-moreinfos">
                <div className="card-moreinfos">
                  {horas.map((item) => {
                    return (
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
                    );
                  })}
                  <div className="tabela-moreinfos"></div>
                </div>
                <div className="grafico-pizza">
                  <PieChart width={300} height={250} data={menuPizza} />
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
                <div className="downloads">
                  <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    icon={<FileDownloadOutlinedIcon />}
                  >
                    {actions.map((action) => (
                      <SpeedDialAction
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.do}
                      />
                    ))}
                  </SpeedDial>
                </div>
              </div>
            </PDFExport>
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
