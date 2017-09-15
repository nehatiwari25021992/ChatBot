/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var step3Html = $("#step3Html").html()
var step2Html = $("#step2Html").html()
$(function(){
    $(".example-advanced-form").steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "slideLeft",
        autoFocus: true,
        stepsOrientation: $.fn.steps.stepsOrientation.horizontal,
        loadingTemplate: '<span class="spinner"></span> #text#',
        onStepChanging: function (event, currentIndex, newIndex) {
            //return true;
            //console.log(event)
           // console.log(currentIndex)
           // console.log(newIndex)
            
            if(currentIndex < newIndex){
                if(currentIndex == 0){
                    startLoad()
                    var res = stepIndex0(event, currentIndex, newIndex)
                    stopLoad()
                    return res
                    //console.log(res)
                }
                if(currentIndex == 1){
                    startLoad()
                    var res = stepIndex1(event, currentIndex, newIndex)
                    var campaignType = $('input[name=campaignType]:checked').val()
                    //var campaignType = "InApp"
                    if(res){
                        stopLoad()
                        if(campaignType == "InApp"){
                            return res
                           // console.log(res)
                        }
                        else if(campaignType == "Survey"){
                            return res
                           // console.log(res)
                        }
                        else if(campaignType == "Email"){
                            //console.log("Email Campaign")
                            return res
                            //console.log(res)
                        }
                        else{
                            campaignScope.redirectPath()
                            //console.log(res)
                        }  
                    }else{
                        stopLoad()
                        return res 
                    }
                    
                }
                if(currentIndex == 2){
                    startLoad()
                    var res = stepIndex2(event, currentIndex, newIndex) 
                    stopLoad()
                    return res
                } 
            }else{
                return true  
            }
            
      
        },
        onStepChanged: function (event, currentIndex, newIndex) {
            var isEdit =  $("#isEdit").val()
            if(isEdit == "true"){
                var campaignType = campaignScope.campaignObj.campaignType   
            }else{
                var campaignType = $('input[name=campaignType]:checked').val()
            }
            //var campaignType = "InApp"
            if(newIndex == 0){
                if(campaignType == "InApp"){
                    $("#layoutInApp").show()
                    $("#step7Campaign").show()
                    $("#step8Campaign").show()
                    $("#NoFieldId").hide()
                    if(isEdit == "true"){
                        var responseData = JSON.parse(campaignScope.campaignObj.layoutJson)
                        console.log(responseData)
                        var lvalue = "0"
                        if(campaignScope.campaignObj.layoutType == "FullScreen"){
                            lvalue = "1"
                            $("#layoutFull").show()
                            $("#imageDiv").show()
                            $("#fullScreenImageId").attr("src", responseData.backgroundImage);
                        }else if(campaignScope.campaignObj.layoutType == "Alert"){
                            lvalue = "2"   
                            $("#layoutAlert").show()
                            $("#title").val(responseData.title)
                            $("#textMsg").val(responseData.text)
                            $("#bText").val(responseData.bText)
                        }else if(campaignScope.campaignObj.layoutType == "ConfirmBox"){
                            lvalue = "3" 
                            $("#layoutBox").show()
                            $("#titleConfirm").val(responseData.title)
                            $("#msg").val(responseData.text)
                            $("#bTextConfirm").val(responseData.bText1)
                            $("#bTextCancel").val(responseData.bText2)
                        } 
                        $("#layout").val(lvalue);
                        
                        var testObj = responseData.appEvents
                        var output = testObj.map(function(item){
                            return item
                        })
                        campaignScope.setEventsAndSegmentation(output)
                    }else{
                    
                    }
                    
                } else if (campaignType == "Survey"){
                    console.log("In Else if ")
                    $("#step8Campaign").hide()
                    $("#NoFieldId").hide()
                    var responseData = JSON.parse(campaignScope.campaignObj.layoutJson)
                    $("#layout").val(lvalue);
                        
                    var testObj = responseData.appEvents
                    var output = testObj.map(function(item){
                        return item
                    })
                    campaignScope.setEventsAndSegmentation(output)
                        
                         
                }
                else if (campaignType == "Email")
                {
                    $("#step8Campaign").show()
                    $("#NoFieldId").show()
                    $("#layoutInApp").hide()
                    $("#step7Campaign").hide()
                    $("#frequencyP").hide()
                    if(isEdit == "true"){
                        console.log("In Edit")
                        $("#redirectFrom").val("campaign")
                        if(campaignScope.campaignObj.segmentation != null){
                            var responseData = JSON.parse(campaignScope.campaignObj.segmentation)
                            campaignScope.setSegmentation1(responseData.segmentDefault)
                            if(responseData.scheduleTime != undefined){
                                $("#segmentNumber").val(responseData.scheduleTime.days) 
                                $("#segmentHour").val(responseData.scheduleTime.hour)   
                            }
                            campaignScope.setSegmentation2(responseData.segment) 
                        }
                        var layoutJson =JSON.parse(campaignScope.campaignObj.layoutJson)
                        console.log("Email Edit Fill up block ")
                        console.log(layoutJson)
                        emailDataConfiguration = {
                            appId:layoutJson.appId,
                            sendFrom:layoutJson.sendFrom,
                            subject:layoutJson.subject,
                            content:layoutJson.content,
                            userBase:layoutJson.userBase,
                            provider:layoutJson.provider,
                            propertyName:"1111"
                        //emailConfID:layoutJson.mailGunEmails.id //This will replace mail GUN Provider 
                        }
                        campaignScope.setEmailConfiguration(emailDataConfiguration)
                    }else{
                        console.log("Nothing To Do")
                    }
                        
                  
                }else{
                    console.log("Else Case Called For Push and Other ")
                    $("#step8Campaign").show()
                    $("#NoFieldId").show()
                    $("#layoutInApp").hide()
                    $("#step7Campaign").hide()
                    console.log(isEdit)
                    if(isEdit == "true"){
                        $("#redirectFrom").val("campaign")
                        if(campaignScope.campaignObj.segmentation != null){
                            var responseData = JSON.parse(campaignScope.campaignObj.segmentation)
                            campaignScope.setSegmentation1(responseData.segmentDefault)
                            if(responseData.scheduleTime != undefined){
                                $("#segmentNumber").val(responseData.scheduleTime.days) 
                                $("#segmentHour").val(responseData.scheduleTime.hour)   
                            }
                            campaignScope.setSegmentation2(responseData.segment) 
                        }
                        var layoutJson = JSON.parse(campaignScope.campaignObj.layoutJson)
                         console.log("GURU",campaignScope.campaignObj.name)
                        if(campaignType == "Email"){
                           emailDataConfiguration = {
                                appId:layoutJson.appId,
                                sendFrom:layoutJson.sendFrom,
                                subject:layoutJson.subject,
                                content:layoutJson.content.toString(),
                                userBase:layoutJson.userBase,
                                provider:layoutJson.provider ,
                                emailConfID:1 //This will replace mail GUN Provider 
                            } 
                            campaignScope.setEmailConfiguration(emailDataConfiguration)
                            
                        }
                        if(campaignType == "Push"){
                        	var messageValue;
                        	var isPushEventTrack = $("#enableTrakingId").is(':checked')
                        	 var geofencingChecked = $("#geofencingId").is(':checked')
                            console.log("geofencingChecked ##",geofencingChecked)
                            console.log("isPushEventTrack ##",isPushEventTrack)
                           
                        	if(isPushEventTrack ==false && geofencingChecked == false){
                        		console.log("isPushEventTrack false geofencingChecked  false")
                        		if(layoutJson.message instanceof Object){
                        			delete layoutJson.message["_App42CampaignName"];
                        			delete layoutJson.message["_App42Convert"];
                        			delete layoutJson.message["_App42GeoCampaign"];
                        			console.log("layoutJson.message ###",layoutJson.message)
                        			if(Object.keys(layoutJson.message).length==1){
                        				messageValue = layoutJson.message.alert
                        			}else{
                                       messageValue = layoutJson.message	
                        			}
                        		}else{
                        			messageValue = layoutJson.message
                        		}
                         	}else if(isPushEventTrack ==true && geofencingChecked == false){
                         		console.log("isPushEventTrack true geofencingChecked  false")
                         		if(layoutJson.message instanceof Object){
                         			layoutJson.message["_App42CampaignName"]= campaignScope.campaignObj.name
                                    layoutJson.message["_App42Convert"]=true
                         		    messageValue = layoutJson.message
                         		}else{
                         			var JSONObj ={};
                         	       	JSONObj = {
		             	                 alert:layoutJson.message,
		             	                _App42CampaignName:campaignScope.campaignObj.name,
		             	               _App42Convert:true,
                         	       	   }
                                      messageValue = JSONObj
                         		}
                         	}else if(isPushEventTrack ==false && geofencingChecked == true){
                         		console.log("isPushEventTrack false and geofencingChecked true")
                         		var lngt = new google.maps.LatLng(layoutJson.message._App42GeoCampaign.app42_lat,layoutJson.message._App42GeoCampaign.app42_lng)
					   	    	var bounds = new google.maps.LatLngBounds(lngt);
                         		__map.fitBounds(bounds);
						        __map.setZoom(8);
						        __distanceWidget.set('map', __map);
					   	        __distanceWidget.set('distance', parseFloat(layoutJson.message._App42GeoCampaign.app42_distance) ) 
                                __radiusWidget.set('distance', parseFloat(layoutJson.message._App42GeoCampaign.app42_distance) )
					   	        __distanceWidget.set('position', __map.getCenter());
					   	       google.maps.event.trigger(__map, 'resize');
                         		if(layoutJson.message instanceof Object){
                         			var _App42GeoCampaign ={};
                         			_App42GeoCampaign["content-available"] = 1
                         			_App42GeoCampaign["app42_geoBase"] = "coordinateBase"
                         			_App42GeoCampaign["app42_distance"] = parseFloat($("#distance").val())
                         			_App42GeoCampaign["app42_lng"] = parseFloat($("#longitude").val())
                         			_App42GeoCampaign["app42_lat"] =parseFloat($("#latitude").val())
                         			layoutJson.message["_App42Convert"]=true
                         			layoutJson.message._App42GeoCampaign =_App42GeoCampaign
                          			messageValue = layoutJson.message
                         		}else{
                         			var JSONObj ={};
                         			var _App42GeoCampaign ={};
                         			App42GeoCampaign["content-available"] = 1
                         			_App42GeoCampaign["app42_geoBase"] = "coordinateBase"
                         			_App42GeoCampaign["app42_distance"] = parseFloat($("#distance").val())
                         			_App42GeoCampaign["app42_lng"] = parseFloat($("#longitude").val())
                         			_App42GeoCampaign["app42_lat"] =parseFloat($("#latitude").val())
                         			JSONObj = {
		             	                alert:layoutJson.message,
		             	                _App42GeoCampaign :_App42GeoCampaign,
		             	                _App42Convert :true
                         	       	   }
                                      messageValue = JSONObj
                         		}
                         	}
                         	else if(isPushEventTrack ==true && geofencingChecked == true){
                         		console.log("isPushEventTrack true geofencingChecked  true")
                         		var lngt = new google.maps.LatLng(layoutJson.message._App42GeoCampaign.app42_lat,layoutJson.message._App42GeoCampaign.app42_lng)
					   	    	var bounds = new google.maps.LatLngBounds(lngt);
                         		__map.fitBounds(bounds);
						        __map.setZoom(8);
						        __distanceWidget.set('map', __map);
					   	        __distanceWidget.set('distance', parseFloat(layoutJson.message._App42GeoCampaign.app42_distance) ) 
                                __radiusWidget.set('distance', parseFloat(layoutJson.message._App42GeoCampaign.app42_distance) )
					   	        __distanceWidget.set('position', __map.getCenter());
					   	       google.maps.event.trigger(__map, 'resize');
                         		if(layoutJson.message instanceof Object){
                         			var _App42GeoCampaign ={};
                         			 _App42GeoCampaign["content-available"] = 1
                         			_App42GeoCampaign["app42_geoBase"] = "coordinateBase"
                         			_App42GeoCampaign["app42_distance"] = parseFloat($("#distance").val())
                         			_App42GeoCampaign["app42_lng"] = parseFloat($("#longitude").val())
                         			_App42GeoCampaign["app42_lat"] =parseFloat($("#latitude").val())
                         			
                         			layoutJson.message._App42GeoCampaign=_App42GeoCampaign
                                    layoutJson.message["_App42CampaignName"]= campaignScope.campaignObj.name
                                    layoutJson.message["_App42Convert"]=true
                         		    
                         		    messageValue = layoutJson.message
                         		}else{
                         			var JSONObj ={};
                         			var _App42GeoCampaign ={};
                        			 App42GeoCampaign["content-available"] = 1
                        			_App42GeoCampaign["app42_geoBase"] = "coordinateBase"
                        			_App42GeoCampaign["app42_distance"] = parseFloat($("#distance").val())
                        			_App42GeoCampaign["app42_lng"] = parseFloat($("#longitude").val())
                        			_App42GeoCampaign["app42_lat"] =parseFloat($("#latitude").val())
                         	       	JSONObj = {
		             	                alert:layoutJson.message,
		             	               _App42GeoCampaign:_App42GeoCampaign,
		             	               _App42CampaignName:campaignScope.campaignObj.name,
			             	            _App42Convert:true,
                         	       	   }
                                      messageValue = JSONObj
                         		}
                         	}
                        	console.log(messageValue)
                        	// This for checking is enable Tracking Or Not 
                        	    pushDataConfiguration = {
                                appId:layoutJson.id,
                                message:messageValue,
                                lang:layoutJson.lang,
                                badgeNSound:layoutJson.badgeNSound,
                                badgeType:layoutJson.badgeType,
                                sound:layoutJson.sound,
                                type:layoutJson.type,
                                badge:layoutJson.badge
                            }
                            campaignScope.setPushConfiguration(pushDataConfiguration)
                            
                        }
                        if(campaignType == "FaceBook"){
                            fbDataConfiguration = {
                                appId:layoutJson.id,
                                content:layoutJson.content
                
                            } 
                        //  campaignScope.setFbConfiguration(fbDataConfiguration)
                            
                        }
                    }
                    
                }
            }
            if(newIndex == 1){
                var campaignType = $('input[name=campaignType]:checked').val()
                // var campaignType = "InApp"
                if(campaignType == "InApp"){
                    $("#fImage").hide()
                    $("#boxEve").hide()
                    $("#cancelBtn").hide()
                    var selectLayout = $('#layout :selected').val()
                    if(selectLayout == '1'){
                        $("#titleAction").val("FullScreen") 
                        $("#fImage").show()
                        if(isEdit == "true"){
                            var responseData = JSON.parse(campaignScope.campaignObj.layoutActionJson)
                            var campaignType = $('input[name=campaignType]:checked').val()
                            var  eVal = "0"
                            if(responseData.selectEve1 == "trackEvent"){
                                eVal = "1"
                                $("#trackEve1Image").show()
                                $("#trackEveNameImage1").val(responseData.eventProperties1.propertyName)
                                setNameValuesPairImage1(responseData.eventProperties1)
                            }else if(responseData.selectEve1 == "abTest"){
                                eVal = "2"
                                $("#abEve1Image").show()
                                $("#myAbId1Image").val(responseData.eventProperties1.propertyName)
                            }else if(responseData.selectEve1 == "customCode"){
                                eVal = "3"
                                $("#customEve1Image").show()
                                $("#myCusId1Image").val(responseData.eventProperties1.propertyName)
                                $("#myCusIdVal1Image").val(responseData.eventProperties1.values)
                            }else if(responseData.selectEve1 == "openURL"){
                                eVal = "4"
                                $("#urlEve1Image").show()
                                $("#myUrlId1Image").val(responseData.eventProperties1.propertyName)
                            } 
                            $("#b1Skip").val(eVal);
                            eVal = 0
                            if(responseData.selectEve2 == "trackEvent"){
                                eVal = "1"
                                $("#trackEve2Image").show()
                                $("#trackEveName2Image").val(responseData.eventProperties2.propertyName)
                                setNameValuesPairImage2(responseData.eventProperties2)
                            }else if(responseData.selectEve2 == "abTest"){
                                eVal = "2"
                                $("#abEve2Image").show()
                                $("#myAbCanId1Image").val(responseData.eventProperties2.propertyName)
                            }else if(responseData.selectEve2 == "customCode"){
                                eVal = "3"
                                $("#customEve2Image").show()
                                $("#myCusCanId1Image").val(responseData.eventProperties2.propertyName)
                                $("#myCusCanIdVal1Image").val(responseData.eventProperties2.values)
                            }else if(responseData.selectEve2 == "openURL"){
                                eVal = "4"
                                $("#urlEve2Image").show()
                                $("#myCanUrlId2Image").val(responseData.eventProperties2.propertyName)
                            } 
                            $("#b2Target").val(eVal);
                            
                           
                        }
                    }else if(selectLayout == '2'){
                        var title = $('#title').val()
                        var text = $('#textMsg').val()
                        var bText = $('#bText').val()
                        $("#titleAction").val("Alert")
                        $("#boxEve").show()
                        $("#titl").val(title)
                        $("#msgBox").val(text)
                        $("#btext1").val(bText)   
                        if(isEdit == "true"){
                            var responseData = JSON.parse(campaignScope.campaignObj.layoutActionJson)
                            var  eVal = "0"
                            if(responseData. selectEve1 == "trackEvent"){
                                eVal = "1"
                                $("#trackEve1").show()
                                $("#trackEveName1").val(responseData.eventProperties1.propertyName)
                                setNameValuesPairButton1(responseData.eventProperties1)
                            }else if(responseData. selectEve1 == "abTest"){
                                eVal = "2"
                                $("#abEve1").show()
                                $("#myAbId1").val(responseData.eventProperties1. propertyName)
                            }else if(responseData. selectEve1 == "customCode"){
                                eVal = "3"
                                $("#customEve1").show()
                                $("#myCusId1").val(responseData.eventProperties1. propertyName)
                                $("#myCusIdVal1").val(responseData.eventProperties1.values)
                            }else if(responseData. selectEve1 == "openURL"){
                                eVal = "4"
                                $("#urlEve1").show()
                                $("#myUrlId1").val(responseData.eventProperties1. propertyName)
                            } 
                            $("#b1").val(eVal);
                        }
                           
                        
                    }else if(selectLayout == '3'){
                        var titleConfirm = $('#titleConfirm').val()
                        var msg = $('#msg').val()
                        var bTextConfirm = $('#bTextConfirm').val()
                        var bTextCancel = $('#bTextCancel').val()
                        $("#titleAction").val("ConfirmBox")  
                        $("#boxEve").show()
                        $("#cancelBtn").show()
                        $("#titl").val(titleConfirm)
                        $("#msgBox").val(msg)
                        $("#btext1").val(bTextConfirm)
                        $("#btext2").val(bTextCancel)
                        if(isEdit == "true"){
                            var responseData = JSON.parse(campaignScope.campaignObj.layoutActionJson)
                            var  eVal = "0"
                            if(responseData. selectEve1 == "trackEvent"){
                                eVal = "1"
                                $("#trackEve1").show()
                                $("#trackEveName1").val(responseData.eventProperties1. propertyName)
                                setNameValuesPairButton1(responseData.eventProperties1)
                            }else if(responseData. selectEve1 == "abTest"){
                                eVal = "2"
                                $("#abEve1").show()
                                $("#myAbId1").val(responseData.eventProperties1. propertyName)
                            }else if(responseData. selectEve1 == "customCode"){
                                eVal = "3"
                                $("#customEve1").show()
                                $("#myCusId1").val(responseData.eventProperties1. propertyName)
                                $("#myCusIdVal1").val(responseData.eventProperties1.values)
                            }else if(responseData. selectEve1 == "openURL"){
                                eVal = "4"
                                $("#urlEve1").show()
                                $("#myUrlId1").val(responseData.eventProperties1. propertyName)
                            } 
                            $("#b1").val(eVal);
                            if(responseData. selectEve2 == "trackEvent"){
                                eVal = "1"
                                $("#trackEve2").show()
                                $("#trackEveName2").val(responseData.eventProperties2.propertyName)
                                setNameValuesPairButton2(responseData.eventProperties2)
                            }else if(responseData. selectEve2 == "abTest"){
                                eVal = "2"
                                $("#abEve2").show()
                                $("#myAbCanId1").val(responseData.eventProperties2.propertyName)
                            }else if(responseData. selectEve2 == "customCode"){
                                eVal = "3"
                                $("#customEve2").show()
                                $("#myCusCanId1").val(responseData.eventProperties2.propertyName)
                                $("#myCusCanIdVal1").val(responseData.eventProperties2.values)
                            }else if(responseData. selectEve2 == "openURL"){
                                eVal = "4"
                                $("#urlEve2").show()
                                $("#myCanUrlId2").val(responseData.eventProperties2.propertyName)
                            } 
                            $("#b2").val(eVal);
                        }
                    }  
                
               
                } 
                else if(campaignType == "Survey"){
                    $("#step7Campaign").show()
                    $("#NoFieldId").hide()
                      
                } 
                else{
                //$("#NoFieldId").show()
                }
                   
                   
            }
            if(newIndex == 2){
                
            }
            return true; 
            
        },
        onFinishing: function (event, currentIndex) { 
            var newIndex = 0
            if(currentIndex == 2){
                var res = stepIndex2(event, currentIndex) 
                return res
            }else if(currentIndex == 1){
                var res = stepIndex1(event, currentIndex, newIndex)
                var campaignType = $('input[name=campaignType]:checked').val()
                if(res){
                    campaignScope.redirectPath()  
                }else{
                    return res 
                }
                
                
            } 
        },
        onFinished: function (event, currentIndex) {
            campaignScope.redirectPath()
        }
  

    });
});

