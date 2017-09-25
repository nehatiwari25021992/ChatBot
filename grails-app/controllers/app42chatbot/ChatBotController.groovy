package app42chatbot
import org.codehaus.groovy.grails.commons.ConfigurationHolder as confHolder
import grails.converters.JSON
class ChatBotController {
    def maService
    def chatBotService
    def baseURL = confHolder.config.app.baseURL
     
    def index = { 
        session["user"] = "demo@shephertz.com"
        def user = session["user"]
        [userId:user,baseURL:baseURL]
    
    }
    
    def dialogFrame = { 
        println params
        session["user"] = "demo@shephertz.com"
        def user = session["user"]
        def pParams = [:]
        pParams.appId = params.id
        def data  = chatBotService.getDialog(pParams)
      
        //        def data = '{"cells":[{"type":"qad.Question","optionHeight":30,"questionHeight":45,"paddingBottom":30,"minWidth":150,"ports":{"groups":{"in":{"position":"top","attrs":{"circle":{"magnet":"passive","stroke":"white","fill":"#feb663","r":14},"text":{"pointerEvents":"none","fontSize":12,"fill":"white"}},"label":{"position":{"name":"left","args":{"x":5}}}},"out":{"position":"right","attrs":{"circle":{"magnet":true,"stroke":"none","fill":"#31d0c6","r":14}}}},"items":[{"group":"in","attrs":{"text":{"text":"in"}},"id":"d1e23b1e-c1fc-42be-9da2-735eaf324b5c"},{"group":"out","id":"yes","args":{"y":60}},{"group":"out","id":"no","args":{"y":90}},{"group":"out","id":"option-74","args":{"y":120}}]},"position":{"x":45,"y":38},"size":{"width":150.3046875,"height":165},"angle":0,"question":"Does the thing work?","options":[{"id":"yes","text":"Yes"},{"id":"no","text":"No"},{"id":"option-74","text":"Maybe"}],"id":"d849d917-8a43-4d51-9e99-291799c144db","z":1,"attrs":{".options":{"refY":45},".question-text":{"text":"Does the thing work?"},".inPorts>.port-in>.port-label":{"text":"In"},".inPorts>.port-in>.port-body":{"port":{"id":"in","type":"in","label":"In"}},".inPorts>.port-in":{"ref":".body","ref-x":0.5},".option-yes":{"transform":"translate(0, 0)","dynamic":true},".option-yes .option-rect":{"height":30,"dynamic":true},".option-yes .option-text":{"text":"Yes","dynamic":true,"refY":15},".option-no":{"transform":"translate(0, 30)","dynamic":true},".option-no .option-rect":{"height":30,"dynamic":true},".option-no .option-text":{"text":"No","dynamic":true,"refY":15},".option-option-74":{"transform":"translate(0, 60)","dynamic":true},".option-option-74 .option-rect":{"height":30,"dynamic":true},".option-option-74 .option-text":{"text":"Maybe","dynamic":true,"refY":15}}},{"type":"qad.Answer","position":{"x":464,"y":68},"size":{"width":223.796875,"height":66.8},"angle":0,"inPorts":[{"id":"in","label":"In"}],"outPorts":[{"id":"yes","label":"Yes"},{"id":"no","label":"No"}],"answer":"Don't mess about with it.","id":"4073e883-1cc6-46a5-b22d-688ca1934324","z":2,"attrs":{"text":{"text":"Don't mess about with it."}}},{"type":"link","source":{"id":"d849d917-8a43-4d51-9e99-291799c144db","selector":"g:nth-child(1) g:nth-child(3) g:nth-child(1) g:nth-child(4) circle:nth-child(1)      ","port":"yes"},"target":{"id":"4073e883-1cc6-46a5-b22d-688ca1934324"},"router":{"name":"manhattan"},"connector":{"name":"rounded"},"id":"9d87214a-7b08-47ce-9aec-8e49ed7ae929","embeds":"","z":3,"attrs":{".marker-target":{"d":"M 10 0 L 0 5 L 10 10 z","fill":"#6a6c8a","stroke":"#6a6c8a"},".connection":{"stroke":"#6a6c8a","strokeWidth":2}}},{"type":"qad.Question","optionHeight":30,"questionHeight":45,"paddingBottom":30,"minWidth":150,"ports":{"groups":{"in":{"position":"top","attrs":{"circle":{"magnet":"passive","stroke":"white","fill":"#feb663","r":14},"text":{"pointerEvents":"none","fontSize":12,"fill":"white"}},"label":{"position":{"name":"left","args":{"x":5}}}},"out":{"position":"right","attrs":{"circle":{"magnet":true,"stroke":"none","fill":"#31d0c6","r":14}}}},"items":[{"group":"in","attrs":{"text":{"text":"in"}},"id":"8f575f02-eb58-4933-9bb0-c581d6c10de6"},{"group":"out","id":"yes","args":{"y":60}},{"group":"out","id":"no","args":{"y":90}},{"group":"out","id":"option-122","args":{"y":120}}]},"position":{"x":55,"y":245},"size":{"width":195.6484375,"height":165},"angle":0,"question":"Did you mess about with it?","options":[{"id":"yes","text":"Yes"},{"id":"no","text":"No"},{"id":"option-122","text":"Maybe"}],"id":"8ce3f820-54f0-41f0-a46c-1e4f57b5f91e","z":4,"attrs":{".options":{"refY":45},".question-text":{"text":"Did you mess about with it?"},".inPorts>.port-in>.port-label":{"text":"In"},".inPorts>.port-in>.port-body":{"port":{"id":"in","type":"in","label":"In"}},".inPorts>.port-in":{"ref":".body","ref-x":0.5},".option-yes":{"transform":"translate(0, 0)","dynamic":true},".option-yes .option-rect":{"height":30,"dynamic":true},".option-yes .option-text":{"text":"Yes","dynamic":true,"refY":15},".option-no":{"transform":"translate(0, 30)","dynamic":true},".option-no .option-rect":{"height":30,"dynamic":true},".option-no .option-text":{"text":"No","dynamic":true,"refY":15},".option-option-122":{"transform":"translate(0, 60)","dynamic":true},".option-option-122 .option-rect":{"height":30,"dynamic":true},".option-option-122 .option-text":{"text":"Maybe","dynamic":true,"refY":15}}},{"type":"qad.Answer","position":{"x":343,"y":203},"size":{"width":125.59375,"height":66.8},"angle":0,"inPorts":[{"id":"in","label":"In"}],"outPorts":[{"id":"yes","label":"Yes"},{"id":"no","label":"No"}],"answer":"Run away!","id":"7da45291-2535-4aa1-bb50-5cadd2b2fb91","z":5,"attrs":{"text":{"text":"Run away!"}}},{"type":"link","source":{"id":"8ce3f820-54f0-41f0-a46c-1e4f57b5f91e","selector":"g:nth-child(1) g:nth-child(3) g:nth-child(1) g:nth-child(4) circle:nth-child(1)      ","port":"yes"},"target":{"id":"7da45291-2535-4aa1-bb50-5cadd2b2fb91"},"router":{"name":"manhattan"},"connector":{"name":"rounded"},"id":"fd9f3367-79b9-4f69-b5b7-2bba012e53bb","embeds":"","z":6,"attrs":{".marker-target":{"d":"M 10 0 L 0 5 L 10 10 z","fill":"#6a6c8a","stroke":"#6a6c8a"},".connection":{"stroke":"#6a6c8a","stroke-width":2}}},{"type":"qad.Question","optionHeight":30,"questionHeight":45,"paddingBottom":30,"minWidth":150,"ports":{"groups":{"in":{"position":"top","attrs":{"circle":{"magnet":"passive","stroke":"white","fill":"#feb663","r":14},"text":{"pointerEvents":"none","fontSize":12,"fill":"white"}},"label":{"position":{"name":"left","args":{"x":5}}}},"out":{"position":"right","attrs":{"circle":{"magnet":true,"stroke":"none","fill":"#31d0c6","r":14}}}},"items":[{"group":"in","attrs":{"text":{"text":"in"}},"id":"55dc7b01-2e0e-4b94-b9d7-1438f9c117d6"},{"group":"out","id":"yes","args":{"y":60}},{"group":"out","id":"no","args":{"y":90}}]},"position":{"x":238,"y":429},"size":{"width":155.6171875,"height":135},"angle":0,"question":"Will you get screwed?","options":[{"id":"yes","text":"Yes"},{"id":"no","text":"No"}],"id":"fd3e0ab4-fd3a-4342-972b-3616e0c0a5cf","z":7,"attrs":{".options":{"refY":45},".question-text":{"text":"Will you get screwed?"},".inPorts>.port-in>.port-label":{"text":"In"},".inPorts>.port-in>.port-body":{"port":{"id":"in","type":"in","label":"In"}},".inPorts>.port-in":{"ref":".body","ref-x":0.5},".option-yes":{"transform":"translate(0, 0)","dynamic":true},".option-yes .option-rect":{"height":30,"dynamic":true},".option-yes .option-text":{"text":"Yes","dynamic":true,"refY":15},".option-no":{"transform":"translate(0, 30)","dynamic":true},".option-no .option-rect":{"height":30,"dynamic":true},".option-no .option-text":{"text":"No","dynamic":true,"refY":15}}},{"type":"link","source":{"id":"d849d917-8a43-4d51-9e99-291799c144db","selector":"g:nth-child(1) g:nth-child(3) g:nth-child(2) g:nth-child(4) circle:nth-child(1)      ","port":"no"},"target":{"id":"8ce3f820-54f0-41f0-a46c-1e4f57b5f91e","selector":"g:nth-child(1) g:nth-child(4) g:nth-child(1) circle:nth-child(1)     ","port":"in"},"router":{"name":"manhattan"},"connector":{"name":"rounded"},"id":"641410b2-aeb5-42ad-b757-2d9c6e4d56bd","embeds":"","z":8,"attrs":{".marker-target":{"d":"M 10 0 L 0 5 L 10 10 z","fill":"#6a6c8a","stroke":"#6a6c8a"},".connection":{"stroke":"#6a6c8a","stroke-width":2}}},{"type":"link","source":{"id":"8ce3f820-54f0-41f0-a46c-1e4f57b5f91e","selector":"g:nth-child(1) g:nth-child(3) g:nth-child(2) g:nth-child(4) circle:nth-child(1)      ","port":"no"},"target":{"id":"fd3e0ab4-fd3a-4342-972b-3616e0c0a5cf","selector":"g:nth-child(1) g:nth-child(4) g:nth-child(1) circle:nth-child(1)     ","port":"in"},"router":{"name":"manhattan"},"connector":{"name":"rounded"},"id":"3b9de57d-be21-4e9e-a73b-693b32e5f14a","embeds":"","z":9,"attrs":{".marker-target":{"d":"M 10 0 L 0 5 L 10 10 z","fill":"#6a6c8a","stroke":"#6a6c8a"},".connection":{"stroke":"#6a6c8a","stroke-width":2}}},{"type":"qad.Answer","position":{"x":545,"y":400},"size":{"width":117.296875,"height":66.8},"angle":0,"inPorts":[{"id":"in","label":"In"}],"outPorts":[{"id":"yes","label":"Yes"},{"id":"no","label":"No"}],"answer":"Poor boy.","id":"13402455-006d-41e3-aacc-514f551b78b8","z":10,"attrs":{"text":{"text":"Poor boy."}}},{"type":"qad.Answer","position":{"x":553,"y":524},"size":{"width":146.9453125,"height":66.8},"angle":0,"inPorts":[{"id":"in","label":"In"}],"outPorts":[{"id":"yes","label":"Yes"},{"id":"no","label":"No"}],"answer":"Put it in a bin.","id":"857c9deb-86c3-47d8-bc6d-8f36c5294eab","z":11,"attrs":{"text":{"text":"Put it in a bin."}}},{"type":"link","source":{"id":"fd3e0ab4-fd3a-4342-972b-3616e0c0a5cf","selector":"g:nth-child(1) g:nth-child(3) g:nth-child(1) g:nth-child(4) circle:nth-child(1)      ","port":"yes"},"target":{"id":"13402455-006d-41e3-aacc-514f551b78b8"},"router":{"name":"manhattan"},"connector":{"name":"rounded"},"id":"7e96039d-c3d4-4c86-b8e5-9a49835e114b","embeds":"","z":12,"attrs":{".marker-target":{"d":"M 10 0 L 0 5 L 10 10 z","fill":"#6a6c8a","stroke":"#6a6c8a"},".connection":{"stroke":"#6a6c8a","stroke-width":2}}},{"type":"link","source":{"id":"fd3e0ab4-fd3a-4342-972b-3616e0c0a5cf","selector":"g:nth-child(1) g:nth-child(3) g:nth-child(2) g:nth-child(4) circle:nth-child(1)      ","port":"no"},"target":{"id":"857c9deb-86c3-47d8-bc6d-8f36c5294eab"},"router":{"name":"manhattan"},"connector":{"name":"rounded"},"id":"eecaae21-3e81-43f9-a5c1-6ea40c1adba8","embeds":"","z":13,"attrs":{".marker-target":{"d":"M 10 0 L 0 5 L 10 10 z","fill":"#6a6c8a","stroke":"#6a6c8a"},".connection":{"stroke":"#6a6c8a","stroke-width":2}}},{"type":"qad.Answer","position":{"x":550,"y":210},"size":{"width":103.3515625,"height":66.8},"angle":0,"answer":"Answer","id":"3967d578-db15-45ed-aec2-9af3c8887106","z":14,"attrs":{"text":{"text":"Answer"}}},{"type":"link","source":{"id":"d849d917-8a43-4d51-9e99-291799c144db","selector":"g:nth-child(8) > circle:nth-child(1)","port":"option-74"},"target":{"id":"3967d578-db15-45ed-aec2-9af3c8887106"},"router":{"name":"manhattan"},"connector":{"name":"rounded"},"id":"049265ba-365d-40df-b235-e216316e6f6b","z":15,"attrs":{".marker-target":{"d":"M 10 0 L 0 5 L 10 10 z","fill":"#6a6c8a","stroke":"#6a6c8a"},".connection":{"stroke":"#6a6c8a","strokeWidth":2}}},{"type":"link","source":{"id":"8ce3f820-54f0-41f0-a46c-1e4f57b5f91e","selector":"g:nth-child(8) > circle:nth-child(1)","port":"option-122"},"target":{"id":"13402455-006d-41e3-aacc-514f551b78b8"},"router":{"name":"manhattan"},"connector":{"name":"rounded"},"id":"ce6971bb-b0ab-4a37-bbef-d419321ee621","z":16,"attrs":{".marker-target":{"d":"M 10 0 L 0 5 L 10 10 z","fill":"#6a6c8a","stroke":"#6a6c8a"},".connection":{"stroke":"#6a6c8a","strokeWidth":2}}}]}'
        println data
        [userId:user,data:data,baseURL:baseURL]
    
    }
    
