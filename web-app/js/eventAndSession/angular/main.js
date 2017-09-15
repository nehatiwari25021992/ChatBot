/**
 * Shephertz Technologies
 * 
 * @author Jatin Chauhan
 * @date 19 Sep 2014
 * @version 1.0
 */

// AngularJs Module and Configurations
var appHq = angular.module('appHqRetention', ['ngRoute','ngAnimate','ngQuickDate','ui.bootstrap','toggle-switch','angularTreeview']);
// var appHq = angular.module('appHqRetention',
// ['ngRoute','ngAnimate','ui.chart','720kb.datepicker','angular-dygraphs']);
$(function(){
    $('#error_modal').on('hidden.bs.modal', function () {
        var url = document.URL; 
        if(url.indexOf("?appwarp=true")>-1)
        {
            window.parent.location.href = "https://in-apphq.shephertz.com/register/app42Login?appwarp=true";
            return
        }else{
            window.parent.location.href  = "https://in-apphq.shephertz.com/register/app42Login";
            return  
        }
    })
    
    $("#triggerAction_modalForEvent").on("hidden.bs.modal", function () { 
        $("#pushDetailsId").toggle("slow");  
    });

})
$(document).ajaxError(function (xhr, props) {
    hideLoad()
    if (props.status === 401) {
        $("#error_modal").modal('show')
    }
})
appHq.config(['$routeProvider','$httpProvider',
    function($routeProvider,$httpProvider) {
        $routeProvider.
        when('/funnel/', {
            templateUrl: '../event/funnel',
            controller: 'funnelController',
            resolve:{
                eventData: function($q,dataService,$timeout){
                    var deferred = $q.defer()
                    setTimeout(function(){ 
                    $("#bookMarkedQueries1").hide()
                    $("#bookMarkedQueriesAdv").hide()
                    $("#funnelQueries").show()
                    var totalEventsObj = dataService.setTotalEvents(eventReq.id)
                    var totalPropsObj = dataService.setTotalProps(eventReq.id)
                    // var funnelQ = dataService.setFunnelQuery(eventReq.id)
                    deferred.resolve(totalPropsObj)   
                    }, 0);
                    showLoad()
                    
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                }
            }
        }).
        when('/dau/', {
            templateUrl: '../event/dau',
            controller: 'dauController',
            resolve:{
                eventData: function($q,dataService,$timeout){
                    var deferred = $q.defer()
                    setTimeout(function(){ 
                    $("#bookMarkedQueries1").show()
                    $("#bookMarkedQueriesAdv").hide()
                    $("#funnelQueries").hide()
                    var queries1 = dataService.setBookMarkedQueries1(eventReq.id,"ACTIVEUSERSDAILY")
                    var totalEventsObj = dataService.setTotalEvents(eventReq.id)
                    var totalPropsObj = dataService.setTotalProps(eventReq.id)
                    deferred.resolve(totalEventsObj) 
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                }
            }
        }).
        when('/mau/', {
            templateUrl: '../event/mau',
            controller: 'mauController',
            resolve:{
                eventData: function($q){
                    showLoad()
                    $("#bookMarkedQueries1").hide()
                    $("#bookMarkedQueriesAdv").hide()
                    $("#funnelQueries").hide()
                    var deferred = $q.defer()
                }
            }
        }).
        when('/wau/', {
            templateUrl: '../event/wau',
            controller: 'wauController',
            resolve:{
                eventData: function($q){
                    showLoad()
                    $("#bookMarkedQueries1").hide()
                    $("#bookMarkedQueriesAdv").hide()
                    $("#funnelQueries").hide()
                    var deferred = $q.defer()
                   
                }
            }
        }).
        when('/retention/', {
            templateUrl: '../event/retention',
            controller: 'retentionController',
            resolve:{
                eventData: function($q,dataService,$timeout){
                    var deferred = $q.defer()
                    setTimeout(function(){ 
                    $("#bookMarkedQueries1").hide()
                    $("#bookMarkedQueriesAdv").hide()
                    $("#funnelQueries").hide()
                    var totalPropsObj = dataService.setRetentionProps(eventReq.id)
                    deferred.resolve(totalPropsObj)     
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 1000);

                    return deferred.promise;
                }
            }
        }).
        when('/segmentation/', {
            templateUrl: '../event/segmentation',
            controller: 'segmentationController',
            resolve:{
                eventData: function($q,dataService,$timeout){
                    var deferred = $q.defer()
                    setTimeout(function(){ 
                    $("#bookMarkedQueries1").hide()
                    $("#bookMarkedQueriesAdv").hide()
                    $("#funnelQueries").hide()
                    var totalEventsObj = dataService.setTotalEvents(eventReqSegmentation.id)
                    // dataService.setBookMarkedQueries(eventReqSegmentation.id)
                    dataService.setTotalProps(eventReqSegmentation.id)
                    deferred.resolve(totalEventsObj)  
                     
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                }
            }
        }).
        when('/advanceSegmentation/', {
            templateUrl: '../event/advanceSegmentation',
            controller: 'advanceSegmentationController',
            resolve:{
                eventData: function($q,dataService,$timeout){
                     var deferred = $q.defer()
                   setTimeout(function(){ 
                      $("#bookMarkedQueries1").hide()
                    $("#bookMarkedQueriesAdv").hide()
                    $("#funnelQueries").hide()
                    
                   var totalEventsObj = dataService.setTotalEvents(eventReqSegmentation.id)
                    // dataService.setBookMarkedQueries(eventReqSegmentation.id)
                    dataService.setTotalProps(eventReqSegmentation.id)
                    deferred.resolve(totalEventsObj)  
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                }
            }
        }).
        when('/advSegmentation/', {
            templateUrl: '../event/advSegmentation',
            controller: 'advSegmentationController',
            resolve:{
                eventData: function($q,dataService,$timeout){
                var deferred = $q.defer()
                    setTimeout(function(){ 
                    $("#bookMarkedQueries1").hide()
                    $("#funnelQueries").hide()
                    $("#bookMarkedQueries").hide()
                    $("#bookMarkedQueriesAdv").show()
                    
                    var getInAppSegment = dataService.setBookMarkedQueries1(eventReq.id,"IN-APP-SEGMENTS")
                    var queryAdv = dataService.setBookMarkedQueriesAdv(eventReq.id)
                    deferred.resolve(queryAdv)  
                    deferred.resolve(getInAppSegment)    
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                }
            }
        }).
        when('/session/', {
            templateUrl: '../event/session1',
            controller: 'sessionController',
            resolve:{
                eventData: function($q,dataService,$timeout){
                   var deferred = $q.defer()
                   setTimeout(function(){ 
                    $("#bookMarkedQueriesAdv").hide()
                    $("#funnelQueries").hide()
                    var totalEventsObj = dataService.setTotalEvents(eventReq.id)
                    deferred.resolve(totalEventsObj)    
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                }
            }
        }).
        when('/trending/', {
            templateUrl: '../event/trending',
            controller: 'eventController',
            resolve:{
                eventData: function($q,dataService,$timeout){
                   $("#bookMarkedQueries1").show()
                    $("#bookMarkedQueriesAdv").hide()
                    $("#funnelQueries").hide()
                    var deferred = $q.defer()
                    setTimeout(function(){ 
                        var eventObj = dataService.setTrendingEvents(eventReq.id)
                        var totalEventsObj = dataService.setTotalEvents(eventReq.id)
                        var totalPropsObj = dataService.setTotalProps(eventReq.id)
                        var queries1 = dataService.setBookMarkedQueries1(eventReq.id,"EVENT")
                        //                    var getEventData = dataService.setAllEvents(eventReq.id)
                        
                        deferred.resolve(queries1)    
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                }
            }
        }).when('/sendPush/', {
            templateUrl: '../event/sendPush',
            controller: 'sendPushControllers'
        }).when('/profiling/', {
            templateUrl: '../event/profiling',
            controller: 'profilingController'
        }).when('/revenue/', {
            templateUrl: '../event/revenue',
            controller: 'revenueController'
        }).when('/averageTime/', {
            templateUrl: '../event/averageSessionTime',
            controller: 'averageTimeController',
            resolve:{
                eventData: function($q,dataService,$timeout){
                    var deferred = $q.defer()
                    setTimeout(function(){ 
                    $("#bookMarkedQueries1").hide()
                    $("#bookMarkedQueriesAdv").hide()
                    $("#funnelQueries").hide()
                    var totalEventsObj = dataService.setTotalEvents(eventReq.id)
                    clearIntervals()
                    deferred.resolve(totalEventsObj)    
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                      
                }
            }
        }).when('/userTime/', {
            templateUrl: '../event/userSessionTime',
            controller: 'userTimeController'
        }).when('/logs/', {
            templateUrl: '../event/logs',
            controller: 'logsController',
            resolve:{
                eventData: function($q,dataService,$timeout){
                    var deferred = $q.defer()
                    setTimeout(function(){ 
                    var totalLogsObj = dataService.setLogsData(eventReq.id)
                    deferred.resolve(totalLogsObj)  
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                      
                }
            }
        }).
        when('/addCamp/', {
            templateUrl: '../event/addCampaign',
            controller: 'addCampaignController',
            resolve:{
                eventData: function($q,dataService,$timeout){
                    emailDataConfiguration = null
                    pushDataConfiguration = null
                    fbDataConfiguration = null
                    $("#bookMarkedQueries1").hide()
                    $("#bookMarkedQueriesAdv").hide()
                    $("#funnelQueries").hide()
                    var deferred = $q.defer()
                    setTimeout(function(){ 
                        var campaignListByApp = dataService.setCampaignByApp(eventReq.id)
                    var totalEventsObj = dataService.setTotalEvents(eventReq.id)
                    var getInAppSegment = dataService.setBookMarkedQueries1(eventReq.id,"IN-APP-SEGMENTS")
                    deferred.resolve(getInAppSegment)    
                    }, 0);
                     
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                }
            }
        }).
        when('/allCamp/', {
            templateUrl: '../event/allCampaign',
            controller: 'allCampaignController',
            resolve:{
                eventData: function($q,dataService,$timeout){
                    var deferred = $q.defer()
                    setTimeout(function(){ 
                    $("#bookMarkedQueries1").hide()
                    $("#bookMarkedQueriesAdv").hide()
                    $("#funnelQueries").hide()
                    var campaignListByApp = dataService.setCampaignByApp(eventReq.id)
                    deferred.resolve(campaignListByApp) 
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                    
                    
                }
            }
        }).when('/viewPushDashboard/:name', {
            templateUrl: '../event/viewPushDashboard',
            controller: 'viewPushDashboardController'
        }).when('/addSegment/', {
            templateUrl: '../dummyData/addSegment',
            controller: 'addSegmentController',
            resolve:{
                eventData: function($q,dataService,$timeout){
                    var deferred = $q.defer()
                    setTimeout(function(){ 
                    var countriesObj = dataService.setCountries()
                    dataService.setInAppSegmentTotalProps(eventReq.id)
                    dataService.setInAppSegmentUserProps(eventReq.id)
                    dataService.setTotalEvents(eventReq.id)
                    deferred.resolve(countriesObj)     
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                   
                }
            }
           
        }).when('/segments/', {
            templateUrl: '../dummyData/segments',
            controller: 'segmentsController',
            resolve:{
                eventData: function($q,dataService,$timeout){
                    var deferred = $q.defer()
                    setTimeout(function(){ 
                    var segmentsObj = dataService.setSegments(eventReq.id)
                    deferred.resolve(segmentsObj)      
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                    
                }
            }
           
        }).when('/editCamp/:id', {
            templateUrl: '../event/addCampaign',
            controller: 'addCampaignController',
            resolve:{
                eventData: function($q,dataService,$route,$timeout){
                    var deferred = $q.defer()
                    setTimeout(function(){ 
                    emailDataConfiguration = null
                    pushDataConfiguration = null
                    fbDataConfiguration = null
                    $("#bookMarkedQueries1").hide()
                    $("#funnelQueries").hide()
                    $("#bookMarkedQueriesAdv").hide()
                    var campaignId = $route.current.params.id
                    var campaignListByApp = dataService.setCampaignByApp(eventReq.id)
                    var campaignInstance = dataService.setCampaignByAppAndCampaignId(eventReq.id,campaignId)
                    var totalEventsObj = dataService.setTotalEvents(eventReq.id)
                    var getInAppSegment = dataService.setBookMarkedQueries1(eventReq.id,"IN-APP-SEGMENTS")
                    deferred.resolve(getInAppSegment)  
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                    
                    
                }
            }
        }).when('/viewSegment/:name', {
            templateUrl: '../dummyData/viewSegment',
            controller: 'viewSegmentController',
            resolve:{
                eventData: function($q,dataService,$route,$timeout){
                   var deferred = $q.defer()
                    setTimeout(function(){ 
                    $("#bookMarkedQueries1").hide()
                    $("#bookMarkedQueriesAdv").hide()
                    $("#funnelQueries").hide()
                    var segmentName = $route.current.params.name
                    var segmentObj = dataService.setSegmentByName(eventReq.id,segmentName)
                    deferred.resolve(segmentObj)  
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                    
                }
            }
        }).when('/editSegment/:name', {
            templateUrl: '../dummyData/editSegment',
            controller: 'editSegmentController',
            resolve:{
                eventData: function($q,dataService,$route,$timeout){
                    var deferred = $q.defer()
                    setTimeout(function(){ 
                    $("#bookMarkedQueries1").hide()
                    $("#funnelQueries").hide()
                    $("#bookMarkedQueriesAdv").hide()
                    var segmentName = $route.current.params.name
                    var segmentObj = dataService.setSegmentByName(eventReq.id,segmentName)
                    var countriesObj = dataService.setCountries()
                    dataService.setInAppSegmentTotalProps(eventReq.id)
                    dataService.setInAppSegmentUserProps(eventReq.id)
                    dataService.setTotalEvents(eventReq.id)
                    deferred.resolve(segmentObj)     
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                    
                    
                }
            }
        }).when('/install/', {
            templateUrl: '../event/install',
            controller: 'installController',
            resolve:{
                installData: function($q,dataService,$timeout){
                    var deferred = $q.defer()
                    setTimeout(function(){ 
                    $("#bookMarkedQueries1").hide()
                    $("#funnelQueries").hide()
                    var totalEventsObj = dataService.setTotalEvents(eventReq.id)
                    var checkIfInstall = totalEventsObj.indexOf("INSTALL");
                    if(checkIfInstall != "-1"){
                        events.length = 0
                        events.push("INSTALL")
                        eventReq.setEvents(events)
                        var installCountObj = dataService.setInstallInfo(eventReq)
                        var installWeekCountObj = dataService.setWeekInstallInfo(eventReq)
                        var installMonthCountObj = dataService.setMonthInstallInfo(eventReq)
                        deferred.resolve(installMonthCountObj)  
                    }else{
                        deferred.resolve(totalEventsObj)
                    }
                    }, 0);
                    showLoad()
                    $timeout(function() {
                         deferred.resolve({
                                message: "This is delay!"
                            });
                    }, 0);

                    return deferred.promise;
                    
                    
                }
            }
        }).when('/setting/', {
            templateUrl: '../event/setting',
            controller: 'eventSettingController'
        }).        
        otherwise({
            redirectTo: '/trending'
        });
    // console.log($httpProvider.responseInterceptors.push('globalInterceptor'))
    }]) // Here we define our interceptor
.factory('globalInterceptor', function($q){
    // When the interceptor runs, it is passed a promise object
    return function(promise){

        // In an interceptor, we return another promise created by the .then
		// function.
        return promise.then(function(response){
            // Do your code here if the response was successful
            // $("#error_modal").modal('show')
            // Always be sure to return a response for your application code to
			// react to as well
            return response;
        }, function(response){
            // Do your error handling code here if the response was unsuccessful
            if(response.status == 401){
                $("#error_modal").modal('show')
            }
            // Be sure to return a reject if you cannot recover from the error
			// somehow.
            // This way, the consumer of the $http request will know its an
			// error as well
            return $q.reject(response);
        });
    }
});


// Loader configurations
appHq.run(['$rootScope', function($root) {
    $root.$on('$routeChangeStart', function(e, curr, prev) { 
       if(prev !=undefined){
            var currStr = curr.$$route.originalPath;
            var currLen = currStr.length; // this will be 16
            var lastChar = currStr.charAt(currLen - 1); // this will be the string "."
            if(lastChar == "/"){
                currStr = currStr.slice(0,-1);
            }
            var prevStr = prev.$$route?prev.$$route.originalPath:''
            var prevLen = prevStr.length; // this will be 16
            var lastCharPrev = prevStr.charAt(prevLen - 1); // this will be the string "."
            if(lastCharPrev == "/"){
                prevStr = prevStr.slice(0,-1);
            }
           if(currStr != prevStr){
               showLoad()
           }
       }else{
           showLoad()
       }
       
    });
    $root.$on('$routeChangeSuccess', function(e, curr, prev) { 
       var currStr = curr.$$route?curr.$$route.originalPath:"";
       if(currStr != "/retention/")
       hideLoad()
    });
    $root.$on('$routeChangeError', function(e, curr, prev, rejection) {
        hideLoad()
    });
}]);