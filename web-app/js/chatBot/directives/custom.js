/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 01 Oct 2015
 * @version 1.0
 */

// AngularJs directives

chatBot.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    } ;
});


chatBot.directive('activeLink', ['$location', function (location) {

    var mainPath = location.path()
    return {
        restrict: 'AEC',
        link: function (scope, element, attrs, controller) {
            var clazz = attrs.activeLink;
            var path = attrs.href;
            path = path.substring(1); //hack because path does not return including hashbang

            if (mainPath === path.slice(0, -1)) {
                if (mainPath === "/dashboard") {
                    scope.openSubSideBar("dashboardSection")
                } else if (mainPath === "/events" || mainPath === "/properties" || mainPath === "/segments" || mainPath === "/editSegment" || mainPath === "/viewSegment") {
                    scope.openSubSideBar("defineSection")
                } else if (mainPath === "/addSegment" || mainPath === "/profile" || mainPath === "/liveView" || mainPath === "/funnel" || mainPath === "/retention" || mainPath === "/dau" || mainPath === "/mau" || mainPath === "/wau") {
                    scope.openSubSideBar("userInsightsSection")
                } else if (mainPath === "/avgSession" || mainPath === "/sessionInterval" || mainPath === "/installs" || mainPath === "/uninstalls" || mainPath === "/deviceDistribution") {
                    scope.openSubSideBar("appInsightsSection")
                }
                else if (mainPath === "/campaigns") {
                    scope.openSubSideBar("targetSection")
                } else if (mainPath === "/achievements" || mainPath === "/add-achievement" || mainPath === "/edit-achievement" || mainPath === "/gaming-rewards" || mainPath === "/gaming-gifts") {
                    scope.openSubSideBar("gamingSection")
                }
                else if (mainPath === "/pushCampaign" || mainPath === "/inAppCampaign" || mainPath === "/editInAppCampaign" || mainPath === "/createInAppCampaign" || mainPath === "/emailCampaign" || mainPath === "/surveyCampaign" || mainPath === "/editPushCampaign" || mainPath === "/createPushCampaign") {
                    scope.openSubSideBar("campaignSection")
                } else if (mainPath === "/viralityProgramme" || mainPath === "/viralitySettings" || mainPath === "/effectivenessVirality") {
                    scope.openSubSideBar("growthHackSection")
                }else if (mainPath === "/prediction-churns" || mainPath === "/prediction-conversions" || mainPath === "/prediction-effectiveness") {
                    scope.openSubSideBar("predictionSection")
                } 
                 
                element.parent('li').parent('ul').find('li').removeClass(clazz)
                element.parent('li').parent('ul').find('a').removeClass(clazz)
                element.parent('li').addClass(clazz);
                element.addClass(clazz);
            }
            scope.location = location;

            scope.$watch('location.path()', function (newPath) {
                if (path === newPath) {
                    element.parent('li').parent('ul').find('li').removeClass(clazz)
                    element.parent('li').parent('ul').find('a').removeClass(clazz)
                    element.parent('li').addClass(clazz);
                    element.addClass(clazz);
                }
            });
        }
    };
}]);


chatBot.directive('switchstate', function ($http) {
    return {
        restrict: 'EA',
        link: function ($scope, element, attr, ctrl) {
            var appState = true;
            if (attr.currstate == 1 || attr.currstate == '1') {
                appState = false
            } else {
                appState = true
            }
            var el = $(element).bootstrapSwitch({
                onText: "Enabled",
                offText: "Disabled",
                offColor: "danger",
                state: appState,
                onSwitchChange: function (state, db) {
                    var cel = state.target
                    if (db) {
                        $(cel).siblings("span.bootstrap-switch-label").html("Disable")
                    } else {
                        $(cel).siblings("span.bootstrap-switch-label").html("Enable")
                    }
                    if (!db) {
                        bootbox.confirm("Are you sure you want to disable app? After disabling the app you will not be able to make API calls for this app?", function (result) {
                            if (result) {
                                $http.post('../app/disabledApp', {
                                    method: "PUT",
                                    methodType: "PUT",
                                    appId: $scope.app.id,
                                    appName: $scope.app.name
                                }).
                                success(function (data, status, headers, config) {
                                    // this callback will be called asynchronously
                                    // when the response is available
                                    $("#appsSuccessNotifications").show()
                                    $("#appsSuccessNotifications").html("App disabled successfully")
                                    $scope.viewAppsDefault();
                                    $scope.getAppsForDropDown();
                                }).
                                error(function (data, status, headers, config) {
                                    // called asynchronously if an error occurs
                                    // or server returns response with an error status.
                                    $("#failedApp").show()
                                    $("#failedApp").html(data.message)
                                    $scope.viewAppsDefault();
                                });
                            } else {
                                $(element).bootstrapSwitch('state', appState, true);
                                if (appState) {
                                    $(cel).siblings("span.bootstrap-switch-label").html("Disable")
                                } else {
                                    $(cel).siblings("span.bootstrap-switch-label").html("Enable")
                                }
                            }
                        });
                    } else {
                        bootbox.confirm("Are you sure you want to enable your app? After enabling the app you will be able to make API calls for this app?", function (result) {
                            if (result) {
                                $http.post('../app/enabledApp', {
                                    method: "PUT",
                                    methodType: "PUT",
                                    appId: $scope.app.id,
                                    appName: $scope.app.name
                                }).
                                success(function (data, status, headers, config) {
                                    // this callback will be called asynchronously
                                    // when the response is available
                                    $("#appsSuccessNotifications").show()
                                    $("#appsSuccessNotifications").html("App enabled successfully")
                                    $scope.viewAppsDefault();
                                    $scope.getAppsForDropDown();
                                }).
                                error(function (data, status, headers, config) {
                                    // called asynchronously if an error occurs
                                    // or server returns response with an error status.
                                    $("#failedApp").show()
                                    $("#failedApp").html(data.message)
                                    $scope.viewAppsDefault();
                                });
                            } else {
                                $(element).bootstrapSwitch('state', appState, true);
                                if (appState) {
                                    $(cel).siblings("span.bootstrap-switch-label").html("Disable")
                                } else {
                                    $(cel).siblings("span.bootstrap-switch-label").html("Enable")
                                }
                            }
                        });
                    }
                }
            });

            if (appState) {
                $(el).siblings("span.bootstrap-switch-label").html("Disable")
            } else {
                $(el).siblings("span.bootstrap-switch-label").html("Enable")
            }
        }
    };
});


