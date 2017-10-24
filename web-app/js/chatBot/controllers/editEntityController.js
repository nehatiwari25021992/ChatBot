/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


chatBot.controller("editEntityController", function($scope,dashboardService,$location,  $routeParams,$rootScope) {
    console.log("***********editEntityController**************")
    $scope.openSubSideBar("entitiesSection")
    //    var intervalCurrentSession;
    // Maximize | Minimize Apps Grid
    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
    $rootScope.saveSuccess = false
    $rootScope.unknownName = ""
    $rootScope.id = ""
    $scope.$on('reloadTemplate', function(event) {
        $location.path("/manageEntities")
    });
    
    $scope.refreshEditWidget = function(){
        $scope.init()
        $scope.getIntentDetails()
    }
    
    $('a[href="#/manageEntities/"]').parent().addClass("current");
   
    $scope.init = function(){
        $scope.intentName = ""
        $scope.synExp = ""
        $scope.synonyms = ""
        $scope.isSynonymValid = "default"
        $scope.isIntent = "default"
        $scope.synonymsList = []
    }
   
    $scope.addSynonyms = function(){
        $scope.isSynonymValid = "default"
        var item = $scope.synExp
        if(item == "" || item == null || item == undefined){
            $scope.isSynonymValid = "blank"
        }else if($scope.synonymsList.indexOf(item) > -1){
            $scope.isSynonymValid = "invalid"
        }else{
            var map = {}
            map.name = $scope.synExp
            map.isDelete = false
            map.isPresent = false 
            $scope.synonymsList.push(map)
            $scope.synExp = ""
        }
    }
   
    $scope.removeSynonym = function (item) {
        if(item.isPresent){
            item.isDelete = true
        }else{
            $scope.synonymsList.splice($scope.synonymsList.indexOf(item),1);
        }
    }
    
    
    $scope.updateEntity= function(){
        $scope.toggleGridLoader("editEntityWidget")
        var params = {
            appId : $scope.appId,
            appName : $scope.appName,
            entityId : $routeParams.id,
            synonymsList : $scope.synonymsList 
        }
        console.log("params :::::::::::::::::::::: ",params)
        var promise = dashboardService.updateEntity(params)
        promise.then(
            function(payload){
                $scope.toggleGridLoader("editEntityWidget")
                console.log("updateEntity payload  ",payload)
                //$rootScope.saveSuccess = true
                $location.path("/manageEntities")

            },
            function(errorPayload) {
                $scope.toggleGridLoader("editEntityWidget")
            }) 
    }
    
    $scope.getEntityDetails = function(){
        console.log( " $scope.getEntityDetails ")
        $scope.toggleGridLoader("editEntityWidget")
        var params = {
            appId : $scope.appId,
            entityId : $routeParams.id
        }
        var promise = dashboardService.getEntityDetails(params)
        promise.then(
            function(payload){
                $scope.toggleGridLoader("editEntityWidget")
                console.log("payload editEntityWidget ",payload.data)
                $scope.entityName = payload.data.name
                $scope.synonymsList = payload.data.synonymsList

            },
            function(errorPayload) {
                $scope.toggleGridLoader("editEntityWidget")
            }) 
    }
    
    $scope.init()
    $scope.getEntityDetails()
})