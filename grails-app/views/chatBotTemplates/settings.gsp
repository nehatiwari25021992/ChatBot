<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->
<style>
  #app42AppSettingsWidget .form-horizontal .form-group {
    margin: 15px;
  }
</style>

<div class="widget widget-blue" id="app42AppSettingsWidget">
  <div class="widget-title">
    <div class="widget-controls">
      <a href="javascript:;" class="widget-control widget-control-full-screen" data-toggle="tooltip" data-placement="top" title="" data-original-title="Full Screen"><i class="fa fa-expand"></i></a> 
      <a href="javascript:;" class="widget-control widget-control-full-screen widget-control-show-when-full" data-toggle="tooltip" data-placement="left" title="" data-original-title="Exit Full Screen"><i class="fa fa-expand"></i></a> <a href="javascript:;" class="widget-control widget-control-refresh" data-toggle="tooltip" data-placement="top" title="" ng-click="refreshFileStorageWidget()" data-original-title="Refresh"><i class="fa fa-refresh"></i></a> </div>
    <h3>App Settings</h3>
  </div>
  <div class="widget-content">
    <div class="table-responsive">
      <div role="grid" class="dataTables_wrapper form-inline" id="DataTables_Table_0_wrapper">
        <div class="page-profile">
          <div>
            <div class="alert alert-info alert-dismissable"
                 id="appKeysSuccessNotifications" style="display: none;"></div>
            <div class="alert alert-danger alert-dismissable"
                 id="appKeysErrorNotifications" style="display: none;"></div>
            <form class="form-horizontal ng-pristine ng-valid" role="form" action="">

              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group trSep" >
                    <label class="col-md-3 control-label" style="text-align:right">Algorithm :</label>
                    <div class="col-md-9">
                      <select chosen
                              ng-model="selectedAlgoritm" data-placeholder="Select Algorithm"
                              ng-options="algo.name for algo in algoList track by algo.name" 
                              aria-controls="DataTables_Table_0"
                              class="form-control chosen-select" style="width: 250px;">
                        <option value=""></option>
                      </select>                  
                    </div>
                  </div>

                </div>

                <div class="col-sm-12">
                  <div class="form-group trSep" >
                    <label class="col-md-3 control-label" style="text-align:right"> Threshold :</label>
                    <rzslider  class="col-md-9" rz-slider-model="slider.value"
                               rz-slider-options="slider.options"></rzslider>                
                  </div>

                </div>
                <div class="col-sm-12">
                  <div class="form-group trSep" >
                    <label class="col-md-3 control-label" style="text-align:right">Language :</label>
                    <div class="col-md-9">
                      <select chosen
                              ng-model="selectedLanguage" data-placeholder="Select Language"
                              ng-options="algo.name for algo in langList track by algo.name" 
                              aria-controls="DataTables_Table_0"
                              class="form-control chosen-select" style="width: 250px;">
                        <option value=""></option>
                      </select>                  
                    </div>
                  </div>
                </div>

                <div class="col-sm-12">
                  <div class="form-group trSep" >
                    <label class="col-md-3 control-label" style="text-align:right">Welcome Message :</label>
                    <div class="col-md-9">
                      <textarea class="input form-control" placeholder="Enter Welcome Message"  ng-model="welcomeMessage" type="text" rows="1" cols="300"></textarea>

                    </div>
                  </div>
                </div>

                <div class="col-sm-12">
                  <div class="form-group trSep" >
                    <label class="col-md-3 control-label" style="text-align:right">Default Message :</label>
                    <div class="col-md-9">
                      <textarea class="input form-control" placeholder="Enter Default Message"  ng-model="defaultMessage" type="text" rows="1" cols="300"></textarea>

                    </div>
                  </div>
                </div>

                <div class="actionBtnWrapper">
                  <div class="col-sm-2 actionBtn"> 
                    <a href="javascript:;" id="reset1" ng-click="updateAppSetings()"
                       class="btn btn-default  btn-sm">Update</a> </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

