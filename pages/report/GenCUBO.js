import Components from "../partials/Components";
import Navmenu from "../partials/Navigation";
import Footer from "../partials/Footer";
const moment = require("moment");
require("moment/locale/cs");
import styles from "../../styles/Home.module.css";

const moduleReporter = require("../api/reportutils");

/****en esta funcion haz todo el cómputo en el servidor, para dejarlo disponible en el return () que pinta el html-componente-page */
export async function getStaticProps({ params }) {
  //console.log(params);
  var mesInicial = moment().subtract(2, "month").format("MM");
  var mesFinal = moment().subtract(1, "month").format("MM"); //otros formatos de salida "YYYY MM DD
  var data = [];
  let records = await moduleReporter.queryReportCUBO(
    data,
    mesInicial,
    mesFinal
  );
  let bloques = moduleReporter.genReportCUBO(records);

  var resumen = `Número total de actividades realizadas: ${records.length}`;

  return {
    props: { bloques, resumen },
  };
}

const GenCUBO = (props) => {
  //console.log(props);

  return (
    <div className={styles.container}>
      <Components>
        <title>Site academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Components>
      <Navmenu></Navmenu>
      <main className={styles.main}>
        <p><h5>{props.resumen}</h5></p>

        <ul>
          {props.bloques.map(({ code, desc }) => (
            <li key={code}>
              {desc} : {desc}
            </li>
          ))}
        </ul>
       
      </main>
      <Footer></Footer>
    </div>
  );
};

export default GenCUBO;
