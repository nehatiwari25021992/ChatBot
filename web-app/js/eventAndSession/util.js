/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 19 Sep 2014
 * @version 1.0
 */

// Common utility js functions

// Reset Global requests For App Change
function resetRequest(){
    events.length = 0
    properties.length = 0
    start = moment().subtract('days', 6)
    end = moment()
    eventReq.start = start
    eventReq.end = end
    eventReq.startDate = start
    eventReq.endDate = end
    eventReq.setEvents(events)
    eventReq.setProperties(properties)
    eventReq.unique_type =false 
   
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
// Reset Global requests For App Change
function resetRequestForEvents(selectedApp){
    eventReq.id = selectedApp  
    events.length = 0
    properties.length = 0
    start = moment().subtract('days', 6)
    end = moment()
    eventReq.start = start
    eventReq.end = end
    eventReq.startDate = start
    eventReq.endDate = end
    eventReq.setEvents(events)
    eventReq.setProperties(properties)
    eventReq.unique_type =false 
   
}
// Reset Global requests For App Change
function resetRequestForSegmentation(selectedApp){
   
    eventReqSegmentation.id = selectedApp  
    events.length = 0
    properties.length = 0
    eventReqSegmentation.setEvents(events)
    var props = [{
        propertyName: "", 
        propertyType:  "",
        propertyValue:  ""
    }]
    eventReqSegmentation.setProperties(props)  
    hideLoad()
}
// Reset Global requests For App Change
function resetRequestForInAppSegmentation(selectedApp){
   
    reqNewSegmentation.id = selectedApp  
    reqNewSegmentation.name = ""  
    start = moment().subtract('days', 6)
    end = moment()
    // This is comment because date is not mandatory 
    reqNewSegmentation.start = ''
    reqNewSegmentation.end = ''
    reqNewSegmentation.setEvents([])
    reqNewSegmentation.setProperties([])  
    reqNewSegmentation.setSuperProperties([])  
    reqNewSegmentation.setLocations({})  
    hideLoad()
}

// Reload Template on App Change
function reloadTemplate(location,path,selectedApp){
    console.log(path)
	if(path.indexOf('/trending') != -1){
        resetRequestForEvents(selectedApp)
        location.path('/trending');            // event section
    }else if(path.indexOf('/averageTime') != -1){
        location.path('/averageTime');         // average session time
    }else  if(path.indexOf('/session') != -1){
        location.path('/session');             // current active session
    }else  if(path.indexOf('/segmentation') != -1){
        resetRequestForSegmentation(selectedApp)
        location.path('/segmentation');        // event segmentation 
    }else  if(path.indexOf('/funnel') != -1){
        location.path('/funnel');               // funnel
    }else  if(path.indexOf('/revenue') != -1){
        location.path('/revenue');              // revenue
    } else  if(path.indexOf('/profiling') != -1){
        location.path('/profiling');            // profiling
    }else  if(path.indexOf('/dau') != -1){
        location.path('/dau');            // dau
    }else  if(path.indexOf('/wau') != -1){
        location.path('/wau');            // wau
    }else  if(path.indexOf('/mau') != -1){
        location.path('/mau');            // mau
    }else  if(path.indexOf('/retention') != -1){
        location.path('/retention');            // retention
    }else  if(path.indexOf('/logs') != -1){
        location.path('/logs');            // Logs
    }else  if(path.indexOf('/advanceSegmentation') != -1){
        location.path('/advanceSegmentation');            // Advance Segmentation
    }else  if(path.indexOf('/addSegment') != -1){
        resetRequestForInAppSegmentation(selectedApp)
        location.path('/addSegment');            // addSegment
    }else  if(path.indexOf('/segments') != -1){
        location.path('/segments');            // segments
    }else  if(path.indexOf('/addCamp') != -1){
        location.path('/addCamp');            // campaign
    }else  if(path.indexOf('/allCamp') != -1){
        location.path('/allCamp');            // campaign
    }else  if(path.indexOf('/advSegmentation') != -1){
        location.path('/advSegmentation');            // advSegmentation New
    }else  if(path.indexOf('/install') != -1){
        location.path('/install');            // advSegmentation New
    }else  if(path.indexOf('/setting') != -1){
        location.path('/setting');            // advSegmentation New
    }
    else{
        location.path('/trending');
    }
    hideLoad()
}

function log (str,obj){
	 console.log(str,obj)
}

// Customized Alert box
function clearIntervals(){
    //    console.log(handlers)
    for (var i = 0; i < handlers.length; i++) {
        clearInterval(handlers[i]);
    }
    handlers = [];
}
// Customized Alert box
function customAlert(type,msg){
    dhtmlx.alert({
        type:type,
        text:msg
    });  
}


// Shows Overlay Loader 
var hasDataLoading = false
function showLoad(){
    if(window.location.href.indexOf("segments") > -1)
    	return
	if(!hasDataLoading && $("#loading-indicator-undefined").attr('class') == undefined){
        jQuery('.graphWrapper').showLoading(
    {
        'addClass': 'loading-indicator-bars'
    }
    ); 
    }
    hasDataLoading = true;
    setTimeout(function() { hasDataLoading = false }, 500)

}

// Hides Overlay Loader 
function hideLoad(){
 jQuery('.graphWrapper').hideLoading();
    //console.log("hideLoad.. ",$("#loading-indicator-undefined").attr('class'))
    
}

// Parse JSON Response
function parseResponse(obj) {
    var response = JSON.parse(obj)
    return response
}

function getUnique(inputArray)
{
    var outputArray = [];
    for (var i = 0; i < inputArray.length; i++)
    {
        if ((jQuery.inArray(inputArray[i], outputArray)) == -1)
        {
            outputArray.push(inputArray[i]);
        }
    }
    return outputArray;
}

function pluckByName(inArr, name, exists)
{
    for (i = 0; i < inArr.length; i++ )
    {
        if (inArr[i].name == name)
        {
            return (exists === true) ? true : inArr[i];
        }
    }
}

function getUniqueObj(inArr){
    var dupes = {};
    var singles = [];

    $.each(inArr, function(i, el) {

        if (!dupes[el.familyName]) {
            dupes[el.familyName] = true;
           
        }else{
            singles.push(el); 
        }
    });
    return singles
}

// Convert Date Format
function convertDateFormate(inputFormat) {
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }
    var d = new Date(inputFormat);
    return[pad(d.getFullYear()), pad(d.getMonth()+1), ("0" + d.getDate()).slice(-2)].join('-');
}

