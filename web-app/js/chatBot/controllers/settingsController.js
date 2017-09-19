/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


chatBot.controller("settingsController", function($scope,$rootScope) {
    console.log("***********settingsController**************")
    $scope.openSubSideBar("settingsSection")
//    var intervalCurrentSession;
    // Maximize | Minimize Apps Grid
    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
    
   
    $scope.$on('reloadTemplate', function(event) {
        resetRequest()
        $scope.initializeDashboard()
    // $scope.resetView(); // reset template with default settings
    });
    
//    $('a[href="#/settings/"]').parent().addClass("current");
   
  
})