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
    console.log('drawodu');
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

    //$('#overall').hide();
    $('.individual').hide();
    $('#selectUser').hide();

    $.getJSON('/data',null, function(rdata) {
            data = rdata
    });

    $("#overallDistriYear").click(function(event){
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        drawODY()
    })
    $("#overallDistriUser").click(function(event){
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        drawODU()
    })

    $('#buttonOverall').click(function (event) {
        event.preventDefault();
        $('.individual').hide();
        $('.overall').show();
        $(this).addClass('active').siblings().removeClass('active');
    })

    $('#buttonIndividual').click(function (event) {
        event.preventDefault();
        $('.overall').hide();
        $('.individual').show();
        $(this).addClass('active').siblings().removeClass('active');
    })

    $('#indiDistriYear').click(function (event) {
        $('#selectUser').hide();
        $(this).addClass('active').siblings().removeClass('active');
    })

    $('#indiDistriUser').click(function (event) {
        $('#selectUser').hide();
        $(this).addClass('active').siblings().removeClass('active');
    })

    $('#indiDistriReg').click(function (event) {
        $('#selectUser').show();
        $(this).addClass('active').siblings().removeClass('active');
    })

});