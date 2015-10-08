app.directive("tripleCalendar",["$window", "$state", "calendarEventService", "detailsUtil", "mainService",
    function ($window, $state, calendarEventService, detailsUtil, mainService) {
    return {
        "restrict": "E",
        "templateUrl": "templates/calendars.html",
        "scope": {
            "startingMonth": "=",
            "year": "=",
            "selectedDate": "=",
            "numberOfMonths": "="
        },
        "link": function (scope, element, attrs) {
            var month = scope.startingMonth;
            scope.months = [];
            scope.num =[];
            scope.years = [];

            function checkDate(day, month, selected) {
                var selectedDay = selected.getDate();
                var selectedMonth = selected.getMonth();
                return (selectedDay === day) && (selectedMonth === month);
            }

            for (var i = 0; i < scope.numberOfMonths; i++) {
                scope.months.push(((month + i) % 12));
                scope.num.push(i);
                scope.years.push(parseInt((month+i)/12, 10) + scope.year);
            }

            scope.isSelectedDate = function (day, month) {
               if (mainService.getEventState()==="date") {
                   return checkDate(day,month,scope.selectedDate);
               }
            };

            scope.selectDay = function (day, month, year) {
                scope.selectedDate = new Date(year, month, day);
                calendarEventService.setDate(scope.selectedDate);
                $window.sessionStorage.setItem("selectedDate", JSON.stringify(scope.selectedDate));
                detailsUtil.clearEvent();
                mainService.setEventState("date");
                $state.reload();
            };
        }
    };

}]).directive("calendar",["calendarUtil", "$filter", function (calendarUtil, $filter) {
    return {
        "restrict": "E",
        "templateUrl": "templates/calendar.html",
        "scope": {
            "month": "=",
            "year": "="
        },
        "link": function (scope) {
            scope.monthArray = calendarUtil.initializeMonth (scope.month);
            scope.selectDay = scope.$parent.selectDay;
            scope.isSelectedDate = scope.$parent.isSelectedDate;
        }
    };

}]);