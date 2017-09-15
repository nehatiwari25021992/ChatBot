<style>
  .ui-slider .ui-slider-handle::before { content: none!important; }
  .ui-slider-horizontal { height: 18px !important; }
  .ui-slider { border-radius: 6px !important; }
  .scrollbar { overflow: auto; max-height: 210px; padding: 0; border: 1px solid #b7b7b7; width:185px; outline: none;  overflow: hidden; background-color: #fff;  border: 1px solid #3997d5; margin 0 auto !important: padding:0px !important; background-color: #fbfbfb;}
  .propTextbox { border-radius: 2px; margin-right: 10px; background-color: #ffffff; border: 1px solid #c1bdb8; border-radius: 4px; color: #555555; font-size: 14px; height: 30px; padding: 6px 8px; vertical-align: middle; }
  .groupInput1 { padding-bottom: 6px;}
  div.helpicon span:before {
    border-left: 10px solid transparent!important;
    border-bottom: 10px solid #ccc!important;
    border-right: 10px solid transparent!important;
    border-right: none;
    content: "";
    position: absolute;
    left: 5px !important;
    top: -38% !important;
    box-shadow: inset 0px -2px 2px 0px #000;
  }
  div.helpicon span {
    z-index: 10;
    display: none;
    padding: 10px;
    top: 25px !important;
    left: -10px !important;
    width: 250px;
    line-height: 16px;
    position: absolute;
  }
</style> 



<div class="widget widget-blue campaignPage" id="editIntentWidget">
  <div class="widget-title">
    <div class="widget-controls"> <a href="javascript:;" class="widget-control widget-control-full-screen" data-toggle="tooltip" data-placement="top" title="" data-original-title="Full Screen"><i class="fa fa-expand"></i></a> <a href="javascript:;" class="widget-control widget-control-full-screen widget-control-show-when-full" data-toggle="tooltip" data-placement="left" title="" data-original-title="Exit Full Screen"><i class="fa fa-expand"></i></a> <a href="javascript:;" class="widget-control widget-control-refresh" data-toggle="tooltip" data-placement="top" title="" ng-click="refreshCreatePushCampaign()" data-original-title="Refresh"><i class="fa fa-refresh"></i></a> </div>
    <h3>Edit Intent</h3>
  </div>
  <div class="widget-content left fs wcmBot">
    <div class="clearfix"></div>
    <div class="alert alert-info alert-dismissable"
         id="createPushCampSuccess" style="display: none;"></div>
    <div class="alert alert-danger alert-dismissable"
         id="createSegmentError" style="display: none;"></div>

    <form role="form" class="">
      <div class="campaignRow">
        <h4 class="widget-header">Intent</h4>
        <div class="row">
          <div class="formTr">
            <div class="form-group trSep" >
              <div class="col-md-9">
                <input type="text" placeholder="Intent name" ng-model="intentName" class="form-control" maxlength="50">
              </div>

            </div>
          </div>
<!--          <div class="formTr">
            <div class="form-group trSep" >
                            <div class="col-md-3">
                              <label>Description</label>
                            </div>
              <div class="col-md-9">
                <input type="text" placeholder="Intent description" ng-model="description" class="form-control" maxlength="50">
              </div>
            </div>
          </div>-->
        </div>
      </div>

      <div class="campaignRow">
        <h4 class="widget-header">User Expression</h4>
        <div class="row">
          <div class="formTr">
            <div class="form-group trSep"  ng-class="{'has-warning has-iconed' : isuserExp != 'default'}" >
              <div class="col-md-9">
                <input type="text"  ng-enter="addUserSays()" placeholder="Add user expression " ng-model="userExp" class="form-control" maxlength="50">
                <p class="help-block errorTxt"
                   ng-if="isuserExp == 'blank'">Expression
                  required.</p>
                <p class="help-block errorTxt"
                   ng-if="isuserExp == 'invalid'">Expression with same name  already exists.</p>
              </div>
              <div class="col-md-3">
<!--                <button class="btn btn-primary btn-sm" ng-click="addUserSays()">Add</button>-->
              </div>
            </div>
          </div>
          <div class="formTr" ng-show="userExpList.length > 0">
            <div class="col-md-9">
              <div class="table-responsive">
                <table class="table table-bordered table-hover table-striped">
<!--                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Expression</th>
                      <th>Action</th>
                    </tr>
                  </thead>-->
                  <tbody>
                    <tr ng-repeat="say in userExpList">
                      <td ng-if="say.isDelete == false">{{say.name}}
                      <a href="javascript:;" ng-click="removeSay(say)" class="btn  btn-xs remove-tr pull-right"><i class="fa fa-trash-o"></i></a></td>
                    </tr>

                  </tbody>
                </table>
              </div>

            </div>

          </div>
        </div>
      </div>

      <div class="campaignRow">
        <h4 class="widget-header">Actions</h4>
        <div class="row">
          <div class="formTr">
            <div class="form-group trSep"   ng-class="{'has-warning has-iconed' : isactions != 'default'}"  >
              <div class="col-md-9">
                <input type="text" ng-enter="addAction()" placeholder="Enter action Name" ng-model="action.name" class="form-control" maxlength="50">
                <p class="help-block errorTxt"
                   ng-if="isactions == 'blank'">Action
                  required.</p>
                <p class="help-block errorTxt"
                   ng-if="isactions == 'invalid'">Action with same name already exists.</p>
              </div>
              <div class="col-md-3">
<!--                <button class="btn btn-primary btn-sm" ng-click="addAction()">Add</button>-->
              </div>
            </div>
          </div>
<!--          <div class="formTr" ng-show="actions.length > 0">

            <div class="col-md-9">
              <div class="table-responsive">
                <table class="table table-bordered table-hover table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Action Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr ng-repeat="a in actions">
                      <td  ng-if="a.isDelete == false">{{a.name}}
                        <a href="javascript:;" ng-click="removeAction(a)" class="btn  btn-xs remove-tr pull-right"><i class="fa fa-trash-o"></i></a></td>
                    </tr>

                  </tbody>
                </table>
              </div>

            </div>

          </div>-->
        </div>
      </div>

      <div class="campaignRow">
        <h4 class="widget-header">Response</h4>
        <div class="row">
          <div class="formTr">
            <div class="form-group trSep"  ng-class="{'has-warning has-iconed' : isresposne != 'default'}"  >
              <div class="col-md-9">
                <input type="text" ng-enter="addResponse()" placeholder="Add response " ng-model="resposne" class="form-control" maxlength="50">
                <p class="help-block errorTxt"
                   ng-if="isresposne == 'blank'">Response
                  required.</p>
                <p class="help-block errorTxt"
                   ng-if="isresposne == 'invalid'">Response with same name already exists.</p>
              </div>
              <div class="col-md-3">
<!--                <button class="btn btn-primary btn-sm" ng-click="addResponse()">Add</button>-->
              </div>
            </div>
          </div>
          <div class="formTr" ng-show="resposneList.length > 0">
            <div class="col-md-9">
              <div class="table-responsive">
                <table class="table table-bordered table-hover table-striped">
<!--                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Response</th>
                      <th>Action</th>
                    </tr>
                  </thead>-->
                  <tbody>
                    <tr ng-repeat="r in resposneList">
                      <td ng-if="r.isDelete == false">{{r.name}}
                        <a href="javascript:;" ng-click="removeResponse(r)" class="btn  btn-xs remove-tr pull-right"><i class="fa fa-trash-o"></i></a></td>
                    </tr>

                  </tbody>
                </table>
              </div>

            </div>

          </div>
        </div>
      </div>
    </form>
  </div>
  <div class="buttonStrip">
    <button class="btn btn-default" type="button" ng-click="updateIntent()">Update</button>

  </div>