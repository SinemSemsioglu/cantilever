"use strict";

var app = angular.module("eventsApp", ["ui.router"]);

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("eventsList", {
			"templateUrl": "templates/landing.html",
			"abstract": "true"
		})
		.state("eventsList.children", {
		  "url": "/list",
			"views": {
				"list": {
					"templateUrl" : "templates/events.html"
				},
				"calendar": {
					"templateUrl": "templates/date.html",
					"controller": "calendarController"
				},
				"detail": {
					"controller": "eventsDetailController",
					"templateUrl": "templates/detail.html"
				}
			}
		});
		$urlRouterProvider.otherwise("/list");
});