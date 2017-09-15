/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var campaignScope
var emailDataConfiguration = null
var pushDataConfiguration = null
var fbDataConfiguration = null

appHq.controller("surveyController", function($scope, $rootScope, $http,dataService,$parse,$location,$routeParams) {
    $scope.answers = [];
    $scope.questionType = "radioButton"
    $scope.questions = [{
        text:"",
        value:"Q1"
    }];
    
    
    if($scope.campaignObj != undefined && $scope.campaignObj.layoutJson != undefined){
        var layoutJson = JSON.parse($scope.campaignObj.layoutJson).content
        if(layoutJson !=undefined){
            layoutJson = JSON.parse(layoutJson)
            $scope.user = layoutJson
            $scope.questions = layoutJson.questions
            $scope.answers = $scope.questions[0].answers
            $scope.questionType = $scope.questions[0].type
            $scope.title = layoutJson.title
        }
        
    }
    
    $scope.addFormField = function() {
        $("#error_empty_answer").hide();
        $("#displayAnswer").show();
        if($scope.answers.length < 5){
            $scope.answers.push({
                text:""
            })  
            $("#error_maxQuestion").hide();
        }
        else{
            $("#error_maxQuestion").show();
    
        }
    }
    
    $scope.values = ["A","B","C","D","E"]
    
    $scope.submit =  function(){
        $scope.user = {
            title:$scope.title,
            questions:$scope.questions
        }
        var values = ["A","B","C","D","E"];
        for(i=0;i<1;i++)  
        {
            var answer =$scope.answers;
            for(j=0;j<answer.length;j++)
            {
                answer[j].value = values[j];
            }
        }
        $scope.questions[0].answers = $scope.answers
        $scope.questions[0].type = $scope.questionType
        $http({
            method: "post",
            params: {
                layoutTypeSurvey:"Survey",
                data:$scope.user,
                "app":eventReq.id,
                cName:$("#name").val()?$("#name").val():$scope.campaignObj.name
            },
            url: '../event/saveCampaignLayoutAction'
        }).success(function(data, status) {
            hideLoad()
            $location.path('/allCamp');
            return
        }).error(function(data, status) {
            hideLoad()
        });
    }
})

