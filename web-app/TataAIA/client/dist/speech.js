
var final_transcript = '';
var recognizing = false;
var muteAudio = true;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
    upgrade();
} else {
    //start_button.style.display = 'inline-block';
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
        // recognizing = true;
        //  showInfo('info_speak_now');
       
        start_img.src = baseURL+'TataAIA/client/images/mic-slash.gif';
    };

    recognition.onerror = function(event) {
        if (event.error == 'no-speech') {
            start_img.src = baseURL+'TataAIA/client/images/mic.gif';
            // showInfo('info_no_speech');
            ignore_onend = true;
        }
        if (event.error == 'audio-capture') {
            start_img.src = baseURL+'TataAIA/client/images/mic.gif';
            //   showInfo('info_no_microphone');
            ignore_onend = true;
        }
        if (event.error == 'not-allowed') {
            if (event.timeStamp - start_timestamp < 100) {
            //    showInfo('info_blocked');
            } else {
            //   showInfo('info_denied');
            }
            ignore_onend = true;
        }
    };

    recognition.onend = function() {
        recognizing = false;
        if (ignore_onend) {
            return;
        }
        start_img.src = baseURL+'TataAIA/client/images/mic.gif';
        //   document.getElementById("userInput").innerHTML = "";
        if (!final_transcript) {
            //showInfo('info_start');
            return;
        }
        // showInfo('');
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
            var range = document.createRange();
            range.selectNode(document.getElementById('userInput'));
            window.getSelection().addRange(range);
        }
    
    };

    recognition.onresult = function(event) {
        //  console.log(event);
        var interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        final_transcript = capitalize(final_transcript);
        document.getElementById("userInput").innerHTML = "";
        userInput.innerHTML = linebreak(final_transcript);
        // interim_span.innerHTML = linebreak(interim_transcript);
        if (final_transcript || interim_transcript) {
        //  showButtons('inline-block');
        }
    };
}


var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
    return s.replace(first_char, function(m) {
        return m.toUpperCase();
    });
}
function startButton(event) {
    if (recognizing) {
        recognition.stop();
        return;
    }
    
    muteAudio = false
    final_transcript = '';
//    recognition.lang = 6;
//    recognition.start();
    ignore_onend = false;
    userInput.innerHTML = '';
    //  interim_span.innerHTML = '';
    start_img.src = baseURL+'TataAIA/client/images/mic-slash.gif';
    //   showInfo('info_allow');
    //  showButtons('none');
    start_timestamp = event.timeStamp;
}

///////////////////////////Speach Synthesizer//////////////////////////

function speech_synth(msg){
    if(muteAudio){
        var u = new SpeechSynthesisUtterance();
        //u.text = document.getElementById("synth_final").value; //'Hello World';
        u.text = msg //'Hello World';
		
        u.lang = 'en-US';
        u.rate = 1.2;
        u.onend = function(event) {
        // console.log('Finished in ' + event.elapsedTime + ' seconds.');
        }
        speechSynthesis.speak(u);
    // document.getElementById("userInput").innerHTML = "";
    }
   
	
}