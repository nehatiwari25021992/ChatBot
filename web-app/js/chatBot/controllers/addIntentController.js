/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


chatBot.controller("addIntentController", function($scope,dashboardService,$location, $rootScope) {
    console.log("***********addIntentController**************")
    $scope.openSubSideBar("intentSection")
    $('a[href="#/manageIntent/"]').parent().addClass("current");
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
       
        $scope.resposne = ""
        $scope.resposneList = []
        $scope.actions = []
        $scope.action = ""
        $scope.description = ""
        $scope.isuserExp = "default"
        $scope.isactions = "default"
        $scope.isresposne = "default"
        $scope.isIntent = "default"
    }
    
    $scope.showExpEntity = function(expObj){
        expObj.show = !expObj.show
    }
   
    $scope.addUserSays = function(){
        $scope.isuserExp = "default"
        var item = $scope.userExp
        if(item == "" || item == null || item == undefined){
            $scope.isuserExp = "blank"
        }else if($scope.userExpList.indexOf(item) > -1){
            $scope.isuserExp = "invalid"
        }else{
            $scope.userExpList.forEach(function(u){
                u.show = false
            })
            var map = {}
            map.name = $scope.userExp
            map.show = true
            map.entity = $scope.getEntityForUserExpression($scope.userExp)
            $scope.userExpList.push( map)
            $scope.userExp = ""
        }
        console.log( "$scope.userExpList  ", $scope.userExpList)
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
        $scope.userExpList.splice($scope.userExpList.indexOf(item),1);
    }
   
    
    $scope.addResponse = function(){
        $scope.isresposne = "default"
        var item = $scope.resposne
        if(item == "" || item == null || item == undefined){
            $scope.isresposne = "blank"
        }else if($scope.resposneList.indexOf(item) > -1){
            $scope.isresposne = "invalid"
        }else{
            $scope.resposneList.push($scope.resposne)
            $scope.resposne = ""
        }
        console.log( "$scope.resposneList  ", $scope.resposneList)
    }
   
    $scope.removeResponse = function (item) {
        $scope.resposneList.splice($scope.resposneList.indexOf(item),1);
    }
    
    $scope.saveIntent = function(){
        var error = false
        $scope.isresposne = "default"
        $scope.isuserExp = "default"
        $scope.isIntent = "default"
        if($scope.resposneList == null || $scope.resposneList.length == 0 || $scope.resposneList == undefined){
            error = true
            $scope.isresposne = "blank"
        }
        if($scope.userExpList == null || $scope.userExpList.length == 0 || $scope.userExpList == undefined){
            error = true
            $scope.isuserExp = "blank"
        }
        if($scope.intentName == null || $scope.intentName == "" || $scope.intentName == undefined){
            error = true
            $scope.isIntent = "blank"
        }
        if(error){
            return
        }
        $scope.toggleGridLoader("addIntentWidget")
        var params = {
            appId : $scope.appId,
            appName : $scope.appName,
            intentName : $scope.intentName,
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
    
    $scope.getAllEntities = function(){
        $scope.toggleGridLoader("manageEntityWidget")
        var params = {
            appId : $scope.appId,
            offset : 0,
            limit : 10
        }
        var promise = dashboardService.getAllEntities(params)
        promise.then(
            function(payload){
                $scope.toggleGridLoader("manageEntityWidget")
                $scope.entityList = payload.data
                
            },
            function(errorPayload) {
                $scope.toggleGridLoader("manageEntityWidget")
            })
    }
    
    $scope.changeEntity = function(en,param){
        console.log("en ",en)
        console.log("param ",param)
        param.entityName = en.name
        console.log("param ",param)
        console.log("userExpList :: ",$scope.userExpList)
    }
    
    $scope.init()
    $scope.getAllEntities()
})