app.directive("eventsList",["eventsService", function (eventsService) {
    return {
        "restrict": "E",
        "templateUrl": "templates/list.html",
        "scope": {
            "morningEvents": "=",
            "eveningEvents": "=",
            "eventState": "="
        },
        "controller": "eventsController",
        "link": function (scope) {
            //$scope.$watch("eventState", function () {
              //  alert("watch");


            //scope.events = eventsService.getEvents();
            //scope.showIcon = function (event, $event) {

            //};
            //});
            var events = eventsService.getEvents();
            scope.morningEvents = events[0];
            scope.eveningEvents = events[1];
        }
    };
}]);