/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


chatBot.controller("unknownIntentController", function($scope) {
    console.log("***********unknownIntentController**************")
    $scope.openSubSideBar("intentSection")
//    var intervalCurrentSession;
    // Maximize | Minimize Apps Grid
    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
    
   
    $scope.$on('reloadTemplate', function(event) {
        resetRequest()
        $scope.initializeDashboard()
    // $scope.resetView(); // reset template with default settings
    });
    
//    $('a[href="#/unknownIntent/"]').parent().addClass("current");
   
  
})