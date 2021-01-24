import Components from "../partials/Components";
import Navmenu from "../partials/Navigation";
import Footer from "../partials/Footer";
import styles from "../../styles/Home.module.css";

const moduleReporter = require("../api/reportutils");

/****en esta funcion haz todo el cómputo en el servidor, para dejarlo disponible en el return () que pinta el html-componente-page */
export async function getStaticProps({ params }) {
  console.log(params);
  var data = [];
  let fechaDesde = "2020-12-01"; //req.body.fecultimoComite;
  if (fechaDesde == "") {
    fechaDesde = moment().format("yyyy-MM-DD");
  }
  //console.log(`fecha desde: ${fechaDesde}`);
  var data = [];
  let records = await moduleReporter.queryReportPPTX(fechaDesde, data);
  let bloques = moduleReporter.genReportPPTX(records);
  console.log(bloques);

  return {
    props: { bloques },
  };
}

const GenPPTXComite = (props) => {
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

export default GenPPTXComite;
