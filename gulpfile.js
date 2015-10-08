var gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    less = require("gulp-less"),
    webserver = require("gulp-webserver"),
    path = require("path"),
    url = require("url"),
    eslint = require("gulp-eslint"),
    concat = require("gulp-concat");

gulp.task("default", ["watch"]);

var pathList = ["src/bower_components/angular/angular.js", "src/bower_components/angular-route/angular-route.js",
    "src/bower_components/angular-ui-router/release/angular-ui-router.min.js", "src/app.js",
    "src/js/**"];

gulp.task("browser-sync", function () {

    browserSync.init({
        "server": {
            "baseDir": "dist",
            "index": "/index.html"
        }
    });

});

gulp.task("less", function () {
    return gulp.src("src/style/events.less")
        .pipe(less({
            "paths": [path.join(__dirname, "less", "includes")]
        }))
        .pipe(concat("events.css"))
        .pipe(gulp.dest("dist/style/"));
});

gulp.task("eslint", function () {
    return gulp.src("src/js/**")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});

gulp.task("webserver", function () {
    gulp.src("dist")
        .pipe(webserver({
            host: "warm-tor-4887.herokuapp.com",
            livereload: true,
            open: true
        }));
});

gulp.task("scripts", function () {
    return gulp.src(pathList)
        .pipe(concat("events.js"))
        .pipe(gulp.dest("dist/"));
});

gulp.task("copyAssets", function () {
    return gulp.src("src/assets/**")
        .pipe(gulp.dest("dist/assets/"));
});

gulp.task("copyTemplates", function () {
    return gulp.src("src/templates/**")
        .pipe(gulp.dest("dist/templates/"));
});

gulp.task("copyIndex", function () {
    return gulp.src("src/index.html")
        .pipe(gulp.dest("dist/"));
});

gulp.task("build", ["less", "copyAssets", "copyTemplates", "scripts", "copyIndex"]);

gulp.task("watch", function () {
    gulp.watch("/src/style/**", ["less"]);
    gulp.watch(pathList,["scripts"]);
    gulp.watch("/src/**").on("change", browserSync.reload);
});

gulp.task("dev-live", ["eslint", "build", "browser-sync", "watch"]);
