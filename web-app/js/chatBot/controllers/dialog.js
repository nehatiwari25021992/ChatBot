/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 18 Sep 2017
 * @version 1.0
 */


chatBot.controller("dialogController", function($scope, $rootScope) {
  console.log("***********dialogController**************")
 $scope.openSubSideBar("dialogSection")

    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
    
   $scope.specsUrl = "http://localhost:8080/App42ChatBot/JointJS - JavaScript diagramming library - Demos._files/saved_resource(2).html"
    
   $rootScope.unknownName = ""
    $rootScope.id = ""
  
})