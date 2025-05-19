const gulp = require('gulp');
const notify = require('gulp-notify');  // エラー通知
const plumber = require('gulp-plumber'); // エラー時のタスク停止防止
const debug = require('gulp-debug'); // ログ表示
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require("gulp-sass-glob-use-forward"); // sassのuseやforwardを使えるようにする
const dartSass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer'); // ベンダープレフィックス付与
const sourcemaps = require('gulp-sourcemaps'); // ソースマップ出力


const paths = {
  scss: {
    src: './sass/**/*.scss', // コンパイル対象
    dest: './www/css' // 出力先
  }
}

/**
 * scssタスクで実行する関数
 */
function scss() {
  return gulp.src(paths.scss.src)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sassGlob())                  // glob機能を使って@useや@forwardを省略する
    .pipe(sourcemaps.init())
    .pipe(dartSass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
      cascade: true
    }))
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(debug({title: 'scss dest:'}));
}

/**
 * watchタスクで実行する関数
 */
function watch() {
  return gulp.watch(paths.scss.src, gulp.series(scss))
}

exports.scss = scss; // scssタスク
exports.watch_sass = gulp.series(watch); // watchタスク
exports.default = gulp.series(scss); // defaultタスク
