import { useRouter } from "next/router";
import Components from "./partials/Components";
import Navmenu from "./partials/Navigation";
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
      </main>

      <footer className={styles.footer}>
        <a
          href="https://pdulcesite.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mi site en WWW
        </a>
      </footer>
    </div>
  );
};

export default About;
