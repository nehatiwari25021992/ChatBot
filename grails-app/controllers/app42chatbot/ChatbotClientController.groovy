package app42chatbot
import org.codehaus.groovy.grails.commons.ConfigurationHolder as confHolder
import grails.converters.JSON
class ChatbotClientController {
    def chatBotService
    def baseURL = confHolder.config.app.baseURL
    def socketURL = confHolder.config.app.socketURL
    
    def index() { 
        def app = null
        if(params.name){
            app = chatBotService.getAppOrgName(params.name)
        }else{
            app = chatBotService.getAppOrgName("test") 
        }
       
        def chatScript = getChatScript(app)
      
        [baseURL:baseURL,socketURL:socketURL,app:app,chatScript:chatScript]
    }
    def dialog() { 
        def app = null
        if(params.name){
            app = chatBotService.getAppOrgName(params.name)
        }else{
            app = chatBotService.getAppOrgName("test") 
        }
      
        def chatScript = getChatScript(app)
        println chatScript
        [baseURL:baseURL,socketURL:socketURL,app:app,chatScript:chatScript]
    }
    
       def sbi() { 
        def app = null
        if(params.name){
            app = chatBotService.getAppOrgName(params.name)
        }else{
            app = chatBotService.getAppOrgName("test") 
        }
      
        def chatScript = getChatScript(app)
        println chatScript
        [baseURL:baseURL,socketURL:socketURL,app:app,chatScript:chatScript]
    }
    
    def getChatScript(app){
        def map = [:]
        map.appId = app.id
        def result = chatBotService.getChatDialog(map)
        def res = null
        if(result.success){
            res =  JSON.parse(result.rows.chatConfig)
        }
        return res
    }
        

}
