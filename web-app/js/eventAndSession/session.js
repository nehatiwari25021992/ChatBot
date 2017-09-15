/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 19 Sep 2014
 * @version 1.0
 */


// session section
appHq.controller("sessionController", function($scope, $rootScope,dataService, $http,$location,$log,activeSessionService) {
    $("#div_g").hide()
    $("#noData").show()
    $("a.active").removeClass("active");
    $("#sessionMenu").addClass("active");
    $("#session_id").addClass("active");
    $("#noData").hide(); 
    $("#bookMarkedQueries").hide(); 
    eventReq.setType("SESSION")
    
    // set total events in scope
    var totalEvents = dataService.getTotalEvents()
    var cleanedEvents = []
    var indexForAppSession = 0
    totalEvents.forEach(function(obj,index ) {
        if(obj != "INSTALL"){
            if(obj.indexOf("-END") > -1 || obj.indexOf("-START") > -1){
                cleanedEvents.push(obj.replace("-END","").replace("-START",""))  
            }
           
        }
    });
 
    if(cleanedEvents.length !=0){
        getUnique(cleanedEvents).forEach(function(obj,index ) {
            if(obj == "APPSESSION")
                indexForAppSession = index
        });
        
        $scope.totalEvents = getUnique(cleanedEvents)
        $scope.eventAvgSession = getUnique(cleanedEvents)[indexForAppSession]
        events.length = 0
        events.push(getUnique(cleanedEvents)[indexForAppSession])
        eventReq.setEvents(events)
    }
    
    //    var activeSessionObj = dataService.getActiveSessions(eventReq.id,events[0])
    //    if(activeSessionObj.length ==0){
    //        $("#noData").show(); 
    //        return
    //    }
    if(totalEvents.length != 0){
        var promise = activeSessionService.getActiveSessions(eventReq.id,events[0])
        promise.then(
            function(payload) {
                var activeSessionObj = payload.data
                console.log(activeSessionObj)
                if(activeSessionObj.length ==0){
                    $("#showCreateButton").show();
                    $("#noData").show(); 
                    $("#div_g").hide()
                    return
                }else{
                    console.log("XXX" + activeSessionObj.length )
                    loadLiveDataChart(activeSessionService)
                     
                }
                 
            },
            function(errorPayload) {
                $log.error('failure ', errorPayload);
            })
    }else{
        $("#div_g").hide()
        $("#noDataMsg").html("No Events created for this App.") 
        $("#noData").show() 
    }
     

    
    $scope.changeEvent = function(){
        var newEvent = $scope.eventAvgSession
        if(newEvent =="" || newEvent == null){
            console.log("No events selected")
            $("#div_g").hide()
            $("#noDataMsg").html("No events selected.")
            $("#noData").show(); 
            $("#showCreateButton").show(); 
            return
        }
        events.length = 0
        events.push(newEvent)
        eventReq.setEvents(events)
        //var activeSessionObj = dataService.getActiveSessions(eventReq.id,events[0])
        var promise = activeSessionService.getActiveSessions(eventReq.id,events[0])
        promise.then(
            function(payload) {
                var activeSessionObj = payload.data
                if(activeSessionObj.length!=0){
                    $("#showCreateButton").hide();
                    //$("#countShow").show();
                    //console.log("Refreshed")
                   // document.getElementById("count").innerHTML = '<span>'+activeSessionObj+'</span>' + '<br>' + "Total Count " 
                    loadLiveDataChart(activeSessionService)
                }else{
                    console.log("Else Case")
                   // document.getElementById("count").innerHTML = "Total Count is  0";
                    console.log(activeSessionObj)
                    $("#div_g").hide()
                    $("#noDataMsg").html("No Data.") 
                    $("#noData").show()
                    $("#countShow").hide();
                    $("#showCreateButton").show();
                }
                 
            },
            function(errorPayload) {
                $log.error('failure ', errorPayload);
            })
    
        
    }
    
});

