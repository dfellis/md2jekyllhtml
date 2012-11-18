var markdown = require('node-markdown').Markdown;

module.exports = function md2jekyllhtml(md) {
	var ghSyntaxOpenBlock = false;
    var chunks = [];
	return markdown(md.split('```').map(function(chunk, i) {
		if(ghSyntaxOpenBlock) {
            chunks.push(chunk);
            chunk = "$chunk{" + (chunks.length - 1) + "}";
			ghSyntaxOpenBlock = false;
		} else {
			ghSyntaxOpenBlock = true;
		}
		return chunk;
	}).reduce(function(sum, cur) {
		return sum + cur;
	}, "")).replace(/<p>\$chunk{([0-9]+)}<\/p>/g, function(match, num) {
        return chunks[num].replace(/^([A-Za-z]*)/, "{% highlight $1 %}") + "{% endhighlight %}"
    });
};
