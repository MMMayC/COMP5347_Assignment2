/**
 * Created by junwenchen on 26/05/2017.
 */
google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawODU);
google.charts.setOnLoadCallback(drawODY);
google.charts.setOnLoadCallback(drawIDU);
google.charts.setOnLoadCallback(drawIDR);
google.charts.setOnLoadCallback(drawIDY);


function drawODU() {

    var data = google.visualization.arrayToDataTable([
        ['User Type', 'Revisions'],
        ['Administrator',     11],
        ['Anonymous',      2],
        ['Bot',  2],
        ['Regular user', 2]
    ]);

    var options = {
        title: 'Revision distribution by user type'
    };

    var chart = new google.visualization.PieChart(document.getElementById('overallChart'));

    chart.draw(data, options);
}

function drawODY() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Year');
    data.addColumn('number', 'Administrator');
    data.addColumn('number', 'Anonymous');
    data.addColumn('number', 'Bot');
    data.addColumn('number', 'Regular user');

    data.addRows([
        [2010, 1, .25, 2, 3],
        [2011, 1, .25, 2, 3],
        [2012, 1, .25, 2, 3],
        [2013, 1, .25, 2, 3],
        [2014, 1, .25, 2, 3]
    ]);

    var options = {
        title: 'Revision Distribution by year and by user type',
        hAxis: {
            title: 'Year',
        },
        vAxis: {
            title: 'Revisions'
        },
    };

    var chart = new google.visualization.ColumnChart(
        document.getElementById('overallChart'));

    chart.draw(data, options);
}

function drawIDU() {

    var data = google.visualization.arrayToDataTable([
        ['User Type', 'Revisions'],
        ['Administrator',     11],
        ['Anonymous',      2],
        ['Bot',  2],
        ['Regular user', 2]
    ]);

    var options = {
        title: 'Revision distribution by user type for article '
    };

    var chart = new google.visualization.PieChart(document.getElementById('indiChart'));

    chart.draw(data, options);
}

function drawIDR() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Year');
    data.addColumn('number', 'Revisions');

    data.addRows([
        [2011, 1],
        [2012, 2],
        [2013, 3],
        [2014, 4],
        [2015, 5]
    ]);

    var options = {
        title: 'Revision distribution by year of user for article',
        hAxis: {
            title: 'Year',
        },
        vAxis: {
            title: 'Revisions'
        }
    };

    var chart = new google.visualization.ColumnChart(
        document.getElementById('indiChart'));

    chart.draw(data, options);
}

function drawIDY() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Year');
    data.addColumn('number', 'Administrator');
    data.addColumn('number', 'Anonymous');
    data.addColumn('number', 'Bot');
    data.addColumn('number', 'Regular user');

    data.addRows([
        ['2010', 1, .25, 2, 3],
        ['2011', 1, .25, 2, 3],
        ['2012', 1, .25, 2, 3],
        ['2013', 1, .25, 2, 3],
        ['2014', 1, .25, 2, 3]
    ]);

    var options = {
        title: 'Revision Distribution by year and by user type for article ',
        hAxis: {
            title: 'Year',
        },
        vAxis: {
            title: 'Revisions'
        },
    };

    var chart = new google.visualization.ColumnChart(
        document.getElementById('indiChart'));

    chart.draw(data, options);
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
        drawODY();
    })
    $("#overallDistriUser").click(function(event){
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        drawODU();
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
        event.preventDefault();
        $('#selectUser').hide();
        $(this).addClass('active').siblings().removeClass('active');
        drawIDY();
    })

    $('#indiDistriUser').click(function (event) {
        event.preventDefault();
        $('#selectUser').hide();
        $(this).addClass('active').siblings().removeClass('active');
        drawIDU();
    })

    $('#indiDistriReg').click(function (event) {
        event.preventDefault();
        $('#selectUser').show();
        $(this).addClass('active').siblings().removeClass('active');
        drawIDR();
    })

});