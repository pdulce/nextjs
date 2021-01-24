import { useRouter } from "next/router";
import Components from "./partials/Components";
import Navmenu from "./partials/Navigation";
import Footer from "./partials/Footer";
import styles from "../styles/Home.module.css";
// import Interaction from "../next-form/Interaction";

//const moduleReporter = require('./api/reportutils')

const Reporting = () => {
  const title = "Informes del contrato CDISM";

  const router = useRouter();
  console.log(router);
  //if (req.method === "POST") {
  //como recoger parámetros qeu vengan en el body en lugar de la url, de la request
  /*console.log("method passed is POST");
    res.statusCode = 200;
    const { tipoinforme } = router.body;
    console.log(router);

    if (tipoinforme == "genCUBO") {
      console.log(tipoinforme);
      var data = [];*/
  //let records = await moduleReporter.queryReportCUBO(data);
  //let bloques = moduleReporter.genReportCUBO(records);
  //res.setHeader("Content-Type", "text/plain; charset=UTF-8");
  //res.write(bloques);
  //res.end();
  /*return (
            <div></div>
        )*/
  //}
  //} else {
  // Handle any other HTTP method
  //  console.log(
  //  "*** LLEga el mgetodo " +   req.method );
  // }

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
              {/* <Interaction action="/Reporting" method="POST"> */}
              <form name="cubo" action="/Reporting" method="POST">
                <button type="submit" class="btn btn-primary">
                  <i class="fab fa-youtube fa-2x"></i>
                </button>
                <input
                  type="hidden"
                  name="tipoinforme"
                  defaultValue="genCUBO"
                />
              </form>
              {/* </Interaction> */}

              <br />
              <form action="/Reporting" method="POST">
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
                  <input
                    type="hidden"
                    name="tipoinforme"
                    defaultValue="caducanSoon"
                  />
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
              <form action="/Reporting" method="POST">
                <input
                  type="hidden"
                  name="tipoinforme"
                  defaultValue="genCertMensualAT"
                />
                <button type="submit" class="btn btn-primary">
                  <i class="fab fa-youtube fa-2x"></i>
                </button>
              </form>
              <br />
              <form name="pptx" action="/Reporting" method="POST">
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
                  <input
                    type="hidden"
                    name="tipoinforme"
                    defaultValue="informePPTX"
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
              <form name="pptx" action="/Genfastgraphlink" method="POST">
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
