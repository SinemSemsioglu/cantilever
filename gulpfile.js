var gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    url = require("url"),
    proxy = require("proxy-middleware"),
    eslint = require("gulp-eslint");

var pathList = [];

gulp.task("default", ["watch"]);

gulp.task("browser-sync", function () {

    browserSync.init({
        "server": {
            "baseDir": "src",
            "index": "/index.html"
        }
    });

});

gulp.task("less", function () {
    return gulp.src("src/style/onboarding.less")
        .pipe(less({
            "paths": [path.join(__dirname, "less", "includes")]
        }))
        .pipe(concat("onboarding.css"))
        .pipe(gulp.dest("style/"));
});

gulp.task("eslint", function () {
    return gulp.src("src/js/**")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});

gulp.task("watch", function () {
    gulp.watch("/src/style/**", ["less"]);
    gulp.watch("/src/**").on("change", browserSync.reload);
});

gulp.task("dev-live", ["eslint", "browser-sync", "watch"]);