function FrequencyChange (){
    var freType = $('input[name=frequency]:checked').val()
    if(freType == "Once"){
    // $("#frequencyP").hide()   
    }else{
    // $("#frequencyP").show()   
    }
    
}
function showLoadCamp(){
    if(jQuery('.colL').length == 0)
        return;
    jQuery('.colL').showLoading(
    {
        'addClass': 'loading-indicator-bars'
    }
    );  
}

// Hides Overlay Loader 
function hideLoadCamp(){
    jQuery('.colL').hideLoading();
}

$(function(){

    $('#layout').change(function(){
        // alert($('#layout :selected').val());
        $("#layoutFull").hide()
        $("#layoutAlert").hide()
        $("#layoutBox").hide()
        var selectLayout = $('#layout :selected').val()
        if(selectLayout == '1'){
            $("#layoutFull").show()
        }else if(selectLayout == '2'){
            $("#layoutAlert").show()
        }else if(selectLayout == '3'){
            $("#layoutBox").show()
        }
    });
    
//    $('#inAppEvent').change(function(){
//        
//        //        var selectEvent = $('#inAppEvent :selected').val()
//        //        alert(selectEvent)
//        var foo = []; 
//        $('#inAppEvent :selected').each(function(i, selected){ 
//            foo[i] = $(selected).val(); 
//        });
//        console.log(foo)
//        if(foo.indexOf("custom") != -1){
//            $("#customInAppEventBox").show() 
//        }else{
//            $("#customInAppEventBox").hide()  
//        } 
//    });
});

