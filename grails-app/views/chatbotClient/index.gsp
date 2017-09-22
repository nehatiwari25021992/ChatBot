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

                  <g:each in="${chatScript.cells}" var="c" status="i">
                    <g:if test="${c.type == 'qad.Question'}">

                    </g:if>
                    <g:elseif test="${c.type == 'qad.Answer'}">

                    </g:elseif>
                    <g:else>


                    </g:else>
                  </g:each>
                  <div id="chat" class="conv-form-wrapper">
                    <form action="" method="GET" class="hidden">

                      <input type="text" conv-question="Hello! Welcome to TATA AIA Life Insurance." no-answer="true">

                      <select name="flow" conv-question="Please select from the options below – ">
                        <option value="Buy a Policy" callback="outerFunction">Buy a Policy</option>
                        <option value="Query" callback="outerFunction">Query</option>
                      </select>
                      <div conv-fork="flow">
                        <div conv-case="Buy a Policy">

                          <select conv-question="Thank you for the information. Please select either of the Solutions below.">
                            <option value="Protection" callback="outerFunction">Protection</option>
                            <option value="Wealth " callback="outerFunction">Wealth </option>
                            <option value="Savings" callback="outerFunction">Savings</option>
                            <option value="Child" callback="outerFunction">Child</option>
                            <!--<option value="Retirement" callback="outerFunction">Retirement</option>-->
                            <!--<option value="Health" callback="outerFunction">Health</option>-->
                          </select>
                          <select  conv-question="Click on any of the below options to know more" >
                            <option value="Sampoorna Raksha" callback="outerFunction">Sampoorna Raksha</option>
                            <!--<option value="Sampoorna Raksha +" callback="outerFunction">Sampoorna Raksha +</option>-->
                            <option value="iRaksha TROP" callback="outerFunction">iRaksha TROP</option>
                            <!--<option value="iRaksha Supreme" callback="outerFunction">iRaksha Supreme</option>-->
                            <!--<option value="Maha Raksha Supreme" callback="outerFunction">Maha Raksha Supreme</option>-->
                          </select>

                          <select  conv-question="Great Option! Tata AIA Life Insurance Sampoorna Raksha Plan, a pure term insurance plan that provides financial protection to your family and offers you the flexibility to choose the plan that suits your need. You may opt to receive either a Lump Sum benefit on Death or Lump Sum benefit on Death and Monthly Income for next 10 years while also enjoying the flexibility to enhance your life cover.Please choose an option below:">
                            <option value="Premium Calculator" callback="outerFunction">Premium Calculator</option>
                            <option value="Download Brochure" callback="outerFunction">Download Brochure</option>
                            <!--<option value="Know More" callback="outerFunction">Know More</option>-->
                          </select>
                          <select  conv-question="Please help us answer a few questions before we calculate your premium. What is your Gender?">
                            <option value="Male" callback="outerFunction">Male</option>
                            <option value="Female" callback="outerFunction">Female</option>
                          </select>
                          <select  conv-question="Are you a Smoker?">
                            <option value="Yes" callback="outerFunction">Yes</option>
                            <option value="No" callback="outerFunction">No</option>
                          </select>
                          <select  conv-question="What would be your Mode of Payment?">
                            <option value="Annual" callback="outerFunction">Annual</option>
                            <!--<option value="Semi-Annually" callback="outerFunction">Semi-Annually</option>-->
                            <option value="Quarterly" callback="outerFunction">Quarterly</option>
                            <option value="Monthly" callback="outerFunction">Monthly</option>
                          </select>
                          <input type="text" conv-question="What is your desired coverage amount (in Rupees)? Enter the amount in multiples of 1,00,000. Minimum coverage is 50,00,000." >
                          <input type="text" conv-question="Please enter the Policy Term (between 10 and 40 years)." >
                          <input type="text" conv-question="Please enter Premium paying term (between 5 and 40 years)." >
                          <input type="text" conv-question="Congratulations! Here is your final quote.Your annual premium payable is Rs. 15,700/- for a Sum Assured of Rs.50,00,000/-." no-answer="true">
                          <select  conv-question="Please select an action below to complete this purchase.">
                            <option value="Buy" callback="outerFunction">Buy</option>
                            <option value="Add Rider " callback="outerFunction">Add Rider </option>
                          </select>
                          <input type="text" conv-question="Cool, Payment link will come here." no-answer="true">
                        </div>
                        <div conv-case="Query">
                          <select name="typeOfQuery" conv-question="Please choose type of query?">
                            <option value="Order related" callback="outerFunction">Order related</option>
                            <option value="Custom" callback="outerFunction">Custom</option>
                          </select>
                          <div conv-fork="typeOfQuery">

                            <div conv-case="Order related">
                              <input conv-question="Type in your Order number below"  id="on" type="text" name="on" required placeholder="Order number" >
                            </div>
                            <div conv-case="Custom">

                              <input conv-question="Type in your query below?"  id="q" type="text" name="q" required placeholder="Type your Query" >

                            </div>
                          </div>
                        </div>

                      </div>

                      <input type="text" conv-question="Cool. This flow is completed." no-answer="true">
                      <input type="text" conv-question="Custom Query flow will begin now." no-answer="true">
                      <select name="typeOfQuery1" conv-question="Please choose type of query?">
                        <option value="Policy related1" callback="outerFunction">Policy related</option>
                        <option value="Custom1" callback="outerFunction">Custom</option>
                      </select>
                      <div conv-fork="typeOfQuery1">

                        <div conv-case="Order related1">
                          <input conv-question="Type in your Policy number below"  id="on1" type="text" name="on1" required placeholder="Policy number" >
                        </div>
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
    <script src="${resource(dir:'TataAIA/client/js',file:'main.js')}"></script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.6/socket.io.min.js"></script>
    <script src="${resource(dir:'TataAIA/client/dist',file:'appwarp.min.js')}"></script>
    <script src="${resource(dir:'TataAIA/client/dist',file:'jquery.convform.js')}"></script>



    <script>
        $( document ).ready( function () {
            $( ".dhlChatHead" ).click( function () {
                $( ".dhlChatPlus" ).toggleClass( "dhlChatOpen" );
            } );
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
