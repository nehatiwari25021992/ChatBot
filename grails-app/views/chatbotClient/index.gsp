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



                      <input type="text" conv-question="Hello! Welcome to Bank of India." no-answer="true">

                      <select name="flow" conv-question="To assist you further, please choose an option given below.">
                        <option value="Dialog" callback="outerFunction">Dialog</option>
                        <option value="Bot" callback="outerFunction">Bot</option>
                        <option value="LiveChat" callback="outerFunction">Live Chat</option>
                      </select>
                      <div conv-fork="flow">
                        <!--Dialog Flow-->
                        <div conv-case="Dialog">

                          <select name="typeOfUser" conv-question="Please select from either of the options below to assist you further.">
                            <option value="CreditCard" callback="outerFunction">Credit Card</option>
                            <option value="DebitCard" callback="outerFunction">Debit Card </option>
                            <option value="InterestRates" callback="outerFunction">Interest Rates</option>
                            <option value="Loan" callback="outerFunction">Apply/Track Loan </option>
                          </select>
                          <div conv-fork="typeOfUser">

                            <!--    New User Case-->
                            <div conv-case="CreditCard">
                              <select conv-question="Which of the following would you like to Apply for?" >
                                <option value="Master" callback="outerFunction">Master</option>
                                <option value="VISA" callback="outerFunction">VISA</option>
                              </select>
                              <select name="typeOfPlans" conv-question="We provide the following Master Credit Cards. Click on the one you would like to know more about" >
                                <option value="Key Feature" callback="outerFunction">Master EMV Card</option>
                                <option value="Wealth" callback="outerFunction">Master Platinum EMV Card</option>
                              </select>
                              <div conv-fork="typeOfPlans">
                                <div conv-case="Key Feature">
                                  <input type="text" conv-question="Classic card" no-answer="true">
                                  <input type="text" conv-question="Card valid in India and Nepal only." no-answer="true">
                                  <input type="text" conv-question="Billing cycle is from 16th of current month to 15th of next month." no-answer="true">
                                  <input type="text" conv-question="And payment is to be made on or before 5th of succeeding month which mostly suits the
                                         requirement of salaried class." no-answer="true">
                                  <input type="text" conv-question="Eligibility: Gross annual income of Rs.0.75 lacs&amp; above" no-answer="true">
                                  <input type="text" conv-question="Pin-enabled photo card." no-answer="true">
                                  <input type="text" conv-question="Secure usage at over 2,50,000 merchants establishments and round the clock cash advance at
                                         over 9000 ATMs." no-answer="true">
                                  <input type="text" conv-question="Interest free credit for upto 51 days and revolving credit at preferential rate."  no-answer="true">
                                  <input type="text" conv-question="Flexible credit limits for add-on cards." no-answer="true">
                                  <input type="text" conv-question="Reward programme on card usage." no-answer="true">
                                  <select name="yesorno" conv-question="Would you like Bank of India Customer team to contact you for the same?" >
                                    <option value="YES" callback="outerFunction">Yes</option>
                                    <option value="NO" callback="outerFunction">No</option>
                                  </select>
                                  <div conv-fork="yesorno">
                                    <div conv-case="YES">
                                      <input type="text" conv-question="Great. Kindly let us know the following details" no-answer="true">
                                      <input type="text" conv-question="Full Name, Contact Number with code, Email ID">
                                      <input type="text" conv-question="Thank you for the information. One of our Customer care executives would contact you
                                             shortly." no-answer="true">
                                      
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <input type="text" conv-question="Cool. This flow is completed." no-answer="true">
                          <input type="text" conv-question="Query flow will begin now." no-answer="true">
                          <select name="typeOfQuery1" conv-question="Please choose type of query?">
                            <option value="Custom1" callback="outerFunction">Custom</option>
                          </select>
                          <div conv-fork="typeOfQuery1">

                            <div conv-case="Custom1">

                              <input conv-question="Type in your query below?"  id="q1" type="text" name="q1" required placeholder="Type your Query" >

                            </div>
                          </div>
                        </div>
                        <!-- New User Case End-->   
                      </div>
                      <input type="text" conv-question="Cool. This flow is completed." no-answer="true">
                      <input type="text" conv-question="Query flow will begin now." no-answer="true">
                      <select name="typeOfQuery1" conv-question="Please choose type of query?">
                        <option value="Custom1" callback="outerFunction">Custom</option>
                      </select>
                      <div conv-fork="typeOfQuery1">

                        <div conv-case="Custom1">

                          <input conv-question="Type in your query below?"  id="q1" type="text" name="q1" required placeholder="Type your Query" >

                        </div>
                      </div>
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
            
         
    //              qad.renderDialog(JSON.parse('${chatScript}'));
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
