/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


chatBot.controller("addEntityController", function($scope,dashboardService,$location, $rootScope) {
    console.log("***********addEntityController**************")
    $scope.openSubSideBar("entitiesSection")
    $('a[href="#/manageEntities/"]').parent().addClass("current");
    var intervalCurrentSession;
    // Maximize | Minimize Apps Grid
    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
    $rootScope.saveSuccess = false
   
    $scope.refreshAddWidget = function(){
        $scope.init()
    }
   
    $scope.$on('reloadTemplate', function(event) {
        $scope.init()
    });
    $scope.userExpList = []
    console.log("$rootScope.unknownName ",$rootScope.unknownName)
    console.log("$rootScope.id ",$rootScope.id)
    if($rootScope.unknownName != "" && $rootScope.unknownName != undefined && $rootScope.unknownName != null){
        if($rootScope.id != "" && $rootScope.id != undefined && $rootScope.id != null){
            $scope.userExpList.push($rootScope.unknownName)
        }
    }
   
    $scope.init = function(){
        $scope.intentName = ""
        $scope.userExp = ""
        $scope.rValue = ""
        $scope.synonyms = ""
        $scope.referenceValueList = []
        $scope.isresposne = "default"
        $scope.isIntent = "default"
        $scope.referenceJson =  {
            value : "",
            synonyms : []
        }
    }
   
    
    $scope.addReferenceValue = function(){
        var item = $scope.synonyms
        if(item == "" || item == null || item == undefined){
            $scope.isresposne = "blank"
        }else if($scope.referenceValueList.indexOf(item) > -1){
            $scope.isresposne = "invalid"
        }else{
            $scope.referenceValueList.push($scope.synonyms)
            $scope.synonyms = ""
        }

        console.log( "$scope.referenceValueList  ", $scope.referenceValueList)
    }
   
    $scope.removeResponse = function (item) {
        $scope.resposneList.splice($scope.resposneList.indexOf(item),1);
    }
    
    $scope.saveIntent = function(){
        var error = false
        $scope.isEntity = "default"
        if($scope.resposneList == null || $scope.resposneList.length == 0 || $scope.resposneList == undefined){
            error = true
            $scope.isresposne = "blank"
        }
        if($scope.userExpList == null || $scope.userExpList.length == 0 || $scope.userExpList == undefined){
            error = true
            $scope.isuserExp = "blank"
        }
        if($scope.entityName == null || $scope.entityName == "" || $scope.entityName == undefined){
            error = true
            $scope.isEntity = "blank"
        }
        if(error){
            return
        }
        $scope.toggleGridLoader("addIntentWidget")
        var params = {
            appId : $scope.appId,
            appName : $scope.appName,
            entityName : $scope.entityName,
            description : $scope.description,
            userExpList : $scope.userExpList,
            actions : $scope.action,
            resposneList : $scope.resposneList 
        }
        console.log("saveIntent params ",params)
        var promise = dashboardService.saveIntent(params)
        promise.then(
            function(payload){
                $scope.toggleGridLoader("addIntentWidget")
                console.log("payload  ",payload)
                if($rootScope.unknownName != "" && $rootScope.unknownName != undefined && $rootScope.unknownName != null){
                    if($rootScope.id != "" && $rootScope.id != undefined && $rootScope.id != null){
                        var params = {
                            appId : $scope.appId,
                            id : $rootScope.id 
                        }
                        var promise = dashboardService.updatePhrase(params)
                        promise.then(
                            function(payload){
                            },
                            function(errorPayload) {
                                $scope.toggleGridLoader("addIntentWidget")
                            }) 
                    }
                }
                $location.path("/manageIntent")
                $rootScope.saveSuccess = true

            },
            function(errorPayload) {
                $scope.toggleGridLoader("addIntentWidget")
            }) 
    }
    
    $scope.init()
})