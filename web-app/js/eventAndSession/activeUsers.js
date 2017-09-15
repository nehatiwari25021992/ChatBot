/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



// Dau section
appHq.controller("dauController", function($scope, $rootScope, $http,$location,dataService) {
    mianControllersIns.bookMarkedQuery1 = ""
    $scope.queries1.length = 0
    var queries1 = dataService.getBookMarkedQueries1()
    console.log(queries1)
    $.each(queries1.name, function( index, value ) {
        $scope.queries1.push(value)
    });
    console.log($scope.queries1)
    $("#noData").hide();
    $("a.active").removeClass("active");
    $("#usersMenu").addClass("active");
    $("#dau_id").addClass("active");
    $("#bookMarkedQueries").hide(); 
    //    set up for tour
    $scope.isPluginLoad = "false"
    $scope.helpMsgArray = getAllTourTipMessage("DAILY")
    $scope.showTourForWizard = function(){
        $scope.CompletedEvent = function (scope) {
            $scope.isPluginLoad = "false"
        };

        $scope.ExitEvent = function (scope) {
            $scope.isPluginLoad = "false"
            var prevRes = $.cookie("DAILY")
            if(prevRes == "ok"){
                    
            }else{
                dhtmlx.confirm({
                    type:"confirm",
                    ok:"Yes",
                    cancel:"No",
                    text:"Do not display this message again ?",
                    callback: function(res) {
                        if(res){
                            $.cookie("DAILY", "ok",{ expires: 365 * 10 });
                        }else{
                            $.removeCookie("DAILY");  
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
                var res = $.cookie("DAILY")
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
    eventReq.setType("ACTIVEUSERSDAILY")
    eventReq.setUnique_type(true)
    
    
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
    // set total events in scope
    var totalEvents = dataService.getTotalEvents()
    var indexForAppSession = 0
    var cleanedEvents =[]
    var unCleanedEvents =[]
    
    totalEvents.forEach(function(obj,index ){
        if(obj != "INSTALL"){
            if (/-START/i.test(obj) || /-END/i.test(obj)){
                var objReplaced = obj.replace('-START','').replace('-END','')
                cleanedEvents.push(objReplaced)
            }else{
                cleanedEvents.push(obj)
                unCleanedEvents.push(obj)
            } 
        }
    })
    events.length=0
    var flagForAppSession = false
    console.log("cleanedEvents.length---"+cleanedEvents.length)
    if(cleanedEvents.length !=0){
        getUnique(cleanedEvents).forEach(function(obj,index ) {
            if(obj == "APPSESSION"){
                console.log(index)
                indexForAppSession = index
                flagForAppSession = true
            }
               
        });
   
        var uniqEvents = getUnique(cleanedEvents)[indexForAppSession]
           console.log("uniqEvents--"+uniqEvents)
    
        //        if(!flagForAppSession){
        //            if (/-START/i.test(uniqEvents) || /-END/i.test(uniqEvents)){
        //                uniqEvents = uniqEvents.replace('-START','').replace('-END','')
        //            }
        //        }
        $("#eventDailyU").val(uniqEvents)
        
        if(!pluckByName(unCleanedEvents,uniqEvents, true)){
            // the element is not in the array
            if(events.indexOf(uniqEvents + "-START")== -1){ 
                if(flagForAppSession){
                    events.push(uniqEvents + "-START") 
                }else{
                    events.push(uniqEvents) 
                }
            }
        }else{
            if(events.indexOf(uniqEvents)== -1){ 
                events.push(uniqEvents) 
            }
        }
        
        eventReq.setEvents(events)
    }

    
    initializeEventsForActiveUsers(getUnique(cleanedEvents),unCleanedEvents)
    var range = $('#rangeDau');
    // Show the dates in the range input
    range.val(moment().subtract('days', 6).format('YYYY-MM-DD')+" - "+moment().format('YYYY-MM-DD'))
    if(totalEvents.length != 0){
        $("#noDataDau").html("No Data.")
        ajaxLoadChart(); 
    }else{
        $("#chart").hide()
        $("#noData").show()
        $("#noDataDau").html("No Events created for this App.")
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
            'Today': [moment().utc(), moment().utc()],
            'Yesterday': [moment().utc().subtract('days', 1), moment().utc().subtract('days', 1)],
            'Last 7 Days': [moment().utc().subtract('days', 6), moment().utc()],
            'Last 30 Days': [moment().utc().subtract('days', 29), moment().utc()]
        }
    },function(startDate, endDate){
        var startD =$("#rangeDau").data('daterangepicker').startDate.format('YYYY-MM-DD')
        var endD =$("#rangeDau").data('daterangepicker').endDate.format('YYYY-MM-DD')
        start = startD
        end = endD
        eventReq["start"] = start
        eventReq["end"] = end
        if(totalEvents.length != 0){
            $("#noDataDau").html("No Data.")
            ajaxLoadChart(); 
        }else{
            $("#chart").hide()
            $("#noData").show()
            $("#noDataDau").html("No Events created for this App.")
        }
        
		
    });
    
    $scope.toggleProps = function(){
        if($scope.isPluginLoad == "true"){
            return false;   
        }
        if($("#propAnchToggle").hasClass("INACTIVE")){
            $("#propertyEventBox").show(700)
            $("#propAnchToggle").html("Add Properties &#x25BC;")
            $("#propAnchToggle").removeClass("INACTIVE").addClass("ACTIVE")  
        }else{
            $("#propertyEventBox").hide(700)
            $("#propAnchToggle").html("Add Properties &#x25B2;")
            $("#propAnchToggle").removeClass("ACTIVE").addClass("INACTIVE")
        }
    }
      
    $scope.fetchSubProps = function(id){
       
        if(events.length == 0){
            customAlert("alert-error","Please choose an event to get values.")
        }else{
            var selectedProp
            if(id ==1){
                selectedProp = $scope.property1
                if(selectedProp == "" || selectedProp == null){
                    $("#sub-property"+id).find('option:gt(0)').remove();
                    $("#property2").find('option:eq(0)').attr("selected",true);
                    $("#sub-property2").find('option:gt(0)').remove();
                    $scope.subProperty1 = ""
                    $scope.subProperty2 = ""
                    $scope.property2 = ""
                    return
                }
            }else{
                selectedProp = $scope.property2 
                if(selectedProp == "" || selectedProp == null){
                    $("#sub-property2").find('option:gt(0)').remove();
                    $scope.subProperty2 = ""
                    $scope.property2 = ""
                    return
                }
            }
            
            if($scope.property1 == $scope.property2){ 
                customAlert("alert-error","Property 1 and Property 2 cannot be same.")   
                $("#sub-property2").find('option:gt(0)').remove();
                $scope.subProperty2 = ""
                $scope.property2 = ""
                return
            }
           
            var result = $.grep(totalProps, function(e){ 
                return e.name == selectedProp; 
            });
            var selectedPropType = result[0].type
       
            var newReqObj = {
                "id":eventReq.getId(),
                "start" : eventReq.getStartDate(),
                "end" : eventReq.getEndDate(),
                "unique_type" : eventReq.unique_type,
                "events" : events,
                "properties" : [{
                    propertyName: selectedProp, 
                    propertyType:  selectedPropType,
                    propertyValue:  "all"
                }]
            }
            getSubPropsForDau(newReqObj,id);  
        }
    }
    $scope.applyProp1Val = function(){
        
        if($scope.subProperty1 == "all" || $scope.subProperty1 == ""){
            $("#property2").attr("readonly",true)
            $("#sub-property2").attr("readonly",true)
            $("#overLayDiv").show()
            $("#property2 :nth-child(0)").prop("selected",true)
            $("#sub-property2").find('option:gt(0)').remove();
            $scope.property2 = ""
            $scope.subProperty2 = ""
            
        }else{
            $("#property2").attr("readonly",false)
            $("#sub-property2").attr("readonly",false)
            $("#overLayDiv").hide()
       
        }
    }
    $scope.applyProps = function(){
        if(events.length == 0){
            customAlert("alert-error","Please choose an event to continue.")
            return;
        }else if(events.length >1){
            customAlert("alert-error","Properties can be applied to single event only.")
            return;
        }
        
        if($scope.property1 !="" || $scope.property1 !=undefined || $scope.property1 !=null){
            if($scope.subProperty1 == "" || $scope.subProperty1 ===undefined){
                customAlert("alert-error","Please choose value for the first property.")  
                return
            }
            if($scope.property2 !=""){ 
                if($scope.subProperty2 == "" ){
                    customAlert("alert-error","Please choose value for the second property.")   
                    return
                }
            }
        }else{
            customAlert("alert-error","Please choose first property and its value.") 
            return
        }
        
        // positive case to apply property filter
        properties.length = 0
        if($scope.property1 !=undefined){
            var result = $.grep(totalProps, function(e){ 
                return e.name == $scope.property1; 
            });
            var selectedPropType = result[0].type
            properties.push({
                propertyName: $scope.property1, 
                propertyType:  selectedPropType,
                propertyValue:  $scope.subProperty1
            });
        }
                
        if($scope.property2 !=undefined && $scope.subProperty2 !=undefined && $scope.property2 !="" && $scope.subProperty2 !=""){
            var result2 = $.grep(totalProps, function(e){ 
                return e.name == $scope.property2; 
            });
            var selectedPropType2 = result2[0].type
            properties.push({
                propertyName: $scope.property2, 
                propertyType:  selectedPropType2,
                propertyValue:  $scope.subProperty2
            });
        }
                
        eventReq.setProperties(properties)
       
        if($scope.subProperty1 == "all" || $scope.subProperty2 =="all"){
            eventReq.setChartType("PIE") 
            applyPropsFilterPie() 
        }else{
            eventReq.setChartType("LINE") 
            applyPropsFilterLine() 
        }
    }
    $scope.clearProps = function(){
        
        $("#property1 :nth-child(0)").prop("selected",true)
        $("#property2 :nth-child(0)").prop("selected",true)
        $("#sub-property2").find('option:gt(0)').remove();
        $("#sub-property1").find('option:gt(0)').remove();
        $("#property2").attr("readonly",true)
        $("#sub-property2").attr("readonly",true)
        $("#overLayDiv").show()
   
        $scope.property2 = ""
        $scope.subProperty2 = ""
        $scope.property1 = ""
        $scope.subProperty1 = ""
        properties.length = 0
        eventReq.setProperties(properties)
        $("#chart").hide();
        $("#chartPie").hide();
        ajaxLoadChart();
    }
    $scope.openDauQueryForm = function(){
        if($scope.isPluginLoad == "true"){
            return false;   
        }
        if(events.length == 0){
            customAlert("alert-error","Please choose an event to continue.")
            return;
        }else{
            $("#myDauFormBookmark").modal('show');   
        }
    }
    $scope.saveDauQueryForm = function(flag){
        if(flag == "yes"){
            var name = $("#dauQueryName").val().trim()  
            if(name === undefined || name == null || name == ""){
                customAlert("alert-error","Query name cannot be set blank.") 
                return; 
            }
            if(queries1.name.indexOf(name) != -1){
                customAlert("alert-error","Event with this name already exists.") 
                return     
            }
            var finalJson = JSON.stringify(eventReq)
            $.ajax({
                type: "POST",
                async: false,
                data:"reqDATA="+finalJson+"&name="+name+"&type="+"ACTIVEUSERSDAILY",
                url: '../event/saveMarkedQuery',
                beforeSend: function (data) {
                    showLoad()
                },
                complete: function (data) {
                    var responseData = data.responseText
                    hideLoad()
                    $("#myDauFormBookmark").modal('hide')
                    if(responseData == "true"){
                        $scope.queries1.push(name)  
                        $scope.bookMarkedQuery1 = name
                    }else{
                        $("#myDauFormBookmark").modal('hide') 
                    }
                }
            });
        }else{
            $("#dauQueryName").val('')
            $("#myDauFormBookmark").modal('hide'); 
        }
        
    }
    $scope.deleteDauQuery = function(){
        var qName = $scope.bookMarkedQuery1
        if(qName != null){
            showLoad()  
            $http({
                method: "post",
                params: {
                    id:eventReq.id,
                    "qName":qName,
                    type:eventReq.type
                },
                url: '../event/deleteQuery'
            }).success(function(data, status) {
                var i = $scope.queries1.indexOf(qName);
                if(i != -1) {
                    $scope.queries1.splice(i, 1);
                }
                $scope.property1 = ""
                $scope.property2 = ""
                $("#sub-property1").find('option:gt(0)').remove();
                $("#sub-property2").find('option:gt(0)').remove();
                properties = []
                events = []
                hideLoad()
                $location.path('/dau');
            }).error(function(data, status) {
                // Some error occurred
                if (status === 401) {
                    $("#error_modal").modal('show')
                }
                hideLoad() 
            }); 
                
        }
    }
    
    $scope.resetQuery = function(){
        var flagReset = true
        $scope.getBookMark(flagReset)
        $("#bookMarkedQuery11").find('option:eq(0)').prop("selected",true);
    }
    
});
// Wau section
appHq.controller("wauController", function($scope, $rootScope, $http,$location) {
    $("#noData").hide();
    $("a.active").removeClass("active");
    $("#wau_id").addClass("active");
    $("#usersMenu").addClass("active");
    $("#bookMarkedQueries").hide(); 
    eventReq.setType("ACTIVEUSERSWEEKLY")
    var range = $('#range2');
    // Show the dates in the range input
    range.val(moment().subtract('days', 6).format('YYYY-MM-DD')+" - "+moment().format('YYYY-MM-DD'))

    ajaxLoadChart();
     
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
        var startD =$("#range2").data('daterangepicker').startDate.format('YYYY-MM-DD')
        var endD =$("#range2").data('daterangepicker').endDate.format('YYYY-MM-DD')
        start = startD
        end = endD
        eventReq["start"] = start
        eventReq["end"] = end
        ajaxLoadChart();
		
    });
});
// MAU section
appHq.controller("mauController", function($scope, $rootScope, $http,$location) {
    $("#noData").hide();
    $("a.active").removeClass("active");
    $("#mau_id").addClass("active");
    $("#usersMenu").addClass("active");
    $("#bookMarkedQueries").hide(); 
    eventReq.setType("ACTIVEUSERSMONTHLY")
    var range = $('#range3');
    // Show the dates in the range input
    range.val(moment().subtract('days', 6).format('YYYY-MM-DD')+" - "+moment().format('YYYY-MM-DD'))

    ajaxLoadChart();
     
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
        start = startDate.utc()
        end = endDate.utc()
        eventReq["start"] = start
        eventReq["end"] = end
        ajaxLoadChart();
		
    });
});
function initializeEventsForActiveUsers(eventSource,unCleanedEvents){
  
    $("#eventDailyU").inputosaurus({
        width : "400px",
        autoCompleteSource : eventSource,
        activateFinalResult : true,
        change : function(ev){
            $("#event_reflect").val(ev.target.value);
            var count = ev.target.value.split(","); 
            //            var diff = $(count).not(eventSource).get();
            //            if(diff.length>0){
            //                customAlert("alert-error","Invalid event(s) selected!!")
            //                return
            //            }
           
            $("#chart").show()
            $("#noData").hide()
            events.length = 0
            if(ev.target.value != ""){
               for(i=0;i<count.length;i++){
                    if($.inArray(count[i],unCleanedEvents) == -1){
                        // the element is not in the array
                        events.push(count[i] + "-START") 
                    }else{
                        events.push(count[i])   
                    }
                }   
            }
            
            eventReq.setEvents(events)
            properties.length = 0
            eventReq.setProperties(properties)
            if(ev.target.value =="" || ev.target.value == null){
                // No events Case
                $("#noData").show();
                $("#chart").hide()
                $("#chartPie").hide()
            }else{
                if(count.length  > 5){
                    // Only 5 events are allowed condition
                    $("#chartPie").hide()
                    customAlert("alert-error","Max no. of events reached.")
                }else if(count.length  >= 2){
                    // Event comparison case,hide properties tab and load event comparison graph
                    $("#chartPie").hide()
                    getResultsForDailyActiveUsers() 
                }else{
                    // Single event case only, show properties dropdown
                    getResultsForDailyActiveUsers() 
                }  
            }
        }
        
    });
}


function getResultsForDailyActiveUsers(){
    $("#chart").show()
    $("#noData").hide() 
    showLoad()
    $.getJSON('../event/getResults', {
        "reqDATA":JSON.stringify(eventReq)
    }, function(data) {
        var ddd = eval(data)
        var tp;
        if(ddd[ddd.length-1] != undefined && ddd[ddd.length-1].totalProps != undefined){
        	tp = clone(ddd[ddd.length-1].totalProps)
        	ddd.splice(ddd.length-1, 1)
        }
        if(data.length > 0 && ddd[0].data !=undefined && ddd[0].data.length == 0){
            $("#chart").hide()
            $("#noData").show() 
            console.log("1")
        }else if(ddd.length == 0){
            $("#chart").hide()
            $("#noData").show() 
            console.log("2")
        }else{
            $("#chart").show()
            $("#noData").hide()
            loadHighLineChart(data)
           
        }
        
        if(tp != undefined ){ 
            var totalProps = tp
           var __scope =  angular.element($("#dau_scope")).scope();
            __scope.getTotalProps = totalProps
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
            __scope.totalProps = cleanedProperties
            __scope.$apply()
        }
        hideLoad()
    }); 
}

function getResultsForActiveUsers(){
    $("#chart").show()
    $("#noData").hide() 
    showLoad()
    $.getJSON('../event/getResultsForActiveUsers', {
        "reqDATA":JSON.stringify(eventReq)
    }, function(data) {
        var ddd = eval(data)
        if(data.length > 0 && ddd[0].data.length == 0){
            $("#chart").hide()
            $("#noData").show() 
        }else if(ddd.length == 0){
            $("#chart").hide()
            $("#noData").show() 
        }else{
            $("#chart").show()
            $("#noData").hide()
            loadHighLineChart(data)
           
        }
        hideLoad()
    }); 
}
