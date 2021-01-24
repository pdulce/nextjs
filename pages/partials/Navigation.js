import Link from "next/link";
import { useRouter } from "next/router";

const Menu = () => {
  const router = useRouter();

  //console.log(router)
  //console.log(router.route == '/')
  const { menuentry } = router.query;

  var class_menu_entry_home = "nav-link active";
  if (router.route != '/' && menuentry != "home") {
    class_menu_entry_home = "nav-link";
  }
  var class_menu_entry_about = "nav-link";
  if (menuentry == "about") {
    class_menu_entry_about = "nav-link active";
  }
  var class_menu_entry_contact = "nav-link";
  if (menuentry == "contact") {
    class_menu_entry_contact = "nav-link active";
  }
  var class_menu_entry_reporting = "nav-link";
  if (menuentry == "reporting") {
    class_menu_entry_reporting = "nav-link active";
  }
  var class_menu_entry_discover = "nav-link";
  if (menuentry == "discover") {
    class_menu_entry_discover = "nav-link active";
  }
  var class_menu_entry_upload = "nav-link";
  if (menuentry == "upload") {
    class_menu_entry_upload = "nav-link active";
  }
  var class_menu_entry_gedeones = "nav-link dropdown-toggle";
  if (menuentry == "gedeones") {
    class_menu_entry_gedeones = "nav-link dropdown-toggle active";
  }

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
                <Link href={{ pathname: "/", query: { menuentry: "home" } }}>
                  <a class={class_menu_entry_home}>
                    <i class="fas fa-home"></i>&nbsp;Home
                  </a>
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  href={{
                    pathname: "/About",
                    query: { menuentry: "about", another: "prueba" },
                  }}
                >
                  <a class={class_menu_entry_about}>
                    <i class="far fa-building"></i>&nbsp;About
                  </a>
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  href={{
                    pathname: "/Contact",
                    query: { menuentry: "contact" },
                  }}
                >
                  <a class={class_menu_entry_contact}>
                    <i class="far fa-envelope"></i>&nbsp;Contact
                  </a>
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  href={{
                    pathname: "/Reporting",
                    query: { menuentry: "reporting" },
                  }}
                >
                  <a class={class_menu_entry_reporting}>
                    <i class="fas fa-cog"></i>&nbsp;CDISM Reporting
                  </a>
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  href={{
                    pathname: "/Discover",
                    query: { menuentry: "discover" },
                  }}
                >
                  <a class={class_menu_entry_discover}>
                    <i class="fas fa-satellite-dish"></i>&nbsp;World histories research
                  </a>
                </Link>
              </li>

              <li class="nav-item">
                <Link
                  href={{
                    pathname: "/UploadForm",
                    query: { menuentry: "upload" },
                  }}
                >
                  <a class={class_menu_entry_upload}>
                    <i class="far fa-file-audio"></i>&nbsp;PDF To Audio File
                  </a>
                </Link>
              </li>

              <li class="nav-item dropdown">
                <a
                  class={class_menu_entry_gedeones}
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fas fa-chart-area"></i>&nbsp;Gedeones
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      href={{
                        pathname: "/Gedeones",
                        query: { menuentry: "gedeones" },
                      }}
                    >
                      <a class="dropdown-item" href="/Gedeones">
                        Consultar Gedeones
                      </a>
                    </Link>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/Acciona">
                      Consultar Acciones Bolsa
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" href="/Fom2">
                      Seguimiento Proyecto FOM2
                    </a>
                  </li>
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
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
