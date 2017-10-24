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
            $scope.synonymsList.push( $scope.synExp)
            $scope.synExp = ""
        }
        console.log( "$scope.synonymsList  ", $scope.synonymsList)
    }
   
    $scope.removeSynonym = function (item) {
        $scope.synonymsList.splice($scope.synonymsList.indexOf(item),1);
    }
    
    $scope.saveEntity = function(){
        var error = false
        $scope.isEntity = "default"
        if($scope.entityName == null || $scope.entityName == "" || $scope.entityName == undefined){
            error = true
            $scope.isEntity = "blank"
        }
        if(error){
            return
        }
        $scope.toggleGridLoader("addEntityWidget")
        var params = {
            appId : $scope.appId,
            appName : $scope.appName,
            entityName : $scope.entityName,
            synonymsList : $scope.synonymsList
        }
        console.log("saveEntity params ",params)
        var promise = dashboardService.saveEntity(params)
        promise.then(
            function(payload){
                $scope.toggleGridLoader("addEntityWidget")
                console.log("payload  ",payload) 
                $location.path("/manageEntities")
                $rootScope.saveSuccess = true

            },
            function(errorPayload) {
                $scope.toggleGridLoader("addEntityWidget")
            }) 
    }
    
    $scope.init()
})