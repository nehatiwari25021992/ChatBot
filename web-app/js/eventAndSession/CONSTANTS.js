/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 19 Sep 2014
 * @version 1.0
 */

// Constants
var chart = $("#chart")
var chartPie = $("#chartPie")
var noData = $("#noData")

var handlers = [];

var start = moment().utc().subtract('days', 6), 
end = moment().utc()


var events = []             // Global events object
var properties = []          // Global properties object
var queriesObj = []
var customSegScope;
// Global request object
var eventReq = {                                    
    "id":0,
    "start" : start,
    "end" : end,
    "startDate" : start,
    "endDate" : end,
    "unique_type" : false,
    "events" : events,
    "properties" : properties,
    "chartType":"LINE",
    "type":"EVENT",
    "getId" : function() {
        return this.id ;
    },
    "setType" : function(type) {
        this.type = type;
    },
    "setChartType" : function(type) {
        this.chartType = type;
    },
    "getStartDate" : function() {
        return this.start ;
    },
    "getEndDate" : function() {
        return this.end ;
    },
    "getResultType" : function() {
        return this.unique_type ;
    },
    "setProperties" : function(obj) {
        this.properties = obj;
    },
    "getProperties" : function() {
        return this.properties ;
    },
    "setEvents" : function(obj) {
        this.events = obj;
    },
    "getEvents" : function() {
        return this.events ;
    },
    "setUnique_type" : function(obj) {
        this.unique_type = obj;
    },
    "getUnique_type" : function() {
        return this.unique_type ;
    }
}

// Segmentation request object
var eventReqSegmentation = {                                    
    "id":0,
    "viewId":"0",
    "events" : events,
    "properties" : [{
        propertyName: "", 
        propertyType:  "",
        propertyValue:  ""
    }],
    "getId" : function() {
        return this.id ;
    },
    "getViewId" : function() {
        return this.viewId ;
    },
    "setProperties" : function(obj) {
        this.properties = obj;
    },
    "getProperties" : function() {
        return this.properties ;
    },
    "setEvents" : function(obj) {
        this.events = obj;
    },
    "getEvents" : function() {
        return this.events ;
    }
}

var pushRequestModel = {                                    
    "id":0,
    "viewId":"0",
    "message" : "",
    "lang" : "English",
    "badgeNSound" : false,
    "badgeType" :"None",
    "sound" : "default",
    "events" : events,
    "startDate" : eventReq.getStartDate(),
    "endDate" : eventReq.getEndDate(),
    "properties" : properties,
    "pushDate" : "",
    "sendNow":true,
    "type":"all",
    "scheduleTime":"",
    "getId" : function() {
        return this.id ;
    },
    "getViewId" : function() {
        return this.viewId ;
    },
    "setLang" : function(obj) {
        this.lang = obj;
    },
    "getLang" : function() {
        return this.lang ;
    },
    "setSendNow" : function(obj) {
        this.sendNow = obj;
    },
    "getSendNow" : function() {
        return this.sendNow ;
    },
    "setPushDate" : function(obj) {
        this.pushDate = obj;
    },
    "getPushDate" : function() {
        return this.pushDate ;
    },
    "setBadgeNSound" : function(obj) {
        this.badgeNSound = obj;
    },
    "getBadgeNSound" : function() {
        return this.badgeNSound ;
    },
    "setProperties" : function(obj) {
        this.properties = obj;
    },
    "getProperties" : function() {
        return this.properties ;
    },
    "setEvents" : function(obj) {
        this.events = obj;
    },
    "getEvents" : function() {
        return this.events ;
    },
    "setMessage" : function(obj) {
        this.message = obj;
    },
    "getMessage" : function() {
        return this.message ;
    },
    "setBadge" : function(obj) {
        this.badge = obj;
    },
    "getBadge" : function() {
        return this.badge ;
    },
    "setSound" : function(obj) {
        this.sound = obj;
    },
    "getSound" : function() {
        return this.sound ;
    },
    "setBadgeType" : function(obj) {
        this.badgeType = obj;
    },
    "getBadgeType" : function() {
        return this.badgeType ;
    },
    "setType" : function(obj) {
        this.type = obj;
    },
    "getType" : function() {
        return this.type ;
    },
    "setScheduleTime" : function(obj) {
        this.scheduleTime = obj;
    },
    "getScheduleTime" : function() {
        return this.scheduleTime ;
    }
    
}

var emailRequestModel = {                                    
    "id":0,
    "viewId":"0",
    "sendFrom" : "",
    "subject" :"",
    "content" : "",
    "userBase" : true,
    "events" : events,
    "startDate" : eventReq.getStartDate(),
    "endDate" : eventReq.getEndDate(),
    "properties" : properties,
    "sendDate" : "",
    "sendNow":true,
    "getId" : function() {
        return this.id ;
    },
    "getViewId" : function() {
        return this.viewId ;
    },
    "setSendNow" : function(obj) {
        this.sendNow = obj;
    },
    "getSendNow" : function() {
        return this.sendNow ;
    },
    "setSendDate" : function(obj) {
        this.sendDate = obj;
    },
    "getSendDate" : function() {
        return this.sendDate ;
    },
    "setProperties" : function(obj) {
        this.properties = obj;
    },
    "getProperties" : function() {
        return this.properties ;
    },
    "setEvents" : function(obj) {
        this.events = obj;
    },
    "getEvents" : function() {
        return this.events ;
    },
    "setSubject" : function(obj) {
        this.subject = obj;
    },
    "getSubject" : function() {
        return this.subject ;
    },
    "setContent" : function(obj) {
        this.content = obj;
    },
    "getContent" : function() {
        return this.content ;
    },
    "setSendFrom" : function(obj) {
        this.sendFrom = obj;
    },
    "getSendFrom" : function() {
        return this.sendFrom ;
    },
    "setScheduleTime" : function(obj) {
        this.scheduleTime = obj;
    },
    "getScheduleTime" : function() {
        return this.scheduleTime ;
    },
    "setUserBase" : function(obj) {
        this.userBase = obj;
    },
    "getUserBase" : function() {
        return this.userBase ;
    } 
}

var wallPostRequestModel = {                                    
    "id":0,
    "viewId":"0",
    "content" : "",
    "events" : events,
    "startDate" : eventReq.getStartDate(),
    "endDate" : eventReq.getEndDate(),
    "properties" : properties,
    "sendDate" : "",
    "sendNow":true,
    "getId" : function() {
        return this.id ;
    },
    "getViewId" : function() {
        return this.viewId ;
    },
    "setSendNow" : function(obj) {
        this.sendNow = obj;
    },
    "getSendNow" : function() {
        return this.sendNow ;
    },
    "setSendDate" : function(obj) {
        this.sendDate = obj;
    },
    "getSendDate" : function() {
        return this.sendDate ;
    },
    "setProperties" : function(obj) {
        this.properties = obj;
    },
    "getProperties" : function() {
        return this.properties ;
    },
    "setEvents" : function(obj) {
        this.events = obj;
    },
    "getEvents" : function() {
        return this.events ;
    },
    "setScheduleTime" : function(obj) {
        this.scheduleTime = obj;
    },
    "getContent" : function() {
        return this.content ;
    },
    "setContent" : function(obj) {
        this.content = obj;
    },
    "getScheduleTime" : function() {
        return this.scheduleTime ;
    }
}