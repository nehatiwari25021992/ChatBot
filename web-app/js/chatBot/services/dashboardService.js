/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 12 Mar 2015
 * @version 1.0
 */

// App Manager Service

chatBot.factory('dashboardService', function($rootScope,$http) {
    var appDataObj = []
    var service = {
        
        getApps: function() {
            var promise = $http({
                method: 'GET', 
                url: '../service/getServicesByLoginNew?methodType=GET'
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        },
        getAppsForDropdown: function() {
            $.ajax({
                type: "GET",
                async: false,
                url: '../chatBot/getServicesByLoginChatbot',
                complete: function (data) {
                    var responseData = data.responseJSON
                    appDataObj = responseData.rows
                }
            });
            return appDataObj;
        },
        getChatBotStatistics: function(params) {
            var promise = $http({
                method: 'POST', 
                url: '../chatBot/getChatBotStatistics',
                params:params
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        },
        getMostCommanPhrases: function(params) {
            var promise = $http({
                method: 'POST', 
                url: '../chatBot/getMostCommanPhrases',
                params:params
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        },
        getMessage_in_vs_out : function(params) {
            var promise = $http({
                method: 'POST', 
                url: '../chatBot/getMessage_in_vs_out',
                params:params
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        },
        getAllUsers : function(params) {
            var promise = $http({
                method: 'POST', 
                url: '../chatBot/getAllUsers',
                params:params
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        },
        getUserDetails : function(params) {
            var promise = $http({
                method: 'POST', 
                url: '../chatBot/getUserDetails',
                params:params
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        },
        getUserConversation : function(params) {
            var promise = $http({
                method: 'POST', 
                url: '../chatBot/getUserConversation',
                params:params
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        },
        openConversation : function(params) {
            var promise = $http({
                method: 'POST', 
                url: '../chatBot/openConversation',
                params:params
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        },
        saveIntent : function(params) {
            var promise = $http({
                method: 'POST', 
                url: '../chatBot/saveIntent',
                params:params
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        },
        getAllIntent : function(params) {
            var promise = $http({
                method: 'POST', 
                url: '../chatBot/getAllIntent',
                params:params
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        },
        updateIntent : function(params) {
            var promise = $http({
                method: 'POST', 
                url: '../chatBot/updateIntent',
                params:params
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        },
        getIntentDetails : function(params) {
            var promise = $http({
                method: 'POST', 
                url: '../chatBot/getIntentDetails',
                params:params
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        },
        
        getTotalEventsForApp: function(id) {
            var promise = $http({
                method: 'GET', 
                url: '../event/getTotalEvents?id='+id+'&methodType=GET'
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        },
        startTraining : function() {
//            var promise = $http({
//                method: 'POST', 
//                url: 'url of learn'
//            }).success(function(data, status, headers, config) {
//                return data;
//            })
//            return promise;
            return true;
        },
        getUnknownIntent: function(params) {
            var promise = $http({
                method: 'POST', 
                url: '../chatBot/getUnknownIntent',
                params:params
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        }
    }
    return service
});