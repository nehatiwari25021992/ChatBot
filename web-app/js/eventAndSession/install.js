/**
 * Shephertz Technologies
 * @author Shikha Chauhan
 * @date 23 Feb 2015
 * @version 1.0
 */
// Install functionality (Daily,Weekly,Monthly) & Total Installs 
appHq.controller("installController", function($scope, $rootScope, $http,dataService,$parse,$location) {
    $scope.fieldsSource = ["INSTALL","UNINSTALL","APPALIVE","UNREGISTER-PUSH"]
    $scope.daily = 0
    $scope.prevDay = 0
    $scope.weekly = 0
    $scope.prevWeek = 0
    $scope.monthly = 0
    $scope.prevMonth = 0
    $scope.total = 0
    $scope.prevdayComapare = 0
    $scope.prevMonthComapare = 0
    $scope.prevWeekComapare = 0
    $scope.TotalUninstall = 0
    $("#noData").hide();
    $("a.active").removeClass("active");
    $("#usersMenu").addClass("active");
    $("#installMenu").addClass("active");
    $("#bookMarkedQueries").hide(); 
    eventReq.setType("INSTALL")
    var range = $('#rangeInstall');
    // Show the dates in the range input
    range.val(moment().subtract('days', 6).format('YYYY-MM-DD')+" - "+moment().format('YYYY-MM-DD'))
    // set total events in scope
    var totalEvents = dataService.getTotalEvents()
    var checkIfInstall = totalEvents.indexOf("INSTALL"); 
    if(checkIfInstall != "-1"){
        $("#installText").html('No Data.')
        
        $scope.onChange = function(fields){
            console.log(fields)
            events.length = 0
            angular.forEach(fields, function(value, key) {
                events.push(value);
            });
            eventReq.setEvents(events)
            ajaxLoadChart();
        }
        
        var installCountObj = dataService.getInstallInfo()
        $scope.daily = installCountObj.daily
        $scope.dailyValInK = installCountObj.dailyValInK
        if(installCountObj.dailyValInK){
         $scope.dailyCountInK = installCountObj.dailyCountInK   
        }
        $scope.prevDay = installCountObj.prevDay
        $scope.prevValInK = installCountObj.prevValInK
        if(installCountObj.prevValInK){
         $scope.prevCountInK = installCountObj.prevCountInK   
         $scope.unitDay = "K"
        }else{
         $scope.prevCountInK = $scope.prevDay    
        }
        $scope.prevdayComapare = installCountObj.prevdayComapare
        $scope.total = installCountObj.TotalInstall
        $scope.TotalInstallInK = installCountObj.TotalInstallInK
        if($scope.TotalInstallInK){
         $scope.unitInstall = "K"   
        }
        $scope.TotalUninstall = installCountObj.TotalUninstall
        $scope.TotalUninstallInK = installCountObj.TotalUninstallInK
        if($scope.TotalUninstallInK){
         $scope.unitUnInstall = "K"   
        }
        var installWeekCountObj = dataService.getWeekInstallInfo()
        $scope.weekly = installWeekCountObj.weekly
        $scope.weekValInK = installWeekCountObj.weekValInK
        if(installWeekCountObj.weekValInK){
         $scope.weekCountInK = installWeekCountObj.weekCountInK   
        }
        $scope.prevWeek = installWeekCountObj.prevWeek
        $scope.prevWeekValInK = installWeekCountObj.prevWeekValInK
        if(installCountObj.prevWeekValInK){
         $scope.prevWeekCountInK = installWeekCountObj.prevWeekCountInK
         $scope.unitWeek = "K"
        }else{
         $scope.prevWeekCountInK = $scope.prevWeek    
        }
        $scope.prevWeekComapare = installWeekCountObj.prevWeekComapare
        var installMonthCountObj = dataService.getMonthInstallInfo(eventReq)
        $scope.monthly = installMonthCountObj.monthly
        $scope.monthValInK = installMonthCountObj.monthValInK
        if(installMonthCountObj.monthValInK){
         $scope.monthCountInK = installMonthCountObj.monthCountInK   
        }
        $scope.prevMonth = installMonthCountObj.prevMonth
        $scope.prevMonthValInK = installMonthCountObj.prevMonthValInK
        if(installMonthCountObj.prevMonthValInK){
         $scope.prevMonthCountInK = installMonthCountObj.prevMonthCountInK
         $scope.unitMonth = "K"
        }else{
         $scope.prevMonthCountInK = $scope.prevMonth    
        }
        $scope.prevMonthComapare = installMonthCountObj.prevMonthComapare
        
    }else{
        $("#noData").show()
        $("#installText").html('No Data.')
    }
    
    range.daterangepicker({
        startDate: start,
        endDate: end,
        format: 'YYYY-MM-DD',
        dateLimit:{
            days: 30
        },
        maxDate:moment().utc(),	
        ranges: {
            'Today': [moment().utc(), moment().utc()],
            'Yesterday': [moment().utc().subtract('days', 1), moment().utc().subtract('days', 1)],
            'Last 7 Days': [moment().utc().subtract('days', 6), moment().utc()],
            'Last 30 Days': [moment().utc().subtract('days', 29), moment().utc()]
        }
    },function(startDate, endDate){
        var startD =$("#rangeInstall").data('daterangepicker').startDate.format('YYYY-MM-DD')
        var endD =$("#rangeInstall").data('daterangepicker').endDate.format('YYYY-MM-DD')
        start = startD
        end = endD
        eventReq["start"] = start
        eventReq["end"] = end
        ajaxLoadChart();
		
    });
      
});
