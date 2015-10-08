app.service("mainService", [function () {
    var state = "date";
    this.setEventState = function (newState) {
        state = newState;
    };
    this.getEventState = function () {
        return state;
    };
}]);