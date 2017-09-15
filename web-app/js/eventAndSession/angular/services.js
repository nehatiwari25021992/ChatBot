/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 19 Sep 2014
 * @version 1.0
 */

// AngularJs Services

appHq.factory('dataService', function($rootScope) {
    var service = {};
    var appDataObj = [];
    var queryDataObj = [];
    var eventDataObj = [];
    var activeSesiionsDataObj = [];
    var totalEventDataObj = [];
    var totalPropsDataObj = [];
    var retentionPropsDataObj = [];
    var funnelQ = {};
    var getEmails = {};
    var responseSendEmail={}
    var responsePush = {}
    var markQueryDataObj = {}
    var logsDataObj = [];
    var campaignList = []
    var campaignInstance = {}
    var countriesObj = [];
    var segmentsObj = [];
    var inAppSegmentTotalPropsObj = []
    var inAppSegmentUserPropsObj = []
    var  totalEventsObj=[]
    var installObj = {};
    var weekinstallObj = {};
    var monthinstallObj = {};
    var markQueryDataAdvObj = {}
    service.setApps = function(){
        $.ajax({
            type: "POST",
            async: false,
            url: '../kpi/getAllAppsByUser',
            beforeSend: function (data) {

            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText);
                appDataObj = responseData
            }
        });
        return appDataObj;
    }
    service.getApps = function(){
        return appDataObj;
    }
    service.setBookMarkedQueries = function(id){
        $.ajax({
            type: "POST",
            async: false,
            data: "id="+id,
            url: '../event/getQueriesForApp',
            beforeSend: function (data) {

            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText);
                queryDataObj = responseData
            }
        });
        return queryDataObj;
    }
    service.getBookMarkedQueries = function(){
        return queryDataObj;
    }
    service.setTrendingEvents = function(id){
        $.ajax({
            type: "POST",
            async: false,
            data:"id="+id,
            url: '../event/getTrendingEvents',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
              
                var responseData = parseResponse(data.responseText);
                if(responseData.error == true){
                    eventDataObj = null 
                } else{
                    eventDataObj = responseData
                }    
                hideLoad()          
            }
        });
        return eventDataObj;
    }
    service.getTrendingEvents = function(){
        return eventDataObj;
    }
    service.setTotalEvents = function(id){
       
        $.ajax({
            type: "POST",
            async: false,
            data:"id="+id,
            url: '../event/getAllEvents',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
               
                var responseData = eval(data.responseText)
                totalEventDataObj = responseData
                hideLoad()   
            }
        });
        return totalEventDataObj;
    }
    service.getTotalEvents = function(){
        return totalEventDataObj;
    }
    service.setTotalProps = function(id){
        $.ajax({
            type: "POST",
            async: false,
            data:"id="+id,
            url: '../event/getAllProperties',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText);
                totalPropsDataObj = responseData
                hideLoad()  
            }
        });
        return totalPropsDataObj;
    }
    service.getTotalProps = function(){
        return totalPropsDataObj;
    }
    service.setRetentionProps = function(id){
        $.ajax({
            type: "POST",
            async: false,
            data:"id="+id,
            url: '../event/getRetentionProperties',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText);
                retentionPropsDataObj = responseData
                //hideLoad()  
            }
        });
        return retentionPropsDataObj;
    }
    service.getRetentionProps = function(){
        return retentionPropsDataObj;
    }
    service.getActiveSessions = function(id,event){
        $.ajax({
            type: "POST",
            async: false,
            data:"event="+event+"&id="+id,
            url: '../event/getActiveSessions',
            beforeSend: function (data) {
         
            },
            complete: function (data) {
                var responseData = eval(data.responseText);
                activeSesiionsDataObj = responseData
                
                if(activeSesiionsDataObj.length == 0){
                    $("#div_g").hide()
                    $("#noDataMsg").html("No Data.") 
                    $("#noData").show()  
                    clearIntervals()
                    hideLoad()
                }else{
                    $("#div_g").show()
                    $("#noData").hide() 
                    hideLoad()
                }
            }
        });
        return activeSesiionsDataObj;
    } 
    service.setFunnelQuery = function(id){
        var fName = "null"
        $.ajax({
            type: "POST",
            async: false,
            data:"id="+id+"&fName="+fName,
            url: '../event/getFunnelQuery',
            beforeSend: function (data) {
               
            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText);
                funnelQ = responseData
                hideLoad()  
            }
        });
        return funnelQ;
    }
    service.getFunnelQuery = function(){
        return funnelQ;
    }
    service.sendPushEventQuery = function(queryString){
        $.ajax({
            type: "POST",
            async: false,
            data:"queryString="+queryString,
            url: '../pushNotification/sendPushToEventQuery',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                hideLoad() 
                var responseData = parseResponse(data.responseText);
                responsePush =responseData.message
                 
            }
        });
        return responsePush;
    }
   
    service.sendEmailByEventQuery = function(queryString){
        $.ajax({
            type: "POST",
            async: false,
            data:"queryString="+queryString,
            url: '../email/sendEmailByEventQuery',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText)
                responseSendEmail = responseData.message
                hideLoad()   
            }
        });
        return responseSendEmail;
    }
    service.setBookMarkedQueries1 = function(id,type){
        var qName = null
        $.ajax({
            type: "POST",
            async: false,
            data: "id="+id+"&type="+type+"&qName="+qName,
            url: '../event/getMarkedQueriesForApp',
            beforeSend: function (data) {

            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText);
                markQueryDataObj = responseData
            }
        });
        return markQueryDataObj;
    }
    service.getBookMarkedQueries1 = function(){
        return markQueryDataObj;
    }
    
    service.setBookMarkedQueriesAdv = function(id){
        var qName = null
        $.ajax({
            type: "POST",
            async: false,
            data: "id="+id,
            url: '../event/fetchBookMarkedQueryAdv',
            beforeSend: function (data) {

            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText);
                markQueryDataAdvObj = responseData
            }
        });
        return markQueryDataAdvObj;
    }
    service.getBookMarkedQueriesAdv = function(){
        return markQueryDataAdvObj;
    }
    
    service.setLogsData = function(id){
        $.ajax({
            type: "POST",
            async: false,
            data: "id="+id,
            url: '../event/getLogsForApp',
            beforeSend: function (data) {

            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText);
                logsDataObj = responseData
            }
        });
        return logsDataObj;
    }
    service.getLogsData = function(){
        return logsDataObj;
    }
    
    service.wallPostEventQuery = function(queryString){
        $.ajax({
            type: "POST",
            async: false,
            data:"queryString="+queryString,
            url: '../social/wallPostEventQuery',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText)
                responseWallPost = responseData.message
                hideLoad()   
            }
        });
        return responseWallPost;
    }
    
    service.setCampaignByApp = function(appId){
        $.ajax({
            type: "POST",
            async: false,
            data: "appId="+appId,
            url: '../event/getCampaignByApp',
            beforeSend: function (data) {

            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText);
                campaignList = responseData
            }
        });
        return campaignList;
    }
    service.getCampaignByApp = function(){
        return campaignList;
    }
    
    service.setCampaignByAppAndCampaignId = function(appId,campId){
        $.ajax({
            type: "POST",
            async: false,
            data: "appId="+appId+"&campId="+campId,
            url: '../event/getCampaignById',
            beforeSend: function (data) {

            },
            complete: function (data) {
                var responseData = eval ("(" + data.responseText + ")");
                campaignInstance = responseData
            }
        });
        return campaignInstance;
    }
    service.getCampaignByAppAndCampaignId = function(){
        return campaignInstance;
    }
    
    service.setCountries = function(){
       
        $.ajax({
            type: "GET",
            async: false,
            url: '../dummyData/getAllCountriesForApp',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                var responseData = eval(data.responseText)
                countriesObj = responseData
                hideLoad()   
            }
        });
        return countriesObj;
    }
    service.getCountries = function(){
        return countriesObj;
    }
    service.setSegments = function(id){
       
        $.ajax({
            type: "POST",
            async: false,
            data:"id="+id,
            url: '../dummyData/getInAppSegments',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                var responseData = eval(data.responseText)
                segmentsObj = responseData
                hideLoad()   
            }
        });
        return segmentsObj;
    }
    service.getSegments = function(){
        return segmentsObj;
    }
    
    service.setInAppSegmentUserProps = function(id){
        $.ajax({
            type: "POST",
            async: false,
            data:"id="+id,
            url: '../dummyData/getUserProperties',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText);
                inAppSegmentUserPropsObj = responseData
                hideLoad()  
            }
        });
        return inAppSegmentUserPropsObj;
    }
    service.getInAppSegmentUserProps = function(){
        return inAppSegmentUserPropsObj;
    }
    
    service.setInAppSegmentTotalProps = function(id){
        $.ajax({
            type: "POST",
            async: false,
            data:"id="+id,
            url: '../dummyData/getTotalProperties',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText);
                inAppSegmentTotalPropsObj = responseData
                hideLoad()  
            }
        });
        return inAppSegmentTotalPropsObj;
    }
    service.getInAppSegmentTotalProps = function(){
        return inAppSegmentTotalPropsObj;
    }
    
    service.setSegmentByName = function(id,name){
       
        $.ajax({
            type: "POST",
            async: false,
            data:"id="+id+"&name="+name,
            url: '../dummyData/getSegmentByName',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText)
                segmentsObj = responseData
                hideLoad()   
            }
        });
        return segmentsObj;
    }
    service.getSegmentByName = function(){
        return segmentsObj;
    }
    service.setInstallInfo = function(eventReq){
       
        $.ajax({
            type: "POST",
            dataType: "json",
            async: false,
            data:{"reqDATA" :JSON.stringify(eventReq)},
            url: '../event/getDailyInstallDetails',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText)
                installObj = responseData
                hideLoad()   
            }
        });
        return installObj;
    }
    service.getInstallInfo = function(){
        return installObj;
    }
    
     service.setWeekInstallInfo = function(eventReq){
       
        $.ajax({
            type: "POST",
            dataType: "json",
            async: false,
            data:{"reqDATA" :JSON.stringify(eventReq)},
            url: '../event/getWeeklyInstallDetails',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText)
                weekinstallObj = responseData
                hideLoad()   
            }
        });
        return weekinstallObj;
    }
    service.getWeekInstallInfo = function(){
        return weekinstallObj;
    }
    
     service.setMonthInstallInfo = function(eventReq){
       
        $.ajax({
            type: "POST",
            dataType: "json",
            async: false,
            data:{"reqDATA" :JSON.stringify(eventReq)},
            url: '../event/getMonthlyInstallDetails',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText)
                monthinstallObj = responseData
                hideLoad()   
            }
        });
        return monthinstallObj;
    }
    service.getMonthInstallInfo = function(){
        return monthinstallObj;
    }
    
    service.setAllEvents = function(id){
        
        $.ajax({
            type: "POST",
            async: false,
            data:"id="+id,
            url: '../event/getTotalEvents',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
               
                var responseData = eval(data.responseText)
                totalEventsObj = responseData
                hideLoad()   
            }
        });
        return totalEventDataObj;
    }
    service.getAllEvents = function(){
        return totalEventsObj;
    } 
    
    return service
});