// average time controller
appHq.controller("averageTimeController", function($scope, $rootScope,dataService,$timeout,$location, $route,$http) {
    // set total events in scope
    $("a.active").removeClass("active");
    $("#averageTime_id").addClass("active");
    $("#sessionMenu").addClass("active");
    $("#noData").hide();  
    $("#bookMarkedQueries").hide(); 
    //    set up for tour
    $scope.helpMsgArray = getAllTourTipMessage("AVERAGETIME")
    $scope.isPluginLoad = "false"
    $scope.CompletedEvent = function (scope) {
        $scope.isPluginLoad = "false"
    };

    $scope.ExitEvent = function (scope) {
        
        $scope.isPluginLoad = "false"
        var prevRes = $.cookie("AVERAGETIME")
        if(prevRes == "ok"){
                    
        }else{
            dhtmlx.confirm({
                type:"confirm",
                ok:"Yes",
                cancel:"No",
                text:"Do not display this message again ?",
                callback: function(res) {
                    if(res){
                        $.cookie("AVERAGETIME", "ok",{
                            expires: 365 * 10
                        });
                    }else{
                        $.removeCookie("AVERAGETIME");  
                    }
                }
            });
        }   
    };
    

    $scope.ChangeEvent = function (targetElement, scope) {
       
    };

    $scope.BeforeChangeEvent = function (targetElement, scope) {
        $scope.isPluginLoad = "true"
    };

    $scope.AfterChangeEvent = function (targetElement, scope) {
    };

    $scope.IntroOptions = {
        steps:$scope.helpMsgArray,
        showStepNumbers: false,
        exitOnOverlayClick: true,
        exitOnEsc:true,
        nextLabel: '<strong>Next</strong>',
        prevLabel: '<span style="color:green">Previous</span>',
        skipLabel: 'Exit',
        doneLabel: 'Thanks'
    };

    $scope.ShouldAutoStart = function() {
        var isPluginView = $.cookie("isPluginView");
        if(isPluginView == "no"){
            $.removeCookie("isPluginView");
            return false; 
        }else{
            var res = $.cookie("AVERAGETIME")
            if(res == "ok"){
                return false;
            }else{
                return true;    
            }  
        }
        
        
    }
    //----------------------//
    eventReq.setType("SESSION")
    
    var totalEvents = dataService.getTotalEvents()
    var cleanedEvents = []
    var indexForAppSession = 0
    totalEvents.forEach(function( obj ) {
        if(obj != "INSTALL"){
            if(obj.indexOf("-END") > -1 || obj.indexOf("-START") > -1){
                cleanedEvents.push(obj.replace("-END","").replace("-START",""))  
            }
           
        }
            
    });
    events.length = 0         // empty events object before pushing new
    // events!
    if(cleanedEvents.length !=0){
        getUnique(cleanedEvents).forEach(function(obj,index ) {
            if(obj == "APPSESSION")
                indexForAppSession = index
        });
        var uniqEvents = getUnique(cleanedEvents)[indexForAppSession]
        $("#eventAvgSession").val(uniqEvents)
        events.push(uniqEvents)
        eventReq.setEvents(events)
    }

    initializeEventsForAvgSession(getUnique(cleanedEvents))
    $timeout(function(){
        var range = $('#range');
        // Show the dates in the range input
        range.val(moment().subtract('days', 6).format('YYYY-MM-DD')+" - "+moment().format('YYYY-MM-DD'))
        if(totalEvents.length != 0){
            $("#noDataAvg").html("No Data.")
            ajaxLoadChart();   
        }else{
            $("#chart").hide()
            $("#noData").show()
            $("#noDataAvg").html("No Events created for this App.")
        }
        
     
        range.daterangepicker({
            startDate: start,
            endDate: end,
            format: 'YYYY-MM-DD',
            dateLimit:{
                days: 30
            },
            maxDate:moment().utc(),
		
            ranges: {
                'Today': [moment().utc(),moment().utc()],
                'Yesterday': [moment().utc().subtract('days', 1), moment().utc().subtract('days', 1)],
                'Last 7 Days': [moment().utc().subtract('days', 6), moment().utc()],
                'Last 30 Days': [moment().utc().subtract('days', 29), moment().utc()]
            }
        },function(startDate, endDate){
            start = startDate.utc()
            end = endDate.utc()
            eventReq["start"] = start
            eventReq["end"] = end
            if(totalEvents.length != 0){
                $("#noDataAvg").html("No Data.")
                ajaxLoadChart();   
            }else{
                $("#chart").hide()
                $("#noData").show()
                $("#noDataAvg").html("No Events created for this App.")
            }
		
        });
    },500)
    
    $scope.showPushDetails  = function(){
        $("#pushDetailsId").toggle("slow");
        $scope.operatorSelect = "eq";
        $scope.averageTimeValue= null;
        $("#triggerActionId").prop("disabled", true);
    }
    //This for Adding ToolTip
    // $('#numFieldId').tooltip({'trigger':'focus', 'title': 'Please enter the time for sends push'});
    // $('#avgOperatorId').tooltip({'trigger':'focus', 'title': 'This is the operator value on selected time'});
    //$('[data-toggle="popover"]').popover({trigger: 'hover','placement': 'right'});
    
    $scope.operatorSelect = "eq";
    $scope.changeAvgOperator = function(){
        setTriggerValue($scope.averageTimeValue,$scope.operatorSelect)
    }
    $scope.onchangeOfNumberField = function(){
        if($scope.averageTimeValue != undefined || $scope.averageTimeValue != null){
            if(eventReq.getEvents().length == 1){
                $("#triggerActionId").prop("disabled", false);
                setTriggerValue($scope.averageTimeValue,$scope.operatorSelect) 
            }else{
                $("#triggerActionId").prop("disabled", true);
            }
        }else{
            $("#triggerActionId").prop("disabled", true);
        }
    }
    // For Setting Trigger Data    
    function setTriggerValue(time,operator){
        var eventsAvg =[];
        var sessionTime = {};
        sessionTime.time= time
        sessionTime.operator= operator
        eventsAvg.push({
            name: eventReq.getEvents()[0], 
            startDate:  convertDateFormate(eventReq.getStartDate()),
            endDate: convertDateFormate(eventReq.getEndDate()),
            session:sessionTime
        }) 
        pushRequestModel.setEvents(eventsAvg);	
        emailRequestModel.setEvents(eventsAvg);
        wallPostRequestModel.setEvents(eventsAvg);	
    }
});
// user session time controller
appHq.controller("userTimeController", function($scope, $rootScope,dataService,$location, $route,$http) {
   
    $("a.active").removeClass("active");
    $("#userTime_id").addClass("active");
    $("#sessionMenu").addClass("active");
    $("#noData").hide();  
    $("#bookMarkedQueries").hide(); 
    eventReq.setType("SESSION")
    
});

