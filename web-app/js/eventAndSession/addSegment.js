/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 30 Dec 2014
 * @version 1.0
 */

// Segmentation request object
var customCntrlScope;
var customCntrlScopeEdit;

var reqNewSegmentation = {
    "id":0,
    "name":"",
    "start" : '',
    "end" : '',
    "events" : [],
    "properties" : [],
    "superProperties" : [],
    "locations" : {},
    "getSegMentName" : function() {
        return this.name ;
    },
    "setSegMentName" : function(name) {
        this.name = name;
    },
    "getStartDate" : function() {
        return this.start ;
    },
    "setStartDate" : function(date) {
        this.start = date;
    },
    "getEndDate" : function() {
        return this.end ;
    },
    "setEndDate" : function(date) {
        this.end = date;
    },
    "setProperties" : function(obj) {
        this.properties = obj;
    },
    "getProperties" : function() {
        return this.properties ;
    },
    "setSuperProperties" : function(obj) {
        this.superProperties = obj;
    },
    "getSuperProperties" : function() {
        return this.superProperties ;
    },
    "setEvents" : function(obj) {
        this.events = obj;
    },
    "getEvents" : function() {
        return this.events ;
    },
    "setLocations" : function(obj) {
        this.locations = obj;
    },
    "getLocations" : function() {
        return this.locations ;
    }
}

