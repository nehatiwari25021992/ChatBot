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



                      <input type="text" conv-question="Hello! Welcome to SBI General Life Insurance." no-answer="true">

                      <select name="flow" conv-question="To assist you further, please choose an option given below.">
                        <option value="Dialog" callback="outerFunction">Dialog</option>
                        <option value="Bot" callback="outerFunction">Bot</option>
                        <option value="LiveChat" callback="outerFunction">Live Chat</option>
                      </select>
                      <div conv-fork="flow">
                        <!--Dialog Flow-->
                        <div conv-case="Dialog">

                          <select name="typeOfUser" conv-question="Please select type of user.">
                            <option value="New" callback="outerFunction">New</option>
                            <option value="Existing" callback="outerFunction">Existing </option>
                          </select>
                          <div conv-fork="typeOfUser">

                            <!--    New User Case-->
                            <div conv-case="New">
                              <select conv-question="Thank you for the details. Please select from the options below –" >
                                <option value="Buy a Policy" callback="outerFunction">Buy a Policy</option>
                                <option value="Query" callback="outerFunction">Query</option>
                              </select>
                              <select conv-question="Please select either of the options below." >
                                <option value="Health" callback="outerFunction">Health</option>
                                <option value="Motor" callback="outerFunction">Motor</option>
                                <option value="Travel" callback="outerFunction">Travel</option>
                                <option value="Home" callback="outerFunction">Home</option>
                              </select>
                              <select conv-question="Click on any of the below option to know more" >
                                <option value="Health Insurance" callback="outerFunction">Health Insurance</option>
                                <option value="Arogya Plus" callback="outerFunction">Arogya Plus</option>
                              </select>
                              <select name="typeOfAction" conv-question="With SBI General’s Health Insurance Policy – Retail, you can be in control by making medical treatment expenses more manageable. Thus ensuring quality health & happiness of your family. Please choose an option below:" >
                                <option value="Get Quote" callback="outerFunction">Get Quote</option>
                                <option value="Key Feature" callback="outerFunction">Key Feature</option>
                              </select>
                              <div conv-fork="typeOfAction">
                                <div conv-case="Get Quote">
                                  <select name="typeOfProduct" conv-question="Please help us answer a few questions before we calculate your premium. What type of Product would you like to buy?" >
                                    <option value="Family Floater" callback="outerFunction">Family Floater</option>
                                    <option value="Individual" callback="outerFunction">Individual</option>
                                  </select>
                                  <div conv-fork="typeOfProduct">
                                    <div conv-case="Family Floater">
                                      <input conv-question="What is your family size?"  id="familySize" type="text" name="familySize" required placeholder="Enter Family Size" >
                                      <input conv-question="What would be the start date of your policy?"  id="policyStartDate" type="text" name="policyStartDate" required placeholder="Start Date" >
                                      <input conv-question="What is Primary Insured’s name? (First Name & Last Name)"  id="primaryName" type="text" name="primaryName" required placeholder="Name" >
                                      <input conv-question="What is your Date of Birth?"  id="dob" type="text" name="dob" required placeholder="Date Of Birth" >
                                      <input conv-question="What is name of Insured Member 2 & Relationship? (First Name & Last Name)"  id="secondaryName" type="text" name="secondaryName" required placeholder="Name" >
                                      <input conv-question="What is Date of Birth of Insured Member 2?"  id="dob2" type="text" name="dob2" required placeholder="Date Of Birth" >
                                      <input conv-question="What is your desired coverage amount (in Rupees)?"  id="coverAmt" type="text" name="coverAmt" required placeholder="CoverAmt" >
                                      <input conv-question="What is your preferred location of Treatment?"  id="coverAmt" type="text" name="coverAmt" required placeholder="CoverAmt" >
                                      <input conv-question="The Basic Premium for your plan is Rs 6645/-."  id="quoteResult" type="text" name="quoteResult"  no-answer="true" >
                                      <select  conv-question="Would you like to make payment?">
                                        <option value="Yes" callback="outerFunction">Yes</option>
                                        <option value="No" callback="outerFunction">No</option>
                                      </select>
                                      <input type="text" conv-question="Cool, Payment link will come here." no-answer="true">
                                    </div>
                                    <div conv-case="Individual">
                                      <input type="text" conv-question="This case is not covered in the demo." no-answer="true">
                                    </div>
                                  </div>
                                </div>
                                <div conv-case="Key Feature">
                                  <input type="text" conv-question="Wide Coverage – From Rs. 50,000 up to Rs. 500,000" no-answer="true">
                                  <input type="text" conv-question="No medical test up to the age of 45 for people with no medical history" no-answer="true">
                                  <input type="text" conv-question="Family Floater benefit giving comprehensive protection to your family members under one single Policy" no-answer="true">
                                  <input type="text" conv-question="Flexible Plan Options–Metro Plan, Semi Metro Plan & Rest of India" no-answer="true">
                                  <input type="text" conv-question="Assured renewal" no-answer="true">
                                  <input type="text" conv-question="You can now renew your current Health Insurance Policy (any Insurer) with us" no-answer="true">
                                  <input type="text" conv-question="The premium paid is exempt from Income Tax under Sec 80 D of Income Tax Act (Tax Benefits are subject to change in tax laws)" no-answer="true">
                                  <input type="text" conv-question="Coverage of Pre-and Post Hospitalisation Expenses - 30 days before and 60 days after the hospitalisation" no-answer="true">
                                  <input type="text" conv-question="Free Medical check-up for every 4 claim free years up to a maximum limit of Rs.2,500" no-answer="true">
                                  <input type="text" conv-question="Add-on Covers available including removal of sub-limits on Room & ICU rent, Operation and Consultancy charges' after Flexible Plan options'... point" no-answer="true">
                                </div>
                              </div>

                            </div>
                            <!-- New User Case End-->   
                            <!-- Existing User Case -->   
                            <div conv-case="Existing">
                              <input type="text" conv-question="Please enter your 16-digit policy number" id="policyNumber" name="policyNumber" required placeholder="Enter Policy Number" >
                              <input type="text" conv-question="Please enter your DOB in DD/MM/YYY format" id="existingDob" name="existingDob" required placeholder="Date Of Birth" >
                              <select  name="existingCustomerChoices" conv-question="Thanks for providing the information. Below are the services I can help you with:">
                                <option value="Service Request" callback="outerFunction">Service Request</option>
                                <option value="Grievance" callback="outerFunction">Grievance</option>
                                <option value="Query" callback="outerFunction">Query</option>
                              </select>
                              <div conv-fork="existingCustomerChoices">
                                <div conv-case="Service Request">
                                  <select name="policyDeliveryErr" conv-question="Please select either of the options below">
                                    <option value="Policy not received" callback="outerFunction">Policy not received</option>
                                    <option value="Other" callback="outerFunction">Other</option>
                                  </select>
                                  <div conv-fork="policyDeliveryErr">
                                    <div conv-case="Policy not received"> 
                                      <input type="text" conv-question="Sorry for the inconvenience! Please let me check the status." no-answer="true">
                                      <select name="nested" conv-question="Your Policy No – 0000000000000970 is out for Delivery and would reach you by 26-09-2017. Is there anything else I can help you with?">
                                        <option value="Query1" callback="outerFunction">Query</option>
                                        <option value="Grievance1" callback="outerFunction">Grievance</option>
                                        <option value="Service Request1" callback="outerFunction">Service Request</option>

                                      </select>

                                      <div conv-fork="nested">
                                        <div conv-case="Query1"> 
                                          <select  conv-question="Please select either of the options below">
                                            <option value="Cancellation Process" callback="outerFunction">Cancellation Process</option>
                                            <option value="Claims status" callback="outerFunction">Claims status</option>
                                          </select>
                                          <input type="text" conv-question="Policy can be cancelled and unused premium can be refunded on short period basis provided alternate insurance proof is provided and there is no claim in the policy. In case of claim in the policy no refund shall be there." no-answer="true">
                                        </div> 

                                      </div>
                                    </div>
                                    <div conv-case="Other"> 

                                      <input type="text" conv-question="This action is not implemented for this demo." no-answer="true">
                                    </div>


                                  </div>



                                </div>
                                <div conv-case="Grievance">
                                  <input type="text" conv-question="This action is not implemented for this demo." no-answer="true">
                                </div>
                                <div conv-case="Query">
                                  <select name="typeOfQueryExistingBot" conv-question="Please choose type of query?">
                                    <option value="Policy related9" callback="outerFunction">Policy related</option>
                                    <option value="Custom8" callback="outerFunction">Custom</option>
                                  </select>
                                  <div conv-fork="typeOfQueryExistingBot">

                                    <div conv-case="Policy related9">
                                      <input conv-question="Type in your Policy number below"  id="on11" type="text" name="on11" required placeholder="Policy number" >
                                    </div>
                                    <div conv-case="Custom8">
                                      <input conv-question="Type in your query below?"  id="q8" type="text" name="q8" required placeholder="Type your Query" >
                                    </div>
                                  </div>
                                </div>

                              </div>

                            </div>
                            <!-- Existing User Case End-->   
                          </div>

                        </div>
                        <!--Dialog Flow End-->
                        <!--Bot Flow-->
                        <div conv-case="Bot">
                          <select name="typeOfQueryBot" conv-question="Please choose type of query?">
                            <option value="Policy related7" callback="outerFunction">Policy related</option>
                            <option value="Custom2" callback="outerFunction">Custom</option>
                          </select>
                          <div conv-fork="typeOfQueryBot">

                            <div conv-case="Order related1">
                              <input conv-question="Type in your Policy number below"  id="on1" type="text" name="on1" required placeholder="Policy number" >
                            </div>
                            <div conv-case="Custom2">
                              <input conv-question="Type in your query below?"  id="q31" type="text" name="q31" required placeholder="Type your Query" >
                            </div>
                          </div>

                        </div>
                        <!--Bot Flow End-->
                        <!--Query Flow-->
                        <div conv-case="LiveChat">
                          <input type="text" conv-question="Please wait while we find an Agent for you." >
                        </div>
                        <!--Query Flow End-->
                      </div>

                      <input type="text" conv-question="Cool. This flow is completed." no-answer="true">
                      <input type="text" conv-question="Query flow will begin now." no-answer="true">
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
