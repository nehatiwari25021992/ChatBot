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
        $scope.getMessages()
    }
   
    $scope.$on('reloadTemplate', function(event) {
        $scope.init()
        $scope.getAllAlgorithms()
        $scope.getAllThresholds()
        $scope.getMessages()
        $scope.getAllLanguagesSupported()
    });
    
    $('a[href="#/settings/"]').parent().addClass("current");
   
    $scope.init = function(){
        $scope.algoList = []
        $scope.thresholdList = []
        $scope.langList = []
            
        $scope.slider = {
            value: 0.5,
            options: {
                floor: 0,
                ceil: 1,
                step: 0.1,
                precision: 1
            }
        };
        $scope.getAllAlgorithms()
        $scope.getAllThresholds()
        $scope.getAllLanguagesSupported()
        $scope.getMessages()
  
    }
    
    $scope.getAllAlgorithms = function(){
        var params = {
            appId : $scope.appId
        }
        $scope.toggleGridLoader("app42AppSettingsWidget")
        var promise = dashboardService.getAllAlgorithms(params)
        promise.then(
            function(payload){
                $scope.algoList = payload.data
                $scope.selectedAlgoritm = $scope.algoList[0]
                $('#algo').attr('disabled', true).trigger("chosen:updated");
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
                $scope.langList = payload.data
                $scope.selectedLanguage = $scope.langList[0]
                  $('#lang').prop('disabled', true).trigger("chosen:updated");
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
                $scope.slider.value = $scope.thresholdList[0].threshold
                $scope.toggleGridLoader("app42AppSettingsWidget")
            },
            function(errorPayload) {
                $scope.toggleGridLoader("app42AppSettingsWidget")
            })  
    }
    
    $scope.getMessages = function(){
        var params = {
            appId : $scope.appId
        }
        $scope.toggleGridLoader("app42AppSettingsWidget")
        var promise = dashboardService.getMessages(params)
        promise.then(
            function(payload){
                console.log("getAllThresholds payload ",payload)
                $scope.welcomeMessage =  payload.data.welcomeMessage
                $scope.defaultMessage =  payload.data.defaultMessage
                $scope.toggleGridLoader("app42AppSettingsWidget")
            },
            function(errorPayload) {
                $scope.toggleGridLoader("app42AppSettingsWidget")
            })  
    }

    $scope.updateAppSetings = function(){
        var params = {
            appId : $scope.appId,
            welcomeMessage : $scope.welcomeMessage,
            defaultMessage : $scope.defaultMessage,
            threshold : $scope.slider.value,
            selectedLanguage : $scope.selectedLanguage,
            selectedAlgoritm : $scope.selectedAlgoritm 
        }
        $scope.toggleGridLoader("app42AppSettingsWidget")
        var promise = dashboardService.updateAppSetings(params)
        promise.then(
            function(payload){
                console.log("updateAppSetings payload ",payload)
                $scope.toggleGridLoader("app42AppSettingsWidget")
            },
            function(errorPayload) {
                $scope.toggleGridLoader("app42AppSettingsWidget")
            }) 
    }

    $scope.init()

})