/**
 * Shephertz Technologies
 * @author Naresh Dwivedi
 * @date 27 July 2015
 * @version 1.0
 */
appHq.controller("viewPushDashboardController", function($scope, $rootScope, $http,eventPushDashService,$parse,$location,$routeParams) {
	var dataMap = {}
	var range = $('#rangePushDashForEvent');
	$scope.pushListSource = ["Send","Open"]
	$scope.campName = $routeParams.name
    // Show the dates in the range input
    range.val(moment().subtract('days', 6).format('YYYY-MM-DD')+" - "+moment().format('YYYY-MM-DD'))
    dataMap.start = moment().subtract('days', 6).format('YYYY-MM-DD')
    dataMap.end = moment().format('YYYY-MM-DD')
    $scope.drawPushDashboardGraphForEvent = function(){
    	console.log($scope.typeFields)
		var paramsData = {
	        start: dataMap.start,
	        end:dataMap.end,
	        method:"GET",
	    	methodType:"GET",
			appId: eventReq.id,
			pushIdentifier:$routeParams.name,
			dataType:JSON.stringify($scope.typeFields)
        }
         var promiseRoles = eventPushDashService.getPushDashboardGraphForEvent(paramsData)
         promiseRoles.then(
             function(payload) { 
                 var resultData = payload.data
                 console.log(resultData)
                 console.log(resultData.length)
                 if(resultData.length !== 0){
                	 $("#noData").hide()
                     $("#pushDashbaordGraph").show()
                     var graphElement = $("#pushDashbaordGraph")
                     loadPushOpenRateChart(resultData,graphElement,"Count")      
                 }else{
                	 console.log("I AM IN ELSE BLOCK WITH NO DATA")
                	 $("#noData").show();
                     $("#pushDashbaordGraph").hide()
                 }
             },
             function(errorPayload) {
            	 console.log("I AM ERROR ",errorPayload)
                 $("#noData").show();
                 $("#pushDashbaordGraph").hide()
             }); 
	     
    }
	// This for change the date Range
    range.daterangepicker({
        startDate: start,
        endDate: end,
        format: 'YYYY-MM-DD',
        dateLimit:{
            days: 30
        },
        maxDate:moment().utc(),	
        ranges: {
            'Today': [moment().utc(), moment().utc()],
            'Yesterday': [moment().utc().subtract('days', 1), moment().utc().subtract('days', 1)],
            'Last 7 Days': [moment().utc().subtract('days', 6), moment().utc()],
            'Last 30 Days': [moment().utc().subtract('days', 29), moment().utc()]
        }
    },function(startDate, endDate){
        var startD =$("#rangePushDashForEvent").data('daterangepicker').startDate.format('YYYY-MM-DD')
        var endD =$("#rangePushDashForEvent").data('daterangepicker').endDate.format('YYYY-MM-DD')
        start = startD
        end = endD
        dataMap.start = start
        dataMap.end = end  
        $scope.drawPushDashboardGraphForEvent();
		
    });
    
    // For Tab changes of OPEN and SEND 
    $scope.onPushTypeChangePushEvent = function(fields){
        var fieldsArray = []
    	fieldsArray.length = 0
        angular.forEach(fields, function(value, key) {
        	fieldsArray.push(value);
        });
     	$scope.typeFields = fieldsArray
     	console.log(fields)
     	$scope.drawPushDashboardGraphForEvent();
	}
    // For Display the graph 
    function loadPushOpenRateChart(data,graphElement,yAxis){
    	Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        graphElement.highcharts({
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
            //            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            //            pointFormat: '{point.x:%e. %b}: <b>{point.y}</b>'
            //            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
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
                    return  this.name.replace("-START","") 
                }
            },
            yAxis: {
                floor: 0,
                allowDecimals:false,
                title: {
                    text: yAxis
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
});
