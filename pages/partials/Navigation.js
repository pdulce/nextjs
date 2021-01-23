import Link from 'next/link'

function Menu() {
  return ( 
      <div id="menuSup">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
         <span class="navbar-brand mb-0 h1">Mi laboratorio site</span>
         <button
           class="navbar-toggler"
           type="button"
           data-bs-toggle="collapse"
           data-bs-target="#navbarSupportedContent"
           aria-controls="navbarSupportedContent"
           aria-expanded="false"
           aria-label="Toggle navigation"
         >
           <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarSupportedContent">
           <ul class="navbar-nav me-auto mb-lg-0">
             <li class="nav-item"> 
                   <Link href="/"><a class="nav-link active"><i class="fas fa-home"></i>&nbsp;Home</a></Link>
             </li>
             <li class="nav-item">
                <Link href="/About"><a class="nav-link"><i class="far fa-building"></i>&nbsp;About</a></Link>
             </li>
             <li class="nav-item">
                <Link href="/Contact"><a class="nav-link"><i class="far fa-envelope"></i>&nbsp;Contact</a></Link>
             </li>
             <li class="nav-item">
                <Link href="/Reporting"><a class="nav-link"><i class="fas fa-cog"></i>&nbsp;CDISM Reporting</a></Link>
             </li>
             <li class="nav-item">
                  <Link href="/Discover"><a class="nav-link"><i class="fas fa-satellite-dish"></i>&nbsp;Investment world research</a></Link>
            </li>
  
            <li class="nav-item">                                       
                  <Link href="/UploadForm"><a class="nav-link"><i class="far fa-file-audio"></i>&nbsp;PDF To Audio File</a></Link>
            </li>
           
             <li class="nav-item dropdown">
             
                <a
                 class="nav-link dropdown-toggle active"
                 href="#"
                 id="navbarDropdown"
                 role="button"
                 data-bs-toggle="dropdown"
                 aria-expanded="false"
               >
               <i class="fas fa-chart-area"></i>&nbsp;Gedeones
               </a>
               <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                 <li><a class="dropdown-item" href="/gedeones">Consultar Gedeones</a></li>
                 <li><a class="dropdown-item" href="/acciona">Consultar Acciones Bolsa</a></li>
                 <li><hr class="dropdown-divider" /></li>
                 <li><a class="dropdown-item" href="/fom2">Seguimiento Proyecto FOM2</a></li>
               </ul>
             </li>
           </ul>
           <form class="d-flex">
             <input
               class="form-control me-2"
               type="search"
               placeholder="Search"
               aria-label="Search"
             />
             <button class="btn btn-outline-success" type="submit">Search</button>
           </form>
         </div>
       </div>
     </nav>
  </div>)
}

    
export default Menu




















































































































