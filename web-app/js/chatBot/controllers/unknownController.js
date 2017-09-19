

chatBot.controller("unknownController", function($scope,dashboardService,$location, $rootScope) {
    $scope.openSubSideBar("dialogSection")
    // var intervalCurrentSession;
    // Maximize | Minimize Apps Grid
    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
    
    $scope.refreshUnknowWidget = function(){
        $scope.init() 
        $scope.getUnknownIntent()
    }
    $scope.$on('reloadTemplate', function(event) {
        $scope.init() 
        $scope.getUnknownIntent()
    });
    
    //    $('a[href="#/users/"]').parent().addClass("current");
   
    $scope.init= function(){
        $scope.hasMore = false
        $scope.unknowIntent = []
    }
    
    $scope.getUnknownIntent = function(){
        $scope.toggleGridLoader("usersWidget")
        var params = {
            appId : $scope.appId,
            offset : 0,
            max : 10
        }
        var promise = dashboardService.getUnknownIntent(params)
        promise.then(
            function(payload){
                $scope.toggleGridLoader("usersWidget")
                $scope.unknowIntent = payload.data.data
                $scope.hasMore = false
            },
            function(errorPayload) {
                $scope.toggleGridLoader("usersWidget")
            }) 
    }
     
    $rootScope.unknownName = ""
    $rootScope.id = ""
      
    $scope.gotoAddIntent = function(obj){
        $rootScope.unknownName = obj.name
        $rootScope.id = obj.id
        $location.path("/addIntent")
    }  
    
    $scope.init() 
    $scope.getUnknownIntent()
})