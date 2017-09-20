/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


chatBot.controller("addIntentController", function($scope,dashboardService,$location, $rootScope) {
    console.log("***********addIntentController**************")
   // $scope.openSubSideBar("intentSection")
    var intervalCurrentSession;
    // Maximize | Minimize Apps Grid
    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
    $rootScope.saveSuccess = false
   
    $scope.$on('reloadTemplate', function(event) {

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
    }
   
    $scope.addUserSays = function(){
        $scope.isuserExp = "default"
        var item = $scope.userExp
        if(item == "" || item == null || item == undefined){
            $scope.isuserExp = "blank"
        }else if($scope.userExpList.indexOf(item) > -1){
            $scope.isuserExp = "invalid"
        }else{
            $scope.userExpList.push( $scope.userExp)
            $scope.userExp = ""
        }
        console.log( "$scope.userExpList  ", $scope.userExpList)
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
    
    $scope.init()
})