function stepIndex0 (event, currentIndex, newIndex){
    showLoadCamp()
    var isEdit =  $("#isEdit").val()
    var idCamp =  $("#idCamp").val()
    var error = "false"
    $("#error_name").hide();
    $("#error_frequency").hide();
    $("#error_frequencyP").hide();
    //$("#error_campaignType").hide();
    $("#error_date1").hide();
    $("#error_date2").hide();
    var cName = $.trim($("#name").val())
    //var maxUser = $.trim($("#maxUser").val())
    var frequency = $('input[name=frequency]:checked').val()
    var frequencyP = $.trim($("#frequencyPeriod").val())
    if(isEdit == "true"){
        var campaignType = campaignScope.campaignObj.campaignType   
    }else{
        var campaignType = $('input[name=campaignType]:checked').val()
    }
    
    //var campaignType = "InApp"
    // var priority = $.trim($("#priority").val())
    var startDate = convertDateFormate(campaignScope.ddate1)
    var endDate = convertDateFormate(campaignScope.ddate2)
    var start = moment(startDate);
    var end   = moment(endDate);
    var diffCurrStart = start.diff(moment(), 'days')
    var diffCurrEnd = end.diff(moment(), 'days')
    
    var s = end.from(start)
    var diff = (s.indexOf("ago") > -1)
    
    if(s == "a few seconds ago"){
        diff = false
    }
    var desc = $("#description").val()
    var campaignList = campaignScope.campaignList
    if($.trim(startDate).length == 0 || $.trim(startDate) == "NaN-NaN-aN")
    {
        var errorMsg = "Start Date is mandatory.<br />";
        $("#error_date1").show();
        $("#error_date1").html(errorMsg);
        error = "true";
    }else if(diffCurrStart != -0){
        if(isEdit == "false"){
            if(diffCurrStart < 0){
                var errorMsg = "Start Date is less then Current Date.<br />";
                $("#error_date1").show();
                $("#error_date1").html(errorMsg);
                error = "true"; 
            }  
        }
    }
    
    
    if($.trim(endDate).length == 0 || $.trim(endDate) == "NaN-NaN-aN")
    {
        var errorMsg = "End Date is mandatory.<br />";
        $("#error_date2").show();
        $("#error_date2").html(errorMsg);
        error = "true";
    }else if(diffCurrEnd != -0){
        if(isEdit == "false"){
            if(diffCurrEnd < 0){
                var errorMsg = "End Date is less then Current Date.<br />";
                $("#error_date2").show();
                $("#error_date2").html(errorMsg);
                error = "true"; 
            }   
        }
    }
    
    if($.trim(endDate).length != 0 && $.trim(endDate) != "NaN-NaN-aN" && $.trim(endDate).length != 0 && $.trim(endDate) != "NaN-NaN-aN")
    {
        
        if(diff == true)
        {
            var errorMsg = "Start Date is less then End Date.<br />";
            $("#error_date1").show();
            $("#error_date1").html(errorMsg);
            error = "true";
        } 
    }
    
    if(($.trim(cName).length == 0))
    {
        var errorMsg = "Campaign Name is mandatory.<br />";
        $("#error_name").show();
        $("#error_name").html(errorMsg);
        error = "true";
    }else if (campaignList.indexOf(cName) != -1){
        if(isEdit == "false"){
            var errorMsg = "Campaign Name is already Exist.<br />";
            $("#error_name").show();
            $("#error_name").html(errorMsg);
            error = "true";     
        }
        
    }
    if((frequency == undefined))
    {
        var errorMsg = "Frequency is mandatory.<br />";
        $("#error_frequency").show();
        $("#error_frequency").html(errorMsg);
        error = "true";
    }
    //
    if(frequency != undefined && frequency != "Once" && campaignType!= "Push" && campaignType!= "Email")
    
    {
        // alert("Frequency")
        if(frequencyP.length == 0){
            var errorMsg = "Frequency Period is mandatory.<br />";
            $("#error_frequencyP").show();
            $("#error_frequencyP").html(errorMsg);
            error = "true";   
        }
        else if (!isInteger(frequencyP)){
            var errorMsg = "Invalid Frequency.<br />";
            $("#error_frequencyP").show();
            $("#error_frequencyP").html(errorMsg);
            error = "true"; 
        }
         
    }
    
    if(campaignType == "Survey")
    {
        $("#step7Campaign").show()
        $("#NoFieldId").show()
        $("#configure").hide();
    }
    if(campaignType == "Email")
    {
        $("#configure").show();
        $("#NoFieldId").show()
        $("#emailMessage").show()
        $("#pushMessage").hide()
    }
    if(campaignType == "Push")
    {
        console.log("Campaign Type Push Called")
        $("#NoFieldId").show()
        $("#configure").show();
        $("#pushMessage").show();
        $("#emailMessage").hide();
    }
    //    if((campaignType == undefined))
    //    {
    //        var errorMsg = "Campaign Type is mandatory.<br />";
    //        $("#error_campaignType").show();
    //        $("#error_campaignType").html(errorMsg);
    //        error = "true";
    //    }
    if(error=="true")
    {
        hideLoadCamp()
        return false;  
    }else{
        $.ajax({
            type: "POST",
            async: false,
            dataType: 'json',
            url: '/event/saveBasicCampaign',
            data: "cName="+cName+'&frequency='+frequency+'&frequencyP='+frequencyP+'&campaignType='+campaignType+'&desc='+desc+'&app='+eventReq.id+"&startDate="+startDate+"&endDate="+endDate,
            complete: function (data) {
                hideLoadCamp()
                var res = JSON.parse(data.responseText)
            //                if (res.response == "true") {
            //                
            //                }else{
            //                  
            //                }
            }
        }); 
                    
                    
        return true; 
    } 
}

