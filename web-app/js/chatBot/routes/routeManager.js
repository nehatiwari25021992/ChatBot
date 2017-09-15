/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 12 Mar 2015
 * @version 1.0
 */

// AngularJs Module and Configurations
var chatBot = angular.module('chatBot', ['ngRoute','jlareau.pnotify']);

// Routes configurations
chatBot.config(['$routeProvider','$httpProvider',
    function($routeProvider,$httpProvider) {
        $routeProvider
        .when('/dashboard', {
            templateUrl: '../chatBotTemplates/dashboard',
            controller: 'dashboardController'
        })
        .when('/users', {
            templateUrl: '../chatBotTemplates/users',
            controller: 'userController'
        })
        .when('/userDetails/:id', {
            templateUrl: '../chatBotTemplates/userDetails',
            controller: 'userDetailsController'
        })
        .when('/insights', {
            templateUrl: '../chatBotTemplates/insights',
            controller: 'insightsController'
        })
        .when('/manageIntent', {
            templateUrl: '../chatBotTemplates/manageIntent',
            controller: 'manageIntentController'
        })
        .when('/addIntent', {
            templateUrl: '../chatBotTemplates/addIntent',
            controller: 'addIntentController'
        })
        .when('/editIntent/:id', {
            templateUrl: '../chatBotTemplates/editIntent',
            controller: 'editIntentController'
        })
        .when('/settings', {
            templateUrl: '../chatBotTemplates/settings',
            controller: 'settingsController'
        })
        
        .otherwise({
            redirectTo: '/dashboard'
        });
    }])
    