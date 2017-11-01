<!DOCTYPE html>
<html lang="en"  xmlns:ng="https://angularjs.org" id="ng-app" ng-app="chatBot" data-ng-controller="MainController" >
  <head>
    <title><g:layoutTitle default="ChatBot" /></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" media="all" type="text/css" href="https://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel='stylesheet' href='${resource(dir:'css/ma',file:'custom_style.css')}'>
    <link rel='stylesheet' href='${resource(dir:'css/ma',file:'custom_styleV2.css')}'>
    <link rel='stylesheet' href='${resource(dir:'css/ma',file:'newMediaQuery.css')}'>
    <link rel='stylesheet' href='${resource(dir:'css/ma',file:'pnotify.css')}'>
    <link rel='stylesheet' href='${resource(dir:'css/ma',file:'pnotify.buttons.css')}'>

    <link rel='stylesheet' href='${resource(dir:'css/ma',file:'responsive.css')}'>
    <link rel='stylesheet' href='${resource(dir:'css/ma',file:'prediction.css')}'>
    <link rel='stylesheet' href='${resource(dir:'css/ma',file:'UserProfile.css')}'>
    <link rel='stylesheet' href='${resource(dir:'css/ma',file:'event.css')}'>
    <link rel='stylesheet' href='${resource(dir:'css/angular',file:'app.css')}'>
    <link rel='stylesheet' href='${resource(dir:'css/angular/plugins',file:'chosen.css')}'>
    <link rel="stylesheet" type="text/css" href='${resource(dir:'css/ma',file:'trip.min.css')}'>

    <link rel='stylesheet' href='${resource(dir:'css/angular/plugins',file:'ng-prettyjson.min.css')}'>

    <link rel='stylesheet' href='${resource(dir:'css/angular/plugins',file:'daterangepicker-bs3.css')}'>
    <link rel='stylesheet' href='${resource(dir:'css/angular/plugins',file:'jquery.timepicker.css')}'>
    <link rel="stylesheet" href="${resource(dir:'css/eventAndSession',file:'cornelius.css')}" />
    <link rel="stylesheet" href='${resource(dir:'css/emailTemplate',file:'token-input.css')}'/>
    <link rel="stylesheet" href='${resource(dir:'css/emailTemplate',file:'token-input-facebook.css')}'/>
    <link rel="stylesheet" href="${resource(dir:'css/eventAndSession',file:'angular-toggle-switch.css')}" />
    <link rel="stylesheet" href="${resource(dir:'css/eventAndSession',file:'angular-toggle-switch-bootstrap.css')}" />
    <link rel='stylesheet' href='${resource(dir:'css/ma',file:'UserProfile.css')}'>
    <!--feedBack form css-->
    <link rel='stylesheet' href='${resource(dir:'css/angular/plugins',file:'jquery.feedback_me.css')}'>
    <link rel='stylesheet' href='${resource(dir:'css/angular/plugins',file:'multiple-select.css')}'>
    <link rel='stylesheet' href='${resource(dir:'css/angular/plugins',file:'jplayer.pink.flag.min.css')}'>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-switch/3.3.2/css/bootstrap3/bootstrap-switch.css'>
    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,700|Roboto+Condensed:300,400,700' rel='stylesheet' type='text/css'>
    <link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
    <link href="assets/apple-touch-icon.png" rel="apple-touch-icon">
    <!--Multi-range slider-->
    <link rel='stylesheet' href='${resource(dir:'css/ma',file:'prettify.css')}'>
    <link rel='stylesheet' href='${resource(dir:'css/ma',file:'jquery.mCustomScrollbar.min.css')}'>
    <link href='https://rawgit.com/rzajac/angularjs-slider/master/dist/rzslider.css' rel='stylesheet' type='text/css'>
    <script src="go.js"></script>
    <link rel='stylesheet' href='${resource(dir:'css',file:'goSamples.css')}'>
  <g:layoutHead />

</head>
<body class="glossed">

<g:layoutBody />
<script src='${resource(dir:'js/ma',file:'jquery-1.10.2.min.js')}'></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-sanitize.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-animate.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-route.min.js"></script>
<script>
var baseURL = "${baseURL}"

</script>

