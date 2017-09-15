/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 17 Nov 2014
 * @version 1.0
 */

// Retention section
appHq.controller("retentionController", function($scope,dataService, $rootScope, $http,$location) {
    $("#noData").show();
    $("#cohortContainer").hide();
    $("a.active").removeClass("active");
    $("#retentionMenu").addClass("active");
    $("#bookMarkedQueries").hide(); 
    //    set up for tour
    $scope.helpMsgArray = getAllTourTipMessage("RETENTION")
    $scope.showTourForWizard = function(){
        $scope.CompletedEvent = function (scope) {
            console.log("Completed Event called");
        };

        $scope.ExitEvent = function (scope) {
            console.log("Exit Event called");
            var prevRes = $.cookie("RETENTION")
            if(prevRes == "ok"){
                    
            }else{
                dhtmlx.confirm({
                    type:"confirm",
                    ok:"Yes",
                    cancel:"No",
                    text:"Do not display this message again ? ",
                    callback: function(res) {
                        if(res){
                            $.cookie("RETENTION", "ok",{
                                expires: 365 * 10
                            });
                        }else{
                            $.removeCookie("RETENTION");  
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
            console.log("Before Change Event called");
            console.log(targetElement);
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
                var res = $.cookie("RETENTION")
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
    eventReq.setType("RETENTION")
    
    // set all properties in scope
    var totalProps = dataService.getRetentionProps()
   
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
    var range = $('#rangeRetention');

    $scope.eventStart = moment().subtract('days', 6).format('YYYY-MM-DD')
    $scope.eventEnd = moment().format('YYYY-MM-DD')
    
    $scope.getRetention = function(){
       
        if($scope.property1 !=undefined){
            if($scope.subProperty1 ===undefined || $scope.subProperty1 =="" || $scope.subProperty1 ==null){
                customAlert("alert-error","Value option is mandatory, if property is selected.")
                return
            }
        }
        events.length = 0
        events.push("APP42_INSTALL")
        var newReqObj = {
            "id":eventReq.getId(),
            "start" : eventReq.getStartDate(),
            "end" : eventReq.getEndDate(),
            "eventStart" : $scope.eventStart, 
            "eventEnd" : $scope.eventEnd,
            "events" : events,
            "properties" : [{
                propertyName: $scope.property1, 
                propertyValue:  $scope.subProperty1
            }]
        }
        /*var eventsReten =[]
        eventsReten.push({
            name: 'APP42_INSTALL' ,
            startDate:  convertDateFormate(eventReq.getStartDate()),
            endDate: convertDateFormate(eventReq.getEndDate())
        })
        
        pushRequestModel.setEvents(eventsReten);	
   	    emailRequestModel.setEvents(eventsReten);
   	    wallPostRequestModel.setEvents(eventsReten);
   	    
   	    pushRequestModel.setProperties(newReqObj.properties);
	    emailRequestModel.setProperties(newReqObj.properties);
	    wallPostRequestModel.setProperties(newReqObj.properties);*/
     
        var finalJson = JSON.stringify(newReqObj)
        showLoad()
        setTimeout(function(){
            $.ajax({
                type: "POST",
                async: false,
                data:"reqDATA="+finalJson,
                url: '../event/getRetentionResults',
                beforeSend: function (data) {
                
                },
                complete: function (data) {
                    hideLoad()
                    var responseData = parseResponse(data.responseText);
                    if(responseData.length !=0){
                        // data
                        $("#noData").hide();
                        $("#cohortContainer").show();
                        drawCohortGraph(responseData,$scope.eventStart)
                    }else{
                        // no data
                        $("#noData").show();
                        $("#cohortContainer").hide();
                    }
                }
            });
        }, 0);
    }
    // Show the dates in the range input
    range.val(moment().subtract('days', 6).format('YYYY-MM-DD')+" - "+moment().format('YYYY-MM-DD'))
    $scope.getRetention()
    range.daterangepicker({
        startDate: start,
        endDate: end,
        format: 'YYYY-MM-DD',
        dateLimit:{
            days: 15
           
        },
        maxDate:moment().utc(),
		
        ranges: {
            'Today': [moment().utc(), moment().utc()],
            'Yesterday': [moment().utc().subtract('days', 1), moment().utc().subtract('days', 1)],
            'Last 7 Days': [moment().utc().subtract('days', 6), moment().utc()],
            'Last 10 Days': [moment().utc().subtract('days', 9), moment().utc()],
            'Last 15 Days': [moment().utc().subtract('days', 14), moment().utc()]
           
        }
    },function(startDate1, endDate1){
        var startDate =$("#rangeRetention").data('daterangepicker').startDate.format('YYYY-MM-DD')
        var endDate =$("#rangeRetention").data('daterangepicker').endDate.format('YYYY-MM-DD')
        start = startDate
        end =endDate
        eventReq["start"] = start
        eventReq["end"] = end
        $scope.eventStart = start
        $scope.eventEnd = end
    //        $scope.getRetention()
    });
    
    $scope.fetchSubProps = function(){
        var selectedProp = $scope.property1
      
        if(selectedProp == "" || selectedProp == null){
            $("#sub-property1").find('option:gt(0)').remove();
            $scope.subProperty1 = ""
            return
        }
        getSubPropsRetention(selectedProp);  
    }
  
});


appHq.filter('unique', function () {

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});



function getSubPropsRetention(name){
    
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
    console.log("In Retention Properties")
    var select = $("#sub-property1")
    showLoad()
    var url = '../event/getSubPropsRetention'
    $.getJSON(url, {
        "id":eventReq.getId(),
        "name":name
    }, function(data) {
        var responseData = eval(data)
        select.find('option:gt(0)').remove();
        if(responseData.length>0){
            var opts = ""
            for (var key in responseData) {
                opts = opts + '<option value="'+responseData[key]+'">'+responseData[key]+'</option>'
//                if (countries.hasOwnProperty(responseData[key])) {
//                    opts = opts + '<option style="text-transform:capitalize;" value="'+responseData[key]+'">'+countries[responseData[key]]+'</option>'
//                }else{
//                    opts = opts + '<option value="'+responseData[key]+'">'+responseData[key]+'</option>'
//                }
            }
            select.append(opts);   
        }
        hideLoad()
         
    });
}

function drawCohortGraph(data,eveStartDate){
   
    var repeatLevels = {
        //        'low': [0, 10],
        'medium-low': [0, 10],
        'medium': [10, 20],
        'medium-high': [20, 40],
        'high': [40, 60],
        'hot': [60, 70],
        'extra-hot': [70, 100]
    }
    var dataArr = []
    var installDateO = null
    var eventDateO = null
    data.forEach(function(obj,index){
        var childDataArr = []
        //        childDataArr.push(obj.totalInstalls)

        installDateO = moment(obj.installDate)
        obj.childrens.forEach(function(children,index1){
            eventDateO = moment(children.eventDate)
            if(eventDateO.diff(installDateO,"days") == 0){
                childDataArr.push(obj.totalInstalls)
            }
            else 
            if(eventDateO.diff(installDateO,"days") >=1){
                if(children.count === undefined){
                    childDataArr.push(0) 
                }else{
                    childDataArr.push(children.count) 
                }
            }else{
            //                console.log("NOT DONE")
            }
                     
        })
        dataArr.push(childDataArr)
    })
   
    $("#cohortContainer").cornelius({

        initialDate: moment(eventReq.getStartDate()).toDate(),
        repeatLevels: repeatLevels,
        labels: {
            time: 'Install Date', // Time
            people: 'Total Installations'// People
        },
        drawEmptyCells: false,
        timeInterval: 'daily',
        // cohort data
        cohort:dataArr
    });
}