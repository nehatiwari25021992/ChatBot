<style>
  #chatbotDashboardWidget .trendingEvents {
    width: 100%;
  }

  #chatbotDashboardWidget .auRow .tr .titleChat {
    float: left;
    width: 70%;
    /* padding: 0 0 0 30px; */
    text-align: left;
    font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #00988c;
    font-size: 20px;
    font-weight: normal;
    /* background-image: url(../../images/ma/dashboard/users.png); */
    background-repeat: no-repeat;
    background-position: left center;
  }

  #chatbotDashboardWidget .tEventsRow .lPanel {
    float: right;
    width: 16%;
    position: relative;
  }

  #chatbotDashboardWidget .trendingEvents .tEventsWrapper {
    float: left;
    width: 100%;
    height: 335px;
    display: table;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #cac9c9;
    border-radius: 3px;
    margin: 22px 0 0 0;
  }
</style>
<div class="row dbWrapper">
  <div class="col-md-12">

    <div class="widget widget-blue" id="chatbotDashboardWidget">
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
        <h3>Dashboard</h3>
      </div>

      <div class="widget-content left fs">        
        <div class="row blockRow">
          <div class="mrtp20">
            <div class="col-lg-3 col-md-3 col-sm-6 col1 pdltprj0">
              <section class="blockB">
                <div class="symbol">
                  <div class="symbbBb"><img src="../images/chatbot/total-msg.png" alt=""></div>
                </div>
                <div class="infoChat">
                  <font class="ng-binding">{{total_messages  | nrFormat}}</font>
                  <p>Total Messages</p>
                </div>
              </section> 
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 pdltprj0">
              <section class="blockB">
                <div class="symbol">
                  <div class="symbbBr"><img src="../images/chatbot/total-conversation.png" alt=""></div>
                </div>
                <div class="infoChat">
                  <font class="ng-binding">{{total_conversation  | nrFormat}}</font>
                  <p>Total Chats</p>
                </div>
              </section> 
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 pdltprj0">
              <section class="blockB">
                <div class="symbol">
                  <div class="symbbBg"><img src="../images/chatbot/avg-conv-per-user.png" alt=""></div>
                </div>
                <div class="infoChat">
                  <font class="ng-binding">{{average_conversation_per_user   | number:2}}</font>
                  <p>Avg. Chats Per User</p>
                </div>
              </section> 
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 pdltprj0">
              <section class="blockB">
                <div class="symbol">
                  <div class="symbbBp"><img src="../images/chatbot/avg-conv-steps-per-user.png" alt=""></div>
                </div>
                <div class="infoChat">
                  <font class="ng-binding">{{average_conversationSteps_per_user  | number:2}}</font>
                  <p>Avg. Chats Steps Per User</p>
                </div>
              </section> 
            </div>             
          </div>          
        </div>
        <div class="row blockRow">         
          <div class="mrtp20">    
            <div class="col-lg-3 col-md-3 col-sm-6 col1 pdltprj0">
              <section class="blockB">
                <div class="symbol">
                  <div class="symbbBp"><img src="../images/chatbot/total-user.png" alt=""></div>
                </div>
                <div class="infoChat">
                  <font class="ng-binding">{{total_user | nrFormat}}</font>
                  <p>Total User</p>
                </div>
              </section> 
            </div>              
            <div class="col-lg-3 col-md-3 col-sm-6 pdltprj0">
              <section class="blockB">
                <div class="symbol">
                  <div class="symbbBp"><img src="../images/chatbot/total-sent.png" alt=""></div>
                </div>
                <div class="infoChat">
                  <font class="ng-binding">{{total_sent  | nrFormat}}</font>
                  <p>Total Sent</p>
                </div>
              </section> 
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 pdltprj0">
              <section class="blockB">
                <div class="symbol">
                  <div class="symbbBp"><img src="../images/chatbot/total-rcvd.png" alt=""></div>
                </div>
                <div class="infoChat">
                  <font class="ng-binding">{{total_received  | nrFormat}}</font>
                  <p>Total Received</p>
                </div>
              </section> 
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 pdltprj0">
              <section class="blockB">
                <div class="symbol">
                  <div class="symbbBp"><img src="../images/chatbot/avg-session-lngth.png" alt=""></div>
                </div>
                <div class="infoChat">
                  <font class="ng-binding">{{average_session_length}}</font>
                  <p>Avg. Session Length</p>
                </div>
              </section> 
            </div> 
          </div>         
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="auRow trendingEvents">
              <div class="tr">
                <div class="titleChat">Most Common Phrases</div>
              </div>

              <div class="tEventsWrapper">
                <div class="tEventsRow" ng-if="commonPhases.length != 0" ng-repeat="commonPhase in commonPhases">
                  <div class="lPanel">
                    <div class="time">{{commonPhase.percentage  | number:2}}%
                      <span class="eventCount"></span>
                    </div>

                  </div>
                  <div class="rPanel"><font style="text-transform: capitalize;">{{commonPhase.phrases}}</font> 

                  </div>
                </div>
                <div class="notEvents" ng-if="trends.length == 0"> No phrases found </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="auRow trendingEvents">
              <div class="tr">
                <div class="titleChat">Most Active Hours</div>
              </div>
              <div class="activeSession" >
                <div id="activeHours" style="height: 333px; display:none"></div>
                <div class="graphBox" id="noActiveHours"><span id="noDataText">No Data</span> </div>

              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="auRow">
              <div class="tr">
                <div class="titleChat">Message In VS Out</div>
                <div class="cal">
                  <div class="dataTables_length" id="DataTables_Table_0_length">
                    <div id="userRangeWrapper" class="posRel">
                      <div style="width: 35%; float:right" class="input-group proDs"> <span class="input-group-addon"><i
                            class="fa daterangepickerIcon"></i></span>
                        <input type="text"
                               placeholder="Select date range" id="userRange"
                               class="form-control input-daterangepicker dArrow">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="activeSession" style="height: 355px;">
                <div id="div_g" style="min-width: 310px; height: 286px; margin: 40px auto!important; display:none"></div>
                <div class="graphBox" id="noDataactiveUser"><span id="noDataText">No Data</span> </div>

              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="auRow">
              <div class="tr">
                <div class="titleChat">Sentiment  Analytics</div>
              </div>
              <div class="activeSession" style="height: 355px;">
                <div id="activityGraph" style="min-width: 310px; height: 286px; margin: 40px auto!important; display:none"></div>
                <div class="graphBox" id="noactivityGraph"><span id="noDataText">No Data</span> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

