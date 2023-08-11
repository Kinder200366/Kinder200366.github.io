/*
 * @Description: gulp
 * @Author: ��֪��
 * @Email: 2268025923@qq.com
 * @Date: 2022-02-22 11:22:57
 * @LastEditTime: 2022-08-18 12:24:11
 * @LastEditors: ��֪��
 */
import gulp from "gulp";
import cleanCSS from "gulp-clean-css";
import htmlmin from "gulp-htmlmin";
import htmlclean from "gulp-htmlclean";
import workbox from "workbox-build";
import fontmin from "gulp-fontmin";

// ��ʹ��babelѹ��js����ȡ���·�ע�ͣ���ע��terser�Ĵ���
// var uglify = require('gulp-uglify');
// var babel = require('gulp-babel');

// ��ʹ��terserѹ��js
import terser from "gulp-terser";

//pwa
gulp.task("generate-service-worker", () => {
  return workbox.injectManifest({
    swSrc: "./sw-template.js",
    swDest: "./public/sw.js",
    globDirectory: "./public",
    globPatterns: [
      // ���������������͵��ļ������˲��Ƽ�
      // "**/*.{html,css,js,json,woff2,xml}"
      // �Ƽ�ֻ����404����ҳ����Ҫ��ʽ�ͽű���
      "404.html",
      "index.html",
      "js/main.js",
      "css/index.css",
    ],
    modifyURLPrefix: {
      "": "./",
    },
  });
});

//minify js babel
// ��ʹ��babelѹ��js����ȡ���·�ע�ͣ���ע��terser�Ĵ���
// gulp.task('compress', () =>
//   gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
// 		.pipe(babel({
// 			presets: ['@babel/preset-env']
// 		}))
//     .pipe(uglify().on('error', function(e){
//       console.log(e);
//     }))
// 		.pipe(gulp.dest('./public'))
// );

// minify js - gulp-tester
// ��ʹ��terserѹ��js
gulp.task("compress", () =>
  gulp
    .src([
      "./public/**/*.js",
      "!./public/**/*.min.js",
      "!./public/js/custom/galmenu.js",
      "!./public/js/custom/gitcalendar.js",
    ])
    .pipe(terser())
    .pipe(gulp.dest("./public"))
);

//css
gulp.task("minify-css", () => {
  return gulp
    .src("./public/**/*.css")
    .pipe(
      cleanCSS({
        compatibility: "ie11",
      })
    )
    .pipe(gulp.dest("./public"));
});

// ѹ�� public Ŀ¼�� html
gulp.task("minify-html", () => {
  return gulp
    .src("./public/**/*.html")
    .pipe(htmlclean())
    .pipe(
      htmlmin({
        removeComments: true, //��� HTML �]��
        collapseWhitespace: true, //ѹ�� HTML
        collapseBooleanAttributes: true, //ʡ�Բ������Ե�ֵ <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //ɾ�����пո�������ֵ <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //ɾ�� <script> �� type="text/javascript"
        removeStyleLinkTypeAttributes: true, //ɾ�� <style> �� <link> �� type="text/css"
        minifyJS: true, //ѹ��ҳ�� JS
        minifyCSS: true, //ѹ��ҳ�� CSS
        minifyURLs: true,
      })
    )
    .pipe(gulp.dest("./public"));
});

//ѹ������
function minifyFont(text, cb) {
  gulp
    .src("./public/fonts/*.ttf") //ԭ��������Ŀ¼
    .pipe(
      fontmin({
        text: text,
      })
    )
    .pipe(gulp.dest("./public/fontsdest/")) //ѹ��������Ŀ¼
    .on("end", cb);
}

gulp.task("mini-font", cb => {
  var buffers = [];
  gulp
    .src(["./public/**/*.html"]) //HTML�ļ�����Ŀ¼�������������޸�
    .on("data", function (file) {
      buffers.push(file.contents);
    })
    .on("end", function () {
      var text = Buffer.concat(buffers).toString("utf-8");
      minifyFont(text, cb);
    });
});

// ִ�� gulp ����ʱִ�е�����
gulp.task(
  "default",
  gulp.series("generate-service-worker", gulp.parallel("compress", "minify-html", "minify-css", "mini-font"))
);