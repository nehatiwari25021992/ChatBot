function SingleConvState(input){
    this.input = input;
    this.next = false;
    return this;
}
SingleConvState.prototype.hasNext = function(){
    return this.next;
};
function ConvState(wrapper, SingleConvState, form) {
    this.form = form;
    this.wrapper = wrapper;
    this.current = SingleConvState;
    this.answers = {};
    this.scrollDown = function() {
        $(this.wrapper).find('#messages').stop().animate({
            scrollTop: $(this.wrapper).find('#messages')[0].scrollHeight
        }, 600);
    }.bind(this);
}
ConvState.prototype.next = function(){
    if(this.current.hasNext()){
        this.current = this.current.next;
        if(this.current.input.hasOwnProperty('fork') && this.current.input.hasOwnProperty('case')){
            if(this.answers.hasOwnProperty(this.current.input.fork) && this.answers[this.current.input.fork].value != this.current.input.case) {
                return this.next();
            }
            if(!this.answers.hasOwnProperty(this.current.input.fork)) {
                return this.next();
            }
        }
        return true;
    } else {
        return false;
    }
};
ConvState.prototype.printQuestion = function(){
 
    var questions = this.current.input.questions;
    var question = questions[Math.floor(Math.random() * questions.length)]; //get a random question from questions array
    var ansWithin = question.match(/\{(.*?)\}(\:(\d)*)?/g); // searches for string replacements for answers and replaces them with previous aswers (warning: not checking if answer exists)
  
    for(var key in ansWithin){
        if(ansWithin.hasOwnProperty(key)){
            var ansKey = ansWithin[key].replace(/\{|\}/g, "");
            var ansFinalKey = ansKey;
            var index = false;
            if(ansKey.indexOf(':')!=-1){
                ansFinalKey = ansFinalKey.split(':')[0];
                index = ansKey.split(':')[1];
            }
            if(index!==false){
                var replacement = this.answers[ansFinalKey].text.split(' ');
                if(replacement.length >= index){
                    question = question.replace(ansWithin[key], replacement[index]);
                } else {
                    question = question.replace(ansWithin[key], this.answers[ansFinalKey].text);
                }
            } else {
                question = question.replace(ansWithin[key], this.answers[ansFinalKey].text);
            }
        }
    }
    var messageObj = $('<div class="message to typing"><div class="typing_loader"></div></div>');
    setTimeout(function(){
        $(this.wrapper).find('#messages').append(messageObj);
        this.scrollDown();
    }.bind(this), 100);
    setTimeout(function(){
        messageObj.html(question);
        // console.log('custom question text: ', question);  
        mockBackendService(question,true)
        messageObj.removeClass('typing').addClass('ready');
        if(this.current.input.type=="select"){
            this.printAnswers(this.current.input.answers, this.current.input.multiple);
        }
        this.scrollDown();
        if(this.current.input.hasOwnProperty('noAnswer')) {
            this.next();
            setTimeout(function(){
                this.printQuestion();
            }.bind(this),200);
        }
        $(this.wrapper).find('#userInput').focus();
    }.bind(this), 500);  
};
ConvState.prototype.printAnswers = function(answers, multiple){
    this.wrapper.find('div.options div.option').remove();
    if(multiple){
        for(var i in answers){
            if(answers.hasOwnProperty(i)){
                var option = $('<div class="option">'+answers[i].text+'</div>')
                .data("answer", answers[i])
                .click(function(event){
                    var indexOf = this.current.input.selected.indexOf($(event.target).data("answer").value);
                    if(indexOf == -1){
                        this.current.input.selected.push($(event.target).data("answer").value);
                        $(event.target).addClass('selected');
                    } else {
                        this.current.input.selected.splice(indexOf, 1);
                        $(event.target).removeClass('selected');
                    }
                    if(this.current.input.selected.length > 0) {
                        this.wrapper.find('button.submit').addClass('glow');
                    } else {
                        this.wrapper.find('button.submit').removeClass('glow');
                    }
                }.bind(this));
                this.wrapper.find('div.options').append(option);
                $(window).trigger('dragreset');
            }
        }
    } else {
        for(var i in answers){
            if(answers.hasOwnProperty(i)){
                var option = $('<div class="option">'+answers[i].text+'</div>')
                .data("answer", answers[i])
                .click(function(event){
                    this.current.input.selected = $(event.target).data("answer").value;
                    this.answerWith($(event.target).data("answer").text, $(event.target).data("answer"));
                    this.wrapper.find('div.options div.option').remove();
                }.bind(this));
                if(answers[i].hasOwnProperty('callback')){
                    var callback = answers[i].callback;
                    option.click(function(event){
                        // console.log('selected option: ', event.target.innerText);
                        
                        // Fake Backend goes here
                        mockBackendService(event.target.innerText,false)
                        
                        window[this]();
                    }.bind(callback));
                }
                this.wrapper.find('div.options').append(option);
                $(window).trigger('dragreset');
            }
        }
    }
    var diff = $(this.wrapper).find('div.options').height();
    $(this.wrapper).find('#messages').css({
        paddingBottom: diff
    });

};
ConvState.prototype.answerWith = function(answerText, answerObject) {
    // console.log('previous answer: ', answerObject);
    //puts answer inside answers array to give questions access to previous answers
    if(this.current.input.hasOwnProperty('name')){
        if(typeof answerObject == 'string') {
            if(this.current.input.type == 'tel')
                answerObject = answerObject.replace(/\s|\(|\)|-/g, "");
            this.answers[this.current.input.name] = {
                text: answerText, 
                value: answerObject
            };
        } else {
            this.answers[this.current.input.name] = answerObject;
        }
        if(this.current.input.type == 'select' && !this.current.input.multiple) {
            $(this.current.input.element).val(answerObject.value).change();
        } else {
            
            if(typeof answerObject != "string"){
                // console.log('custom multiple input text: ', answerObject.toString());  
                mockBackendService(answerObject.toString(),false)
            }else{
                //  console.log('custom input text: ', answerObject);  
                mockBackendService(answerObject,false)
            }
            // Call event api here
            $(this.current.input.element).val(answerObject).change();
        }
    }
    //prints answer within messages wrapper
    if(this.current.input.type == 'password')
        answerText = answerText.replace(/./g, '*');
    var message = $('<div class="message from">'+answerText+'</div>');

    //removes options before appending message so scroll animation runs without problems
    $(this.wrapper).find("div.options div.option").remove();


    var diff = $(this.wrapper).find('div.options').height();
    $(this.wrapper).find('#messages').css({
        paddingBottom: diff
    });
    $(this.wrapper).find("#userInput").focus();
    setTimeout(function(){
        $(this.wrapper).find("#messages").append(message);
        this.scrollDown();
    }.bind(this), 300);

    $(this.form).append(this.current.input.element);
    //goes to next state and prints question
    if(this.next()){
        setTimeout(function(){
            this.printQuestion();
        }.bind(this), 300);
    } else {
        this.form.submit();
    }
};

