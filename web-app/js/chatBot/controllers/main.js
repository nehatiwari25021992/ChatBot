/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 12 Mar 2015
 * @version 1.0
 */

// Main controller section

chatBot.controller("MainController", function($controller,$rootScope,$scope,$http,$log,$location,$route,$interval,$templateCache,dashboardService,notificationService) {
    console.log("***********MainController**************")
    $scope.baseURL = baseURL
    
    $scope.dashboardSection = false
    $scope.userSection = false
    $scope.insightsSection = false
    $scope.intentSection = false
    $scope.settingsSection = false 
    $scope.dialogSection = false 
    //Sub sidebar menus text
    $scope.sidebar = {}
    // Dashboard Section Sub Menus
    $scope.sidebar.dashboard = "Summary"
    $scope.sidebar.users = "List"
    $scope.sidebar.settings = "App"
    $scope.sidebar.manageIntent = "Manage"
    $scope.sidebar.addIntent = "Add"
    $scope.sidebar.insights = "Activity"
    $scope.sidebar.unknownIntent = "Unresolved"
    $scope.sidebar.dialogs = "Dialogs"
    $scope.sidebar.manageEntities = "Manage"
    $rootScope.saveSuccess = false
    $scope.openSubSideBar = function(module){
        if(module == "dashboardSection"){
            $scope.dashboardSection = true
            $scope.userSection = false
            $scope.insightsSection = false
            $scope.intentSection = false
            $scope.settingsSection = false  
            $scope.dialogSection = false 
            $scope.entitiesSection = false 
        }else if(module == "userSection"){
            $scope.dashboardSection = false
            $scope.userSection = true
            $scope.insightsSection = false
            $scope.intentSection = false
            $scope.settingsSection = false  
            $scope.dialogSection = false 
            $scope.entitiesSection = false 
        }else if(module == "insightsSection"){
            $scope.dashboardSection = false
            $scope.userSection = false
            $scope.insightsSection = true
            $scope.intentSection = false
            $scope.settingsSection = false  
            $scope.dialogSection = false 
            $scope.entitiesSection = false 
        }else if(module == "intentSection"){
            $scope.dashboardSection = false
            $scope.userSection = false
            $scope.insightsSection = false
            $scope.intentSection = true
            $scope.settingsSection = false 
            $scope.dialogSection = false 
            $scope.entitiesSection = false 
        }else if(module == "settingsSection"){
            $scope.dashboardSection = false
            $scope.userSection = false
            $scope.insightsSection = false
            $scope.intentSection = false
            $scope.settingsSection = true 
            $scope.dialogSection = false 
            $scope.dialogSection = false 
            $scope.entitiesSection = false 
        }else if(module == "dialogSection"){
            $scope.dashboardSection = false
            $scope.userSection = false
            $scope.insightsSection = false
            $scope.intentSection = false
            $scope.settingsSection = false 
            $scope.dialogSection = true 
            $scope.entitiesSection = false 
        }else if(module == "entitiesSection"){
            $scope.dashboardSection = false
            $scope.userSection = false
            $scope.insightsSection = false
            $scope.intentSection = false
            $scope.settingsSection = false 
            $scope.dialogSection = false 
            $scope.entitiesSection = true 
        }
    }
    
    //    $scope.app = "3d4bb5e3c2edd13563155c3036ac47afed3298dc4e474f026cf147485dc5e881"
    //    $scope.key = "8b97a5ad0072f2eac01928d8e9d8c813313d4b9e9fa4ebec080969281ec8cef0"
    //    $scope.apiKey = "3d4bb5e3c2edd13563155c3036ac47afed3298dc4e474f026cf147485dc5e881"
    //    $scope.secretKey = "8b97a5ad0072f2eac01928d8e9d8c813313d4b9e9fa4ebec080969281ec8cef0"
    //    $scope.appId = 1
    //    $rootScope.appId = 1
    // This for appName
  
    
    //    $('.chosen-select').chosen({
    //        disable_search_threshold: 10
    //    });
    
    // Reloads Template area on App Change
    $scope.changeApp = function(){
        $scope.appId = $scope.app.id
        $scope.apiKey = $scope.app.apiKey
        $scope.secretKey = $scope.app.secretKey
        $rootScope.appId = $scope.app.id
        $scope.appName = $scope.app.name
        $rootScope.appName = $scope.app.name
        $rootScope.$broadcast("reloadTemplate")
    }
    
    //Change Keys
    $scope.changeKey = function(){
        $scope.keyId = $scope.key.id
        $scope.apiKey = $scope.key.apiKey
        $scope.secretKey = $scope.key.secretKey
        
        // This for appName
        $scope.keyName = $scope.key.name
    }
    //
    //App Change handler
    $("#appDropDown").on('change', function(evt, params) {
        $scope.appId = params.selected
        $rootScope.$broadcast("reloadTemplate")    
    });
    
    // Updates choosen plugin for new options
    // $(".chosen-select").trigger("chosen:updated");
    // Maximize | Restore  Grids
    $scope.initializeGridMaximize = function(){
        $('.widget-control-full-screen').on("click", function() {
            $elem = $(this)
            $elem.closest('.widget').toggleClass('widget-full-screen');
            return false;
        }); 
    }
    // Minimize Grids
    $scope.initializeGridMinimize = function(){
        $('.widget-control-minimize').on("click", function() {
            $elem = $(this)
            if($elem.closest('.widget').hasClass('widget-title-minimized')){
                $elem.closest('.widget').removeClass('widget-minimized').removeClass('widget-title-minimized').find('.widget-content').slideDown('fast');
            }else{
                $elem.closest('.widget').addClass('widget-minimized').find('.widget-content').slideUp('fast', function(){
                    $elem.closest('.widget').addClass('widget-title-minimized')
                });
            }
            return false;
        });
    }
   
    // Summary Side Bar
       
    // Executes every 25 seconds for hiding messages
    $interval( function(){
        $("div.alert").hide("slow") // This logic could be improved
    }, 15000);
    
    // toggle grid loader
    $scope.toggleGridLoader = function(widgetID){
        $("#"+widgetID).toggleClass('widget-loading');
    }
    
    var apps = []
    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };
    
    $scope.checkIfIntent = function(loc){
        if(window.location.href.indexOf('/manageIntent') > -1) {
            return true
        }else if(window.location.href.indexOf('/addIntent') > -1) {
            return true
        }else if(window.location.href.indexOf('/editIntent') > -1) {
            return true
        }
        return false
       
    }
    
      $scope.checkIfEntity = function(loc){
        if(window.location.href.indexOf('/manageEntities') > -1) {
            return true
        }else if(window.location.href.indexOf('/addEntity') > -1) {
            return true
        }else if(window.location.href.indexOf('/editEntity') > -1) {
            return true
        }
        return false
       
    }
    
    
    $scope.getAppsForDropDown = function(appNameNew){
        apps = dashboardService.getAppsForDropdown()
        $scope.appList =  apps
        $scope.app = apps[0]
        $scope.key = apps[0]
        $scope.apiKey = $scope.key.apiKey
        $scope.secretKey = $scope.key.secretKey
        $scope.appId = $scope.app.id
        $rootScope.appId = $scope.app.id
        $scope.appName = $scope.app.name
        $rootScope.appName = $scope.app.name
    }
    $scope.getAppsForDropDown()
    $scope.getTotalAppEvents = function(){
        $("#createNotifyId").hide();
        //  $("#breadcrumbId").removeClass('breadcrumbMA');
       
        var totalEventsForApp = dashboardService.getTotalEventsForApp($scope.appId);
        totalEventsForApp.then(
            function(payload) { 
                if(payload.data == undefined ){
                    $scope.hasEventCall = false
                    $("#createNotifyId").show();
                    $("#breadcrumbId").addClass('breadcrumbMA');
                }else if(payload.data.length <= 1){
                    $scope.hasEventCall = false
                    $("#createNotifyId").show();
                    $("#breadcrumbId").addClass('breadcrumbMA');
                }else{
                    $scope.hasEventCall = true
                    $("#createNotifyId").hide();
                }
                 
            },
            function(errorPayload) {
                
                $log.error('failure getting queries', errorPayload);
            });
    }
    
    socket = io.connect('http://52.172.31.113:5000');
    socket.on('connect', function() {
        socket.emit('my event', {
            data: 'I\'m connected!'
        });
    });
    console.log("socket :: ",socket)
    socket.on('learn_response', function (data) {
        console.log("*********************data************",data)  
        //$timeout(function(){
        notificationService.success('Training Completed.');
    // },1000)
    });
});

// coming soon
chatBot.controller("comingSoonController", function($scope) {
    $scope.loadingView = true;
  
});

//Page Not Found
chatBot.controller("pageNotFoundController", function($scope) {
    $scope.loadingView = true;
  
});

// Internal Server Error
chatBot.controller("errorController", function($scope) {
    $scope.loadingView = true;
 
});