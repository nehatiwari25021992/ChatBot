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
  
    $scope.specsUrl = "http://localhost:8080/App42ChatBot/JointJS - JavaScript diagramming library - Demos._files/index.html"
    $scope.showSnippet = function() {
        var iframe = document.getElementById("targetFrame");
        if (iframe) {
            var iframeContent = (iframe.contentWindow || iframe.contentDocument);
            $scope.json = iframeContent.app.AppView.prototype.showCodeSnippet();
        }
    }
    
    $scope.getDialog = function(){
        var params = {
            appId : $scope.appId
        }
        var promise = dashboardService.getDialog(params)
        promise.then(
            function(payload){
                if(payload.data.success){
                    $scope.json = payload.data.rows.config
                    var iframe = document.getElementById("targetFrame");
                  
                    if (iframe) {
                        var iframeContent = (iframe.contentDocument || iframe.contentWindow.document);
                        //                        var iframeContent = (iframe.contentWindow || iframe.contentDocument);
                       console.log(iframeContent)
                       var yourChildiFrameControl = iframeContent.getElementById("jJson");
                        console.log(yourChildiFrameControl)
                        yourChildiFrameControl.innerHTML = $scope.json
                        console.log(yourChildiFrameControl.innerHTML)
                    //                        iframeContent.app.AppView.prototype.initializePaper();
                    //                        iframeContent.app.AppView.prototype.initializeSelection();
                    //                        iframeContent.app.AppView.prototype.initializeHalo();
                    //                        iframeContent.app.AppView.prototype.initializeInlineTextEditor();
                    //                        iframeContent.app.AppView.prototype.initializeTooltips();
                      
                    }
                }
              

            },
            function(errorPayload) {
            // $scope.toggleGridLoader("addIntentWidget")
            }) 
    }
    $scope.getDialog()

    $rootScope.unknownName = ""
    $rootScope.id = ""
  
})