hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = true
    cache.provider_class = 'net.sf.ehcache.hibernate.EhCacheProvider'
}
// environment specific settings
environments {
    production {
        dataSource {
            dbCreate = "update" // one of 'create', 'create-drop','update'
            pooled = true
            driverClassName = "com.mysql.jdbc.Driver"
            username = "root"
            password = "nJWYdBpv5J"
            url = "jdbc:mysql://localhost/chatbot?autoReconnect=true&jdbcCompliantTruncation=false&zeroDateTimeBehavior=convertToNull"
            dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"
            properties { 
                maxActive = 50
                maxIdle = 10
                minIdle = 2
                initialSize = 2
                maxWait = 30000
                validationQuery="select 1"
                testWhileIdle=true
                timeBetweenEvictionRunsMillis=60000
            } 
			
        }
    }
    development {
        dataSource {
                            
            dbCreate = "update" // one of 'create', 'create-drop','update'
            pooled = true
            driverClassName = "com.mysql.jdbc.Driver"
            username = "root"
            password = "nJWYdBpv5J"
            url = "jdbc:mysql://52.172.31.113/chatbot?autoReconnect=true&jdbcCompliantTruncation=false&zeroDateTimeBehavior=convertToNull"
            dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"
            properties { 
                maxActive = 50
                maxIdle = 1
                minIdle = 0
                initialSize = 1
                maxWait = 30000
                validationQuery="select 1"
                testWhileIdle=true
                timeBetweenEvictionRunsMillis=60000
            } 
			
        }
    }
    test {
        dataSource {
            dbCreate = "update" // one of 'create', 'create-drop','update'
            pooled = true
            driverClassName = "com.mysql.jdbc.Driver"
            username = "root"
            password = "nJWYdBpv5J"
            url = "jdbc:mysql://localhost/chatbot?autoReconnect=true&jdbcCompliantTruncation=false&zeroDateTimeBehavior=convertToNull"
            dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"
            properties { 
                maxActive = 50
                maxIdle = 1
                minIdle = 0
                initialSize = 1
                maxWait = 30000
                validationQuery="select 1"
                testWhileIdle=true
                timeBetweenEvictionRunsMillis=60000
            } 
			
        }
    }
}