// Event AutoComplete Widget & Configurations
function initializeEventsForAvgSession(eventSource){
  
    $("#eventAvgSession").inputosaurus({
        width : "300px",
        autoCompleteSource : eventSource,
        activateFinalResult : true,
        change : function(ev){
            var count = ev.target.value.split(","); 
            $("#eventAvgSession_reflect").val(ev.target.value);
            //             var diff = $(count).not(eventSource).get();
            //            if(diff.length>0){
            //                customAlert("alert-error","Invalid event(s) selected!!")
            //                return
            //            }
            $("#chart").show()
            events.length = 0
       
            for(i=0;i<count.length;i++){
                events.push(count[i]) 
            }
            eventReq.setEvents(events)
            
        
            if(ev.target.value =="" || ev.target.value == null){
                // No events Case
                $("#chart").hide()
                $("#noData").show()
                $("#openTriggerActionDivId").prop("disabled", true);
                $("#triggerActionId").prop("disabled", true);
            }else{
                if(count.length >1){
                    $("#openTriggerActionDivId").prop("disabled", true);
                    $("#triggerActionId").prop("disabled", true);
                }else{
                    $("#openTriggerActionDivId").prop("disabled", false);
                }
                if(count.length  > 5){
                    // Only 5 events are allowed condition
                    properties.length = 0
                    eventReq.setProperties(properties)
                    customAlert("alert-error","Max no. of events reached.")
                }else{
                    getResultsForAvgSession() 
                }  
            }
        }
        
    });
}

