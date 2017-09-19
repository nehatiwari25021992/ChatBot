<style>
.swgFrame{background-color: #f9f9f9; margin: 2% 0 0 2%;border: 1px dashed #cfcfcf;}
</style>
<div class="row dbWrapper">
  <div class="col-md-12">

    <div class="widget widget-blue" id="activityWidget">
      <div class="widget-title">
        <div class="widget-controls">
          <a
            href="javascript:;"
            class="widget-control widget-control-full-screen widget-control-show-when-full"
            data-toggle="tooltip" data-placement="left" title=""
            data-original-title="Exit Full Screen"><i class="fa fa-expand"></i></a>
          <a href="javascript:;" class="widget-control widget-control-refresh"
             data-toggle="tooltip" data-placement="top" title=""
             data-original-title="Refresh" ng-click="refreshDashboard()"><i
              class="fa fa-refresh"></i></a>
        </div>
        <h3>Dialogs</h3>
      </div>

      <div class="widget-content left fs">
        <div class="row" >
          <div class="col-lg-12 col-md-12 col-sm-12">
            <iframe class="swgFrame" width="96%" height="490px" name="dialogFrame" ng-src="{{specsUrl}}" ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>