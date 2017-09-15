/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 19 Sep 2014
 * @version 1.0
 */

// segmentation Angular Controller
var segmentationScopeInstance
appHq.controller("segmentationController", function($scope, $rootScope,dataService,$timeout, $http,$location) {
    segmentationScopeInstance = $scope
    $("a.active").removeClass("active");
    $("#eventMenu").addClass("active");
    $("#segmentation_id").addClass("active");
    $("#noData").hide(); 
    $("#bookMarkedQueries").show(); 
    //    set up for tour
    $scope.helpMsgArray = getAllTourTipMessage("SEGMENTATION")
    
    $scope.getPropertiesforEvents = function(){
        console.log("called..")
        showLoad()
        $http({
            method: "post",
            params: {
                "appId":eventReq.getId(),
                "events":$scope.eventSegmentation
            },
            url: '../event/getPropertiesforEvents'
        }).success(function(data, status) {
            var cleanedProperties =[]
            data.forEach(function(obj,index ){
			     
                if (/app42_/i.test(obj.name)){
                    var newObj = {
                        "name" : obj.name,
                        "defaultName" : obj.name.replace('app42_','') + ' (Default)',
                        "type" : obj.type
                    }
                    cleanedProperties.push(newObj)
                } else{
                    var newObj2 = {
                        "name" : obj.name,
                        "defaultName" : obj.name,
                        "type" : obj.type
                    }
                    cleanedProperties.push(newObj2)
                }
            })
            $scope.totalProps = cleanedProperties
            hideLoad()
        }).error(function(data, status) {
            // Some error occurred
            console.log(data)
            hideLoad()
        });
    }
    
    $scope.showTourForWizard = function(){
        $scope.CompletedEvent = function (scope) {
        
        };

        $scope.ExitEvent = function (scope) {
            var prevRes = $.cookie("SEGMENTATION")
            if(prevRes == "ok"){
                    
            }else{
                dhtmlx.confirm({
                    type:"confirm",
                    ok:"Yes",
                    cancel:"No",
                    text:"Do not display this message again ?",
                    callback: function(res) {
                        if(res){
                            $.cookie("SEGMENTATION", "ok",{
                                expires: 365 * 10
                            });
                        }else{
                            $.removeCookie("SEGMENTATION");  
                        }
                    }
                });
            }   
        };

        $scope.ChangeEvent = function (targetElement, scope) {
            
        };

        $scope.BeforeChangeEvent = function (targetElement, scope) {
           
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
                var res = $.cookie("SEGMENTATION")
       
                if(res == "ok"){
                    return false;
                }else{
                    return true;    
                }  
            }
        }  
    }
    $scope.showTourForWizard()
    //----------------------//
    mianControllersIns.bookMarkedQuery = ""
    eventReq.setType("SEGMENTATION")
    // $scope.items = [];
    properties.length = 0
    properties.push({
        propertyName:"",
        propertyType:"",
        propertyValue:""
    })
    $scope.subPropsArrOption = []
    $scope.subPropsArrOption.push("--Choose Value--")
    $scope.subProperty = $scope.subPropsArrOption[0]
    
    eventReqSegmentation.setProperties(properties)
    var finalJson = JSON.stringify(eventReqSegmentation)
    $("#finalJson").html(finalJson)
    // $scope.finalJSON = finalJson
    // set total events in scope
    var totalEvents = dataService.getTotalEvents()
    $scope.totalEvents = totalEvents 
    // set all properties in scope
      
    var totalProps = dataService.getTotalProps()
    var cleanedProperties =[]
    totalProps.forEach(function(obj,index ){
     
        if (/app42_/i.test(obj.name)){
            var newObj = {
                "name" : obj.name,
                "defaultName" : obj.name.replace('app42_','') + ' (Default)',
                "type" : obj.type
            }
            cleanedProperties.push(newObj)
        } else{
            var newObj2 = {
                "name" : obj.name,
                "defaultName" : obj.name,
                "type" : obj.type
            }
            cleanedProperties.push(newObj2)
        }
    })
    $scope.totalProps = cleanedProperties
    // set total bookmarked queries for the selected app in scope in scope
    var queries = mianControllersIns.basicQueries
    // for Same Name check
    var queriesAdv = mianControllersIns.advanceQueries
    mianControllersIns.queries = queries 

    
    $scope.ddate = null
    $scope.activityLogs = []
    
    var range = $('#basicSegDateRange');
    $scope.eventBasicStart = moment().subtract('days', 6).format('YYYY-MM-DD')
    $scope.eventBasicEnd = moment().format('YYYY-MM-DD')
    // Show the dates in the range input
    range.val(moment().subtract('days', 6).format('YYYY-MM-DD')+" - "+moment().format('YYYY-MM-DD'))
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
        var startD =$("#basicSegDateRange").data('daterangepicker').startDate.format('YYYY-MM-DD')
        var endD =$("#basicSegDateRange").data('daterangepicker').endDate.format('YYYY-MM-DD')
        $scope.eventBasicStart = startD
        $scope.eventBasicEnd = endD
    });
    
    
    $scope.applyEvents = function() {
       
        if(events.length > 0){
            customAlert("alert-error","Only one event is allowed!")
            return  
        }else if(!$scope.eventSegmentation){
            customAlert("alert-error","Please choose an event!")
            return
        }
       
        var eveSegValue = $scope.eventSegmentation.replace(/ /g,'')
        var eventBasicStart = $scope.eventBasicStart
        var eventBasicEnd =  $scope.eventBasicEnd
        if(events.length<=1){
            var eventLength = $("table#eventSegmentBox tr#"+eveSegValue).length
            if(eventLength < 1){
                var finalOutput =""
                if(events.length == 0){
                    $("#applyPropBtn").attr("disabled",false)
                    finalOutput = '<tr id="'+eveSegValue+'" ><td>'+$scope.eventSegmentation+'</td><td align=center>'+eventBasicStart+' <span class="too">To</span> '+eventBasicEnd+'</td><td><button type="button" id="deleteEvent'+eveSegValue+'" onclick=destroy(\''+eveSegValue+'\')  class="btn btn-danger">X</button></td></tr>'
                    events.push({
                        name: $scope.eventSegmentation, 
                        start:eventBasicStart,
                        end:eventBasicEnd
                    });
                }else{
                    customAlert("alert-error","Only one event is allowed!") 
                }
                eventReqSegmentation.setEvents(events)
                var finalJson = JSON.stringify(eventReqSegmentation)
                $("#finalJson").html(finalJson)
                $("#noEventsTr").hide()
                $scope.eventSegmentation = ""
                $('#eventSegmentBox > tbody:last').append(finalOutput); 
                $("#buttonBox").show()
                if(eventReqSegmentation.getProperties()[0].propertyName != ""){
                    getSubProperties(eventReqSegmentation)  
                }
                    
            }else{
                customAlert("alert-error","Event already added!")   
            }
        }else{
            customAlert("alert-error","Only 2 events are allowed!")  
        }
        
    };
    $scope.openPropertySettings = function() {
        
        var selectedProp = $scope.property
       
        if(selectedProp == "" || selectedProp == null){
            //            $('select#sub-property').empty().append('<option value="" selected>--Choose Value--</option>')
            $scope.subPropsArrOption = []
            $scope.subPropsArrOption.push("--Choose Value--")
            $scope.subProperty =  $scope.subPropsArrOption[0]
            return 
        }
        var result = $.grep($scope.totalProps, function(e){ 
            return e.name == selectedProp; 
        });
        var selectedPropType = result[0].type
        
        //        if(selectedPropType=="decimal"){
        //        	  $("#operatorValueId").show();
        //        }else{
        //        	$("#operatorValueId").hide();
        //        }
        var newReqObj = {                                    
            "id":eventReqSegmentation.id,
            "events" : events,
            "properties" : [{
                propertyName: selectedProp, 
                propertyType:  selectedPropType,
                propertyValue:  ""
            }]
        }
        getSubProperties(newReqObj);
      
    };
    $scope.applyProps = function() {
        
        var selectedProp = null
        if($scope.property !=undefined){
            selectedProp = $scope.property.replace(/ /g,'')
        }
      
        var selectedSubProp = $scope.subProperty
        if(!selectedProp  || selectedSubProp == "--Choose Value--"){
            customAlert("alert-error","Property and its value are mandatory!")
            return
        }
       
        if(properties[0].propertyName == ""){
            var propertyLength = $("table#propertySegmentBox tr#"+selectedProp).length
            if(propertyLength < 1){
                var finalOutput ='<tr id="'+selectedProp+'" ><td>'+$scope.property+'</td><td>'+selectedSubProp+'</td><td><button type="button" id="deleteProp'+selectedProp+'" onclick=destroyProperty(\''+selectedProp+'\')  class="btn btn-danger">X</button></td></tr>'
        
                var result = $.grep(totalProps, function(e){ 
                    return e.name == $scope.property; 
                });
                var selectedPropType = result[0].type
                properties.length = 0
                properties.push({
                    propertyName:$scope.property,
                    propertyType:selectedPropType,
                    propertyValue:selectedSubProp  
                })
                eventReqSegmentation.type =""
                eventReqSegmentation.setProperties(properties)
               
                $("#noPropsTr").hide()
                $('#propertySegmentBox > tbody:last').append(finalOutput); 
                var finalJson = JSON.stringify(eventReqSegmentation)
                $("#finalJson").html(finalJson)
                $scope.property = ""
                $scope.subPropsArrOption = []
                $scope.subPropsArrOption.push("--Choose Value--")
                $scope.subProperty =  $scope.subPropsArrOption[0]
            }else{
                customAlert("alert-error","Property already added!")   
            }
        }else{
            customAlert("alert-error","You can add atmost 1 property!")  
        }
        
    };
    $scope.submitQuery = function() {
        
        if(events.length == 0){
            customAlert("alert-error","Event is mandatory!")  
            return
        }
        $scope.bokkmarkQuueryName = ""
        $("#myModalBookmark").modal('show')
    }
    $scope.saveSegmentationForm = function(flag) {
        var name = "default"
        var url=''
        if(flag != "no"){
            $("#deleteSegQuery").hide()
            name = $scope.bokkmarkQuueryName
            if(name === undefined || name == null || name == ""){
                customAlert("alert-error","Query name cannot be set blank.") 
                return; 
            }
            var flag2 = false
            for(key in queries){
                if(queries[key].name == name){
                    flag2 =  true 
                    break;
                }
            }
            //For Same Name basic Or Advance
            for(key in queriesAdv){
                if(queriesAdv[key].name == name){
                    flag2 =  true 
                    break;
                }
            }
            
            if(flag2){
                customAlert("alert-error","Segmentation with this name already exists.") 
                return;
            }
        }
        if(events.length == 1){
            url = '../event/getUsersForApp'
        }else if(events.length == 2){
            url = '../event/saveQuery'
        }
        $("#resData").hide()
        $("#showErrorBox").hide()
        var finalJson = JSON.stringify(eventReqSegmentation)
        $scope.eventsForPush = []
        $scope.eventsForPush.push({
            name: eventReqSegmentation.getEvents()[0].name, 
            startDate:  convertDateFormate(eventReqSegmentation.getEvents()[0].start),
            endDate: convertDateFormate(eventReqSegmentation.getEvents()[0].end)
        })
        pushRequestModel.setEvents($scope.eventsForPush);
        // Set Properties
        pushRequestModel.setProperties(eventReqSegmentation.getProperties());
        emailRequestModel.setEvents($scope.eventsForPush);
        wallPostRequestModel.setEvents($scope.eventsForPush);
        emailRequestModel.setProperties(eventReqSegmentation.getProperties());
        wallPostRequestModel.setProperties(eventReqSegmentation.getProperties());
        
        $.ajax({
            type: "POST",
            async: false,
            data:"data="+finalJson+"&name="+name,
            url: url,
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText);
                hideLoad()
                $("#myModalBookmark").modal('hide')
             
                //                if(properties[0].propertyName == ""){
                //                    $scope.property = ""
                //                    $scope.subPropsArrOption = []
                //                    $scope.subPropsArrOption.push("--Choose Value--")
                //                    $scope.subProperty =  $scope.subPropsArrOption[0]
                //                }
                $scope.property = ""
                $scope.subPropsArrOption = []
                $scope.subPropsArrOption.push("--Choose Value--")
                $scope.subProperty =  $scope.subPropsArrOption[0]
                $('#eventSegmentation').prop('disabled', true);
               // $('#basicSegDateRange').prop('disabled', true);
                $('#addEventToBox').prop('disabled', true);
                $('#property').prop('disabled', true); 
                $('#sub-property').prop('disabled', true); 
                $("#applyPropBtn").prop("disabled",true)
                $("#deleteEvent"+eventReqSegmentation.getEvents()[0].name).prop("disabled",true)
               
                $("#deleteProp"+eventReqSegmentation.getProperties()[0].propertyName).prop("disabled",true)
                $scope.bookMarkedQuery = responseData[0].queryObj[0]
                $scope.segQuery = responseData[0].queryObj[0]
              
                if(responseData.length == 0){
                    $scope.items = []
                }else{
                    if(responseData[0].namesObj.length == 0){
                        $("#triggerActionId").prop("disabled", true); 
                        $("#resData").hide()
                        $("#exportResHidden").show()
                        $("#exportRes").hide()
                        $("#showErrorBox").show()
                        $("#showErrorBox").html("No Data found for this query.")
                        $("#showCount").hide()
                    }else{
                        $("#exportResHidden").hide()
                        $("#exportRes").show()
                        $("#triggerActionId").prop("disabled", false);
                        $("#resData").show()
                        $("#showErrorBox").hide()
                    }
                      
                    
                    if(name!="default"){
                        mianControllersIns.queries.push(responseData[0].queryObj[0])  
                        // $("select#bookMarkedQuery
                        // option").last().prop("selected",true);
                        // $("select#bookMarkedQuery
                        // option:last-child").prop("selected",true);
                        $("#deleteSegQuery").show()
                    }
                   
                    $("#buttonBox").hide()
                    $("#resultButtonBox").show()
                    
                     
                    if(responseData[0].namesObj.length < 10){
                        $("#loadMoreBtn").hide()
                        $("#noMoreBtn").hide()
                    }
                    
                    
                    $scope.items = responseData[0].namesObj
                    console.log($scope.items)
                    $scope.finalJSON = finalJson
                  
                }
            }
        });
        $.ajax({
            type: "POST",
            async: false,
            data:"data="+finalJson+"&name="+name,
            url:  '../event/getCountOfUsersForApp',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText);
                console.log("Response Data is" + JSON.stringify(responseData))
                hideLoad()
                if(responseData.length == 0){
                    $scope.counts = []
                }else{
                    if(responseData.count.length == 0){
                        $("#showCount").hide()
                    }else{
                        $scope.counts = responseData[0].count
                        console.log( $scope.counts)
                        $("#showCount").show()
                    }
                      
                }
              
                
            }
        })
    }
    $scope.createNewQuery = function(){
        $("#showCount").hide()
        $("#bookmarkCount").hide()
        
        $("#helpBtn").show()
        $scope.bookMarkedQuery = ""
        $("#bookMarkedQuery").val("")
        events.length = 0
        properties.length = 0
        properties.push({
            propertyName:"",
            propertyType:"",
            propertyValue:""  
        })
        eventReqSegmentation.setEvents(events)
        eventReqSegmentation.setProperties(properties)
        $("#resData").hide()
        $scope.property = ""
        $scope.subPropsArrOption = []
        $scope.subPropsArrOption.push("--Choose Value--")
        $scope.subProperty =  $scope.subPropsArrOption[0]
        $('#eventSegmentBox > tbody:last').empty().append(" <tr id=noEventsTr><td></td><td><span class=label>No Events Added Yet!</span></td><td></td></tr>");
        $('#eventSegmentation').prop('disabled', false);
        $('#eventSegmentation option:eq(0)').prop('selected', true);
        $scope.ddate = null
        $('#addEventToBox').show() 
        $('#addEventToBox').prop('disabled', false);
        $('#property').prop('disabled', false); 
        $('#sub-property').prop('disabled', false); 
        $("#applyPropBtn").prop("disabled",true)
        $('#propertySegmentBox > tbody:last').empty().append(" <tr id=noPropsTr><td></td><td><span class=label>No Properties Added Yet!</span></td><td></td></tr>");
        $("#showErrorBox").hide()
        $('#buttonBox').hide() 
        $('#resultButtonBox').hide()
    }
    $scope.deleteQuery = function(){
     
     
        //        if($scope.bookMarkedQuery == null || $scope.bookMarkedQuery || "null" || $scope.bookMarkedQuery == ""){
        //            console.log("iffffffff")
        //             console.log($scope.queries[$scope.queries.length - 1])
        //            $scope.segQuery = $scope.queries[$scope.queries.length - 1]
        //        }
        $.ajax({
            type: "POST",
            async: false,
            data:"name="+$scope.segQuery.name+"&id="+$scope.segQuery.id+"&viewId="+$scope.segQuery.viewId,
            url: "../event/deleteSegQuery",
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                var responseData = parseResponse(data.responseText);
              
                hideLoad()
                if(!responseData){
                    customAlert("alert-error","Unable to delete query write now.Please try after some time!")
                    return
                }
                
                $("#bookMarkedQuery option:contains('"+$scope.segQuery.name+"')").remove();
                //                $("#bookMarkedQuery option:[text='" + $scope.segQuery.name + "']").remove();
                //                $scope.bookMarkedQuery = ""
                //                $scope.segQuery = null
                $("#bookMarkedQuery").val("")
                events.length = 0
                properties.length = 0
                properties.push({
                    propertyName:"",
                    propertyType:"",
                    propertyValue:""  
                })
               
                
                eventReqSegmentation.setEvents(events)
                eventReqSegmentation.setProperties(properties)
                $("#resData").hide()
                $('#eventSegmentBox > tbody:last').empty().append("<tr id=noEventsTr><td></td><td><span class=label>No Events Added Yet!</span></td><td></td></tr>");
                $('#propertySegmentBox > tbody:last').empty().append("<tr id=noPropsTr><td></td><td><span class=label>No Properties Added Yet!</span></td><td></td></tr>");
                //                $('#eventSegmentation').prop('disabled', true);
                $('#addEventToBox').prop('disabled', false);
                $('#property').prop('disabled', false); 
                $('#sub-property').prop('disabled', false); 
                $("#applyPropBtn").prop("disabled",true)
                $('#eventSegmentation').prop('disabled', false);
                $('#addEventToBox').show() 
                $('#buttonBox').show() 
                $("#noEventsTr").show()
                $("#noPropsTr").show()
                $('#resultButtonBox').hide()  
               
            }
        });
    }
    $scope.loadMore = function() {
       
        showLoad()
        var finalJson = JSON.stringify(eventReqSegmentation)
         $scope.filteredTodos = []
         
      
        $http({
            method: "post",
            params: {
                // queryName:queryName,
                start:$scope.items[0].username,
                end:$scope.items[$scope.items.length - 1].username,
                data:finalJson
            },
            url: '../event/getPagingResults'
           
        }).success(function(data, status) {
            for (var i = 0; i < data.length; i++) {
                $scope.items.push(data[i]);
                
                 $scope.filteredTodos = $scope.items.slice(start, end);
                 console.log("Start"  + start)
                 console.log("end"  + end)
                 
                 console.log("filtered todos" +  "  " +  $scope.filteredTodos)
            }
            if(data.length < 10){
                // $("#loadMoreBtn").attr("disabled",true)
                $("#loadMoreBtn").hide()
                $("#noMoreBtn").show()
            }
            hideLoad()
        }).error(function(data, status) {
            // Some error occurred
            hideLoad()
        });
    
    };
    $scope.getUserData = function(name,index){
        $(".loadMoreLogsBtn").hide()
        $(".noMoreBtnLogs").hide()
        //var strDate = moment().utc().subtract('days', 29).format('YYYY-MM-DD'),
        //enDate = moment().utc().format('YYYY-MM-DD')
        // This for passing date Range 
        var strDate = $scope.eventBasicStart,
        enDate = $scope.eventBasicEnd
        console.log(name)
        $.ajax({
            type: "POST",
            async: false,
            
            data:"id="+eventReqSegmentation.id+"&name="+name.username+"&start="+strDate+"&end="+enDate,
            url: '../event/userInfo',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                hideLoad()
                
                var responseData = eval(data.responseText);
                $scope.deviceUser = responseData[0].deviceUser
                
                var finalOutput  =''
                if(responseData[0].details.length == 0){
                    finalOutput = finalOutput + '<tr><td>&nbsp;</td><td colspan="3" align="center" valign="middle" style="color:#ff0000; padding:20px 0; font-size:15px;">No Profile details available!</td></tr>'
                }else{
                  
                    if(responseData[0].details[0].account_expired!=null)
                        finalOutput = finalOutput + '<tr><td>Account Expired:</td><td>'+responseData[0].details[0].account_expired+'</td></tr>'
                    if(responseData[0].details[0].account_locked!=null)
                        finalOutput = finalOutput + '<tr><td>Account Locked:</td><td>'+responseData[0].details[0].account_locked+'</td></tr>'
                    if(responseData[0].details[0].created_on!=null)
                        finalOutput = finalOutput + '<tr><td>Created On:</td><td>'+moment(responseData[0].details[0].created_on).format('YYYY-MM-DD')+'</td></tr>'
                    if(responseData[0].details[0].email!=null)
                        finalOutput = finalOutput + '<tr><td>Email:</td><td><a href=mailto:'+responseData[0].details[0].email+'>'+responseData[0].details[0].email+'</a></td></tr>'
                    if(responseData[0].details[0].first_name!=null && responseData[0].details[0].first_name!="")
                        finalOutput = finalOutput + '<tr><td>First Name:</td><td>'+responseData[0].details[0].first_name+'</td></tr>'
                    if(responseData[0].details[0].last_name!=null && responseData[0].details[0].last_name!="")
                        finalOutput = finalOutput + '<tr><td>Last Name:</td><td>'+responseData[0].details[0].last_name+'</td></tr>'
                    if(responseData[0].details[0].sex!=null)
                        finalOutput = finalOutput + '<tr><td>Gender:</td><td>'+responseData[0].details[0].sex+'</td></tr>'
                    if(responseData[0].details[0].date_of_birth!=null)
                        finalOutput = finalOutput + '<tr><td>Date of Birth:</td><td>'+responseData[0].details[0].date_of_birth+'</td></tr>'
                    if(responseData[0].details[0].country!=null)
                        finalOutput = finalOutput + '<tr><td>Country:</td><td>'+responseData[0].details[0].country+'</td></tr>'
                    if(responseData[0].details[0].state!=null)
                        finalOutput = finalOutput + '<tr><td>State:</td><td>'+responseData[0].details[0].state+'</td></tr>'
                    if(responseData[0].details[0].city!=null)
                        finalOutput = finalOutput + '<tr><td>City:</td><td>'+responseData[0].details[0].city+'</td></tr>'
                    if(responseData[0].details[0].home_land_line!=null)
                        finalOutput = finalOutput + '<tr><td>Phone Number:</td><td>'+responseData[0].details[0].home_land_line+'</td></tr>'
                
                    if(responseData[0].details[0].picture!=null){
                        $("div#imgContainer"+index+" img").attr("src",responseData[0].details[0].picture)
                    }  
                }
               
                $scope.pushDevices = responseData[0].pushDevices
                $scope.activityLogs = responseData[0].activityLogs
                $scope.userSessions = responseData[0].userSessions
                $scope.userProperties = responseData[0].userProperties
              
                $("#userDetailInfoTbl"+index+" tbody").empty().append(finalOutput)
                $timeout(function() {
                    $("#myModal"+index).modal('show')
                    if(responseData[0].activityLogs.length == 0){
                        $(".loadMoreLogsBtn").hide()
                        $(".noMoreBtnLogs").hide()
                    }else  if(responseData[0].activityLogs.length < 10){
                        $(".loadMoreLogsBtn").hide()
                        $(".noMoreBtnLogs").show() 
                    }else{
                        $(".loadMoreLogsBtn").show()
                        $(".noMoreBtnLogs").hide()   
                    }
                }, 500);
            }
        });  
    }
    $scope.loadMoreLogs = function(name) {
       
        $(".loadMoreLogsBtn").hide()
        $(".noMoreBtnLogs").hide()
        var strDate = moment().utc().subtract('days', 29).format('YYYY-MM-DD'),
        enDate = moment().utc().format('YYYY-MM-DD')
     
        $.ajax({
            type: "POST",
            async: false,
            data:"id="+eventReqSegmentation.id+"&name="+name+"&strDate="+strDate+"&enDate="+enDate+"&start="+$scope.activityLogs[0].time+"&end="+$scope.activityLogs[$scope.activityLogs.length - 1].time,
            url: '../event/getPagingResultsLogs',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                hideLoad()
                
                var responseData = eval(data.responseText);
                if(responseData[0].activityLogs.length < 10){
                    $(".loadMoreLogsBtn").hide()
                    $(".noMoreBtnLogs").show()
                }else{
                    $(".loadMoreLogsBtn").show()
                    $(".noMoreBtnLogs").hide()
                }
                responseData[0].activityLogs.forEach(function(obj,index ) {
                    $scope.activityLogs.push(obj)
                });
              
            }
        });  
    };
    $scope.resetAll = function() {
        console.log("in reset button")
        $("#showCount").hide()
        //$('#basicSegDateRange').prop('disabled', false);
       
        //        if(events.length == 0 || properties.length ==0){
        //            customAlert("alert-error","Nothing to reset!!")  
        //            return
        //        }
        $('#eventSegmentBox > tbody:last').empty().append(" <tr id=noEventsTr><td></td><td><span class=label>No Events Added Yet!</span></td><td></td></tr>");
        events.length = 0
        //        if(events.length == 1){
        //            $('#eventSegmentBox tr#'+events[0].name).remove()
        //            $('#eventSegmentBox > tbody:last').empty().append(" <tr id=noEventsTr><td></td><td><span class=label>No Events Added Yet!</span></td><td></td></tr>");
        //            events.length = 0
        //        }else if(events.length >= 2){
        //            $('#eventSegmentBox tr#'+events[0].name).remove()
        //            $('#eventSegmentBox tr#'+events[2].name).remove()
        //            $("table#eventSegmentBox tr[class*='operatorBox']").remove()  
        //            events.length = 0
        //        }
      
        //        if(properties.length == 1){
        //            $('#propertySegmentBox tr#'+properties[0].propertyName).remove()
        $('#propertySegmentBox > tbody:last').empty().append(" <tr id=noPropsTr><td></td><td><span class=label>No Properties Added Yet!</span></td><td></td></tr>");
        properties.length = 0
        properties.push({
            propertyName:"",
            propertyType:"",
            propertyValue:""  
        })
      
            
        $("#applyPropBtn").prop("disabled",true)
        eventReqSegmentation.setProperties(properties)
        eventReqSegmentation.setEvents(events)
        $('#eventSegmentation option:eq(0)').prop('selected', true);
        $scope.ddate = null
        $('#property').find('option:eq(0)').prop('selected', true);
        //        $('#sub-property').find('option:gt(0)').remove();
        //        $('#sub-property').find('option:eq(0)').prop('selected', true);
        $scope.subPropsArrOption = []
        $scope.subPropsArrOption.push("--Choose Value--")
        $scope.subProperty =  $scope.subPropsArrOption[0]
        $('#resData').hide()
        $('#resultButtonBox').hide()
        $('#buttonBox').hide()
        $("#bookmarkCount").hide()
        
    }  
    
    customSegScope = $scope
});


