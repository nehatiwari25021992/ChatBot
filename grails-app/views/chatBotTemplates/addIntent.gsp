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



<div class="widget widget-blue campaignPage" id="addIntentWidget">
  <div class="widget-title">
    <div class="widget-controls"> <a href="javascript:;" class="widget-control widget-control-full-screen" data-toggle="tooltip" data-placement="top" title="" data-original-title="Full Screen"><i class="fa fa-expand"></i></a> <a href="javascript:;" class="widget-control widget-control-full-screen widget-control-show-when-full" data-toggle="tooltip" data-placement="left" title="" data-original-title="Exit Full Screen"><i class="fa fa-expand"></i></a> <a href="javascript:;" class="widget-control widget-control-refresh" data-toggle="tooltip" data-placement="top" title="" ng-click="refreshCreatePushCampaign()" data-original-title="Refresh"><i class="fa fa-refresh"></i></a> </div>
    <h3>Add Intent</h3>
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
          <textarea class="input form-control" placeholder="Enter Name"  ng-model="intentName" type="text" rows="1" cols="30"></textarea>
        </div>
        <div class="intentRowB">
          <div class="UXrowInput"   ng-class="{'has-warning has-iconed' : isuserExp != 'default'}" >
            <textarea class="input" placeholder="Add user expression" type="text" rows="7" cols="30" ng-enter="addUserSays()" ng-model="userExp" maxlength="50"></textarea>
            <div class="uxTitle">User Expressions</div>
            <p class="help-block errorTxt"
               ng-if="isuserExp == 'blank'">Expression
              required.</p>
            <p class="help-block errorTxt"
               ng-if="isuserExp == 'invalid'">Expression with same name  already exists.</p>
          </div>
          <div class="UXrowData bgA">
            <div class="UXrowInner" ng-repeat="say in userExpList">
              <input type="text" class="input" readonly="" value="{{say}}">
              <a href="javascript:;" ng-click="removeSay(say)" class="delBtn"><i class="fa fa-trash-o"></i></a>
            </div>	
          </div>
        </div>
      </div>
      <div class="intentWrapper">
        <div class="intentRow">
          <div class="intlabel">Actions</div>
          <textarea class="input form-control"   placeholder="Action"  ng-model="action"  stype="text" rows="1" cols="30"></textarea>
        </div>
        <div class="intentRowB">
          <div class="UXrowInput"  ng-class="{'has-warning has-iconed' : isresposne != 'default'}" >
            <textarea class="input" placeholder="Add response" ng-enter="addResponse()" ng-model="resposne" type="text" rows="7" cols="30"></textarea>
            <div class="uxTitle">Response</div>
            <p class="help-block errorTxt"
               ng-if="isresposne == 'blank'">Response
              required.</p>
            <p class="help-block errorTxt"
               ng-if="isresposne == 'invalid'">Response with same name already exists.</p>
          </div>
          <div class="UXrowData bgB" >
            <div class="UXrowInner"  ng-repeat="r in resposneList">
              <input type="text" class="input" readonly="" value="{{r}}">
              <a href="javascript:;" ng-click="removeResponse(r)" class="delBtn"><i class="fa fa-trash-o"></i></a>
            </div>	
          </div>
        </div>
      </div>

      <div class="buttonStrip">
        <button class="btn btn-default" type="button" ng-click="saveIntent()">Save</button>

      </div>
  </div>
</div>