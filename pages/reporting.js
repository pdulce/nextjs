<!DOCTYPE html>
<html>
 
<%- include ('partials/head.html') %>
  
<body>
    <%- include ('partials/navigation.html') %>

    <h4> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<%=title %></h4>
    <!--SECTION ONE-->
    <section class="container-fluid" id="home">
        <div class="row bg-dark text-white p-5 text-center">
            <div class="col-sm-3 vertical-center">
                <br>
                <h5> &nbsp;Informe bimensual Métrica CUBO (Babel)</h5>
                <br>
                <hr>
                <br>
                <br>
                <br>
                <h5> &nbsp;Informe Peticiones que finalizan en x días</h5>
            </div>
            <div class="col-sm-2">
                <form action="genCUBO" method="POST">
                   <button type="submit" class="btn btn-primary"><i class="fab fa-youtube fa-2x"></i></button>
                </form>
                <br>
                <form action="/caducanSoon" method="POST">
                    <div class="mb-3">
                        <label for="diasfin" class="form-label">Max. días para finalización</label>
                        <input type="text" class="form-control" name="diasfin" id="diasfin" aria-describedby="diasfinHelp" value="7">
                        <div id="diasfinHelp" class="form-text">Establezca el núm. x de días</div>
                    </div>
                    <button type="submit" class="btn btn-primary"><i class="fab fa-youtube fa-2x"></i></button>
                </form>
            </div>

            <div class="col-sm-3">
                <br>
                <h5> &nbsp;Informe Mensual UTE Actividades AT</h5>
                <br>
                <hr>
                <br>
                <br>
                <br>
                <h5> &nbsp;Informe Actividades para PPTX Seguimiento</h5>
            </div>
            <div class="col-sm-2">
                <form action="genCertMensualAT" method="POST">
                    <button type="submit" class="btn btn-primary"><i class="fab fa-youtube fa-2x"></i></button>
                </form>
                <br>
                <form name="pptx" action="/informePPTX" method="POST">
                    <div class="mb-6">
                        <label for="fecultimoComite" class="form-label">Fecha último Comité Seguimiento</label>
                        <input size="12" type="text" class="form-control" value="2021-01-01" name="fecultimoComite" id="fecultimoComite" aria-describedby="fecultimoComiteHelp" readonly>
                        <div id="fecultimoComiteHelp" class="form-text">formato <i>yyyy-mm-dd</i></div>
                        <script type="text/javascript">
                            $("#fecultimoComite").datetimepicker({
                                format: 'yyyy-mm-dd'
                            });
                        </script>
                    </div>
                    <button type="submit" class="btn btn-primary"><i class="fab fa-youtube fa-2x"></i></button>
                      <button onClick="javascript:document.getElementsByName('pptx')[0].action='/fastgraph';" type="submit" class="btn btn-primary"><i class="fab fa-youtube fa-2x"></i>personaliza tu gráfico desde reporting.js ->generarGraficoJSON.configuracion</button>
                </form>
            </div>
           
        </div>
   </section>

  <%-include ('partials/footer.html'); %>

</body>     
</html>  