(function($){
    $.fn.convform = function(placeholder){
        var wrapper = this;
        /*
             * this will create an array with all inputs, selects and textareas found
             * inside the wrapper, in order of appearance
             */
        var inputs = $(this).find('input, select, textarea').map(function(){
            var input = {};
            if($(this).attr('name'))
                input['name'] = $(this).attr('name').replace(/\[|\]/g, "");
            if($(this).attr('no-answer'))
                input['noAnswer'] = true;
            if($(this).attr('type'))
                input['type'] = $(this).attr('type');
            input['questions'] = $(this).attr('conv-question').split("|");
            if($(this).attr('pattern'))
                input['pattern'] = $(this).attr('pattern');
            if($(this).is('select')) {
                input['type'] = 'select';
                input['answers'] = $(this).find('option').map(function(){
                    var answer = {};
                    answer['text'] = $(this).text();
                    answer['value'] = $(this).val();
                    if($(this).attr('callback'))
                        answer['callback'] = $(this).attr('callback');
                    return answer;
                }).get();
                if($(this).prop('multiple')){
                    input['multiple'] = true;
                    input['selected'] = [];
                } else {
                    input['multiple'] = false;
                    input['selected'] = "";
                }
            }
            if($(this).parent('div[conv-case]').length) {
                input['case'] = $(this).parent('div[conv-case]').attr('conv-case');
                input['fork'] = $(this).parent('div[conv-case]').parent('div[conv-fork]').attr('conv-fork');
            }
            input['element'] = this;
            $(this).detach();
            return input;
        }).get();
        //hides original form so users cant interact with it
        var form = $(wrapper).find('form').hide();

        //var placeholder = 'Write here...';
        //create a new form for user input
        var inputForm = $('<form id="convForm"><div class="options dragscroll"></div><textarea id="userInput" rows="1" placeholder="'+placeholder+'"></textarea><button type="submit" class="icon2-arrow submit">⯈</button><span class="clear"></span></form>');

        //appends messages wrapper and newly created form
        $(wrapper).append('<div class="wrapper-messages"><div id="messages"></div></div>');
        $(wrapper).append(inputForm);

        //creates new single state with first input
        var singleState = new SingleConvState(inputs[0]);
        //creates new wrapper state with first singlestate as current and gives access to wrapper element
        state = new ConvState(wrapper, singleState, form);
        //creates all new single states with inputs in order
        for(var i in inputs) {
            if(i != 0 && inputs.hasOwnProperty(i)){
                singleState.next = new SingleConvState(inputs[i]);
                singleState = singleState.next;
            }
        }

        //prints first question
        state.printQuestion();

        //binds enter to answer submit and change event to search for select possible answers
        $(inputForm).find("#userInput").keypress(function(e){
            if(e.which == 13) {
                var input = $(this).val();
                e.preventDefault();
               
                if(state.current.input.type=="select" && !state.current.input.multiple){
                    var results = state.current.input.answers.filter(function(el){
                        return el.text.toLowerCase().indexOf(input.toLowerCase()) != -1;
                    });
                  
                    if(results.length){
                        state.current.input.selected = results[0];
                        $(this).parent('form').submit();
                    } else {
                        state.wrapper.find('#userInput').addClass('error');
                    }
                } else if(state.current.input.type=="select" && state.current.input.multiple) {
                    if(input.trim() != "") {
                        var results = state.current.input.answers.filter(function(el){
                            return el.text.toLowerCase().indexOf(input.toLowerCase()) != -1;
                        });
                       
                        if(results.length){
                            if(state.current.input.selected.indexOf(results[0].value) == -1){
                                state.current.input.selected.push(results[0].value);
                                state.wrapper.find('#userInput').val("");
                            } else {
                                state.wrapper.find('#userInput').val("");
                            }
                        } else {
                            state.wrapper.find('#userInput').addClass('error');
                        }
                    } else {
                       
                        if(state.current.input.selected.length) {
                            $(this).parent('form').submit();
                        }
                    }
                } else {
                   
                    if(input.trim()!='' && !state.wrapper.find('#userInput').hasClass("error")) {
                        
                        if(customQueryFlow){
                            var messageObj = $('<div class="message from typing"><div class="typing_loader"></div></div>');
                            setTimeout(function(){
                                $(state.wrapper).find('#messages').append(messageObj);
                                state.scrollDown();
                            }.bind(this), 100);
                            setTimeout(function(){
                                messageObj.html(input);
                                messageObj.removeClass('typing').addClass('ready');
                                state.scrollDown();
                                state.wrapper.find('#userInput').val("");
                                state.wrapper.find('#userInput').focus();
                            }.bind(this), 500); 
                            // Get Query Response
                      
                            getResponseForQuery(input)
                        }else if(callCenterFlow == true){
                            console.log("inside call center flow")
                            
                            ___CuRrEnTMeSsAgE = input
                            if(___isAgentOffline){
                                ___warpclient.invokeZoneRPC("sendOfflineMessage",___CuRrEnTUserName,Base64.encode(input));
                                $("#chatWidgetMsG").val(""); 
                            }else if(___isAgentOfflineByRoom){
                                ___warpclient.invokeZoneRPC("sendOfflineMessageToAgent",___CuRrEnTUserName,___adminUserName,Base64.encode(___CuRrEnTMeSsAgE));
                            }else{
                                var jsonObj = {
                                    "to": ___adminUserName, 
                                    "message": Base64.encode(input)
                                }
                                   
                                ___warpclient.sendChat(jsonObj);
                        
                            }
                          
                        }else{
                            $(this).parent('form').submit();
                        }
                      
                       
                    } else {
                        $(state.wrapper).find('#userInput').focus();
                    }
                }
            }
            autosize.update($(state.wrapper).find('#userInput'));
        }).on('input', function(e){
            if(state.current.input.type=="select"){
                var input = $(this).val();
                var results = state.current.input.answers.filter(function(el){
                    return el.text.toLowerCase().indexOf(input.toLowerCase()) != -1;
                });
              
                if(results.length){
                    state.wrapper.find('#userInput').removeClass('error');
                    state.printAnswers(results, state.current.input.multiple);
                } else {
                    state.wrapper.find('#userInput').addClass('error');
                }
            } else if(state.current.input.hasOwnProperty('pattern')) {
                var reg = new RegExp(state.current.input.pattern, 'i');
                if(reg.test($(this).val())) {
                    state.wrapper.find('#userInput').removeClass('error');
                } else {
                    state.wrapper.find('#userInput').addClass('error');
                }
            }
        });

        $(inputForm).find('button.submit').click(function(e){
            var input = $(state.wrapper).find('#userInput').val();
            e.preventDefault();
            if(state.current.input.type=="select" && !state.current.input.multiple){
                if(input == 'Escreva aqui...') input = '';
                var results = state.current.input.answers.filter(function(el){
                    return el.text.toLowerCase().indexOf(input.toLowerCase()) != -1;
                });
               
                if(results.length){
                    state.current.input.selected = results[0];
                    $(this).parent('form').submit();
                } else {
                    state.wrapper.find('#userInput').addClass('error');
                }
            } else if(state.current.input.type=="select" && state.current.input.multiple) {
                if(input.trim() != "" && input != 'Escreva aqui...') {
                    var results = state.current.input.answers.filter(function(el){
                        return el.text.toLowerCase().indexOf(input.toLowerCase()) != -1;
                    });
                    if(results.length){
                        if(state.current.input.selected.indexOf(results[0].value) == -1){
                            state.current.input.selected.push(results[0].value);
                            state.wrapper.find('#userInput').val("");
                        } else {
                            state.wrapper.find('#userInput').val("");
                        }
                    } else {
                        state.wrapper.find('#userInput').addClass('error');
                    }
                } else {
                    if(state.current.input.selected.length) {
                        $(this).removeClass('glow');
                        $(this).parent('form').submit();
                    }
                }
            } else {
                if(input.trim() != '' && !state.wrapper.find('#userInput').hasClass("error")){
                //  $(this).parent('form').submit();
                } else {
                    $(state.wrapper).find('#userInput').focus();
                }
            }
            autosize.update($(state.wrapper).find('#userInput'));
        });

        //binds form submit to state functions
        $(inputForm).submit(function(e){
            e.preventDefault();
            var answer = $(this).find('#userInput').val();
            $(this).find('#userInput').val("");
            if(state.current.input.type == 'select'){
                if(!state.current.input.multiple){
                    state.answerWith(state.current.input.selected.text, state.current.input.selected);
                } else {
                    state.answerWith(state.current.input.selected.join(', '), state.current.input.selected);
                }
            } else {
                state.answerWith(answer, answer);
            }
           
        });


        if(typeof autosize == 'function') {
            $textarea = $(state.wrapper).find('#userInput');
            autosize($textarea);
        }

        return state;
    }
})( jQuery );

