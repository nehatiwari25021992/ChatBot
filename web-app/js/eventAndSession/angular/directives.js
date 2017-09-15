/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 19 Sep 2014
 * @version 1.0
 */

// AngularJs Directives

// Loader directive
 
appHq.directive("loadingIndicator", function() {
    return {
        restrict : "A",
        template: "<div class='loadingTemplate pageLoader'><img src='../images/loading.gif' /></div>",
        link : function(scope, element, attrs) {
            scope.$on("loading-started", function(e) {
               
                element.css({
                    "display" : ""
                });
            });
            scope.$on("loading-complete", function(e) {
              
                element.css({
                    "display" : "none"
                });
            });
        }
    };
});

appHq.directive('toggleButton', function() {
    return {
        require: 'ngModel',
        scope: {
            activeText: '@activeText',
            inactiveText: '@inactiveText',
            lightState: '=ngModel'
        },
        replace: true,
        transclude: true,
        template: '<div>' +
        '<span ng-transclude></span> ' +
        '<button class="btn" ng-class="{\'btn-primary\': state.value}" ng-click="state.toggle()">{{activeText}}</button>' +
        '<button class="btn" ng-class="{\'btn-primary\': !state.value}" ng-click="state.toggle()">{{inactiveText}}</button>' +
        '</div>',
        link: function postLink(scope) {
            scope.lightState = scope.inactiveText;
    
            scope.state = {
                value: false,
                toggle: function() {
                    this.value = !this.value; 
                    scope.lightState = this.value ? scope.activeText : scope.inactiveText;
                }
            };
        }
    }
})

appHq.directive('scroll', []).directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});

appHq.directive('ckEditor', [function () {
    return {
        require: '?ngModel',
        restrict: 'C',
        link: function($scope, elm, attr, ngModel) { var ck = CKEDITOR.replace(elm[0]);

        ck.on('pasteState', function () {
            $scope.$apply(function () {
                ngModel.$setViewValue(ck.getData());
            });
        });

        ngModel.$render = function (value) {
            ck.setData(ngModel.$modelValue);
        };}
    };
}]);
// add and remove event directive
appHq.directive('graphtabs', function() {
    return {
        restrict: 'EA',
        scope: {
            datasource: '=',
            add: '&',
            remove: '&',
            change: '&',
            startindex: '='
        },
        controller: function ($scope) {
            $scope.removedfields = []
            $scope.eventfields = [];
            angular.forEach($scope.datasource, function(value, key) {
                $scope.removedfields.push(value)
            });
		
            $scope.changeField = function(fields){
                $scope.finalList = [];
                angular.forEach(fields, function(value, key) {
                    $scope.finalList.push(value.name)
                });
                if($scope.change()===undefined)
                    return;
                $scope.change()($scope.finalList);
            }
		
            $scope.removeField = function(field){
                var idx = $scope.eventfields.map(function(e){
                    return e.name;
                }).indexOf(field)
                $scope.eventfields.splice(idx, 1)
                $scope.removedfields.push(field)
                if($scope.remove()!=undefined){
                    $scope.remove()(field);
                }
                $scope.changeField($scope.eventfields);
            }
		
            $scope.addField = function(event){
                var field = $scope.removedfields[0]
                if(field===undefined)
                    return;
                $scope.removedfields.splice(0, 1)
                $scope.eventfield = {
                    name:field
                }
                $scope.eventfields.push($scope.eventfield)
                if(event === undefined){
                    if($scope.add()!=undefined){
                        $scope.add()(field);
                    }
                    $scope.changeField($scope.eventfields);
                }
			
            }
            for(var i=0; i<$scope.startindex; i++){
                $scope.addField("init");
            }
            $scope.changeField($scope.eventfields);
        },
        template:'<div class="graph-refi-row"><div ng-animate="animate" class="graph_refinement"  ng-repeat="fields in eventfields">'+
    '<div class="legend colA">&#x27A4;</div><a href="javascript:;" ng-hide="eventfields.length==1" class="dropdown_remove colB" style="display: block;" ng-click="removeField(fields.name)">&#x2715;</a><div class="tab_label colC">{{fields.name}}</div>'+
    '</div>'+
		
    '<div class="graph_add" style="display: inline-block;" ng-hide="eventfields.length==datasource.length" ng-click="addField()"><span></span><a href="javascript:;" class="dropdown_remove colB" style="display: block;padding-left: 10px;padding-top: 2px;font-size: 15px;">&#x271A;</a></div></div>'

    };
});

//Add and remove push directive
appHq.directive('customGraphtabs', function($compile) {
 var temp = '<div class="graph-refi-row"><div ng-animate="animate" class="graph_refinement"  ng-repeat="fields in customFields">'+
 '<div class="legend colA">&#x27A4;</div><a href="javascript:;" ng-hide="customFields.length==1" class="dropdown_remove colB" style="display: block;" ng-click="removeField(fields.name)">&#x2715;</a><div class="tab_label colC">{{fields.name}}</div>'+
 '</div>'+
		
 '<div class="graph_add" style="display: inline-block;" ng-hide="customFields.length==datasource.length" ng-click="addField()"><span></span><a href="javascript:;" class="dropdown_remove colB" style="display: block;padding-left: 10px;padding-top: 2px;font-size: 15px;">&#x271A;</a></div></div>'
	return {
     restrict: 'EA',
     scope: {
         datasource: '=',
         add: '&',
         remove: '&',
         change: '&',
         startindex: '='
     },
     link : function ($scope,element) {
    	 $scope.$watch("datasource",function(newValue,oldValue) {
				//This gets called when data changes.
			var domElement = $(temp);
			element.empty();
            element.append(domElement);
             $compile(domElement)($scope);
				$scope.removedfields = []
		         $scope.customFields = [];
		         angular.forEach($scope.datasource, function(value, key) {
		             $scope.removedfields.push(value)
		         });
				for(var i=0; i<$scope.startindex; i++){
		             $scope.addField("init");
		         }
		         $scope.changeField($scope.customFields,"init");
			});
     },
     controller : function ($scope) {
         $scope.removedfields = []
         $scope.customFields = [];
         angular.forEach($scope.datasource, function(value, key) {
             $scope.removedfields.push(value)
         });
		
         $scope.changeField = function(fields,init){
             $scope.finalList = [];
             angular.forEach(fields, function(value, key) {
                 $scope.finalList.push(value.name)
             });
             if($scope.change()===undefined)
                 return;
             $scope.change()($scope.finalList);
         }
		
         $scope.removeField = function(field){
             var idx = $scope.customFields.map(function(e){
                 return e.name;
             }).indexOf(field)
             $scope.customFields.splice(idx, 1)
             $scope.removedfields.push(field)
             if($scope.remove()!=undefined){
                 $scope.remove()(field);
             }
             $scope.changeField($scope.customFields);
         }
		
         $scope.addField = function(event){
             var field = $scope.removedfields[0]
             if(field===undefined)
                 return;
             $scope.removedfields.splice(0, 1)
             $scope.customField = {
                 name:field
             }
             $scope.customFields.push($scope.customField)
             if(event === undefined){
                 if($scope.add()!=undefined){
                     $scope.add()(field);
                 }
                 $scope.changeField($scope.customFields);
             }
         }
         for(var i=0; i<$scope.startindex; i++){
             $scope.addField("init");
         }
         $scope.changeField($scope.customFields);
     },
     template:temp

 };
});

