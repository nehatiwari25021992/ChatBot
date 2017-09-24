

chatBot.controller("unknownController", function($scope,dashboardService,$location, $rootScope,notificationService) {
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
    
    $scope.matchToExciting = function(u){
        $scope.selectedIntent = u
        $scope.getAllIntent()
        $("#matchIntentForm").modal("show");
    }
    
    $scope.matchItToIntent = function(){
        var params = {
            id : $scope.selectedIntent.id,
            userSay : $scope.selectedIntent.name,
            tagId : $scope.matchedIntent.id,
            appId : $scope.appId
        }
        var promise = dashboardService.matchItToIntent(params)
        promise.then(
            function(payload){
                // $scope.toggleGridLoader("unknownWidget")
                $("#matchIntentForm").modal("hide");
                socket.emit('learn', {});
                notificationService.info('Training Started.');
            },
            function(errorPayload) {
                $("#matchIntentForm").modal("hide");
            //  $scope.toggleGridLoader("unknownWidget")
            })
    }
    
    $scope.getAllIntent = function(){
        $scope.toggleGridLoader("manageIntentWidget")
        var params = {
            appId : $scope.appId,
            offset : 0,
            limit : 10
        }
        var promise = dashboardService.getAllIntent(params)
        promise.then(
            function(payload){
                $scope.toggleGridLoader("manageIntentWidget")
                $scope.intentList = payload.data
                $scope.matchedIntent =  $scope.intentList[0]
            },
            function(errorPayload) {
                $scope.toggleGridLoader("manageIntentWidget")
            })
    }
    
    
    $scope.init() 
    $scope.getUnknownIntent()
})