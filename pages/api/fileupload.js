import { useRouter } from "next/router
import Components from "./partials/Com
import Navmenu from "./partials/Naviga
import styles from "../styles/Home.mod

const FileUpload = (req, res) => {
  //const router = useRouter();
  //const { menuentry } = router.query;

  if (req.method === "POST") {//como
    console.log("method passed is POST");
  }else {
    // Handle any other HTTP method
    console.log("method passed is GET");
  }
    /***
     * var dirmp3 = path.join(__dirname, "../public/generated");
var listamp3 = fs.readdirSync(dirmp3);

res.setHeader("Content-Type", "text/html; charset=utf-8");
res.render( "formwupload.html", 
{title: 'Adjunte un fichero .pdf', converted: '#', listamp3: listamp3, entry: 7});
     * 
     */ 

  return (<div><h3>Prueba</h3></div>);
};


export default FileUpload;