appHq.controller("addSegmentController", function($scope, $rootScope,dataService,$timeout, $http,$location) {
    resetRequestForInAppSegmentation(reqNewSegmentation.id)
    $("a.active").removeClass("active");
    $("#campaignsMenu").addClass("active");
    $("#createSeg").addClass("active");
    $("#bookMarkedQueries").hide(); 
    $("#bookMarkedQueries1").hide(); 
   
    $scope.eventPropsArr = []
    $scope.propsArr = []
    $scope.superPropsArr = []
    var range = $('#rangeAdvSeg');
    // Show the dates in the range input
    // range.val(moment().subtract('days', 6).format('YYYY-MM-DD')+" - "+moment().format('YYYY-MM-DD'))

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
    },function(){
        var startD =$("#rangeAdvSeg").data('daterangepicker').startDate.format('YYYY-MM-DD')
        var endD =$("#rangeAdvSeg").data('daterangepicker').endDate.format('YYYY-MM-DD')
        start = startD
        end = endD
        reqNewSegmentation.setStartDate(start) 
        reqNewSegmentation.setEndDate(end)
      
    });
    
    var totalEvents = dataService.getTotalEvents()
    var countrySource = dataService.getCountries()
    var totalUserProps = dataService.getInAppSegmentUserProps()
    var totalProps = dataService.getInAppSegmentTotalProps()
    $scope.totalProps = totalProps
    $scope.cleanedUserProperties =[]
    $scope.cleanedTotalProperties =[]
    
    if(totalProps.results !=undefined){
        totalProps.results.forEach(function(obj,index ){
             
            if (/app42_/i.test(obj.name)){
                var newObj = {
                    "name" : obj.name,
                    "defaultName" : obj.name.replace('app42_','') + ' (Default)',
                    "type" : obj.type
                }
                $scope.cleanedTotalProperties.push(newObj)
            } else{
                var newObj2 = {
                    "name" : obj.name,
                    "defaultName" : obj.name,
                    "type" : obj.type
                }
                $scope.cleanedTotalProperties.push(newObj2)
            }
        });
    }

    if(totalUserProps.results !=undefined){
        totalUserProps.results.forEach(function(obj,index ){
             
            if (/app42_/i.test(obj.name)){
                var newObj = {
                    "name" : obj.name,
                    "defaultName" : obj.name.replace('app42_','') + ' (Default)',
                    "type" : obj.type
                }
                $scope.cleanedUserProperties.push(newObj)
            } else{
                var newObj2 = {
                    "name" : obj.name,
                    "defaultName" : obj.name,
                    "type" : obj.type
                }
                $scope.cleanedUserProperties.push(newObj2)
            }
        });  
    }
  
    
    $scope.initCountr = function(countrySource){
        var result = $.grep(countrySource, function(e){
            $(".chosen-select-country").append($("<option>").attr('value',e.code).text(e.name));
        });
        $(".chosen-select-country").chosen({
            max_selected_options: 5
        })
        $(".chosen-select-country").bind("chosen:maxselected", function () {
            // Only 5 countries are allowed condition
            customAlert("alert-error","Max no. of countries added.")
          
        });
    
        $("#countryDropdown").on('change', function(evt, params) {
            var vals = $("#countryDropdown").val()
            var cities = []
            if(vals == null){
                vals = []
            }
            if(reqNewSegmentation.getLocations().cities == undefined){
                cities = []
            }else{
                cities = reqNewSegmentation.getLocations().cities
            }
            var arr = {
                countries:vals,
                cities:cities 
            }
            reqNewSegmentation.setLocations(arr)
           
            // for length 1 open nd initialize cities
            if(vals.length == 1){
                $("#cityContainer").show()
                initializeCitiesForCountry(vals[0])
            }else{
                $("#cityContainer").hide() 
                $( "#cities" ).val("")
                reqNewSegmentation.getLocations().cities.length = 0
            }
            
        });
    }
    
    $scope.initCountr(countrySource)     // initialize countries
    
    $scope.addEventProperty = function(){
        if(reqNewSegmentation.getEvents().length >=5){
            customAlert("alert-error","Only 5 events can be added!")
            return
        }
       
        var eventBoxID = "eventSegmentBox"+reqNewSegmentation.getEvents().length
        var eventBoxPropsContainer = "event-properties-section"+reqNewSegmentation.getEvents().length
        var selectID = "event"+ reqNewSegmentation.getEvents().length
        var  eventRow = ''
        if(reqNewSegmentation.getEvents().length == 0){
            eventRow = '<div id='+eventBoxID+' class="event-info-section row" ><div class="chooseeventBar">'
            +'<select id='+selectID+' data-placeholder="Choose an event... " name="event" class="chosen-select" style="width:350px !important;"><option value=""></option></select>'
            +'<a id='+eventBoxID+' href="javascript:;" onclick="removeEvent(this,false)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
            +'</div><div class="event-properties-info-section" style="padding: 10px">'
            +'<div id='+eventBoxPropsContainer+' style="display:none;padding: 10px"></div>'
            +'<div onclick="addPropertiesForEvent(\''+eventBoxPropsContainer+'\',false)" style="padding:4px;width:92%;cursor:pointer;margin:10px 0 0 28px;background: #e6f5ff;border: 2px dotted #e5e5e5;border-radius: 5px;">'
            +'<i class="fa fa-plus"></i>Add Property</div></div></div>'
        }else{
            eventRow = '<div id='+eventBoxID+' class="event-info-section row" ><p class="andBoxA">And</p><div class="chooseeventBar">'
            +'<select id='+selectID+' data-placeholder="Choose an event... " name="event" class="chosen-select" style="width:350px !important;"><option value=""></option></select>'
            +'<a id='+eventBoxID+' href="javascript:;" onclick="removeEvent(this,false)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
            +'</div><div class="event-properties-info-section" style="padding: 10px">'
            +'<div id='+eventBoxPropsContainer+' style="display:none;padding: 10px"></div>'
            +'<div onclick="addPropertiesForEvent(\''+eventBoxPropsContainer+'\',false)" style="padding:4px;width:92%;cursor:pointer;margin:10px 0 0 28px;background: #e6f5ff;border: 2px dotted #e5e5e5;border-radius: 5px;">'
            +'<i class="fa fa-plus"></i>Add Property</div></div></div>'
        }
       
        $("#event-properties-Cntainer").show()
        $("#event-properties-Cntainer").append(eventRow)
        
        var obj = {
            name:"",
            properties:[],
            operator:"AND",
            key:eventBoxID
        }  
        $scope.eventPropsArr.push(obj)
        reqNewSegmentation.setEvents($scope.eventPropsArr)
        totalEvents.forEach(function(obj,index ){
            $(".chosen-select").append($("<option>").attr('value',obj).text(obj));
        });
        $(".chosen-select").chosen()
        
        $('#'+selectID).on('change', function(evt, params) {
            var remainingArr = []
            var result = $.grep(reqNewSegmentation.getEvents(), function(e){
                if(e.key == eventBoxID){
                    e.name = params.selected
                }
                remainingArr.push(e) 
            });
            reqNewSegmentation.setEvents(remainingArr)
            
        });
    }
    $scope.addPropertyBox = function(){
        
        if(reqNewSegmentation.getProperties().length >=5){
            customAlert("alert-error","Only 5 properties can be added!")
            return
        }
        var newID = "prop-val-container"+reqNewSegmentation.properties.length
        var newPropID = "property"+reqNewSegmentation.properties.length
        var newValID = newPropID+'-value'+reqNewSegmentation.properties.length
        var propertyRow = ''
        if(reqNewSegmentation.properties.length == 0){
            propertyRow = '<div id='+newID+' class="property-box row"><div class="chooseeventBar">'
            +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' name="property"  data-placeholder="Choose a property... " class="chosen-select-property" style="width:325px !important;"><option value=""></option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
            +'<select id='+newValID+' name="value" data-placeholder="Choose a value... " class="chosen-select-value" style="width:325px !important;"><option value=""></option></select>'
            +'<a id='+newPropID+' href="javascript:;" onclick="removeProperty(this,false)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
            +'</div><div>&nbsp;</div></div>'
        }else{
            propertyRow = '<div id='+newID+' class="property-box row"><p class="andBoxA">And</p><div class="chooseeventBar">'
            +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' name="property"  data-placeholder="Choose a property... " class="chosen-select-property" style="width:325px !important;"><option value=""></option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
            +'<select id='+newValID+' name="value" data-placeholder="Choose a value... " class="chosen-select-value" style="width:325px !important;"><option value=""></option></select>'
            +'<a id='+newPropID+' href="javascript:;" onclick="removeProperty(this,false)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
            +'</div><div>&nbsp;</div></div>'
        }
       
        $("#propertiesCntainer").show()
        $("#propertiesCntainer").append(propertyRow)
        var obj = {
            name:"",
            type:"",
            value:"",
            operator:"eq",
            key:newPropID
        }
        $scope.propsArr.push(obj)
        reqNewSegmentation.setProperties($scope.propsArr)
        if(totalUserProps.types !=undefined){
            totalUserProps.types.forEach(function(obj,index ){
                var optgroup = $('<optgroup>');
                optgroup.attr('label',obj.toUpperCase());
                $scope.cleanedUserProperties.forEach(function(obj1,index ){
                    if(obj1.type == obj){
                        var option = $("<option></option>");
                        option.val(obj1.name);
                        option.text(obj1.defaultName);
        
                        optgroup.append(option);
                    }
                });
                $("#"+newPropID).append(optgroup);
            }); 
        }
       
        $(".chosen-select-property").chosen()
       
        $('#'+newPropID).on('change', function(evt, params) {
            var result1 = $.grep($scope.cleanedUserProperties, function(e){ 
                return e.name == params.selected; 
            });
            var selectedPropType = result1[0].type
            
            getAndFillValues(params,newPropID,newValID,selectedPropType);
            var remainingArr = []
            var result = $.grep(reqNewSegmentation.getProperties(), function(e){
                if(e.key == newPropID){
                    e.name = params.selected
                    e.type = selectedPropType
                }
                remainingArr.push(e) 
            });
            reqNewSegmentation.setProperties(remainingArr)
          
        });
        
        $(".chosen-select-value").chosen()
        
    }
    function getAndFillValues(params,srcID,objID,selectedPropType){
        console.log("Get and fill values of has intall property ")
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
        var select = $("#"+objID)
        var url = '../dummyData/getPropValuesUser'
        $.getJSON(url, {
            "id":eventReq.getId(),
            "name":params.selected,
            "type":selectedPropType
        }, function(data) {
            var responseData = eval(data)
            select.find('option:gt(0)').remove();
            if(responseData.length>0){
                for (var key in responseData) {
                    select.append($("<option>").attr('value',responseData[key]).text(responseData[key]));
//                    if (countries.hasOwnProperty(responseData[key])){
//                        select.append($("<option>").attr('value',responseData[key]).text(countries[responseData[key]])); 
//                    }else{
//                        select.append($("<option>").attr('value',responseData[key]).text(responseData[key]));
//                    }
                }
            }
            $('.chosen-select-value').trigger('chosen:updated');
           
            $(select).on('change', function(evt, params) {
               
                var remainingArr = []
                var result = $.grep(reqNewSegmentation.getProperties(), function(e){
                    if(e.key == srcID){
                        e.value = params.selected
                    }
                    remainingArr.push(e) 
                });
                reqNewSegmentation.setProperties(remainingArr)
                
            });
        });
       
    }
    $scope.addSuperPropertyBox = function(){
        
        if(reqNewSegmentation.getSuperProperties().length >=5){
            customAlert("alert-error","Only 5 super properties can be added!")
            return
        }
        var newID = "super-prop-val-container"+reqNewSegmentation.superProperties.length
        var newPropID = "super-property"+reqNewSegmentation.superProperties.length
        var newValID = newPropID+'-value'+reqNewSegmentation.superProperties.length
        var superPropertyRow = ''
        if(reqNewSegmentation.superProperties.length == 0){
            superPropertyRow = '<div id='+newID+' class="super-property-box row"><div class="chooseeventBar">'
            +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' name="superProperty"  data-placeholder="Choose a property... " class="chosen-select-superProperty" style="width:325px !important;"><option value=""></option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
            +'<select id='+newValID+' name="superPropertyValue" data-placeholder="Choose a value... " class="chosen-select-superPropertyValue" style="width:325px !important;"><option value=""></option></select>'
            +'<a id='+newPropID+' href="javascript:;" onclick="removeSuperProperty(this,false)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
            +'</div><div>&nbsp;</div></div>'
        }else{
            superPropertyRow = '<div id='+newID+' class="super-property-box row"><p class="andBoxA">And</p><div class="chooseeventBar">'
            +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' name="superProperty"  data-placeholder="Choose a property... " class="chosen-select-superProperty" style="width:325px !important;"><option value=""></option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
            +'<select id='+newValID+' name="superPropertyValue" data-placeholder="Choose a value... " class="chosen-select-superPropertyValue" style="width:325px !important;"><option value=""></option></select>'
            +'<a id='+newPropID+' href="javascript:;" onclick="removeSuperProperty(this,false)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
            +'</div><div>&nbsp;</div></div>'
        }
       
        $("#superPropertiesCntainer").show()
        $("#superPropertiesCntainer").append(superPropertyRow)
        var obj = {
            name:"",
            type:"",
            value:"",
            operator:"eq",
            key:newPropID
        }
        $scope.superPropsArr.push(obj)
        reqNewSegmentation.setSuperProperties($scope.superPropsArr)
        if(totalProps.types !=undefined){
            totalProps.types.forEach(function(obj,index ){
                var optgroup = $('<optgroup>');
                optgroup.attr('label',obj.toUpperCase());
                $scope.cleanedTotalProperties.forEach(function(obj1,index ){
                   
                    if(obj1.type == obj){
                        if(/Default/i.test(obj1.defaultName)){
                            var option = $("<option></option>");
                            option.val(obj1.name);
                            option.text(obj1.defaultName.replace(" (Default)",""));
        
                            optgroup.append(option);   
                        }
                        
                    }
                });
                $("#"+newPropID).append(optgroup);
            }); 
        }
       
        $(".chosen-select-superProperty").chosen()
       
        $('#'+newPropID).on('change', function(evt, params) {
            var result1 = $.grep($scope.cleanedTotalProperties, function(e){ 
                return e.name == params.selected; 
            });
            var selectedPropType = result1[0].type
            
            getAndFillValuesSuperProperty(params,newPropID,newValID,selectedPropType);
            var remainingArr = []
            var result = $.grep(reqNewSegmentation.getSuperProperties(), function(e){
                if(e.key == newPropID){
                    e.name = params.selected
                    e.type = selectedPropType
                }
                remainingArr.push(e) 
            });
            reqNewSegmentation.setSuperProperties(remainingArr)
        });
        
        $(".chosen-select-superPropertyValue").chosen()
      
    }
    function getAndFillValuesSuperProperty(params,srcID,objID,selectedPropType){
        var select = $("#"+objID)
        var url = '../dummyData/getPropValuesSuper'
        $.getJSON(url, {
            "id":eventReq.getId(),
            "name":params.selected,
            "type":selectedPropType
        }, function(data) {
            var responseData = eval(data)
            select.find('option:gt(0)').remove();
            if(responseData.length>0){
                for (var key in responseData) {
                    select.append($("<option>").attr('value',responseData[key]).text(responseData[key]));
                }
            }
            $('.chosen-select-superPropertyValue').trigger('chosen:updated');
           
            $(select).on('change', function(evt, params) {
               
                var remainingArr = []
                var result = $.grep(reqNewSegmentation.getSuperProperties(), function(e){
                    if(e.key == srcID){
                        e.value = params.selected
                    }
                    remainingArr.push(e) 
                });
                reqNewSegmentation.setSuperProperties(remainingArr)
                
            });
        });
       
    }
    $scope.createSegment = function(){
        var isValid = validateSegmentation()
        var finalJson = JSON.stringify(reqNewSegmentation)
        console.log(finalJson)
        if(isValid){
            // save seg logic
            setTimeout(function(){
                $.ajax({
                    type: "POST",
                    async: false,
                    data:"data="+finalJson+"&name="+reqNewSegmentation.getSegMentName(),
                    url: '../dummyData/save',
                    beforeSend: function (data) {
                   
                    },
                    complete: function (data) {
                        var responseData = parseResponse(data.responseText);
                        //                    $('#loading-indicator-undefined').remove();
                        //			        $('#loading-indicator-undefined-overlay' ).remove();
                        if(responseData){
                            setTimeout(function(){
                                $location.path('/segments'); 
                                $scope.$apply()
                            }, 100);
                        }else{
                            customAlert("alert-error","Something went wrong.Please try again after some time.")
                            return false
                        }
                    }
                });
            }, 0);
        }
    }
    customCntrlScope = $scope
});

