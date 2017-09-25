<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${app.name} BOT Demo</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

    <link rel='stylesheet' href='${resource(dir:'TataAIA/client/css',file:'main.css?shep01092017')}'>
    <link rel='stylesheet' href='${resource(dir:'TataAIA/client/dist',file:'jquery.convform.css')}'>
    <link rel='stylesheet' href='${resource(dir:'TataAIA/client/css',file:'bootstrap.min.css')}'>
    <link rel='stylesheet' href='${resource(dir:'TataAIA/client',file:'demo.css')}'>

    <meta name="layout" content="chatbot1" />
    <script>
    var baseURL = "${baseURL}"
    var socketURL = "${socketURL}"
    var apiKey = "${app.api_key}"
    var secretKey = "${app.secret_key}"
   
  
    </script>
  </head>
  <body>
    <h1 style="background-color: #007AC9;color:#fff;text-align: center;">${app.name} BOT Demo</h1>
    <!--<h1 style="background-color: #F9AF4C;color:#000;text-align: center;">${app.name.toUpperCase()} BOT Demo</h1>-->
    <div class="Wrapper">
      <div class="ChatWrapper">
        <div class="ChatInner">
          <div class="ChatBox">
            <div class="dhlChat dhlChatPlus">
              <div class="dhlChatHead">
                <div class="chatIcon"><img src="${resource(dir:'TataAIA/client/images',file:'chat.png')}"/>
                </div>
                <div class="chatTitle">Chat with us</div>
              </div>
              <div class="dhlChatBody">
                  <!--                                <div class="dhlWelcomeNote">We’re not around, but we’d love to chat another time</div>-->
                <div class="dhlFormWrapper" id="registerWidget" >
                  <div class="inputWrapper">
                    <input name="Name" type="text" id="Name" value="" placeholder="Enter your name" class="dhlInput">
                    <div id="error_name" class="error_msg" style="display:none;"></div>
                  </div>
                  <div class="inputWrapper"><input name="Email" type="text" id="Email" value="" placeholder="Enter your email" class="dhlInput">
                    <div id="error_email" class="error_msg" style="display:none;"></div>
                  </div>
                  <div class="inputWrapper"><input name="phone" type="number" id="Phone" value="" placeholder="Enter your phone number" class="dhlInput">
                    <div id="error_phone" class="error_msg" style="display:none;"></div>
                  </div>
                  <button id="registerBtn" type="button" class="dhlEnter" onclick="registerUser()">Submit</button>
                </div>




                <div class="dhlFormWrapper" id="chatbotWidget" style="display:none;">
                  <div id="chat" class="conv-form-wrapper">
                    <form action="" method="GET" class="hidden" id="dynaForm">
                      <g:each in="${chatScript.nodes}" var="c" status="i">
                        <g:if test="${c.type == 'qad.Question'}">

                          <select  conv-question="${c.question}">
                            <g:each in="${c.options}" var="o" status="j">
                              <option value="${o.text}" id="${o.id}" callback="outerFunction">${o.text}</option>
                            </g:each>
                          </select>

                        </g:if>
                        <g:elseif test="${c.type == 'qad.Answer'}">
                          <input type="text" conv-question="${c.answer}" >
                        </g:elseif>

                      </g:each>


                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="${resource(dir:'TataAIA/client/js',file:'main.js')}"></script>
    <script src="${resource(dir:'TataAIA/client/dist',file:'util.js')}"></script>
    <script src="${resource(dir:'TataAIA/client/dist',file:'speech.js')}"></script>
    <script src="${resource(dir:'TataAIA/client/dist',file:'autosize.min.js')}"></script>
<!--    <script src="${resource(dir:'TataAIA/client/js',file:'main.js')}"></script>-->

    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.6/socket.io.min.js"></script>
    <script src="${resource(dir:'TataAIA/client/dist',file:'appwarp.min.js')}"></script>
    <script src="${resource(dir:'TataAIA/client/dist',file:'jquery.convform.js')}"></script>

    <script src="${resource(dir:'TataAIA/client/dist',file:'snippet.js')}"></script>


    <script>
        $( document ).ready( function () {
            $( ".dhlChatHead" ).click( function () {
                $( ".dhlChatPlus" ).toggleClass( "dhlChatOpen" );
            } );
            
         
          // qad.renderDialog(JSON.parse('${chatScript}'));
        } );
        function outerFunction(){
            // console.log("outer function called"+value);
        }
        function google() {
            window.open("https://google.com");
        }
        function bing() {
            window.open("https://bing.com");
        }
    </script>
  </body>
</html>
