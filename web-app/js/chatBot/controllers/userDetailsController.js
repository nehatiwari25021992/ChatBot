/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



chatBot.controller("userDetailsController", function($scope,dashboardService,  $routeParams,$log) {
    console.log("***********userDetailsController**************")
    $scope.openSubSideBar("userSection")
    //    var intervalCurrentSession;
    // Maximize | Minimize Apps Grid
    $scope.initializeGridMaximize()  // Initializes Grid Maximize option
   
    $scope.refreshProfileWidget = function(){
        $scope.init() 
        $scope.getUserDetails()
    }
   
    $scope.$on('reloadTemplate', function(event) {
        $scope.init() 
        $scope.getUserDetails()
    });
    
    //    $('a[href="#/users/"]').parent().addClass("current");
   
    $scope.init= function(){
        $scope.userList = []
        $scope.userConversation = []
        $scope.userChats = []
    }
    
    $scope.getUserDetails = function(){
        console.log("getUserDetails ")
        $scope.toggleGridLoader("userDetailsWidget")
        var params = {
            appId : $scope.appId,
            userId : $routeParams.id
        }
        var promise = dashboardService.getUserDetails(params)
        promise.then(
            function(payload){
                $scope.toggleGridLoader("userDetailsWidget")
                $scope.userDetails = payload.data
                console.log("userDetails :::::::::::::::  ",$scope.userDetails)
                $scope.getUserConversation()
            },
            function(errorPayload) {
                $scope.toggleGridLoader("userDetailsWidget")
            }) 
    }
    
    $scope.getUserConversation = function(){
        console.log("getUserConversation ")
        $scope.toggleGridLoader("userDetailsWidget")
        var params = {
            appId : $scope.appId,
            userId : $routeParams.id            
        }
        var promise = dashboardService.getUserConversation(params)
        promise.then(
            function(payload){
                $scope.toggleGridLoader("userDetailsWidget")
                $scope.userConversation = payload.data.data
                console.log("userConversation :::::::::::::::  ",$scope.userConversation)
                $scope.openConversation($scope.userConversation[0])

            },
            function(errorPayload) {
                $scope.toggleGridLoader("userDetailsWidget")
            }) 
    }
    
      
    $scope.openConversation = function(obj){
        console.log("userCon :: ",obj)
        $scope.userChats = []
        $scope.glued = true;
        $scope.loadMoreChat = false
        $scope.showChat = false
        $log.info("called openConversation")  
        $scope.loadingState1 = true
        var params = {
            appId : $scope.appId,
            conversation_id :  obj.conversation_id,
            userName :  $scope.userDetails.name,
            userId : $routeParams.id,
            offset : 0,
            limit : 5
        }
        var promise = dashboardService.openConversation(params)
        promise.then(
            function(payload) {
                $log.info("called openConversation payload ",payload) 
                $scope.userChats = payload.data
                $scope.showChat = true
                if(payload.data.length == 10){
                    $scope.loadMoreChat = true
                }else{
                    $scope.loadMoreChat = false
                }
                $scope.loadingState1 = false
            },
            function(errorPayload) {
                $log.info("failure getting getUserDetails"+errorPayload)  
                $scope.loadingState1 = false
            }); 
        
    }
    
    
    $scope.gotoprofile = function(){
        $location.path("/users")
    }
    
    $scope.loadMoreChats = function(){
        $scope.glued = false;
        $log.info("called loadMoreChats")  
        $scope.loadingState1 = true
        var params = {
            offset :  $scope.msgObj.length,
            name :  $routeParams.name
        }
        var promise = dataService.loadMoreChats(params)
        promise.then(
            function(payload) {
                $log.info("called loadMoreChats payload ",payload)  
                var tempUserList =  payload.data
                tempUserList.forEach(function(u){
                    $scope.msgObj.push(u)
                })                
                if(payload.data.length == 10){
                    $scope.loadMoreChat = true
                }else{
                    $scope.loadMoreChat = false
                }
                $log.info("$scope.loadMoreChat  :::::::::;  ",$scope.loadMoreChat)
                $scope.loadingState1 = false
            },
            function(errorPayload) {
                $log.info("failure getting loadMoreChats "+errorPayload)  
                $scope.loadingState1 = false
            });
    }
    
    $scope.init() 
    $scope.getUserDetails()
    
})