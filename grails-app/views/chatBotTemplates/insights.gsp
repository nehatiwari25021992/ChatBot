
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
        <h3>Activity</h3>
      </div>

      <div class="widget-content left fs">
        <div class="row">
          <div class="col-md-12">
            <div class="auRow">
              <div class="tr">
                <div class="titleChat">Users / Chat / Chat steps Activity</div>
              </div>
              <div class="activeSession" style="height: 355px;">
                <div id="activityGraph" style="min-width: 310px; height: 286px; margin: 40px auto!important; display:none"></div>
                <div class="graphBox" id="noactivityGraph"><span id="noDataText">No Data</span> </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="auRow">
              <div class="tr">
                <div class="titleChat">Users Activity</div>
              </div>
              <div class="activeSession" style="height: 355px;">
                <div id="usersActivity" style="min-width: 310px; height: 286px; margin: 40px auto!important; display:none"></div>
                <div class="graphBox" id="nousersActivity"><span id="noDataText">No Data</span> </div>

              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="auRow">
              <div class="tr">
                <div class="titleChat">Chat Activity</div>
              </div>
              <div class="activeSession" style="height: 355px;">
                <div id="conversationActivity" style="min-width: 310px; height: 286px; margin: 40px auto!important; display:none"></div>
                <div class="graphBox" id="noconversationActivity"><span id="noDataText">No Data</span> </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="auRow">
              <div class="tr">
                <div class="titleChat">Average Chat Steps per User</div>
              </div>
              <div class="activeSession" style="height: 355px;">
                <div id="avgCnvSt" style="min-width: 310px; height: 286px; margin: 40px auto!important; display:none"></div>
                <div class="graphBox" id="noavgCnvSt"><span id="noDataText">No Data</span> </div>

              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="auRow">
              <div class="tr">
                <div class="titleChat">Average Chat per User</div>
              </div>
              <div class="activeSession" style="height: 355px;">
                <div id="avgCnv" style="min-width: 310px; height: 286px; margin: 40px auto!important; display:none"></div>
                <div class="graphBox" id="noavgCnv"><span id="noDataText">No Data</span> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

