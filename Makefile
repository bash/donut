#
# (c) 2015 Ruben Schmidmeister <ruby@fog.im>
#
SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

.PHONY: all

all: css/style.min.css js/main.min.js

css/style.min.css: $(shell find css -name "*.css" ! -iname "style.min.css")
	postcss -u postcss-selector-matches -u postcss-import -u postcss-simple-vars -u autoprefixer -u postcss-discard-comments -u csswring css/style.css -o $@

js/main.min.js: $(shell find js -name "*.js" ! -iname "main.min.js")
	browserify -t babelify js/main.js -o | uglifyjs -o $@