// Constants
var chatBotData = {},customQueryFlow = false,callCenterFlow = false,base_url = 'http://localhost:8080/App42ChatBot/chatBot', socket;
var state;
var ___warpclient, ___adminUserName = "", ___CuRrEnTUserName = "",___CuRrEnTMeSsAgE="",___isAgentOffline = false,___isAgentOfflineByRoom= false,___chatCounter = 0,___retryCounter=0,___roomID;
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
 
function registerUser(){
    
    var name = $("#Name").val()
    var email = $("#Email").val()
    var phone = $("#Phone").val()
   
    $("#error_name").hide();
    $("#error_email").hide();
    $("#error_phone").hide();
    
    var frmChatSbmtErrFlAG = false
    
    if ($.trim(name) == "") {
        frmChatSbmtErrFlAG = true
        $("#error_name").html("Please enter your Name").show();
    }
    
    if ($.trim(email) == "") {
        frmChatSbmtErrFlAG = true
        $("#error_email").html("Please enter Email.").show();
    }else if (!validateEmail($.trim(email))) {
        frmChatSbmtErrFlAG = true
        $("#error_email").html("Invalid Email Address.").show();
    }
    
    if ($.trim(phone) == "") {
        frmChatSbmtErrFlAG = true
        $("#error_phone").html("Please enter your Phone Number.").show();
    }
    //                console.log("inside validation erorrr"+frmChatSbmtErrFlAG)
    if (frmChatSbmtErrFlAG) {
        //form validation msg shows here
        return false;
    }
    
    $("#registerBtn").attr("disabled",true);
    $("#loadErConTaiNeR").show();
    var usrDetailsObj = {
        "name":$.trim(name),
        "email":$.trim(email),
        "phone":$.trim(phone),
        "apiKey":"3d4bb5e3c2edd13563155c3036ac47afed3298dc4e474f026cf147485dc5e881",
        "secretKey":"8b97a5ad0072f2eac01928d8e9d8c813313d4b9e9fa4ebec080969281ec8cef0"
    }
    
    $.ajax(base_url + '/saveOrUpdateUser', {
        method: 'POST',
        data: usrDetailsObj
    }).then(function(data) {
        chatBotData.cId = data.cId
        chatBotData.userId = data.userId
        chatBotData.appId = data.appId
        chatBotData.name = usrDetailsObj.name
        chatBotData.email = usrDetailsObj.email
        chatBotData.phone = usrDetailsObj.phone
       
        $("#chatbotWidget").show()
        $("#registerWidget").hide()
        var convForm = $('.conv-form-wrapper').convform("Write here...");
    });
    
    return true
    
}
// This function will tag each event in the DB
function mockBackendService(inputData,fromBot){
  
    if(inputData === "Query" || inputData === "Custom"){
        callCenterFlow = false
        customQueryFlow = true
    }
    if(inputData === "I could not understand. Talk with support"){
        callCenterFlow = true
        customQueryFlow = false
        
        var messageObj1 = $('<div class="message to typing"><div class="typing_loader"></div></div>');
        setTimeout(function(){
            $('#messages').append(messageObj1);
            state.scrollDown();
        }.bind(this), 100);
        setTimeout(function(){
            messageObj1.html("Please wait while we are trying to connect you with our Agent");
            messageObj1.removeClass('typing').addClass('ready');
            state.scrollDown();
            $('#userInput').val("");
            $('#userInput').focus();
        }.bind(this), 500); 
        //        var fixedScroll = document.getElementById("messages");
        //        fixedScroll.scrollTop = fixedScroll.scrollHeight;
                            
        startCustomerSupport()
        
        
    }
    console.log("callCenterFlow>>>"+callCenterFlow)
    $.ajax(base_url + '/tagEvent', {
        method: 'POST',
        data: {
            fromBot:fromBot,
            event: inputData,
            userId: chatBotData.userId,
            cId:chatBotData.cId,
            appId:chatBotData.appId
        }
    }).then(function(data) {
        // console.log(data);
        //console.log("---Event tagging Success---")
        });
}

