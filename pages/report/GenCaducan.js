import Components from "../partials/Components";
import Navmenu from "../partials/Navigation";
import Footer from "../partials/Footer";
import styles from "../../styles/Home.module.css";

const moduleReporter = require("../api/reportutils");

/****en esta funcion haz todo el cómputo en el servidor, para dejarlo disponible en el return () que pinta el html-componente-page */
export async function getStaticProps({ params }) {
  console.log(params);
  let diasfin = 7; //req.body.diasfin;

  var data = [];
  let records = await moduleReporter.queryReportCaducadas(diasfin, data);
  let bloques = moduleReporter.genReportCaducadas(records, diasfin);

  //console.log(bloques);

  return {
    props: { bloques },
  };
}

const GenCaducan = (props) => {
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

export default GenCaducan;
