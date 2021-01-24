const QuickChart = require("quickchart-js")
import Components from "./partials/Components"
import Navmenu from "./partials/Navigation"
import Footer from "./partials/Footer"
import styles from "../styles/Home.module.css"

const moduleReporter = require("./api/reportutils")

/****en esta funcion haz todo el cómputo en el servidor, para dejarlo disponible en el return () que pinta el html-componente-page */
export async function getStaticProps({ params }) {
  let configuration = moduleReporter.generarGraficoJSON();
  const myChart = new QuickChart();
  myChart
    .setConfig(configuration)
    .setWidth(800)
    .setHeight(600)
    .setBackgroundColor("white" /*'transparent'*/);
  //console.log(myChart.getUrl());
  const url_ = myChart.getUrl();
  return {
    props: { url_ }
  };
}

const Genfastgraphlink = (props) => {
 
  //console.log(props);

  return (
    <div className={styles.container}>
      <Components>
        <title>Site academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Components>
      <Navmenu></Navmenu>
      <main className={styles.main}>
        <h3 className={styles.title}>Pulse en el link para ver su gráfico</h3>
        <h4>
          <a href={props.url_}>
            Link de su stats graph generado en remoto
          </a>
        </h4>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Genfastgraphlink;