socket = io.connect('http://52.172.31.113:5000');
socket.on('connect', function() {
    socket.emit('my event', {
        data: 'I\'m connected!'
    });
    
});
socket.on('learn_response', function(data) {
    console.log("learn_response")
    console.log(data.status)
//$('#chat').append('<div style="margin: 10px; width: 350px;  font-family: roboto;font-size: 14px;"><strong>BOT Says:</strong><div style="border: 1px solid #ea242c; border-radius: 20px; padding: 10px; margin-top: 10px;">' + data.msg + '</div></div>');
// $('#chat').scrollTop($('#chat')[0].scrollHeight);
});
socket.on('status', function(data) {
    console.log(data.msg)
});

socket.on('chat_response', function (data) {
    console.log(data);
    var queryResObj = $('<div class="message to typing"><div class="typing_loader"></div></div>');
    setTimeout(function(){
        $(document).find('#messages').append(queryResObj);
        state.scrollDown();
    }.bind(this), 100);
    setTimeout(function(){
        queryResObj.removeClass('typing').addClass('ready');
        queryResObj.html(data);
        state.scrollDown();
        mockBackendService(data,true)
        $('#userInput').val("");
        $('#userInput').focus();
    }.bind(this), 500);   
});

// Get Response for Query
// This function fetches response for users query
function getResponseForQuery(query){
    console.log("---Get Response For Query  "+query);
    //Event tagging the users query
    mockBackendService(query,false)
    
    socket.emit('chat', {
        m:query
    });
 
}
function startCustomerSupport(){
    console.log("---Initiate Customer Support  ");
    
    initializeAppWarpClient();
 
}

