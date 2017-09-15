/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */




chatBot.controller("manageIntentController", function($scope, $timeout,$location,dashboardService,$rootScope,notificationService) {
    console.log("***********manageIntentController**************")
    $scope.openSubSideBar("intentSection")
    var intervalCurrentSession;
    // Maximize | Minimize Apps Grid
    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
    $scope.intentList = []
    $scope.limit = 10;
    $scope.hasMoreData = false
    $scope.$on('reloadTemplate', function(event) {
        $scope.getAllIntent()
    });
    $rootScope.saveSuccess = false
    socket = io.connect('http://52.172.31.113:5000');
    socket.on('connect', function() {
        socket.emit('my event', {
            data: 'I\'m connected!'
        });
    });
    console.log("socket :: ",socket)
    socket.on('learn_response', function (data) {
        console.log("*********************data************",data)
        notificationService.success('Training Completed.');
    });
        
    if($rootScope.saveSuccess){
        console.log("*********************************")
        socket.emit('learn', {});
        notificationService.info('Training Started.');
    }

    $scope.goToAddIntent = function(){
        $location.path("/addIntent")
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
                if($scope.intentList.length > 10 && $scope.limit <= $scope.intentList.length){                       
                    $scope.hasMoreData = true
                }else{
                    $scope.hasMoreData = false
                }
            },
            function(errorPayload) {
                $scope.toggleGridLoader("manageIntentWidget")
            })
    }
    
    $scope.loadMore = function(){
        $scope.limit=$scope.limit+10;
        if($scope.intentList.length > 10 && $scope.limit <= $scope.intentList.length){
                        
            $scope.hasMoreData = true
        }
        else
        {
            $scope.hasMoreData = false
        }
        console.log("$scope.hasMoreData ",$scope.hasMoreData)
    }
    
    $scope.editIntent = function(intent){
        $location.path("/editIntent/"+intent.id)
    }
  
    $scope.getAllIntent()
})