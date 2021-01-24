import Components from "./partials/Components"
import Navmenu from "./partials/Navigation"
import styles from "../styles/Home.module.css"
import Footer from "./partials/Footer"

export default function Home() {
  return (
    <div className={styles.container}>
      <Components>
        <title>Site academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Components>

      <Navmenu></Navmenu>

      <main className={styles.main}>
        <h3 className={styles.title}>
          Bienvenido a mi site de aprendizaje de Next.js
        </h3>
        <h4>
          Este proyecto se va a ir alimentando de la rama <i>local-academy</i>{" "}
          de mi &nbsp;
          <a href="https://github.com/pdulce/nextjs">git account repo</a>
        </h4>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <p>Adéntrate en el mundo de Nextjs a través de su documentación.</p>
          </a>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}
