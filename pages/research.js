<!DOCTYPE html>
<html>   

<%- include ('partials/head.html') %>
 
<body>
    <%- include ('partials/navigation.html') %>

    <div>
        <header class="row ion-align-items-start">&nbsp;
            <h5>&nbsp;&nbsp;&nbsp;Machine Learning (ML) aplicado a la búsqueda de tendencias de los mercados y redes sociales en el mundo</h5> 
        </header>
    </div>

    <hr>

    <div class="container-fluid">
        <div class="row align-items-start">
          <div class="col">
            <h6>Cargando imagen aleatoria...</h6>
          </div>
          <div class="col">
            <img src="img/<%=imagen%>" alt="aleatoria" width="450" height="300">
          </div>
          <div class="col">
            <h5>Adivinando imagen con MobileNet (TensorFlow model)...</h5>
            <h6> 
                <ul> 
                    <% content.map((result)=>{ %>
                        <li>
                            <%= result.className %> ==>  <%= result.probability %>
                        </li>
                    <% }) %>
                </ul>
            </h6>
          </div>
        </div>
    </div>

    <hr>

    <div class="container-fluid">
        <div class="row align-items-end">
          <div class="col">
            <h5> &nbsp;Introduzca un tema sobre el que descubrir!!</h5>
          </div>
          <div class="col">
            <form action="/discover" method="POST">
                <div class="mb-3">
                    <label for="temas" class="form-label">Términos de búsqueda</label>
                    <input type="text" class="form-control" name="temas" id="temas" aria-describedby="temasHelp" value="<%=terminos%>">
                    <div id="temasHelp" class="form-text">Separados por ','</div>
                </div>
                <button type="submit" class="btn btn-primary"><i class="fab fa-youtube fa-2x"></i></button>
            </form>
          </div>
          <div class="col">
            <h5>Adivinando historias sobre estos términos...(mediante webscrapping con cheerio)</h5>
          </div>
        </div>
    </div>

    <%-include ('partials/footer.html'); %>
   
</body>     
</html>  