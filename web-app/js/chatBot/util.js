/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 12 Mar 2015
 * @version 1.0
 */

var __APP42_APP_KEY = "_app42Info";
var __APP_INFO_EXPIRY = 365; // 1 year

var __APP42_PRODUCT_KEY = "_app42Preference"

var __App42MarketingAutomation = "App42MarketingAutomation"
var __App42CloudAPI = "App42CloudAPI"

function setAppCookie(key , value){
	if(value instanceof Object){
		var __getStartedURL = __httpRequestPath + "/getStarted"
		var href = __getStartedURL;
		$('#quickStartLi').attr('href', href + '?appId=' + value.id + '&appProduct=cloudapi');
		value = JSON.stringify(value)
	}
	$.cookie(key + "_" + __userName, value, { expires: __APP_INFO_EXPIRY, path: '/' });
}

function getAppCookie(key){
	
	var val = $.cookie(key + "_" + __userName);
	if(val == undefined){
		return undefined
	}
	if(isValidJSON(val)){
		val = JSON.parse(val)
		var __getStartedURL = __httpRequestPath + "/getStarted"
		var href = __getStartedURL;
		$('#quickStartLi').attr('href', href + '?appId=' + val.id + '&appProduct=cloudapi');
		return val
	}else{
		return val;
	}
	
}

function removeAppCookie(key){
	$.removeCookie(key + "_" + __userName, { path: '/' });
}


function getIndexFrom(arr, key, isObjectArray, matchKey){
	var index = 0
	if(isObjectArray == false || isObjectArray == undefined || matchKey == undefined){
		arr.map(function(e,i){
	        if(e == key){
	        	index = i;
	        	return
	        }
	    })
	}else{
		arr.map(function(e,i){
	        if(e[matchKey] == key){
	        	index = i;
	        	return
	        }
	    })
	}
	return index;
}

//returns true if email is valid
function IsValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function parseResponse(obj){
    return eval(obj)
}

//Check is  valid JSON
function isValidJSON(str) {
    if (typeof String.prototype.startsWith != 'function') {
        // see below for better implementation!
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

var zones = '[{"code":"-12.0","time":"(GMT -12:00) Eniwetok,Kwajalein"},{"code":"-11.0","time":"(GMT -11:00) Midway Island,Samoa"},{"code":"-10.0","time":"(GMT -10:00)Hawaii"},{"code":"-9.0","time":"(GMT -9:00)Alaska"},{"code":"-8.0","time":"(GMT -8:00) Pacific Time (US &amp;Canada)"},{"code":"-7.0","time":"(GMT -7:00) Mountain Time (US &amp;Canada)"},{"code":"-6.0","time":"(GMT -6:00) Central Time (US &amp;Canada), Mexico City"},{"code":"-5.0","time":"(GMT -5:00) Eastern Time(US &amp; Canada), Bogota, Lima"},{"code":"-4.0","time":"(GMT -4:00)Atlantic Time (Canada), Caracas, La Paz"},{"code":"-3.5","time":"(GMT-3:30)Newfoundland"},{"code":"-3.0","time":"(GMT -3:00) Brazil, BuenosAires, Georgetown"},{"code":"-2.0","time":"(GMT -2:00)Mid-Atlantic"},{"code":"-1.0","time":"(GMT -1:00 hour) Azores, CapeVerde Islands"},{"code":"0.0","time":"(GMT) Western Europe Time,London, Lisbon, Casablanca"},{"code":"1.0","time":"(GMT +1:00 hour)Brussels, Copenhagen, Madrid, Paris"},{"code":"2.0","time":"(GMT+2:00) Kaliningrad, South Africa"},{"code":"3.0","time":"(GMT +3:00)Baghdad, Riyadh, Moscow, St. Petersburg"},{"code":"3.5","time":"(GMT+3:30) Tehran"},{"code":"4.0","time":"(GMT +4:00) Abu Dhabi, Muscat,Baku, Tbilisi"},{"code":"4.5","time":"(GMT +4:30)Kabul"},{"code":"5.0","time":"(GMT +5:00) Ekaterinburg, Islamabad,Karachi, Tashkent"},{"code":"5.5","time":"(GMT +5:30) Bombay,Calcutta, Madras, New Delhi"},{"code":"5.75","time":"(GMT +5:45)Kathmandu"},{"code":"6.0","time":"(GMT +6:00) Almaty, Dhaka,Colombo"},{"code":"7.0","time":"(GMT +7:00) Bangkok, Hanoi,Jakarta"},{"code":"8.0","time":"(GMT +8:00) Beijing, Perth, Singapore,Hong Kong"},{"code":"9.0","time":"(GMT +9:00) Tokyo, Seoul, Osaka,Sapporo, Yakutsk"},{"code":"9.5","time":"(GMT +9:30) Adelaide,Darwin"},{"code":"10.0","time":"(GMT +10:00) Eastern Australia, Guam,Vladivostok"},{"code":"11.0","time":"(GMT +11:00) Magadan, SolomonIslands, New Caledonia"},{"code":"12.0","time":"(GMT +12:00) Auckland,Wellington, Fiji, Kamchatka"}]'


// clon the current javascript objecr --  shashank -- 
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
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
// Get Unique from Array // GURU
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


function getFileExtension(fileUrl){
    return (/[.]/.exec(fileUrl)) ? /[^.]+$/.exec(fileUrl) : undefined;
}
var AudioExtensions = ["mp3","ogg","wav","m4a","MP3","OGG","WAV","M4A"]
var VideoExtensions = ["webm","ogv","mp4","m4v","MP4","WEBM","OGV","M4V","flv","FLV"]
var ImageExtensions = ["gif","png","jpg","jpeg","tiff","bmp","GIF","PNG","JPG","JPEG","TIFF","BMP"]