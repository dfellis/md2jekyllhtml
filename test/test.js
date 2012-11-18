var fs = require('fs');
var jscoverage = require('jscoverage');
var cr = require('complexity-report');
var require = jscoverage.require(module);
var md2jekyllhtml = require('../lib/md2jekyllhtml', true);

exports.testBasicMarkdown = function(test) {
    test.expect(1);
    test.equal('<h1>Hello, World!</h1>', md2jekyllhtml('# Hello, World!'), 'Standard markdown translation works');
    test.done();
};

exports.testJekyllStyleSourceHighlighting = function(test) {
    test.expect(1);
    test.equal('{% highlight js %} var foo = "bar";{% endhighlight %}', md2jekyllhtml('```js var foo = "bar";```'), 'Jekyll-style source highlighting works');
    test.done();
};

exports.testCombination = function(test) {
    test.expect(1);
    test.equal('<h1>Hello, World!</h1>\n\n{% highlight js %}\nvar foo = "bar";\n{% endhighlight %}', md2jekyllhtml('# Hello, World!\n\n```js\nvar foo = "bar";\n```'), 'The combination works');
    test.done();
};

exports.jscoverage = function(test) {
	test.expect(2);
	var file, tmp, source, total, touched;
	for (var i in _$jscoverage) {
		test.ok(true, 'only one file tested by jscoverage');
		file = i;
		tmp = _$jscoverage[i];
		source = _$jscoverage[i].source;
		total = touched = 0;
		for (var n=0,len = tmp.length; n < len ; n++){
			if (tmp[n] !== undefined) {
			    total ++ ;
				if (tmp[n] > 0) {
					touched ++;
				} else {
					console.log(n + "\t:" + source[n-1]);
				}
			}
		}
		test.equal(total, touched, 'All lines of code touched by test suite');
	}
	test.done();
};

exports.complexity = function(test) {
    test.expect(1);
    test.ok(70 <= cr.run(fs.readFileSync('./lib/md2jekyllhtml.js', 'utf8')).maintainability, 'md2jekyllhtml is not considered overly complex');
    test.done();
};
