/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 19 Sep 2014
 * @version 1.0
 */

// Event section
var eventControllerIns;
appHq.controller("eventController", function($scope, $rootScope, $http,dataService,$parse,$location,$log,eventDataPieService,$route) {
    $scope.callInitialMethods = function (){
        mianControllersIns.bookMarkedQuery1 = ""
        eventControllerIns = $scope;
        $scope.queries1.length = 0
        var queries1 = dataService.getBookMarkedQueries1()
        $.each(queries1.name, function( index, value ) {
            $scope.queries1.push(value)
        });
        // For Total Events Pie Graph
        //    $http
        //    .get('../event/getTotalEvents', {
        //        params: {
        //            id: eventReq.id
        //        }
        //    })
        //    .success(function (data,status) {
        //        $("#loadingImageDiv").hide()
        //        var totalEvents = data
        //        var totalPieData = []
        //        var total =0 
        // 
        //        $.each( totalEvents, function( index, value ){
        //            total += value.count;
        //        });
        //
        //        $.each( totalEvents, function( index, value ){
        //            var totalEventPercentage = (totalEvents[index].count/total)*100
        //            var myValue = [totalEvents[index].name,totalEventPercentage,totalEvents[index].count]
        //            totalPieData.push(myValue)
        //        });
        //        drawTotalEventPieChart(totalPieData,"Event")
        //        // This For Total Event Count 
        //        $scope.totalEventsCount = totalEvents.length
        //       
        //    });
        var promise = eventDataPieService.setAllEvents()
        promise.then(
            function(payload) {
                var totalEvents = payload.data
                $("#loadingImageDiv").hide()
                var totalPieData = []
                var total =0 
                $.each( totalEvents, function( index, value ){
                    total += value.count;
                });
                $scope.totalEventsCount = total
                $.each( totalEvents, function( index, value ){
                    var totalEventPercentage = (totalEvents[index].count/total)*100
                    var myValue = [totalEvents[index].name,totalEventPercentage,totalEvents[index].count]
                    totalPieData.push(myValue)
                });

            },
            function(errorPayload) {
                $log.error('failure ', errorPayload);
            }); 
        //var totalEvents = dataService.getAllEvents()
    
    
    
        var helpMsgArray = getAllTourTipMessage("EVENT")
        $scope.isPluginLoad = "false"
        $scope.CompletedEvent = function (scope) {
            $scope.isPluginLoad = "false"
        };

        $scope.ExitEvent = function (scope) {
        
            $scope.isPluginLoad = "false"
            var prevRes = $.cookie("EVENT")
            if(prevRes == "ok"){
                    
            }else{
                dhtmlx.confirm({
                    type:"confirm",
                    ok:"Yes",
                    cancel:"No",
                    text:"Do not display this message again ?",
                    callback: function(res) {
                        if(res){
                            $.cookie("EVENT", "ok",{
                                expires: 365 * 10
                            });
                        }else{
                            $.removeCookie("EVENT");  
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
            steps:helpMsgArray,
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
                var res = $.cookie("EVENT")
       
                if(res == "ok"){
                    return false;
                }else{
                    return true;    
                }  
            }
        
        
        }
    
        ////
        $scope.fields = [{
            name:"Count",
            value:"Count",
            selectable:"true"
        },{
            name:"Average",
            value:"Average",
            selectable:"true"
        },{
            name:"Sum",
            value:"Sum",
            selectable:"true"
        },{
            name:"Max",
            value:"Max",
            selectable:"true"
        },{
            name:"Min",
            value:"Min",
            selectable:"true"
        }]
        $scope.subPropertyOpt1 = $scope.fields[0].value
        $scope.isDisabled = false
        $scope.isDisabled2 = false
        $scope.totalEventsCount = 0
        $scope.filterEventsCount = 0
        $scope.propValues1 = [{
            name: "noValue", 
            dfValue: '--Choose Value1--'
        }]
        $scope.subProperty1 = $scope.propValues1[0].name
        $scope.propValues2 = [{
            name: "noValue", 
            dfValue: '--Choose Value2--'
        }]
        $scope.subProperty2 = $scope.propValues2[0].name
        $("#noData").hide();
        $("a.active").removeClass("active");
        $("#eventMenu").addClass("active");
        $("#installations_id").addClass("active");
        $("#bookMarkedQueries").hide(); 
        eventReq.setType("EVENT")
        // set bookmarked query
        var queriesData = dataService.getBookMarkedQueries1()
    
        // set trending events in scope
        var trends = dataService.getTrendingEvents()
        if(trends != null && trends != undefined){
            // For Push and Email
            $("#triggerActionId").prop("disabled", false);
            var cleanedTrends = []
            var unCleanedTrends = []
            trends.forEach(function(obj,index ){
                if (/-START/i.test(obj.name) || /-END/i.test(obj.name)){
                    var newObj = {
                        "date" : obj.date,
                        "name" : obj.name.replace('-START','').replace('-END',''),
                        "counter" : obj.counter
                    }
                    cleanedTrends.push(newObj)
                }else{
                    cleanedTrends.push(obj)
                    unCleanedTrends.push(obj)
                }
            })
            
            $("#event").val(getUnique(cleanedTrends)[0].name)
            if(!pluckByName(unCleanedTrends,getUnique(cleanedTrends)[0].name, true)){
                // the element is not in the array
                if(events.indexOf(getUnique(cleanedTrends)[0].name + "-START")== -1){ 
                    events.push(getUnique(cleanedTrends)[0].name + "-START") 
                }
            }else{
                if(events.indexOf(getUnique(cleanedTrends)[0].name)== -1){ 
                    events.push(getUnique(cleanedTrends)[0].name) 
                }
            }
            eventReq.setEvents(events)
        
            $scope.trends = getUnique(cleanedTrends)
            $("#chart").show()
            $("#noData").hide() 
        }else{
            $("#chart").hide()
            $("#noData").show() 
        }
    
    
   
        // set all properties in scope
        var totalProps = dataService.getTotalProps()
        $scope.getTotalProps = totalProps
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

        var cleanedEvents =[]
        var unCleanedEvents =[]
        // set total events in scope
        var totalEvents = dataService.getTotalEvents()
        if(trends== null || trends == undefined){
            if(totalEvents.length != 0){
                $("#noDataText").html("No Trending Events created.Please select Events.")   
            }else{
                $("#noDataText").html("No Events created for this App.")    
            }
            localStorage.setItem("onPageLoad",false);
        }else{
            $("#noDataText").html("No Data.")
            localStorage.setItem("onPageLoad",true);
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
        initializeEvents(getUnique(cleanedEvents),unCleanedEvents)
    
     
    
        var range = $('#range');
    
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
        },function(startDate, endDate,label){
            var startD =$("#range").data('daterangepicker').startDate.format('YYYY-MM-DD')
            var endD =$("#range").data('daterangepicker').endDate.format('YYYY-MM-DD')
            start = startD
            end = endD
            eventReq["start"] = start
            eventReq["end"] = end
            ajaxLoadChart(); 
        });
        var totalDistributionDateRange = $('#totalDistributionDateRange');
        // Show the dates in the range input
        totalDistributionDateRange.val(moment().subtract('days', 6).format('YYYY-MM-DD')+" - "+moment().format('YYYY-MM-DD'))
        totalDistributionDateRange.daterangepicker({
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
            intializeTotalEventsHighPieChart($scope,startDate,endDate);
        })
        intializeTotalEventsHighPieChart($scope,moment().utc().subtract('days', 6), moment().utc());
        initializeEvents(getUnique(cleanedEvents),unCleanedEvents)
    }
    $scope.callInitialMethods()
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
    $scope.changeState = function(){
        if($scope.isPluginLoad == "true"){
            return false;   
        }
        if(events.length == 0){
            customAlert("alert-error","Please choose atleast one event.")
            return
        }
        var state = $scope.light.state
        if(state == "On"){
            eventReq.unique_type = true
        }else{
            eventReq.unique_type = false
        }
        ajaxLoadChart()
       
    }
    $scope.fetchSubProps = function(id){
        console.log("Basic")
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
       
        if($scope.isPluginLoad == "true"){
            return false;   
        }
        var select = $("#sub-property"+id)
        var subPropertyModel = $scope.subProperty+id
        
        if(events.length == 0){
            customAlert("alert-error","Please choose an event to get values.")
        }else{
            var selectedProp
            if(id ==1){
                $scope.property2 = ""
                $scope.propValues2.length = 0
                $scope.propValues2.push({
                    name: 'noValue', 
                    dfValue: '--Choose Value2--'
                }) 
                $scope.subProperty2 = $scope.propValues2[0].name
                $("#property2").attr("readonly",true)
                $("#sub-property2").attr("readonly",true)
                $("#overLayDiv").show()
                $("#sub-PropertyOpt2").hide()
                selectedProp = $scope.property1
                if(selectedProp == "" || selectedProp == null){
                    // $("#sub-property"+id).find('option:gt(0)').remove();
                    $("#property2").find('option:eq(0)').attr("selected",true);
                    // $("#sub-property2").find('option:gt(0)').remove();
                    //$scope.subProperty1 = ""
                    //$scope.subProperty2 = ""
                    
                    if($scope.propValues1.length != 1 && $scope.propValues1[0].name != 'noValue'){
                        $scope.propValues1.length = 0
                        $scope.propValues1.push({
                            name: 'noValue', 
                            dfValue: '--Choose Value1--'
                        }) 
                        $scope.subProperty1 = $scope.propValues1[0].name   
                    }
                    $("#sub-PropertyOpt1").hide()
                    return
                }
                if($scope.property1 == $scope.property2){ 
                    customAlert("alert-error","Property 1 and Property 2 cannot be same.")   
                    //                $("#sub-property2").find('option:gt(0)').remove();
                    //                $scope.subProperty2 = ""
                    if($scope.propValues1.length != 1 && $scope.propValues1[0].name != 'noValue'){
                        $scope.propValues1.length = 0
                        $scope.propValues1.push({
                            name: 'noValue', 
                            dfValue: '--Choose Value2--'
                        }) 
                        $scope.subProperty1 = $scope.propValues1[0].name 
                        $("#sub-PropertyOpt1").hide()
                    }
                    $scope.property1 = ""
                    return
                }
            }else{
                selectedProp = $scope.property2 
                if(selectedProp == "" || selectedProp == null){
                    // $("#sub-property2").find('option:gt(0)').remove();
                    //$scope.subProperty2 = ""
                    if($scope.propValues2.length != 1 && $scope.propValues2[0].name != 'noValue'){
                        $scope.propValues2.length = 0
                        $scope.propValues2.push({
                            name: 'noValue', 
                            dfValue: '--Choose Value2--'
                        }) 
                        $scope.subProperty2 = $scope.propValues2[0].name   
                    }
                    
                    $scope.property2 = ""
                    $("#sub-PropertyOpt1").hide()
                    $("#sub-PropertyOpt2").hide()
                    return
                }
                if($scope.property1 == $scope.property2){ 
                    customAlert("alert-error","Property 1 and Property 2 cannot be same.")   
                    //                $("#sub-property2").find('option:gt(0)').remove();
                    //                $scope.subProperty2 = ""
                    if($scope.propValues2.length != 1 && $scope.propValues2[0].name != 'noValue'){
                        $scope.propValues2.length = 0
                        $scope.propValues2.push({
                            name: 'noValue', 
                            dfValue: '--Choose Value2--'
                        }) 
                        $scope.subProperty2 = $scope.propValues2[0].name 
                        $("#sub-PropertyOpt2").hide()
                    }
                    $scope.property2 = ""
                    return
                }
            }
            
            
           
            var result = $.grep($scope.getTotalProps, function(e){ 
                return e.name == selectedProp; 
            });
            var selectedPropType = result[0].type
       
            var newReqObj = {
                "id":eventReq.getId(),
                "start" : eventReq.getStartDate(),
                "end" : eventReq.getEndDate(),
                "startDate" : eventReq.getStartDate(),
                "endDate" : eventReq.getEndDate(),
                "unique_type" : eventReq.unique_type,
                "events" : events,
                "properties" : [{
                    propertyName: selectedProp, 
                    propertyType:  selectedPropType,
                    propertyValue:  "all"
                }]
            }
            // getSubProps(newReqObj,id); 
            showLoad()
            $http({
                method: "post",
                params: {
                    "reqDATA":JSON.stringify((newReqObj))
                },
                url: '../event/getSubPropsEvents'
            }).success(function(data, status) {
                hideLoad()
                if(data.length>0){
                    console.log(status + "data is " + data)
                    if(selectedPropType != "text"){
                        $("#sub-PropertyOpt"+id).show()  
                    }else{
                        $("#sub-PropertyOpt"+id).hide()  
                    }
                    if(id == "1"){
                        $scope.propValues1.length = 0 
                        $scope.propValues1.push({
                            name:'all',
                            dfValue:'All'
                        })
                        for (var key in data) {
                            $scope.propValues1.push({
                                name:data[key],
                                dfValue:data[key]
                            })
                            
                        //                            if (countries.hasOwnProperty(data[key])){
                        //                                $scope.propValues1.push({
                        //                                    name:data[key],
                        //                                    dfValue:countries[data[key]]
                        //                                }) 
                        //                            }else{
                        //                                $scope.propValues1.push({
                        //                                    name:data[key],
                        //                                    dfValue:data[key]
                        //                                }) 
                        //                            }
                            
                            
                             
                        }
                        $scope.subPropertyOpt1 = $scope.fields[0].value
                        $scope.isDisabled = false
                    }else{
                        $scope.propValues2.length = 0
                        $scope.propValues2.push({
                            name:'all',
                            dfValue:'All'
                        })
                        for (var key in data) {
                            $scope.propValues2.push({
                                name:data[key],
                                dfValue:data[key]
                            })  
                        } 
                        $scope.subPropertyOpt2 = $scope.fields[0].value
                        $scope.isDisabled2 = false
                    }
                    
                }else{
                    $("#sub-PropertyOpt"+id).hide()
                    if(id== "1"){
                        if($scope.propValues1.length != 1 && $scope.propValues1[0].name != 'noValue'){
                            $scope.propValues1.length = 0
                            $scope.propValues1.push({
                                name: 'noValue', 
                                dfValue: '--Choose Value1--'
                            })    
                        }
                        $scope.subPropertyOpt1 = $scope.fields[0].value
                    }else{
                        if($scope.propValues2.length != 1 && $scope.propValues2[0].name != 'noValue'){
                            $scope.propValues2.length = 0
                            $scope.propValues2.push({
                                name: 'noValue', 
                                dfValue: '--Choose Value2--'
                            })     
                        }
                        $scope.subPropertyOpt2 = $scope.fields[0].value
                    }
                }
                
                if(id== "1"){
                    $scope.subProperty1 = $scope.propValues1[0].name 
                }else{
                    $scope.subProperty2 = $scope.propValues2[0].name 
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
    $scope.applyProp1Val = function(){
        if($scope.isPluginLoad == "true"){
            return false;   
        }
        if($scope.subProperty1 == "all" || $scope.subProperty1 == "" || $scope.subProperty1 == "noValue"){
            $("#sub-PropertyOpt2").hide()
            $("#property2").attr("readonly",true)
            $("#sub-property2").attr("readonly",true)
            $("#overLayDiv").show()
            $("#property2 :nth-child(0)").prop("selected",true)
            //$("#sub-property2").find('option:gt(0)').remove();
            $scope.property2 = ""
            //$scope.subProperty2 = ""
            if($scope.propValues2.length != 1 && $scope.propValues2[0].name != 'noValue'){
                $scope.propValues2.length = 0
                $scope.propValues2.push({
                    name: 'noValue', 
                    dfValue: '--Choose Value2--'
                })  
                $scope.subProperty2 = $scope.propValues2[0].name 
            }
            if($scope.subProperty1 == "all"){
                // $("#sub-PropertyOpt1").show()
                $scope.isDisabled = false
                
            }
        }else{
            $("#property2").attr("readonly",false)
            $("#sub-property2").attr("readonly",false)
            $("#overLayDiv").hide()
            
            //$("#sub-PropertyOpt1").show()
            $scope.subPropertyOpt1 = $scope.fields[0].value
            $scope.isDisabled = true
        }
       
        
    }
    $scope.changeOptionField = function(){
        if($scope.isPluginLoad == "true"){
            return false;   
        }
        $scope.subPropertyOpt2 = $scope.fields[0].value
        if($scope.subProperty2 == "" || $scope.subProperty2 == 'noValue'){
            $("#sub-PropertyOpt2").hide()
        }else if($scope.subProperty2 == "all"){
            // $("#sub-PropertyOpt2").show()
            $scope.isDisabled2 = false
        }else{
            // $("#sub-PropertyOpt2").show()
            $scope.isDisabled2 = true 
        }
    }
    $scope.applyProps = function(){
        if($scope.isPluginLoad == "true"){
            return false;   
        }
        if(events.length == 0){
            customAlert("alert-error","Please choose an event to continue.")
            return;
        }else if(events.length >1){
            customAlert("alert-error","Properties can be applied to single event only.")
            return;
        }
        
        if($scope.property1 !="" || $scope.property1 !=undefined || $scope.property1 !=null || $scope.property1 !=''){
            if($scope.subProperty1 == "" || $scope.subProperty1 ===undefined || $scope.subProperty1 ==="noValue"){
                customAlert("alert-error","Please choose value for the first property.")  
                return
            }
           
            if($scope.property2 !="" && $scope.property2 != '' && $scope.property2 !=undefined && $scope.property2 !=null){ 
                if($scope.subProperty2 == "" || $scope.subProperty2 ===undefined || $scope.subProperty2 ==="noValue" ){
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
            var result = $.grep($scope.getTotalProps, function(e){ 
                return e.name == $scope.property1; 
            });
            var selectedPropType = result[0].type
            properties.push({
                propertyName: $scope.property1, 
                propertyType:  selectedPropType,
                propertyValue:  $scope.subProperty1,
                propertyMathOperation:  $scope.subPropertyOpt1
            });
        }
                
        if($scope.property2 !=undefined && $scope.subProperty2 !=undefined && $scope.property2 !="" && $scope.subProperty2 !="" && $scope.subProperty1 !="noValue" && $scope.subProperty2 !="noValue"){
            var result2 = $.grep($scope.getTotalProps, function(e){ 
                return e.name == $scope.property2; 
            });
            var selectedPropType2 = result2[0].type
            properties.push({
                propertyName: $scope.property2, 
                propertyType:  selectedPropType2,
                propertyValue:  $scope.subProperty2,
                propertyMathOperation:  $scope.subPropertyOpt2
            });
        }
         
        eventReq.setProperties(properties)
        if(properties.length == 2){
            if($scope.subPropertyOpt2 =="Count" && $scope.subProperty2 =="all"){
                eventReq.setChartType("PIE") 
                applyPropsFilterPie()   
            }else if($scope.subPropertyOpt2 =="Count" && $scope.subProperty2 !="all"){
                eventReq.setChartType("LINE") 
                applyPropsFilterLine()
            }
            else{
                $("#triggerActionId").prop("disabled", false);
                //$("#sendEmailFromEventId").prop("disabled", false);
                eventReq.setChartType("LINE") 
                applyLineWithOtherOperation() 
            }
        }else{
            if($scope.subPropertyOpt1 =="Count" && $scope.subProperty1 =="all"){
                eventReq.setChartType("PIE") 
                applyPropsFilterPie()   
            }else if($scope.subPropertyOpt1 =="Count" && $scope.subProperty1 !="all"){
                eventReq.setChartType("LINE") 
                applyPropsFilterLine()
            }
            else{
                $("#triggerActionId").prop("disabled", false);
                //$("#sendEmailFromEventId").prop("disabled", false);
                eventReq.setChartType("LINE") 
                applyLineWithOtherOperation() 
            }
        }
       
        
    }
    $scope.clearProps = function(){
        if($scope.isPluginLoad == "true"){
            return false;   
        }
        // hide mathoperation select box
        if($scope.propValues1.length != 1 && $scope.propValues1[0].name != 'noValue'){
            $scope.propValues1.length = 0  
            $scope.propValues1.push({
                name: 'noValue', 
                dfValue: '--Choose Value1--'
            })  
            $scope.subProperty1 = $scope.propValues1[0].name
            if($scope.propValues2.length != 1 && $scope.propValues2[0].name != 'noValue'){
                $scope.propValues2.length = 0 
                $scope.propValues2.push({
                    name: 'noValue', 
                    dfValue: '--Choose Value2--'
                })  
                $scope.subProperty2 = $scope.propValues2[0].name
            }
        }
        $scope.subPropertyOpt1 = $scope.fields[0].value
        $scope.subPropertyOpt2 = $scope.fields[0].value
        $("#sub-PropertyOpt1").hide()
        $("#sub-PropertyOpt2").hide()
        // 
        $("#property1 :nth-child(0)").prop("selected",true)
        $("#property2 :nth-child(0)").prop("selected",true)
        
        //$("#sub-property2").find('option:gt(0)').remove();
        //$("#sub-property1").find('option:gt(0)').remove();
        $("#property2").attr("readonly",true)
        $("#sub-property2").attr("readonly",true)
        $("#overLayDiv").show()
       
        $scope.property2 = ""
        //$scope.subProperty2 = ""
        $scope.property1 = ""
        //$scope.subProperty1 = ""
        properties.length = 0
        eventReq.setProperties(properties)
        $("#chart").hide();
        $("#chartPie").hide();
        ajaxLoadChart();
    }

    
    
    $scope.openSaveQueryForm = function(){
        if($scope.isPluginLoad == "true"){
            return false;   
        }
        $("#eventQueryName").val("")
        if(events.length == 0){
            customAlert("alert-error","Please choose an event to continue.")
            return;
        }else{
            $("#myEvantFormBookmark").modal('show');   
        }
        
    }
    $scope.saveQueryForm = function(flag){
        $.cookie("isPluginView", "no",{
            expires: 365 * 10
        });
        if($scope.isPluginLoad == "true"){
            return false;   
        }
        if(flag == "yes"){
            var name = $("#eventQueryName").val().trim()  
            if(name === undefined || name == null || name == ""){
                customAlert("alert-error","Query name cannot be set blank.") 
                return; 
            }
            if($scope.queries1.indexOf(name) != -1){
                customAlert("alert-error","Query with this name already exists.") 
                return     
            }
            var finalJson = JSON.stringify(eventReq)
            $.ajax({
                type: "POST",
                async: false,
                data:"reqDATA="+finalJson+"&name="+name+"&type="+"EVENT",
                url: '../event/saveMarkedQuery',
                beforeSend: function (data) {
                    showLoad()
                },
                complete: function (data) {
                    var responseData = data.responseText
                    hideLoad()
                    $("#myEvantFormBookmark").modal('hide')
                    if(responseData == "true"){
                        $scope.queries1.push(name)  
                        $scope.bookMarkedQuery1 = name
                        $scope.property1 = ""
                        $scope.property2 = ""
                        $scope.subProperty1 = ""
                        $scope.subProperty2 = ""
                        properties = []
                        events = []
                        $location.path('/trending');
                    }else{
                        $("#myEvantFormBookmark").modal('hide') 
                    }
                }
            });
        }else{
            $("#eventQueryName").val('')
            $("#myEvantFormBookmark").modal('hide'); 
        }
    }
    $scope.deleteEventQuery = function(){
        $.cookie("isPluginView", "no",{
            expires: 365 * 10
        });
        if($scope.isPluginLoad == "true"){
            return false;   
        }
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
                $location.path('/trending');
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
        $.cookie("isPluginView", "no",{
            expires: 365 * 10
        });
        if($scope.isPluginLoad == "true"){
            return false;   
        }
        var flagReset = true
        $scope.getBookMark(flagReset)
        $("#bookMarkedQuery11").find('option:eq(0)').prop("selected",true);
    }
    
    $scope.$on("callInitialMethods",function(){
        $("#eventDiv").empty()
        $('#eventDiv').append('<input type="text" value="" id="event" class="clsD" />');
        events.length = 0
        eventReq.setEvents(events)
        $scope.callInitialMethods()
    }); 
    $scope.callTotalEventsCount = function(totalEvents,filterEvent){
        $scope.totalEventsCount = totalEvents
        $scope.filterEventsCount = filterEvent
    }
});

// Event AutoComplete Widget & Configurations
function initializeEvents(eventSource,unCleanedEvents){
    // localStorage.setItem("onPageLoad",true);
    $("#event").inputosaurus({
        width : "250px",
        autoCompleteSource : eventSource,
        activateFinalResult : true,
        change : function(ev){
            var onPageLoad = localStorage.getItem("onPageLoad");
            if(onPageLoad == "true"){
             
            }else{
                localStorage.setItem("onPageLoad",true);
                $("#noDataText").html("No Data.")
            }
            $("#event_reflect").val(ev.target.value);
            var count = ev.target.value.split(","); 
            //            var diff = $(count).not(eventSource).get();
            //            if(diff.length>0){
            //                customAlert("alert-error","Invalid event(s) selected!")
            //                return
            //            }
            $("#chart").show()
            $("#noData").hide()
            events.length = 0
            for(i=0;i<count.length;i++){
                if($.inArray(count[i],unCleanedEvents) == -1){
                    // the element is not in the array
                    events.push(count[i] + "-START") 
                }else{
                    events.push(count[i])   
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
                //For Push and Email
                $("#triggerActionId").prop("disabled", true);
                events.length = 0
                eventReq.setEvents(events)
            }else{
                if(count.length  > 5){
                    // Only 5 events are allowed condition
                    $("#chartPie").hide()
                    customAlert("alert-error","Max no. of events reached.")
                }else if(count.length  >= 2){
                    // Event comparison case,hide properties tab and load event comparison graph
                    $("#chartPie").hide()
                    //For Push and Email
                    $("#triggerActionId").prop("disabled", true);
                    getResultsForEvents() 
                }else{
                    // Single event case only, show properties dropdown
                    setTriggerReqObject(eventReq)
                    getResultsForEvents() 
                }  
            }
        }
        
    });
}
function getResultsForEvents() {
  
    showLoad()
    $.getJSON('../event/getResults', {
        "reqDATA":JSON.stringify(eventReq)
    }, function(data) {
        hideLoad()
        var ddd = eval(data)
        var tp;
        if(ddd[ddd.length-1] != undefined && ddd[ddd.length-1].totalProps != undefined){
            tp = clone(ddd[ddd.length-1].totalProps)
            ddd.splice(ddd.length-1, 1)
        }
        if(data.length > 0 && ddd[0].data != undefined  && ddd[0].data.length == 0){
            $("#chart").hide()
            $("#noData").show() 
        }else if(ddd[0] != undefined && ddd[0].data == undefined || ddd.length == 0){
            $("#chart").hide()
            $("#noData").show() 
        }else{
            $("#chart").show()
            $("#noData").hide() 
            // For Push and Email
            console.log(ddd.length)
            if(data.length  != undefined && ddd.length < 3){
                $("#triggerActionId").prop("disabled", false);
            }else{
                $("#triggerActionId").prop("disabled", true);
            }
            
            loadHighLineChart(data)
        }
        
        if(tp != undefined ){ 
            var totalProps = tp
            var __scope =  angular.element($("#trending_scope")).scope();
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
function getSubProps(newReqObj,index){
    console.log("In sup properties of Segmentation")
    var select = $("#sub-property"+index)
   
    showLoad()
    var url = '../event/getSubPropsEvents'
    $.getJSON(url, {
        "reqDATA":JSON.stringify(newReqObj)
    }, function(data) {
        var responseData = eval(data)
        select.find('option:gt(0)').remove();
        if(responseData.length>0){
            var opts = "<option value='all'>All</option>"
            for (var key in responseData) {
                
                opts = opts + '<option style="text-transform:capitalize;" value="'+responseData[key]+'">'+responseData[key]+'</option>'
           
            }
            select.append(opts);   
        }
        hideLoad()
         
    });
}

function getSubPropsForDau(newReqObj,index){
    console.log("In funnel Sub properies")
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
    var select = $("#sub-property"+index)
    showLoad()
    var url = '../event/getSubPropsEvents'
    $.getJSON(url, {
        "reqDATA":JSON.stringify(newReqObj)
    }, function(data) {
        var responseData = eval(data)
        select.find('option:gt(0)').remove();
        if(responseData.length>0){
            var opts = ""
            for (var key in responseData) {
                opts = opts + '<option style="text-transform:capitalize;" value="'+responseData[key]+'">'+responseData[key]+'</option>'   
                console.log("options are" +responseData[key])
                console.log("Key is" + key)
                console.log("Response is " + responseData)
            //                if (countries.hasOwnProperty(responseData[key])) {
            //                    opts = opts + '<option style="text-transform:capitalize;" value="'+responseData[key]+'">'+countries[responseData[key]]+'</option>'
            //                }else{
            //                    opts = opts + '<option style="text-transform:capitalize;" value="'+responseData[key]+'">'+responseData[key]+'</option>'   
            //                }
                
                
            }
            select.append(opts);   
        }
        hideLoad()
         
    });
}
function ajaxLoadChart() {
    showLoad()
    var type = eventReq.type
    if(type == "EVENT" || type == "INSTALL"){
        setTriggerReqObject(eventReq)
        if(properties.length == 0){
            console.log("jjjjjjjjjjjjj")
            console.log(JSON.stringify(eventReq))
            $.getJSON('../event/getResults', {
                "reqDATA":JSON.stringify(eventReq)
            }, function(data) {
                console.log("jjjjjjjjjjjjj")
                console.log(data)
                var ddd = eval(data)
                console.log(ddd)
                var tp;
                if(ddd[ddd.length-1] != undefined && ddd[ddd.length-1].totalProps != undefined){
                    tp = clone(ddd[ddd.length-1].totalProps)
                    ddd.splice(ddd.length-1, 1)
                }
                $("#chartPie").hide()
                if(data.length > 0 && ddd[0].data != undefined && ddd[0].data.length == 0){
                    $("#chart").hide()
                    $("#noData").show() 
                    $("#triggerActionId").prop("disabled", true);
                }else if(ddd[0].data == undefined || ddd.length == 0){
                    $("#chart").hide()
                    $("#noData").show() 
                    $("#triggerActionId").prop("disabled", true);
                }else{
                    $("#chart").show()
                    $("#noData").hide() 
                    //  For Push and Email
                    console.log(ddd.length)
                    if(data.length != undefined && ddd.length < 3){
                        $("#triggerActionId").prop("disabled", false);
                    }else{
                        $("#triggerActionId").prop("disabled", true);
                    }
                    
                    
                    //                    if(ddd[ddd.length-1].totalProps != undefined){
                    //                    	ddd.splice(ddd.length-1, 1)
                    //                    }
                    console.log("dddddddddddd")
                    loadHighLineChart(data)
                }
                if(tp != undefined ){ 
                    var totalProps = tp
                    var __scope =  angular.element($("#trending_scope")).scope();
                    if(__scope != undefined){
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
                        console.log("#######cleanedProperties")
                        console.log(cleanedProperties)
                        __scope.totalProps = cleanedProperties
                        __scope.$apply()
                    }
                }
                hideLoad()
            });
        }else{
            //Analytics for event and properties
            hideLoad()
            if(eventReq.chartType == "LINE"){
                //subPropsFilter()
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
                applyPropsFilterPie() 
            }
           
        } 
    }else if(type == "SESSION"){
        //Avg session requests
        getResultsForAvgSession() 
        hideLoad()
    }else if(type == "ACTIVEUSERSDAILY"){
        getResultsForDailyActiveUsers() 
        hideLoad()  
    }else if(type == "ACTIVEUSERSWEEKLY"){
        getResultsForActiveUsers() 
        hideLoad()   
    }
    else if(type == "ACTIVEUSERSMONTHLY"){
        getResultsForActiveUsers() 
        hideLoad()   
    }
    else if(type == "FUNNEL"){
        getResultsForFunnel() 
        hideLoad()   
    }
    
  
}
function applyPropsFilterPie(){
    showLoad()
    var url = ''
    var propName = ''
    if(eventReq.getProperties()[1] === undefined){
        url = '../event/getSubProps'
        propName= eventReq.getProperties()[0].propertyName
    }else{
        url = '../event/getSubProps2'  
        propName= eventReq.getProperties()[1].propertyName
    }
   
    $.getJSON(url, {
        "reqDATA":JSON.stringify(eventReq)
    }, function(data) {
        var responseData = eval(data)
        var pieData = []
        var total =0 
                 
        $.each( responseData, function( index, value ){
            total += value.count;
        });
          
        $.each( responseData, function( index, value ){
            var optPercentage = (responseData[index].count/total)*100
            var dddd = [responseData[index].name,optPercentage]
            pieData.push(dddd)
        });
        $("#noData").hide() 
        $("#chart").hide()
        $("#chartPie").show()
        drawPieChart(pieData,propName)
       
    });
}

function applyLineWithOtherOperation(){
    showLoad()
    var url = ''
    var propName = ''
    if(eventReq.getProperties()[1] === undefined){
        url = '../event/getSubProps'
        propName= eventReq.getProperties()[0].propertyName
    }else{
        url = '../event/getSubProps2'  
        propName= eventReq.getProperties()[1].propertyName
    }
   
    $.getJSON(url, {
        "reqDATA":JSON.stringify(eventReq)
    }, function(data) {
        //var responseData = eval(data)
        ///
        var ddd = eval(data)
        if(ddd.length == 0){
            $("#chart").hide()
            $("#noData").show() 
            $("#chartPie").hide()
        }else{
            $("#noData").hide() 
            $("#chart").show()
            $("#chartPie").hide()
            loadHighLineChart(data)
        }
        hideLoad() 
    });
}
function applyPropsFilterLine(){
    var propNameNewVal, propNameOldVal, url = '';
    showLoad()
    if(eventReq.getProperties()[1] === undefined && eventReq.getProperties()[1] == null ){
        // propNameNewVal = $("#sub-property1").val()
        // eventReq.getProperties()[0].propertyValue = propNameNewVal
        url = '../event/getSubPropsForValue'
    }else{
        // propNameOldVal = $("#sub-property1").val()
        // propNameNewVal = $("#sub-property2").val()
        // eventReq.getProperties()[0].propertyValue = propNameOldVal
        // eventReq.getProperties()[1].propertyValue = propNameNewVal
        url = '../event/getSubPropsForValue2'  
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
            loadHighLineChart(data)
       
        }
        hideLoad()  
    }); 
}
function drawPieChart(data,label){
    hideLoad() 
    if(data == ""){
        $("#noData").show() 
        $("#chart").hide()
        $("#chartPie").hide()
        return
    }
    loadHighPieChart(data,label)    
}
function drawTotalEventPieChart(data,label){
    hideLoad() 
    if(data == ""){
        $("#noDataForTotalEvent").show() 
        $("#totalEventPieChart").hide()
        return
    }else{
        $("#noDataForTotalEvent").hide() 
        $("#totalEventPieChart").show()
        loadTotalEventsHighPieChart(data,"Event") 
    }   
}

function applyPieDrill(propVal){
    var property1Val = eventReq.getProperties()[0].propertyValue
    var property2Val;
    if(eventReq.getProperties().length == 2){
        property2Val = eventReq.getProperties()[1].propertyValue 
    }
    if(property1Val == "all"){
        eventReq.getProperties()[0].propertyValue = propVal
        var inx = eventControllerIns.propValues1.map(function(e) {
            return e.name+"";
        }).indexOf(propVal+"");
        eventControllerIns.subProperty1 = eventControllerIns.propValues1[inx].name
        eventControllerIns.isDisabled = true
        eventControllerIns.$apply()
        //$("#sub-property1").val(propVal)
        $("#property2").attr("readonly",false)
        $("#sub-property2").attr("readonly",false)
        $("#overLayDiv").hide()
       
    }else if(property2Val == "all"){
        //$("#sub-property2").val(propVal)
        eventReq.getProperties()[1].propertyValue = propVal
        var inx1 = eventControllerIns.propValues2.map(function(e) {
            return e.name+"";
        }).indexOf(propVal+"");
        eventControllerIns.subProperty2 = eventControllerIns.propValues2[inx1].name
        eventControllerIns.isDisabled2 = true
        eventControllerIns.$apply()
    }else{
        console.log("else for drill down") 
    }
    
    applyPropsFilterLine()
}
function loadHighPieChart(data,label){
    console.log("data is " + JSON.stringify(data))
    console.log("label is " + JSON.stringify(label))
    Highcharts.data({
        csv: document.getElementById('tsv').innerHTML,
        itemDelimiter: '\t',
        parsed: function (columns) {

            var brands = {},
            brandsData = [],
            versions = {},
            drilldownSeries = [];
          
            // Parse percentage strings
            columns[1] = $.map(columns[1], function (value) {
                if (value.indexOf('%') === value.length - 1) {
                    value = parseFloat(value);
                }
                return value;
            });

            $.each(columns[0], function (i, name) {
                var brand,
                version;

                if (i > 0) {

                    // Remove special edition notes
                    name = name.split(' -')[0];

                    // Split into brand and version
                    version = name.match(/([0-9]+[\.0-9x]*)/);
                    if (version) {
                        version = version[0];
                    }
                    brand = name.replace(version, '');

                    // Create the main data
                    if (!brands[brand]) {
                        brands[brand] = columns[1][i];
                    } else {
                        brands[brand] += columns[1][i];
                    }

                    // Create the version data
                    if (version !== null) {
                        if (!versions[brand]) {
                            versions[brand] = [];
                        }
                        versions[brand].push(['v' + version, columns[1][i]]);
                    }
                }

            });
         
            $.each(brands, function (name, y) {
                brandsData.push({
                    name: name,
                    y: y,
                    drilldown: versions[name] ? name : null
                });
            });
         
            $.each(versions, function (key, value) {
                drilldownSeries.push({
                    name: key,
                    id: key,
                    data: value
                });
            });
         
            // Create the chart
            $('#chartPie').highcharts({
                    
                chart: {
                    type: 'pie'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                //                plotOptions: {
                //                    series: {
                //                        dataLabels: {
                //                            enabled: true,
                //                            format: '{point.name}: {point.y:.1f}%'
                //                        }
                //                    }
                //                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    applyPieDrill(this.name)
                                }
                            }
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },

                series: [{
                    name: label,
                    colorByPoint: true,
                    data: data
                }],
                drilldown: {
                    series: drilldownSeries
                }
            });
        }
    }); 
    
}
function loadHighLineChart(data){

    if(data[data.length-1] != undefined && data[data.length-1].totalProps != undefined){
        data.splice(data.length-1, 1)
    }
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    $('#chart').highcharts({
        
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
                text: 'Count'
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
function loadHighLineChartAvgSession(data){
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    
    $('#chart').highcharts({
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
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '{point.x:%e %b}: <b>{point.y}</b>'
        //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f} secs</b><br/>'
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
        yAxis: {
            floor: 0,
            title: {
                text: 'Seconds'
            },
            labels: {
                formatter: function () {
                    return Highcharts.numberFormat(this.value,2);
                }
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
////////////////////Total Events Graph/////////////////////////////
function loadTotalEventsHighPieChart(data,label){
   
    Highcharts.data({
        csv: document.getElementById('tsv').innerHTML,
        itemDelimiter: '\t',
        parsed: function (columns) {

            var brands = {},
            brandsData = [],
            versions = {},
            drilldownSeries = [];
          
            // Parse percentage strings
            columns[1] = $.map(columns[1], function (value) {
                if (value.indexOf('%') === value.length - 1) {
                    value = parseFloat(value);
                }
                return value;
            });

            $.each(columns[0], function (i, name) {
                var brand,
                version;

                if (i > 0) {

                    // Remove special edition notes
                    name = name.split(' -')[0];

                    // Split into brand and version
                    version = name.match(/([0-9]+[\.0-9x]*)/);
                    if (version) {
                        version = version[0];
                    }
                    brand = name.replace(version, '');

                    // Create the main data
                    if (!brands[brand]) {
                        brands[brand] = columns[1][i];
                    } else {
                        brands[brand] += columns[1][i];
                    }

                    // Create the version data
                    if (version !== null) {
                        if (!versions[brand]) {
                            versions[brand] = [];
                        }
                        versions[brand].push(['v' + version, columns[1][i]]);
                    }
                }

            });
         
            $.each(brands, function (name, y) {
                brandsData.push({
                    name: name,
                    y: y,
                    drilldown: versions[name] ? name : null
                });
            });
         
            $.each(versions, function (key, value) {
                drilldownSeries.push({
                    name: key,
                    id: key,
                    data: value
                });
            });
         
            // Create the chart
            $('#totalEventPieChart').highcharts({
                    
                chart: {
                    type: 'pie'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                //                plotOptions: {
                //                    series: {
                //                        dataLabels: {
                //                            enabled: true,
                //                            format: '{point.name}: {point.y:.1f}%'
                //                        }
                //                    }
                //                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                //  applyPieDrill(this.name)
                                }
                            }
                        }
                    }
                },

                tooltip: {
                    shared: true,
                    headerFormat: '<span style="font-size:11px;height:10px"><b>Event Details</b></span><br>',
                    pointFormat: '<span>{series.name} : {point.name} <br>Percentage : {point.y:.2f}% of total<br/></span>'
                },

                series: [{
                    name: label,
                    colorByPoint: true,
                    data: data
                }],
                drilldown: {
            //series: drilldownSeries
            }
            });
        }
    }); 
    
}

function intializeTotalEventsHighPieChart($scope,startDate,endDate){
    var total = 0
    var startD =$("#totalDistributionDateRange").data('daterangepicker').startDate.format('YYYY-MM-DD')
    var endD =$("#totalDistributionDateRange").data('daterangepicker').endDate.format('YYYY-MM-DD')
    start = startD
    end = endD
    eventReq["startDate"] = start
    eventReq["endDate"] = end
    $("#noDataForTotalEvent").hide() 
    $("#totalEventPieChart").hide()
    $("#loadingImageDiv").show()
    $.getJSON('../event/getTotalEventsByDateRange', {
        "reqDATA":JSON.stringify(eventReq)
    }, function(data) {
        $("#loadingImageDiv").hide()
        if(data.error == true){
            $scope.filterEventsCount = 0
            $("#noDataForTotalEvent").show() 
            $("#totalEventPieChart").hide()
            $scope.$apply($scope.callTotalEventsCount($scope.totalEventsCount,$scope.filterEventsCount))
            return
        }else{
            var total = 0
            var totalPieData = []
            var totalEvents = eval(data)
            var tEvents = 0
            totalEvents.forEach(function(ob,inx ){
                tEvents += totalEvents[inx].counter
            })
            totalEvents.forEach(function(obj,index ){
                //var totalEventPercentage = (totalEvents[index].counter/total)*100
                var myValue = [totalEvents[index].name,(totalEvents[index].counter/tEvents)*100]
                totalPieData.push(myValue)
            })
            $scope.$apply($scope.callTotalEventsCount($scope.totalEventsCount,tEvents))
            drawTotalEventPieChart(totalPieData,"Event")
        }
    });   
}
