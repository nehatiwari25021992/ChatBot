/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 09 Dec 2014
 * @version 1.0
 */

// Activity Logs js
appHq.controller("logsController", function($scope,$timeout,$rootScope,$http,dataService) {
   
    $("#noData").hide();
    $("a.active").removeClass("active");
    $("#logsMenu").addClass("active");
    $("#bookMarkedQueries").hide(); 
    $("#bookMarkedQueries1").hide(); 
    $("#funnelQueries").hide(); 
    eventReq.setType("LOGS")
    
    var logs = dataService.getLogsData()
    $scope.logs = logs
    if(logs.length < 10){
        $("#loadLogsBtn").hide()
        $("#noLogsBtn").hide()
    }
    $scope.offset = 0
    $scope.max = 10
   
    //    $scope.roleList1 = []
    $scope.moreResults = function(){
        $scope.offset = $scope.offset + $scope.max
        
        showLoad()
        $http({
            method: "post",
            params: {
                // queryName:queryName,
                offset:$scope.offset,
                max:$scope.max,
                id:eventReq.id
            },
            url: '../event/getPagedHistory'
        }).success(function(data, status) {
            for (var i = 0; i < data.length; i++) {
                $scope.logs.push(data[i]);
            }
            if(data.length < 10){
                $("#loadLogsBtn").hide()
                $("#noLogsBtn").show()
            }
            hideLoad()
        }).error(function(data, status) {
            // Some error occurred
            hideLoad()
        });
       
    }
    $scope.history = function(obj,i){
      
        if(obj.children == null){
        //            customAlert("alert-error","No history associated with this log.") 
        //            return; 
        }else{
            //roleList1 to treeview
            var childArr = obj.children.split(",");
            var newArr = []
            $.each(childArr,function(ca){
                var obj1 = {
                    "roleName" : moment(childArr[ca]).format("YYYY-MM-DD H:mm:ss"), 
                    "roleId" : "role1"+ca, 
                    "children" : [] 
                }
                newArr.push(obj1)
            });
      
            $scope.roleList1 = [
            {
                "roleName" : "Message Sent History", 
                "roleId" : "role1", 
                "children" :newArr
            }
            ];
            $scope.roleList = $scope.roleList1; 
        }
        $("#myModalLogs"+i).show()
//        $("ul.nav li").removeClass("active")
//        $("div.tab-content div").removeClass("active")
//        $("ul.nav li:first").addClass("active")
//        $("div.tab-content div:first").addClass("active")
        $("#myModalLogs"+i).modal('show')
    }
    $scope.resendMessage = function(obj){
        showLoad()
        $http({
            method: "post",
            params: {
                id:obj.id,
                appId:eventReq.id
            },
            url: '../event/resendMessage'
        }).success(function(data, status) {
            hideLoad()
            if(data.success)
                $("#infoMsg").show("slow")
            else
                $("#errorMsg").show("slow")   
           
            $timeout(function() {
                if(data.success)
                    $("#infoMsg").hide("slow")
                else
                    $("#errorMsg").hide("slow") 
            }, 3000);
        }).error(function(data, status) {
            // Some error occurred
            $("#errorMsg").show("slow")
            hideLoad()
            $timeout(function() {
                $("#errorMsg").hide("slow")
            }, 3000);
        });
       
    }
    
});