<script src='${resource(dir:'js/angular/resources/plugins',file:'dropzone-amd-module.js')}'></script>
<script src='${resource(dir:'js/angular/resources/bootstrap',file:'tab.js')}'></script>
<script src='${resource(dir:'js/angular/resources/bootstrap',file:'dropdown.js')}'></script>
<script src='${resource(dir:'js/angular/resources/bootstrap',file:'tooltip.js')}'></script>
<script src='${resource(dir:'js/angular/resources/bootstrap',file:'collapse.js')}'></script>
<script src='${resource(dir:'js/angular/resources/bootstrap',file:'transition.js')}'></script>
<script src='${resource(dir:'js/angular/resources/plugins',file:'bootbox.min.js')}'></script>
<script src='${resource(dir:'js/angular/resources',file:'application.js')}'></script>
<script src='${resource(dir:'js/ma/resource',file:'pnotify.js')}'></script>
<script src='${resource(dir:'js/ma/resource',file:'angular-pnotify.js')}'></script>
<script src='${resource(dir:'js/ma/resource',file:'pnotify.buttons.js')}'></script>
<script src='${resource(dir:'js/ma/resource',file:'pnotify.confirm.js')}'></script>
<!--ToolTip Information -->
<script src="${resource(dir:'js/angular/directives',file:'angular-tooltips.js')}"></script>
<link rel='stylesheet' href='${resource(dir:'css/angular',file:'angular-tooltips.css')}'>
<script src='${resource(dir:'js/angular/resources/plugins/chosen',file:'chosen.jquery.min.js')}'></script>
<script src='${resource(dir:'js/angular/resources/plugins/chosen',file:'chosen.order.jquery.min.js')}'></script>
<!--feedBack form css-->
<script src='${resource(dir:'js/angular/resources/plugins',file:'jquery.feedback_me.js')}'></script>
<script src='${resource(dir:'js/angular/resources/plugins',file:'jquery.timepicker.min.js')}'></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
<script src='${resource(dir:'js/angular/resources/plugins',file:'moment.min.js')}'></script>
<script src='${resource(dir:'js/angular/resources',file:'timezones.full.js')}'></script>
<script src='${resource(dir:'js/angular/resources/bootstrap',file:'modal.js')}'></script>
<!--Route Manager-->
<script src="${resource(dir:'js/chatBot/routes',file:'routeManager.js')}"></script>
<!--Services -->
<script src="${resource(dir:'js/chatBot/services',file:'dashboardService.js')}"></script>
<!--Directives-->
<script src="${resource(dir:'js/chatBot/directives',file:'custom.js')}"></script>
<script src="${resource(dir:'js/chatBot/directives',file:'chosen.js')}"></script>
<!--Filters-->
<script src="${resource(dir:'js/chatBot/filters',file:'custom.js')}"></script>
<script src="${resource(dir:'js/chatBot/controllers',file:'main.js')}"></script>
<script src="${resource(dir:'js/chatBot/controllers',file:'dashboardController.js')}"></script>
<script src="${resource(dir:'js/chatBot/controllers',file:'userController.js')}"></script>
<script src="${resource(dir:'js/chatBot/controllers',file:'userDetailsController.js')}"></script>
<script src="${resource(dir:'js/chatBot/controllers',file:'insightsController.js')}"></script>
<script src="${resource(dir:'js/chatBot/controllers',file:'manageIntentController.js')}"></script>
<script src="${resource(dir:'js/chatBot/controllers',file:'addIntentController.js')}"></script>
<script src="${resource(dir:'js/chatBot/controllers',file:'editIntentController.js')}"></script>
<script src="${resource(dir:'js/chatBot/controllers',file:'settingsController.js')}"></script>
<script src="${resource(dir:'js/chatBot/controllers',file:'dialog.js')}"></script>
<script src="${resource(dir:'js/chatBot/controllers',file:'unknownController.js')}"></script>
<script src="${resource(dir:'js/chatBot/controllers',file:'manageEntitiesController.js')}"></script>
<script src="${resource(dir:'js/chatBot/controllers',file:'addEntityController.js')}"></script>
<script src="${resource(dir:'js/chatBot/controllers',file:'editEntityController.js')}"></script>
<!-- date range picker js-->
<script src='${resource(dir:'js/angular/resources/plugins',file:'daterangepicker.js')}'></script>
<script src='${resource(dir:'js/angular/resources/plugins',file:'moment.min.js')}'></script>

<!--     high charts js-->
<script src="${resource(dir:'js/eventAndSession/highCharts',file:'highcharts.js')}"></script>
<script src="${resource(dir:'js/eventAndSession/highCharts',file:'highcharts-more.js')}"></script>
<script src="${resource(dir:'js/eventAndSession/highCharts',file:'solid-gauge.js')}"></script>
<script src="${resource(dir:'js/eventAndSession/highCharts',file:'funnel.js')}"></script>

<script src="${resource(dir:'js/eventAndSession/highCharts',file:'exporting.js?version=1')}"></script>
<script src="${resource(dir:'js/eventAndSession/highCharts',file:'data.js?version=1')}"></script>
<script src="${resource(dir:'js/eventAndSession',file:'angular-toggle-switch.min.js')}"></script>
<script src="${resource(dir:'js',file:'goSamples.js')}"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.6/socket.io.min.js"></script>
<script src="https://rawgit.com/rzajac/angularjs-slider/master/dist/rzslider.js"></script>
</body>
</html>