/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



chatBot.controller("userController", function($scope,dashboardService,$location) {
    //    console.log("***********userController**************")
    $scope.openSubSideBar("userSection")
    // var intervalCurrentSession;
    // Maximize | Minimize Apps Grid
    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
    
    $scope.refreshUserWidget = function(){
        $scope.init() 
        $scope.getAllUsers()
    }
    $scope.$on('reloadTemplate', function(event) {
        $scope.init() 
        $scope.getAllUsers()
    });
    
    //    $('a[href="#/users/"]').parent().addClass("current");
   
    $scope.init= function(){
        $scope.userList = []
    }
    
    $scope.getAllUsers = function(){
        $scope.toggleGridLoader("usersWidget")
        var params = {
            appId : $scope.appId,
            offset : 0,
            max : 10
        }
        var promise = dashboardService.getAllUsers(params)
        promise.then(
            function(payload){
                $scope.toggleGridLoader("usersWidget")
                $scope.userList = payload.data
            },
            function(errorPayload) {
                $scope.toggleGridLoader("usersWidget")
            }) 
    }
      
    $scope.init() 
    $scope.getAllUsers()
})