import { useRouter } from "next/router";
import Components from "./partials/Components";
import Navmenu from "./partials/Navigation";
import styles from "../styles/Home.module.css";

const About = () => {
  const router = useRouter();
  const { menuentry } = router.query;

  return (
    <div className={styles.container}>
      <Components>
        <title>Site academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Components>
      <Navmenu></Navmenu>

      <main className={styles.main}>
        <p>Menuentry param passed: {menuentry}</p>
      </main>
    </div>
  );
};

export default About;