function initializeAppWarpClient() {
    console.log("initializeAppWarpClient")
    var apiKey = "9db45014-2eda-420b-9"
    var secreteKey = "34.214.34.133"
    var obj = {
        "appKey": apiKey, 
        "host": secreteKey, 
        "email": chatBotData.email
    }
    ___CuRrEnTUserName = obj.email;
 
    AppWarp.WarpClient.initialize(obj.appKey, obj.host);
    ___warpclient = AppWarp.WarpClient.getInstance();
    ___warpclient.setRecoveryAllowance(1000);
    ___warpclient.setResponseListener(AppWarp.Events.onConnectDone, onConnectDone);
    ___warpclient.setResponseListener(AppWarp.Events.onDisconnectDone, onDisconnectDone);
    ___warpclient.setResponseListener(AppWarp.Events.onJoinRoomDone, onJoinRoomDone);
    ___warpclient.setResponseListener(AppWarp.Events.onLeaveRoomDone, onLeaveRoomDone);
    ___warpclient.setResponseListener(AppWarp.Events.onZoneRPCDone, onZoneRPCDone);
    ___warpclient.setResponseListener(AppWarp.Events.onSendChatDone, onSendChatDone);
    ___warpclient.setNotifyListener(AppWarp.Events.onChatReceived, onChatReceived);
    ___warpclient.setNotifyListener(AppWarp.Events.onUserLeftRoom, onUserLeftRoom);
    ___warpclient.connect(obj.email,chatBotData);
}