function stepIndex1 (event, currentIndex, newIndex){
    showLoadCamp()
    var isEdit =  $("#isEdit").val()
    var error = "false"
    $("#error_config").hide();
    $("#error_segmentationQ2").hide();
    $("#error_segmentNumber").hide();
    $("#error_seg").hide();
    $("#error_layout").hide();
    $("#error_bg").hide();
    $("#error_title").hide();
    $("#error_text").hide();
    $("#error_bText").hide();
    $("#error_titleConfirm").hide();
    $("#error_msg").hide();
    $("#error_bTextConfirm").hide();
    $("#error_bTextCancel").hide();
    //    $("#error_inAppEvent").hide();
    //    $("#error_customInAppEvent").hide();
    $("#error_eventCampaign").hide();
    var cName = $("#name").val()
    
    var segmentationQu = campaignScope.segmentationQ
    var selectLayout = $('#layout :selected').val()
    var bgFile = $('#bgFile').val()
    //alert(bgFile.split('.').pop())
    var title = $('#title').val()
    var text = $('#textMsg').val()
    var bText = $('#bText').val()
    var titleConfirm = $('#titleConfirm').val()
    var msg = $('#msg').val()
    var bTextConfirm = $('#bTextConfirm').val()
    var bTextCancel = $('#bTextCancel').val()
    if(isEdit == "true"){
        var campaignType = campaignScope.campaignObj.campaignType   
    }else{
        var campaignType = $('input[name=campaignType]:checked').val()
    }
    var segmentationQu2 = campaignScope.segmentationQ2
    var doneAfter = $("#segmentNumber").val()
    var segmentHour = $("#segmentHour").val()
    //var campaignType = "InApp"
    //    var inAppEve = []; 
    //    $('#inAppEvent :selected').each(function(i, selected){ 
    //        inAppEve[i] = $(selected).val(); 
    //    });
    //    console.log(inAppEve)
    //    var customInAppEvent = $.trim($("#customInAppEvent").val())
    var eventCampaign = campaignScope.eventCampaign
    if(segmentationQu == undefined)
    {
        var errorMsg = "Segmentation is mandatory <br />";
        $("#error_seg").show();
        $("#error_seg").html(errorMsg);
        error = "true";
    }
    var redirectFrom = $("#redirectFrom").val()
    var configurationObj = null
    
    //    if(inAppEve.length == 0)
    //    {
    //        var errorMsg = "Please choose In App Events <br />";
    //        $("#error_inAppEvent").show();
    //        $("#error_inAppEvent").html(errorMsg);
    //        error = "true";
    //    }
    //    if(inAppEve.indexOf("custom") != -1){
    //        if(customInAppEvent.length == 0){
    //            var errorMsg = "Please Enter Custom Event<br />";
    //            $("#error_customInAppEvent").show();
    //            $("#error_customInAppEvent").html(errorMsg);
    //            error = "true";   
    //        }
    //        
    //    }
    if(campaignType == "InApp"){
        
        if(eventCampaign == undefined)
        {
            var errorMsg = "Event(s) is mandatory<br />";
            $("#error_eventCampaign").show();
            $("#error_eventCampaign").html(errorMsg);
            error = "true";
        }
        if(selectLayout == '0')
        {
            var errorMsg = "Campaign Layout is mandatory.<br />";
            $("#error_layout").show();
            $("#error_layout").html(errorMsg);
            error = "true";
        }
    
        if(selectLayout == '1')
        {
            if(isEdit == "false"){
                if(($.trim(bgFile).length == 0)){
                    var errorMsg = "Please choose Image. <br />";
                    $("#error_bg").show();
                    $("#error_bg").html(errorMsg);
                    error = "true";  
                }else if(bgFile.split('.').pop() != "jpg" && bgFile.split('.').pop() != "JPG" && bgFile.split('.').pop() != "png" && bgFile.split('.').pop() != "PNG" && bgFile.split('.').pop() != "jpeg" && bgFile.split('.').pop() != "bmp"){
                    var errorMsg = "Sorry,"+ bgFile+" is invalid, allowed extensions are: JPG,PNG,BMP,JPEG <br />";
                    $("#error_bg").show();
                    $("#error_bg").html(errorMsg);
                    error = "true";  
                }  
            }
            
       
        }
    
        if(selectLayout == '2')
        {
            if(($.trim(title).length == 0)){
                var errorMsg = "Title is mandatory <br />";
                $("#error_title").show();
                $("#error_title").html(errorMsg);
                error = "true";  
            }
            if(($.trim(text).length == 0)){
                var errorMsg = "Message is mandatory.<br />";
                $("#error_text").show();
                $("#error_text").html(errorMsg);
                error = "true";  
            }
            if(($.trim(bText).length == 0)){
                var errorMsg = " OK Button text is mandatory <br />";
                $("#error_bText").show();
                $("#error_bText").html(errorMsg);
                error = "true";  
            }
         
        }
        if(selectLayout == '3')
        {
            if(($.trim(titleConfirm).length == 0)){
                var errorMsg = "Title is mandatory. <br />";
                $("#error_titleConfirm").show();
                $("#error_titleConfirm").html(errorMsg);
                error = "true";  
            }
            if(($.trim(msg).length == 0)){
                var errorMsg = "Message is mandatory.<br />";
                $("#error_msg").show();
                $("#error_msg").html(errorMsg);
                error = "true";  
            }
            if(($.trim(bTextConfirm).length == 0)){
                var errorMsg = "Confirm button text is mandatory.<br />";
                $("#error_bTextConfirm").show();
                $("#error_bTextConfirm").html(errorMsg);
                error = "true";  
            }
            if(($.trim(bTextCancel).length == 0)){
                var errorMsg = "Cancel button text is mandatory.<br />";
                $("#error_bTextCancel").show();
                $("#error_bTextCancel").html(errorMsg);
                error = "true";  
            }
       
        }
       
    }
    else if (campaignType =="Survey"){
        console.log("In Step 1 Edit Survey")
        if(eventCampaign == undefined)
        {
            var errorMsg = "Event(s) is mandatory<br />";
            $("#error_eventCampaign").show();
            $("#error_eventCampaign").html(errorMsg);
            error = "true";
        }
          
        
        
        
    }else{
        if(segmentationQu2 == undefined)
        {
            if(($.trim(doneAfter).length != 0)){
                var errorMsg = "Segmentation is mandatory <br />";
                $("#error_segmentationQ2").show();
                $("#error_segmentationQ2").html(errorMsg);
                error = "true";  
            }
            
        }else if(($.trim(doneAfter).length == 0)){
            if(segmentationQu2 != undefined){
                var errorMsg = "Done After is mandatory <br />";
                $("#error_segmentNumber").show();
                $("#error_segmentNumber").html(errorMsg);
                error = "true";
            }   
        }
        else if(segmentationQu != undefined && segmentationQu2 != undefined){
            if(segmentationQu == segmentationQu2){
                var errorMsg = "Segmentations can't be same.";
                $("#error_segmentationQ2").show();
                $("#error_segmentationQ2").html(errorMsg);
                error = "true";
            }
        }
        if(redirectFrom == "campaign"){
            if(campaignType == "Email"){
                $("#emailMessage").show()
                $("#pushMessage").hide()
                //console.log(emailDataConfiguration)
                if(emailDataConfiguration != undefined){
                    configurationObj = JSON.stringify(emailDataConfiguration);  
                }else{
                    var errorMsg = "Please add "+campaignType +" configuration";
                    $("#error_config").show();
                    $("#error_config").html(errorMsg);
                    error = "true";  
                }
                
            }else if(campaignType == "Push"){
            	$("#emailMessage").hide()
                $("#pushMessage").show()
                if(pushDataConfiguration != undefined){
                	// This is for a Geo fencing message builder while creating push campaign
                	var isGeofencing = $("#geofencingId").is(':checked') // for checking is active or not 
                	var isPushEventTrack = $("#enableTrakingId").is(':checked')
                	if(isGeofencing){
                		var JSONObj ={};
                    	if(pushDataConfiguration.message instanceof Object){
                    		var _App42GeoCampaign ={};
                 			_App42GeoCampaign["content-available"] = 1
                 			_App42GeoCampaign["app42_geoBase"] = "coordinateBase"
                 			_App42GeoCampaign["app42_distance"] = parseFloat($("#distance").val())
                 			_App42GeoCampaign["app42_lng"] = parseFloat($("#longitude").val())
                 			_App42GeoCampaign["app42_lat"] =parseFloat($("#latitude").val())
                 			pushDataConfiguration.message._App42GeoCampaign=_App42GeoCampaign
                 			pushDataConfiguration.message._App42Convert=true
                    	}else{
                    		var _App42GeoCampaign ={};
                 			_App42GeoCampaign["content-available"] = 1
                 			_App42GeoCampaign["app42_geoBase"] = "coordinateBase"
                 			_App42GeoCampaign["app42_distance"] = parseFloat($("#distance").val())
                 			_App42GeoCampaign["app42_lng"] = parseFloat($("#longitude").val())
                 			_App42GeoCampaign["app42_lat"] =parseFloat($("#latitude").val())
                 			JSONObj = {
                                alert:pushDataConfiguration.message,
                                _App42GeoCampaign:_App42GeoCampaign,
                                _App42Convert:true
                            }
                    		pushDataConfiguration.message = JSONObj
                    	}	
                	}else{
                		if(pushDataConfiguration.message instanceof Object){
                			delete pushDataConfiguration.message["_App42GeoCampaign"];
                			console.log("isPushEventTrack ##",isPushEventTrack)
                			if(isPushEventTrack ==false){
                				delete pushDataConfiguration.message["_App42Convert"];
                				delete pushDataConfiguration.message["_App42CampaignName"];
                			}
                			console.log("pushDataConfiguration.message ###",pushDataConfiguration.message)
                			console.log("pushDataConfiguration.message length ###",Object.keys(pushDataConfiguration.message).length)
                			if(Object.keys(pushDataConfiguration.message).length==1){
                				console.log("pushDataConfiguration.message Alert  ###",pushDataConfiguration.message.alert)
                				pushDataConfiguration.message = pushDataConfiguration.message.alert
                			}else{
                			   pushDataConfiguration.message = pushDataConfiguration.message
                			}
                    	}else{
                    		pushDataConfiguration.message = pushDataConfiguration.message
                    	}	
                	}
                	
                	configurationObj = JSON.stringify(pushDataConfiguration);  
                  }else{
                    var errorMsg = "Please add "+campaignType +" configuration";
                    $("#error_config").show();
                    $("#error_config").html(errorMsg);
                    error = "true";    
                }
                   
            }else if(campaignType == "FaceBook"){
                if(fbDataConfiguration != undefined){
                    configurationObj = JSON.stringify(fbDataConfiguration);    
                }else{
                    var errorMsg = "Please add "+campaignType +" configuration";
                    $("#error_config").show();
                    $("#error_config").html(errorMsg);
                    error = "true";    
                }
                   
            }
            
        }else{
            emailDataConfiguration = null
            pushDataConfiguration = null
            fbDataConfiguration = null
            var errorMsg = "Please add "+campaignType +" configuration";
            $("#error_config").show();
            $("#error_config").html(errorMsg);
            error = "true";  
        }
        
    }
   
    if(error=="true")
    {
        hideLoadCamp()
        return false;  
    }else{
        var data
        
        if(selectLayout == "1"){
            data = new FormData();
            data.append( 'bgFile',$( '#bgFile' )[0].files[0] );
            data.append( 'segmentationQuid',segmentationQu);
            data.append( 'selectLayout',selectLayout);
            data.append( 'app',eventReq.id);   
            data.append( 'cName',cName); 
            data.append( 'eventCampaignArray',eventCampaign); 
            data.append( 'isEdit',isEdit); 
            data.append( 'campaignType',campaignType); 
            data.append( 'segmentationQuid2',segmentationQu2); 
            data.append( 'doneAfter',doneAfter); 
            data.append( 'configurationObj',configurationObj); 
            data.append( 'segmentHour',segmentHour); 
            data.append( 'provider',"MAIL GUN"); 
            data.append( 'emailConfID',1); 
            
            $.ajax({
                type:'POST',
                url: '/event/saveCampaignLayout',
                data:data,
                cache:false,
                contentType: false,
                processData: false,
                complete: function (data){
                    hideLoadCamp()
                    emailDataConfiguration = null
                    pushDataConfiguration = null
                    fbDataConfiguration = null
                }
            }); 
        }else{
            
            var paramData = {
                segmentationQuid:segmentationQu,
                selectLayout:selectLayout,
                bgFile:bgFile,
                title:title,
                text:text,
                bText:bText,
                titleConfirm:titleConfirm,
                app:eventReq.id,
                msg:msg,
                bTextConfirm:bTextConfirm,
                bTextCancel:bTextCancel,
                cName:cName,
                eventCampaignArray:eventCampaign +"",
                isEdit:isEdit,
                campaignType:campaignType,
                segmentationQuid2:segmentationQu2?segmentationQu2:"undefined",
                doneAfter:doneAfter,
                configurationObj:configurationObj,
                segmentHour:segmentHour
            }
            console.log(paramData)
            console.log("segmentationQuid="+segmentationQu+'&selectLayout='+selectLayout+'&bgFile='+bgFile+'&title='+title+'&text='+text+'&bText='+bText+'&titleConfirm='+titleConfirm+'&app='+eventReq.id+'&msg='+msg+'&bTextConfirm='+bTextConfirm+'&bTextCancel='+bTextCancel+'&cName='+cName+"&eventCampaignArray="+eventCampaign+"&isEdit="+isEdit+"&campaignType="+campaignType+"&segmentationQuid2="+segmentationQu2+"&doneAfter="+doneAfter+"&configurationObj="+configurationObj+"&segmentHour="+segmentHour+"&provider="+"Mail Gun")
            $.ajax({
                type:'POST',
                async: false,
                dataType: 'json',
                url: '/event/saveCampaignLayout',
                data:paramData,
                complete: function (data){
                    hideLoadCamp()
                    emailDataConfiguration = {};
                    pushDataConfiguration = {};
                    fbDataConfiguration = {};
                }
            }); 
    

        }
        
        
        return true; 
    } 
}
function stepIndex2(event, currentIndex, newIndex){
    showLoadCamp()
    var isEdit =  $("#isEdit").val()
    var error = "false"
    var campaignType = $('input[name=campaignType]:checked').val()
    var dataParameter
    $("#error_b1Skip").hide();
    $("#error_titles").hide();
    $("#error_b2Target").hide();
    $("#error_trackEveNameImage1").hide();
    $("#error_eve1PropertyImage").hide();
    $("#error_myCusId1Image").hide();
    $("#error_myUrlId1Image").hide();
    $("#error_trackEveName2Image").hide();
    $("#error_eve2PropertyImage").hide();
    $("#error_myAbCanId1Image").hide();
    $("#error_myCusCanId1Image").hide();
    $("#error_myCanUrlId2Image").hide();
    $("#error_b1").hide();
    $("#error_b2").hide();
    $("#error_trackEveName1").hide();
    $("#error_trackEveName2").hide();
    $("#error_eve1Property").hide();
    $("#error_eve2Property").hide();
    $("#error_myAbId1").hide();
    $("#error_myAbCanId1").hide();
    $("#error_myCusId1").hide();
    $("#error_myCusCanId1").hide();
    $("#error_myUrlId1").hide();
    $("#error_myCanUrlId2").hide();
    $("#error_myCusIdVal1Image").hide();
    $("#error_myCusCanIdVal1Image").hide();
    $("#error_myCusIdVal1").hide();
    $("#error_myCusCanIdVal1").hide();
    var titleAction = $("#titleAction").val()
    var cName = $("#name").val()
    var titleSurvey = $("#titleSurvey").val()
    var question =$("#question").val()
    if(titleAction == "FullScreen"){
        var skipEve = $('#b1Skip :selected').val()
        var targetEve = $('#b2Target :selected').val()
        var trackEveNameImage1 = $.trim($("#trackEveNameImage1").val())
        var trackEveName2Image = $.trim($("#trackEveName2Image").val())
        var divObj1Image = $("#eve1PropertyImage").children(".groupInput1Image")
        var divObj2Image = $("#eve2PropertyImage").children(".groupInput2Image")
        var inputValues1Image = [];
        var inputValues2Image = [];
        $('.groupInput1Image input').each(function() {
            var input = $(this);
            if(input.val() != "" && input.val()!= null){
                inputValues1Image.push(input.val())    
            }
        })
        
        $('.groupInput2Image input').each(function() {
            var input = $(this);
            if(input.val() != "" && input.val()!= null){
                inputValues2Image.push(input.val())    
            }
        })
        var myAbId1Image = $.trim($("#myAbId1Image").val())
        var myAbCanId1Image = $.trim($("#myAbCanId1Image").val())
        
        var customName1Image = $.trim($("#myCusId1Image").val())
        var customJson1Image = $.trim($("#myCusIdVal1Image").val())
        
        var customName2Image = $.trim($("#myCusCanId1Image").val())
        var customJson2Image = $.trim($("#myCusCanIdVal1Image").val())
        
        var url1Image = $.trim($("#myUrlId1Image").val())
        var url2Image = $.trim($("#myCanUrlId2Image").val())
        if(skipEve == "0"){
            var errorMsg = "Target Event is mandatory.<br />";
            $("#error_b1Skip").show();
            $("#error_b1Skip").html(errorMsg);
            error = "true";  
        }else if(skipEve == "1"){
            if(trackEveNameImage1.length == 0){
                var errorMsg = "Skip Event is mandatory.<br />";
                $("#error_trackEveNameImage1").show();
                $("#error_trackEveNameImage1").html(errorMsg);
                error = "true";
            }
            if(divObj1Image.length != 0){
                if(2*(divObj1Image.length) != inputValues1Image.length){
                    var errorMsg = "Property details are mandatory.<br />";
                    $("#error_eve1PropertyImage").show();
                    $("#error_eve1PropertyImage").html(errorMsg);
                    error = "true";   
                }
            }
        }else if(skipEve == "2"){
            if(myAbId1Image.length == 0){
                var errorMsg = "A/B Test Name is mandatory. <br />";
                $("#error_myAbId1Image").show();
                $("#error_myAbId1Image").html(errorMsg);
                error = "true";
            }
        }else if(skipEve == "3"){
            if(customName1Image.length == 0){
                var errorMsg = "Custom Code Name is mandatory. <br />";
                $("#error_myCusId1Image").show();
                $("#error_myCusId1Image").html(errorMsg);
                error = "true";
            }
            if(customJson1Image.length != 0){
                var result = isValidJSON(customJson1Image)
                if(!result){
                    var errorMsg = "Invalid Json.<br />";
                    $("#error_myCusIdVal1Image").show();
                    $("#error_myCusIdVal1Image").html(errorMsg);
                    error = "true";  
                }
            }
            
        }else if(skipEve == "4"){
            if(url1Image.length == 0){
                var errorMsg = "URL is mandatory.<br />";
                $("#error_myUrlId1Image").show();
                $("#error_myUrlId1Image").html(errorMsg);
                error = "true";
            }  
        }
        if(targetEve == "0"){
            var errorMsg = "URL is mandatory.<br />";
            $("#error_b2Target").show();
            $("#error_b2Target").html(errorMsg);
            error = "true";  
        }else if(targetEve == "1"){
            if(trackEveName2Image.length == 0){
                var errorMsg = "Track Event Name is mandatory.<br />";
                $("#error_trackEveName2Image").show();
                $("#error_trackEveName2Image").html(errorMsg);
                error = "true";
            }
            if(divObj2Image.length != 0){
                if(2*(divObj2Image.length) != inputValues2Image.length){
                    var errorMsg = "Property details are mandatory.<br />";
                    $("#error_eve2PropertyImage").show();
                    $("#error_eve2PropertyImage").html(errorMsg);
                    error = "true";
                }
            }
        }else if(targetEve == "2"){
            if(myAbCanId1Image.length == 0){
                var errorMsg = "A/B Test Name is mandatory.<br />";
                $("#error_myAbCanId1Image").show();
                $("#error_myAbCanId1Image").html(errorMsg);
                error = "true";
            }
        }else if(targetEve == "3"){
            if(customName2Image.length == 0){
                var errorMsg = "Custom Code Name is mandatory.<br />";
                $("#error_myCusCanId1Image").show();
                $("#error_myCusCanId1Image").html(errorMsg);
                error = "true";
            }
            if(customJson2Image.length != 0){
                var result = isValidJSON(customJson2Image)
                if(!result){
                    var errorMsg = "Invalid Json<br />";
                    $("#error_myCusCanIdVal1Image").show();
                    $("#error_myCusCanIdVal1Image").html(errorMsg);
                    error = "true";  
                }
            }
        }else if(targetEve == "4"){
            if(url2Image.length == 0){
                var errorMsg = "URL is mandatory.<br />";
                $("#error_myCanUrlId2Image").show();
                $("#error_myCanUrlId2Image").html(errorMsg);
                error = "true";
            } 
        }
        if(error=="true")
        {
            hideLoadCamp()
            return false;  
        }else{
            dataParameter = "app="+eventReq.id+"&titleAction="+titleAction+"&selectEve1="+skipEve+"&selectEve2="+targetEve+"&cName="+cName+"&trackEveName1="+trackEveNameImage1+"&trackEveName2="+trackEveName2Image+"&inputValues1="+inputValues1Image+"&inputValues2="+inputValues2Image+"&abTestEvent1="+myAbId1Image+"&abTestEvent2="+myAbCanId1Image+"&customName1="+customName1Image+"&customJson1="+customJson1Image+"&customName2="+customName2Image+"&customJson2="+customJson2Image+"&url1="+url1Image+"&url2="+url2Image  
            var result = sendData(dataParameter) 
            return result
        }
    }else if(titleAction == "Alert" || titleAction == "ConfirmBox"){
        var selectEve1 = $('#b1 :selected').val()
        var selectEve2 = $('#b2 :selected').val()
        var trackEveName1 = $.trim($("#trackEveName1").val())
        var trackEveName2 = $.trim($("#trackEveName2").val())
        var divObj1 = $("#eve1Property").children(".groupInput1")
        var divObj2 = $("#eve2Property").children(".groupInput2")
        var inputValues1 = [];
        var inputValues2 = [];
        
        $('.groupInput1 input').each(function() {
            var input = $(this);
            if(input.val() != "" && input.val()!= null){
                inputValues1.push(input.val())    
            }
        })
        
        $('.groupInput2 input').each(function() {
            var input = $(this);
            if(input.val() != "" && input.val()!= null){
                inputValues2.push(input.val())    
            }
        })
        var myAbId1 = $.trim($("#myAbId1").val())
        var myAbCanId1 = $.trim($("#myAbCanId1").val())
        
        var customName1 = $.trim($("#myCusId1").val())
        var customJson1 = $.trim($("#myCusIdVal1").val())
        
        var customName2 = $.trim($("#myCusCanId1").val())
        var customJson2 = $.trim($("#myCusCanIdVal1").val())
        
        var url1 = $.trim($("#myUrlId1").val())
        var url2 = $.trim($("#myCanUrlId2").val())
        
        
        if(selectEve1 == "1"){
            if(trackEveName1.length == 0){
                var errorMsg = "Track Event Name is mandatory.<br />";
                $("#error_trackEveName1").show();
                $("#error_trackEveName1").html(errorMsg);
                error = "true";
            }
            if(divObj1.length != 0){
                if(2*(divObj1.length) != inputValues1.length){
                    var errorMsg = "Property details are mandatory.<br />";
                    $("#error_eve1Property").show();
                    $("#error_eve1Property").html(errorMsg);
                    error = "true";   
                }
            }
        }else if(selectEve1 == "2"){
            if(myAbId1.length == 0){
                var errorMsg = "A/B Test Name is mandatory.<br />";
                $("#error_myAbId1").show();
                $("#error_myAbId1").html(errorMsg);
                error = "true";
            }
        }else if(selectEve1 == "3"){
            if(customName1.length == 0){
                var errorMsg = "Custom Code Name is mandatory.<br />";
                $("#error_myCusId1").show();
                $("#error_myCusId1").html(errorMsg);
                error = "true";
            }
            if(customJson1.length != 0){
                var result = isValidJSON(customJson1)
                if(!result){
                    var errorMsg = "Invalid Json.<br />";
                    $("#error_myCusIdVal1").show();
                    $("#error_myCusIdVal1").html(errorMsg);
                    error = "true";  
                }
            }
        }else if(selectEve1 == "4"){
            if(url1.length == 0){
                var errorMsg = "URL is mandatory.<br />";
                $("#error_myUrlId1").show();
                $("#error_myUrlId1").html(errorMsg);
                error = "true";
            }  
        }else if(selectEve1 == "0"){
            var errorMsg = "On Button Click Action is mandatory.<br />";
            $("#error_b1").show();
            $("#error_b1").html(errorMsg);
            error = "true";
        }
        
        if(titleAction == "ConfirmBox"){
            if(selectEve2 == "1"){
                if(trackEveName2.length == 0){
                    var errorMsg = "Track Event Name is mandatory.<br />";
                    $("#error_trackEveName2").show();
                    $("#error_trackEveName2").html(errorMsg);
                    error = "true";
                }
                if(divObj2.length != 0){
                    
                    if(2*(divObj2.length) != inputValues2.length){
                        var errorMsg = "Property details are mandatory.<br />";
                        $("#error_eve2Property").show();
                        $("#error_eve2Property").html(errorMsg);
                        error = "true";
                    }
                }
            }else if(selectEve2 == "2"){
                if(myAbCanId1.length == 0){
                    var errorMsg = "A/B Test Name is mandatory.<br />";
                    $("#error_myAbCanId1").show();
                    $("#error_myAbCanId1").html(errorMsg);
                    error = "true";
                }
            }else if(selectEve2 == "3"){
                if(customName2.length == 0){
                    var errorMsg = "Custom Code is mandatory.<br />";
                    $("#error_myCusCanId1").show();
                    $("#error_myCusCanId1").html(errorMsg);
                    error = "true";
                }
                if(customJson2.length != 0){
                    var result = isValidJSON(customJson2)
                    if(!result){
                        var errorMsg = "Invalid Json.<br />";
                        $("#error_myCusCanIdVal1").show();
                        $("#error_myCusCanIdVal1").html(errorMsg);
                        error = "true";  
                    }
                }
            }else if(selectEve2 == "4"){
                if(url2.length == 0){
                    var errorMsg = "URL is mandatory.<br />";
                    $("#error_myCanUrlId2").show();
                    $("#error_myCanUrlId2").html(errorMsg);
                    error = "true";
                } 
            }else if(selectEve2 == "0"){
                var errorMsg = "On Button Click Action is mandatory.<br />";
                $("#error_b2").show();
                $("#error_b2").html(errorMsg);
                error = "true";
            }  
        }
        
        if(error=="true")
        {
            hideLoadCamp()
            return false;  
        }else{
            dataParameter = "app="+eventReq.id+"&titleAction="+titleAction+"&selectEve1="+selectEve1+"&selectEve2="+selectEve2+"&cName="+cName+"&trackEveName1="+trackEveName1+"&trackEveName2="+trackEveName2+"&inputValues1="+inputValues1+"&inputValues2="+inputValues2+"&abTestEvent1="+myAbId1+"&abTestEvent2="+myAbCanId1+"&customName1="+customName1+"&customJson1="+customJson1+"&customName2="+customName2+"&customJson2="+customJson2+"&url1="+url1+"&url2="+url2
            var result = sendData(dataParameter)
            return result
        }
        
         
    }
    if(campaignType == "Survey"){
        surveyValidation();
    }
    
    if(isEdit == "true"){
        var campaignType = campaignScope.campaignObj.campaignType   
        if(campaignType == "Survey"){
            surveyValidation();
        }
    }
    
}