    def getServicesByLoginChatbot = {
        def user = session["user"]
        if(!user){
            render """{failure:true, message:"Client is not authorized "}"""
            return;
        }

        def response  = chatBotService.getServicesByLoginChatbot(params, user)
        println "getServicesByLoginChatbot response "+response
        render response
    }

    
    def getChatBotStatistics = {
        def result  = chatBotService.getChatBotStatistics(params)
        render result as JSON
    }
    
    def getMostCommanPhrases = {
        def result  = chatBotService.getMostCommanPhrases(params)
        render result as JSON
    }
    
    def getMessage_in_vs_out = {
        def result  = chatBotService.getMessage_in_vs_out(params)
        render result as JSON
    }
    
    def getSentiments = {
        def result  = chatBotService.getSentiments(params)
        render result as JSON
    }
    
    def getMostActiveHours = {
        def result  = chatBotService.getMostActiveHours(params)
        render result as JSON
    }
    
    def getAllUsers = {
        def result  = chatBotService.getAllUsers(params)
        render result as JSON
    } 
    
    def getUserDetails = {
        def result  = chatBotService.getUserDetails(params)
        render result as JSON
    } 
    
    def getUserConversation = {
        def result  = chatBotService.getUserConversation(params)
        render result as JSON
    }
    
    def openConversation = {
        def result  = chatBotService.openConversation(params)
        render result as JSON
    }
    
