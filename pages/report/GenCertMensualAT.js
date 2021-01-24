import Components from "../partials/Components";
import Navmenu from "../partials/Navigation";
import Footer from "../partials/Footer";
import styles from "../../styles/Home.module.css";
const moment = require("moment");
require("moment/locale/cs");

const moduleReporter = require("../api/reportutils");

/****en esta funcion haz todo el cómputo en el servidor, para dejarlo disponible en el return () que pinta el html-componente-page */
export async function getStaticProps({ params }) {
  console.log(params);

  var mesCertificado = moment().subtract(-1, "month").format("MM");
  var data = [];
  let records = await moduleReporter.queryCertifMensualAT(data);
  let bloques = moduleReporter.genCertifMensualAT(records, mesCertificado);

  //console.log(bloques);

  return {
    props: { bloques },
  };
}

const GenCertMensualAT = (props) => {
  //console.log(props);

  return (
    <div className={styles.container}>
      <Components>
        <title>Site academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Components>
      <Navmenu></Navmenu>
      <main className={styles.main}>
        <p>{props.bloques}</p>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default GenCertMensualAT;
