import { useRouter } from "next/router";
import Components from "./partials/Components";
import Navmenu from "./partials/Navigation";
import Footer from "./partials/Footer";
import styles from "../styles/Home.module.css";
// import Interaction from "../next-form/Interaction";

const Reporting = () => {
  const title = "Informes del contrato CDISM";

  const router = useRouter();
  console.log(router);

  return (
    <div className={styles.container}>
      <Components>
        <title>Site academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Components>
      <Navmenu></Navmenu>
      <main className={styles.main}>
        <h4> {title}</h4>
        <section class="container-fluid" id="home">
          <div class="row bg-dark text-white p-5 text-center">
            <div class="col-sm-3 vertical-center">
              <br />
              <h6> &nbsp;Informe bimensual Métrica CUBO (Babel)</h6>
              <br />
              <hr />
              <br />
              <br />
              <br />
              <h6> &nbsp;Informe Peticiones que finalizan en x días</h6>
            </div>
            <div class="col-sm-2">
              <form
                name="cubo"
                action="/report/GenCUBO?menuentry=reporting"
                method="POST"
              >
                <button type="submit" class="btn btn-primary">
                  <i class="fab fa-youtube fa-2x"></i>
                </button>
              </form>

              <br />
              <form
                action="/report/GenCaducan?menuentry=reporting"
                method="POST"
              >
                <div class="mb-3">
                  <label for="diasfin" class="form-label">
                    Max. días para finalización
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="diasfin"
                    id="diasfin"
                    aria-describedby="diasfinHelp"
                    defaultValue="7"
                  />
                  <div id="diasfinHelp" class="form-text">
                    Establezca el núm. x de días
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">
                  <i class="fab fa-youtube fa-2x"></i>
                </button>
              </form>
            </div>
            <div class="col-sm-3">
              <br />
              <h6> &nbsp;Informe Mensual UTE Actividades AT</h6>
              <br />
              <hr />
              <br />
              <br />
              <br />
              <h6> &nbsp;Informe Actividades para PPTX Seguimiento</h6>
            </div>
            <div class="col-sm-2">
              <form
                action="/report/GenCertMensualAT?menuentry=reporting"
                method="POST"
              >
                <button type="submit" class="btn btn-primary">
                  <i class="fab fa-youtube fa-2x"></i>
                </button>
              </form>
              <br />
              <form
                name="pptx"
                action="/report/GenPPTXComite?menuentry=reporting"
                method="POST"
              >
                <div class="mb-6">
                  <label for="fecultimoComite" class="form-label">
                    Fecha último Comité Seguimiento
                  </label>
                  <input
                    size="12"
                    type="text"
                    class="form-control"
                    defaultValue="2021-01-01"
                    name="fecultimoComite"
                    id="fecultimoComite"
                    aria-describedby="fecultimoComiteHelp"
                    readOnly
                  />
                  <div id="fecultimoComiteHelp" class="form-text">
                    formato <i>yyyy-mm-dd</i>
                  </div>
                  {/*  <script type="text/javascript">
                                    $("#fecultimoComite").datetimepicker({
                                            format: 'yyyy-mm-dd'
                                     });
                                    </script> */}
                </div>
                <button type="submit" class="btn btn-primary">
                  <i class="fab fa-youtube fa-2x"></i>
                </button>
              </form>
              <form
                name="pptx"
                action="/report/Genfastgraphlink?menuentry=reporting"
                method="POST"
              >
                <button type="submit" class="btn btn-primary">
                  <i class="fab fa-youtube fa-2x"></i>Gráfico a medida con
                  quickReport
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default Reporting;
