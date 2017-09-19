/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 18 Sep 2017
 * @version 1.0
 */


chatBot.controller("dialogController", function($scope,$window) {
    console.log("***********dialogController**************")
    $scope.openSubSideBar("dialogSection")

    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
    
    $scope.specsUrl = "http://localhost:8080/App42ChatBot/JointJS - JavaScript diagramming library - Demos._files/index.html"
    $scope.showSnippet = function() {
        var iframe = document.getElementById("targetFrame");
        if (iframe) {
            var iframeContent = (iframe.contentWindow || iframe.contentDocument);
//            console.log(iframeContent.app)
//            console.log(iframeContent.app.AppView)
//            console.log(iframeContent.app.AppView.prototype)
//            console.log(iframeContent.app.AppView.prototype.showCodeSnippet())
           $scope.json = iframeContent.app.AppView.prototype.showCodeSnippet();
        }
        
     
        
        // var el = document.getElementById('targetFrame');
        // $scope.json = $window.frames['targetFrame'].showCodeSnippet();
       
        //        var iframe = document.getElementById("targetFrame");
        //        $scope.json =  iframe.contentWindow.showCodeSnippet();
        
        
        // $scope.json = document.getElementById('targetFrame').contentWindow.showCodeSnippet();
        console.log("$scope.json")
        console.log($scope.json)
      
    }

  
})