function onConnectDone(res) {
    //  CONNECTION_ERROR_RECOVERABLE
    console.log(res)
    var msg = ''
    if (res == AppWarp.ResultCode.Success) {
        console.log("Client Connected");
        console.log("Checking If Agent is Online!!!!");
        //___warpclient.disconnect();
        ___warpclient.invokeZoneRPC("getAvailableRoomId",___CuRrEnTUserName);
    }else  if (res == AppWarp.ResultCode.AuthError) {
        console.log("Client already Connected. Auth Error:::"+res);
       
    }else if(res == AppWarp.ResultCode.ConnectionErrorRecoverable){
        //connection broken
        console.log(" Connection Error:::Please wait while we try to establish connection>>>"+res);
        msg = 'Chat disconnected.Please wait while we try to establish connection.'
        $("#chatWidgetMsG").attr("disabled",true);
        if( ___retryCounter == 0){
            setSpecialMessage(msg); 
        }
            
        if(___retryCounter <=9){
            setTimeout(function(){
                ___warpclient.recoverConnection();
            }, 10000);
            ___retryCounter = ___retryCounter+1
        }
            
    }else if(res == AppWarp.ResultCode.SuccessRecovered){
        //connection recovered
        $("#chatWidgetMsG").attr("disabled",false);
        ___retryCounter = 0
        msg = 'Connection established successfully. Chat started.'
        setSpecialMessage(msg);
    }else {
        console.log("Error in Connection");
    }
}
function setSpecialMessage(msg){
    var messageObj1 = $('<div class="message to typing"><div class="typing_loader"></div></div>');
    setTimeout(function(){
        $('#messages').append(messageObj1);
        state.scrollDown();
    }.bind(this), 100);
    setTimeout(function(){
        messageObj1.html(msg);
        messageObj1.removeClass('typing').addClass('ready');
        state.scrollDown();
        $('#userInput').val("");
        $('#userInput').focus();
    }.bind(this), 500); 
}
function onDisconnectDone(res) {
        
    console.log("onDisconnectDone")
    console.log(res)
       
    if (res == AppWarp.ResultCode.Success) {
        console.log("Client DisConnected");
          
    }else {
        console.log("Error in DisConnection");
    }
}
function handleChatWindow(isConnected){
   
    var messageObj1 = $('<div class="message to typing"><div class="typing_loader"></div></div>');
    setTimeout(function(){
        $('#messages').append(messageObj1);
        state.scrollDown();
    }.bind(this), 100);
   
    var mmssg = "Agent "+___adminUserName+" is available now. Type in your Query to chat."
    if(isConnected){
        //start chatting
      
        setTimeout(function(){
            messageObj1.html(mmssg);
            messageObj1.removeClass('typing').addClass('ready');
            state.scrollDown();
            $('#userInput').val("");
            $('#userInput').focus();
        }.bind(this), 500); 
    // $("#eNdChAt").show();
    }else{
        // $("#ChAtBoXheAdTiTlE").html("Leave a message");
        $("#ChAtBoXBodYwelComeNotE").html("We’re not around, but we’d love to chat another time");
        
    }
//    var fixedScroll = document.getElementById("messages");
//    fixedScroll.scrollTop = fixedScroll.scrollHeight;  
}
function onJoinRoomDone(response) {
    //  CONNECTION_ERROR_RECOVERABLE
    console.log("onJoinRoomDone:::"+response)
    //console.log(response)
    if (response.res == AppWarp.ResultCode.Success) {
        handleChatWindow(true);
    }else{
        console.log("Error in joining room");
        handleChatWindow(false);
    }
}
function onLeaveRoomDone(response) {
    //  CONNECTION_ERROR_RECOVERABLE
    console.log("onLeaveRoomDone:::"+response)
    //        console.log("onLeaveRoomDone:::"+response.res)
    //console.log(response)
    if (response.res == AppWarp.ResultCode.Success) {
        ___warpclient.disconnect()
    }else{
        console.log("Error in leaving room");
           
    }
}
    
