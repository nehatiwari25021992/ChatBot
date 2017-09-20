<div class="widget widget-blue" id="unknownWidget">
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
         ng-click="refreshUnknowWidget()" data-original-title="Refresh"><i
          class="fa fa-refresh"></i></a>
    </div>
    <h3>Unknown</h3>
  </div>
  <div class="widget-content">
    <div class="alert alert-info alert-dismissable"
         id="pushCampaignSuccess" style="display: none;"></div>
    <div class="alert alert-danger alert-dismissable"
         id="pushCampaignError" style="display: none;"></div>
    <div class="table-responsive">
      <div role="grid" class="dataTables_wrapper form-inline"
           id="DataTables_Table_0_wrapper">
<!--        <div class="row">
          <div class="col-sm-12 mrbt10">
            <div class="pull-right">
              <button class="btn btn-default btn btn-default-blue btn-sm"
                      type="button" ng-click="openCreateNewPushCampaign()">
                <i class="fa fa-plus"></i>Advance Search
              </button>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>-->
        <div class="row mrtp15"></div>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th style="width:15%;">Name</th>
              <th style="width:10%;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="user in unknowIntent" >
              <td valign="top" class="wbAll">{{user.name}}</td>
              <td valign="top" id="btn_plus" class="">          
                <a  ng-click="gotoAddIntent(user)"
                    class="btn btn-default btn btn-default-blue btn-sm">&nbsp;Add</a>
              </td>
            </tr>
          </tbody>
          <tbody ng-show="unknowIntent.length =='0'">
            <tr>
              <td colspan="7" align="center"><div class="noRecords">No
                  Unknown Phrase found.</div></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row" ng-show="unknowIntent.length !='0'">
        <div class="col-sm-12">
          <div class="dataTables_paginate paging_bootstrap">
            <div class="moreResult" ng-show="hasMore == true" ng-click="loadMore()"  ><i class="fa fa-refresh"></i><span>Load More</span></div>

          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</div>