chatBot.directive('switchstatema', function ($http) {
    return {
        restrict: 'EA',
        scope: {
            change: '&',
            params: '='
        },
        link: function ($scope, element, attr, ctrl) {
            var currst = attr.currstate
            var state = false;
            if (currst == "true" || currst == true) {
                state = true;
            } else {
                state = false;
            }

            $scope.$watch('params', function (newValue, oldValue) {
                if (newValue) {
                    var state = true
                    if (newValue.status == "true" || newValue.status == true) {
                        state = true;
                    } else {
                        state = false;
                    }
                    $(element).bootstrapSwitch('state', state, true);
                }

            }, true);
            var el = $(element).bootstrapSwitch({
                onText: "Enabled",
                offText: "Disabled",
                offColor: "danger",
                state: state,
                onSwitchChange: function (state, db) {
                    if (db) {
                        $scope.change()($scope.params, $scope.params.id, 'ENABLE');
                    } else {
                        $scope.change()($scope.params, $scope.params.id, 'DISABLE');
                    }

                    var currst = attr.currstate
                    var state = false;
                    if (currst == "true" || currst == true) {
                        state = true;
                    } else {
                        state = false;
                    }
                    $(element).bootstrapSwitch('state', state, true);
                }
            });

        }
    };
});

chatBot.directive('switchstatemaviral', function ($http) {
    return {
        restrict: 'EA',
        scope: {
            change: '&',
            params: '='
        },
        link: function ($scope, element, attr, ctrl) {
            var currst = attr.currstate
            var state = false;
            if (currst == "true" || currst == true) {
                state = true;
            } else {
                state = false;
            }

            $scope.$watch('params', function (newValue, oldValue) {
                if (newValue) {
                    var state = true
                    if (newValue.status == "true" || newValue.status == true) {
                        state = true;
                    } else {
                        state = false;
                    }
                    $(element).bootstrapSwitch('state', state, true);
                }

            }, true);
            var el = $(element).bootstrapSwitch({
                onText: "Enabled",
                offText: "Disabled",
                offColor: "danger",
                state: state,
                onSwitchChange: function (state, db) {
                    if (db) {
                        $scope.change()($scope.params, $scope.params.id, 'ENABLE');
                    } else {
                        $scope.change()($scope.params, $scope.params.id, 'DISABLE');
                    }

                    var currst = attr.currstate
                    var state = false;
                    if (currst == "true" || currst == true) {
                        state = true;
                    } else {
                        state = false;
                    }
                    $(element).bootstrapSwitch('state', state, true);
                }
            });

        }
    };
});

