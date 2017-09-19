<div class="side">
  <div class="sidebar-wrapper">
    <ul id="chatbotNav" >
      <li  ng-class="{ active: isActive('/dashboard')}" >
        <a href="#/dashboard"  ng-click="openSubSideBar('dashboardSection')" data-toggle="tooltip" data-placement="right" title="" data-original-title="Dashboard">
          <img src="${resource(dir:'images/iconNewUI/maNewIcons',file:'dashboard.png')}" alt="">
        </a>
      </li>
      <li ng-class="{ active: isActive('/users') }">
        <a href="#/users" ng-click="openSubSideBar('userSection')" data-toggle="tooltip" data-placement="right" title="" data-original-title="Users">
          <img src="${resource(dir:'images/iconNewUI',file:'user.png')}" alt="">
        </a>
      </li>
      <li ng-class="{ active: isActive('/insights') }">
        <a href="#/insights" ng-click="openSubSideBar('insightsSection')" data-toggle="tooltip" data-placement="right" title="" data-original-title="Insights">
          <img src="${resource(dir:'images/iconNewUI/maNewIcons',file:'insights.png')}" alt="">
        </a>
      </li>

      <li ng-class="{ active: isActive('/manageIntent') }">
        <a href="#/manageIntent" ng-click="openSubSideBar('intentSection')" data-toggle="tooltip" data-placement="right" title="" data-original-title="Intent">
          <img src="${resource(dir:'images/ma',file:'intent_icon.png')}" alt="">
        </a>
      </li>  
      <li ng-class="{ active: isActive('/dialogs') }">
        <a href="#/dialogs" ng-click="openSubSideBar('dialogSection')" data-toggle="tooltip" data-placement="right" title="" data-original-title="Train">
          <img src="${resource(dir:'images/ma',file:'intent_icon.png')}" alt="">
        </a>
      </li>  

<!--      <li ng-class="{ active: isActive('/settings') }">
        <a href="#/settings"  ng-click="openSubSideBar('settingsSection')" data-toggle="tooltip" data-placement="right" title="" data-original-title="Settings">
          <img src="${resource(dir:'images/ma',file:'entities-icon.png')}" alt="">
        </a>
      </li>-->
    </ul>
  </div>

  <div class="sub-sidebar-wrapper" >
    <ul ng-show="dashboardSection">
      <li ng-class="{ current: isActive('/dashboard')}"><a  href="#/dashboard" ng-bind="sidebar.dashboard"> </a></li>
    </ul>
    <ul ng-show="userSection">
      <li ng-class="{ current: isActive('/users')}"><a  href="#/users" ng-bind="sidebar.users"></a></li>
    </ul>
    <ul ng-show="insightsSection">
      <li ng-class="{ current: isActive('/insights')}"><a  href="#/insights" ng-bind="sidebar.insights"></a></li>
    </ul>
    <ul ng-show="dialogSection">
      <li ng-class="{ current: isActive('/dialogs')}"><a  href="#/dialogs" ng-bind="sidebar.dialogs"></a></li>
    </ul>

    <ul ng-show="intentSection">
      <li ng-class="{ current: isActive('/manageIntent')}"><a  href="#/manageIntent" ng-bind="sidebar.manageIntent" ></a></li>
<!--      <li ><a active-link="current" href="#/addIntent/" ng-bind="sidebar.addIntent" ></a></li>
      <li ><a active-link="current" href="#/unknownIntent/" ng-bind="sidebar.unknownIntent" ></a></li>-->
    </ul>

    <ul ng-show="settingsSection">
      <li ng-class="{ current: isActive('/settings')}"><a  href="#/settings" ng-bind="sidebar.settings" ></a></li>
    </ul>
  </div>
</div>