function surveyValidation(){
    var answer= null;
    var titleSurvey = $("#titleSurvey").val()
    var question =$("#question").val()
    if(titleSurvey == ''){
        $("#error_titles").show();
    }
    if (question == ''){
        $("#error_questions").show();
    }
    if (question != ''){
        $("#error_questions").hide();
    }
    if($("#answerSurvey").length == 0){
        $("#error_empty_answer").show();
    }
    var emptyAnswer = true;             
    $(".answerSurvey").each(function(){
        $("#error_empty_answer").hide();
        
        if($(this).val()== ''){
            emptyAnswer=false;
            $("#error_answer").show();
        }
        else{
            answer = $(this).val();
            $("#error_answer").hide();
        }
        
    });
    //    
   
    if (question != '' && titleSurvey != '' && answer != null && emptyAnswer ==true){
        $("#error_titles").hide();
        $("#error_questions").hide();
        $("#error_answer").hide();
        $("#error_maxQuestion").hide();
        saveSurvey();
    }
        
    
}
function saveSurvey(){
    angular.element(document.getElementById('YourElementId')).scope().submit();
}
function sendData(dataParameter){
    $.ajax({
        type: "POST",
        async: false,
        dataType: 'json',
        url: '/event/saveCampaignLayoutAction',
        data: dataParameter,
        complete: function (data) {
            hideLoadCamp()
        }
    }); 
    return true; 
}