function getResultsForAvgSession(){
    $("#chart").show()
    $("#noData").hide() 
    showLoad()
    $.getJSON('../event/getResultsForAvgSession', {
        "reqDATA":JSON.stringify(eventReq)
    }, function(data) {
        var ddd = eval(data)
       
        if(data.length > 0 && ddd[0].data.length == 0){
            $("#chart").hide()
            $("#noData").show() 
            $("#openTriggerActionDivId").prop("disabled", true);
            $("#triggerActionId").prop("disabled", true);
        }else if(ddd.length == 0){
            $("#chart").hide()
            $("#noData").show() 
            $("#openTriggerActionDivId").prop("disabled", true);
            $("#triggerActionId").prop("disabled", true);
        }else{
            $("#chart").show()
            $("#noData").hide() 
            loadHighLineChartAvgSession(data)
        //            loadHighLineChart(data)
        }
        hideLoad()
    });
}

function loadLiveDataChart(activeSessionService){
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    $('#div_g').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {

                    // set up the updating of the chart each second
                   
                    var series = this.series[0];
                    var timer =  setInterval(function () {
                        handlers.push(timer)
                        // var activeSessionObj = dataService.getActiveSessions(eventReq.id,events[0])
                        var promise = activeSessionService.getActiveSessions(eventReq.id,events[0])
                        var y
                        promise.then(
                            function(payload) {
                                var activeSessionObj = payload.data
                                if(eventReq.unique_type){
                                    y = activeSessionObj[1] 
                                }else{
                                    y = activeSessionObj[0]  
                                }
                                var x  = (new Date()).getTime() // current time
                                if(series.data === undefined){
                                // double ajax issue temporary fix
                                }else{
                                    shift1 = series.data.length > 5; 
                                    series.addPoint([x, y], true,shift1);   
                                }
                            },
                            function(errorPayload) {
                                $log.error('failure ', errorPayload);
                            })
                    }, 3000);
                }
            }
        },
        title: {
            text: 'Current Active Session'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 300
        },
        yAxis: {
            floor: 0,
            allowDecimals:false,
            title: {
                text: 'Count'
            },  
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                '<b>' + this.y + '</b>';
            }
        },
        legend: {
            enabled: true
        },
        exporting: {
            enabled: true
        },
        navigation: {
            buttonOptions: {
                verticalAlign: 'bottom',
                y: -20
            }
        },
       
        series: [{
            name: 'Session',
            
            data: (function () {
                // generate an array of random data
                //var activeSessionObj = dataService.getActiveSessions(eventReq.id,events[0])
                var promise = activeSessionService.getActiveSessions(eventReq.id,events[0])
                var y
                promise.then(
                    function(payload) {
                        var activeSessionObj = payload.data
                        if(eventReq.unique_type){
                            y = activeSessionObj[1] 
                        }else{
                            y = activeSessionObj[0]  
                        }
                        var data1 = [],
                        time = (new Date()).getTime(),
                        i;
               
                        for (i = -4; i <= 0; i += 1) {
                            data1.push({
                                x: time + i * 1000,
                                y: y
                            });
                        }
                        return data1;
                    },
                    function(errorPayload) {
                        $log.error('failure ', errorPayload);
                    })
            }())
        }]
    });
    
    
    
}


