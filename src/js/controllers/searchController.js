app.controller("searchController", ["$scope", "$state", "searchEventService", "mainService",
    function ($scope, $state, searchEventService, mainService) {

    $scope.submitQuery = function (keyEvent) {
        if (keyEvent.which === 13) {
            var q = $scope.query;
            searchEventService.setQuery(q);
            mainService.setEventState("search");
            $state.reload();
        }
    }
}]);