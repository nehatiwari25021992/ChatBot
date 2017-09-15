<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<html>
  <head>
    <meta charset="utf-8">
    <meta name="layout" content="chatbot" />
    <title>ChatBot</title>
  </head>
  <body>
    <div class="all-wrapper fixed-header left-menu">
      <g:render template="/headerChatbot"/>
      <g:render template="/leftNavMenuChatbot"/>
      <script type="text/javascript">
          var __httpRequestPath = '${request.getContextPath()}'
           var __userName = '${userId}'
      </script>
      <div class="main-content">
        <ol id="breadcrumbId" class="breadcrumb">   
          <g:if test="${userId == 'betaTest' || userId =='sachin25' || userId == 'sshukla480' || userId == 'ajaytest' || userId == 'neelam.singh@shephertz.com'}">
            <g:if test="${!isDemoAppUser}">
              <li class="pull-right" id="exploreDemoDataHandle">
                Demo Mode   <toggle-switch ng-model="demoDataToggle" ng-click="changeDemoDataToggleState()"> </toggle-switch>
              </li>
            </g:if>
          </g:if>



        </ol>
        <div ng-view></div>

      </div>

    </div>


  </body>
</html>
