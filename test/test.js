var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var angularjsx = require('../');

describe('gulp-angular-jsx', function() {
    describe('in buffer mode', function() {

        it('should ignore non-templates', function(done) {

            // create the fake file
            var fakeFile = new File({
                contents: new Buffer('var x = {};')
            });

            // Create a prefixer plugin stream
            var myPrefixer = angularjsx('prependthis');

            // write the fake file to it
            myPrefixer.write(fakeFile);

            // wait for the file to come back out
            myPrefixer.once('data', function(file) {
                // make sure it came out the same way it went in
                assert(file.isBuffer());

                // check the contents
                assert.equal(file.contents.toString('utf8'), 'var x = {};');
                done();
            });

        });

        it('should replace JSX templates', function(done) {

            // create the fake file
            var fakeFile = new File({
                contents: new Buffer('var x = {template: <div>{{a}}</div>};')
            });

            // Create a prefixer plugin stream
            var myPrefixer = angularjsx('prependthis');

            // write the fake file to it
            myPrefixer.write(fakeFile);

            // wait for the file to come back out
            myPrefixer.once('data', function(file) {
                // make sure it came out the same way it went in
                assert(file.isBuffer());

                // check the contents
                assert.equal(file.contents.toString('utf8'), 'var x = {template: "<div>{{a}}</div>"};');
                done();
            });

        });

    });
});