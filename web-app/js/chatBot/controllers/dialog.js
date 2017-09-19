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
            $scope.json = iframeContent.app.AppView.prototype.showCodeSnippet();
        }
    }
    
    $scope.getDialog = function(){
    
    }

  
})