appHq.controller("addCampaignController", function($scope, $compile, $rootScope, $http,dataService,$parse,$location,$routeParams) {
    $scope.activateView = function(ele) {
        $compile(ele.contents())($scope);
        if(!$scope.$$phase)
            $scope.$apply();
    };
    $("a.active").removeClass("active");
    $("#campaignsMenu").addClass("active");
    $("#createCamp").addClass('active')
    campaignScope = $scope
    var ddate = moment($scope.ddate1).format('YYYY-MM-DD')
    var diffrenceFromNow = moment().diff(ddate,'days')
    $scope.enablePushTraking =false
    $scope.geofencing =false
    $scope.enablePushTrackingEvent =function(){
    //console.log($scope.enablePushTraking)
    }
    $scope.geofencingOnchanges =function(){
        console.log($scope.geofencing)
        var isGeofencing = $("#geofencingId").is(':checked')
        console.log(isGeofencing)
        if(isGeofencing){
            console.log("Geofencing show")
            $("#geofencingPushMapId").show()
            $scope.setGeoPushLocation = function(widget,map){
                console.log(widget)
                $scope.latitude = widget.get('position').lat();
                $scope.longitude = widget.get('position').lng();
                $scope.distance = widget.get('distance');
                $("#pac-input-event").show()
                if(!$scope.$$phase) {
                    $scope.$apply()
                }
            }
            initGeoPush();
        }else{
            console.log("Geofencing hide")
            $("#geofencingPushMapId").hide()
        }
    }
    
    //    $scope.showTourForWizard = function(){
    //        console.log($scope.helpMsgArray)
    //        $scope.CompletedEvent = function (scope) {
    //            console.log("Completed Event called");
    //        };
    //
    //        $scope.ExitEvent = function (scope) {
    //            console.log("Exit Event called");
    //        };
    //
    //        $scope.ChangeEvent = function (targetElement, scope) {
    //            console.log("Change Event called");
    //            console.log(targetElement);  //The target element
    //            console.log(this);  //The IntroJS object
    //        };
    //
    //        $scope.BeforeChangeEvent = function (targetElement, scope) {
    //            console.log("Before Change Event called");
    //            console.log($scope.helpMsgArray)
    //            console.log(targetElement);
    //        };
    //
    //        $scope.AfterChangeEvent = function (targetElement, scope) {
    //            console.log("After Change Event called");
    //            console.log(targetElement);
    //        };
    //
    //        $scope.IntroOptions = {
    //            steps:$scope.helpMsgArray,
    //            showStepNumbers: false,
    //            exitOnOverlayClick: true,
    //            exitOnEsc:true,
    //            nextLabel: '<strong>NEXT!</strong>',
    //            prevLabel: '<span style="color:green">Previous</span>',
    //            skipLabel: 'Exit',
    //            doneLabel: 'Thanks'
    //        };
    //
    //        $scope.ShouldAutoStart = function() {
    //            return true;
    //        }  
    //    }
    //    //    set up for tour
    //    $scope.helpMsgListArray = getAllTourTipMessage("ADDCAMPAIGN")
    //    $scope.helpMsgArray = $scope.helpMsgListArray[0]
    //    $scope.showTourForWizard()
    //----------------------//
    campaignListByApp = dataService.getCampaignByApp()
    $scope.campaignList= campaignListByApp.names
    var totalEvents = dataService.getTotalEvents()
    $scope.totalEvents = totalEvents 
    var queries1 = dataService.getBookMarkedQueries1()
    $scope.inAppSegment = queries1.name 
    var campaignId = $routeParams.id;
    
    if(campaignId != undefined){
        $("#isEdit").val("true")
        $("#idCamp").val(campaignId)
        $("#frequencyP").show()
        $scope.campaignId = campaignId
        var campaignInstance = dataService.getCampaignByAppAndCampaignId()
        if(campaignInstance.response=="false"){
            $location.path('/allCamp');
            return
        // $scope.$apply()
        }
        $scope.campaignObj = campaignInstance.campaign
        console.log($scope.campaignObj)
        $scope.campaignType = $scope.campaignObj.campaignType
        $("#name").val($scope.campaignObj.name)
        $('#name').attr('readonly', true);
        $scope.ddate1 = $scope.campaignObj.startDate
        $scope.ddate2 = $scope.campaignObj.endDate
        //        if($scope.campaignObj.maxUser){
        //            $("#maxUser").val($scope.campaignObj.maxUser)   
        //        
        if($scope.campaignObj.frequency == "Once"){
            $("#onceId").show()
        // $("#frequencyP").hide()
        }else{
            $("#onceId").hide()
        // $("#frequencyP").show()
        }
        if($scope.campaignType == "Push"){
            var layoutJsonObj = JSON.parse(campaignScope.campaignObj.layoutJson)
            $("#enablePushTrakingId").show()
            $("#geofencingDivId").show()
            if(layoutJsonObj.message != undefined && layoutJsonObj.message._App42CampaignName){
                $scope.master= true
            }else{
                $scope.master= false
            }
            if(layoutJsonObj.message != undefined && layoutJsonObj.message._App42GeoCampaign){
                console.log("masterGeo true")
                $scope.geofencing= true
                // This for Reload Geo Map 
                $("#geofencingPushMapId").show()
                $scope.setGeoPushLocation = function(widget,map){
                    $scope.latitude = widget.get('position').lat();
                    $scope.longitude = widget.get('position').lng();
                    $scope.distance = widget.get('distance');
                    $("#pac-input-event").show()
                    if(!$scope.$$phase) {
                        $scope.$apply()
                    }
                    //		        var lngt = new google.maps.LatLng($scope.latitude,$scope.longitude)
                    //	   	    	var bounds = new google.maps.LatLngBounds(lngt);
                    //		        map.fitBounds(bounds);
                    //	   	        map.setZoom(8);
                    //	   	        widget.set('map', map);
                    //	   	        widget.set('position', map.getCenter());
                    console.log(widget)
                //google.maps.event.trigger(map, 'resize');
                }
        		
                initGeoPush();
            }else{
                console.log("masterGeo false")
                $scope.geofencing= false
            }
            $("#frequencyP").hide()
            $("#onceId").show()
        }else{
            $("#frequencyP").show()
            $("#onceId").hide()
        }
        $('input[name=frequency][value= '+$scope.campaignObj.frequency+']').prop("checked",true)
        if($scope.campaignObj.priority){
            $("#priority").val($scope.campaignObj.priority)   
        }
        if($scope.campaignObj.description){
            $("#description").val($scope.campaignObj.description)   
        }
        $("#frequencyPeriod").val($scope.campaignObj.frequencyPeriod)
        $("#campType").hide()
        $("#campTypeEdit").show()
        if($scope.campaignObj.campaignType == "InApp"){
            $("#campTypeEdit").html('<b>In-App</b>')	
        }else if($scope.campaignObj.campaignType == "Survey"){
            $("#campTypeEdit").html('<b>Survey</b>')
        }else if($scope.campaignObj.campaignType == "Email"){
            $("#campTypeEdit").html('<b>Email</b>')
            $("#onceId").show()
            $("#frequencyPeriod").val($scope.campaignObj.frequency)
        }
        else{
            $("#campTypeEdit").html('<b>Push</b>')
            
        }
        
    }
    $scope.call = function(){
        $('.example-advanced-form').steps('remove', Number("2"))
    }
    $scope.callEmail = function(){
        $('.example-advanced-form').steps('remove', Number("2"))
        console.log("In Call email ")
        $("#frequencyP").hide()
    }
    $scope.callSurvey = function(){
        surveyInit()
    }
    $scope.callInApp = function(){
        console.log("Call in App")
        inAppInit()
    }
    $scope.redirectPath = function(){
        $location.path('/allCamp');
        $scope.$apply()
    }
    $scope.setEventsAndSegmentation = function(output){
        $scope.eventCampaign = output
        
        var result = $.grep($scope.inAppSegment, function(e){
            if(e == $scope.campaignObj.segmentation){
                return e
            }
        });
       
        $scope.segmentationQ = result[0]
        $scope.$apply()
    }
    $scope.setSegmentation1 = function(out){
        var result = $.grep($scope.inAppSegment, function(e){
            if(e == out){
                return e
            }
        });
       
        $scope.segmentationQ = result[0]
        $scope.$apply()
    }
    $scope.setSegmentation2 = function(out){
        var result = $.grep($scope.inAppSegment, function(e){
            if(e == out){
                return e
            }
        });
       
        $scope.segmentationQ2 = result[0]
        $scope.$apply()
    }
    $scope.attachScopeData = function(){
        $.grep($scope.inAppSegment, function(e){
            $scope.inAppSegment.push(e)
        });
        $scope.$apply()
        console.log($scope.inAppSegment)
    }
    $scope.openOthercampaignTypeForm = function(){
        var isEdit =  $("#isEdit").val()
        if(isEdit == "true"){
            var campaignType = campaignScope.campaignObj.campaignType 
            var layoutJson = JSON.parse(campaignScope.campaignObj.layoutJson)
        }else{
            var campaignType = $('input[name=campaignType]:checked').val()
        }
        
        $("#triggerAction_modalForEvent").show();
        $("#triggerAction_modalForEvent").modal('show');
        $("#redirectFrom").val("campaign")
        $("#pushFromDivId").hide();
        $("#emailFromDivId").hide();
        $("#emailFromBasic").hide();
        $("#wallPostFromDivId").hide();
        $("#ScheduleFieldPush").hide()
        $("#ScheduleFieldFb").hide()
        $("#ScheduleFieldEmail").hide()
        if(campaignType == "Email"){
            $("#emailFromDivId").show();
            $("#emailFromBasic").hide();
            $("#propertyName").val("Email");
            $scope.emailTabs = [
            {
                "title": "Email", 
                "active": true
            }];
            if(isEdit != "true"){
                $scope.sendEmailForm()
            }
            $scope.$emit('tabChange',$scope.emailTabs);
        }else if(campaignType == "Push"){
            $("#pushFromDivId").show();
            $("#emailFromBasic").hide();
            if(isEdit != "true"){
                $scope.openPushForm()
            }
            $scope.pushTabs = [
            {
                "title": "Push Notification", 
                "active": true
            }];
            $scope.$emit('tabChange',$scope.pushTabs);
        }else if(campaignType == "FaceBook"){
            $("#emailFromBasic").hide();
            $("#wallPostFromDivId").show();
            if(isEdit != "true"){
                $scope.wallPostForm()
            }
            $scope.fbTabs = [
            {
                "title": "Facebook Wall Post", 
                "active": true
            }];
            $scope.$emit('tabChange',$scope.fbTabs);
        }
        
        
    }
    $scope.setEmailConfiguration = function(emailObj){
        var result = $.grep($scope.emails, function(e){
            if(e.name == emailObj.sendFrom){
                return e
            }
        });
        if(emailObj.userBase == "true"){
            $('#selDiv option:eq(0)').prop('selected', true)
        }else{
            $('#selDiv option:eq(1)').prop('selected', true)
        }
        $("#subjectId").val(emailObj.subject)
        $("#contentId").val(emailObj.content)
        
    }
    $scope.setPushConfiguration = function(pushObj){
        $scope.$emit('setPushConfiguration',pushObj);
    }
//   $scope.setFbConfiguration = function(fbObj){
//       $scope.$emit('setFbConfiguration',fbObj);
//   }
});
    