appHq.controller("segmentsController", function($scope, $rootScope,dataService,$timeout, $http,$location) {
    $("a.active").removeClass("active");
    $("#campaignsMenu").addClass("active");
    $("#createSeg").addClass("active");
    $("#bookMarkedQueries").hide(); 
    $("#bookMarkedQueries1").hide(); 
    var segmentsObj = dataService.getSegments()
    $scope.segments = segmentsObj
   
    if($scope.segments.length < 10){
        $("#loadMoreSegments").hide()
        $("#noMoreSegmentsBtn").hide()
    }else{
        $("#loadMoreSegments").show()
        $("#noMoreSegmentsBtn").hide()
    }
    
    $scope.loadMore = function() {
        showLoad()
        $http({
            method: "post",
            params: {
                id:reqNewSegmentation.id,
                start:$scope.segments[0],
                end:$scope.segments[$scope.segments.length - 1]
            },
            url: '../dummyData/getMoreSegments'
        }).success(function(data, status) {
            for (var i = 0; i < data.length; i++) {
                $scope.segments.push(data[i]);
            }
            if(data.length < 10){
                $("#loadMoreSegments").hide()
                $("#noMoreSegmentsBtn").show()
            }
            hideLoad()
        }).error(function(data, status) {
            // Some error occurred
            hideLoad()
        });
    
    };
    
    $scope.deleteQuery = function(name){
        dhtmlx.confirm({
            type:"Remove Campaign",
            text:"Do you want to delete segment?",
            callback: function(value){
                if(value){
                    showLoad()
                    $http({
                        method: "post",
                        params: {
                            id:reqNewSegmentation.id,
                            type:"IN-APP-SEGMENTS",
                            qName:name
                        },
                        url: "../dummyData/delete"
                    }).success(function(data, status) {
                        if(data.success){
                            var remainingArr = []
                            var result = $.grep($scope.segments, function(e){
                                if(e == name){
                                    delete e
                                }else{
                                    remainingArr.push(e)
                                }
                            });
                            $scope.segments = remainingArr

                            if($scope.segments.length == 0){
                                $("#loadMoreSegments").hide()
                                $("#noMoreSegmentsBtn").hide()
                            }
                            if($scope.segments.length != 0){
                                if(remainingArr.length < 10){
                                    $("#loadMoreSegments").hide()
                                    $("#noMoreSegmentsBtn").hide()
                                }else{
                                    $("#loadMoreSegments").show()
                                    $("#noMoreSegmentsBtn").hide()
                                }
                            }
                        }
                        hideLoad()
                    }).error(function(data, status) {
                        // Some error occurred
                        hideLoad()
                    });
                }
            }
        })
        return


    }

});

appHq.controller("viewSegmentController", function($scope, $rootScope,dataService,$timeout, $http,$location) {
    $("a.active").removeClass("active");
    $("#campaignsMenu").addClass("active");
    $("#createSeg").addClass("active");
    $("#bookMarkedQueries").hide(); 
    $("#bookMarkedQueries1").hide(); 
    var segmentObj = dataService.getSegmentByName()
    $scope.segment = segmentObj
    
    // Set event based segmentation values
    if($scope.segment.events !=undefined){
        if($scope.segment.events.length >0){
            $scope.segment.events.forEach(function(obj,index ){
                var evePProw = ''
                if(obj.properties.length > 0 ){
                    obj.properties.forEach(function(obj1,index ){
                        var eventPropertyRow = '<div ><p class="andBoxB">And</p>'
                        +'<div class="choosepropBar" style="float:left;">'
                        +'&nbsp;&nbsp;&nbsp;&nbsp;<select disabled  name="property" data-placeholder="Choose a property..."  class="eventProp-chosen-select"  style="width:280px !important;margin-right: 10px !important;"><option selected>'+obj1.name+'</option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
                        +'<select name="value" disabled  data-placeholder="Choose a value..."  class="eventPropVal-chosen-select"  style="width:280px !important;"><option selected>'+obj1.value+'</option></select>'
                        +'</div></div>'
                        evePProw = evePProw+eventPropertyRow
                    });
                }
                var eventRow = ''
                if(index == 0){
                    eventRow = '<div class="event-info-section row" ><div class="chooseeventBar" style="float:left">'
                    +'<select  disabled data-placeholder="Choose an event... " name="event" class="chosen-select" style="width:350px !important;"><option selected>'+obj.name+'</option></select>'
                    +'</div><div class="event-properties-info-section" style="padding: 10px">'
                    +'<div style="padding: 10px">'+evePProw+'</div>'
                    +'</div></div>'
                }else{
                    eventRow = '<div class="event-info-section row" ><p class="andBoxA">And</p><div class="chooseeventBar" style="float:left">'
                    +'<select  disabled data-placeholder="Choose an event... " name="event" class="chosen-select" style="width:350px !important;"><option selected>'+obj.name+'</option></select>'
                    +'</div><div class="event-properties-info-section" style="padding: 10px">'
                    +'<div style="padding: 10px">'+evePProw+'</div>'
                    +'</div></div>'
                }
               
    
                $("#event-properties-Cntainer").append(eventRow)
                $(".chosen-select").chosen()
                $(".eventProp-chosen-select").chosen()
                $(".eventPropVal-chosen-select").chosen()
            });
        }
    }
    
    // Set user based segmentation values
    if($scope.segment.properties != undefined){
        if($scope.segment.properties.length >0){
            $scope.segment.properties.forEach(function(obj,index ){
                var newID = "prop-val-container"+index
                var newPropID = "property"+index
                var newValID = newPropID+'-value'+index
                var propertyRow = ''
               
                
                if(index == 0){
                    propertyRow = '<div id='+newID+' class="property-box row"><div class="chooseeventBar">'
                    +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' disabled name="property"  data-placeholder="Choose a property... " class="chosen-select-property" style="width:325px !important;"><option selected>'+obj.name+'</option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
                    +'<select id='+newValID+' disabled name="value" data-placeholder="Choose a value... " class="chosen-select-value" style="width:325px !important;"><option selected>'+obj.value+'</option></select>'
                    +'</div><div>&nbsp;</div></div>'
                }else{
                    propertyRow = '<div id='+newID+' class="property-box row"><p class="andBoxA">And</p><div class="chooseeventBar">'
                    +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' disabled name="property"  data-placeholder="Choose a property... " class="chosen-select-property" style="width:325px !important;"><option selected>'+obj.name+'</option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
                    +'<select id='+newValID+' disabled name="value" data-placeholder="Choose a value... " class="chosen-select-value" style="width:325px !important;"><option selected>'+obj.value+'</option></select>'
                    +'</div><div>&nbsp;</div></div>'
                }
                
                $("#propertiesCntainer").append(propertyRow) 
                $("#"+newPropID).chosen()
            });
            $(".chosen-select-value").chosen()
        }
    } 
    
    // Set super properties
    if($scope.segment.superProperties != undefined){
        if($scope.segment.superProperties.length >0){
            $scope.segment.superProperties.forEach(function(obj,index ){
           
                var newID = "super-prop-val-container"+index
                var newPropID = "super-property"+index
                var newValID = newPropID+'-value'+index
                var superPropertyRow = ''
            
                if(index == 0){
                    superPropertyRow = '<div id='+newID+' class="super-property-box row"><div class="chooseeventBar" style="float:left;">'
                    +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' disabled name="superProperty"  data-placeholder="Choose a property... " class="chosen-select-superProperty" style="width:325px !important;"><option selected>'+obj.name+'</option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
                    +'<select id='+newValID+' disabled name="superPropertyValue" data-placeholder="Choose a value... " class="chosen-select-superPropertyValue" style="width:325px !important;"><option selected>'+obj.value+'</option></select>'
                    +'</div><div>&nbsp;</div></div>'
                }else{
                    superPropertyRow = '<div id='+newID+' class="super-property-box row"><p class="andBoxA">And</p><div class="chooseeventBar" style="float:left;">'
                    +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' disabled name="superProperty"  data-placeholder="Choose a property... " class="chosen-select-superProperty" style="width:325px !important;"><option selected>'+obj.name+'</option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
                    +'<select id='+newValID+' disabled name="superPropertyValue" data-placeholder="Choose a value... " class="chosen-select-superPropertyValue" style="width:325px !important;"><option selected>'+obj.value+'</option></select>'
                    +'</div><div>&nbsp;</div></div>'
                }
                // 
                $("#superPropertiesCntainer").append(superPropertyRow) 
                $("#"+newPropID).chosen()
    
            });
            $(".chosen-select-superPropertyValue").chosen()
        }
    }
    
    // Set location based segmentation values
    
    if($scope.segment.locations.countries != undefined){
        if($scope.segment.locations.countries.length >0){
            var contVal = ''
            $scope.segment.locations.countries.forEach(function(obj,index ){
                contVal = contVal+","+obj
            });
            $("#countries").val(contVal.slice(1)) 
        }
    }else{
        $("#countryDiv").hide() 
        $("#cityContainer").hide()
        $("#locContainer").html("<span style='color:red;margin-left:300px;'>No location added.</span>") 
    	
    } 
    // Set city based segmentation values
    if($scope.segment.locations.cities != undefined){
        if($scope.segment.locations.cities.length >0){
            var cityVal = ''
            $scope.segment.locations.cities.forEach(function(obj,index ){
                cityVal = cityVal+","+obj
            });
            $("#cities").val(cityVal.slice(1)) 
        }else{
            $("#cityContainer").hide()
        }
    }else{
    	
        $("#cityContainer").hide()
       
    } 
    
});

