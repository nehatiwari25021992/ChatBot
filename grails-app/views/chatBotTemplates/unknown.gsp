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
                    class="btn btn-default btn btn-default-blue btn-sm">&nbsp;New</a>
                <a  ng-click="matchToExciting(user)"
                    class="btn btn-default btn btn-default-blue btn-sm">&nbsp;Exciting</a>
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

<div aria-hidden="true" aria-labelledby="profileExportEmailFormLabel" role="dialog" tabindex="-1" id="matchIntentForm" data-backdrop="static" data-keyboard="false" class="modal fade" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="widget widget-blue" id="matchIntent">
        <div class="widget-title">
          <div class="widget-controls">
            <a data-original-title="Remove" title="" data-placement="top" data-toggle="tooltip" class="widget-control widget-control-remove" href="javascript:;" data-dismiss="modal"><i class="fa fa-times-circle"></i></a>
          </div>
          <h3>Match to Exciting</h3>
        </div>
        <div class="widget-content">
          <div class="modal-body">
            <form class="form-horizontal customF" role="form" action="">
              <div class="form-group">

              </div>
              <div class="form-group">
                <label class="col-md-3 control-label" style="text-align:right">Intent :</label>
                <div class="col-md-6">
                  <div >
                    <select chosen ng-model="matchedIntent"
                            data-placeholder="Select Intent"
                            ng-options="color.name for color in intentList"
                            style="width: 220px;" size="1"
                            aria-controls="DataTables_Table_0"
                            class="form-control chosen-select">
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <button class="btn btn-primary" type="button" ng-click="matchItToIntent()">Submit</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>