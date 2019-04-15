"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync");
var browserSyncReload = browserSync.reload;

var srcSass = "src/scss/*scss";
var srcWatchSass = "src/scss/**/*scss";
var destCSS = "assets/css";

// sass task - compile sass to css
gulp.task("sass", function () {
    console.log("Compiling SCSS files...");
    return gulp
        .src(srcSass)
        .pipe(sass().on("error", sass.logError))
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"],
                cascade: false,
                grid: true,
                supports: false
            })
        )
        // .pipe(extractMediaQueries())
        .pipe(gulp.dest(destCSS))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// browser-sync - reloads page after changing less
gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "./",
            index: "index.html"
        },
        injectChanges: true
    });
});

// watch task - starts tasks on file change
gulp.task("watch", ["browser-sync"], function () {
    console.log("Watching files...");
    gulp.watch([srcSass, srcWatchSass], ["sass"]);
});

// default task - start all tasks
gulp.task("default", ["sass"]);