appHq.controller("editSegmentController", function($scope, $rootScope,dataService,$timeout, $http,$location) {
    $("a.active").removeClass("active");
    $("#campaignsMenu").addClass("active");
    $("#createSeg").addClass("active");
    $("#bookMarkedQueries").hide(); 
    $("#bookMarkedQueries1").hide(); 
    $scope.propsArrEdit = []
    $scope.eventPropsArrEdit = []
    $scope.superPropsArrEdit = []
    var totalEvents = dataService.getTotalEvents()
    var countrySource = dataService.getCountries()
    var totalUserProps = dataService.getInAppSegmentUserProps()
    var totalProps = dataService.getInAppSegmentTotalProps()
    $scope.totalProps = totalProps
    $scope.cleanedUserProperties =[]
    $scope.cleanedTotalProperties =[]
 
    if(totalProps.results !=undefined){
        totalProps.results.forEach(function(obj,index ){
             
            if (/app42_/i.test(obj.name)){
                var newObj = {
                    "name" : obj.name,
                    "defaultName" : obj.name.replace('app42_','') + ' (Default)',
                    "type" : obj.type
                }
                $scope.cleanedTotalProperties.push(newObj)
            } else{
                var newObj2 = {
                    "name" : obj.name,
                    "defaultName" : obj.name,
                    "type" : obj.type
                }
                $scope.cleanedTotalProperties.push(newObj2)
            }
        });
    }

    if(totalUserProps.results !=undefined){
        totalUserProps.results.forEach(function(obj,index ){
             
            if (/app42_/i.test(obj.name)){
                var newObj = {
                    "name" : obj.name,
                    "defaultName" : obj.name.replace('app42_','') + ' (Default)',
                    "type" : obj.type
                }
                $scope.cleanedUserProperties.push(newObj)
            } else{
                var newObj2 = {
                    "name" : obj.name,
                    "defaultName" : obj.name,
                    "type" : obj.type
                }
                $scope.cleanedUserProperties.push(newObj2)
            }
        });  
    }
    
    var segmentObj = dataService.getSegmentByName()
    $scope.segment = segmentObj
  
    // set segment details in object
    //    resetRequestForInAppSegmentation($scope.segment.id)
    reqNewSegmentation.setSegMentName($scope.segment.name)
    // reqNewSegmentation.setStartDate($scope.segment.strDate) 
    //reqNewSegmentation.setEndDate($scope.segment.endDate)
    reqNewSegmentation.setEvents($scope.segment.events)
    $scope.eventPropsArrEdit = $scope.segment.events
    reqNewSegmentation.setProperties($scope.segment.properties)
    $scope.propsArrEdit = $scope.segment.properties
    
   
    if($scope.segment.superProperties === undefined){
        reqNewSegmentation.setSuperProperties([])
    }else{
        reqNewSegmentation.setSuperProperties($scope.segment.superProperties)
        $scope.superPropsArrEdit = $scope.segment.superProperties
    }
    reqNewSegmentation.setLocations($scope.segment.locations)

    $scope.initCountr = function(countrySource){
    
        var result = $.grep(countrySource, function(e){
            if($scope.segment.locations.countries !=undefined){
                if($scope.segment.locations.countries.length ==0){
                    $(".chosen-select-country").append($("<option>").attr('value',e.code).text(e.name));
            		 
                }
                $scope.segment.locations.countries.forEach(function(obj,index ){
                    if(obj == e.code){
                        $(".chosen-select-country").append($("<option selected>").attr('value',e.code).text(e.name));
                    }else{
                        $(".chosen-select-country").append($("<option>").attr('value',e.code).text(e.name));
                    }
                    
                });
              
                if($scope.segment.locations.countries.length == 1){
                    
                    $("#cityContainer").show()
                    if(reqNewSegmentation.getLocations().cities != undefined){
                       
                        var cityVal = ""
                        $scope.segment.locations.cities.forEach(function(city,index ){
                            cityVal = cityVal + city + ","
                        });
                        $("#cities").val(cityVal.slice(0,-1))
                    }
                  
                }
            }else{
                $(".chosen-select-country").append($("<option>").attr('value',e.code).text(e.name));
            }
            
        });
        
        $(".chosen-select-country").chosen({
            max_selected_options: 5
        })
        $(".chosen-select-country").bind("chosen:maxselected", function () {
            // Only 5 countries are allowed condition
            customAlert("alert-error","Max no. of countries added.")
          
        });
    
        $("#countryDropdown").on('change', function(evt, params) {
            var vals = $("#countryDropdown").val()
            var cities = []
            if(vals == null){
                vals = []
            }
            if(reqNewSegmentation.getLocations().cities == undefined){
                cities = []
            }else{
                cities = reqNewSegmentation.getLocations().cities
            }
            var arr = {
                countries:vals,
                cities:cities 
            }
            reqNewSegmentation.setLocations(arr)
           
            // for length 1 open nd initialize cities
            if(vals.length == 1){
                $("#cityContainer").show()
                initializeCitiesForCountry(vals[0])
            }else{
                $("#cityContainer").hide() 
                $( "#cities" ).val("")
                reqNewSegmentation.getLocations().cities.length = 0
            }
            
        });
    }
    
    $scope.initCountr(countrySource)     // initialize countries
    
    var range = $('#rangeAdvSegEdit');
    // Show the dates in the range input
    //    range.val(moment().subtract('days', 6).format('YYYY-MM-DD')+" - "+moment().format('YYYY-MM-DD'))

    range.daterangepicker({
        startDate: moment($scope.segment.strDate),
        endDate: moment($scope.segment.endDate),
        format: 'YYYY-MM-DD',
        locale: {
            cancelLabel: 'Clear'
        },
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
    },function(){
        console.log("Called ")
        var startD =$("#rangeAdvSegEdit").data('daterangepicker').startDate.format('YYYY-MM-DD')
        var endD =$("#rangeAdvSegEdit").data('daterangepicker').endDate.format('YYYY-MM-DD')
        start = startD
        end = endD
        console.log(start)
        console.log(end)
        reqNewSegmentation.setStartDate(start) 
        reqNewSegmentation.setEndDate(end)
      
    });
    range.on('cancel.daterangepicker', function(ev, picker) {
        //do something, like clearing an input
        range.val('');
        reqNewSegmentation.setStartDate("") 
        reqNewSegmentation.setEndDate("")
    });
    //    console.log($scope.segment.strDate)
    //    if(!$scope.segment.strDate){
    //    	range.val("")
    //    }
    
    // Set event based segmentation values
    if($scope.segment.events !=undefined){
        if($scope.segment.events.length >0){
            $scope.segment.events.forEach(function(obj,index ){
                var evePProw = ''
                var newID = ""
                var eventPropID = ""
                var eventValID = ""
                if(obj.properties.length > 0 ){
                   
                    obj.properties.forEach(function(obj1,index1 ){
                        newID = "event"+index+"-property"+ index1
                        eventPropID = "event"+index+"-property-select"+ index1
                        eventValID = "event"+index+"-property-value-select"+ index1
                        pTag = ''
  
                        if(index1 == 0){
                            pTag = '<p class="andBoxBT">And have property</p>'
                        }else{
                            pTag = '<p class="andBoxB">And</p>'
                        }
                        
                        var eventPropertyRow = '<div id='+newID+' ><div>&nbsp;</div>'+pTag
                        +'<div class="choosepropBar" style="float:left;">'
                        +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+eventPropID+' name="property" data-placeholder="Choose a property..."  class="eventProp-chosen-select"  style="width:280px !important;margin-right: 10px !important;"><option selected>'+obj1.name+'</option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
                        +'<select name="value" id='+eventValID+' data-placeholder="Choose a value..."  class="eventPropVal-chosen-select"  style="width:280px !important;"><option selected>'+obj1.value+'</option></select>'
                        +'<a id='+newID+' href="javascript:;" onclick="removePropertyFromEvent(this,true)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
                        +'</div></div>'
                        evePProw = evePProw+eventPropertyRow
                    });
                }
                var eventRow = ''
                var eventBoxID = "eventSegmentBox"+index
                var eventBoxPropsContainer = "event-properties-section"+index
                var selectID = "event"+ index
                if(index == 0){
                    eventRow = '<div id='+eventBoxID+' class="event-info-section row" ><div class="chooseeventBar" style="float:left">'
                    +'<select id='+selectID+' data-placeholder="Choose an event... " name="event" class="chosen-select" style="width:350px !important;"><option value=""></option></select>'
                    +'<a id='+eventBoxID+' href="javascript:;" onclick="removeEvent(this,true)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
                    +'</div><div class="event-properties-info-section" style="padding: 10px">'
                    +'<div id='+eventBoxPropsContainer+' style="padding: 10px">'+evePProw+'</div><div>&nbsp;</div>'
                    +'<div onclick="addPropertiesForEvent(\''+eventBoxPropsContainer+'\',true)" style="float:left;padding:4px;width:92%;cursor:pointer;margin:10px 0 0 28px;background: #e6f5ff;border: 2px dotted #e5e5e5;border-radius: 5px;">'
                    +'<i class="fa fa-plus"></i>Add Property</div></div></div>'
                }else{
                    eventRow = '<div id='+eventBoxID+' class="event-info-section row" ><p class="andBoxA">And</p><div class="chooseeventBar" style="float:left">'
                    +'<select id='+selectID+' data-placeholder="Choose an event... " name="event" class="chosen-select" style="width:350px !important;"><option value=""></option></select>'
                    +'<a id='+eventBoxID+' href="javascript:;" onclick="removeEvent(this,true)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
                    +'</div><div class="event-properties-info-section" style="padding: 10px">'
                    +'<div id='+eventBoxPropsContainer+' style="padding: 10px">'+evePProw+'</div><div>&nbsp;</div>'
                    +'<div onclick="addPropertiesForEvent(\''+eventBoxPropsContainer+'\',true)" style="float:left;padding:4px;width:92%;cursor:pointer;margin:10px 0 0 28px;background: #e6f5ff;border: 2px dotted #e5e5e5;border-radius: 5px;">'
                    +'<i class="fa fa-plus"></i>Add Property</div></div></div>'
                }
                $("#event-properties-Cntainer").show();
                $("#event-properties-Cntainer").append(eventRow)
                totalEvents.forEach(function(obj2,index ){
                    if(obj.name == obj2){
                        $(".chosen-select").append($("<option selected>").attr('value',obj2).text(obj2)); 
                    }else{
                        $(".chosen-select").append($("<option>").attr('value',obj2).text(obj2));  
                    }
                    
                });
                $(".chosen-select").chosen()
                $('#'+selectID).on('change', function(evt, params) {
                    var remainingArr = []
                    var result = $.grep(reqNewSegmentation.getEvents(), function(e){
                        if(e.key == eventBoxID){
                            e.name = params.selected
                        }
                        remainingArr.push(e) 
                    });
                    reqNewSegmentation.setEvents(remainingArr)
            
                });
            });
              
            $scope.segment.events.forEach(function(objD,indexD ){
                var newID = ""
                var eventPropID = ""
                var eventValID = ""
                if(objD.properties.length > 0 ){
                    objD.properties.forEach(function(objE,indexE ){
                        newID = "event"+indexD+"-property"+ indexE
                        eventPropID = "event"+indexD+"-property-select"+ indexE
                        eventValID = "event"+indexD+"-property-value-select"+ indexE
                        
                        totalProps.types.forEach(function(objF,indexF ){
                            var optgroup = $('<optgroup>');
                            optgroup.attr('label',objF.toUpperCase());
                            $scope.cleanedTotalProperties.forEach(function(objG,indexG ){
                                if(objG.type == objF){
                                    var option = $("<option></option>");
                                    option.val(objG.name);
                                    option.text(objG.defaultName);
    
                                    optgroup.append(option);
                                }
                            });
                            $("#"+eventPropID).append(optgroup);
                    
                        });
                
                        $('#'+eventPropID).chosen()
                        $(".eventPropVal-chosen-select").chosen()
                
                        $('#'+eventPropID).on('change', function(evt, params) {
                            var result1 = $.grep($scope.cleanedTotalProperties, function(e){ 
                                return e.name == params.selected; 
                            });
                            var selectedPropType = result1[0].type
                            var remainingArr = []
                            var result = $.grep(reqNewSegmentation.getEvents()[indexD].properties, function(e){
                                if(e.key == newID){
                                    e.name = params.selected
                                    e.type = selectedPropType
                                }
                                remainingArr.push(e) 
                            });
                            reqNewSegmentation.getEvents()[indexD].properties = remainingArr
                            getValuesForEventProperty(params,newID,eventValID,selectedPropType)
                        });  
                    });
                }
            });
              
        }
    }
    
    // Set install properties
    if($scope.segment.properties != undefined){
     
        if($scope.segment.properties.length >0){
            $scope.segment.properties.forEach(function(obj,index ){
                var propertyRow = ''
                var newID = "prop-val-container"+index
                var newPropID = "property"+index
                var newValID = newPropID+'-value'+index
                if(index == 0){
                    propertyRow = '<div id='+newID+' class="property-box row"><div class="chooseeventBar" style="float:left;">'
                    +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' name="property"  data-placeholder="Choose a property... " class="chosen-select-property" style="width:325px !important;"><option ></option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
                    +'<select id='+newValID+' name="value" data-placeholder="Choose a value... " class="chosen-select-value" style="width:325px !important;"><option ></option><option selected>'+obj.value+'</option></select>'
                    +'<a id='+newPropID+' href="javascript:;" onclick="removeProperty(this,true)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
                    +'</div><div>&nbsp;</div></div>'
                }else{
                    propertyRow = '<div id='+newID+' class="property-box row"><p class="andBoxA">And</p><div class="chooseeventBar" style="float:left;">'
                    +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' name="property"  data-placeholder="Choose a property... " class="chosen-select-property" style="width:325px !important;"><option ></option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
                    +'<select id='+newValID+' name="value" data-placeholder="Choose a value... " class="chosen-select-value" style="width:325px !important;"><option ></option><option selected>'+obj.value+'</option></select>'
                    +'<a id='+newPropID+' href="javascript:;" onclick="removeProperty(this,true)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
                    +'</div><div>&nbsp;</div></div>'
                }
                // 
                $("#propertiesCntainer").show()
                $("#propertiesCntainer").append(propertyRow) 
                if(totalUserProps.types !=undefined){
                    totalUserProps.types.forEach(function(obj1,index ){
                        var optgroup = $('<optgroup>');
                        optgroup.attr('label',obj1.toUpperCase());
                        $scope.cleanedUserProperties.forEach(function(obj2,index ){
                            if(obj2.type == obj1){
                                var option = ''
                                if(obj2.name == obj.name){
                                    option = $("<option selected></option>"); 
                                }
                                else{
                                    option = $("<option></option>");
                                }
                                
                                option.val(obj2.name);
                                option.text(obj2.defaultName);
                                optgroup.append(option); 
                            }
                        });
                        $("#"+newPropID).append(optgroup);
                    }); 
                }
                $("#"+newPropID).chosen()
                $("#"+newPropID).on('change', function(evt, params) {
                    var result1 = $.grep($scope.cleanedUserProperties, function(e){ 
                        return e.name == params.selected; 
                    });
                    var selectedPropType = result1[0].type
            
                    getAndFillValues(params,newPropID,newValID,selectedPropType);
                    var remainingArr = []
                    var result = $.grep(reqNewSegmentation.getProperties(), function(e){
                        if(e.key == newPropID){
                            e.name = params.selected
                            e.type = selectedPropType
                        }
                        remainingArr.push(e) 
                    });
                    reqNewSegmentation.setProperties(remainingArr)
          
                });
            });
          
            $(".chosen-select-value").chosen()
        }
    } 
    
    // Set super properties
    if($scope.segment.superProperties != undefined){
        if($scope.segment.superProperties.length >0){
            $scope.segment.superProperties.forEach(function(obj,index ){
           
                var newID = "super-prop-val-container"+index
                var newPropID = "super-property"+index
                var newValID = newPropID+'-value'+index
                var superPropertyRow = ''
            
                if(index == 0){
                    superPropertyRow = '<div id='+newID+' class="super-property-box row"><div class="chooseeventBar" style="float:left;">'
                    +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' name="superProperty"  data-placeholder="Choose a property... " class="chosen-select-superProperty" style="width:325px !important;"><option value=""></option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
                    +'<select id='+newValID+' name="superPropertyValue" data-placeholder="Choose a value... " class="chosen-select-superPropertyValue" style="width:325px !important;"><option ></option><option selected>'+obj.value+'</option></select>'
                    +'<a id='+newPropID+' href="javascript:;" onclick="removeSuperProperty(this,true)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
                    +'</div><div>&nbsp;</div></div>'
                }else{
                    superPropertyRow = '<div id='+newID+' class="super-property-box row"><p class="andBoxA">And</p><div class="chooseeventBar" style="float:left;">'
                    +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' name="superProperty"  data-placeholder="Choose a property... " class="chosen-select-superProperty" style="width:325px !important;"><option value=""></option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
                    +'<select id='+newValID+' name="superPropertyValue" data-placeholder="Choose a value... " class="chosen-select-superPropertyValue" style="width:325px !important;"><option ></option><option selected>'+obj.value+'</option></select>'
                    +'<a id='+newPropID+' href="javascript:;" onclick="removeSuperProperty(this,true)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
                    +'</div><div>&nbsp;</div></div>'
                }
                // 
                $("#superPropertiesCntainer").show()
                $("#superPropertiesCntainer").append(superPropertyRow) 
                if(totalProps.types !=undefined){
                    totalProps.types.forEach(function(obj1,index ){
                        var optgroup = $('<optgroup>');
                        optgroup.attr('label',obj1.toUpperCase());
                        $scope.cleanedTotalProperties.forEach(function(obj2,index ){
                            if(obj2.type == obj1){
                                if(/Default/i.test(obj2.defaultName)){
                                    var option = ''
                                    if(obj2.name == obj.name){
                                        option = $("<option selected></option>"); 
                                    }
                                    else{
                                        option = $("<option></option>");
                                    }
                                
                                    option.val(obj2.name);
                                    option.text(obj2.defaultName.replace(" (Default)",""));
                                    optgroup.append(option); 
                                }
                            }
                        });
                        $("#"+newPropID).append(optgroup);
                    }); 
                }
                $("#"+newPropID).chosen()
                $("#"+newPropID).on('change', function(evt, params) {
                   
                    var result1 = $.grep($scope.cleanedTotalProperties, function(e){ 
                        return e.name == params.selected; 
                    });
                    var selectedPropType = result1[0].type
            
                    getAndFillValuesSuperProperty(params,newPropID,newValID,selectedPropType);
                    var remainingArr = []
                    var result = $.grep(reqNewSegmentation.getSuperProperties(), function(e){
                        if(e.key == newPropID){
                            e.name = params.selected
                            e.type = selectedPropType
                        }
                        remainingArr.push(e) 
                    });
                    reqNewSegmentation.setSuperProperties(remainingArr)
          
                });
            });
          
            $(".chosen-select-superPropertyValue").chosen()
        }
    }
   
  
    function getAndFillValuesSuperProperty(params,srcID,objID,selectedPropType){
        var select = $("#"+objID)
        var url = '../dummyData/getPropValuesSuper'
        $.getJSON(url, {
            "id":eventReq.getId(),
            "name":params.selected,
            "type":selectedPropType
        }, function(data) {
            var responseData = eval(data)
            select.find('option:gt(0)').remove();
            if(responseData.length>0){
                for (var key in responseData) {
                    select.append($("<option>").attr('value',responseData[key]).text(responseData[key]));
                }
            }
            $('.chosen-select-superPropertyValue').trigger('chosen:updated');
           
            $(select).on('change', function(evt, params) {
               
                var remainingArr = []
                var result = $.grep(reqNewSegmentation.getSuperProperties(), function(e){
                    if(e.key == srcID){
                        e.value = params.selected
                    }
                    remainingArr.push(e) 
                });
                reqNewSegmentation.setSuperProperties(remainingArr)
                
            });
        });
       
    }
    function getAndFillValues(params,srcID,objID,selectedPropType){
        var select = $("#"+objID)
        var url = '../dummyData/getPropValuesUser'
        $.getJSON(url, {
            "id":eventReq.getId(),
            "name":params.selected,
            "type":selectedPropType
        }, function(data) {
            var responseData = eval(data)
            select.find('option:gt(0)').remove();
            if(responseData.length>0){
                for (var key in responseData) {
                    select.append($("<option>").attr('value',responseData[key]).text(responseData[key]));
                }
            }
            $('.chosen-select-value').trigger('chosen:updated');
           
            $(select).on('change', function(evt, params) {
               
                var remainingArr = []
                var result = $.grep(reqNewSegmentation.getProperties(), function(e){
                    if(e.key == srcID){
                        e.value = params.selected
                    }
                    remainingArr.push(e) 
                });
                reqNewSegmentation.setProperties(remainingArr)
                
            });
        });
       
    }
    $scope.addEventProperty = function(){
        var suffix = ""
        if($("#event-properties-Cntainer").children().last().attr('id') === undefined){
            suffix = 0
        }else{
            suffix = parseInt($("#event-properties-Cntainer").children().last().attr('id').match(/\d+/))+1  
        }
        
        if(reqNewSegmentation.getEvents().length >=5){
            customAlert("alert-error","Only 5 events can be added!")
            return
        }
       
        var eventBoxID = "eventSegmentBox"+suffix
        var eventBoxPropsContainer = "event-properties-section"+suffix
        var selectID = "event"+ suffix
        var  eventRow = ''
        if(reqNewSegmentation.getEvents().length == 0){
            eventRow = '<div id='+eventBoxID+' class="event-info-section row" ><div class="chooseeventBar">'
            +'<select id='+selectID+' data-placeholder="Choose an event... " name="event" class="chosen-select" style="width:350px !important;"><option value=""></option></select>'
            +'<a id='+eventBoxID+' href="javascript:;" onclick="removeEvent(this,true)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
            +'</div><div class="event-properties-info-section" style="padding: 10px">'
            +'<div id='+eventBoxPropsContainer+' style="display:none;padding: 10px"></div>'
            +'<div onclick="addPropertiesForEvent(\''+eventBoxPropsContainer+'\',true)" style="padding:4px;width:92%;cursor:pointer;margin:10px 0 0 28px;background: #e6f5ff;border: 2px dotted #e5e5e5;border-radius: 5px;">'
            +'<i class="fa fa-plus"></i>Add Property</div></div></div>'
        }else{
            eventRow = '<div id='+eventBoxID+' class="event-info-section row" ><p class="andBoxA">And</p><div class="chooseeventBar">'
            +'<select id='+selectID+' data-placeholder="Choose an event... " name="event" class="chosen-select" style="width:350px !important;"><option value=""></option></select>'
            +'<a id='+eventBoxID+' href="javascript:;" onclick="removeEvent(this,true)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
            +'</div><div class="event-properties-info-section" style="padding: 10px">'
            +'<div id='+eventBoxPropsContainer+' style="display:none;padding: 10px"></div>'
            +'<div onclick="addPropertiesForEvent(\''+eventBoxPropsContainer+'\',true)" style="padding:4px;width:92%;cursor:pointer;margin:10px 0 0 28px;background: #e6f5ff;border: 2px dotted #e5e5e5;border-radius: 5px;">'
            +'<i class="fa fa-plus"></i>Add Property</div></div></div>'
        }
       
        $("#event-properties-Cntainer").show()
        $("#event-properties-Cntainer").append(eventRow)
        
        var obj = {
            name:"",
            properties:[],
            operator:"AND",
            key:eventBoxID
        }  
        $scope.eventPropsArrEdit.push(obj)
        reqNewSegmentation.setEvents($scope.eventPropsArrEdit)
        totalEvents.forEach(function(obj,index ){
            $(".chosen-select").append($("<option>").attr('value',obj).text(obj));
        });
        $(".chosen-select").chosen()
        
        $('#'+selectID).on('change', function(evt, params) {
            var remainingArr = []
            var result = $.grep(reqNewSegmentation.getEvents(), function(e){
                if(e.key == eventBoxID){
                    e.name = params.selected
                }
                remainingArr.push(e) 
            });
            reqNewSegmentation.setEvents(remainingArr)
            
        });
    }
    $scope.addPropertyBox = function(){
        var suffix = ""
        if($("#propertiesCntainer").children().last().attr('id') === undefined){
            suffix = 0
        }else{
            suffix = parseInt($("#propertiesCntainer").children().last().attr('id').match(/\d+/))+1  
        }
         
        
        if(reqNewSegmentation.getProperties().length >=5){
            customAlert("alert-error","Only 5 properties can be added!")
            return
        }
        var newID = "prop-val-container"+ suffix
        var newPropID = "property"+suffix
        var newValID = newPropID+'-value'+suffix
        var propertyRow = ''
        if(reqNewSegmentation.properties.length == 0){
            propertyRow = '<div id='+newID+' class="property-box row"><div class="chooseeventBar">'
            +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' name="property"  data-placeholder="Choose a property... " class="chosen-select-property" style="width:325px !important;"><option value=""></option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
            +'<select id='+newValID+' name="value" data-placeholder="Choose a value... " class="chosen-select-value" style="width:325px !important;"><option value=""></option></select>'
            +'<a id='+newPropID+' href="javascript:;" onclick="removeProperty(this,true)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
            +'</div><div>&nbsp;</div></div>'
        }else{
            propertyRow = '<div id='+newID+' class="property-box row"><p class="andBoxA">And</p><div class="chooseeventBar">'
            +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' name="property"  data-placeholder="Choose a property... " class="chosen-select-property" style="width:325px !important;"><option value=""></option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
            +'<select id='+newValID+' name="value" data-placeholder="Choose a value... " class="chosen-select-value" style="width:325px !important;"><option value=""></option></select>'
            +'<a id='+newPropID+' href="javascript:;" onclick="removeProperty(this,true)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
            +'</div><div>&nbsp;</div></div>'
        }
       
        $("#propertiesCntainer").show()
        $("#propertiesCntainer").append(propertyRow)
        var obj = {
            name:"",
            type:"",
            value:"",
            operator:"eq",
            key:newPropID
        }
        $scope.propsArrEdit.push(obj)
        reqNewSegmentation.setProperties($scope.propsArrEdit)
        if(totalUserProps.types !=undefined){
            totalUserProps.types.forEach(function(obj,index ){
                var optgroup = $('<optgroup>');
                optgroup.attr('label',obj.toUpperCase());
                $scope.cleanedUserProperties.forEach(function(obj1,index ){
                    if(obj1.type == obj){
                        var option = $("<option></option>");
                        option.val(obj1.name);
                        option.text(obj1.defaultName);
        
                        optgroup.append(option);
                    }
                });
                $("#"+newPropID).append(optgroup);
            }); 
        }
       
        $(".chosen-select-property").chosen()
       
        $('#'+newPropID).on('change', function(evt, params) {
            var result1 = $.grep($scope.cleanedUserProperties, function(e){ 
                return e.name == params.selected; 
            });
            var selectedPropType = result1[0].type
            
            getAndFillValues(params,newPropID,newValID,selectedPropType);
            var remainingArr = []
            var result = $.grep(reqNewSegmentation.getProperties(), function(e){
                if(e.key == newPropID){
                    e.name = params.selected
                    e.type = selectedPropType
                }
                remainingArr.push(e) 
            });
            reqNewSegmentation.setProperties(remainingArr)
          
        });
        
        $(".chosen-select-value").chosen()
        
    }
    $scope.addSuperPropertyBox = function(){
        var suffix = ""
        if($("#superPropertiesCntainer").children().last().attr('id') === undefined){
            suffix = 0
        }else{
            suffix = parseInt($("#superPropertiesCntainer").children().last().attr('id').match(/\d+/))+1 
        }
         
        if(reqNewSegmentation.getSuperProperties().length >=5){
            customAlert("alert-error","Only 5 super properties can be added!")
            return
        }
        var newID = "super-prop-val-container"+suffix
        var newPropID = "super-property"+suffix
        var newValID = newPropID+'-value'+suffix
        var superPropertyRow = ''
        if(reqNewSegmentation.superProperties.length == 0){
            superPropertyRow = '<div id='+newID+' class="super-property-box row"><div class="chooseeventBar">'
            +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' name="superProperty"  data-placeholder="Choose a property... " class="chosen-select-superProperty" style="width:325px !important;"><option value=""></option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
            +'<select id='+newValID+' name="superPropertyValue" data-placeholder="Choose a value... " class="chosen-select-superPropertyValue" style="width:325px !important;"><option value=""></option></select>'
            +'<a id='+newPropID+' href="javascript:;" onclick="removeSuperProperty(this,true)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
            +'</div><div>&nbsp;</div></div>'
        }else{
            superPropertyRow = '<div id='+newID+' class="super-property-box row"><p class="andBoxA">And</p><div class="chooseeventBar">'
            +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+newPropID+' name="superProperty"  data-placeholder="Choose a property... " class="chosen-select-superProperty" style="width:325px !important;"><option value=""></option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
            +'<select id='+newValID+' name="superPropertyValue" data-placeholder="Choose a value... " class="chosen-select-superPropertyValue" style="width:325px !important;"><option value=""></option></select>'
            +'<a id='+newPropID+' href="javascript:;" onclick="removeSuperProperty(this,true)" class="pull-right iconlh addSegDelA"><i class="fa fa-trash"></i></a>'
            +'</div><div>&nbsp;</div></div>'
        }
       
        $("#superPropertiesCntainer").show()
        $("#superPropertiesCntainer").append(superPropertyRow)
        var obj = {
            name:"",
            type:"",
            value:"",
            operator:"eq",
            key:newPropID
        }
        $scope.superPropsArrEdit.push(obj)
        reqNewSegmentation.setSuperProperties($scope.superPropsArrEdit)
        if(totalProps.types !=undefined){
            totalProps.types.forEach(function(obj,index ){
                var optgroup = $('<optgroup>');
                optgroup.attr('label',obj.toUpperCase());
                $scope.cleanedTotalProperties.forEach(function(obj1,index ){
                    if(obj1.type == obj){
                        if(/Default/i.test(obj1.defaultName)){
                            var option = $("<option></option>");
                            option.val(obj1.name);
                            option.text(obj1.defaultName.replace(" (Default)",""));
        
                            optgroup.append(option);   
                        }
                        
                    }
                });
                $("#"+newPropID).append(optgroup);
            }); 
        }
       
        $(".chosen-select-superProperty").chosen()
       
        $('#'+newPropID).on('change', function(evt, params) {
            var result1 = $.grep($scope.cleanedTotalProperties, function(e){ 
                return e.name == params.selected; 
            });
            var selectedPropType = result1[0].type
            
            getAndFillValuesSuperProperty(params,newPropID,newValID,selectedPropType);
            var remainingArr = []
            var result = $.grep(reqNewSegmentation.getSuperProperties(), function(e){
                if(e.key == newPropID){
                    e.name = params.selected
                    e.type = selectedPropType
                }
                remainingArr.push(e) 
            });
            reqNewSegmentation.setSuperProperties(remainingArr)
          
        });
        
        $(".chosen-select-superPropertyValue").chosen()
        
    }
    
    $scope.updateSegment = function(){
       
        var isValid = validateSegmentation()
        var finalJson = JSON.stringify(reqNewSegmentation)
     
  
        //            // save seg logic
        if(isValid){       
            $.ajax({
                type: "POST",
                async: false,
                data:"data="+finalJson+"&name="+reqNewSegmentation.getSegMentName(),
                url: '../dummyData/save',
                beforeSend: function (data) {
                    showLoad()
                },
                complete: function (data) {
                    var responseData = parseResponse(data.responseText);
                    hideLoad()
                    if(responseData){
                        $location.path('/segments'); 
                    }else{
                        customAlert("alert-error","Something went wrong.Please try again after some time.")
                        return false
                    }
                }
            });
        }
    }
    
    customCntrlScopeEdit = $scope
    
});