appHq.controller("allCampaignController", function($scope, $rootScope, $timeout, $http,dataService,$parse,$location,$route,$templateCache) {
    var itemsPerPage = 10
    var offset = 0
    $scope.hasMore = false;
    $scope.noMore = false;
    $scope.campaignList = []
    $("a.active").removeClass("active");
    $("#campaignsMenu").addClass("active");
    $("#viewCamp").addClass('active')
    var result = dataService.getCampaignByApp()
    console.log("Result is" + " " + JSON.stringify(result))
    $scope.campaignList= result.campaignList
    
    if($scope.campaignList.length < itemsPerPage){
        $scope.hasMore = false;
        $scope.noMore = false;
    }else{
        $scope.hasMore = true;
        $scope.noMore = false;
        
    }
    $scope.newOffsetVal = itemsPerPage
    $scope.loadMore = function() {
        showLoad()
        var newValue =  $scope.campaignList.length
        if(newValue <= offset){
            return
        }
        offset = $scope.newOffsetVal
        $http({
            method: "post",
            params: {
                appId:eventReq.id,
                offset:offset
            },
            url: '../event/getCampaignByApp'
        }).success(function(data, status) {
            if(data.campaignList.length != 0){
                for (var i = 0; i < data.campaignList.length; i++) {
                    $scope.campaignList.push(data.campaignList[i]);
                } 
                $scope.newOffsetVal = $scope.newOffsetVal + itemsPerPage;
            }
            if(data.campaignList.length < itemsPerPage){
                $scope.hasMore = false;
                $scope.noMore = true;
            }
            hideLoad()
        }).error(function(data, status) {
            // Some error occurred
            hideLoad()
        });
    
    };
    
    $scope.removeItem = function(item,id){
        dhtmlx.confirm({
            type:"Remove Campaign",
            text:"Do you want to delete campaign?",
            callback: function(value) {
                console.log("value is" +value)
                if(value){
                    startLoad()
                    $http({
                        method: "get",
                        params: {
                            "app":eventReq.id,
                            "campaignId":id
                        },
                        url: '../event/deleteCampaign'
                    }).success(function(data, status) {
                        stopLoad()
                        if(data == "true"){
                            //var index = $scope.campaignList.indexOf(item)
                            //$scope.campaignList.splice(index, 1);
                            if($scope.campaignList.length == 0 ){
                                $scope.hasMore = false;
                                $scope.noMore = false;
                            }
                            var currentPageTemplate = $route.current.templateUrl;
                            $templateCache.remove(currentPageTemplate);

                            $route.reload();

                        }else{

                        }

                    }).error(function(data, status) {
                        if (status === 401) {
                            $("#error_modal").modal('show')
                        }
                        stopLoad()
                    });
                }

            }
        });

    }

    $scope.toggleCheckBox = function($event,id,st){
        var t = $($event.currentTarget).hasClass('on')
        if(t == true){
            return;
        }
        startLoad()
        
        $http({
            method: "get",
            params: {
                "app":eventReq.id,
                "campaignId":id,
                "status":st
            },
            url: '../event/updateCampaignStatus'
        }).success(function(data, status) {
            stopLoad()
            
            if(st == "ENABLE"){
                $($event.currentTarget).addClass('on')
                $($event.currentTarget).prev().removeClass('on')  
            }else{
                $($event.currentTarget).addClass('on')
                $($event.currentTarget).next().removeClass('on')   
            }
            
            
        }).error(function(data, status) {
            if (status === 401) {
                $("#error_modal").modal('show')
            }
            stopLoad()
        });
    }
   
});
    
