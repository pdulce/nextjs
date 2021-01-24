import { useRouter } from "next/router";
import Components from "./partials/Components";
import Navmenu from "./partials/Navigation";
import Footer from "./partials/Footer";
import styles from "../styles/Home.module.css";

const About = () => {
  const router = useRouter();
  const { menuentry, another } = router.query;

  return (
    <div className={styles.container}>
      <Components>
        <title>Site academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Components>
      <Navmenu></Navmenu>

      <main className={styles.main}>
        <p>Menuentry param passed: {menuentry}</p>
        <p>another param passed: {another} </p>
        Acerca de mí: ver CV actualizado enero'21
      </main>
      <Footer></Footer>
    </div>
  );
};

export default About;