function setTriggerReqObject(obj){
    // Set Events
    var eventWithDt = [];
    var formattedSTDate =  convertDateFormate(obj.getStartDate());
    var formattedEDDate =  convertDateFormate(obj.getEndDate());
    eventWithDt.push({
        name: obj.getEvents()[0], 
        startDate:  formattedSTDate,
        endDate:formattedEDDate
    })
    pushRequestModel.setEvents(eventWithDt);
    emailRequestModel.setEvents(eventWithDt);
    wallPostRequestModel.setEvents(eventWithDt);
    // Set Properties
    pushRequestModel.setProperties(obj.getProperties());
    emailRequestModel.setProperties(obj.getProperties());
    wallPostRequestModel.setProperties(obj.getProperties());
}

$(function(){
    $("ul#headerMenu li a").click(function() {
        //you'll probably want to remove all 'current' classes first
        $("a.active").removeClass("active")
        $(this).addClass("active")
    });
    $('#error_modal').on('hidden.bs.modal', function () {
        var url = document.URL; 
        if(url.indexOf("?appwarp=true")>-1)
        {
            window.parent.location.href = "https://apphq.shephertz.com/register/app42Login?appwarp=true";
            return
        }else{
            window.parent.location.href  = "https://apphq.shephertz.com/register/app42Login";
            return  
        }
    });
    
    $('#noapp_modal').on('hidden.bs.modal', function () {
        var url = document.URL; 
        if(url.indexOf("?appwarp=true")>-1)
        {
            window.parent.location.href = "https://apphq.shephertz.com/register/quickStart?appwarp=true";
            return
        }else{
            window.parent.location.href  = "https://apphq.shephertz.com/register/quickStart";
            return  
        }
    });
});



