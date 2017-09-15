/**
 * Shephertz Technologies
 * 
 * @author Jatin Chauhan
 * @date 19 Sep 2014
 * @version 1.0
 */

// segmentation Angular Controller
var advSegmentationScopeInstance
appHq.controller("advSegmentationController", function($scope, $rootScope,
		dataService, $timeout, $http, $location) {
	advSegmentationScopeInstance = $scope
	$("a.active").removeClass("active");
	$("#eventMenu").addClass("active");
	$("#segmentation_id").addClass("active");
	$("#noData").hide();
	$("#bookMarkedQueriesAdv").show();
	$("#triggerActionId").hide();
	var queriesOfInApp = dataService.getBookMarkedQueries1();
	console.log(queriesOfInApp.name)
	$scope.inAppSegment = queriesOfInApp.name;
	
	
	
	var queriesOfAdv = dataService.getBookMarkedQueriesAdv();
	mianControllersIns.queriesAdv = queriesOfAdv.name;
	 
	var queries = mianControllersIns.advanceQueries
    var queriesBasic = mianControllersIns.basicQueries
	
    $scope.$on('setSegmentation', function(event, args) {
    	$scope.segmentFirst = args.segment1
    	$scope.segmentSecond = args.segment2
    	$scope.operator = args.operator
    	$('#segmentFirstId').prop('disabled', true);
        $('#operatorId').prop('disabled', true);
        $('#segmentSecondId').prop('disabled', true);
        
        $("#submit").hide();
	   $('#triggerActionId').show();
    });
    
   $scope.operator = "AND";

	 $scope.submitAdvQuery = function() {
		var segFirst = $scope.segmentFirst 
		var segSecond = $scope.segmentSecond 
		if(segFirst == undefined  ||segSecond == undefined){
			  customAlert("alert-error","Please select a segment!") 
              return; 
		}
		if(segFirst == segSecond){
			  customAlert("alert-error","Both segments are the same please choose one different!") 
            return; 
		}
    	$scope.bokkmarkQuueryName = ""
        $("#myModalBookmark").modal('show')
    }
	 
    $scope.resetAdvAll = function() {
    	$scope.segmentFirst= null;
    	$scope.segmentSecond= null;
    	$scope.operator = "AND";
    	
    	$("#submit").show();
	    $('#segmentFirstId').prop('disabled', false);
        $('#operatorId').prop('disabled', false);
        $('#segmentSecondId').prop('disabled', false);
        $('#triggerActionId').hide();
    }
    $scope.saveAdvSegmentationForm = function(flag) {
    	var name = "default"
        var url=''
        if(flag != "no"){
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
    	
    	url = '../event/fetchAdvUsersForApp'
    	 var eventsAdvSeg =[];
	       eventsAdvSeg.push({
				segment1:$scope.segmentFirst,
		    	operator:$scope.operator,
				segment2:$scope.segmentSecond  
			}) 	
        eventReqSegmentation.type ="ADV_SEGMENT"
        eventReqSegmentation.setEvents(eventsAdvSeg)	
        var finalJson = JSON.stringify(eventReqSegmentation)
       
        // For Message 
        pushRequestModel.setEvents(eventsAdvSeg);	
		emailRequestModel.setEvents(eventsAdvSeg);
		wallPostRequestModel.setEvents(eventsAdvSeg);	
		
         
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
             
                $('#segmentFirstId').prop('disabled', true);
                $('#operatorId').prop('disabled', true);
                $('#segmentSecondId').prop('disabled', true);
                $("#submit").hide();
                $("#triggerActionId").show();
                
                $scope.bookMarkedQueryAdv = responseData.name
               
               // Push enable because no need to response object
               $("#triggerActionId").prop("disabled", false);
               if(name!="default"){
            	   mianControllersIns.queriesAdv.push( responseData.name)  
            	   
                }
             }
        });
    }
    
    $scope.changeSegment = function(){
    	$location.path('advanceSegmentation')
    }
    
	
    
});