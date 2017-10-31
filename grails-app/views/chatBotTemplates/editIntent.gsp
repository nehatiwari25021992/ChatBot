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

  .selectElBorder{
    border-left: 3px solid #37a0e1 !important;
  }
  
  #editIntentWidget textarea {
    resize: none;
  }
</style> 



<div class="widget widget-blue campaignPage" id="editIntentWidget">
  <div class="widget-title">
    <div class="widget-controls"> <a href="javascript:;" class="widget-control widget-control-full-screen" data-toggle="tooltip" data-placement="top" title="" data-original-title="Full Screen"><i class="fa fa-expand"></i></a> <a href="javascript:;" class="widget-control widget-control-full-screen widget-control-show-when-full" data-toggle="tooltip" data-placement="left" title="" data-original-title="Exit Full Screen"><i class="fa fa-expand"></i></a> <a href="javascript:;" class="widget-control widget-control-refresh" data-toggle="tooltip" data-placement="top" title="" ng-click="refreshEditWidget()" data-original-title="Refresh"><i class="fa fa-refresh"></i></a> </div>
    <h3>Edit Intent</h3>
  </div>
  <div class="widget-content left fs wcmBot">
    <div class="clearfix"></div>
    <div class="alert alert-info alert-dismissable"
         id="createPushCampSuccess" style="display: none;"></div>
    <div class="alert alert-danger alert-dismissable"
         id="createSegmentError" style="display: none;"></div>

    <form role="form" class="">

      <div class="intentWrapper">
        <div class="intentRow">
          <div class="intlabel">Intent</div>
          <textarea class="input form-control"  ng-model="intentName" type="text" rows="1" cols="30"></textarea>
        </div>
        <div class="intentRow"  >
          <div class="intlabel">Input Context</div>
          <textarea class="input form-control" placeholder="Enter Input Context"  ng-model="inputContext" type="text" rows="1" cols="30"></textarea>
        </div>
        <div class="intentRow"   >
          <div class="intlabel">Output Context</div>
          <textarea class="input form-control" placeholder="Enter Output Context"  ng-model="outputContext" type="text" rows="1" cols="30"></textarea>
        </div>

        <div class="intentRowB">
          <div class="UXrowInput"   ng-class="{'has-warning has-iconed' : isuserExp != 'default'}" >
            <textarea class="input" placeholder="Add user expression" type="text" rows="4" cols="30" ng-enter="addUserSays()" ng-model="userExp" maxlength="50"></textarea>
            <div class="uxTitle">User Expressions</div>
            <p class="help-block errorTxt"
               ng-if="isuserExp == 'blank'">Expression
              required.</p>
            <p class="help-block errorTxt"
               ng-if="isuserExp == 'invalid'">Expression with same name  already exists.</p>
          </div>
          <div class="UXrowData bgA">
            <div class="UXrowInner" ng-repeat="say in userExpList">
              <input  ng-show="!say.isDelete" type="text" class="input" readonly="" value="{{say.name}}">
              <a   ng-show="!say.isDelete" href="javascript:;" ng-click="removeSay(say)" class="delBtn"><i class="fa fa-trash-o"></i></a>
<!--              <table class="content-table intent-parameters-table">
                <thead>
                  <tr>
                    <th>Parameter name</th>
                    <th>Entity</th>
                    <th>Resolved value</th>
                    <th class="param-actions"></th>
                  </tr>
                </thead>
                <tbody>
                   ngRepeat: param in vm.autoParams track by $index <tr class="autoparams template-editor-params-tr ng-scope" ng-repeat="param in vm.autoParams track by $index">
                    <td>
                      <input class="user-says-alias-editor template-editor-param-alias-editor ng-pristine ng-valid ng-not-empty ng-valid-maxlength ng-touched" ng-model="param.alias" ng-change="vm.changeParamAlias(param, 'hotel', $event)" tabindex="-1" ng-keydown="vm.paramKeyDownCb($event)" maxlength="30" ng-disabled="vm.isAgentReadOnly" aria-invalid="false" style="">
                    </td>
                    <td class="template-editor-param-meta-holder-wrapper">
                      <span style="background-color: #fffda6" class="meta-holder template-editor-param-meta-holder ng-binding" ng-bind="param.meta" ng-click="vm.startSelectParameter(param, $event)" tabindex="-1" role="button">@hotel</span>
                    </td>
                    <td class="template-editor-param-resolved-value">
                      <span tabindex="-1" class="ng-binding">rooms</span>
                    </td>
                    <td class="param-actions">
                      <button class="btn-icon" ng-click="vm.removeParam(param, $index)" type="button" tabindex="-1" ng-disabled="vm.isAgentReadOnly">
                        <span class="flaticon stroke x-1"></span>
                      </button>
                    </td>
                  </tr> end ngRepeat: param in vm.autoParams track by $index 
                </tbody>
              </table>-->

            </div>	
          </div>
        </div>
      </div>

      <div class="intentWrapper">
        <div class="intentRow">
          <div class="intlabel">Actions</div>
          <textarea class="input form-control" placeholder="Action"  ng-model="action"  stype="text" rows="1" cols="30"></textarea>
        </div>
        <div class="intentRowB">
          <div class="UXrowInput"  ng-class="{'has-warning has-iconed' : isresposne != 'default'}" >
            <textarea class="input" placeholder="Add response" ng-enter="addResponse()" ng-model="resposne" type="text" rows="4" cols="30"></textarea>
            <div class="uxTitle">Response</div>
            <p class="help-block errorTxt"
               ng-if="isresposne == 'blank'">Response
              required.</p>
            <p class="help-block errorTxt"
               ng-if="isresposne == 'invalid'">Response with same name already exists.</p>
          </div>
          <div class="UXrowData bgB" >
            <div class="UXrowInner"  ng-repeat="r in resposneList| reverse" ng-class="{'selectElBorder' : say.show}">
              <input ng-show="!r.isDelete" type="text" class="input" readonly="" value="{{r.name}}">
              <a ng-show="!r.isDelete" href="javascript:;" ng-click="removeResponse(r)" class="delBtn"><i class="fa fa-trash-o"></i></a>
              <table ng-show="say.entity.length > 0 && say.show" style="width: 100%;" >
                <thead>
                  <tr>
                    <th>Parameter name</th>
                    <th>Entity</th>
                    <th >Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr  ng-repeat="param in say.entity track by $index">
                    <td>
                      <span>{{param.parameter}}</span>
                    </td>
                    <td >
                      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav navbar-left">
                          <li class="dropdown">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">{{param.entityName}}</a>
                            <ul class="dropdown-menu" style=" height: 200px;overflow-y: auto;">
                              <li>
                                <input type="text" ng-model="searchEntity" placeholder="Filter"/>
                              </li>
                              <li ng-repeat="en in entityList">
                                <a ng-click="changeEntity(en,param)" href="javascript:;">{{en.name}}</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <span><i class="fa fa-trash-o"></i></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>	
          </div>
        </div>
      </div>
    </form>
    <div class="buttonStrip">
      <button class="btn btn-default" type="button" ng-click="updateIntent()">Update</button>
    </div>
  </div>  
</div>