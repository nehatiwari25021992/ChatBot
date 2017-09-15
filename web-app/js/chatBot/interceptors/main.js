/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 12 Mar 2015
 * @version 1.0
 */

// Request/Response Interceptors

chatBot.factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){
    return {
        response: function(response){
            if (response.status === 200) {
                if(response.data.message == "Session time out Error:0x10133817"){
                    console.log("Response 401::::");
                    $("#error_modal").modal('show')
                    return $q.reject(response);
                }
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error:::",rejection.status);
            }
            return $q.reject(rejection);
        }
    }
}])
.config(['$httpProvider',function($httpProvider) {
    // Modify post request to able to send a parameter list instead of JSON
    $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    }
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    // post request modification end.
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
    
    // Modify post request to able to send a parameter list instead of JSON
    $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    }
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
   // post request modification end.
}]);