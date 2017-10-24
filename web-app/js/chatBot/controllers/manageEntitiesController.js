
chatBot.controller("manageEntitiesController", function($scope, $timeout,$location,dashboardService,$rootScope,notificationService) {
    console.log("***********manageEntitiesController**************")
    $scope.openSubSideBar("entitiesSection")
    var intervalCurrentSession;
    // Maximize | Minimize Apps Grid
    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
    $scope.entityList = []
    $scope.limit = 10;
    $scope.hasMoreData = false
    
    $scope.refreshManageWidget = function(){
        $scope.entityList = []
        $scope.limit = 10;
        $scope.hasMoreData = false
        $rootScope.unknownName = ""
        $rootScope.id = ""
        $scope.getAllEntities()
    }
    
    $scope.$on('reloadTemplate', function(event) {
        $scope.entityList = []
        $scope.limit = 10;
        $scope.hasMoreData = false
        $rootScope.unknownName = ""
        $rootScope.id = ""
        $scope.getAllEntities()
    });
    $rootScope.unknownName = ""
    $rootScope.id = ""

        
    if($rootScope.saveSuccess){
        notificationService.info('Entity created successfully.');
       
    }

    $scope.goToAddEntity = function(){
        $location.path("/addEntity")
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
                if($scope.entityList.length > 10 && $scope.limit <= $scope.entityList.length){                       
                    $scope.hasMoreData = true
                }else{
                    $scope.hasMoreData = false
                }
            },
            function(errorPayload) {
                $scope.toggleGridLoader("manageEntityWidget")
            })
    }
    
    $scope.loadMore = function(){
        $scope.limit=$scope.limit+10;
        if($scope.entityList.length > 10 && $scope.limit <= $scope.entityList.length){
                        
            $scope.hasMoreData = true
        }
        else
        {
            $scope.hasMoreData = false
        }
        console.log("$scope.hasMoreData ",$scope.hasMoreData)
    }
    
    $scope.editEntity = function(entity){
        $location.path("/editEntity/"+entity.id)
    }
  
    $scope.getAllEntities()
})