function handleRPCCallForGetAvailableRoomId(response){
    if(response.success){
        ___adminUserName = response.name
        ___warpclient.joinRoom(response.roomId);
    }else{
        // console.log(response.message) 
        //Offline Agents case
        ___isAgentOffline = true
        handleChatWindow(false);
    }
}
function handleRPCCallForSendOfflineMessage(response){
    //console.log("handleRPCCallForSendOfflineMessage") 
    console.log(response) 
    if(response.success){
        $("#ChAtBoXBodYwelComeNotE").html("We received your query. Our Agent will contact you shortly.");
        $("#chatWidgetMsG").attr("disabled",true);
        //$("#ChAtStatus").removeClass("active").addClass("inactive"); 
        // $("#eNdChAt").hide();
        $("#chatWidgetMsG").val(""); 
        var msg =  'Message sent successfully. Our Agent will contact you shortly.'
        setSpecialMessage(msg)
    // ___warpclient.disconnect()
    // $("#ChaTwidgeTseNdMsgBox").hide();
    }else{
        console.log(response.message) 
    }
}
    
function onZoneRPCDone(resCode,responseStr) {
    console.log(responseStr)
    var response = JSON.parse(responseStr["return"])
    var funCtName = responseStr["function"]
    // console.log("funCtName"+funCtName)
    console.log("Getting Room Info after Connection");
       
    if (resCode == AppWarp.ResultCode.Success) {
        if(funCtName == "getAvailableRoomId"){
            ___roomID = response.roomId
            handleRPCCallForGetAvailableRoomId(response)
        }
        if(funCtName == "sendOfflineMessage"){
            handleRPCCallForSendOfflineMessage(response)  
        }
        if(funCtName == "sendOfflineMessageToAgent"){
            handleRPCCallForSendOfflineMessage(response)  
        }
    }else {
        console.log("Error in RPC Call");
        handleChatWindow(false);
    }
}
    
