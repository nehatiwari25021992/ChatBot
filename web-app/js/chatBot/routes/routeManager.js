/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 12 Mar 2015
 * @version 1.0
 */

// AngularJs Module and Configurations
var chatBot = angular.module('chatBot', ['ngRoute','jlareau.pnotify', 'localytics.directives']);

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
        .when('/manageEntities', {
            templateUrl: '../chatBotTemplates/manageEntities',
            controller: 'manageEntitiesController'
        })
        .when('/addEntity', {
            templateUrl: '../chatBotTemplates/addEntity',
            controller: 'addEntityController'
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
        .when('/dialogs', {
            templateUrl: '../chatBotTemplates/dialog',
            controller: 'dialogController'
        })
        .when('/unResolved', {
            templateUrl: '../chatBotTemplates/unknown',
            controller: 'unknownController'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
    }])
    