chatBot.directive('switchStateEvent', function ($http) {
    return {
        restrict: 'EA',
        scope: {
            change: '&',
            params: '=',
            params1: '=',
            params2: '='

        },
        link: function ($scope, element, attr, ctrl) {
            var currst = attr.currstate
            var state = false;
            if (currst == "true" || currst == true || currst == "null" || currst == null) {
                state = true;
            } else {
                state = false;
            }

            $scope.$watch('params', function (newValue, oldValue) {

                if (newValue) {


                    var state = true
                    if ($scope.params2 == "permanent") {
                        if (newValue.eventpermstate == null || newValue.eventpermstate == "null" || newValue.eventpermstate == "true" || newValue.eventpermstate == true) {
                            state = true;
                        } else {
                            state = false;
                        }
                        $(element).bootstrapSwitch('state', state, true);
                    } else {
                        if (newValue.eventsoftstate == null || newValue.eventsoftstate == "null" || newValue.eventsoftstate == "true" || newValue.eventsoftstate == true) {
                            state = true;
                        } else {
                            state = false;
                        }
                        $(element).bootstrapSwitch('state', state, true);
                    }
                }
            }, true);
            var el = $(element).bootstrapSwitch({
                onText: "Enabled",
                offText: "Disabled",
                offColor: "danger",
                state: state,
                onSwitchChange: function (state, db) {
                    //if (db) {
                    $scope.change()($scope.params.id, $scope.params.name, attr.currstate, $scope.params1, $scope.params);
                    //                    } else {
                    //                        $scope.change()($scope.params, $scope.params.id, 'DISABLE');
                    //                    }

                    //                    var currst = attr.currstate
                    //                    var state = false;
                    //                    if (currst == "true" || currst == true) {
                    //                        state = true;
                    //                    } else {
                    //                        state = false;
                    //                    }

                    var currst = attr.currstate
                    var ystate = false;
                    if (currst == null || currst == "null" || currst == "true" || currst == true) {
                        ystate = true;
                    } else {
                        ystate = false;
                    }
                    $(element).bootstrapSwitch('state', ystate, true);
                }
            });

        }
    };
});
chatBot.directive('switchStateSettings', function ($http) {
    return {
        restrict: 'EA',
        scope: {
            change: '&',
            params: '=',
            params1: '=',
            params2: '='

        },
        link: function ($scope, element, attr, ctrl) {
            var currst = attr.currstate
            var state = false;
            if (currst == "true" || currst == true || currst == "null" || currst == null) {
                state = true;
            } else {
                state = false;
            }

            $scope.$watch('params', function (newValue, oldValue) {
                if (newValue) {

                    var state = true
                    if ($scope.params2 == "permanent") {
                        if (newValue.eventpermstate == null || newValue.eventpermstate == "null" || newValue.eventpermstate == "true" || newValue.eventpermstate == true) {
                            state = true;
                        } else {
                            state = false;
                        }
                        $(element).bootstrapSwitch('state', state, true);
                    } else {
                        if (newValue == "true" || newValue == true) {
                            state = true;
                        } else {
                            state = false;
                        }
                        $(element).bootstrapSwitch('state', state, true);
                    }
                } else {
                    if (newValue == "true" || newValue == true) {
                        state = true;
                    } else {
                        state = false;
                    }
                    $(element).bootstrapSwitch('state', state, true);
                }
            }, true);
            var el = $(element).bootstrapSwitch({
                onText: "Enabled",
                offText: "Disabled",
                offColor: "danger",
                state: state,
                onSwitchChange: function (state, db) {
                    //if (db) {
                    $scope.change()($scope.params.id, $scope.params.name, attr.currstate, $scope.params1, $scope.params);
                    //                    } else {
                    //                        $scope.change()($scope.params, $scope.params.id, 'DISABLE');
                    //                    }

                    //                    var currst = attr.currstate
                    //                    var state = false;
                    //                    if (currst == "true" || currst == true) {
                    //                        state = true;
                    //                    } else {
                    //                        state = false;
                    //                    }
                   
                    var currst = attr.currstate
                    var ystate = false;
                    if (currst == null || currst == "null" || currst == "true" || currst == true) {
                        ystate = true;
                    } else {
                        ystate = false;
                    }
                    $(element).bootstrapSwitch('state', ystate, true);
                }
            });

        }
    };
});

chatBot.directive('switchPermStateEvent', function ($http) {
    return {
        restrict: 'EA',
        scope: {
            change: '&',
            params: '=',
            params1: '='

        },
        link: function ($scope, element, attr, ctrl) {
            var currst = attr.currstate
            var state = false;
            if (currst == "" || currst == "null" || currst == "true" || currst == true) {
                state = true;
            } else {
                state = false;
            }

            $scope.$watch('params', function (newValue, oldValue) {

                if (newValue) {
                    var yeestate = true

                    if (newValue.eventpermstate == null || newValue.eventpermstate == "true" || newValue.eventpermstate == true) {
                        yeestate = true;
                    } else {
                        yeestate = false;
                    }
                    $(element).bootstrapSwitch('state', yeestate, true);

                }
            }, true);

            var el = $(element).bootstrapSwitch({
                onText: "Enabled",
                offText: "Disabled",
                offColor: "danger",
                state: state,
                onSwitchChange: function (state, db) {
                    var currst = attr.currstate
                    var ystate = false;
                    if (currst == null || currst == "" || currst == "null" || currst == "true" || currst == true) {
                        ystate = true;
                    } else {
                        ystate = false;
                    }
                    $scope.change()($scope.params.id, $scope.params.name, ystate, $scope.params1, $scope.params);
                    $(element).bootstrapSwitch('state', ystate, true);
                }
            });

        }
    };
});


chatBot.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val
                    if (!Number.isInteger(val)) {
                        digits = val.replace(/[^0-9]/g, '');
                    }
                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);

                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});



