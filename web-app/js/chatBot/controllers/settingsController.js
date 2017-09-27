/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


chatBot.controller("settingsController", function($scope,$rootScope,dashboardService) {
    console.log("***********settingsController**************")
    $scope.openSubSideBar("settingsSection")
    //    var intervalCurrentSession;
    // Maximize | Minimize Apps Grid
    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
        
    $rootScope.unknownName = ""
    $rootScope.id = ""
    
    $scope.refreshFileStorageWidget = function(){
        $scope.init()
        $scope.getAllAlgorithms()
        $scope.getAllThresholds()
        $scope.getAllLanguagesSupported()
    }
   
    $scope.$on('reloadTemplate', function(event) {
        $scope.init()
        $scope.getAllAlgorithms()
        $scope.getAllThresholds()
        $scope.getAllLanguagesSupported()
    });
    
    $('a[href="#/settings/"]').parent().addClass("current");
   
    $scope.init = function(){
        $scope.algoList = []
        $scope.thresholdList = []
        $scope.langList = []
    }
    
    $scope.getAllAlgorithms = function(){
        var params = {
            appId : $scope.appId
        }
        $scope.toggleGridLoader("app42AppSettingsWidget")
        var promise = dashboardService.getAllAlgorithms(params)
        promise.then(
            function(payload){
                console.log("getAllAlgorithms payload ",payload)
                $scope.algoList = payload.data
                $scope.toggleGridLoader("app42AppSettingsWidget")
            },
            function(errorPayload) {
                $scope.toggleGridLoader("app42AppSettingsWidget")
            })  
    }
    
    $scope.getAllLanguagesSupported = function(){
        var params = {
            appId : $scope.appId
        }
        $scope.toggleGridLoader("app42AppSettingsWidget")
        var promise = dashboardService.getAllLanguagesSupported(params)
        promise.then(
            function(payload){
                console.log("getAllLanguagesSupported payload ",payload)
                $scope.langList = payload.data
                $scope.toggleGridLoader("app42AppSettingsWidget")          
            },
            function(errorPayload) {
                $scope.toggleGridLoader("app42AppSettingsWidget")
            })  
    }
    
    $scope.getAllThresholds = function(){
        var params = {
            appId : $scope.appId
        }
        $scope.toggleGridLoader("app42AppSettingsWidget")
        var promise = dashboardService.getAllThresholds(params)
        promise.then(
            function(payload){
                console.log("getAllThresholds payload ",payload)
                $scope.thresholdList = payload.data
                $scope.toggleGridLoader("app42AppSettingsWidget")
            },
            function(errorPayload) {
                $scope.toggleGridLoader("app42AppSettingsWidget")
            })  
    }
    
    $scope.init()
    $scope.getAllAlgorithms()
    $scope.getAllThresholds()
    $scope.getAllLanguagesSupported()
  
})