function getAllTourTipMessage(module){
    var helpMsgArray = []
    if(module == "EVENT"){
        helpMsgArray = [
        {
            element: document.querySelector('#step1'),
            intro: "Add your events by pressing first letter of event name."
        },
        {
            element: document.querySelector('#step2'),
            intro: "Choose date range for entered event.",
            position: 'bottom'
        },
        {
            element: document.querySelector('#step3'),
            intro: "Choose uniqueness of event based on app users<br>By default unique is off.",
            position: 'bottom'
        },
        {
            element: '#step4',
            intro: 'Add Properties on entered event.You can choose single or double property to filter event data.',
            position: 'left'
        },
        {
            element: '#step5',
            intro: "Send push/email/facebook wall post to your app users who fall into segment of entered event and it's properties.",
            position: 'bottom'
        },
        {
            element: '#saveQueryBtn',
            intro: 'Save your event query for future use.',
            position: 'left'
        },
        {
            element: '#step6',
            intro: 'Todays Trending Events and counts are showing here.',
            position: 'bottom'
        }
        ]
    }
//    else if(module == "ADDCAMPAIGN"){
//        
//        var step1Array = [
//        {
//            element: '#step1Campaign',
//            intro: "Add campaign Basic information.",
//            position: 'left'
//        },
//        {
//            element: '#step2Campaign',
//            intro: "Choose Campaign Start Date<br> must be equal or greater from current date.",
//            position: 'left'
//        },
//        {
//            element: '#step3Campaign',
//            intro: "Choose Campaign End Date.<br> must be equal or greater from current date and Start Date.",
//            position: 'left'
//        },
//        {
//            element: '#step4Campaign',
//            intro: "Add Campaign iteration.",
//            position: 'left'
//        }
//        ] 
//        helpMsgArray.push(step1Array)
//        var step2Array = [
//        {
//            element: '#step5Campaign',
//            intro: "Add Campaign Layout(Full screen,Alert or Confirm Box).",
//            position: 'left'
//        },
//        {
//            element: '#step6Campaign',
//            intro: "Choose Saved Segment or create new for Campaign.",
//            position: 'left'
//        },
//        {
//            element: '#step7Campaign',
//            intro: "Choose On Event for campaign.<br> You can also choose multiple Event.",
//            position: 'left'
//        },
//        {
//            element: '#step8Campaign',
//            intro: "Choose Campaign Layout.<br>For Full screen add image.<br> for Alert add Title,Message and ok button text<br> for Confirm Box add Title,Message ok and cancel button text.",
//            position: 'left'
//        }
//        ]
//        helpMsgArray.push(step2Array)
//    }
    else  if(module == "SEGMENTATION"){
        helpMsgArray = [
        {
            element: document.querySelector('#step1Segmentation'),
            intro: "Choose your event for segmentation.",
            position: 'left'
        },
        {
            element: document.querySelector('#step2Segmentation'),
            intro: "Select a date range of event",
            position: 'bottom'
        },
       
        {
            element: document.querySelector('#step3Segmentation'),
            intro: "Add property on entered event.You can choose single property to filter event data.",
            position: 'bottom'
        }
        
        ]
    }else  if(module == "ADVANCESEGMENTATION"){
        helpMsgArray = [
        {
            element: document.querySelector('#advanceStep1'),
            intro: "Choose date range for event.",
            position: 'left'
        },
        {
            element: document.querySelector('#advanceStep2'),
            intro: "Choose an event for segment.",
            position: 'bottom'
        },
        {
            element: document.querySelector('#advanceStep3'),
            intro: "AND Operator will apply in Event and Property for creating Query.",
            position: 'bottom'
        },
        {
            element: document.querySelector('#advanceStep4'),
            intro: "Add property on entered event.You can choose single property to filter event data.",
            position: 'left'
        }
        
        ]
    }else  if(module == "AVERAGETIME"){
        helpMsgArray = [
        {
            element: document.querySelector('#averageStep1'),
            intro: "Choose date range for average active session.",
            position: 'left'
        },
        {
            element: document.querySelector('#averageStep2'),
            intro: "Add your events by pressing first letter of event name.",
            position: 'bottom'
        },
        ]
    }else  if(module == "DAILY"){
        helpMsgArray = [
        {
            element: document.querySelector('#dailyStep1'),
            intro: "Choose date range for Daily Active Users.",
            position: 'left'
        },
        {
            element: document.querySelector('#dailyStep2'),
            intro: "Add your events by pressing first letter of event name.",
            position: 'bottom'
        },
        {
            element: document.querySelector('#dailyStep3'),
            intro: "Add Properties on entered event.You can choose single or double property to filter event data.",
            position: 'bottom'
        },
        {
            element: document.querySelector('#saveQueryBtn'),
            intro: "Save your daily active user query for future use.",
            position: 'left'
        }
        ]
    }else  if(module == "FUNNEL"){
        helpMsgArray = [
        {
            element: document.querySelector('#funnelStep1'),
            intro: "Choose date range for funnel event.",
            position: 'left'
        },
        {
            element: document.querySelector('#funnelStep2'),
            intro: "Add your events by pressing first letter of event name.<br>Make sure that entered order of events are same as event occurred in your app.",
            position: 'bottom'
        },
        {
            element: document.querySelector('#funnelStep3'),
            intro: "Add Properties on entered event.You can choose single or double property to filter event data.",
            position: 'bottom'
        },
        
        ]
    }else  if(module == "RETENTION"){
        helpMsgArray = [
        {
            element: document.querySelector('#retentionStep1'),
            intro: "Choose  date range for Retention.",
            position: 'left'
        },
        {
            element: document.querySelector('#retentionStep2'),
            intro: "Choose install Property.",
            position: 'bottom'
        },
        {
            element: document.querySelector('#retentionStep3'),
            intro: "Choose install property Value.",
            position: 'bottom'
        }
//        {
//            element: document.querySelector('#applyPropBtn'),
//            intro: "View Retention by clicking Get Retention button",
//            position: 'bottom'
//        }
        
        ]
    }
    return helpMsgArray
}