function onSendChatDone(res) {
    console.log("onSendChatDone");
    console.log(res);
    //var msg = "onSendChatDone : <strong>" + AppWarp.ResultCode[res] + "</strong>";
    //  console.log(msg);
    var msg = ''
    if (AppWarp.ResultCode[res] == "Success") {
        //Message Sent
        setResponse(___CuRrEnTUserName, ___CuRrEnTMeSsAgE)
       
    }else if(AppWarp.ResultCode[res] == "ResourceNotFound"){
        //Message Not Sent coz Agent is offline
           
        if(___chatCounter > 0){
            msg =  '<div class="chatSpecilMsg">We could not establish the connection with the Agent. Sorry for the inconvienience caused.</div>'
        //           SEND CHAT AS OFFLINE MSG
        }else{
            ___chatCounter = ___chatCounter + 1
            msg = '<div class="chatSpecilMsg">Agent is offline.Please wait while we try to establish connection.</div>'
            var jsonObj = {
                "to": ___adminUserName, 
                "message": ___CuRrEnTMeSsAgE
            }
            setTimeout(function () {
                ___warpclient.sendChat(jsonObj);
            }, 3000);
        }
        setSpecialMessage(msg);
    } else {
        
    }
}

function onChatReceived(obj) {
    console.log("onChatReceived")
    //  console.log(obj.getChat())
    var res = JSON.parse(obj.getChat())
    //  console.log(res);
    if(res.status == "chatEnded"){
        var msg =  'Agent has ended the chat. Please refresh your browser to start the conversation again.'
        setSpecialMessage(msg)
        $("#chatWidgetMsG").attr("disabled",true);
        $("#ChAtStatus").removeClass("active").addClass("inactive"); 
        $("#eNdChAt").hide();
        //  reSeTvIeWfOrChaT();
        ___warpclient.disconnect();
    //            ___warpclient.leaveRoom(___roomID);
    }else{
        //            console.log(res.message)
        //            console.log(Base64.decode(res.message))
        setResponse(res.from, Base64.decode(res.message))  
    }
   
       
}
function onUserLeftRoom(roomObj,usr) {
    console.log("onUserLeftRoom")
    if(___adminUserName == usr){
        // $("#ChAtStatus").removeClass("active").addClass("inactive"); 
        var msg =  'Chat disconnected. We could not establish the connection with any Agent. Messages will be sent as an offline message to the agents. Sorry for the inconvienience caused.'
        setSpecialMessage(msg);
        ___isAgentOfflineByRoom = true
    }
}

function setResponse(sender, chat) {
    var messageObj = ""
    if (sender === ___CuRrEnTUserName) {
        messageObj = $('<div class="message from typing"><div class="typing_loader"></div></div>');
    } else {
        messageObj = $('<div class="message to typing"><div class="typing_loader"></div></div>');
    }
     
    setTimeout(function(){
        $('#messages').append(messageObj);
        state.scrollDown();
    
    }.bind(this), 100);
    setTimeout(function(){
        messageObj.html(chat);
        messageObj.removeClass('typing').addClass('ready');
        state.scrollDown();
       
        $('#userInput').val("");
        $('#userInput').focus();
    }.bind(this), 500); 
//    var fixedScroll = document.getElementById("messages");
//    fixedScroll.scrollTop = fixedScroll.scrollHeight;
}
