/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 19 Sep 2014
 * @version 1.0
 */

// segmentation Angular Controller
var advanceSegmentationScopeInstance
appHq.controller("advanceSegmentationController", function($scope, $rootScope,dataService,$timeout, $http,$location) {
    advanceSegmentationScopeInstance = $scope
    $("a.active").removeClass("active");
    $("#eventMenu").addClass("active");
    $("#segmentation_id").addClass("active");
    $("#noData").hide(); 
    $("#bookMarkedQueries").show(); 
    //    set up for tour
    $scope.helpMsgArray = getAllTourTipMessage("ADVANCESEGMENTATION")
    $scope.changeSegment = function(){
    	$location.path('advSegmentation')
    }
    
    $scope.getPropertiesforEvents = function(){
    	console.log("called..")
    	showLoad()
    	$http({
                method: "post",
                params: {
                    "appId":eventReq.getId(),
                    "events":$scope.eventAdvanceSegmentation
                },
                url: '../event/getPropertiesforEvents'
            }).success(function(data, status) {
            	console.log(data)
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
            $scope.isPluginLoad = "false"
            var prevRes = $.cookie("ADVANCESEGMENTATION")
            if(prevRes == "ok"){
                    
            }else{
                dhtmlx.confirm({
                    type:"confirm",
                    ok:"Yes",
                    cancel:"No",
                    text:"Do not display this message again ?",
                    callback: function(res) {
                        if(res){
                            $.cookie("ADVANCESEGMENTATION", "ok",{
                            expires: 365 * 10
                        });
                        }else{
                            $.removeCookie("ADVANCESEGMENTATION");  
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
                var res = $.cookie("ADVANCESEGMENTATION")
            
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
    var queries = mianControllersIns.advanceQueries
    var queriesBasic = mianControllersIns.basicQueries
    mianControllersIns.queries = queries 
    
    //$scope.ddate = null
    $scope.activityLogs = []
   
    
    var range = $('#advanceDateRange');
    $scope.eventAdvanceStart = moment().subtract('days', 6).format('YYYY-MM-DD')
    $scope.eventAdvanceEnd = moment().format('YYYY-MM-DD')
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
    	var startD =$("#advanceDateRange").data('daterangepicker').startDate.format('YYYY-MM-DD')
        var endD =$("#advanceDateRange").data('daterangepicker').endDate.format('YYYY-MM-DD')
        $scope.eventAdvanceStart = startD
        $scope.eventAdvanceEnd = endD
    });
    
    $scope.applyAdvanceEvents = function() {
    	if(events.length > 1){
            customAlert("alert-error","Only two event is allowed!")
            return  
        }else if(!$scope.eventAdvanceSegmentation){
            customAlert("alert-error","Please choose an event!")
            return
        }
        
        var eventAdvanceStart = $scope.eventAdvanceStart
    	var eventAdvanceEnd =  $scope.eventAdvanceEnd
        var eveSegValue = $scope.eventAdvanceSegmentation.replace(/ /g,'')
        if(events.length<=1){
            var eventLength = $("table#eventAdvanceSegmentBox tr#"+eveSegValue).length
            if(eventLength < 1){
                var finalOutput =""
                if(events.length == 0){
                    $("#applyPropBtn").attr("disabled",false)
                    finalOutput = '<tr id="'+eveSegValue+'" ><td>'+$scope.eventAdvanceSegmentation+'</td><td align=center>'+eventAdvanceStart+' <span class="too">To</span> '+eventAdvanceEnd+'</td><td><button type="button" id="deleteEvent'+eveSegValue+'" onclick=advanceDestroy(\''+eveSegValue+'\')  class="btn btn-danger">X</button></td></tr>'
                    events.push({
                        name: $scope.eventAdvanceSegmentation, 
                        start:eventAdvanceStart,
                        end:eventAdvanceEnd
                    });
                }else{
                	/*comment due to no need of operator */
                    var operatorBox = '<tr class=operatorBox-'+eveSegValue+'><td>Operator:</td><td><select id=operatorBox-'+eveSegValue+'  onchange=setOperator(\''+eveSegValue+'\')><option  value="and">AND</option><option value="or">OR</option><option   value="notin">NOT</option></select></td><td></td></tr>'
                	//var operatorBox = '<tr class=operatorBox-'+eveSegValue+'><td></td><td><span class="label label-info larginLeftM">AND</span></td></tr>'
                	finalOutput = operatorBox+'<tr  id="'+eveSegValue+'"><td>'+eveSegValue+'</td><td>'+eventAdvanceStart+' <span class="too">To</span> '+eventAdvanceEnd+'</td><td><button type="button" id="deleteEventAdvance'+eveSegValue+'" onclick=advanceDestroy(\''+eveSegValue+'\') class="btn   btn-danger">X</button></td></tr>'                 
                 events.push({
                 operator: "AND"
                 });
                 events.push({
                 name: eveSegValue,
                 start:eventAdvanceStart,
                 end:eventAdvanceEnd
                 });
                                        
                 }
                eventReqSegmentation.type ="ADVANCE"
                eventReqSegmentation.setEvents(events)
                var finalJson = JSON.stringify(eventReqSegmentation)
                $("#finalJson").html(finalJson)
                $("#noEventsTr").hide()
                $scope.eventAdvanceSegmentation = ""
                //$scope.ddate = null
                $('#eventAdvanceSegmentBox > tbody:last').append(finalOutput); 
                $("#buttonBox").show()
                if(eventReqSegmentation.getProperties()[0].propertyName != ""){
                    getAdvanceSubProperties(eventReqSegmentation)  
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
        var newReqObj = {                                    
            "id":eventReqSegmentation.id,
            "events" : events,
            "properties" : [{
                propertyName: selectedProp, 
                propertyType:  selectedPropType,
                propertyValue:  ""
            }]
        }
        //        eventReqSegmentation.getProperties()[0].propertyName = selectedProp
        //        eventReqSegmentation.getProperties()[0].propertyType = selectedPropType
       
        getAdvanceSubProperties(newReqObj);
      
    };
    $scope.applyAdvanceProps = function() {
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
                var finalOutput ='<tr id="'+selectedProp+'" ><td>'+$scope.property+'</td><td>'+selectedSubProp+'</td><td><button type="button" id="deleteProp'+selectedProp+'" onclick=destroyAdvanceProperty(\''+selectedProp+'\')  class="btn btn-danger">X</button></td></tr>'
        
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
               
                eventReqSegmentation.setProperties(properties)
               
                $("#noPropsTr").hide()
                $('#propertySegmentBox > tbody:last').append(finalOutput); 
                var finalJson = JSON.stringify(eventReqSegmentation)
                $("#finalJson").html(finalJson)
                $scope.property = ""
                $scope.subPropsArrOption = []
                $scope.subPropsArrOption.push("--Choose Value--")
                $scope.subProperty =  $scope.subPropsArrOption[0]
            //                $('select#sub-property').empty().append('<option value="" selected>--Choose Properties--</option>')
            //                $scope.subProperty = ""
             
            // if(eventReqSegmentation.getProperties()[0].propertyName != ""){
            // getAdvanceSubProperties()
            // }
            }else{
                customAlert("alert-error","Property already added!")   
            }
        }else{
            customAlert("alert-error","You can add atmost 1 property!")  
        }
        
    };
    $scope.submitAdvanceQuery = function() {
    	 if(events.length == 0){
            customAlert("alert-error","Event is mandatory!")  
            return
        }
    	 if(events.length != 3){
             customAlert("alert-error","You must add two events in advanced segmentation!")  
             return
         }
    	$scope.bokkmarkQuueryName = ""
        $("#myModalBookmark").modal('show')
    }
    
    $scope.saveAdvanceSegmentationForm = function(flag) {
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
            for(key in queriesBasic){
                if(queriesBasic[key].name == name){
                    flag2 =  true 
                    break;
                }
            }
            if(flag2){
                customAlert("alert-error","Segmentation with this name already exists.") 
                return;
            }
        }
    	
    	url = '../event/getAdvanceUsersForApp'
    		
        $("#resData").hide()
        var finalJson = JSON.stringify(eventReqSegmentation)
        
        pushRequestModel.setEvents(eventReqSegmentation.getEvents());
        // Set Properties
        pushRequestModel.setProperties(eventReqSegmentation.getProperties());
        emailRequestModel.setEvents(eventReqSegmentation.getEvents());
        wallPostRequestModel.setEvents(eventReqSegmentation.getEvents());
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
             
                $scope.property = ""
                $scope.subPropsArrOption = []
                $scope.subPropsArrOption.push("--Choose Value--")
                $scope.subProperty =  $scope.subPropsArrOption[0]
                $('#eventAdvanceSegmentation').prop('disabled', true);
                $('#addAdvanceEventToBox').prop('disabled', true);
                $('#property').prop('disabled', true); 
                $('#sub-property').prop('disabled', true); 
                $("#applyPropBtn").prop("disabled",true)
               
                $("#deleteEvent"+eventReqSegmentation.getEvents()[0].name.replace(/ /g,'')).prop("disabled",true)
                $("#deleteEvent"+eventReqSegmentation.getEvents()[2].name.replace(/ /g,'')).prop("disabled",true)
                if(events.length >1){
                 $("#deleteEventAdvance"+eventReqSegmentation.getEvents()[2].name).prop("disabled",true)
                }
                $("#deleteProp"+eventReqSegmentation.getProperties()[0].propertyName).prop("disabled",true)
                $("#operatorBox-"+eventReqSegmentation.getEvents()[2].name).prop("disabled",true)
                
                $scope.bookMarkedQuery = responseData[0].queryObj[0]
                $scope.segQuery = responseData[0].queryObj[0]
               
               // Push enable because no need to response object
               $("#triggerActionId").prop("disabled", false);
               
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
             }
        });
    }
    $scope.createAdvanceNewQuery = function(){
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
        $('#eventAdvanceSegmentBox > tbody:last').empty().append(" <tr id=noEventsTr><td colspan='3' class='noEvnt'>No Events Added Yet!</td></tr>");
        $('#eventAdvanceSegmentation').prop('disabled', false);
        $('#eventAdvanceSegmentation option:eq(0)').prop('selected', true);
       // $scope.ddate = null
        $('#addAdvanceEventToBox').show() 
        $('#addAdvanceEventToBox').prop('disabled', false);
        $('#property').prop('disabled', false); 
        $('#sub-property').prop('disabled', false); 
        $("#applyPropBtn").prop("disabled",true)
        $('#propertySegmentBox > tbody:last').empty().append(" <tr id=noPropsTr><td colspan='3' class='noEvnt'>No Properties Added Yet!</td></tr>");
        //$("#showErrorBox").hide()
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
                $('#eventAdvanceSegmentBox > tbody:last').empty().append("<tr id=noEventsTr><td colspan='3' class='noEvnt'>No Events Added Yet!</td></tr>");
                $('#propertySegmentBox > tbody:last').empty().append("<tr id=noPropsTr><td colspan='3' class='noEvnt'>No Properties Added Yet!</td></tr>");
                //                $('#eventAdvanceSegmentation').prop('disabled', true);
                $('#addAdvanceEventToBox').prop('disabled', false);
                $('#property').prop('disabled', false); 
                $('#sub-property').prop('disabled', false); 
                $("#applyPropBtn").prop("disabled",true)
                $('#eventAdvanceSegmentation').prop('disabled', false);
                $('#addAdvanceEventToBox').show() 
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
      
        $http({
            method: "post",
            params: {
                // queryName:queryName,
                start:$scope.items[0],
                end:$scope.items[$scope.items.length - 1],
                data:finalJson
            },
            url: '../event/getPagingResults'
        }).success(function(data, status) {
            for (var i = 0; i < data.length; i++) {
                $scope.items.push(data[i]);
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
      
    $scope.resetAdvanceAll = function() {
   
        //        if(events.length == 0 || properties.length ==0){
        //            customAlert("alert-error","Nothing to reset!!")  
        //            return
        //        }
        $('#eventAdvanceSegmentBox > tbody:last').empty().append(" <tr id=noEventsTr><td colspan='3' class='noEvnt'>No Events Added Yet!</td></tr>");
        events.length = 0
        //        if(events.length == 1){
        //            $('#eventAdvanceSegmentBox tr#'+events[0].name).remove()
        //            $('#eventAdvanceSegmentBox > tbody:last').empty().append(" <tr id=noEventsTr><td colspan='3' class='noEvnt'>No Events Added Yet!</td></tr>");
        //            events.length = 0
        //        }else if(events.length >= 2){
        //            $('#eventAdvanceSegmentBox tr#'+events[0].name).remove()
        //            $('#eventAdvanceSegmentBox tr#'+events[2].name).remove()
        //            $("table#eventAdvanceSegmentBox tr[class*='operatorBox']").remove()  
        //            events.length = 0
        //        }
      
        //        if(properties.length == 1){
        //            $('#propertySegmentBox tr#'+properties[0].propertyName).remove()
        $('#propertySegmentBox > tbody:last').empty().append(" <tr id=noPropsTr><td colspan='3' class='noEvnt'>No Properties Added Yet!</td></tr>");
        properties.length = 0
        properties.push({
            propertyName:"",
            propertyType:"",
            propertyValue:""  
        })
      
            
        $("#applyPropBtn").prop("disabled",true)
        eventReqSegmentation.setProperties(properties)
        eventReqSegmentation.setEvents(events)
        $('#eventAdvanceSegmentation option:eq(0)').prop('selected', true);
        //$scope.ddate = null
        $('#property').find('option:eq(0)').prop('selected', true);
        //        $('#sub-property').find('option:gt(0)').remove();
        //        $('#sub-property').find('option:eq(0)').prop('selected', true);
        $scope.subPropsArrOption = []
        $scope.subPropsArrOption.push("--Choose Value--")
        $scope.subProperty =  $scope.subPropsArrOption[0]
        $('#resData').hide()
        $('#resultButtonBox').hide()
        $('#buttonBox').hide()
        
    }  
    
    customSegScope = $scope
});


function getAdvanceSubProperties(obj){
    showLoad()
    var url = '../event/getAdvanceSubPropsSegmentation'
    $.getJSON(url, {
        "reqDATA":JSON.stringify(obj)
    }, function(data) {
        var responseData = eval(data)
        advanceSegmentationScopeInstance.subPropsArrOption = []
        advanceSegmentationScopeInstance.subPropsArrOption.push("--Choose Value--")
        if(responseData.length>0){
            for (var key in responseData) {
                advanceSegmentationScopeInstance.subPropsArrOption.push(responseData[key].toString())
            }
            advanceSegmentationScopeInstance.subProperty = advanceSegmentationScopeInstance.subPropsArrOption[0]
        }else{
            advanceSegmentationScopeInstance.subProperty = advanceSegmentationScopeInstance.subPropsArrOption[0]
        }
        advanceSegmentationScopeInstance.$apply()
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
        getAdvanceSubProperties(eventReqSegmentation)  
    }
  
    
}
function advanceDestroy(id){
	$("table#eventAdvanceSegmentBox tr#"+id).remove() 
	if(events.length == 1){
        events.length = 0
        $("#applyPropBtn").attr("disabled",true)
        $("#noEventsTr").show()
        $("table#eventAdvanceSegmentBox tr[class*='operatorBox']").remove()   
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
        $("table#eventAdvanceSegmentBox tr[class*='operatorBox-']").remove()  

    }
   
    eventReqSegmentation.setEvents(events)
    var finalJson = JSON.stringify(eventReqSegmentation)
    $("#finalJson").html(finalJson)
    
	   if( events.length == 0){
		   $("#buttonBox").hide()
		    $("#resultButtonBox").hide() 
	   }

    if(eventReqSegmentation.getProperties()[0].propertyName != ""){
        getAdvanceSubProperties(eventReqSegmentation)  
    }
  
}
function destroyAdvanceProperty(id){
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
        getAdvanceSubProperties(eventReqSegmentation)  
    }
    
}
