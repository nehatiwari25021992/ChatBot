/**
 * Shephertz Technologies
 * 
 * @author Jatin Chauhan
 * @date 19 Sep 2014
 * @version 1.0
 */

// AngularJs Controllers

// Main controller section

var mianControllersIns;

appHq.controller("MainController", function($scope, $rootScope,dataService,$location, $route,$http) {
    $rootScope.$on("$routeChangeStart", function(e) {
        
        // show indicator
        $rootScope.$broadcast("loading-started");
        
    });
    $rootScope.$on("$routeChangeSuccess", function(e) {
        // hide indicator
        clearIntervals()
        resetRequest()
        $rootScope.$broadcast("loading-complete");
    });
    $rootScope.$on("$routeChangeError", function(e) {
        // show error..
        resetRequest()
        clearIntervals()
    });
   
    var currentPath = $location.path()
    var apps = dataService.setApps()
 
    if(apps.length == 0 || apps == undefined){
        $("#noapp_modal").modal('show');
        return;
    }
    $scope.apps = apps
    var storedApp = localStorage.getItem("storedApp");
    var inx = 0
    if(storedApp == null){
        $scope.selectedApps = $scope.apps[inx].id  
    }else{
        inx = $scope.apps.map(function(e) {
            return e.id+"";
        }).indexOf(storedApp+"");
        if(inx == -1){
            inx = 0 
        }
        $scope.selectedApps = $scope.apps[inx].id
    }
    
    //initialize eventclient
    initializeEventClient($scope.selectedApps,apps)
    eventReq.id = $scope.apps[inx].id  
    reqNewSegmentation.id = $scope.apps[inx].id  
    pushRequestModel.id = $scope.apps[inx].id 
    emailRequestModel.id = $scope.apps[inx].id 
    wallPostRequestModel.id = $scope.apps[inx].id 
    eventReqSegmentation.id = $scope.apps[inx].id  
    eventReqSegmentation.viewId = $scope.apps[inx].id + new Date().getTime()
    $scope.segQuery = null
    // set total bookmarked queries for the selected app in scope in scope
    var queries = dataService.setBookMarkedQueries(eventReq.id)
    var segBasicObj = new Array()
    var segAdvObj = new Array()
    var segType;
    for (var i = 0; i < queries.length; i++) {
        var segBasicQuery = {}
        var segAdvQuery = {}
        if(queries[i]["query"] != null){
            var segTypeObj = JSON.parse(queries[i]["query"])
            segType = segTypeObj["type"]
            if(segType == "ADVANCE"){
                segAdvQuery.name = queries[i]["name"]
                segAdvQuery.id = queries[i]["id"]
                segAdvQuery.viewId = queries[i]["viewId"]
                segAdvObj.push(segAdvQuery)
            }else if(segType != "ADVANCE" && segType != "ADV_SEGMENT"){
                segBasicQuery.name = queries[i]["name"]
                segBasicQuery.id = queries[i]["id"]
                segBasicQuery.viewId = queries[i]["viewId"]
                segBasicObj.push(segBasicQuery)
            }
        }
    }
    if($location.path() =='/segmentation/'){
        $scope.queries = segBasicObj 
    }else if($location.path() =='/advanceSegmentation/'){
        $scope.queries = segAdvObj 
    }
	 
    // This for set basic and advance query in parent  scope
    $scope.basicQueries = segBasicObj
    $scope.advanceQueries = segAdvObj
    // $scope.queries = queries 
    $scope.count = 0;
    $scope.getApp = function(){
        // showLoad()
        // $scope.changeAppInBckgoud()
        currentPath = $location.path()
        var selectedApp = $scope.selectedApps
        initializeEventClient(selectedApp,$scope.apps)
        localStorage.setItem("storedApp",selectedApp);
        eventReq.id = selectedApp 
        pushRequestModel.id = selectedApp
        emailRequestModel.id = selectedApp
        wallPostRequestModel.id = selectedApp
        eventReqSegmentation.id = selectedApp 
        reqNewSegmentation.id = selectedApp
        setTimeout(function(){ 
        
            var queriesRes = dataService.setBookMarkedQueries(eventReq.id)
            var segBasicAppObj = new Array()
            var segAdvAppObj = new Array()
            var segType;
            for (var i = 0; i < queriesRes.length; i++) {
                var segBasicAppQuery = {}
                var segAdvAppQuery = {}
                if(queriesRes[i]["query"] != null){
                    var segTypeObj = JSON.parse(queriesRes[i]["query"])
                    segType = segTypeObj["type"]
                    if(segType == "ADVANCE"){
                        segAdvAppQuery.name = queriesRes[i]["name"]
                        segAdvAppQuery.id = queriesRes[i]["id"]
                        segAdvAppQuery.viewId = queriesRes[i]["viewId"]
                        segAdvAppObj.push(segAdvAppQuery)
                    }else if(segType != "ADVANCE" && segType != "ADV_SEGMENT"){
                        segBasicAppQuery.name = queriesRes[i]["name"]
                        segBasicAppQuery.id = queriesRes[i]["id"]
                        segBasicAppQuery.viewId = queriesRes[i]["viewId"]
                        segBasicAppObj.push(segBasicAppQuery)
                    }
                }
            }
            if($location.path() =='/segmentation/'){
                $scope.queries.length = 0
                if(segBasicAppObj.length != 0){
                    $.each(segBasicAppObj, function( index, value ) {
                        $scope.queries.push(value) 	
                    });
                }

            }else if($location.path() =='/advanceSegmentation/'){
                $scope.queries.length = 0
                if(segAdvAppObj.length != 0){
                    $.each(segAdvAppObj, function( index, value ) {
                        $scope.queries.push(value) 	
                    });
                }

            }
        
            // This for set basic and advance query in parent  scope
            $scope.basicQueries = segBasicAppObj
            $scope.advanceQueries = segAdvAppObj
         
            // $scope.queries = queriesRes
            var queries1 = dataService.setBookMarkedQueries1(eventReq.id,eventReq.type)
            $scope.queries1 = queries1.name
        
            var queriesAdv = dataService.setBookMarkedQueriesAdv(eventReq.id)
            $scope.queriesAdv = queriesAdv.name
        
            var funnelQ = dataService.setFunnelQuery(eventReq.id)
            $scope.queries2 = funnelQ.funnelName
        }, 0);
       
        localStorage.setItem("storedApp",selectedApp);
       
        var rest = currentPath.substring(0, currentPath.lastIndexOf("/") + 1);
        
        if(rest == "/editCamp/"){
            $location.path('/allCamp')
        }else if(rest == "/viewSegment/"){
            $location.path('/segments')
        }else if(rest == "/editSegment/"){
            $location.path('/segments')
        }else if(rest == "/viewPushDashboard/"){
            $location.path('/allCamp')
        }
        else{
            reloadTemplate($location,currentPath,selectedApp)  
        }
    }
    $scope.changeAppInBckgoud = function(){
        $.cookie("isPluginView", "no");
        currentPath = $location.path()
        var selectedApp = $scope.selectedApps
        // initialize trackEvent on app Change
        initializeEventClient(selectedApp,$scope.apps)
        localStorage.setItem("storedApp",selectedApp);
        eventReq.id = selectedApp 
        pushRequestModel.id = selectedApp
        emailRequestModel.id = selectedApp
        wallPostRequestModel.id = selectedApp
        eventReqSegmentation.id = selectedApp 
        reqNewSegmentation.id = selectedApp
        var queriesRes = dataService.setBookMarkedQueries(eventReq.id)
        var segBasicAppObj = new Array()
        var segAdvAppObj = new Array()
        var segType;
        for (var i = 0; i < queriesRes.length; i++) {
            var segBasicAppQuery = {}
            var segAdvAppQuery = {}
            if(queriesRes[i]["query"] != null){
                var segTypeObj = JSON.parse(queriesRes[i]["query"])
                segType = segTypeObj["type"]
                if(segType == "ADVANCE"){
                    segAdvAppQuery.name = queriesRes[i]["name"]
                    segAdvAppQuery.id = queriesRes[i]["id"]
                    segAdvAppQuery.viewId = queriesRes[i]["viewId"]
                    segAdvAppObj.push(segAdvAppQuery)
                }else if(segType != "ADVANCE" && segType != "ADV_SEGMENT"){
                    segBasicAppQuery.name = queriesRes[i]["name"]
                    segBasicAppQuery.id = queriesRes[i]["id"]
                    segBasicAppQuery.viewId = queriesRes[i]["viewId"]
                    segBasicAppObj.push(segBasicAppQuery)
                }
            }
        }
        if($location.path() =='/segmentation/'){
            $scope.queries.length = 0
            if(segBasicAppObj.length != 0){
                $.each(segBasicAppObj, function( index, value ) {
                    $scope.queries.push(value) 	
                });
            }

        }else if($location.path() =='/advanceSegmentation/'){
            $scope.queries.length = 0
            if(segAdvAppObj.length != 0){
                $.each(segAdvAppObj, function( index, value ) {
                    $scope.queries.push(value) 	
                });
            }

        }
        
        // This for set basic and advance query in parent  scope
        $scope.basicQueries = segBasicAppObj
        $scope.advanceQueries = segAdvAppObj
         
        // $scope.queries = queriesRes
        var queries1 = dataService.setBookMarkedQueries1(eventReq.id,eventReq.type)
        $scope.queries1 = queries1.name
        
        var queriesAdv = dataService.setBookMarkedQueriesAdv(eventReq.id)
        $scope.queriesAdv = queriesAdv.name
        
        var funnelQ = dataService.setFunnelQuery(eventReq.id)
        $scope.queries2 = funnelQ.funnelName
    //        var rest = currentPath.substring(0, currentPath.lastIndexOf("/") + 1);
    //        if(rest == "/editCamp/"){
    //            $location.path('/allCamp')
    //        }else if(rest == "/viewSegment/"){
    //            $location.path('/segments')
    //        }else if(rest == "/editSegment/"){
    //            $location.path('/segments')
    //        }
    //        else{
    //            reloadTemplate($location,currentPath,selectedApp)  
    //        }
    }
    $scope.getSegmentation = function(){
        console.log("In Segmentation booked queries")
        $("#helpBtn").show()
        $("#bookmarkCount").show()
        //$("#resData").hide()
        $('#eventSegmentBox > tbody:last').empty();
        $('#eventSegmentation').prop('disabled', true);
        $('#addEventToBox').prop('disabled', true);
        $('#property').prop('disabled', false); 
        $('#sub-property').prop('disabled', false); 
        $("#applyPropBtn").prop("disabled",true)
        //////////////// New Start ///////////////////////////
        $('#eventAdvanceSegmentBox > tbody:last').empty();
        $('#eventAdvanceSegmentation').prop('disabled', true);
        $('#addAdvanceEventToBox').prop('disabled', true);
        //////////////// New End ///////////////////////////
        var selectedQuery = $scope.bookMarkedQuery
        $scope.segQuery = $scope.bookMarkedQuery
        if(selectedQuery != ""  && selectedQuery != null){
            $("#helpBtn").hide()
            $("#resData").show()
            $("#showCount").hide()
            // $location.path('/segmentation');
            // empty template contents
            $('#buttonBox').hide() 
            $('#resultButtonBox').show() 
            $("#deleteSegQuery").show()
            var selectedApp = $scope.selectedApps
            showSavedQueryRes(selectedApp,selectedQuery)
        }else{
            $("#showCount").hide()
            //$("#resData").hide()
            $("#helpBtn").hide()
            $('#eventSegmentation').prop('disabled', false);
            $('#eventAdvanceSegmentation').prop('disabled', false);
            $('#addEventToBox').show() 
            $('#addAdvanceEventToBox').show() 
            $('#showErrorBox').hide() 
            $('#finalJson').empty() 
            
            events.length = 0
            properties.length = 0
            properties.push({
                propertyName:"",
                propertyType:"",
                propertyValue:""
            })
            eventReqSegmentation.setEvents(events)
            eventReqSegmentation.setProperties(properties)
            $('#eventSegmentBox > tbody:last').append('<tr id="noEventsTr" ><td></td><td><span class="label">No Events Added Yet!</span></td><td></td></tr>')
            $('#addEventToBox').prop('disabled', false); 
            $('#eventAdvanceSegmentBox > tbody:last').append('<tr id="noEventsTr" ><td></td><td><span class="label">No Events Added Yet!</span></td><td></td></tr>')
            $('#addAdvanceEventToBox').prop('disabled', false);
            $('#buttonBox').hide() 
            $('#resultButtonBox').hide()
            
                   
       


        }
       
    }
    
    function showSavedQueryRes(appId,selectedQuery){
        $scope.bookMarkedQuery = selectedQuery
        $scope.segQuery = selectedQuery
        $.ajax({
            type: "POST",
            async: false,
            data:"appId="+appId+"&name="+selectedQuery["name"]+"&viewId="+selectedQuery["viewId"],
            url: '../event/getSavedQuery',
            beforeSend: function (data) {
                showLoad()
            },
            complete: function (data) {
                hideLoad()
                var responseData = parseResponse(data.responseText);
                console.log("Response data is " +  " " + JSON.stringify(responseData))
                var eventsRes = responseData[0].queryObj[0].events
                var propertiesRes = responseData[0].queryObj[0].properties
                var eventOutput =""
                var propertyOutput =""
                events.length = 0
                properties.length = 0
                events = eventsRes
                properties = propertiesRes
                eventReqSegmentation.setEvents(events)
                eventReqSegmentation.setProperties(properties)
                $scope.eventsForPush = []
                // This change because date in date range 
                if(eventsRes[0].date){
                    $scope.eventsForPush.push({
                        name: eventsRes[0].name, 
                        startDate:  convertDateFormate(eventsRes[0].date),
                        endDate:null
                    })
                }else{
                    $scope.eventsForPush.push({
                        name: eventsRes[0].name, 
                        startDate:  convertDateFormate(eventsRes[0].start),
                        endDate:convertDateFormate(eventsRes[0].end)
                    })	
                }
                
                if(responseData[0].type !="ADVANCE"){
                    pushRequestModel.setEvents($scope.eventsForPush);	
                    emailRequestModel.setEvents($scope.eventsForPush);
                    wallPostRequestModel.setEvents($scope.eventsForPush);
                }else{
                    pushRequestModel.setEvents(events);	
                    emailRequestModel.setEvents(events);	
                    wallPostRequestModel.setEvents(events);	
                }
               
                // Set Properties
                pushRequestModel.setProperties(properties);
                emailRequestModel.setProperties(properties);
                wallPostRequestModel.setProperties(properties);
                
                var finalJson = JSON.stringify(eventReqSegmentation)
                $("#finalJson").html(finalJson)
                $scope.finalJSON = finalJson
                // set events 
                if(eventsRes.length == 0){
                    eventOutput = '<tr id="noEventsTr" ><td></td><td><span class="label">No Events Added Yet!</span></td><td></td></tr>'
                }else if(eventsRes.length == 1){
                    if(responseData[0].type !="ADVANCE"){
                        if(eventsRes[0].date){
                            eventOutput = '<tr id="'+eventsRes[0].name+'" ><td>'+eventsRes[0].name+'</td><td align=center>'+eventsRes[0].date+'</td><td><button type="button" class="btn btn-danger disabled">X</button></td></tr>'
                        }else{
                            eventOutput = '<tr id="'+eventsRes[0].name+'" ><td>'+eventsRes[0].name+'</td><td align=center>'+ eventsRes[0].start+' <span class="too">To</span> '+eventsRes[0].end+'</td><td><button type="button" class="btn btn-danger disabled">X</button></td></tr>'
                        }
                    }else{
                        eventOutput = '<tr id="'+eventsRes[0].name+'" ><td>'+eventsRes[0].name+'</td><td align=center>'+ eventsRes[0].start+' <span class="too">To</span> '+eventsRes[0].end+'</td><td><button type="button" class="btn btn-danger disabled">X</button></td></tr>'
                    }
                }else{	
                    var operatorBox = '<tr class=operatorBox-'+eventsRes[0].name+'>\n\\n\
                    <td>Operator:</td><td><select id=operatorBox-'+eventsRes[2].name+' disabled><option value="'+eventsRes[1].operator+'">'+eventsRes[1].operator+'</option></select></td><td></td></tr>'
                    //                  eventOutput = '<tr id="'+eventsRes[0].name+'" ><td>'+eventsRes[0].name+'</td><td align=center>'+eventsRes[0].date+'</td></tr>'+operatorBox+'<tr id="'+eventsRes[2].name+'" ><td>'+eventsRes[2].name+'</td><td align=center>'+eventsRes[2].date+'</td></tr>' 
                    //                  $('#operatorBox-'+eventsRes[2].name).prop('disabled', true);
                    //var operatorBox = '<tr class=operatorBox-'+eventsRes[0].name+'>\n\\n\
                    // <td></td><td><span class="label label-info larginLeftM">AND</span></td></tr>'
                    eventOutput = '<tr id="'+eventsRes[0].name+'" ><td>'+eventsRes[0].name+'</td><td align=center>'+eventsRes[0].start+' <span class="too">To</span> '+eventsRes[0].end+'</td></tr>'+operatorBox+'<tr id="'+eventsRes[2].name+'" ><td>'+eventsRes[2].name+'</td><td align=center>'+eventsRes[2].start+' <span class="too">To</span> '+eventsRes[2].end+'</td></tr>' 
                }
                // set properties
                if(propertiesRes.length != 0){
                    $('#property').prop('disabled', true);
                    $('#sub-property').prop('disabled', true);  

                    if(propertiesRes[0].propertyName == "" || propertiesRes[0].propertyValue == ""){
                        propertyOutput = '<tr id="noPropsTr" ><td colspan="3" class="noEvnt">No Properties Added.</td></tr>'
                    }else{
                        $("#property").append('<option value='+propertiesRes[0].propertyName+'>'+propertiesRes[0].propertyName+'</option>')
                        $('#property').val(propertiesRes[0].propertyName);
                           
                        if(propertiesRes[0].propertyValue != ""){
                            $("#sub-property").append('<option value='+propertiesRes[0].propertyValue+'>'+propertiesRes[0].propertyValue+'</option>')
                            $('#sub-property').val(propertiesRes[0].propertyValue);  
                        }
                        propertyOutput = '<tr id="'+propertiesRes[0].propertyName+'" ><td>'+propertiesRes[0].propertyName+'</td><td>'+propertiesRes[0].propertyValue+'</td><td><button type="button" class="btn btn-danger disabled">X</button></td></tr>'  
                    }
                }
                  
                $('#eventSegmentBox > tbody:last').empty().append(eventOutput); 
                $('#propertySegmentBox > tbody:last').empty().append(propertyOutput);
                
                $('#eventAdvanceSegmentBox > tbody:last').empty().append(eventOutput);
                $('#eventAdvanceSegmentation option:eq(0)').prop('selected', true);
                
                
                $('#eventSegmentation option:eq(0)').prop('selected', true);
                //customSegScope.ddate = null
                    
                $('#property').find('option:eq(0)').prop('selected', true);
                $('#sub-property').find('option:gt(0)').remove();
                $('#sub-property').find('option:eq(0)').prop('selected', true);
                /////////
                   
                if(responseData[0].namesObj.length == 0){
                    $("#triggerActionId").prop("disabled", true); 
                    $("#showCount").hide()
                    //$("#resData").hide()
                    $("#showCount").hide()
                    $("#exportResHidden").show()
                    $("#exportRes").hide()
                    $("#showErrorBox").show()
                    $("#showErrorBox").html("<strong>Error! </strong> No Data found for this query.")
                    $scope.items = []
                    $scope.bookmarkCount = [];
                    return;
                }
                $scope.bookmarkCount = responseData[0].count[0]
                $("#exportResHidden").hide()
                $("#exportRes").show()
                $("#bookmarkCount").show()
                $("#triggerActionId").prop("disabled", false);
                //$("#resData").hide()
                $("#showCount").hide()
                $("#showErrorBox").hide()
                if(getUnique(responseData[0].namesObj).length < 10){
                    $("#loadMoreBtn").hide()
                    $("#noMoreBtn").hide()
                }
                if(responseData[0].type =="ADVANCE"){
                    $("#exportResHidden").hide()
                    $("#exportRes").hide()
                    //$("#resData").hide()
                    $("#showCount").hide()
                    $scope.items = []
                }else{
                    $scope.items = getUnique(responseData[0].namesObj);	
                }
            	
               
            }
        });
    }
    
    
    $scope.tabs = [
    {
        "title": "Push Notification", 
        "active": true
    },

    {
        "title": "Email", 
        "active": false
    },

    {
        "title": "Facebook Wall Post", 
        "active": false
    }
    ];  
    
   
    
    /*Trigger Action Start*/
    $scope.triggerActionFrom = function(){
    	
        $('[data-toggle="popover"]').popover({
            trigger: 'hover',
            'placement': 'bottom'
        });
    	
        $("#triggerAction_modalForEvent").show();
        $("#triggerAction_modalForEvent").modal('show');
        $("#redirectFrom").val("basic")
        $("#pushFromDivId").show();
        $("#emailFromDivId").hide();
        $("#emailFromBasic").hide();
        $("#wallPostFromDivId").hide();
        $("#ScheduleFieldPush").show()
        $("#ScheduleFieldFbb").show()
        $("#ScheduleFieldEmail").show()
        $("#chooseProvider").hide()
        $scope.openPushForm();	
        $scope.onTabClick('Push Notification')
        $scope.tabs.length = 0
        $scope.tabs = [
        {
            "title": "Push Notification", 
            "active": true
        },

        {
            "title": "Email", 
            "active": false
        },

        {
            "title": "Facebook Wall Post", 
            "active": false
        }
        ];
    }
    $scope.onTabClick = function(tabName){
        if(tabName == "Push Notification"){
            $scope.tabs[0].active = true 
            $("#emailFromBasic").hide();
            $("#emailFromDivId").hide();
            $("#wallPostFromDivId").hide();
            $("#pushFromDivId").show();
            $("#warningMessageId").hide();
            $scope.openPushForm();
        }
        if(tabName == "Email"){
            $scope.tabs[1].active = true 
            // $("#emailFromDivId").show();
            $("#emailFromBasic").show();
            $("#wallPostFromDivId").hide();
            $("#pushFromDivId").hide();
            $("#warningMessageId").hide();
            $scope.sendEmailForm();
            
        }
        if(tabName == "Facebook Wall Post"){
            $scope.tabs[2].active = true 
            $("#emailFromDivId").hide();
            $("#emailFromBasic").hide();
            $("#wallPostFromDivId").show();
            $("#pushFromDivId").hide();
            $("#warningMessageId").hide();
            $scope.wallPostForm();
        }
    }
    
    /*Trigger Action End*/
    
    
    
    /*Push Notification Start*/
    
    var dateToDisable = new Date();
    dateToDisable.setDate(dateToDisable.getDate() + 2); // need to verify 
    $('#datetimepicker11').datetimepicker({
        formatTime:'H:i',
        formatDate:'YYYY-mm-dd',
        defaultDate:new Date(),
        defaultTime:'10:00'
	
    });
    
    $('#datetimepicker122').datetimepicker({
        formatTime:'H:i',
        formatDate:'YYYY-mm-dd',
        defaultDate:new Date(),
        defaultTime:'10:00'
	
    });
    
    $('#datetimepicker123').datetimepicker({
        formatTime:'H:i',
        formatDate:'YYYY-mm-dd',
        defaultDate:new Date(),
        defaultTime:'10:00'
	
    });

    $('#open').click(function(){
        $('#datetimepicker11').datetimepicker('show');
    });
    $('#openEmailD').click(function(){
        $('#datetimepicker122').datetimepicker('show');
    });
    $('#openWallPostD').click(function(){
        $('#datetimepicker123').datetimepicker('show');
    });
    
    
    $scope.openPushForm = function(){
        $scope.badge=false
        $scope.badgeType = 'NONE';
        $scope.sendType = 'All';
        $scope.lang = true
        $scope.sendAt = true
        $scope.badgeNo = 1;
        $("#message").val("");
        $scope.sound = "default";
        $("#badgeDetails").hide()
        $("#badgeNoDisplayId").hide()
        $("#soundDisplayId").hide()
        $("#pushDateId").hide()
        $("#soundTextFieldId").hide()
        $scope.getTimeZones= null
        $scope.enablePushTraking =""
        $("#datetimepicker11").val("");
    }

    $scope.changeStateBadge = function(){
        var badge = $scope.badge
        if(badge == true){
            $scope.badge = true
            pushRequestModel.setBadgeNSound($scope.badge)
            $("#badgeDetails").show()
            $scope.badgeType = 'NONE';
            $("#soundDisplayId").show()
    	
        }else{
            $scope.badge = false
            pushRequestModel.setBadgeNSound($scope.badge)
            $("#badgeDetails").hide()
            $("#soundDisplayId").hide()
            $("#badgeNoDisplayId").hide()
            $("#soundTextFieldId").hide()
            $scope.sound = "default";
            $scope.soundTextField = "";
        
        }
   
    }

    $scope.onCoustomBadge = function(){
        var badge = $scope.badgeType
        pushRequestModel.setBadgeType(badge)
        if(badge == "CUSTOM"){
            pushRequestModel.setBadge($scope.badgeNo)
            $("#badgeNoDisplayId").show()
        }else{
            $scope.badgeNo = 1
            pushRequestModel.setBadge($scope.badgeNo)
            $("#badgeNoDisplayId").hide()
        }
    }

    $scope.changeStateLang =function(){
        var lang = $scope.lang 
        if(lang != true){
            pushRequestModel.setLang("Non-English")  
        }else{
            pushRequestModel.setLang("English") 
        }
    }
    
    function getZones(){
        var range = [{
            code:'-12.0',
            time:'(GMT -12:00) Eniwetok, Kwajalein'
        },{
            code:'-11.0',
            time:'(GMT -11:00) Midway Island, Samoa'
        },{
            code:'-10.0',
            time:'(GMT -10:00) Hawaii'
        },{
            code:'-9.0',
            time:'(GMT -9:00) Alaska'
        },{
            code:'-8.0',
            time:'(GMT -8:00) Pacific Time (US &amp; Canada)'
        },{
            code:'-7.0',
            time:'(GMT -7:00) Mountain Time (US &amp; Canada)'
        },{
            code:'-6.0',
            time:'(GMT -6:00) Central Time (US &amp; Canada), Mexico City'
        },{
            code:'-5.0',
            time:'(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima'
        },{
            code:'-4.0',
            time:'(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz'
        },{
            code:'-3.5',
            time:'(GMT -3:30)Newfoundland'
        },{
            code:'-3.0',
            time:'(GMT -3:00) Brazil, Buenos Aires, Georgetown'
        },{
            code:'-2.0',
            time:'(GMT -2:00) Mid-Atlantic'
        },{
            code:'-1.0',
            time:'(GMT -1:00 hour) Azores, Cape Verde Islands'
        },{
            code:'0.0',
            time:'(GMT) Western Europe Time, London, Lisbon, Casablanca'
        },{
            code:'1.0',
            time:'(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris'
        },{
            code:'2.0',
            time:'(GMT +2:00) Kaliningrad, South Africa'
        },{
            code:'3.0',
            time:'(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg'
        },{
            code:'3.5',
            time:'(GMT +3:30) Tehran'
        },{
            code:'4.0',
            time:'(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi'
        },{
            code:'4.5',
            time:'(GMT +4:30) Kabul'
        },{
            code:'5.0',
            time:'(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent'
        },{
            code:'5.5',
            time:'(GMT +5:30) Bombay, Calcutta, Madras, New Delhi'
        },{
            code:'5.75',
            time:'(GMT +5:45) Kathmandu'
        },{
            code:'6.0',
            time:'(GMT +6:00) Almaty, Dhaka, Colombo'
        },{
            code:'7.0',
            time:'(GMT +7:00) Bangkok, Hanoi, Jakarta'
        },{
            code:'8.0',
            time:'(GMT +8:00) Beijing, Perth, Singapore, Hong Kong'
        },{
            code:'9.0',
            time:'(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk'
        },{
            code:'9.5',
            time:'(GMT +9:30) Adelaide, Darwin'
        },{
            code:'10.0',
            time:'(GMT +10:00) Eastern Australia, Guam, Vladivostok'
        },{
            code:'11.0',
            time:'(GMT +11:00) Magadan, Solomon Islands, New Caledonia'
        },{
            code:'12.0',
            time:'(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka'
        }]
	
        return range;
    }

    $scope.showPushDate =function(){
        var sendAt = $scope.sendAt
        if(sendAt != true){
            $("#pushDateId").show()
            $scope.zones = getZones()
  	
        }else{
            $("#pushDateId").hide()
        }
 

    }

    $scope.getOnChangeOfSound =function(){
        $scope.soundTextField = "";
        pushRequestModel.sound = $scope.sound
        if($scope.sound == "addNew"){
            $("#soundTextFieldId").show()
        }else{
            $("#soundTextFieldId").hide()
            
        }
 
    }

    // //////////For Sending Push //////////////
    var name = $("#name").val(); // Get Campaign Name 
    $scope.sendPushFromEvent = function(){
        var isPushEventTrack = $("#enableTrakingId").is(':checked') // for checking is active or not 
        console.log("isPushEventTrack ####",isPushEventTrack)
        if($scope.message == '' || $scope.message== undefined){
            //$("#message").val("");
            //$("#message").attr("required", "true")
            customAlert("alert-error","Please enter message.")
            return;
        }
        // validate scheduled Date and Time
        if($scope.sendAt != true){
            var date = $("#datetimepicker11").val()
            if(date == null || date == undefined || date == ""){
                customAlert("alert-error","Please select scheduled date.")	
                return;	
            }
            if($scope.getTimeZones == "" || $scope.getTimeZones == undefined){
                customAlert("alert-error","Please select time zone.")	
                return;	
            }
        }
        // Set Message
        if($scope.badge==true){
            if(isPushEventTrack){
                console.log("Push Traking Enable with Badge")
                pushRequestModel.setMessage(getMessageFormatForTrakingWithBadge());
            }else{
                console.log("Push Traking Disable with Badge")
                pushRequestModel.setMessage(getMessageFormat());
            }
        }else{
            if(isPushEventTrack){
                console.log("Push Traking Enable without Badge")
                console.log(getMessageFormatForTraking())
                pushRequestModel.setMessage(getMessageFormatForTraking());
            }else{
                console.log("Push Traking Disable without Badge")
                pushRequestModel.setMessage($scope.message);
            }
        }
        // Set Schedule 
        if($scope.sendAt==false){
            var sendNow = $("#datetimepicker11").val();
            
            if(sendNow != '' || sendNow != undefined){
                pushRequestModel.setPushDate(sendNow);
                pushRequestModel.setSendNow(false);
                pushRequestModel.setScheduleTime($scope.getTimeZones);
            }
        }
        // Set type
       
        pushRequestModel.setType($scope.sendType)
        var jsonReq = JSON.stringify(pushRequestModel);
        var redirectFrom = $("#redirectFrom").val()
        if(redirectFrom == "campaign"){
            pushDataConfiguration = {
                appId:pushRequestModel.id,
                message:pushRequestModel.message,
                lang:pushRequestModel.lang,
                badgeNSound:pushRequestModel.badgeNSound,
                badgeType:pushRequestModel.badgeType,
                sound:pushRequestModel.sound,
                type:pushRequestModel.type,
                badge:pushRequestModel.badge
            }
            $("#triggerAction_modalForEvent").modal('hide');
            return;
        }
        var res = dataService.sendPushEventQuery(jsonReq);
        $("#succeessMessageForAllTriggerId").show(); 
        $scope.responseMessage = res;
        setTimeout(function(){
            $('#succeessMessageForAllTriggerId').slideUp("slow")
            $("#triggerAction_modalForEvent").modal('hide');
        },2000)
        resetPushModel(); 
      
    }
    // Manipulation of Message
    function getMessageFormat(){
        var JSONObj ={};
        if($scope.badgeType=="NONE"){
            JSONObj = {
                alert:$scope.message,
                sound:getSound()
                
            }
            return  JSONObj
        }else if($scope.badgeType=="AUTO"){
            JSONObj = {
                alert:$scope.message,
                badge: "increment",
                sound:getSound()
            }
            return JSONObj
        }else if($scope.badgeType=="CUSTOM"){
            JSONObj = {
                alert:$scope.message,
                badge:$scope.badgeNo,
                sound:getSound()
            }
            return  JSONObj
        }
    }
    // Manipulation of Message with traking with Badge and sound
    function getMessageFormatForTrakingWithBadge(){
        var name = $("#name").val();
        var JSONObj ={};
        if($scope.badgeType=="NONE"){
            JSONObj = {
                alert:$scope.message,
                sound:getSound(),
                _App42CampaignName:name,
                _App42Convert:true,
            }
            return  JSONObj
        }else if($scope.badgeType=="AUTO"){
            JSONObj = {
                alert:$scope.message,
                badge: "increment",
                sound:getSound(),
                _App42CampaignName:name,
                _App42Convert:true,
            }
            return JSONObj
        }else if($scope.badgeType=="CUSTOM"){
            JSONObj = {
                alert:$scope.message,
                badge:$scope.badgeNo,
                sound:getSound(),
                _App42CampaignName:name,
                _App42Convert:true,
            }
            return  JSONObj
        }
    }
    // Manipulation of Message when traking
    function getMessageFormatForTraking(){
        var name = $("#name").val();
        var JSONObj ={};
        JSONObj = {
            alert:$scope.message,
            _App42CampaignName:name,
            _App42Convert:true,
        }
        return JSONObj;
    }
    function getSound(){
        var sound;
        if($scope.soundTextField){
            sound =$scope.soundTextField 
        }else{
            sound ="Default" 
        }
        return sound;
    }
    
    //   For restting push Model 
    function resetPushModel(){
        pushRequestModel.setLang("English")	
        pushRequestModel.setBadgeNSound(false)	
        pushRequestModel.setSendNow(true)	
        pushRequestModel.setMessage("")	
        pushRequestModel.setBadgeType("None")	
        pushRequestModel.setSound("None")	
        pushRequestModel.setPushDate("")
    }
    
    //  For restting email Model 
    function resetEmailModel(){
        emailRequestModel.setUserBase(true)	
        emailRequestModel.setSendNow(true)	
        emailRequestModel.setSendDate("")
    }
    
    //  For restting wallPost Model 
    function resetWallPostModel(){
        wallPostRequestModel.setSendNow(true)	
        wallPostRequestModel.setSendDate("")
    }
    
    /*Push Notification End*/
 
    /*Email Service Start*/

    $scope.showEmailDate= function(){
        var sendAt = $scope.sendAt
        if(sendAt != true){
            $("#emailDateId").show()
            $scope.zones = getZones()
        }else{
            $("#emailDateId").hide()
        }
    }
     $scope.showEmailDateBasic= function(){
        var sendAt = $scope.sendAtBasic
        console.log("sendAt",sendAt)
        if(sendAt != true){
            $("#emailDateIdBasic").show()
            $scope.zones = getZones()
        }else{
            $("#emailDateIdBasic").hide()
        }
    }
    //    $scope.changeUserBase = function(){
    //        if($scope.userBase =="true"){
    //    		
    //        }else{
    //    		
    //        }
    //    }
    
    
    $scope.sendEmailForm = function(){
        setTimeout(function(){
            $("#warningMessageId").show();
        }, 100);
        console.log("open send Email")
        $scope.sendAt = true
        $("#subjectId").val("");
        $("#emailDateId").hide()
        $("#selDiv").val("")
        $scope.userBase = "";
        $scope.ckEditors = [];
        CKEDITOR.instances.editor1.setData("")
        $("#datetimepicker122").val("");
        $scope.getTimeZones= null
        $http({
            method: "POST",
            params:{
                appId:eventReq.id
            },
            url: '../email/getEmailsForEvent'
        }).success(function(data, status) {
            var emailResponse = data;
            $scope.emails = emailResponse
            if(emailResponse.length == undefined  || emailResponse.length==0){
                var responseText = "Please create email configuration ."
                $scope.responseInfoMessage = responseText
            }else{
                //$("#warningMessageId").show(); 
                $("#warningMessageId").hide(); 
               
            }
               
        }).error(function(data, status) {
            //sendEmailForm
            })
        $http({
            method: "POST",
            params:{
                appId:eventReq.id
            },
            url: '../email/getEmailsForMailGun'
        }).success(function(data, status) {
            var emailMailGun = data;
            $scope.mailGunEmails = emailMailGun
            if(emailMailGun.length == undefined  || emailMailGun.length==0){
                var responseText = "Please create email configuration ."
                $scope.responseInfoMessage = responseText
            }else{
                //$("#warningMessageId").show(); 
                $("#warningMessageId").hide(); 
                
            }
               
        }).error(function(data, status) {
            //sendEmailForm
            })
    ////////////////////////
    }
    //Dollar Code Starts
    $scope.getEmailForm = function(provider){
        console.log("in get Email")
        if(provider == "app42"){
            $http({
                method: "POST",
                params:{
                    appId:eventReq.id
                },
                url: '../event/getEmailsForEvent'
            }).success(function(data, status) {
                var emailResponse = data;
                $scope.emails = emailResponse
                if(emailResponse.length == undefined  || emailResponse.length==0){
                    $("#warningMessageId").hide(); 
                    var responseText = "Please create email configuration ."
                    $scope.responseInfoMessage = responseText
                }else{
                //$("#warningMessageId").show(); 
                }
                   
            }).error(function(data, status) {
                	
                })
        }else if(provider == "Mail GUN"){
            $http({
                method: "POST",
                params:{
                    appId:eventReq.id
                },
                url: '../email/getEmailsForMailGun'
            }).success(function(data, status) {
                var emailMailGun = data;
                $scope.mailGunEmails = emailMailGun
                if(emailMailGun.length == undefined  || emailMailGun.length==0){
                    $("#warningMessageId").hide(); 
                    var responseText = "Please create email configuration ."
                    $scope.responseInfoMessage = responseText
                }else{
                //$("#warningMessageId").show(); 
                }
                   
            }).error(function(data, status) {
                	
                })
        }else{
       
        }
           
            
    ////////////////////////
    } 
     
     
    //$ Code Ends
     
    ////////////For Sending Email //////////////
 
    $scope.sendEmailFromEvent = function(){
        var redirectFrom = $("#redirectFrom").val()
        console.log("Email Campaign Finish")
        if(redirectFrom == "campaign"){
            if( $scope.provider == undefined || $scope.provider == ''){
                customAlert("alert-error","Please select Provider.")
                return;
            }
            if( $scope.provider == 'app42') {
                if( $scope.getEmails == undefined || $scope.getEmails == ''){
                    customAlert("alert-error","Please add Email.")
                    return; 
                }
            }
            if( $scope.provider == 'Mail GUN' ){
                if( $scope.getMailGunEmails == undefined || $scope.getMailGunEmails == ''){
                    customAlert("alert-error","Please add Email.")
                    return; 
                }
            }
        }
      
        if($scope.selDiv == 'userProperty' ){
            if( $("#propertyName".val) == undefined){
                customAlert("alert-error","Please add property name.")
                return; 
            }
        }
        
       
        if($scope.subject == undefined || $scope.subject.trim() == ''){
            customAlert("alert-error","Please Enter Subject")
            return;
        }
      
        // validate scheduled Date and Time
        if($scope.sendAt != true){
            var date = $("#datetimepicker122").val()
            if(date == null || date == undefined || date == ""){
                customAlert("alert-error","Please select scheduled date.")	
                return;	
            }
            if($scope.getTimeZones == "" || $scope.getTimeZones == undefined){
                customAlert("alert-error","Please select time zone.")	
                return;	
            }
        }
       
        var content = CKEDITOR.instances.editor1.getData();
        if(content == null || content == undefined || content == ""){
            $("#succeessMessageForAllTriggerId").show(); 
            $scope.responseMessage = "Please enter content";
            setTimeout(function(){
                $('#succeessMessageForAllTriggerId').slideUp("slow")
            },2000)
            return
        }else{
            $("#succeessMessageForAllTriggerId").hide(); 
        }
        
        //        if(validateCKEDITORforBlank($.trim(CKEDITOR.instances.editor1.getData().replace(/<[^>]*>|\s/g, '')))){
        //            $("#succeessMessageForAllTriggerId").show(); 
        //            $scope.responseMessage = "Please enter content";
        //            setTimeout(function(){
        //                $('#succeessMessageForAllTriggerId').slideUp("slow")
        //            },2000)
        //            return
        //        }else{
        //            $("#succeessMessageForAllTriggerId").hide(); 
        //        }
     
        // Set SendFrom
        emailRequestModel.setSendFrom($scope.getEmails.name)
        // Set Subject
        emailRequestModel.setSubject($scope.subject)
        // Set Content
        emailRequestModel.setContent(content)
        // Set User Base
        emailRequestModel.setUserBase($scope.userBase)
        // Set Schedule 
        if($scope.sendAt==false){
            var sendNow = $("#datetimepicker122").val();
            
            if(sendNow != '' || sendNow != undefined){
                emailRequestModel.setSendDate(sendNow);
                emailRequestModel.setSendNow(false);
                emailRequestModel.setScheduleTime($scope.getTimeZones);
            }
        }
        var jsonReq = JSON.stringify(emailRequestModel);
        var redirectFrom = $("#redirectFrom").val()
        if(redirectFrom == "campaign"){
            if($scope.provider == 'app42' && $scope.userBase == "userProperty"){
                emailDataConfiguration = {
                    appId:emailRequestModel.id,
                    //sendFrom:$scope.getEmails.name,
                    subject:$scope.subject,
                    content:content,
                    userBase:$scope.userBase,
                    provider:$scope.provider,
                    propertyName:$scope.propertyName,
                    emailConfID:$scope.getEmails.id
                }
            }
            else if($scope.provider == 'Mail GUN' && $scope.userBase == "userProperty"){
                emailDataConfiguration = {
                    appId:emailRequestModel.id,
                    //sendFrom:$scope.getEmails.name,
                    subject:$scope.subject,
                    content:content,
                    userBase:$scope.userBase,
                    provider:$scope.provider,
                    propertyName:$scope.propertyName,
                    emailConfID:$scope.mailGunEmails[0].id
                }
            }
            else if($scope.provider == 'app42' && $scope.userBase != "userProperty"){
                emailDataConfiguration = {
                    appId:emailRequestModel.id,
                    //sendFrom:$scope.getEmails.name,
                    subject:$scope.subject,
                    content:content,
                    userBase:$scope.userBase,
                    provider:$scope.provider,
                    emailConfID:$scope.getEmails.id
                }
            }
            else if($scope.provider == 'Mail GUN' && $scope.userBase != "userProperty"){
                emailDataConfiguration = {
                    appId:emailRequestModel.id,
                    //sendFrom:$scope.mailGunEmails[0].name,
                    subject:$scope.subject,
                    content:content,
                    userBase:$scope.userBase,
                    provider:$scope.provider,
                    emailConfID:$scope.mailGunEmails[0].id
                }
            
            
            }else{
                console.log("no Selected value")
            }
            $("#triggerAction_modalForEvent").modal('hide');
            return;
        }
        var res = dataService.sendEmailByEventQuery(jsonReq);
       
        $("#succeessMessageForAllTriggerId").show(); 
        $scope.responseMessage = res;
        setTimeout(function(){
            $('#succeessMessageForAllTriggerId').slideUp("slow")
            $("#triggerAction_modalForEvent").modal('hide');
        },2000)
    //resetEmailModel();
    }
 
    /* validation for CKEditor */

    function validateCKEDITORforBlank(field){
        var vArray = new Array();
        vArray = field.split("&nbsp;");

        var vFlag = 0;
        for(var i=0;i<vArray.length;i++){
            if(vArray[i] == '' || vArray[i] == ""){
                continue;
            }else{
                vFlag = 1;
                break;
            }
        }

        if(vFlag == 0){
            return true;
        }else{
            return false;
        }
    }  
    /*Email Service End*/
    
    /*Wall Post Start*/

    $scope.showWallPostDate= function(){
        var sendAt = $scope.sendAt
        if(sendAt != true){
            $("#wallPostDateId").show()
            $scope.zones = getZones()
	  	
        }else{
            $("#wallPostDateId").hide()
        }
    }
 
    $scope.wallPostForm = function(){
        $scope.sendAt = true  
        $("#linkId").val("");
        $("#messageIdWallPost").val("");
        $scope.pictureurl = '';
        $("#pictureurlId").val("");
        $("#fileNameId").val("");
        $("#descriptionId").val("");
        $("#wallPostDateId").hide()
        $("#datetimepicker123").val("");
        $scope.getTimeZones= null;
        $("#pictureDetails").hide();
    }
    
    $scope.onKeyup = function (evt){
        if($scope.pictureurl != undefined && $scope.pictureurl.trim() != ''){
            $("#pictureDetails").show();
        }else{
            $("#pictureDetails").hide();	 
        }
    }
    ////////////For Sending Email //////////////
 
    $scope.wallPostFromEvent = function(){
        // validate link
        if( $scope.link == undefined || $scope.link.trim() == ''){
            $("#linkId").val("");
            $("#linkId").attr("required", "true")
            return;
        }
        // validate wallMessage
        if( $scope.wallMessage == undefined || $scope.wallMessage.trim() == ''){
            $("#messageIdWallPost").val("");
            $("#messageIdWallPost").attr("required", "true")
            return;
        }
        // validate picture URL
        if( $scope.pictureurl != undefined && $scope.pictureurl.trim() != ''){
            var fileName =$scope.fileName
            var description =$scope.description
            if(fileName == undefined || fileName == null || fileName == ""){
                customAlert("alert-error","Please enter file name.")	
                return;	
            }
            if(description == undefined || description == null || description == ""){
                customAlert("alert-error","Please enter description.")	
                return;	
            }
        }
        // validate scheduled Date and Time
        if($scope.sendAt != true){
            var date = $("#datetimepicker123").val()
            if(date == null || date == undefined || date == ""){
                customAlert("alert-error","Please select scheduled date.")	
                return;	
            }
            if($scope.getTimeZones == "" || $scope.getTimeZones == undefined){
                customAlert("alert-error","Please select time zone.")	
                return;	
            }
        }
        // Set Content
        wallPostRequestModel.setContent(getContent())
        // Set Schedule 
        if($scope.sendAt==false){
            var sendNow = $("#datetimepicker123").val();
            
            if(sendNow != '' || sendNow != undefined){
                wallPostRequestModel.setSendDate(sendNow);
                wallPostRequestModel.setSendNow(false);
                wallPostRequestModel.setScheduleTime($scope.getTimeZones);
            }
        }
        var jsonReq = JSON.stringify(wallPostRequestModel);
        var redirectFrom = $("#redirectFrom").val()
        if(redirectFrom == "campaign"){
            fbDataConfiguration = {
                appId:wallPostRequestModel.id,
                content:wallPostRequestModel.content
                
            }
            $("#triggerAction_modalForEvent").modal('hide');
            return;
        }
        var res = dataService.wallPostEventQuery(jsonReq);
       
        $("#succeessMessageForAllTriggerId").show(); 
        $scope.responseMessage = res;
        setTimeout(function(){
            $('#succeessMessageForAllTriggerId').slideUp("slow")
            $("#triggerAction_modalForEvent").modal('hide');
        },2000)
        resetWallPostModel();
    }
	
    // Manipulation of WallPost Content
    function getContent(){
        var JSONObj ={};
        if($scope.pictureurl){
            JSONObj = {
                link:$scope.link,
                message:$scope.wallMessage,
                picture :$scope.pictureurl,
                description:$scope.description,
                name:$scope.fileName
            }
            return  JSONObj
        }else{
            JSONObj = {
                link:$scope.link,
                message:$scope.wallMessage
            }
            return JSONObj
        }
    }
    /*Wall Post End*/

 
    
    var queries1 = dataService.setBookMarkedQueries1(eventReq.id,"EVENT")
    $scope.queries1 = queries1.name 
    // New Segmentation 
    var queriesSegAdv = dataService.setBookMarkedQueriesAdv(eventReq.id)
    $scope.queriesAdv = queriesSegAdv 
    
    $scope.getBookMarkAdv = function(){
        var qName = $scope.bookMarkedQueryAdv
        if(qName != null){
            showLoad()
            $http({
                method: "post",
                params: {
                    id:eventReq.id,
                    "qName":qName
                },
                url: '../event/fetchBookMarkedSelectQuery'
            }).success(function(data, status) {
                hideLoad() 
                $rootScope.$broadcast('setSegmentation', data.events[0]);
            		  
            }).error(function(data, status) {
                // Some error occurred
                hideLoad() 
            });
              
        }
    }
    
    $scope.getBookMark = function(flagReset){
        $("#helpBtn").show()
        var currentPath = $location.path()
        $("#sub-PropertyOpt1").hide()
        $("#sub-PropertyOpt2").hide()
        $("#propAnchToggle").show()
        $("#delQueryBtn").hide()
        $("#eventDiv").show()
        $("#eventqq").hide()
        $("#applyPropBtn").show()
        $("#cancelPropBtn").show()
        $("#propertyEventBox").hide(700)
        $("#propAnchToggle").html("Add Properties &#x25B2;")
        $("#propAnchToggle").removeClass("ACTIVE").addClass("INACTIVE")
        $("#property1").attr("readonly",false)
        $("#property2").attr("readonly",true)
        $scope.property1 = ""
        $scope.property2 = ""
        $scope.subProperty1 = ""
        $scope.subProperty2 = ""
        $("#sub-property1").attr("readonly",false)
        $("#sub-property2").attr("readonly",false)
        $("#sub-property1").find('option:gt(0)').remove();
        $("#sub-property2").find('option:gt(0)').remove();
        properties = []  
        eventReq.setProperties(properties)
        $("#eventDiv").empty()
        if(currentPath == "/trending/"){
            $('#eventDiv').append('<input type="text" value="" id="event" class="clsD" />'); 
            var range = $("#range");
        }else if(currentPath == "/dau/"){
            var range = $("#rangeDau");
            $('#eventDiv').append('<input type="text" value="" id="eventDailyU" class="clsD" />'); 
        }
        
        //initializeEvents(getUnique(cleanedEvents),unCleanedEvents)
        events = []
        eventReq.setEvents(events)
        var qName = $scope.bookMarkedQuery1
        
        if(flagReset == true){
            qName = null;   
        }
        if(qName != null){
            $("#helpBtn").hide()
            showLoad()
            $http({
                method: "post",
                params: {
                    id:eventReq.id,
                    "qName":qName,
                    "type":eventReq.type
                },
                url: '../event/getMarkedQueriesForApp'
            }).success(function(data, status) {
                $("#delQueryBtn").show()
                $("#saveQueryBtn").hide()
                $("#propAnchToggle").hide()
                $("#eventDiv").hide()
                $("#eventqq").show()
                $("#applyPropBtn").hide()
                $("#cancelPropBtn").hide()
                range.data('daterangepicker').setStartDate(data.stDate)
                range.data('daterangepicker').setEndDate(data.endate)
                range.val(data.stDate+" - "+data.endate)
                eventReq["start"] = data.stDate
                eventReq["end"] = data.endate
                $('#eventqq ul').empty();
                for (i = 0; i < data.events.length; i++) {
                    var text = data.events[i]
                    $('#eventqq ul').append('<li><span>'+text+'</span></li>');
                }
                events = []
                if(data.events.length != 0){
                    $.each(data.events, function (i, item) {
                        events.push(item);
                    });  
                }
                eventReq.setEvents(events)
                if(data.P1 != null && data.V1 != null){
                    var pMath1 = null
                    if(data.pMathOPeration1 != null){
                        pMath1 = data.pMathOPeration1
                        $("#sub-PropertyOpt1").show()
                        $("#sub-PropertyOpt1").append('<option selected="selected">'+ pMath1+'</option>');
                        $("#sub-PropertyOpt1").attr("readonly",true)
                        $("#overLayDiv1").show()
                    }
                    properties = []                   
                    properties.push({
                        propertyName:data.P1,
                        propertyType:data.T1,
                        propertyValue:data.V1,  
                        propertyMathOperation:pMath1  
                    })
                   
                    $("#propertyEventBox").show(700)
                    $("#propAnchToggle").html("Add Properties &#x25BC;")
                    $("#propAnchToggle").removeClass("INACTIVE").addClass("ACTIVE") 
                    $scope.property1 = data.P1
                    $('#sub-property1').append('<option selected="selected">'+ data.V1+'</option>');  
                    $("#property1").attr("readonly",true)
                    $("#sub-property1").attr("readonly",true)
                    if(data.P2 != null && data.V2 != null){
                        var pMath2 = null
                        if(data.pMathOPeration2 != null){
                            pMath2 = data.pMathOPeration2
                            $("#sub-PropertyOpt2").show()
                            $("#sub-PropertyOpt2").append('<option selected="selected">'+ pMath2+'</option>');
                            $("#sub-PropertyOpt2").attr("readonly",true)
                            $("#overLayDiv").show()
                        }
                        properties.push({
                            propertyName:data.P2,
                            propertyType:data.T2,
                            propertyValue:data.V2,
                            propertyMathOperation:pMath2
                        })
                        
                        $scope.property2 = data.P2
                        $('#sub-property2').append('<option selected="selected">'+ data.V2+'</option>'); 
                        $("#property2").attr("readonly",true)
                        $("#sub-property2").attr("readonly",true)
                    }
                    $("#sub-property2").attr("readonly",true)
                    hideLoad() 
                    eventReq.setProperties(properties)
                    if(properties.length == 2){
                        
                        if(properties[1].propertyMathOperation =="Count" && properties[1].propertyValue =="all"){
                            eventReq.setChartType("PIE") 
                            applyPropsFilterPie()   
                        }else if(properties[1].propertyMathOperation =="Count" && properties[1].propertyValue !="all"){
                            eventReq.setChartType("LINE") 
                            applyPropsFilterLine()
                        }
                        else{
                            eventReq.setChartType("LINE") 
                            applyLineWithOtherOperation() 
                        }
                    }else{
                        if(properties[0].propertyMathOperation =="Count" && properties[0].propertyValue =="all"){
                            eventReq.setChartType("PIE") 
                            applyPropsFilterPie()   
                        }else if(properties[0].propertyMathOperation =="Count" && properties[0].propertyValue !="all"){
                            eventReq.setChartType("LINE") 
                            applyPropsFilterLine()
                        }
                        else{
                            eventReq.setChartType("LINE") 
                            applyLineWithOtherOperation() 
                        } 
                    }
                }else{
                    eventReq.setChartType("LINE")
                    hideLoad()
                    ajaxLoadChart()
                }
               
               
            }).error(function(data, status) {
                // Some error occurred
                hideLoad() 
            });
            
        }else{
            $.cookie("isPluginView", "no");
            hideLoad()
            $("#delQueryBtn").hide()
            $scope.property1 = ""
            $scope.property2 = ""
            $("#sub-property1").find('option:gt(0)').remove();
            $("#sub-property2").find('option:gt(0)').remove();
            properties = []
            events = []
            if(currentPath == "/trending/"){
                $location.path('/trending');
            }else if(currentPath == "/dau/"){
                $location.path('/dau');
            }
           
        }
    }
    
    var funnelQ = dataService.setFunnelQuery(eventReq.id)
    $scope.queries2 = funnelQ.funnelName
   
   
    $scope.getFunnel = function(flagReset){
        $("#helpBtn").show()
        
        var range = $('#rangeFunnel');
        $("#infoMsg").hide()
        var fName = $scope.funnelQueries
        $("#flip").hide()
        $("#funnelNameData").hide()
        $("#propAnchToggle").show()
        $("#applyPropBtn").show()
        $("#cancelPropBtn").show()
        $("#eventDiv").show()
        $("#eventqq").hide()
        $("#propertyEventBox").hide(700)
        $("#propAnchToggle").html("Add Properties &#x25B2;")
        $("#propAnchToggle").removeClass("ACTIVE").addClass("INACTIVE")
        // $scope.totalProps = cleanedProperties
        $("#property1").attr("readonly",false)
        $("#property2").attr("readonly",true)
        $scope.property1 = ""
        $scope.property2 = ""
        $("#sub-property1").attr("readonly",false)
        $("#sub-property1").find('option:gt(0)').remove();
        $("#sub-property2").find('option:gt(0)').remove();
        properties = []  
        eventReq.setProperties(properties)
        $("#eventDiv").empty()
        $('#eventDiv').append('<input type="text" value="" id="eventFunnel" class="clsD" />');
        //initializeEventsForFunnel(getUnique(cleanedEvents),unCleanedEvents)
        events = []
        //events.push(totalEvents[0])
        eventReq.setEvents(events)
        $("#FunnelDelete").hide()
        if(flagReset == true){
            fName = null;   
        }
        if(fName != null){
            $("#helpBtn").hide()
            showLoad()
            $http({
                method: "post",
                params: {
                    id:eventReq.id,
                    "fName":fName
                },
                url: '../event/getFunnelQuery'
            }).success(function(data, status) {
                $("#FunnelDelete").show()
                $("#propAnchToggle").hide()
                $("#applyPropBtn").hide()
                $("#cancelPropBtn").hide()
                $("#eventDiv").hide()
                $("#eventqq").show()
                
                range.data('daterangepicker').setStartDate(data.stDate)
                range.data('daterangepicker').setEndDate(data.endate)
                range.val(data.stDate+" - "+data.endate)
                eventReq["start"] = data.stDate
                eventReq["end"] = data.endate
                // $("#eventFunnelqq").val(data.funnelEvents)
                $('#eventqq ul').empty();
                for (i = 0; i < data.funnelEvents.length; i++) {
                    var text = data.funnelEvents[i]
                    $('#eventqq ul').append('<li><span>'+text+'</span></li>');
                }
                events = []
                if(data.funnelEvents.length != 0){
                    $.each(data.funnelEvents, function (i, item) {
                        events.push(item);
                    });  
                }
                eventReq.setEvents(events)
                if(data.funnelP1 != null && data.funnelV1 != null){
                    properties = []                   
                    properties.push({
                        propertyName:data.funnelP1,
                        propertyType:data.funnelT1,
                        propertyValue:data.funnelV1  
                    })
                   
                    $("#propertyEventBox").show(700)
                    $("#propAnchToggle").html("Add Properties &#x25BC;")
                    $("#propAnchToggle").removeClass("INACTIVE").addClass("ACTIVE") 
                    $scope.property1 = data.funnelP1
                    $('#sub-property1').append('<option selected="selected">'+ data.funnelV1+'</option>');  
                    $("#property1").attr("readonly",true)
                    $("#sub-property1").attr("readonly",true)
                    if(data.funnelP2 != null && data.funnelV2 != null){
                        properties.push({
                            propertyName:data.funnelP2,
                            propertyType:data.funnelT2,
                            propertyValue:data.funnelV2  
                        })
                        
                        $scope.property2 = data.funnelP2
                        $('#sub-property2').append('<option selected="selected">'+ data.funnelV2+'</option>'); 
                        $("#property2").attr("readonly",true)
                        $("#sub-property2").attr("readonly",true)
                    }
                    hideLoad() 
                    eventReq.setProperties(properties)
                    eventReq.setChartType("FUNNEL") 
                    applyPropsFilterFunnel()
                }else{
                    hideLoad() 
                    ajaxLoadChart(); 
                }
                 
               
            }).error(function(data, status) {
                // Some error occurred
                hideLoad() 
            });   
        }else{
            $.cookie("isPluginView", "no");
            range.val(moment().utc().subtract('days', 6).format('YYYY-MM-DD')+" - "+moment().utc().format('YYYY-MM-DD'))
            eventReq["start"] = moment().utc().subtract('days', 6).format('YYYY-MM-DD')
            eventReq["end"] = moment().utc().format('YYYY-MM-DD')
            // ajaxLoadChart();
            $("#noData").show()
            $("#chart").hide()
            $location.path('/funnel');
           
        }
        
    }
    $scope.$on('tabChange', function(event, data) { 
        $scope.tabs.length = 0
        $scope.tabs=data
        
    });
    $scope.$on('setPushConfiguration', function(event, data) { 
        $scope.badge=false
        $scope.badgeType = 'NONE';
        $scope.sendType = 'All';
        $scope.lang = true
        $scope.sendAt = true
        $scope.sound = "default";
        $("#badgeDetails").hide()
        $("#badgeNoDisplayId").hide()
        $("#soundDisplayId").hide()
        $("#pushDateId").hide()
        $("#soundTextFieldId").hide()
        $scope.badgeNo = 1;
        
        if(data.message != undefined && data.message.alert != undefined){
            $scope.message = data.message.alert   
        }else{
            $scope.message = data.message 
        }
        $scope.sendType = data.type
        if(data.badgeNSound == true){
            $scope.badge=true
            $("#badgeDetails").show()
            $("#soundDisplayId").show()
            $scope.badgeType = data.badgeType
            if($scope.badgeType == "CUSTOM"){
                $scope.badgeNo = data.message.badge
                pushRequestModel.setBadge(data.message.badge)
                $("#badgeNoDisplayId").show()
            }else{
                $scope.badgeNo = 1
                pushRequestModel.setBadge($scope.badgeNo)
                $("#badgeNoDisplayId").hide()
            }
            $scope.sound = data.sound
            if($scope.sound == "addNew"){
                $("#soundTextFieldId").show()
                $scope.soundTextField =  data.message.sound
            }else{
                $("#soundTextFieldId").hide()
            }
        }
        if(data.lang == "English"){
            $scope.lang = true  
        }else{
            $scope.lang = false  
        }
        
        
    });
    //    $scope.$on('setFbConfiguration', function(event, data) {
    //        console.log(data)
    //        $scope.sendAt = false
    //        $("#linkId").val()
    // 
    //    });
    
    $scope.openAddEventBox = function(){
        x = 0;
        $.trim($("#eventName").val(""))
        $("#error_E").hide()
        $("#error_P").hide()
        var allInputDiv = $("#eventPropertyBox").children(".groupInput1")
        if(allInputDiv.length != 0){
            $("#eventPropertyBox").empty()  
        }
        $("#addEvent_testModelBox").modal('show');
    
    }
    var x = 0;
    var max_fields  = 5;
    $("#add_sampleProperties").click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $("#eventPropertyBox").append('<div class="groupInput1 addPropPopup" id="prop_'+$scope.x+'"><input type="text" name="mytext" id="myId'+x+'" placeholder="Property Name"/><input type="text" name="mytextVal'+x+'" id="myIdVal'+x+'" placeholder="Property Value"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
        }
    });
    $("#eventPropertyBox").on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault();
        
        $(this).parent('div').remove();
        x--;
    })
    
    $scope.saveEventProperty = function (){
        showLoad()
        $("#error_E").hide()
        $("#error_P").hide()
        error = "false"; 
        var eventName = $.trim($("#eventName").val())
        var allInputDiv = $("#eventPropertyBox").children(".groupInput1")
        var inputValues1 = []
        $('.groupInput1 input').each(function() {
            var input = $(this);
            if(input.val() != "" && input.val()!= null){
                inputValues1.push(input.val())    
            }
        })
        if(allInputDiv.length != 0){
            if(2*(allInputDiv.length) != inputValues1.length){
                var errorMsg = "Property details are mandatory.<br />";
                $("#error_P").show();
                $("#error_P").html(errorMsg);
                error = "true";   
            }
        }
        if(eventName.length == 0){
            var errorMsg = "Event Name are mandatory.<br />";
            $("#error_E").show();
            $("#error_E").html(errorMsg);
            error = "true"; 
        }
        if(error=="true")
        {
            hideLoad()
            return false;  
        }else{
            var properties = {};
            var NoOfLoops = inputValues1.length
            for(i=0;i<NoOfLoops;i=i+2){
                properties[inputValues1[i]] = inputValues1[i+1]
            }
            $scope.testTrackEvent(eventName,properties) 
        // return true;
        }
        
    }
    
    $scope.testTrackEvent =  function (eventName,properties) {
        var event = new App42Event();  
        event.trackEvent(eventName, properties, {      
            success: function (object) {
                var eventAuthObj = JSON.parse(object)
                hideLoad();
                $("#addEvent_testModelBox").modal('hide');
                $scope.eventClient(eventName)
            },
            error: function (error) {
                hideLoad();
                var errorObj = JSON.parse(error)
                console.log("errorsr Obj :: " + errorObj);
                if(errorObj.app42Fault.appErrorCode == 1402){
                    customAlert("alert-error","Please Enable Your App Analytics State.")	
                }else{
                    customAlert("alert-error","Something went wrong.Try after some time.")	
                }
                $("#addEvent_testModelBox").modal('hide');
                
                
            }
        });
    }
    
    $scope.eventClient = function(eValue){
        $("#event").val("")
        var eventObj = dataService.setTrendingEvents(eventReq.id)
        var totalEventsObj = dataService.setTotalEvents(eventReq.id)
        var totalPropsObj = dataService.setTotalProps(eventReq.id)
        $scope.$broadcast("callInitialMethods");
    }
    
    
    mianControllersIns = $scope;
});
// revenue section
appHq.controller("revenueController", function($scope, $rootScope, $http,$location) {
    $("#bookMarkedQueries1").hide()
    $("#funnelQueries").hide()
    $("a.active").removeClass("active");
    $("#revenueMenu").addClass("active");
    $("#noData").hide();  
    $("#bookMarkedQueries").hide(); 
    eventReq.setType("REVENUE")
});

