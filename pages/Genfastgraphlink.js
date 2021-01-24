import { useRouter } from "next/router";
import Components from "./partials/Components";
import Navmenu from "./partials/Navigation";
import styles from "../styles/Home.module.css";

const moduleReporter = require("./api/reportutils");

const Genfastgraphlink = () => {
  const router = useRouter();
  const { graphiourl } = router.query;

  let configuration = moduleReporter.generarGraficoJSON();
  const myChart = new QuickChart();
  myChart
    .setConfig(configuration)
    .setWidth(800)
    .setHeight(600)
    .setBackgroundColor("white" /*'transparent'*/);
  // Print the chart URL
  console.log(myChart.getUrl());
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.render("report.html", {
    title: "Genere su gráfico",
    entry: 5,
    graphiourl: myChart.getUrl(),
  });

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
          <a href={graphiourl}>Link de su stats graph generado en remoto</a>
        </h4>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Genfastgraphlink;
