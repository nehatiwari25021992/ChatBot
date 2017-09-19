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
          <li>
            <select  chosen
                     class="form-control chosen-select" 
                     style="width:250px"
                     data-placeholder="Choose an app..."
                     ng-model="app"
                     ng-options="app.name for app in appList track by app.id"
                     ng-change = "changeApp()"
                     >
            </select>
          </li>
        </ol>
        <div ng-view></div>

      </div>

    </div>


  </body>
</html>
