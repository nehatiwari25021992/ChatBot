package app42chatbot

import grails.converters.JSON
import grails.util.GrailsUtil
import groovy.json.JsonSlurper
import groovy.sql.Sql
import java.nio.ByteBuffer
import java.sql.Timestamp
import java.text.DateFormat
import java.text.SimpleDateFormat

import org.codehaus.groovy.grails.commons.ConfigurationHolder as confHolder
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;
import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;
import java.text.DecimalFormat;
import java.text.Format 
import java.util.concurrent.TimeUnit
class ChatBotService {

    boolean transactional = true
    def dataSource
    def serviceMethod() {

    }
    
    public static String getUTCDate(Date date) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        return df.format(date);
    }
    def getDatesFromRange(start,end){
        def startDate = Date.parse("yyyy-MM-dd", start)
        def endDate = Date.parse("yyyy-MM-dd", end)
        def startDateMs = startDate.getTime()       
        def endDateMs = endDate.getTime()       
        def numberOfDays = (endDateMs.minus(startDateMs))/86400000
        def resultDates = [];
        int count = 1;
        resultDates.add("'"+getUTCDate(startDate)+"'");
        if(numberOfDays != 0){
            while (count < numberOfDays){
                def incDate = getUTCDate(startDate+count)
                resultDates.add("'$incDate'");
                count ++;
            }
            resultDates.add("'"+getUTCDate(endDate)+"'"); 
        }
        
        return resultDates
    }
    
    def getChatBotStatistics(params){
        def jsonMap = [:]
        jsonMap.totalMessages = 0
        jsonMap.totalConversations = 0
        jsonMap.totalUser = 0
        jsonMap.averageConversationPerUser = 0
        jsonMap.averageConversationStepsPerUser  = 0
        jsonMap.totalSent = 0
        jsonMap.totalRecieved = 0
        jsonMap.average_session = 0
        def appId = params.appId.toLong() 
        def db = new Sql(dataSource)
        
        def sqlQuery  = "select count(*) as totalCount from messages where app_id = ?";
        def rows = db.firstRow(sqlQuery,[appId])
        if(rows != null && rows.totalCount != 0){
            jsonMap.totalMessages = rows.totalCount
        }
        
        sqlQuery  = "select count(id) as totalCount from conversations where app_id = ?";
        def rowsconversation = db.firstRow(sqlQuery,[appId])
        if(rowsconversation != null && rowsconversation.totalCount != 0){
            jsonMap.totalConversations = rowsconversation.totalCount
        }
        
        sqlQuery  = "select COUNT(DISTINCT user_id) as totalCount from conversations where app_id = ?";
        def rowsuser = db.firstRow(sqlQuery,[appId])
        if(rowsuser != null && rowsuser.totalCount != 0){
            jsonMap.totalUser = rowsuser.totalCount
        }
        
        sqlQuery  = "select COUNT(id) as totalCount,user_id from conversations where app_id = ? group by user_id";
        def rowsavguser = db.rows(sqlQuery,[appId])
        if(rowsavguser != null && rowsavguser.size() != 0){
            def totalCv = 0
            rowsavguser.each{r->
                totalCv = totalCv+r.totalCount
            }
            jsonMap.averageConversationPerUser = totalCv/rowsavguser.size()
        }
        
        sqlQuery  = "select SUM(no_of_steps) as totalCount,COUNT(id) as user,user_id from conversations where app_id = ? group by user_id";
        def rowsavguserPrSp = db.rows(sqlQuery,[appId])
        if(rowsavguserPrSp != null && rowsavguserPrSp.size() != 0){
            def totalCv = 0
            def totalUser = 0
            rowsavguserPrSp.each{r->
                totalCv = totalCv+r.totalCount
                totalUser = totalUser + r.user
            }
            jsonMap.averageConversationStepsPerUser = totalCv/totalUser
        }
        
        sqlQuery  = "select count(id) as totalCount from messages where app_id = ? and message_from = ?";
        def rowsSent = db.firstRow(sqlQuery,[appId,'chatbot'])
        if(rowsSent != null && rowsSent.size() != 0){
            jsonMap.totalSent = rowsSent.totalCount
        }
        
        sqlQuery  = "select count(id) as totalCount from messages where app_id = ? and message_from =?";
        def rowsRecieved = db.firstRow(sqlQuery,[appId, 'user'])
        if(rowsRecieved != null && rowsRecieved.size() != 0){
            jsonMap.totalRecieved = rowsRecieved.totalCount
        }  
        
        sqlQuery  = "select end_time as end_date,start_time as start_date , id from conversations where app_id = ?";
        def rowsDiff = db.rows(sqlQuery,[appId])
        println "rowsDiff ::::::::::::::::  "+rowsDiff
        if(rowsDiff != null && rowsDiff.size() != 0){
            def  diff = 0
            def rowsize = rowsDiff.size()
            rowsDiff.each{ r ->              
                def diffInMillies = r.end_date.getTime() - r.start_date.getTime();
                println 'diffInMillies ::::::::::::::: '+diffInMillies 
                diff = diff+diffInMillies           
            }
            def millis =  diff/ rowsize
            def average_session_length = 0
            println 'millis.intValue() ::::::::::::::: '+millis.intValue() 
           

            average_session_length =  millis.intValue()
            if(average_session_length != 0 ){
                if(average_session_length <= 60000){            
                    long seconds = TimeUnit.MILLISECONDS.toSeconds(millis.intValue());           
                    println 'seconds ::::::::::::::: '+seconds
                    average_session_length = seconds + " sec"
                }else if(average_session_length > 60000 && average_session_length <= 3600000){
                    long minutes = TimeUnit.MILLISECONDS.toMinutes(millis.intValue());
                    println 'minutes ::::::::::::::: '+minutes
                    average_session_length = minutes + " min"
                }else if(average_session_length > 3600000 ){
                    long hours = TimeUnit.MILLISECONDS.toHours(millis.intValue());
                    println 'hours ::::::::::::::: '+hours
                    average_session_length = hours + " hour"
                }
            }
            jsonMap.average_session = average_session_length
            println 'average_session_length ::::::::::::::: '+average_session_length
        }    
        jsonMap
    }
    
    def getMostCommanPhrases(params){
        def jsonMap = [:]
        def resultArr = []
        jsonMap.data = []
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        def sqlQuery  = "select phrase,count from phrases where app_id = ? and resolved = ? order by count desc limit 5";
        def rows = db.rows(sqlQuery,[appId,1])
        if(rows != null && rows.size()>0){
            sqlQuery  = "select SUM(count) as phraseCount from phrases where app_id = ? and resolved = ?  order by count ";
            def rows1 = db.firstRow(sqlQuery,[appId,1])
            def totalPhraseCount = rows1.phraseCount
            rows.each{r->
                def resultMap = [:]
                resultMap.phrases = r.phrase
                resultMap.percentage = (r.count/totalPhraseCount)*100
                resultArr.add(resultMap)
            }
            jsonMap.data = resultArr
        }   
        jsonMap
    }
    
    def getMostActiveHours(params){
        def jsonMap = [:]
        def resultArr = []
        jsonMap.data = []
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        def sqlQuery  = "SELECT DATE_FORMAT( end_time,  '%H:%i' ) AS END , DATE_FORMAT( start_time,  '%H:%i' ) AS START FROM conversations ORDER BY END DESC ";
        def rows = db.rows(sqlQuery,[appId])
        jsonMap
    }
    
    def getMessage_in_vs_out(params){
        def jsonMap = [:]
        def resultArr = []
        jsonMap.message_in = []
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        
        def dates = getDatesFromRange(params.start,params.end)
        def dateCountMap = [:]
        def dateCountMap1 = [:]
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        for (int i = 0; i < dates.size(); i++) {
            Date d = formatter.parse(dates[i].replaceAll("'", ""))
            dateCountMap.put(d.getTime(), 0);
            dateCountMap1.put(d.getTime(), 0);
        }
        String dt = params.end;  // Start date
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        c.setTime(sdf.parse(dt));
        c.add(Calendar.DATE, 1);  // number of days to add
        dt = sdf.format(c.getTime());
        def sqlQuery  = "select  DATE_FORMAT( created_on,  '%Y-%m-%d' ) AS mDate, id from messages where app_id = ? and message_from = ? and created_on < ? and created_on >= ? ";
        def rowsSent = db.rows(sqlQuery,[appId,'chatbot',dt,params.start])
        rowsSent.each{row1->
            Date d = formatter.parse(row1.mDate)
            dateCountMap[d.getTime()] = dateCountMap[d.getTime()] + 1
        }
        
        def dataArr = []
        def keys = dateCountMap.keySet()
        keys.each{kv->
            def resultMap = []
            resultMap.add(kv)
            resultMap.add(dateCountMap[kv])
            dataArr.add(resultMap) 
        }
        jsonMap.message_in = dataArr
        
        
        sqlQuery  = "select  DATE_FORMAT( created_on,  '%Y-%m-%d' ) AS mDate, id from messages where app_id = ? and message_from = ? and created_on < ? and created_on >= ? ORDER BY created_on DESC";
        rowsSent = db.rows(sqlQuery,[appId,'user',dt,params.start])
        rowsSent.each{row1->
            Date d = formatter.parse(row1.mDate)
            dateCountMap1[d.getTime()] = dateCountMap1[d.getTime()] + 1
        }
        
        def dataArr1 = []
        keys.each{kv->
            def resultMap = []
            resultMap.add(kv)
            resultMap.add(dateCountMap1[kv])
            dataArr1.add(resultMap) 
        }
        jsonMap.message_out = dataArr1
        
        def inMap = [:]
        inMap.name = "Message In"
        inMap.data = dataArr1
        def outMap = [:]
        outMap.name = "Message Out"
        outMap.data = dataArr
        resultArr.add(inMap)
        resultArr.add(outMap)
        resultArr
    }
    
    def getAllUsers(params){
        def jsonMap = [:]
        jsonMap.data  = []
        def userArr = []
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        
        def sqlQuery  = "select name,id,created_on  from users  where app_id = ?";
        def rows= db.rows(sqlQuery,[appId])
        rows.each{ r->
            def user = [:]
            user.name = r.name
            user.id = r.id
            user.first_seen = r.created_on
            sqlQuery  = "select created_on from messages where app_id = ? and user_id=? order by created_on desc ";
            def rows1= db.firstRow(sqlQuery,[appId,r.id])
            if(rows1 != null){
                user.last_seen = rows1.created_on
            }else{
                user.last_seen = r.created_on
            }
           
            sqlQuery  = "select count(id) as count from conversations where app_id = ? and user_id=?  ";
            def rows3= db.firstRow(sqlQuery,[appId,r.id])
            if(rows3 != null){
                user.total_conversation = rows3.count
            }else{
                user.total_conversation = 0
            }
          
            
            sqlQuery  = "select no_of_steps as steps from conversations where app_id = ? and user_id=?  order by no_of_steps desc";
            def rows4= db.firstRow(sqlQuery,[appId,r.id])
            user.max_conversation_steps = 0
            if(rows4 != null && rows4.steps != null){
                user.max_conversation_steps = rows4.steps
            }
            
            sqlQuery  = "select no_of_steps as steps from conversations where app_id = ? and user_id=?  order by no_of_steps ASC";
            def rows5= db.firstRow(sqlQuery,[appId,r.id])
            user.min_conversation_steps = 0
            if(rows5 != null && rows5.steps != null){
                user.min_conversation_steps = rows5.steps
            }
            userArr.add(user)
        }
        userArr
    }
    
    def getUserDetails(params){
        def jsonMap = [:]
        jsonMap.data  = []
        def userArr = []
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        def userId = params.userId
        
        def sqlQuery  = "select name,id,created_on from users where app_id = ? and id = ?"
        def r= db.firstRow(sqlQuery,[appId,userId])
        def user = [:]
        user.name = r.name
        user.first_seen = r.created_on
        sqlQuery  = "select created_on from messages where app_id = ? and user_id=? order by created_on desc ";
        def rows1= db.firstRow(sqlQuery,[appId,r.id])
        user.last_seen = ""
        if(rows1 != null){
            user.last_seen = rows1.created_on
        }else{
            user.last_seen = r.created_on
        }

           
        sqlQuery  = "select count(id) as count from conversations where app_id = ? and user_id=?  ";
        def rows3= db.firstRow(sqlQuery,[appId,r.id])
        user.total_conversation = 0
        if(rows3 != null){
            user.total_conversation = rows3.count
        }
            
        sqlQuery  = "select no_of_steps as steps from conversations where app_id = ? and user_id=?  order by no_of_steps desc";
        def rows4= db.firstRow(sqlQuery,[appId,r.id])
        user.max_conversation_steps = 0
        if(rows4 != null && rows4.steps != null){
            user.max_conversation_steps = rows4.steps
        }
                        
        sqlQuery  = "select no_of_steps as steps from conversations where app_id = ? and user_id=?  order by no_of_steps ASC";
        def rows5= db.firstRow(sqlQuery,[appId,r.id])
        user.min_conversation_steps = 0
        if(rows5 != null && rows5.steps != null){
            user.min_conversation_steps = rows5.steps
        }
        user
    }
    
    def getUserConversation(params){
        def jsonMap = [:]
        jsonMap.data  = []
        def messageArr = []
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        def userId = params.userId
        def sqlQuery  = "select id  from conversations where app_id = ? and user_id=? ";
        def rows3= db.rows(sqlQuery,[appId,userId])
        rows3.each{r->
            sqlQuery  = "select created_on,message,conversation_id from messages where app_id = ? and user_id=? and conversation_id = ? order by created_on DESC ";
            def rows2= db.firstRow(sqlQuery,[appId,userId,r.id])
            if(rows2 != null){
                messageArr.add(rows2)
            }
        }
        jsonMap.data  = messageArr
        jsonMap
    }
    
    def openConversation(params){
        // println "openConversation params :::::::: "+params
        def jsonMap = [:]
        jsonMap.data  = []
        def userList = []
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        def userId = params.userId
        def userName = params.userName
        def conversationId = params.conversation_id
        println "conversationId ::::::: "+conversationId
        def sqlQuery  = "select id,message_from,message,created_on  from messages where app_id = ? and user_id=?  and conversation_id = ? order by created_on desc ";
        def rows3= db.rows(sqlQuery,[appId,userId,conversationId])
        println "rows3 ::::::: "+rows3
        rows3.each{r->   
            def userMap = [:]
            if(r.message_from == "chatbot"){
                userMap.name = userName
                userMap.position = true
            }else{ 
                userMap.name = "admin"
                userMap.position = false
            }
            userMap.createdOn = r.created_on
            userMap.message = r.message
            userList.push(userMap)  
        }
        //println "userList :::::::: "+userList
        userList
    }
    
    def saveIntent(params){
        println "saveIntent params "+params
        def jsonMap = [:]
        jsonMap.success  = true
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        def appName = params.appName
        //  try{
        def sqlQuery  = "select id from intents where app_id = ? ";
        def rows= db.firstRow(sqlQuery,[appId])
        if(rows != null){
            saveTag(params,rows.id)
            
        }else{
            println "appName "+appName
            println "appId  "+appId
            sqlQuery  = "INSERT INTO `intents` ( `name`, `description`, `app_id`,default_welcome, default_fall_back,bot_name)VALUES(?,?,?,?,?,?)";
            def row1 = db.executeInsert(sqlQuery,[appName,appName,appId,"This is Alice, How can I help you ? ","I did'nt understand your question, can you please rephrase or type help to get assistance","Alice"])
            if(row1 != null){
                saveTag(params,row1[0][0])
            }
        }
        //        }catch(Exception e){
        //            println "Exception in add intent :: "+e
        //            jsonMap.success = false
        //        }
        jsonMap 
    }
    
    def saveTag(params,intent_id){
        println "saveIntent params intent_id"+intent_id
        def jsonMap = [:]
        jsonMap.data  = []
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        def appName = params.appName
        def sqlQuery  = "INSERT INTO tags ( `name`, `description`, `app_id`,`intent_id`) VALUES (?,?,?,?);";
        def rows2 = db.executeInsert(sqlQuery,[params.intentName,params.description,appId,intent_id])
        def tagId = rows2[0][0]
        if(params.userExpList != null){
            if(params.userExpList instanceof String){
                sqlQuery  = "INSERT INTO patterns ( `name`, `description`, `tag_id`) VALUES (?,?,?);";
                def rows3 = db.executeInsert(sqlQuery,[params.userExpList,"-",tagId])
            }else{
                params.userExpList.each{u->
                    sqlQuery  = "INSERT INTO patterns ( `name`, `description`, `tag_id`) VALUES (?,?,?);";
                    def rows3 = db.executeInsert(sqlQuery,[u,"-",tagId])
                }   
            }
        }
        if(params.actions != null && params.actions  != ""){
            sqlQuery  = "INSERT INTO actions ( `name`, `description`, `tag_id`) VALUES (?,?,?);";
            def rows4 = db.executeInsert(sqlQuery,[params.actions,"-",tagId])  
        }
        
        if(params.resposneList != null){
            if(params.resposneList instanceof String){
                sqlQuery  = "INSERT INTO responses ( `name`, `description`, `tag_id`) VALUES (?,?,?);";
                def rows5 = db.executeInsert(sqlQuery,[params.resposneList,"-",tagId])
            }else{
           
                params.resposneList.each{u->
                    sqlQuery  = "INSERT INTO responses ( `name`, `description`, `tag_id`) VALUES (?,?,?);";
                    def rows5 = db.executeInsert(sqlQuery,[u,"-",tagId])
                }  
            }
        }
    }
    
    def getAllIntent(params){
        def jsonMap = [:]
        jsonMap.data  = []
        def intentArr = []
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        
        def sqlQuery  = "select name,id,description from tags where app_id = ? order by id desc ";
        def rows= db.rows(sqlQuery,[appId])
        rows.each{ r->
            def nt = [:]
            nt.name = r.name
            nt.id = r.id
            nt.description = r.description
            intentArr.add(nt)
        }
        intentArr
    }
    
    def saveOrUpdateUser(data){
        def result = [success:false,message:"Something went wrong"]
        def db = new Sql(dataSource)
        def appQuery = "select s.id as id from service as s where s.api_key = ? and s.secret_key=?"
        def app = db.firstRow(appQuery,[data.apiKey,data.secretKey])
        if(app == null){
            result.message = "Unauthorized client."
        }else{
            def usrQuery = "select u.id as id from users as u where u.app_id = ? and u.email=?"
            def user = db.firstRow(usrQuery,[app.id,data.email])
            if(user == null){
                def query = "insert into users (email,name,phone,app_id,created_on,updated_on) values (?,?,?,?,Now(),Now())"
                def res = db.executeInsert(query, [data.email, data.name, data.phone,app.id])
                result.userId = res[0][0]
            }else{
                def query = "update users set name=?, phone=? where app_id=? and id=?"
                def res = db.executeUpdate(query, [data.name, data.phone,app.id,user.id])
                result.userId = user.id
            }
            def conversationQuery = "insert into conversations (user_id,app_id,no_of_steps,start_time,end_time) values (?,?,?,Now(),Now())"
            def resConverstation = db.executeInsert(conversationQuery, [result.userId, app.id,0])
            result.cId = resConverstation[0][0]
            result.appId = app.id
            result.message = "successful"
            result.success = true
            
        }
        result
    }

    
    def getIntentDetails(params){
        println "getIntentDetails params "+params
        def jsonMap = [:]
        jsonMap.name  = ""
        jsonMap.description  =  ""
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        def intentId = params.intentId
        def sqlQuery  = "select name, description from tags where app_id = ? and id = ?";
        def rows2 = db.firstRow(sqlQuery,[appId,intentId])
        jsonMap.name  = rows2.name
        jsonMap.description  = rows2.description
        
        sqlQuery  = "select `name`,id from patterns where  tag_id = ?";
        def rows3 = db.rows(sqlQuery,[intentId])
        def userExpList = []
        rows3.each{r->
            def map = [:]
            map.name = r.name
            map.id = r.id
            map.isDelete = false
            map.isPresent = true 
            userExpList.push(map)
        }
        jsonMap.userExpList  = userExpList
        
        sqlQuery  = "select `name` from actions where  tag_id = ?";
        def rows4 = db.firstRow(sqlQuery,[intentId])
        if(rows4 != null){
            jsonMap.actions  = rows4.name 
        }
        
        
        sqlQuery  = "select `name`,id from responses where  tag_id = ?";
        def rows5 = db.rows(sqlQuery,[intentId])
        println 'rows5 '+rows5
        def resposneList = []
        rows5.each{r->
            def map = [:]
            map.name = r.name
            map.id = r.id
            map.isDelete = false
            map.isPresent = true 
            resposneList.push(map)
        }
        jsonMap.resposneList  = resposneList
        
        println "jsonMap getIntentDetails ------------------- "+jsonMap
        jsonMap
    }
    
    def updateIntent(params){
        println "updateIntent params ::::: "+params
        def jsonMap = [:]
        jsonMap.success  = true
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        def appName = params.appName
        def tagId = params.intentId
        def sqlQuery = ""
        //       try{
        if(params.userExpList != null){                
            if(params.userExpList instanceof String){
                def u = JSON.parse(params.userExpList )
                if(u.isPresent == true && u.isDelete == true){
                    def patternId = u.id
                    sqlQuery  = "DELETE FROM patterns where id=?";
                    def rows3 = db.execute(sqlQuery,[patternId])
                }else{
                    if(u.isPresent == true && u.isDelete == true){
                        sqlQuery  = "INSERT INTO patterns ( `name`, `description`, `tag_id`) VALUES (?,?,?);";
                        def rows3 = db.executeInsert(sqlQuery,[u.name,"-",tagId])
                    }
                }
            }else{ 
                params.userExpList.each{user->
                    def u = JSON.parse(user)
                    if(u.isPresent == true && u.isDelete == true){
                        def patternId = u.id
                        sqlQuery  = "DELETE FROM patterns where id=?";
                        def rows3 = db.execute(sqlQuery,[patternId])
                    }else{
                        if(u.isPresent == false && u.isDelete == false){
                            sqlQuery  = "INSERT INTO patterns ( `name`, `description`, `tag_id`) VALUES (?,?,?);";
                            def rows3 = db.executeInsert(sqlQuery,[u.name,"-",tagId])
                        }
                    }
                }   
            }
        }
        if(params.actions != null && params.actions  != ""){
            sqlQuery  = "select * from actions where  tag_id = ?";
            def act = db.rows(sqlQuery,[tagId])
            if(act != null && act.size() > 0){
                println "actions "+params.actions
                sqlQuery  = "update `chatbot`.`actions` SET name = ? where tag_id = ?";
                def rows = db.executeUpdate(sqlQuery,[params.actions,tagId])
            }else{
                sqlQuery  = "INSERT INTO actions ( `name`, `description`, `tag_id`) VALUES (?,?,?);";
                def rows4 = db.executeInsert(sqlQuery,[params.actions,"-",tagId])  
            }
        }

              
        if(params.resposneList != null){
            println "params.resposneList "+params.resposneList
            if(params.resposneList instanceof String){
                def u = JSON.parse(params.resposneList )
                if(u.isPresent == true && u.isDelete == true){
                    def resposneId = u.id
                    sqlQuery  = "DELETE FROM responses where id=?";
                    def rows3 = db.execute(sqlQuery,[resposneId])
                }else{
                    if(u.isPresent == false && u.isDelete == false){
                        println "RRRRRRRRRRRRRRRRRRRRRRRRRRRRR1111"
                        sqlQuery  = "INSERT INTO responses ( `name`, `description`, `tag_id`) VALUES (?,?,?);";
                        def rows5 = db.executeInsert(sqlQuery,[params.resposneList,"-",tagId])
                    }
                }
            }else{ 
                params.resposneList.each{res->
                    def u = JSON.parse(res)
                    if(u.isPresent == true && u.isDelete == true){
                        def resposneId = u.id
                        sqlQuery  = "DELETE FROM responses where id=?";
                        def rows3 = db.execute(sqlQuery,[resposneId])
                    }else{
                        if(u.isPresent == false && u.isDelete == false){
                            println "RRRRRRRRRr222222222"
                            sqlQuery  = "INSERT INTO responses ( `name`, `description`, `tag_id`) VALUES (?,?,?);";
                            def rows5 = db.executeInsert(sqlQuery,[u.name,"-",tagId])
                            println 'rows5 '+rows5
                        }
                    }
                }   
            }
        }
        //        }catch(Exception e){
        //            println " e -------------------------- "+e
        //        }
        jsonMap
    }
    
    def tagEvent(data){
        def result = [success:false,message:"Something went wrong"]
        def db = new Sql(dataSource)
        def appId = data.appId
        def userId = data.userId
        def conversationId = data.cId
        def msgFrom = "user"
        if(data.fromBot == "true"){
            msgFrom = "chatbot"
        }
        def event = data.event
        if(appId == null || userId == null || conversationId == null || event == null){
            result.message = "Unauthorized request."
        }else{
            def query = "insert into messages (conversation_id,user_id,app_id,message,message_from,created_on) values (?,?,?,?,?,Now())"
            def res = db.executeInsert(query, [conversationId, userId, appId,event,msgFrom])
            // println "event tagging successful"+res
            if(res == null){
                
            }else{
                //update steps counter in conversation
                def counterQuery =  "UPDATE conversations SET no_of_steps = no_of_steps + 1, end_time=Now() WHERE id = ?"
                def response = db.executeUpdate(counterQuery, [conversationId])
            }
            result.message = "successful"
            result.success = true
        }
        result
    }
    
    def getServicesByLoginChatbot(params,String user){
        def loginEmail = null
        def db = new Sql(dataSource)
        def response = db.rows("select  * FROM service s group by s.id")
        def result = []
        response.each{data->
            def res = [:]
            res['id'] = data.id
            res['name'] = data.name
            res['apiKey'] = data.api_key
            res['secretKey'] = data.secret_key
            result.add(res);
        }
        return ([total: result.size(), rows: result] as JSON)
    }
    
    def getDialog(params){
        println "getDialog params "+params
        def jsonMap = [:]
       
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        def sqlQuery  = "select config from dialog where app_id = ? ";
        def rows = db.firstRow(sqlQuery,[appId])
        println "rows ------  "+rows
        if(rows == null){
            jsonMap.success  = false
        }else{
            jsonMap.success  = true
            jsonMap.rows = rows
        }
      
        jsonMap
    }
    def getChatDialog(params){
        println "getDialog params "+params
        def jsonMap = [:]
       
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        def sqlQuery  = "select chat_config as chatConfig from dialog where app_id = ? ";
        def rows = db.firstRow(sqlQuery,[appId])
        println "rows ------  "+rows
        if(rows == null){
            jsonMap.success  = false
        }else{
            jsonMap.success  = true
            jsonMap.rows = rows
        }
      
        jsonMap
    }
	
    def saveDialog(params){
        println "saveDialog params "+params
        def jsonMap = [:]
        jsonMap.success  = true
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        def config = params.config
        def chatConfig = params.chat_config
        def isdialogPresent = getDialog(params)
        if(isdialogPresent.success){
            updateDialog(params)
        }else{
            def sqlQuery  = "INSERT INTO `chatbot`.`dialog` (`name`, `app_id`, `config`,`chat_config`) VALUES (?,?,?,?); ";
            def rows = db.executeInsert(sqlQuery,['Dialog',appId,config,chatConfig])
            println "saveDialog rows ------  "+rows
        }
        jsonMap
    }
    
    
    def updateDialog(params){
        println "updateDialog params "+params
        def jsonMap = [:]
        jsonMap.success  = true
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        def config = params.config
        def chatConfig = params.chat_config
        def sqlQuery  = "update `chatbot`.`dialog` SET config = ?, chat_config = ? where app_id = ? ";
        def rows = db.executeUpdate(sqlQuery,[config,chatConfig,appId])
        println "updateDialog rows ------  "+rows
        jsonMap
    }
    
    def updatePhrase(params){
        println "updatePhrase params "+params
        def jsonMap = [:]
        jsonMap.success  = true
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        def id =  params.id.toLong()
        def config = params.config
        def sqlQuery  = "update `chatbot`.`phrases` SET resolved = ? where app_id = ? and id = ? ";
        def rows = db.executeUpdate(sqlQuery,[1,appId,id])
        println "updatePhrase rows ------  "+rows
        jsonMap
    }
    
    
    def getUnknownIntent(params){
        def jsonMap = [:]
        def resultArr = []
        jsonMap.data = []
        def db = new Sql(dataSource)
        def appId = params.appId.toLong()
        def sqlQuery  = "select phrase,id from phrases where app_id = ? and resolved = ? order by count desc";
        def rows = db.rows(sqlQuery,[appId,0])
        if(rows != null && rows.size()>0){
            rows.each{r->
                def resultMap = [:]
                resultMap.name = r.phrase
                resultMap.id = r.id
                resultArr.add(resultMap)
            }
            jsonMap.data = resultArr
        }   
        println "getUnknownIntent jsonMap ------ :: "+jsonMap
        jsonMap
    } 
    
    
    def getAppOrgName(name){
        def db = new Sql(dataSource)
        def orgName = name
        def sqlQuery  = "select api_key,secret_key,id,name from service where org_name = ?";
        def rows = db.firstRow(sqlQuery,[orgName])
        rows
    }
    
    def matchItToIntent(params){
        println "matchItToIntent :::::::: "+params
        updatePhrase(params)
        def db = new Sql(dataSource)
        def sqlQuery  = "INSERT INTO patterns ( `name`, `description`, `tag_id`) VALUES (?,?,?);";
        def rows3 = db.executeInsert(sqlQuery,[params.userSay,"-",params.tagId])
        println "ROW3 ::::::::: "+rows3
       
    }
}
