<div class="page-header">
  <div class="header-links hidden-xs">


    <div class="dropdown"> <a href="javascript:;" class="header-link clearfix" data-toggle="dropdown">
        <div class="user-name-w"> <span class="username">Resources</span> <i class="fa fa-caret-down"></i> </div>
      </a>
      <ul class="dropdown-menu dropdown-inbar">
        <li><a href="http://api.shephertz.com/tutorial/" target="_blank">Tutorial</a></li>
        <li><a href="http://api.shephertz.com/app42-dev.php" target="_blank">Documentation</a></li>
    <!--       <li><a href="http://api.shephertz.com/cloudapidocs/download.php" target="_blank">Download SDKs</a></li>-->
        <li><a href="http://forum.shephertz.com/" target="_blank">Forum</a></li>
        <li><a href="http://api.shephertz.com/contact_us.php" target="_blank">Contact Us</a></li>
      </ul>
    </div>



    <div class="dropdown"> <a href="javascript:;" class="header-link clearfix" data-toggle="dropdown">
        <div class="avatar"> 
          <img ng-src="${request.getContextPath()}/images/assets/avatar.png" alt="">

        </div>
        <div class="user-name-w"> <span class="username login_width" id = "appHQLoggedInUser">${userId}</span> <i class="fa fa-caret-down"></i> </div>
      </a>
      <ul class="userDD dropdown-menu dropdown-inbar">
        <g:if test="${source ==null}"><li><a href="javascript:;" ng-click="openChangeUserPasswordForm()" ><i class="fa fa-user" ></i> Change Password</a></li></g:if>
        <li><a href="javascript:;" ng-click="showKeys()"><i class="fa fa-key"></i>Application Keys</a></li>
        <li> <g:link controller="logout" action="index" ><i class="fa fa-power-off"></i> Logout</g:link> </li>
      </ul>
    </div>
  </div>
  <a class="logo" href="javascript:;"><img src="${resource(dir:'images/icons',file:'cloud_logo.png')}" alt=""></a> <a class="menu-toggler" href="javascript:;"><i class="fa fa-bars"></i></a>
  <div class="header-links" style="float: left!important;"> 

    <div> <a href="javascript:;" class="header-link cleasrfix mrrg0" data-toggle="dropdown">
        <div class="header-links header_title mr0" id="logo">App<span>HQ</span></div>
      </a>      
    </div>      
  </div>

  <div class="prodList">

    <div class="dropdown mrlt20"> <a href="javascript:;" class="header-link clearfix" data-toggle="dropdown">
        <div class="user-name-w"> <span class="username">App42 ChatBot</span><i class="fa fa-caret-down ddIcon"></i> </div>
      </a>
    </div>
  </div>
</div>