function startLoad(){
    jQuery('.containerDiv').showLoading(
    {
        'addClass': 'loading-indicator-bars'
    }
    );  
}
function stopLoad(){
    jQuery('.containerDiv').hideLoading();
}


appHq.controller("eventSettingController", function($scope, $rootScope, $timeout, $http,dataService,$parse,$location,$route,$templateCache) {
    $("#bookMarkedQueries1").hide();
   
    $scope.events = []
    //startLoad()
    $http({
        method: "post",
        params: {
            id:eventReq.id
        },
        url: '../event/getAllEventsSettings'
    }).success(function(data, status) {
        if(data.length){
            $scope.events = data;
        }
        hideLoad()
    }).error(function(data, status) {
        console.log("error on server" + error)
        hideLoad()
    })
    
    
    
    
    $scope.changeSoftState = function($event,id,name,st){
        var t = $($event.currentTarget).hasClass('on')
        console.log("state is " + st)
        if(t == true){
            return;
        }
        var state = [{
            name:"soft",
            value:st
        }]
        if (st == 'false'){
            dhtmlx.confirm({
                type:"Remove Campaign",
                text:"Do you want to disable state?  Note:It will affect your campaigns and segments regarding the event.",
                callback: function(value) {
                    if(value){
                        $http({
                            method: "post",
                            params:{
                                id:id,
                                eventName:name,
                                state:JSON.stringify(state)
                            },
                            url: '../event/insertEventsSettings'
                        }).success(function(data, status) {
                            console.log("state is " + st)
                            if(st == "false"){
                                $($event.currentTarget).addClass('on')
                                $($event.currentTarget).next().removeClass('on') 
                            }else{
                                $($event.currentTarget).addClass('on')
                                $($event.currentTarget).prev().removeClass('on') 
                            }
                        }).error(function(data, status) {
                            console.log("error is" + data)
                        });
                    }
                }
            });
        }else{
            dhtmlx.confirm({
                type:"Remove Campaign",
                text:"Do you want to enable state?",
                callback: function(value) {
                    if(value){
                        $http({
                            method: "post",
                            params:{
                                id:id,
                                eventName:name,
                                state:JSON.stringify(state)
                            },
                            url: '../event/insertEventsSettings'
                        }).success(function(data, status) {
                            console.log("state is " + st)
                            if(st == "false"){
                                $($event.currentTarget).addClass('on')
                                $($event.currentTarget).next().removeClass('on') 
                            }else{
                                $($event.currentTarget).addClass('on')
                                $($event.currentTarget).prev().removeClass('on') 
                            }
                        }).error(function(data, status) {
                            console.log("error is" + data)
                        });
                    }
                }
            });
            
        }
    }
   
   
   
    $scope.changePermState = function($event,id,name,st){
        var t = $($event.currentTarget).hasClass('on')
        if(t == true){
            return;
        }
        var state = [{
            name:"perm",
            value:st
        }]
    
        if (st == 'false'){
            dhtmlx.confirm({
                type:"Remove Campaign",
                text:"Do you want to disable state? Note:It will affect your campaigns and segments regarding the event.",
                callback: function(value) {
                    if(value){
                        $http({
                            method: "post",
                            params:{
                                id:id,
                                eventName:name,
                                state:JSON.stringify(state)
                            },
                            url: '../event/insertEventsSettings'
                        }).success(function(data, status) {
                            if(st == "false"){
                                $($event.currentTarget).addClass('on')
                                $($event.currentTarget).next().removeClass('on') 
                            }else{
                                $($event.currentTarget).addClass('on')
                                $($event.currentTarget).prev().removeClass('on') 
                            }
                        }).error(function(data, status) {
                            console.log("Error " + status)   
                        });
                    }
                }
            });
        }else{
            dhtmlx.confirm({
                type:"Remove Campaign",
                text:"Do you want to enable state?",
                callback: function(value) {
                    if(value){
                        $http({
                            method: "post",
                            params:{
                                id:id,
                                eventName:name,
                                state:JSON.stringify(state)
                            },
                            url: '../event/insertEventsSettings'
                        }).success(function(data, status) {
                            if(st == "false"){
                                $($event.currentTarget).addClass('on')
                                $($event.currentTarget).next().removeClass('on') 
                            }else{
                                $($event.currentTarget).addClass('on')
                                $($event.currentTarget).prev().removeClass('on') 
                            }
                        }).error(function(data, status) {
                            console.log("Error " + status)   
                        });
                    }
                }
            }); 
        }
    }
});
