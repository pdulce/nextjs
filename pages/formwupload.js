<!DOCTYPE html>
<html>   
 
<%- include ('partials/head.html') %>
  
<body>
    <%- include ('partials/navigation.html') %>
    
    <form action="/fileupload" method="post" enctype="multipart/form-data">
        <input type="file" name="filetoupload"><br>
        <input type="submit">
    </form>

    <br/>
    <h4><%= title %></h4>
    <br/>
    <h4><a href="generated/<%= converted %>">Último fichero de audio convertido a partir del PDF procesado</a>

    <br>
    <h4>Ficheros de audio ya convertidos</h4>
    <ul>
        <% for (let i = 0; i < listamp3.length; i++) { %>
            <li> <a href="generated/<%= listamp3[i] %>"><%= listamp3[i] %></a></li>
        <% } %>
    </ul>
    
    <%-include ('partials/footer.html'); %>
    
</body>     
</html>  