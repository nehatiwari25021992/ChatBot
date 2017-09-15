<style>
#userDetailsWidget  .chat-messages-list li {
    padding: 15px 15px;
}
  </style>

<div class="widget widget-blue"  id="userDetailsWidget" >
  <div class="widget-title">
    <div class="widget-controls"> <a href="javascript:;"
                                     class="widget-control widget-control-full-screen"
                                     data-toggle="tooltip" data-placement="top" title=""
                                     data-original-title="Full Screen"><i class="fa fa-expand"></i></a> <a
                                     href="javascript:;"
                                     class="widget-control widget-control-full-screen widget-control-show-when-full"
                                     data-toggle="tooltip" data-placement="left" title=""
                                     data-original-title="Exit Full Screen"><i class="fa fa-expand"></i></a>  <a
                                     href="javascript:;" class="widget-control widget-control-refresh"
                                     data-toggle="tooltip" data-placement="top" title=""
                                     ng-click="refreshProfileWidget()" data-original-title="Refresh"><i
          class="fa fa-refresh"></i></a> </div>
    <h3>User Details</h3>
  </div>
  <div class="widget-content">
    <div class="table-responsive">
      <div class="">
        <div role="grid" class="dataTables_wrapper form-inline"
             id="DataTables_Table_0_wrapper">

          <div class="row">
            <div class="pull-left back-invoice-link hidden-xs col-md-2" style="margin-top:16px;"> <a class="iconed-link back-invoice-link" href="#/users"> <i class="fa fa-long-arrow-left"></i> <span>Back </span> </a> </div>
            <div class="col-lg-12 col-md-12 col-sm-12 mrtp30">
              <div class="userInfoRow mrtp30"  id="profileUserProp">      
                   <div class="userInfoCol profilepic"><!-- img src="${request.getContextPath()}/images/ma/user_profile/profile-icon-unknown.png"/ --><img src="${request.getContextPath()}/images/ma/default.png"/></div>
                <div class="profileinfo">
                  <div class="nameBox">
                    <div class="name profileName">{{userDetails.name}}</div>
                  </div>
                  <div class="botUserInfo">
                    <div class="infoCol">
                      <div class="title">First Seen </div>
                      {{userDetails.first_seen  | moment: 'format': 'MMM DD YYYY'}}
                    </div>

                    <div class="infoCol">
                      <div class="title">Last Seen </div>
                      {{userDetails.last_seen  | moment: 'format': 'MMM DD YYYY'}}
                    </div>

                    <div class="infoCol">
                      <div class="title">Chats </div>
                      {{userDetails.total_conversation}}
                    </div>

                    <div class="infoCol">
                      <div class="title">Min. Chat Step</div>
                      {{userDetails.min_conversation_steps}}
                    </div>

                    <div class="infoCol">
                      <div class="title">Max. Chat Step </div>
                      {{userDetails.max_conversation_steps}}
                    </div>
                  </div>
                </div> </div>
            </div>  
          </div>
          <div class="row">
            <div class="col-sm-4">
              <div class="converstion">
                <div class="titleChat">Chats</div>
                <div style="height: 412px; overflow-y: auto;">
                <div class="tEventsRow list" ng-if="userConversation.length != 0" ng-repeat="userCon in userConversation"  style="cursor: pointer" ng-click="openConversation(userCon)">
                  <div>
                    <div class="msg">{{userCon.message}}</div> 
                    <div class="time">{{userCon.created_on | moment: 'format': 'MMM DD, hh:mm'}}
                    </div>
                  </div>
                  <div class="clear"></div>
                </div>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="widget widget-blue">
                <div class="widget-title">

                  <h3><i class="fa fa-comments"></i> Chat History</h3>
                </div>
                <div class="widget-content" style="display: block;">
                  <ul class="chat-messages-list" style="height: 400px; overflow-y: auto;">
                    <li  ng-repeat="obj in userChats | reverse"  >
                      <div class="row" ng-if="!obj.position">
                        <div class="col-xs-2">
                          <div class="avatar">
                            <img src="${request.getContextPath()}/images/ma/default.png" alt="">
                          </div>
                        </div>
                        <div class="col-xs-10">
                          <div class="chat-bubble chat-bubble-right ">
                            <div class="bubble-arrow"></div>
                            <div class="meta-info"><a href="#"></a>{{obj.createdOn  | moment: 'format': 'MMM DD, hh:mm' }}</div>
                            <p>{{obj.message}}</p>

                          </div>
                        </div>
                      </div>
                      <div class="row"  ng-if="obj.position" >
                        <div class="col-xs-10">
                          <div class="chat-bubble chat-bubble-left">
                            <div class="bubble-arrow"></div>
                            <div class="meta-info"><a href="#"></a>{{obj.createdOn  | moment: 'format': 'MMM DD, YYYY hh:mm' }}</div>
                            <p>{{obj.message}}</p>
                          </div>
                        </div>
                        <div class="col-xs-2">
                          <div class="avatar">
                            <img src="${request.getContextPath()}/images/ma/avatar5.png" alt="">
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="widget-foot">
                    <!--                        <div class="create-chat-message-w">
                                              <div class="input-group">
                                                <input type="text" class="form-control" placeholder="Your message here...">
                                                <span class="input-group-btn">
                                                  <button class="btn btn-primary" type="button">Send</button>
                                                </span>
                                              </div>
                                            </div>-->
                  </div>
                </div>
              </div>
            </div>               
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!--//Profile Details-->

