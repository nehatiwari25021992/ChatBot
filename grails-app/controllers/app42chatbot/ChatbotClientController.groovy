package app42chatbot
import org.codehaus.groovy.grails.commons.ConfigurationHolder as confHolder
import grails.converters.JSON
class ChatbotClientController {
    def chatBotService
    def baseURL = confHolder.config.app.baseURL
    def socketURL = confHolder.config.app.socketURL
    
    def index() { 
        println params
        def app = null
        if(params.name){
            app = chatBotService.getAppOrgName(params.name)
        }else{
            app = chatBotService.getAppOrgName("test") 
        }
        println app
        def chatScript = getChatScript(app)
      
       
        [baseURL:baseURL,socketURL:socketURL,app:app,chatScript:chatScript]
    }
    
    def getChatScript(app){
        def map = [:]
        map.appId = app.id
        def result = chatBotService.getDialog(map)
        def res = null
        if(result.success){
            res =  JSON.parse(result.rows.config)
        }
        //   def output = '{"root":"44cbbdc2-b0e1-4f00-8f79-2d29cb058a81","nodes":[{"id":"44cbbdc2-b0e1-4f00-8f79-2d29cb058a81","type":"qad.Question","question":"SBI Question","options":[{"id":"yes","text":"Yes"},{"id":"no","text":"No"}]},{"id":"573db98f-7361-4d9d-83c8-54ddec3b0654","type":"qad.Answer","answer":"Answer"},{"id":"7df08f43-2495-47ae-94c3-41c0180707d4","type":"qad.Question","question":"SBI Question2","options":[{"id":"yes","text":"Yes"},{"id":"no","text":"No"}]},{"id":"df04192b-c5ee-4871-bea1-bd1782caf28f","type":"qad.Answer","answer":"Answer1"},{"id":"3858ad2f-a608-400f-afdf-a207a10ade72","type":"qad.Answer","answer":"Answer2"}],"links":[{"id":"28a7c84b-cf04-4fa4-bd2f-1771c0473b23","type":"link","source":{"id":"44cbbdc2-b0e1-4f00-8f79-2d29cb058a81","selector":"g:nth-child(6) > circle:nth-child(1)","port":"yes"},"target":{"id":"573db98f-7361-4d9d-83c8-54ddec3b0654"}},{"id":"e12d4a43-189a-4462-bb49-a5dc8aa49010","type":"link","source":{"id":"44cbbdc2-b0e1-4f00-8f79-2d29cb058a81","selector":"g:nth-child(7) > circle:nth-child(1)","port":"no"},"target":{"id":"7df08f43-2495-47ae-94c3-41c0180707d4","selector":"g:nth-child(5) > circle:nth-child(1)","port":"b0b997c4-6080-489f-b8e2-0c14cd3a5121"}},{"id":"9e65f218-3080-49b3-b479-387890eb47f9","type":"link","source":{"id":"7df08f43-2495-47ae-94c3-41c0180707d4","selector":"g:nth-child(6) > circle:nth-child(1)","port":"yes"},"target":{"id":"df04192b-c5ee-4871-bea1-bd1782caf28f"}},{"id":"8faad571-80d8-42c1-9b43-4853a5bbf761","type":"link","source":{"id":"7df08f43-2495-47ae-94c3-41c0180707d4","selector":"g:nth-child(7) > circle:nth-child(1)","port":"no"},"target":{"id":"3858ad2f-a608-400f-afdf-a207a10ade72"}}]}'
        return res
        //        def map = [:]
        //        map.appId = app.id
        //        def result = chatBotService.getDialog(map)
        //        //  println result
        //        def dialog = [:]
        //        dialog.root = null
        //        dialog.nodes = []
        //        dialog.links = []
        //        
        //        if(result.success){
        //            def res =  JSON.parse(result.rows.config)
        //            res.cells.each{c->
        //                def resMap = [:]
        //                resMap.id = c.id
        //                resMap.type = c.type
        //                
        //                switch (c.type) {
        //                case 'qad.Question': 
        //                    resMap.question = c.question
        //                    resMap.options = c.options
        //                    dialog.nodes.add(resMap); 
        //                    break;
        //                case 'qad.Answer': 
        //                    resMap.answer = c.answer
        //                    dialog.nodes.add(resMap);
        //                    break;
        //                default: 
        //                    resMap.source = c.source
        //                    resMap.target = c.target
        //                    dialog.links.push(resMap);
        //                    break;
        //                }
        //            }
        //        }
    }
        

}
