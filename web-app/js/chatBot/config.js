/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 12 Mar 2015
 * @version 1.0
 */

// AngularJs Configurations

// Auth Error Popup Close handler
$(function(){
    $('#error_modal').on('hidden.bs.modal', function () {
      
        var url = document.URL; 
     
        document.location = "https://in-apphq.shephertz.com/register/app42Login";
    })
})
// Loader configurations
chatBot.run(['$rootScope', function($root) {
    $root.$on('$routeChangeStart', function(e, curr, prev) { 
        $root.loadingView = true;
    });
    $root.$on('$routeChangeSuccess', function(e, curr, prev) { 
        // Hide loading message
       if(curr.$$route != undefined){
         if(curr.$$route.originalPath === "/apps" || curr.$$route.originalPath === "/pageNotFound" || curr.$$route.originalPath === "/eCommerce" 
			|| curr.$$route.originalPath === "/cart" || curr.$$route.originalPath === "/cartItem" || curr.$$route.originalPath === "/payment" || curr.$$route.originalPath === "/catalouge"
			|| curr.$$route.originalPath === "/category" || curr.$$route.originalPath === "/item" || curr.$$route.originalPath === "/email"
			|| curr.$$route.originalPath === "/deployJar"  || curr.$$route.originalPath === "/logs"){
            $('ol.breadcrumb').hide();
        }else{
            $('ol.breadcrumb').show(); 
        }  
       }
        $root.loadingView = false;
    });
    $root.$on('$routeChangeError', function(e, curr, prev, rejection) {
        // you could look at rejection and do something depending on the status code. 
        if(rejection.status == 500){
           
        }
    });
}]);

chatBot.config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('../angularTemplates/dirPagination');
});
