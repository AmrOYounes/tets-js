  let gulp=require('gulp'),
  sass=require('gulp-sass'),
  concat=require('gulp-concat'),
  livereload = require('gulp-livereload'),
  inject = require('gulp-inject'),
  uglify = require('gulp-uglify');


 
// gulp.task('build',()=>{

// });
gulp.task('scripts',()=>{
    //  var target = gulp.src('Scripts/vendorScripts/*.js');
    // var target=gulp.src('./index.html');
    // var jss=gulp.src(['Scripts/vendorScripts/jquery.min.js','Scripts/vendorScripts/.js']).pipe(concat('result.js')).pipe(gulp.dest('Scripts/vendorScripts'));
    // var sources = gulp.src(, {read: false});
    // return target.pipe(inject(sources))
    // .pipe(gulp.dest('dis'));
    // return gulp.src('Scripts/**/*.js')
    // .pipe(concat('main.js'))
    // .pipe(gulp.dest('dis'));
    return gulp.src(['Scripts/vendorScripts/jquery/*.js','Scripts/vendorScripts/*.js'])
   .pipe(concat('vendor.js')).pipe(uglify()).pipe(gulp.dest('dis')).pipe(gulp.src('Scripts/myScript/*.js').pipe(concat('myscript.js')).pipe(uglify()).pipe(gulp.dest('dis')))
   .pipe(livereload());
   
});
gulp.task('inject',()=>{
    var target=gulp.src('index.html');
    // var target2=gulp.src('index.html');
    var sos=gulp.src(['./dis/vendor.js','./dis/myscript.js','./dis/main.css']);
    target.pipe(inject(sos,{ relative: true })).pipe(gulp.dest('./'));
    // var sos2=gulp.src('dis/myscript.js');
    // target2.pipe(inject(sos2)).pipe(gulp.dest('./'));
    // var x=gulp.src('dis/main.css');
    
});

gulp.task('sass',()=>{
    return gulp.src('Styles/myStyle/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dis'))
    .pipe(gulp.dest('Styles/myStyle'))
    .pipe(gulp.src((['Styles/myStyle/*.css','Styles/vendorStyles/*.css'])
    
    )
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dis'))
    )

    .pipe(livereload());
  


});
gulp.task('html',()=>{
   
    return gulp.src('index.html')
    // .pipe(gulp.dest('./index.html'))
    .pipe(livereload());


});




gulp.task('dowork',function(){
   
require('./server.js');
livereload.listen();
gulp.watch('Styles/myStyle/*.scss',gulp.task('sass'));
gulp.watch('index.html',gulp.task('html'));
gulp.watch('Scripts/myScript/*.js',gulp.task('scripts'));
});

    
// gulp.watch('dis/index.html',function(){
//    return gulp.src('dis/index.html')
//     .pipe(gulp.dest('dis'))
//     .pipe(livereload());
// });
// });

// gulp.task('wat',()=>{
//     require('./server.js');
   
//     gulp.watch('Styles/myStyle/main.scss',['sass']);
// });