/**
 * Created by junwenchen on 26/05/2017.
 */
google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawODU);
google.charts.setOnLoadCallback(drawODY);
google.charts.setOnLoadCallback(drawIDU);
google.charts.setOnLoadCallback(drawIDR);
google.charts.setOnLoadCallback(drawIDY);

var temp_result;
var idr_result;

function drawODU() {

    var data = google.visualization.arrayToDataTable([
        ['User Type', 'Revisions'],
        ['Administrator',     userType[1].numOfUsers],
        ['Anonymous',      userType[2].numOfUsers],
        ['Bot',  userType[0].numOfUsers],
        ['Regular user', userType[3].numOfUsers]
    ]);

    var options = {
        title: 'Revision distribution by user type'
    };

    var chart = new google.visualization.PieChart(document.getElementById('overallChart'));

    chart.draw(data, options);
}

function drawODY() {
    var data = new google.visualization.DataTable();

    var admin_cnt=0;
    var anon_cnt=0;
    var bot_cnt=0;
    var reg_cnt=0;
    data.addColumn('string', 'Year');
    data.addColumn('number', 'Administrator');
    data.addColumn('number', 'Anonymous');
    data.addColumn('number', 'Bot');
    data.addColumn('number', 'Regular user');
    for(var i=0;i<distribution.length;i++){
        //Populate for count each type
        if(distribution[i]._id.usertype=="admin"){
            admin_cnt=distribution[i].numOfUsers;
        }
        else if(distribution[i]._id.usertype=="anon"){
            anon_cnt=distribution[i].numOfUsers;
        }
        else if(distribution[i]._id.usertype=="bot"){
            bot_cnt=distribution[i].numOfUsers;
        }
        else if(distribution[i]._id.usertype=="regular"){
            reg_cnt=distribution[i].numOfUsers;
        }
        if((i+1!=distribution.length)){
            if((distribution[i]._id.year != distribution[i+1]._id.year)){
                data.addRow([distribution[i]._id.year,admin_cnt,anon_cnt,bot_cnt,reg_cnt]);
                admin_cnt=0;
                anon_cnt=0;
                bot_cnt=0;
                reg_cnt=0;
            }
        }
        else{
            data.addRow([distribution[i]._id.year,admin_cnt,anon_cnt,bot_cnt,reg_cnt]);
            admin_cnt=0;
            anon_cnt=0;
            bot_cnt=0;
            reg_cnt=0;
        }
    }

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

function drawIDU(result) {

    var data = google.visualization.arrayToDataTable([
        ['User Type', 'Revisions'],
        ['Administrator',     temp_result.userT[1].numOfUsers],
        ['Anonymous',      temp_result.userT[2].numOfUsers],
        ['Bot',  temp_result.userT[0].numOfUsers],
        ['Regular user', temp_result.userT[3].numOfUsers]
    ]);


    var options = {
        title: 'Revision distribution by user type for article '
    };

    var chart = new google.visualization.PieChart(document.getElementById('indiChart'));

    chart.draw(data, options);
}

function drawIDR() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Year');
    data.addColumn('number', 'Revisions');

    for(var i=0;i<idr_result.length;i++){
        data.addRow([idr_result[i]._id.year,idr_result[i].numOfUsers]);
    }

    var options = {
        title: 'Revision distribution by year of user for article',
        hAxis: {
            title: 'Year'
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

    var admin_cnt=0;
    var anon_cnt=0;
    var bot_cnt=0;
    var reg_cnt=0;
    data.addColumn('string', 'Year');
    data.addColumn('number', 'Administrator');
    data.addColumn('number', 'Anonymous');
    data.addColumn('number', 'Bot');
    data.addColumn('number', 'Regular user');
    for(var i=0;i<temp_result.dis.length;i++){
        //Populate for count each type
        if(temp_result.dis[i]._id.usertype=="admin"){
            admin_cnt=temp_result.dis[i].numOfUsers;
        }
        else if(temp_result.dis[i]._id.usertype=="anon"){
            anon_cnt=temp_result.dis[i].numOfUsers;
        }
        else if(temp_result.dis[i]._id.usertype=="bot"){
            bot_cnt=temp_result.dis[i].numOfUsers;
        }
        else if(temp_result.dis[i]._id.usertype=="regular"){
            reg_cnt=temp_result.dis[i].numOfUsers;
        }
        if((i+1!=temp_result.dis.length)){
            if((temp_result.dis[i]._id.year != temp_result.dis[i+1]._id.year)){
                data.addRow([temp_result.dis[i]._id.year,admin_cnt,anon_cnt,bot_cnt,reg_cnt]);
                admin_cnt=0;
                anon_cnt=0;
                bot_cnt=0;
                reg_cnt=0;
            }
        }
        else{
            data.addRow([temp_result.dis[i]._id.year,admin_cnt,anon_cnt,bot_cnt,reg_cnt]);
            admin_cnt=0;
            anon_cnt=0;
            bot_cnt=0;
            reg_cnt=0;
        }
    }

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

function getIndividual(){
    $("#individualTitle").empty();
    $("#revs").empty();
    $("#top5").empty();
    $("#user").empty();
    event.preventDefault();
    var title_tmp = articleTitles[$("#title").val()]._id;
    $("#individualTitle").append("<strong>" + title_tmp + "</strong>");
    $.getJSON("http://localhost:3000/getIndividual?title="+title_tmp, function (result) {
        $("#revs").append("<strong>" + result.rev[0].count + "</strong>");
        $("#top5").append("<strong> 1." +  result.reg[0]._id +" " + result.reg[0].numOfRevs + "</strong><br>");
        $("#top5").append("<strong> 2." +  result.reg[1]._id +" " + result.reg[1].numOfRevs + "</strong><br>");
        $("#top5").append("<strong> 3." +  result.reg[2]._id +" " + result.reg[2].numOfRevs + "</strong><br>");
        $("#top5").append("<strong> 4." +  result.reg[3]._id +" " + result.reg[3].numOfRevs + "</strong><br>");
        $("#top5").append("<strong> 5." +  result.reg[4]._id +" " + result.reg[4].numOfRevs + "</strong><br>");
        $("#user").append("<option value=-1></option>");
        $("#user").append("<option value="+ result.reg[0]._id+">"+result.reg[0]._id+"</option>");
        $("#user").append("<option value="+ result.reg[1]._id+">"+result.reg[1]._id+"</option>");
        $("#user").append("<option value="+ result.reg[2]._id+">"+result.reg[2]._id+"</option>");
        $("#user").append("<option value="+ result.reg[3]._id+">"+result.reg[3]._id+"</option>");
        $("#user").append("<option value="+ result.reg[4]._id+">"+result.reg[4]._id+"</option>");

        temp_result=result;
    });
}

function getRegUser(){
    $.getJSON("http://localhost:3000/selectDistriByUsers?title="+articleTitles[$("#title").val()]._id+"&user="+$("#user").val(), function (result) {
        idr_result=result;
    });
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