<!DOCTYPE html>
<html>   
 
<%- include ('partials/head.html') %>
  
<body>
    <%- include ('partials/navigation.html') %>
    
    <div class="p-5">
        <div class="row">
                <div class="col">col11</div>
                <div class="col">col12</div>
        </div>
        <div class="row">
            <div class="col">col21</div>
            <div class="col">col22</div>
        </div>
    </div>

    <h3> Contacto e-mail me!! </h3>
    <br/>
    <h4><%= title %></h4>
    
    <%-include ('partials/footer.html'); %>
    
</body>     
</html>  