function split( val ) {
    return val.split( /,\s*/ );
}
function extractLast( term ) {
    return split( term ).pop();
}
function validateSegmentation(){
    var name = $.trim(reqNewSegmentation.getSegMentName())
    var startD = $.trim(reqNewSegmentation.getStartDate())
    var endD = $.trim(reqNewSegmentation.getEndDate())
    var events = reqNewSegmentation.getEvents()
    var properties = reqNewSegmentation.getProperties()
    var superProperties;
    if(reqNewSegmentation.getSuperProperties() === undefined){
        superProperties = []
    }else{
        superProperties = reqNewSegmentation.getSuperProperties()
    }
   
    var locations = reqNewSegmentation.getLocations()
   
   
    //segment name validation
    if(name == null || name == ""){
        customAlert("alert-error","Segment Name is a mandatory field.")
        return false
    }else if(name.length > 100){
        customAlert("alert-error","Segment Name is too large.Please make it less than 100 characters.")
        return false
    }else if (/^[a-zA-Z0-9- ]*$/.test(name) == false) {
        customAlert("alert-error","Segment name should not contain special characters.")
        return false
    }
    // date range validations  is Optional  
    /*  if(startD == null || startD == ""){
        customAlert("alert-error","Date is a mandatory field.")
        return false
    }else if(endD == null || endD == ""){
        customAlert("alert-error","Date is a mandatory field.")
        return false
    }*/
    
    // event based segmentation validations
    if(events.length > 0){
        var eveNameFlag = false
        var evePropNameFlag = false
        var evePropValFlag = false
        events.forEach(function(eve,index){
            if(eve.name == ""){
                eveNameFlag = true
                return false
            }
               
            eve.properties.forEach(function(evePro,index){
                if(evePro.name == ""){
                    evePropNameFlag = true
                    return false
                }
                if(evePro.value == ""){
                    evePropValFlag = true
                    return false
                }
                    
            });
                
        });
            
        if(eveNameFlag){
            customAlert("alert-error","Event is a mandatory field.")
            return false
        }
        if(evePropNameFlag){
            customAlert("alert-error","Property is a mandatory field.")
            return false
        }
        if(evePropValFlag){
            customAlert("alert-error","Property Value is a mandatory field.")
            return false
        }
    }
    // install properties segmentation validations  
    if(properties.length > 0){
        var propNameFlag = false
        var propValFlag = false
       
        properties.forEach(function(prop,index){
            if(prop.name == ""){
                propNameFlag = true
            }
            if(prop.value == ""){
                propValFlag = true
            }
        });
           
        if(propNameFlag){
            customAlert("alert-error","Property is a mandatory field.")
            return false
        }
        if(propValFlag){
            customAlert("alert-error","Property Value is a mandatory field.")
            return false
        }
    }
    // super props segmentation validations  
    if(superProperties.length > 0){
        var superPropNameFlag = false
        var superPropValFlag = false
       
        superProperties.forEach(function(superProp,index){
            if(superProp.name == ""){
                superPropNameFlag = true
            }
            if(superProp.value == ""){
                superPropValFlag = true
            }
        });
           
        if(superPropNameFlag){
            customAlert("alert-error","Super Property is a mandatory field.")
            return false
        }
        if(superPropValFlag){
            customAlert("alert-error","Super Property Value is a mandatory field.")
            return false
        }
    }
    if(events.length == 0 && properties.length == 0 ){
        if(locations.countries === undefined || locations.countries.length == 0){
            customAlert("alert-error","Please choose atleast one segmentation.")
            return false 
        }
        
    }
    
    return true
}

