/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 18 Sep 2017
 * @version 1.0
 */


chatBot.controller("dialogController", function($scope,$window,dashboardService,$rootScope) {
    console.log("***********dialogController**************")
    $scope.openSubSideBar("dialogSection")

    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
    
    $scope.$on('reloadTemplate', function(event) {
        $scope.getDialog()
    });
    
  
    $scope.specsUrl = $scope.baseURL+"chatBot/dialogFrame/"+$scope.appId
   console.log($scope.specsUrl)
 
    
    $scope.getDialog = function(){
        var params = {
            appId : $scope.appId
        }
        var promise = dashboardService.getDialog(params)
        promise.then(
            function(payload){
//                console.log("payload  ",payload)
           },
            function(errorPayload) {
            // $scope.toggleGridLoader("addIntentWidget")
            }) 
    }
 

    $rootScope.unknownName = ""
    $rootScope.id = ""
  
})