// profiling section
appHq.controller("profilingController", function($scope, $rootScope, $http,$location) {
    $("#bookMarkedQueries1").hide()
    $("#funnelQueries").hide()
    $("a.active").removeClass("active");
    $("#profilingMenu").addClass("active");
    $("#noData").hide();
    $("#bookMarkedQueries").hide(); 
    eventReq.setType("PROFILING")
});


function initializeEventClient(id,appsArray){
    var result = $.grep(appsArray, function(e){
        if(e.id == id){
            return e
        }
    });
    App42.setEventBaseUrl("https://analytics.shephertz.com/cloud/1.0/");
    App42.initialize(result[0].apiKey,result[0].secretKey);
    App42.enableEventService(true);
    
}



//function getEmailFromEvent(){
//    $.ajax({
//        type: "POST", //rest Type
//        dataType: 'JSON', //mispelled
//        url: '../email/getEmailsForEvent',
//        async: false,
//        contentType: "",
//        data: {
//            appId: eventReq.id
//        } ,
//        success: function (data, status) {
//            var emailResponse = data;
//            emails = emailResponse;
//            if(emailResponse.length == undefined  || emailResponse.length==0){
//                $("#warningMessageId").show(); 
//                var responseText = "Please create email configuration ."
//                responseInfoMessage = responseText
//            }else{
//                $("#warningMessageId").hide(); 
//            }
//        }
//    });
//    
//    $.ajax({
//        type: "POST", //rest Type
//        dataType: 'JSON', 
//        url: '../email/getEmailsForMailGun',
//        async: false,
//        contentType: "",
//        data: {
//            appId: eventReq.id
//        } ,
//        success: function (data, status) {
//            var emailMailGun = data;
//            mailGunEmails = emailMailGun
//            if(emailMailGun.length == undefined  || emailMailGun.length==0){
//                $("#warningMessageId").show(); 
//                var responseText = "Please create email configuration ."
//                responseInfoMessage = responseText
//            }else{
//                $("#warningMessageId").hide(); 
//            }
//        }
//    });
//    
//    
//    
//}