function updateModelForName(name){
    reqNewSegmentation.setSegMentName(name)
}
function addPropertiesForEvent(id,isEdit){
    var index
    var scope
    if(isEdit){
        index = parseInt(id.match(/\d+/))
        scope = customCntrlScopeEdit
    }else{
        index = parseInt(id.match(/\d+/))
        scope = customCntrlScope
    }
   
    evePropsArr = reqNewSegmentation.getEvents()[index].properties
    var newID = "event"+index+"-property"+ reqNewSegmentation.getEvents()[index].properties.length
    var eventPropID = "event"+index+"-property-select"+ reqNewSegmentation.getEvents()[index].properties.length
    var eventValID = "event"+index+"-property-value-select"+ reqNewSegmentation.getEvents()[index].properties.length
    var pTag = ''
  
    if(reqNewSegmentation.getEvents()[index].properties.length == 0){
        pTag = '<p class="andBoxBT">And have property</p>'
    }else{
        if(reqNewSegmentation.getEvents()[index].properties.length >=5){
            customAlert("alert-error","Only 5 properties can be added!")
            return
        }
        pTag = '<p class="andBoxB">And</p>'
    }
    var eventPropertyRow = '<div id='+newID+'>'+pTag
    +'<div class="choosepropBar">'
    +'&nbsp;&nbsp;&nbsp;&nbsp;<select id='+eventPropID+' name="property" data-placeholder="Choose a property..."  class="eventProp-chosen-select"  style="width:280px !important;"><option></option></select>&nbsp;&nbsp;&nbsp;&nbsp;'
    +'<select name="value" id='+eventValID+' data-placeholder="Choose a value..."  class="eventPropVal-chosen-select"  style="width:280px !important;"><option></option></select>'
    +'<a id='+newID+' href="javascript:;" onclick="removePropertyFromEvent(this,false)" class="pull-right iconlh addSegDel"><i class="fa fa-trash"></i></a>'
    +'</div></div>'
    $("#"+id).show()
    $("#"+id).append(eventPropertyRow)
    
    
    var obj = {
        name:"",
        type:"",
        operator:"eq",
        value:"",
        key:newID
    }
    
    evePropsArr.push(obj) 
    reqNewSegmentation.getEvents()[index].properties = evePropsArr
   
    scope.totalProps.types.forEach(function(obj,index ){
        var optgroup = $('<optgroup>');
        optgroup.attr('label',obj.toUpperCase());
        scope.cleanedTotalProperties.forEach(function(obj1,index ){
            if(obj1.type == obj){
                var option = $("<option></option>");
                option.val(obj1.name);
                option.text(obj1.defaultName);
    
                optgroup.append(option);
            }
        });
        $("#"+eventPropID).append(optgroup);
    });
   
    $(".eventProp-chosen-select").chosen()
    $(".eventPropVal-chosen-select").chosen()
   
    $('#'+eventPropID).on('change', function(evt, params) {
        var result1 = $.grep(scope.cleanedTotalProperties, function(e){ 
            return e.name == params.selected; 
        });
        var selectedPropType = result1[0].type
        
        
        var remainingArr = []
        var result = $.grep(reqNewSegmentation.getEvents()[index].properties, function(e){
            if(e.key == newID){
                e.name = params.selected
                e.type = selectedPropType
            }
            remainingArr.push(e) 
        });
        reqNewSegmentation.getEvents()[index].properties = remainingArr
        getValuesForEventProperty(params,newID,eventValID,selectedPropType)
        
            
    });  
}
function removeEvent(obj,isEdit){
    if($("#event-properties-Cntainer").children().last().attr('id') == obj.id){
        $("#"+obj.id).remove()
    }else if($("#event-properties-Cntainer").children().first().attr('id') == obj.id){
        $("#"+obj.id).next("div.event-info-section").find('p').remove()
        $("#"+obj.id).remove()
    }else{
        $("#"+obj.id).remove()
    }
    
    var remainingArr = []
    var result = $.grep(reqNewSegmentation.getEvents(), function(e){
        if(e.key == obj.id){
            delete e
        }else{
            remainingArr.push(e) 
        }
       
    });
    if(isEdit){
        customCntrlScopeEdit.eventPropsArrEdit = remainingArr
    }else{
        customCntrlScope.eventPropsArr = remainingArr   
    }
   
    reqNewSegmentation.setEvents(remainingArr)
  
}
function removePropertyFromEvent(obj,isEdit){
    $("#"+obj.id).remove()
    var indStr = obj.id.split("-")
    var index = parseInt(indStr[0].match(/\d+/))
    //    if(isEdit){
    //        index = parseInt(indStr[0].match(/\d+/))
    //    }else{
    //        index = indStr[0].slice(-1)
    //    }
    //    var index = indStr[0].slice(-1)
   
    var remainingArr = []
    var result = $.grep( reqNewSegmentation.getEvents()[index].properties, function(e){
       
        if(e.key == obj.id){
            delete e
        }else{
            remainingArr.push(e) 
        }
       
    });
    evePropsArr = remainingArr
    reqNewSegmentation.getEvents()[index].properties = remainingArr
    
}
function removeProperty(obj,isEdit){
  
    if($("#propertiesCntainer").children().last().attr('id') == $("#"+obj.id).parent().parent().last().attr('id')){
        $("#"+obj.id).parent().parent().remove()
    }else if($("#propertiesCntainer").children().first().attr('id') == $("#"+obj.id).parent().parent().first().attr('id')){
        $("#"+obj.id).parent().parent().next("div.property-box").find('p').remove()
        $("#"+obj.id).parent().parent().remove()
    }else{
        $("#"+obj.id).parent().parent().remove()
    }

    var remainingArr = []
    var result = $.grep(reqNewSegmentation.getProperties(), function(e){
        if(e.key == obj.id){
            delete e
        }else{
            remainingArr.push(e) 
        }
    });
    if(isEdit){
        customCntrlScopeEdit.propsArrEdit = remainingArr
    }else{
        customCntrlScope.propsArr = remainingArr   
    }
    
    reqNewSegmentation.setProperties(remainingArr)
}

