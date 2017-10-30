/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


chatBot.controller("editIntentController", function($scope,dashboardService,$location,  $routeParams,$rootScope) {
    console.log("***********editIntentController**************")
    $scope.openSubSideBar("intentSection")
    //    var intervalCurrentSession;
    // Maximize | Minimize Apps Grid
    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
    $rootScope.saveSuccess = false
    $rootScope.unknownName = ""
    $rootScope.id = ""
    $scope.$on('reloadTemplate', function(event) {
        $location.path("/manageIntent")
    });
    
    $scope.refreshEditWidget = function(){
        $scope.init()
        $scope.getIntentDetails()
    }
    
    $('a[href="#/manageIntent/"]').parent().addClass("current");
   
    $scope.init = function(){
        $scope.intentName = ""
        $scope.userExp = ""
        $scope.userExpList = []
        $scope.resposne = ""
        $scope.resposneList = []
        $scope.actions = []
        $scope.action = ""
        $scope.description = ""
        $scope.isuserExp = "default"
        $scope.isactions = "default"
        $scope.isresposne = "default"
    }
   
    $scope.addUserSays = function(){
        $scope.isuserExp = "default"
        var item = $scope.userExp
        if(item == "" || item == null || item == undefined){
            $scope.isuserExp = "blank"
        }else if($scope.userExpList.indexOf(item) > -1){
            $scope.isuserExp = "invalid"
        }else{
            var map = {}
            map.name = $scope.userExp
            map.isDelete = false
            map.isPresent = false 
            map.show = false
            map.entity = $scope.getEntityForUserExpression($scope.userExp)
            $scope.userExpList.push(map)
            $scope.userExp = ""
        }
    }
   
   
      
    $scope.getEntityForUserExpression = function (exp) {
        //ajax call to get entity 
        var entities = [];
        var entityMap = {}
        entityMap.id = 1
        entityMap.parameter = "room"
        entityMap.entityName = "@room"
        entities.push(entityMap)
        entityMap = {}
        entityMap.id = 2
        entityMap.parameter = "hotel"
        entityMap.entityName = "@hotel"
        entities.push(entityMap)    
        console.log("entities :: ",JSON.stringify(entities))
        return entities;
    }
   
    $scope.removeSay = function (item) {
        if(item.isPresent){
            item.isDelete = true
        }else{
            $scope.userExpList.splice($scope.userExpList.indexOf(item),1);
        }
    }
    
    $scope.addResponse = function(){
        console.log("addResponse :::")
        $scope.isresposne = "default"
        var item = $scope.resposne
        if(item == "" || item == null || item == undefined){
            $scope.isresposne = "blank"
        }else if($scope.resposneList.indexOf(item) > -1){
            $scope.isresposne = "invalid"
        }else{
            var map = {}
            map.name = $scope.resposne
            map.isDelete = false
            map.isPresent = false 
            $scope.resposneList.push(map)
            $scope.resposne = ""
        }
        console.log("$scope.resposneList :::",$scope.resposneList)
    }
   
   
    $scope.removeResponse = function (item) {
        console.log("removeResponse ")
        if(item.isPresent){
            item.isDelete = true
        }else{
            $scope.resposneList.splice($scope.resposneList.indexOf(item),1);
        }
    }
    
    $scope.updateIntent = function(){
        $scope.toggleGridLoader("editIntentWidget")
        var params = {
            appId : $scope.appId,
            appName : $scope.appName,
            intentId : $routeParams.id,
            intentName : $scope.intentName,
            description : $scope.description,
            userExpList : $scope.userExpList,
            actions : $scope.action,
            resposneList : $scope.resposneList ,
            inputContext : $scope.inputContext,
            outputContext : $scope.outputContext
        }
        console.log("params :::::::::::::::::::::: ",params)
        var promise = dashboardService.updateIntent(params)
        promise.then(
            function(payload){
                $scope.toggleGridLoader("editIntentWidget")
                console.log("updateIntent payload  ",payload)
                $rootScope.saveSuccess = true
                $location.path("/manageIntent")

            },
            function(errorPayload) {
                $scope.toggleGridLoader("editIntentWidget")
            }) 
    }
    
    $scope.getIntentDetails = function(){
        console.log( " $scope.getIntentDetails ")
        $scope.toggleGridLoader("editIntentWidget")
        var params = {
            appId : $scope.appId,
            intentId : $routeParams.id
        }
        var promise = dashboardService.getIntentDetails(params)
        promise.then(
            function(payload){
                $scope.toggleGridLoader("editIntentWidget")
                console.log("payload editIntentWidget ",payload.data)
                $scope.intentName = payload.data.name,
                $scope.description = payload.data.description,
                $scope.userExpList = payload.data.userExpList,
                $scope.action = payload.data.actions,
                $scope.resposneList = payload.data.resposneList 
                $scope.inputContext =  payload.data.inputContext 
                $scope.outputContext =  payload.data.outputContext 

            },
            function(errorPayload) {
                $scope.toggleGridLoader("editIntentWidget")
            }) 
    }
    
    $scope.init()
    $scope.getIntentDetails()
})