$(document).ready(function() {
    attachPropertyValue()
});

$(function(){
    attachHandler()
});

function convertDateFormate(inputFormat) {
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }
    var d = new Date(inputFormat);
    return[pad(d.getFullYear()), pad(d.getMonth()+1), ("0" + d.getDate()).slice(-2)].join('-');
}


function setNameValuesPairImage1(responseData){
    var wrapper = $("#eve1PropertyImage"); //Fields wrapper
    if(responseData.values=== undefined){
        
    }else{
        $.each(responseData.values, function( index,element){
            $(wrapper).append('<div class="groupInput1Image"><input type="text" name="mytext" id="myId'+index+'" placeholder="Property Name" value="'+element.name+'"/><input type="text" name="mytextVal'+index+'" id="myIdVal'+index+'" placeholder="Property Value" value="'+element.value+'"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
            
        });
    }
}
function setNameValuesPairImage2(responseData){
    var wrapper = $("#eve2PropertyImage"); //Fields wrapper
    if(responseData.values=== undefined){
        
    }else{
        $.each(responseData.values, function( index,element){
            $(wrapper).append('<div class="groupInput2Image"><input type="text" name="mytext" id="myId'+index+'" placeholder="Property Name" value="'+element.name+'"/><input type="text" name="mytextVal'+index+'" id="myIdVal'+index+'" placeholder="Property Value" value="'+element.value+'"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
            
        });
    }
}

function setNameValuesPairButton1(responseData){
    var wrapper = $("#eve1Property"); //Fields wrapper
    if(responseData.values=== undefined){
        
    }else{
        $.each(responseData.values, function( index,element){
            $(wrapper).append('<div class="groupInput1"><input type="text" name="mytext" id="myId'+index+'" placeholder="Property Name" value="'+element.name+'"/><input type="text" name="mytextVal'+index+'" id="myIdVal'+index+'" placeholder="Property Value" value="'+element.value+'"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
            
        });
    }
}
function setNameValuesPairButton2(responseData){
    var wrapper = $("#eve2Property"); //Fields wrapper
    if(responseData.values=== undefined){
        
    }else{
        $.each(responseData.values, function( index,element){
            $(wrapper).append('<div class="groupInput2"><input type="text" name="mytext" id="myId'+index+'" placeholder="Property Name" value="'+element.name+'"/><input type="text" name="mytextVal'+index+'" id="myIdVal'+index+'" placeholder="Property Value" value="'+element.value+'"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
            
        });
    }
}

function isValidJSON(str) {
    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (str){
            return this.indexOf(str) == 0;
        };
        String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }
    try {
        var ct = JSON.parse(str)
        if(!str.startsWith("{") || !str.endsWith("}") ){
            return false
        }
        if(typeof ct !== "object"){
            return false
        }else if(ct === null){
            return false
        }
    }
    catch (err) {
        return false
    }
    return true
 
}
 
function isInteger(x) {
    return x % 1 === 0;
}

function onlyNos(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else {
            return true;
        }

        if (charCode > 31 && (charCode < 48 || charCode > 57)) {

            return false;

        }

        return true;

    }

    catch (err) {

        alert(err.Description);

    }

}

function inAppInit(){
    //        $('.example-advanced-form').steps('remove', Number("1"))
    //        $('.example-advanced-form').steps("add",{
    //            title: "Segment & Layout",
    //            content: step2Html
    //        });
    //console.log("InApp Radio button")
        
    $('.example-advanced-form').steps('remove', Number("2"))
    $('.example-advanced-form').steps("add", {
        title: "Action",
        content: step3Html
    });
    attachHandler()
    attachPropertyValue()
    //       campaignScope.attachScopeData()
    $("#onceId").hide()
    // $('input[name=frequency][value= Daily]').prop("checked",true)
    $("#frequencyP").show()
}
function surveyInit(){
    $("#survey").show();
    
   // console.log("In survey Button")
    $('.example-advanced-form').steps('remove', Number("2"))
    $('.example-advanced-form').steps("add", {
        title: "Action",
        content: step3Html
    });
    attachHandler()
    attachPropertyValue()
    //       campaignScope.attachScopeData()
    $("#segment").hide()         
    $("#segmenta").hide()
    // $("#step7Campaign").show()
    $("#onceId").hide()
    //$('input[name=frequency][value= Daily]').prop("checked",true)
    $("#frequencyP").show()
    $("#step7Campaign").show();
        
    var e1 = angular.element(document.getElementById("surveyContent"));
    e1.html($('#hidden-template').html());

    // Compile controller 2 html
    var mController = angular.element(document.getElementById("addCampaignControllerId"));
    mController.scope().activateView(e1);
    $("#survey").show();
    //$("#campaignEvent").hide();
    $("#titleAction").hide();
}

function EmailInit(){
    $('.example-advanced-form').steps('remove', Number("2"))
    $("#onceId").show()
    $("#NoFieldId").show()
    $('input[name=frequency][value= Once]').prop("checked",true)
    //attachHandler()
    //attachPropertyValue()
    $("#frequencyP").hide()
    
}
function typeChange (campaignType){
	 if(campaignType == "Push"){
		 //console.log("Push Traking Button Show.")
		 $("#enablePushTrakingId").show()
		 $("#geofencingDivId").show()
    }else{
    	//console.log("Push Traking Button Hide.")
    	$("#enablePushTrakingId").hide()
    	$("#geofencingDivId").hide()
    }
    if(campaignType == "InApp"){
        inAppInit()
        $('input[name=frequency][value= Daily]').prop("checked",true)
    }
    else if (campaignType == "Survey"){
        surveyInit()
        $('input[name=frequency][value= Daily]').prop("checked",true)
            
    }
    else if (campaignType == "Email"){
        EmailInit();
            
    }
    else{
    	$('.example-advanced-form').steps('remove', Number("2"))
        $("#onceId").show()
        $("#NoFieldId").show()
        $('input[name=frequency][value= Once]').prop("checked",true)
        //        $('.example-advanced-form').steps('remove', Number("1"))
        //        $('.example-advanced-form').steps("add",{
        //            title: "Segment",
        //            content: step2Html
        //        });
        //       campaignScope.attachScopeData()
        $("#frequencyP").hide()
    }
}

function attachHandler(){
    $('#b1').change(function(){
        $("#trackEve1").hide()
        $("#trackEveName1").val('')
        $("#abEve1").hide()
        $("#myAbId1").val('')
        $("#customEve1").hide()
        $("#urlEve1").hide()
        var selectLayout = $('#b1 :selected').val()
        if(selectLayout == '1'){
            $("#trackEve1").show()
        }else if(selectLayout == '2'){
            $("#abEve1").show()
        }else if(selectLayout == '3'){
            $("#customEve1").show()
        }else if(selectLayout == '4'){
            $("#urlEve1").show()
        }
    });
    $('#b2').change(function(){
        $("#trackEve2").hide()
        $("#abEve2").hide()
        $("#customEve2").hide()
        $("#urlEve2").hide()
        var selectLayout = $('#b2 :selected').val()
        if(selectLayout == '1'){
            $("#trackEve2").show()
        }else if(selectLayout == '2'){
            $("#abEve2").show()
        }else if(selectLayout == '3'){
            $("#customEve2").show()
        }else if(selectLayout == '4'){
            $("#urlEve2").show()
        }
    });
    $('#b1Skip').change(function(){
        $("#trackEve1Image").hide()
        $("#abEve1Image").hide()
        $("#customEve1Image").hide()
        $("#urlEve1Image").hide()
        var selectLayout = $('#b1Skip :selected').val()
        if(selectLayout == '1'){
            $("#trackEve1Image").show()
        }else if(selectLayout == '2'){
            $("#abEve1Image").show()
        }else if(selectLayout == '3'){
            $("#customEve1Image").show()
        }else if(selectLayout == '4'){
            $("#urlEve1Image").show()
        }
    });
    $('#b2Target').change(function(){
        $("#trackEve2Image").hide()
        $("#abEve2Image").hide()
        $("#customEve2Image").hide()
        $("#urlEve2Image").hide()
        var selectLayout = $('#b2Target :selected').val()
        if(selectLayout == '1'){
            $("#trackEve2Image").show()
        }else if(selectLayout == '2'){
            $("#abEve2Image").show()
        }else if(selectLayout == '3'){
            $("#customEve2Image").show()
        }else if(selectLayout == '4'){
            $("#urlEve2Image").show()
        }
    });
}
function attachPropertyValue(){
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $("#eve1Property"); //Fields wrapper
    var wrapper1         = $("#eve2Property"); //Fields wrapper
    var add_button      = $("#add_field_button"); //Add button ID
    var add_button1      = $("#add_field_button1"); //Add button ID
    var add_buttonImage      = $("#add_field_buttonImage"); //Add button ID
    var add_button1Image      = $("#add_field_button1Image"); //Add button ID
    var wrapperImage         = $("#eve1PropertyImage"); //Fields wrapper
    var wrapper1Image         = $("#eve2PropertyImage"); //Fields wrapper
    var x = 0; //initlal text box count
    var y = 0;
    var x1 = 0;
    var y1 = 0;
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div class="groupInput1"><input type="text" name="mytext" id="myId'+x+'" placeholder="Property Name"/><input type="text" name="mytextVal'+x+'" id="myIdVal'+x+'" placeholder="Property Value"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
        }
    });
   
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })
    
    $(add_button1).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper1).append('<div class="groupInput2"><input type="text" name="mytextCan" id="myIdCan'+y+'" placeholder="Property Name"/><input type="text" name="mytextCanVal'+y+'" id="myIdCanVal'+y+'" placeholder="Property Value"/><a href="#" class="remove_field1">Remove</a></div>'); //add input box
        }
    });
   
    $(wrapper1).on("click",".remove_field1", function(e){ //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })
    $(add_buttonImage).click(function(e){ //on add input button click
        e.preventDefault();
        if(x1 < max_fields){ //max input box allowed
            x1++; //text box increment
            $(wrapperImage).append('<div class="groupInput1Image"><input type="text" name="mytext" id="myId'+x1+'" placeholder="Property Name"/><input type="text" name="mytextVal'+x1+'" id="myIdVal'+x1+'" placeholder="Property Value"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
        }
    });
   
    $(wrapperImage).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x1--;
    })
    $(add_button1Image).click(function(e){ //on add input button click
        e.preventDefault();
        if(y1 < max_fields){ //max input box allowed
            y1++; //text box increment
            $(wrapper1Image).append('<div class="groupInput2Image"><input type="text" name="mytext" id="myId'+y1+'" placeholder="Property Name"/><input type="text" name="mytextVal'+y1+'" id="myIdVal'+y1+'" placeholder="Property Value"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
        }
    });
   
    $(wrapper1Image).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        y1--;
    })   
}