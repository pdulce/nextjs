function About() {
    return <div>About</div>
  }

  // This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `id`.
}

// This gets called on every request
export async function getServerSideProps() {

}
  
export default About