function removeSuperProperty(obj,isEdit){
  
    if($("#superPropertiesCntainer").children().last().attr('id') == $("#"+obj.id).parent().parent().last().attr('id')){
        $("#"+obj.id).parent().parent().remove()
    }else if($("#superPropertiesCntainer").children().first().attr('id') == $("#"+obj.id).parent().parent().first().attr('id')){
        $("#"+obj.id).parent().parent().next("div.super-property-box").find('p').remove()
        $("#"+obj.id).parent().parent().remove()
    }else{
        $("#"+obj.id).parent().parent().remove()
    }
  
    var remainingArr = []
    var result = $.grep(reqNewSegmentation.getSuperProperties(), function(e){
        if(e.key == obj.id){
            delete e
        }else{
            remainingArr.push(e) 
        }
    });
    if(isEdit){
        customCntrlScopeEdit.superPropsArrEdit = remainingArr
    }else{
        customCntrlScope.superPropsArr = remainingArr   
    }
    reqNewSegmentation.setSuperProperties(remainingArr)
}
// Cities AutoComplete Widget & Configurations
function initializeCitiesForCountry(code){
    var  url = '../dummyData/getAllCitiesForCountry'
    $( "#cities" )
    // don't navigate away from the field on tab when selecting an item
    
    .autocomplete({
        minLength:3 ,
        source: function( request, response ) {
            $.getJSON( url, {
                term: extractLast( request.term ),
                country:code
            }, response );
        },
        search: function() {
            // custom minLength
            var term = extractLast( this.value );
            if ( term.length < 3 ) {
                return false;
            }
        },
        focus: function() {
            // prevent value inserted on focus
            return false;
        },
        change: function( event, ui ) {
           
            var vals = $("#cities").val().split(",")
            var result = $.grep(vals, function(e){
                if(e == " "){
                    delete e
                }else{
                    return e
                }
            });
            var arr = {
                countries:reqNewSegmentation.getLocations().countries,
                cities:result
            }
            reqNewSegmentation.setLocations(arr)
           
            return false;
             
        },
        select: function( event, ui ) {
            var terms = split( this.value );
            // remove the current input
            terms.pop();
            // add the selected item
            terms.push( ui.item.value );
            // add placeholder to get the comma-and-space at the end
            terms.push( "" );
            this.value = terms.join( ", " );
            var vals = $("#cities").val().split(",")
            var result = $.grep(vals, function(e){
                if(e == " "){
                    delete e
                }else{
                    return e
                }
            });
            var arr = {
                countries:reqNewSegmentation.getLocations().countries,
                cities:result
            }
            reqNewSegmentation.setLocations(arr)
           
            return false;
        }
    });
}
function getValuesForEventProperty(params,srcID,objID,selectedPropType){
    var indStr = srcID.split("-")
    var index = indStr[0].slice(-1)
    var select = $("#"+objID)
    var url = '../dummyData/getPropValuesTotal'
    $.getJSON(url, {
        "id":eventReq.getId(),
        "name":params.selected,
        "type":selectedPropType
    }, function(data) {
        var responseData = eval(data)
        select.find('option:gt(0)').remove();
        if(responseData.length>0){
            for (var key in responseData) {
                select.append($("<option>").attr('value',responseData[key]).text(responseData[key]));
            }
        }
        $('.eventPropVal-chosen-select').trigger('chosen:updated');
       
        $(select).on('change', function(evt, params) {
            var remainingArr = []
            var result = $.grep(reqNewSegmentation.getEvents()[index].properties, function(e){
                if(e.key == srcID){
                    e.value = params.selected
                }
                remainingArr.push(e) 
            });
            reqNewSegmentation.getEvents()[index].properties = remainingArr
            
        });
    });
       
}