    def saveIntent = {
        def result  = chatBotService.saveIntent(params)
        render result as JSON
    }
    
    def getAllIntent = {
        def result  = chatBotService.getAllIntent(params)
        render result as JSON
    } 
     
    def saveOrUpdateUser = {
        def result  = chatBotService.saveOrUpdateUser(params)
        render result as JSON
    }
    def tagEvent = {
        println params
        def result  = chatBotService.tagEvent(params)
        println result as JSON
        render result as JSON
    }

    def updateIntent = {
        def result  = chatBotService.updateIntent(params)
        render result as JSON
    } 
    
    def getIntentDetails = {
        def result  = chatBotService.getIntentDetails(params)
        render result as JSON
    } 
    
    def saveDialog = {
        def result  = chatBotService.saveDialog(params)
        render result as JSON
    } 
    
    def updateDialog = {
        def result  = chatBotService.updateDialog(params)
        render result as JSON
    } 
    
    def getDialog = {
        def result  = chatBotService.getDialog(params)
        render result as JSON
    }
     
    def getChatDialog = {
        def result  = chatBotService.getChatDialog(params)
        render result as JSON
    }
    
    def getUnknownIntent = {
        def result  = chatBotService.getUnknownIntent(params)
        render result as JSON
    }
    
    def updatePhrase = {
        def result  = chatBotService.updatePhrase(params)
        render result as JSON
    }
    
    def matchItToIntent = {
        def result  = chatBotService.matchItToIntent(params)
        render result as JSON 
    }
} 
