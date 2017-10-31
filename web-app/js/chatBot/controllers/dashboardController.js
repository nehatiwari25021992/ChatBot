/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


chatBot.controller("dashboardController", function($scope,dashboardService,$rootScope) {
    console.log("***********dashboardController**************")
    $scope.openSubSideBar("dashboardSection")
    //    var intervalCurrentSession;
    // Maximize | Minimize Apps Grid
    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
    
    $rootScope.unknownName = ""
    $rootScope.id = ""
    $scope.$on('reloadTemplate', function(event) {
        $scope.init()
        $scope.getChatBotStatistics()
        $scope.getMostCommanPhrases()
        $scope.getMostActiveHours()
        $scope.getMessage_in_vs_out()
        $scope.getCommentsLineChartInfo()
    });
    
    $scope.refreshDashboard =  function() {
        $scope.activeHours = []
        $scope.init()
        $scope.getChatBotStatistics()
        $scope.getMostCommanPhrases()
        $scope.getMostActiveHours()
        $scope.getMessage_in_vs_out()
        $scope.getCommentsLineChartInfo()
    }
    
    $('a[href="#/dashboard/"]').parent().addClass("current");
   
    $scope.total_messages = 0 
    $scope.total_conversation= 0 
    $scope.average_conversation_per_user= 0 
    $scope.average_conversationSteps_per_user = 0 
    $scope.total_user = 0 
    $scope.total_sent = 0 
    $scope.total_received = 0 
    $scope.average_session_length = 0 
    $scope.commonPhases = []
    $scope.activeHours = []
    $scope.init = function(){
        $scope.total_messages = 0 
        $scope.total_conversation= 0 
        $scope.average_conversation_per_user= 0 
        $scope.average_conversationSteps_per_user = 0 
        $scope.total_user = 0 
        $scope.total_sent = 0 
        $scope.total_received = 0 
        $scope.average_session_length = 0 
        $scope.commonPhases = []
        $scope.activeHours = []
        $scope.startDateUser= moment().subtract('days', 6).format('YYYY-MM-DD')
        $scope.endDateUser= moment().utc().format('YYYY-MM-DD')
        var range = $('#userRange');
        range.val(moment().utc().subtract('days', 6).format('YYYY-MM-DD')
            + " - " + moment().utc().format('YYYY-MM-DD'))
        range.daterangepicker({
            startDate : moment().subtract('days', 6).format('YYYY-MM-DD'),
            endDate : moment().utc().format('YYYY-MM-DD'),
            format : 'YYYY-MM-DD',
            parentEl : $("#userRangeWrapper"),
            dateLimit : {
                days : 30
            },
            // maxDate : moment().utc(),
            // minDate : moment().utc().subtract('month', 2),
            ranges : {
                'Today' : [ moment().utc(), moment().utc() ],
                'Yesterday' : [ moment().utc().subtract('days', 1),
                moment().utc().subtract('days', 1) ],
                'Last 7 Days' : [ moment().utc().subtract('days', 6),
                moment().utc() ],
                'Last 30 Days' : [ moment().utc().subtract('days', 29),
                moment().utc() ]
            }
        }, function(startDate, endDate, label) {
            var startD = $("#userRange").data('daterangepicker').startDate.format('YYYY-MM-DD')
            var endD = $("#userRange").data('daterangepicker').endDate.format('YYYY-MM-DD')
            $scope.startDateUser = startD
            $scope.endDateUser = endD 
            $scope.getMessage_in_vs_out()
            $scope.getCommentsLineChartInfo()
        });
    }
    
    $scope.getChatBotStatistics = function(){
        $scope.activeHours = []
        $scope.toggleGridLoader("chatbotDashboardWidget")
        var params = {
            appId : $scope.appId
        }
        var promise = dashboardService.getChatBotStatistics(params)
        promise.then(
            function(payload){
                $scope.toggleGridLoader("chatbotDashboardWidget")
                $scope.total_messages = payload.data.totalMessages 
                $scope.total_conversation= payload.data.totalConversations
                $scope.average_conversation_per_user= payload.data.averageConversationPerUser
                $scope.average_conversationSteps_per_user = payload.data.averageConversationStepsPerUser 
                $scope.total_user =payload.data.totalUser
                $scope.total_sent = payload.data.totalSent
                $scope.total_received = payload.data.totalRecieved 
                $scope.average_session_length  = payload.data.average_session               
            },
            function(errorPayload) {
                $scope.toggleGridLoader("chatbotDashboardWidget")
            })  
    }
    
    $scope.getMostCommanPhrases = function(){        
        var params = {
            appId : $scope.appId
        }
        $scope.toggleGridLoader("chatbotDashboardWidget")
        var promise = dashboardService.getMostCommanPhrases(params)
        promise.then(
            function(payload){
                $scope.commonPhases = payload.data.data
                $scope.toggleGridLoader("chatbotDashboardWidget")
            },
            function(errorPayload) {
                $scope.toggleGridLoader("chatbotDashboardWidget")
            })  
		
    }
    
    $scope.getMostActiveHours = function(){
        $scope.activeHours =  [ 
        { 
            "start" : "12:00", 
            "end": "14:59", 
            "total_conversation": "320" 
        },{
            "start" : "15:00", 
            "end": "15:59", 
            "total_conversation": "200" 
        }, { 
            "start" : "11:00", 
            "end": "11:29", 
            "total_conversation": "150" 
        },{
            "start" : "9:00", 
            "end": "10:19", 
            "total_conversation": "140" 
        },{
            "start" : "3:00", 
            "end": "3:15", 
            "total_conversation": "40" 
        }  
        ] 
        
        
        var params = {
            appId : $scope.appId
        }
        $scope.toggleGridLoader("chatbotDashboardWidget")
        console.log("params getMostActiveHours ",params)
        var promise = dashboardService.getMostActiveHours(params)
        promise.then(
            function(payload){
                console.log("getMostActiveHours payload.data ",payload.data)
                $scope.toggleGridLoader("chatbotDashboardWidget")
                $scope.loadActiveHoursChart(payload.data)
            },
            function(errorPayload) {
                $scope.toggleGridLoader("chatbotDashboardWidget")
            }) 
    }
    
    $scope.loadActiveHoursChart =  function(data){  
        $("#noActiveHours").hide();
        $("#activeHours").show()
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        $('#activeHours').highcharts({
            charts : {
              //height : 350,
             // width:470
              
            },
            title: {
                text: '',
                x: -20 //center
            },
            credits: {
                enabled: false
            },
            subtitle: {
                text: '',
                x: -20
            },
            tooltip: {
                formatter: function () {
                    return '<span style="font-size:11px">' + this.series.name.replace("-START","") + '</span><br>' +
                    Highcharts.dateFormat('%e %b %H:%M', this.point.x) + ': '+
                    '<b>' + this.y + '</b>';
            
                }
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M'
                },
                minTickInterval: 60 * 1000,
                title: {
                    text: 'Most Active Hours'
                }
         
            },
            legend: {
                enabled: true,
                labelFormatter: function () {
                    return  this.name
                }
            },
            yAxis: {
                floor: 0,
                allowDecimals:false,
                title: {
                    text: 'no. of conversations '
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: '#808080'
                }]
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: true
                }
            },
            series: data,
            navigation: {
                buttonOptions: {
                    verticalAlign: 'bottom',
                    y: -20
                }
            }
        });
   
    }
    
    $scope.getMessage_in_vs_out = function(){
        $("#noDataactiveUser").hide();
        $("#div_g").show()
        var params = {
            appId : $scope.appId,
            start : $scope.startDateUser,
            end : $scope.endDateUser
        }
        $scope.toggleGridLoader("chatbotDashboardWidget")
        //console.log("params getMessage_in_vs_out ",params)
        var promise = dashboardService.getMessage_in_vs_out(params)
        promise.then(
            function(payload){
                // console.log("payload.data ",payload.data)
                $scope.toggleGridLoader("chatbotDashboardWidget")
                $scope.loadLiveDataChart(payload.data)
            },
            function(errorPayload) {
                $scope.toggleGridLoader("chatbotDashboardWidget")
            }) 
    // $scope.loadLiveDataChart(data)
    }
    
    $scope.loadLiveDataChart =  function(data){        
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        $('#div_g').highcharts({
        
            title: {
                text: '',
                x: -20 //center
            },
            credits: {
                enabled: false
            },
            subtitle: {
                text: '',
                x: -20
            },
            tooltip: {
                formatter: function () {
                    return '<span style="font-size:11px">' + this.series.name.replace("-START","") + '</span><br>' +
                    Highcharts.dateFormat('%e %b', this.point.x) + ': '+
                    '<b>' + this.y + '</b>';
            
                }
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e %b',
                    year: '%Y'
                },
                minTickInterval: 24 * 3600 * 1000,
                title: {
                    text: 'Date'
                }
         
            },
            legend: {
                enabled: true,
                labelFormatter: function () {
                    return  this.name
                }
            },
            yAxis: {
                floor: 0,
                allowDecimals:false,
                title: {
                    text: 'no. of conversations '
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: '#808080'
                }]
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: true
                }
            },
            series: data,
            navigation: {
                buttonOptions: {
                    verticalAlign: 'bottom',
                    y: -20
                }
            }
        });
   
    }
    
    $scope.loadLiveDataChart1 = function(){
        
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
           

        });
        
        
        $("#div_g").highcharts({
            yAxis: {
                title: {
                    text: 'Number of Conversations'
                }
            },
            legend: {
              
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    pointStart: 2010
                }
            },

            series: [{
                name: 'Message In',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }, {
                name: 'Message Out',
                data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            }]

        });
    }
    
      
    $scope.get_users_conversation_conversationSteps_activity = function(){
        var data ={ 
            "x-axiz" : ["6 min","12 min","18 min","24 min","30 min"] ,
            "users" : { 
                data : [49, 71, 106, 129, 144,111] 
            }, 
            "conversation" : { 
                data : [1016, 1016, 1015, 1015, 1012,1021] 
            }, 
            "conversation_steps" :{ 
                data : [7, 6, 9, 14, 18,23] 
            } 
        } 
        
        $scope.loadActivityGraph(data)
    }
    
    $scope.loadActivityGraph = function(data){
        $("#noactivityGraph1").hide()
        $("#activityGraph1").show()
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        $('#activityGraph1').highcharts({
            title: {
                text: '',
                x: -20 //center
            },
            credits: {
                enabled: false
            },
            chart: {
                zoomType: 'xy'
            },
            xAxis: [{
                categories: ['3 Sept', '4 Sept', '5 Sept', '6 Sept', '7 Sept', '8 Sept'],
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color:  "#41a529"
                    }
                },
                title: {
                    text: 'Negative Response',
                    style: {
                        color: "#41a529"
                    }
                },
                opposite: true

            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Conversation',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }
            }, { // Tertiary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Positive Response',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                enabled: true,
                labelFormatter: function () {
                    return  this.name
                }
            },
            series: [{
                name: 'Conversation ',
                type: 'spline',
                yAxis: 2,
                data: data.users.data,
                tooltip: {
                    valueSuffix: ' '
                }

            }, {
                name: 'Positive Response',
                type: 'spline',
                yAxis: 1,
                data: data.conversation.data,
                marker: {
                    enabled: false
                },
                tooltip: {
                    valueSuffix: ' '
                }

            }, {
                name: 'Negative Response',
                type: 'spline',
                data: data.conversation_steps.data,
                tooltip: {
                    valueSuffix: ' '
                }
            }]
        });
    }
    
    $scope.getCommentsLineChartInfo = function(){
        var resultMapArr =[]
        
        var params = {
            appId : $scope.appId,
            start : $scope.startDateUser,
            end : $scope.endDateUser
        }
        $scope.toggleGridLoader("chatbotDashboardWidget")
        console.log("params getSentiments ",params)
        var promise = dashboardService.getSentiments(params)
        promise.then(
            function(payload){
                console.log("payload.data getSentiments",payload.data)
                var map1 ={
                    name: '+ve',
                    yAxis : 0,
                    stacking: 'normal',
                    data: payload.data.positiveArr,
                    color:'#56cb81'
                }
                var map2 ={
                    name: '-ve',
                    yAxis : 0,
                    stacking: 'normal',
                    data: payload.data.negativeArr,
                    color:'#eb575c'
                }
                resultMapArr.push(map1)  
                resultMapArr.push(map2)
      
                var   categories = payload.data.datesArr
                $scope.loadCommentsHighChart(resultMapArr,categories)
                $scope.toggleGridLoader("chatbotDashboardWidget")
            },
            function(errorPayload) {
                         
                var map1 ={
                    name: '+ve',
                    yAxis : 0,
                    stacking: 'normal',
                    data: [29.9, 71.5, 89.4, 23.2, 89.0, 89.0, 13.6, 57.5, 68.4, 87.1, 95.6, 54.4],
                    color:'#56cb81'
                }
                var map2 ={
                    name: '-ve',
                    yAxis : 0,
                    stacking: 'normal',
                    data: [23.0, 67.0, 87.6, 56.5, 16.4, 78.1, 95.6, 54.4, 29.9, 71.5, 23.4, 45.2],
                    color:'#eb575c'
                }
                var   categories = ['2 Sept', '3 Sept', '4 Sept', '5 Sept', '6 Sept', '7 Sept', '8 Sept', '9 Sept', '10 Sept', '11 Sept', '12 Sept', '13 Sept'] 
                $scope.loadCommentsHighChart(resultMapArr,categories)
    
                $scope.toggleGridLoader("chatbotDashboardWidget")
            })
     
    }

    // draw multi axis line chart which shows comments data
    $scope.loadCommentsHighChart = function(data,categories){
        $("#noactivityGraph").hide()
        $("#activityGraph").show()
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        $('#activityGraph').highcharts({
            chart: {
                type: 'column',
                marginTop: 50
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: categories
            },
       
            yAxis: [{ // Primary yAxis
                min: 0,
                max: 400,
                tickInterval:50,
                title: {
                    text: 'Sentiment Score'
                }
            
            }],        
            tooltip: {
                formatter: function () {
                    return '<span style="font-size:11px">' + this.series.name.replace("-START","") + '</span><br>' +
                    categories[this.point.x] + ': '+
                    '<b>' + this.y + '</b>';
             
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: true
                }
            },
            exporting: {
                enabled: false
            },
            series:data
        });
    }
    
    $scope.init()
    $scope.getChatBotStatistics()
    $scope.getMostCommanPhrases()
    $scope.getMessage_in_vs_out()
    $scope.getCommentsLineChartInfo()
    $scope.getMostActiveHours()
})