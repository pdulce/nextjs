import styles from "../styles/Home.module.css"; 

const Footer = () =>{ 
  
  return (
    <footer className={styles.footer}>
      <div>
        <p class="h4">Madrid, Spain 2021</p>
        <a
          href="https://pdulcesite.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mi site en WWW
        </a>
      </div>
    </footer>
  ) 
} 

export default Footer
