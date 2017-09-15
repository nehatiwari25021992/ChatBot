/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 28 Oct 2014
 * @version 1.0
 */

// funnel section
appHq.controller("funnelController", function($scope,$rootScope,dataService, $http,$location) {
    mianControllersIns.funnelQueries = ""
    $("#noData").show()
    $("a.active").removeClass("active");
    $("#funnelMenu").addClass("active");
    $("#bookMarkedQueries").hide();
    //    set up for tour
    $scope.isPluginLoad = "false"
    $scope.helpMsgArray = getAllTourTipMessage("FUNNEL")
    $scope.showTourForWizard = function(){
        $scope.CompletedEvent = function (scope) {
            $scope.isPluginLoad = "false"
        };

        $scope.ExitEvent = function (scope) {
            $scope.isPluginLoad = "false"
            var prevRes = $.cookie("FUNNEL")
            if(prevRes == "ok"){
                    
            }else{
                dhtmlx.confirm({
                    type:"confirm",
                    ok:"Yes",
                    cancel:"No",
                    text:"Do not display this message again ?",
                    callback: function(res) {
                        if(res){
                            $.cookie("FUNNEL", "ok",{ expires: 365 * 10 });
                        }else{
                            $.removeCookie("FUNNEL");  
                        }
                    }
                });
            }
        
        };

        $scope.ChangeEvent = function (targetElement, scope) {
            console.log("Change Event called");
            console.log(targetElement);  //The target element
            console.log(this);  //The IntroJS object
        };

        $scope.BeforeChangeEvent = function (targetElement, scope) {
            $scope.isPluginLoad = "true"
        };

        $scope.AfterChangeEvent = function (targetElement, scope) {
            console.log("After Change Event called");
            console.log(targetElement);
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
                var res = $.cookie("FUNNEL")
            
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
    eventReq.setType("FUNNEL")
   
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
    // set total events in scope
    var totalEvents = dataService.getTotalEvents()
    if(totalEvents.length == 0){
        $("#noDataFunnel").html("No Events created for this App.")
    }else{
        $("#noDataFunnel").html("No Data.")
    }
    var cleanedEvents =[]
    var unCleanedEvents =[]
    totalEvents.forEach(function(obj,index ){
        if (/-START/i.test(obj) || /-END/i.test(obj)){
            var objReplaced = obj.replace('-START','').replace('-END','')
            cleanedEvents.push(objReplaced)
        }else{
            cleanedEvents.push(obj)
            unCleanedEvents.push(obj)
        }
    })
    initializeEventsForFunnel(getUnique(cleanedEvents),unCleanedEvents)
    // set funnel query
    var funnelQ = dataService.getFunnelQuery()
    // $scope.queries = funnelQ.funnelName
    
    
    
    
    var range = $('#rangeFunnel');
    // Show the dates in the range input
    range.val(moment().utc().subtract('days', 6).format('YYYY-MM-DD')+" - "+moment().utc().format('YYYY-MM-DD'))
    //$("#rangeFunnel").attr("readonly",true)
    // ajaxLoadChart();
   
     
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
    },function(startDate, endDate,label){
        // console.log(label)
        // if(label !="Custom Range"){
        // start = startDate.utc()
        // end = endDate.utc()
        // eventReq["start"] = start
        // eventReq["end"] = end
        // ajaxLoadChart();
        // }
        var startD =$("#rangeFunnel").data('daterangepicker').startDate.format('YYYY-MM-DD')
        var endD =$("#rangeFunnel").data('daterangepicker').endDate.format('YYYY-MM-DD')
        start = startD
        end = endD
        eventReq["start"] = start
        eventReq["end"] = end
        var eveArr = eventReq.getEvents()
        if(eveArr.length != 0){
            $("#noDataFunnel").html("No Data.")
            ajaxLoadChart();     
        }else{
            if(totalEvents.length == 0){
                $("#noDataFunnel").html("No Events created for this App.")
            }else{
               $("#noDataFunnel").html("No Data.") 
            }
            $("#chart").hide();
            $("#noData").show();
        // customAlert("alert-error","Please choose an event to get values.")
           
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
    
    $scope.close = function(){
        $("#invalidEveId").hide()
    }
      
    $scope.fetchSubProps = function(id){
        if(events.length == 0){
            customAlert("alert-error","Please choose an event to get values.")
        }else{
            var selectedProp
            if(id ==1){
                $scope.subProperty1 = ""
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
                
                if($scope.property1 == $scope.property2){ 
                    customAlert("alert-error","Property 1 and Property 2 cannot be same.")   
                    $("#sub-property1").find('option:gt(0)').remove();
                    $scope.subProperty1 = ""
                    $scope.property1 = ""
                    return
               
                }
            }else{
                $scope.subProperty2 = ""
                selectedProp = $scope.property2 
                if(selectedProp == "" || selectedProp == null){
                    $("#sub-property2").find('option:gt(0)').remove();
                    $scope.subProperty2 = ""
                    $scope.property2 = ""
                    return
                }
                if($scope.property1 == $scope.property2){ 
                    customAlert("alert-error","Property 1 and Property 2 cannot be same.")   
                    $("#sub-property2").find('option:gt(0)').remove();
                    $scope.subProperty2 = ""
                    $scope.property2 = ""
                    return
               
                }
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
        }
        // else if(events.length >1){
        // customAlert("alert-error","Properties can be applied to single event
        // only.")
        // return;
        // }
        
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
        
        eventReq.setChartType("FUNNEL") 
        applyPropsFilterFunnel()
       
    // if($scope.subProperty1 == "all" || $scope.subProperty2 =="all"){
    // eventReq.setChartType("PIE")
    // applyPropsFilterPie()
    // }else{
    // eventReq.setChartType("LINE")
    // applyPropsFilterLine()
    // }
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
    
    $scope.saveFunnelName = function(){
        var fName = $("#Fname").val().trim()
        if(fName.length == 0){
            customAlert("alert-error","Please enter Funnel Name.") 
            return  
        }else{
            if($scope.queries2.indexOf(fName) != -1){
                customAlert("alert-error","Query with this name already exists.") 
                return     
            }
            showLoad()
            $http({
                method: "post",
                params: {
                    "reqDATA":JSON.stringify(eventReq),
                    "fName":fName
                },
                url: '../event/saveFunnelQuery'
            }).success(function(data, status) {
                hideLoad()
                if(data == "true"){
                    $scope.queries2.push(fName)
                    $scope.funnelQueries = ""
                    $("#Fname").val("")
                    $("#funnelNameData").hide(); 
                }else{
                    
                }
            }).error(function(data, status) {
                // Some error occurred
                if (status === 401) {
                    $("#error_modal").modal('show')
                }
                hideLoad()
            });
         
        }
    } 
    
  
    
    $scope.deleteFunnelQuery = function(){
        $("#helpBtn").hide()
        $.cookie("isPluginView", "no",{ expires: 365 * 10 });
        $("#infoMsg").hide()
        var fName = $scope.funnelQueries
        if(fName != null){
            showLoad()
            $http({
                method: "post",
                params: {
                    id:eventReq.id,
                    "fName":fName
                },
                url: '../event/deleteFunnelQuery'
            }).success(function(data, status) {
                var i = $scope.queries2.indexOf(fName);
                if(i != -1) {
                    $scope.queries2.splice(i, 1);
                }
                
                $("#propAnchToggle").show()
                $("#applyPropBtn").show()
                $("#cancelPropBtn").show()
                $("#eventDiv").show()
                $("#eventqq").hide()
                $("#propertyEventBox").hide(700)
                $("#propAnchToggle").html("Add Properties &#x25B2;")
                $("#propAnchToggle").removeClass("ACTIVE").addClass("INACTIVE")
                $scope.totalProps = cleanedProperties
                $("#property1").attr("readonly",false)
                $scope.property1 = ""
                $scope.property2 = ""
                $("#sub-property1").attr("readonly",false)
                $("#sub-property1").find('option:gt(0)').remove();
                $("#sub-property2").find('option:gt(0)').remove();
                properties = []  
                eventReq.setProperties(properties)
                // $("#eventFunnel").val(totalEvents[0])
                events = []
                //events.push(totalEvents[0])
                eventReq.setEvents(events)
                $("#FunnelDelete").hide()
                hideLoad() 
                range.val(moment().utc().subtract('days', 6).format('YYYY-MM-DD')+" - "+moment().utc().format('YYYY-MM-DD'))
                eventReq["start"] = moment().utc().subtract('days', 6).format('YYYY-MM-DD')
                eventReq["end"] = moment().utc().format('YYYY-MM-DD')
                // ajaxLoadChart();
                $("#noData").show()
                $("#chart").hide()
                $("#helpBtn").show()
                $location.path('/funnel');
            }).error(function(data, status) {
                // Some error occurred
                if (status === 401) {
                    $("#error_modal").modal('show')
                }
                hideLoad() 
            });   
        }else{
            range.val(moment().utc().subtract('days', 6).format('YYYY-MM-DD')+" - "+moment().utc().format('YYYY-MM-DD'))
            eventReq["start"] = moment().utc().subtract('days', 6).format('YYYY-MM-DD')
            eventReq["end"] = moment().utc().format('YYYY-MM-DD')
            ajaxLoadChart();
        }
    }
    
    
    $scope.resetQuery = function(){
        $("#helpBtn").show()
        var flagReset = true
        $scope.getFunnel(flagReset)
        $("#funnelQueriesSeletct").find('option:eq(0)').prop("selected",true);
    }
});


function initializeEventsForFunnel(eventSource,unCleanedEvents){
    $("#eventFunnel").inputosaurus({
        width : "400px",
        autoCompleteSource : eventSource,
        activateFinalResult : true,
        change : function(ev){
            $("#event_reflect").val(ev.target.value);
            var count = ev.target.value.split(","); 
            var diff = $(count).not(eventSource).get();
            
            if(ev.target.value != ""){
                if(diff.length>0){
                    customAlert("alert-error","Invalid event(s) selected!")
                    $("#selectBBox").hide()
                    $("#invalidEveId").show()
                    return
                }else{
                    $("#selectBBox").show()
                    $("#invalidEveId").hide()
                }   
            }
            
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
            }else{
                $("#selectBBox").show()
                $("#invalidEveId").hide()
            }
            
            if(events.length == 0 || events.length == 1){
                $("#flip").hide()
                $("#funnelNameData").hide()
                
            }else{
                $("#flip").show()
                //$("#funnelNameData").show()
            }
            eventReq.setEvents(events)
            //            properties.length = 0
            //            eventReq.setProperties(properties)
            if(ev.target.value =="" || ev.target.value == null){
                // No events Case
                $("#noData").show();
                $("#chart").hide()
            }else{
                if(count.length  > 5){
                    // Only 5 events are allowed condition
                    customAlert("alert-error","Max no. of events reached.")
                }else if(count.length  >= 1){
                    // Event comparison case,hide properties tab and load event comparison graph
                    getResultsForFunnel() 
                }else{
                    // Single event case only, show properties dropdown
                    getResultsForFunnel() 
                }  
            }
        }
        
    });
}

//function initializeEventsForFunneltest(eventSource){
//    $("#eventFunnelqq").inputosaurus({
//        width : "400px",
//        autoCompleteSource : "",
//        activateFinalResult : false
//    });
//}


function getResultsForFunnel(){
    var pr = eventReq.getProperties()
    var url = null
    if(pr.length == 1){
        url =  '../event/getFunnelSubPropsForValue'  
    }else if(pr.length == 2){
        url =  '../event/getFunnelSubPropsForValue2' 
    }else {
        url =  '../event/getResultsFunnel'  
    }
    $("#chart").show()
    $("#noData").hide() 
    showLoad()
    $.getJSON(url, {
        "reqDATA":JSON.stringify(eventReq)
    }, function(data) {
      
        var ddd = eval(data)
       
        if(ddd.length == 0){
            $("#chart").hide()
            $("#noData").show() 
        }else{
            $("#chart").show()
            $("#noData").hide()
            loadHighFunnelChart(data)
           
        }
        hideLoad()
    }); 
}

function loadHighFunnelChart(data){
    var funnelCountArray = []
    var funnelCountArrayPer = []
    var checkFunnel = true
    var propsT;
    $.each(data, function (i, item) {
        //console.log(item, item instanceof Array)
        if(item instanceof Array){
        	funnelCountArray.push(item[1]);
        }else{
        	propsT = item.totalProps
        }
    	
    });
    
    if(propsT != undefined){
    	
    var cleanedProperties =[]
    var __scope =  angular.element($("#funnel_scope")).scope();
    propsT.forEach(function(obj,index ){
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
    console.log(__scope)
    console.log(propsT)
    
    data.splice(data.length-1, 1)
    
    }
    
    $.each(funnelCountArray, function (i, node) {
        if(node < funnelCountArray[i+1]){
            checkFunnel = false
            return;
        }else{
            if(i== 0){
                funnelCountArrayPer.push(node);    
            }
        }
    });
    
    //funnelCountArrayPer[0] = 100
   
    if(checkFunnel == false){
        $("#infoMsg").show()
    }else{
        $("#infoMsg").hide()
    }
    hideLoad()
    $('#chart').highcharts({
        chart: {
            type: 'funnel',
            marginRight: 100
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        tooltip: {
            //            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            //            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
           
            formatter: function () {
                if(checkFunnel == true){
                    return '<span style="font-size:11px">' + this.series.name + '</span><br>' +
                    (this.point.name.replace("-START","")) + ': '+
                    '<b>' + this.y + '</b>'+ '<br> '+
                    '<b>(Conversion Ratio :' + ((this.y*100)/funnelCountArrayPer[0]).toFixed(2) + '%)</b>';   
                }else{
                    return '<span style="font-size:11px">' + this.series.name + '</span><br>' +
                    (this.point.name.replace("-START","")) + ': '+
                    '<b>' + this.y + '</b>';   
                }
            }    
            
            
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    //format: '<b>{point.name}</b> ({point.y:,.0f})',
                   
                    formatter: function () {
                        if(checkFunnel == true){
                            return '<span style="font-size:11px">' + this.point.name.replace("-START","") + '<b>(' + this.y + ')</b><br>'+ '<b>(Conversion Ratio :' + ((this.y*100)/funnelCountArrayPer[0]).toFixed(2) + '%)</b>' 
                        }else{
                            return '<span style="font-size:11px">' + this.point.name.replace("-START","") + '<b>(' + this.y + ')</b>' 
                   
                        }
                    },   
                    
                      
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true
                },
                neckWidth: '30%',
                neckHeight: '25%'

            //-- Other available options
            // height: pixels or percent
            // width: pixels or percent
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Unique users',
            data:data
            
            
        }
        ],
        navigation: {
            buttonOptions: {
                verticalAlign: 'bottom',
                y: -20
            }
        }
    });

}


function applyPropsFilterFunnel(){
    var propNameNewVal, propNameOldVal, url = '';
    showLoad()
    if(eventReq.getProperties()[1] === undefined && eventReq.getProperties()[1] == null ){
        propNameNewVal = $("#sub-property1").val()
        eventReq.getProperties()[0].propertyValue = propNameNewVal
        url = '../event/getFunnelSubPropsForValue'
    }else{
        propNameOldVal = $("#sub-property1").val()
        propNameNewVal = $("#sub-property2").val()
        eventReq.getProperties()[0].propertyValue = propNameOldVal
        eventReq.getProperties()[1].propertyValue = propNameNewVal
        url = '../event/getFunnelSubPropsForValue2'  
    }
   
    $.getJSON(url, {
        "reqDATA":JSON.stringify(eventReq)
    }, function(data) {
        var ddd = eval(data)
        if(ddd.length == 0){
            $("#chart").hide()
            $("#noData").show() 
            $("#chartPie").hide()
        }else{
            $("#noData").hide() 
            $("#chart").show()
            $("#chartPie").hide()
            loadHighFunnelChart(data)
       
        }
        hideLoad()  
    }); 
}