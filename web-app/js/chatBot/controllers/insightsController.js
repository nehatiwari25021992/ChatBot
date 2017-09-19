/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */




chatBot.controller("insightsController", function($scope,$rootScope) {
    console.log("***********insightsController**************")
    $scope.openSubSideBar("insightsSection")
    var intervalCurrentSession;
    // Maximize | Minimize Apps Grid
    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
    
   
    $scope.$on('reloadTemplate', function(event) {
        resetRequest()
        $scope.initializeDashboard()
        // $scope.resetView(); // reset template with default settings
    });
    
    $('a[href="#/insights/"]').parent().addClass("current");
   
    $scope.init= function(){
        
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
                data : [7, 6, 9, 12, 10,11] 
            } 
        } 
        
        $scope.loadActivityGraph(data)
    }
    
    $scope.loadActivityGraph = function(data){
        $("#noactivityGraph").hide()
        $("#activityGraph").show()
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        $('#activityGraph').highcharts({
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
                    categories: ['6 min', '12 min', '18 min', '24 min', '30 min', '36 min'],
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
                        text: 'Conversation Steps',
                        style: {
                            color: "#41a529"
                        }
                    },
                    opposite: true

                }, { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: 'Users',
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
                        text: 'Conversation',
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
                    name: 'Users',
                    type: 'column',
                    yAxis: 1,
                    data: data.users.data,
                    tooltip: {
                        valueSuffix: ' '
                    }

                }, {
                    name: 'Conversation',
                    type: 'spline',
                    yAxis: 2,
                    data: data.conversation.data,
                    marker: {
                        enabled: false
                    },
                    dashStyle: 'shortdot',
                    tooltip: {
                        valueSuffix: ' '
                    }

                }, {
                    name: 'Conversation Steps',
                    type: 'spline',
                    data: data.conversation_steps.data,
                    tooltip: {
                        valueSuffix: ' '
                    }
                }]
        });
    }
    
    
    $scope.getUserActivity = function(){
        var data = { 
            series : ["6 min","12 min","18 min","24 min","30 min", '36 min'], 
            data : [7, 6, 9, 11, 8,5] 
        }
        
        $scope.loadUserActivity(data)
    }
    
    $scope.loadUserActivity = function(data){
        $("#nousersActivity").hide()
        $("#usersActivity").show()
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        $('#usersActivity').highcharts({
            chart: {
                width: 450,
                type: 'spline'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: data.series,
                crosshair: true
            },
            credits: {
                enabled: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Users'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                    name: 'Users Activity',
                    data: data.data

                }]
        });
    }
    
    $scope.getConversationActivity = function(){
        var data = { 
            series : ["6 min","12 min","18 min","24 min","30 min","36 min"], 
            data : [32, 46, 59, 74, 88,113] 
        }
        
        $scope.loadConversationActivity(data)
    }
    
    $scope.loadConversationActivity = function(data){
        $("#noconversationActivity").hide()
        $("#conversationActivity").show()
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        $('#conversationActivity').highcharts({
            chart: {
                width: 450,
                type: 'spline'
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: data.series,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Conversation'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                    name: 'Conversation Activity',
                    data: data.data,
                    color: "#41a529"

                }]
        });
    }
    
    $scope.getAverageConversationStepsPerUser = function(){
        var data = { 
            series : ["6 min","12 min","18 min","24 min","30 min","36 min"], 
            data : [17, 16, 11, 14, 18,23] 
        }
        
        $scope.loadAverageConversationStepsPerUser(data)
    }
    
    $scope.loadAverageConversationStepsPerUser = function(data){
        $("#noavgCnvSt").hide()
        $("#avgCnvSt").show()
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        $('#avgCnvSt').highcharts({
            chart: {
                width: 450,
                type: 'spline'
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: data.series,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Average Conversation'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                    name: 'Average Conversation Steps per User',
                    data: data.data

                }]
        });
    }
    
    $scope.getAverageConversationPerUser = function(){
        var data = { 
            series : ["6 min","12 min","18 min","24 min","30 min","36 min"], 
            data : [32, 46, 59, 74, 68,43] 
        }
        
        $scope.loadAverageConversationPerUser(data)
    }
    
    $scope.loadAverageConversationPerUser = function(data){
        $("#noavgCnv").hide()
        $("#avgCnv").show()
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        $('#avgCnv').highcharts({
            chart: {
                width: 450,
                type: 'spline'
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: data.series,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Average Conversation'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                    name: 'Average Conversation Steps per User',
                    data: data.data,
                    color:  "#41a529"

                }]
        });
    }
    
    
    $scope.getCommentsLineChartInfo = function(){
        var resultMapArr =[]
         
        var map1 ={ name: '+ve',
            yAxis : 0,
            stacking: 'normal',
            data: [29.9, 71.5, 89.4, 23.2, 89.0, 89.0, 13.6, 57.5, 68.4, 87.1, 95.6, 54.4]
            ,color:'#50B432'
        }
        var map2 ={ name: '-ve',
            yAxis : 0,
            stacking: 'normal',
            data: [23.0, 67.0, 87.6, 56.5, 16.4, 78.1, 95.6, 54.4, 29.9, 71.5, 23.4, 45.2],color:'#ED561B'}
        
        var map3 ={name: 'neutral',
            yAxis : 0,
            stacking: 'normal',
            data: [13.0, 56.0, 98.6, 17.5, 98.4, 74.1, 95.6, 54.4, 29.9, 71.5, 76.4, 34.2],color:'#DDDF00'}

        var map4 ={ name: 'Sentiment score',
            yAxis : 1,
            type : 'spline',
            data: [24.3, 12, 41.2, 12.1, 4, 45, 31, 21.5, 9.3, 7.7, 13, 22]}

        resultMapArr.push(map1)  
        resultMapArr.add(map2)
        resultMapArr.add(map3)
        resultMapArr.add(map4)
        var   categories = ['15', '25', '30', '35', '45', '50', '60', '75', '80', '85', '90', '100'] 
    }

    // draw multi axis line chart which shows comments data
    $scope.loadCommentsHighChart = function(data,categories,lineChartId){
        $('#'+lineChartId).highcharts({
            chart: {
                type: 'column',
                marginTop: 50
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
                        text: 'No. of Comments'
                    }
                }, { // Secondary yAxis
                    min: -40,
                    max: 100,
                    tickInterval: 20,
                    opposite : true,
                    title: {
                        text: 'Avg. Sentiment Score'
                    }
                }],        
            tooltip: {
                formatter: function () {
                    return '<span style="font-size:11px">' + this.series.name.replace("-START","") + '</span><br>' +
                        Highcharts.dateFormat('%e %b',this.point.x) + ': '+
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
    $scope.get_users_conversation_conversationSteps_activity()
    $scope.getUserActivity()
    $scope.getConversationActivity()
    $scope.getAverageConversationStepsPerUser()
    $scope.getAverageConversationPerUser()
})