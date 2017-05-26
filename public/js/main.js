/**
 * Created by junwenchen on 26/05/2017.
 */
google.charts.load('current', {packages: ['corechart']});
//google.charts.setOnLoadCallback(drawBar);
//google.charts.setOnLoadCallback(drawPie);
var options = {'title':"Composition of Earth's atmosphere  ",
    'width':400,
    'height':300};
var data

function drawODU(){
    graphData = new google.visualization.DataTable();
    graphData.addColumn('string', 'Element');
    graphData.addColumn('number', 'Percentage');
    $.each(data, function(key, val) {
        graphData.addRow([key, val]);
    })
    var chart = new google.visualization.PieChart($("#myChart")[0]);
    chart.draw(graphData, options);
}

function drawODY(){
    graphData = new google.visualization.DataTable();
    graphData.addColumn('string', 'Element');
    graphData.addColumn('number', 'Percentage');
    $.each(data, function(key, val) {
        graphData.addRow([key, val]);
    })
    var chart = new google.visualization.ColumnChart(document.getElementById("myChart"));
    chart.draw(graphData, options);

}

$(document).ready(function() {

    $.getJSON('/data',null, function(rdata) {
            data = rdata
        }
    );

    $("#overallDistriYear").click(function(event){
        event.preventDefault();
        drawODY()
    })
    $("#overallDistriUser").click(function(event){
        event.preventDefault();
        drawODU()
    })

});