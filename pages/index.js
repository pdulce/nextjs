import Components from './partials/Components'
import Navmenu from './partials/Navigation'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>

      <Components>
        <title>Site academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Components>
     
      <main className={styles.main}>
        
        <Navmenu></Navmenu>

        <h1 className={styles.title}>
          Bienvenido a <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <h3>Este proyecto se va a ir alimentando de la rama local-academy</h3>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <p>Adéntrate en el mundo de Nextjs a través de su documentación.</p>
          </a>
        </div>
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
  )
}

<style jsx>{`
    .button{
      background-color: #4caf50;
      width: 100%;
      color: orange;
      padding: 16px;
      margin: 10px 0px;
      border: none;
      cursor: pointer;
     }
     .form {
      border: 3px solid #f1f1f1;
     }

`}

</style>