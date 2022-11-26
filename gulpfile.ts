import gulp from 'gulp'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import ts from 'gulp-typescript'

const sassTranspiler = gulpSass(dartSass)
const tsTranspiler = ts.createProject('tsconfig.json')

// Defines the asset base directories.
const base = {
    source: './soph/resources',
    dist: './soph/assets'
}

/**
 * Transpiles the Sass files.
 *
 * @returns The Gulp stream.
 */
function buildStyles() {
    return gulp.src(`${base.source}/sass/**/*.scss`)
        .pipe(sassTranspiler({
            outputStyle: 'compressed'
        })
        .on('error', sassTranspiler.logError))
        .pipe(gulp.dest(`${base.dist}/styles`))
}

/**
 * Transpile the TypeScript files.
 * 
 * @returns The TypeScript stream.
 */
function buildScripts() {
    return gulp.src(`${base.source}/ts/**/*.ts`)
        .pipe(tsTranspiler())
        .pipe(gulp.dest(`${base.dist}/scripts`))
}

/**
 * Watches for file changes.
 * 
 * @returns void
 */
function watch(): void {
    gulp.watch(`${base.source}/sass/**/*.scss`, buildStyles)
    gulp.watch(`${base.source}/ts/**/*.ts`, buildScripts)
}

const build = gulp.parallel(buildStyles, buildScripts)

export {
    build as default,
    build,
    watch
}
