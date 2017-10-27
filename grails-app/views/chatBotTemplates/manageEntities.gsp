<style>
  .ui-pnotify.custom .ui-pnotify-container {
    background-color: #404040 !important;
    background-image: none !important;
    border: none !important;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }
  .ui-pnotify.custom .ui-pnotify-title, .ui-pnotify.custom .ui-pnotify-text {
    font-family: Arial, Helvetica, sans-serif !important;
    text-shadow: 2px 2px 3px black !important;
    font-size: 10pt !important;
    color: #FFF !important;
    padding-left: 50px !important;
    line-height: 1 !important;
    text-rendering: geometricPrecision !important;
  }
  .ui-pnotify.custom .ui-pnotify-title {
    font-weight: bold;
  }
  .ui-pnotify.custom .ui-pnotify-icon {
    float: left;
  }
  .ui-pnotify.custom .fa {
    margin: 3px;
    width: 33px;
    height: 33px;
    font-size: 33px;
    color: #FF0;
  }
</style>
<div class="widget widget-blue" id="manageEntityWidget">
  <div class="widget-title">
    <div class="widget-controls">
      <a href="javascript:;"
         class="widget-control widget-control-full-screen"
         data-toggle="tooltip" data-placement="top" title=""
         data-original-title="Full Screen"><i class="fa fa-expand"></i></a> <a
         href="javascript:;"
         class="widget-control widget-control-full-screen widget-control-show-when-full"
         data-toggle="tooltip" data-placement="left" title=""
         data-original-title="Exit Full Screen"><i class="fa fa-expand"></i></a>
      <a href="javascript:;" class="widget-control widget-control-refresh"
         data-toggle="tooltip" data-placement="top" title=""
         ng-click="refreshManageWidget()" data-original-title="Refresh"><i
          class="fa fa-refresh"></i></a>
    </div>
    <h3>Manages</h3>
  </div>
  <div class="widget-content">
    <div class="alert alert-info alert-dismissable"
         id="pushCampaignSuccess" style="display: none;"></div>
    <div class="alert alert-danger alert-dismissable"
         id="pushCampaignError" style="display: none;"></div>
    <div class="table-responsive">
      <div role="grid" class="dataTables_wrapper form-inline"
           id="DataTables_Table_0_wrapper">
        <div class="row">
          <div class="col-sm-12 mrbt10">
            <div class="pull-right">
              <button class="btn btn-default btn btn-default-blue btn-sm"
                      type="button" ng-click="goToAddEntity()">
                <i class="fa fa-plus"></i>Add New
              </button>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="row mrtp15"></div>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th >Entity</th>
<!--              <th >Description</th>-->
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="intent in entityList | limitTo: limit" >
              <td valign="top" class="wbAll">{{intent.name}}</td>
<!--              <td valign="top" class="wbAll">{{intent.description}}</td>-->

              <td valign="top" id="btn_plus" class="">          
                <a ng-click="editEntity(intent)" class="btn btn-default btn btn-default-blue btn-sm"><i class="fa fa-pencil"></i>&nbsp;Edit</a>
              </td>
            </tr>
          </tbody>
          <tbody ng-show="entityList.length =='0'">
            <tr>
              <td colspan="4" align="center"><div class="noRecords">No
                  Entity(s) found.</div></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row" ng-show="entityList.length !='0'">
        <div class="dataTables_paginate paging_bootstrap" ng-show="hasMoreData">

          <div class="moreResult" ng-click="loadMore()"  ><i class="fa fa-refresh"></i><span>Load More</span></div>

        </div>
      </div>
    </div>
  </div>
</div>