appHq.factory('eventDataPieService', function($rootScope,$http) {
    var service = {
        setAllEvents: function() {
            var promise = $http({
                method: 'GET',
                url: '../event/getTotalEvents',
                params: {
                    id: eventReq.id
                }
            }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        }
    }
    return service

});

appHq.factory('activeSessionService', function($rootScope,$http) {
    var service = {
        getActiveSessions: function(id,event) {
            var promise = $http({
                method: 'GET',
                url: '../event/getActiveSessions',
                params: {
                    id: eventReq.id,
                    event:event
                }
            }).success(function(data, status, headers, config) {
                if(data.length == 0){
                    $("#div_g").hide()
                    $("#noDataMsg").html("No Data.") 
                    $("#noData").show()  
                    clearIntervals()
                    hideLoad()
                }else{
                    $("#div_g").show()
                    $("#noData").hide() 
                    hideLoad()
                }
                return data;
                
            });
            return promise;
        }
    }
    return service

});
appHq.factory('eventPushDashService', function($rootScope,$http) {
    var servicePush = {
    		getPushDashboardGraphForEvent: function(params) {
    		showLoad()
            var promise = $http({
                method: 'GET', 
                methodType: 'GET', 
                url: '../pushNotification/getPushDashboardGraph',
                params:params
            }).success(function(data, status, headers, config) {
            	 hideLoad()
                return data;
            })
            return promise;
        }
    }
    return servicePush;
});