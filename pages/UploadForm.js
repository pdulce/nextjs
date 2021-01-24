import { useRouter } from "next/router";
import Components from "./partials/Components";
import Navmenu from "./partials/Navigation";
import styles from "../styles/Home.module.css";

const UploadForm = (req, res) => {

  const router = useRouter();
  const { menuentry } = router.query;
  if (req.method === "POST") {//como recoger parámetros qeu vengan en el body en lugar de la url, de la request
    console.log("method passed is POST");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        msg: req.body,
      })
    );
  } else {
    // Handle any other HTTP method
    console.log("method passed is GET");
  }

  return (
    <div className={styles.container}>
      <Components>
        <title>Site academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Components>
      <Navmenu></Navmenu>

      <main className={styles.main}>
        <form action="/fileupload" method="post" enctype="multipart/form-data">
          <input type="file" name="filetoupload"></input><br/>
          <input type="submit"></input>
        </form>
        <br/>
        <h4><a href="generated/paramreceived">Último fichero de audio convertido a partir del PDF procesado</a></h4>
        <br></br>
        <br></br>
          <h4>Ficheros de audio ya convertidos</h4>
          <ul>
           {/* for (let i = 0; i < listamp3.length  i++) */}
               <li> <a href="generated/gen-i">gen i-esimo</a></li>
           {/* end-for */}
          </ul>
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

export default UploadForm;