function getSubProperties(obj){
    var countries = {
        'AF' : 'Afghanistan',
        'AX' : 'Aland Islands',
        'AL' : 'Albania',
        'DZ' : 'Algeria',
        'AS' : 'American Samoa',
        'AD' : 'Andorra',
        'AO' : 'Angola',
        'AI' : 'Anguilla',
        'AQ' : 'Antarctica',
        'AG' : 'Antigua And Barbuda',
        'AR' : 'Argentina',
        'AM' : 'Armenia',
        'AW' : 'Aruba',
        'AU' : 'Australia',
        'AT' : 'Austria',
        'AZ' : 'Azerbaijan',
        'BS' : 'Bahamas',
        'BH' : 'Bahrain',
        'BD' : 'Bangladesh',
        'BB' : 'Barbados',
        'BY' : 'Belarus',
        'BE' : 'Belgium',
        'BZ' : 'Belize',
        'BJ' : 'Benin',
        'BM' : 'Bermuda',
        'BT' : 'Bhutan',
        'BO' : 'Bolivia',
        'BA' : 'Bosnia And Herzegovina',
        'BW' : 'Botswana',
        'BV' : 'Bouvet Island',
        'BR' : 'Brazil',
        'IO' : 'British Indian Ocean Territory',
        'BN' : 'Brunei Darussalam',
        'BG' : 'Bulgaria',
        'BF' : 'Burkina Faso',
        'BI' : 'Burundi',
        'KH' : 'Cambodia',
        'CM' : 'Cameroon',
        'CA' : 'Canada',
        'CV' : 'Cape Verde',
        'KY' : 'Cayman Islands',
        'CF' : 'Central African Republic',
        'TD' : 'Chad',
        'CL' : 'Chile',
        'CN' : 'China',
        'CX' : 'Christmas Island',
        'CC' : 'Cocos (Keeling) Islands',
        'CO' : 'Colombia',
        'KM' : 'Comoros',
        'CG' : 'Congo',
        'CD' : 'Congo, Democratic Republic',
        'CK' : 'Cook Islands',
        'CR' : 'Costa Rica',
        'CI' : 'Cote D\'Ivoire',
        'HR' : 'Croatia',
        'CU' : 'Cuba',
        'CY' : 'Cyprus',
        'CZ' : 'Czech Republic',
        'DK' : 'Denmark',
        'DJ' : 'Djibouti',
        'DM' : 'Dominica',
        'DO' : 'Dominican Republic',
        'EC' : 'Ecuador',
        'EG' : 'Egypt',
        'SV' : 'El Salvador',
        'GQ' : 'Equatorial Guinea',
        'ER' : 'Eritrea',
        'EE' : 'Estonia',
        'ET' : 'Ethiopia',
        'FK' : 'Falkland Islands (Malvinas)',
        'FO' : 'Faroe Islands',
        'FJ' : 'Fiji',
        'FI' : 'Finland',
        'FR' : 'France',
        'GF' : 'French Guiana',
        'PF' : 'French Polynesia',
        'TF' : 'French Southern Territories',
        'GA' : 'Gabon',
        'GM' : 'Gambia',
        'GE' : 'Georgia',
        'DE' : 'Germany',
        'GH' : 'Ghana',
        'GI' : 'Gibraltar',
        'GR' : 'Greece',
        'GL' : 'Greenland',
        'GD' : 'Grenada',
        'GP' : 'Guadeloupe',
        'GU' : 'Guam',
        'GT' : 'Guatemala',
        'GG' : 'Guernsey',
        'GN' : 'Guinea',
        'GW' : 'Guinea-Bissau',
        'GY' : 'Guyana',
        'HT' : 'Haiti',
        'HM' : 'Heard Island & Mcdonald Islands',
        'VA' : 'Holy See (Vatican City State)',
        'HN' : 'Honduras',
        'HK' : 'Hong Kong',
        'HU' : 'Hungary',
        'IS' : 'Iceland',
        'IN' : 'India',
        'ID' : 'Indonesia',
        'IR' : 'Iran, Islamic Republic Of',
        'IQ' : 'Iraq',
        'IE' : 'Ireland',
        'IM' : 'Isle Of Man',
        'IL' : 'Israel',
        'IT' : 'Italy',
        'JM' : 'Jamaica',
        'JP' : 'Japan',
        'JE' : 'Jersey',
        'JO' : 'Jordan',
        'KZ' : 'Kazakhstan',
        'KE' : 'Kenya',
        'KI' : 'Kiribati',
        'KR' : 'Korea',
        'KW' : 'Kuwait',
        'KG' : 'Kyrgyzstan',
        'LA' : 'Lao People\'s Democratic Republic',
        'LV' : 'Latvia',
        'LB' : 'Lebanon',
        'LS' : 'Lesotho',
        'LR' : 'Liberia',
        'LY' : 'Libyan Arab Jamahiriya',
        'LI' : 'Liechtenstein',
        'LT' : 'Lithuania',
        'LU' : 'Luxembourg',
        'MO' : 'Macao',
        'MK' : 'Macedonia',
        'MG' : 'Madagascar',
        'MW' : 'Malawi',
        'MY' : 'Malaysia',
        'MV' : 'Maldives',
        'ML' : 'Mali',
        'MT' : 'Malta',
        'MH' : 'Marshall Islands',
        'MQ' : 'Martinique',
        'MR' : 'Mauritania',
        'MU' : 'Mauritius',
        'YT' : 'Mayotte',
        'MX' : 'Mexico',
        'FM' : 'Micronesia, Federated States Of',
        'MD' : 'Moldova',
        'MC' : 'Monaco',
        'MN' : 'Mongolia',
        'ME' : 'Montenegro',
        'MS' : 'Montserrat',
        'MA' : 'Morocco',
        'MZ' : 'Mozambique',
        'MM' : 'Myanmar',
        'NA' : 'Namibia',
        'NR' : 'Nauru',
        'NP' : 'Nepal',
        'NL' : 'Netherlands',
        'AN' : 'Netherlands Antilles',
        'NC' : 'New Caledonia',
        'NZ' : 'New Zealand',
        'NI' : 'Nicaragua',
        'NE' : 'Niger',
        'NG' : 'Nigeria',
        'NU' : 'Niue',
        'NF' : 'Norfolk Island',
        'MP' : 'Northern Mariana Islands',
        'NO' : 'Norway',
        'OM' : 'Oman',
        'PK' : 'Pakistan',
        'PW' : 'Palau',
        'PS' : 'Palestinian Territory, Occupied',
        'PA' : 'Panama',
        'PG' : 'Papua New Guinea',
        'PY' : 'Paraguay',
        'PE' : 'Peru',
        'PH' : 'Philippines',
        'PN' : 'Pitcairn',
        'PL' : 'Poland',
        'PT' : 'Portugal',
        'PR' : 'Puerto Rico',
        'QA' : 'Qatar',
        'RE' : 'Reunion',
        'RO' : 'Romania',
        'RU' : 'Russian Federation',
        'RW' : 'Rwanda',
        'BL' : 'Saint Barthelemy',
        'SH' : 'Saint Helena',
        'KN' : 'Saint Kitts And Nevis',
        'LC' : 'Saint Lucia',
        'MF' : 'Saint Martin',
        'PM' : 'Saint Pierre And Miquelon',
        'VC' : 'Saint Vincent And Grenadines',
        'WS' : 'Samoa',
        'SM' : 'San Marino',
        'ST' : 'Sao Tome And Principe',
        'SA' : 'Saudi Arabia',
        'SN' : 'Senegal',
        'RS' : 'Serbia',
        'SC' : 'Seychelles',
        'SL' : 'Sierra Leone',
        'SG' : 'Singapore',
        'SK' : 'Slovakia',
        'SI' : 'Slovenia',
        'SB' : 'Solomon Islands',
        'SO' : 'Somalia',
        'ZA' : 'South Africa',
        'GS' : 'South Georgia And Sandwich Isl.',
        'ES' : 'Spain',
        'LK' : 'Sri Lanka',
        'SD' : 'Sudan',
        'SR' : 'Suriname',
        'SJ' : 'Svalbard And Jan Mayen',
        'SZ' : 'Swaziland',
        'SE' : 'Sweden',
        'CH' : 'Switzerland',
        'SY' : 'Syrian Arab Republic',
        'TW' : 'Taiwan',
        'TJ' : 'Tajikistan',
        'TZ' : 'Tanzania',
        'TH' : 'Thailand',
        'TL' : 'Timor-Leste',
        'TG' : 'Togo',
        'TK' : 'Tokelau',
        'TO' : 'Tonga',
        'TT' : 'Trinidad And Tobago',
        'TN' : 'Tunisia',
        'TR' : 'Turkey',
        'TM' : 'Turkmenistan',
        'TC' : 'Turks And Caicos Islands',
        'TV' : 'Tuvalu',
        'UG' : 'Uganda',
        'UA' : 'Ukraine',
        'AE' : 'United Arab Emirates',
        'GB' : 'United Kingdom',
        'US' : 'United States',
        'UM' : 'United States Outlying Islands',
        'UY' : 'Uruguay',
        'UZ' : 'Uzbekistan',
        'VU' : 'Vanuatu',
        'VE' : 'Venezuela',
        'VN' : 'Viet Nam',
        'VG' : 'Virgin Islands, British',
        'VI' : 'Virgin Islands, U.S.',
        'WF' : 'Wallis And Futuna',
        'EH' : 'Western Sahara',
        'YE' : 'Yemen',
        'ZM' : 'Zambia',
        'ZW' : 'Zimbabwe'
    };
    console.log("In segmentation properties")
    showLoad()
    var url = '../event/getSubPropsSegmentation'
    $.getJSON(url, {
        "reqDATA":JSON.stringify(obj)
    }, function(data) {
        var responseData = eval(data)
        segmentationScopeInstance.subPropsArrOption = []
        segmentationScopeInstance.subPropsArrOption.push("--Choose Value--")
        if(responseData.length>0){
            for (var key in responseData) {
                     segmentationScopeInstance.subPropsArrOption.push(responseData[key].toString())
//                if (countries.hasOwnProperty(responseData[key])){
//                    segmentationScopeInstance.subPropsArrOption.push(responseData[key].toString())
//                    //segmentationScopeInstance.subPropsArrOption.push (countries[responseData[key]]);
//                }else{
//                    segmentationScopeInstance.subPropsArrOption.push(responseData[key].toString())
//                }
            }
            segmentationScopeInstance.subProperty = segmentationScopeInstance.subPropsArrOption[0]
        }else{
            segmentationScopeInstance.subProperty = segmentationScopeInstance.subPropsArrOption[0]
        }
        segmentationScopeInstance.$apply()
        hideLoad()
         
    });
}
function setOperator(id){
  
    var operatorVal = $("#operatorBox-"+id).val()
 
    $.each(events, function() {
        if (this.operator) {
            this.operator = operatorVal.toUpperCase()
        }
    });
   
    eventReqSegmentation.setEvents(events)
    var finalJson = JSON.stringify(eventReqSegmentation)
    $("#finalJson").html(finalJson)
    if(eventReqSegmentation.getProperties()[0].propertyName != ""){
        getSubProperties(eventReqSegmentation)  
    }
  
    
}
function destroy(id){
    $("table#eventSegmentBox tr#"+id).remove() 
    if(events.length == 1){
        events.length = 0
        $("#applyPropBtn").attr("disabled",true)
        $("#noEventsTr").show()
        $("table#eventSegmentBox tr[class*='operatorBox']").remove()   
    }else{
        var newEVal = $.grep(events, function(obj) {
            if(obj.name == id || obj.operator !=undefined){
                delete obj  
            }else{
                return obj 
            }
        });
        events.length = 0
        events = newEVal 
        $("table#eventSegmentBox tr[class*='operatorBox-']").remove()  

    }
   
    eventReqSegmentation.setEvents(events)
    var finalJson = JSON.stringify(eventReqSegmentation)
    $("#finalJson").html(finalJson)
    $("#buttonBox").hide()
    $("#resultButtonBox").hide()
    
    if(eventReqSegmentation.getProperties()[0].propertyName != ""){
        getSubProperties(eventReqSegmentation)  
    }
  
}
function destroyProperty(id){
    var newPVal = $.grep(properties, function(obj) {
        if(obj.propertyName == id)
            delete obj
        else
            return obj
    });
    properties.length = 0
    properties = newPVal 
    if(properties.length == 0){
        properties.push({
            propertyName : "",
            propertyType : "",
            propertyValue : ""
        })
    }
    eventReqSegmentation.setProperties(properties)
    var finalJson = JSON.stringify(eventReqSegmentation)
    $("#finalJson").html(finalJson)
    //eventReq.setProperties(properties)
    $("table#propertySegmentBox tr#"+id).remove() 
    $("#noPropsTr").show()
    $("#buttonBox").show()
    $("#resultButtonBox").hide()
    $("table#propertySegmentBox tr#operatorBox-Property").remove() 
    if(events.length == 1){
        $("table#propertySegmentBox tr.operatorBox-Property").remove()   
    }
    if(eventReqSegmentation.getProperties()[0].propertyName != ""){
        getSubProperties(eventReqSegmentation)  
    }
    
}
