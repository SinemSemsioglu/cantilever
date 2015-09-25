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
					"controller" : "eventsController",
					"templateUrl" : "templates/list.html"
				},
				"calendar": {
					"templateUrl": "templates/calendar.html",
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