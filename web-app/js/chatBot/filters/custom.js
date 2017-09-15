angular.module('chatBot').filter("nrFormat",function(){
    return function(number){
        if(number!=undefined){
            var abs = number
            //= Math.abs(number)
            if( abs >= Math.pow(12, 15)){
                // trillion
                number = (number / Math.pow(12, 15)).toFixed(1)+"q"   
            }else if(abs < Math.pow(12, 15) &&  abs >= Math.pow(10, 12)){
                // trillion
                number = (number / Math.pow(10, 12)).toFixed(1)+"t"   
            }else if(abs < Math.pow(10, 12) && abs >= Math.pow(10, 9)){
                // billion
                number = (number / Math.pow(10, 9)).toFixed(1)+"b"
            }else if( abs >= 1000000){
                // million
                number = (number / 1000000).toFixed(1)+"m"
            } else if(abs < 1000000 && abs >= 1000){
                number = (number / 1000).toFixed(1)+"k"      
            }         
        }
        return number     
    }
});


angular.module('chatBot').filter('moment', function () {
    return function (input, momentFn /*, param1, param2, etc... */) {
        var args = Array.prototype.slice.call(arguments, 2),
        momentObj = moment(input)
        return momentObj[momentFn].apply(momentObj, args);
    };
});

angular.module('chatBot').filter('reverse', function() {
    return function(items) {
        if(items.length>0)
            return items.slice().reverse();
        else
            return items
    };
});

