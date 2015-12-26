#
# (c) 2015 Ruben Schmidmeister <ruby@fog.im>
#
SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

BUNDLE := css/style.css js/main.js

.PHONY: all clean lint

all: $(BUNDLE)

clean:
	rm -rf $(BUNDLE)

lint:
	jshint js/src

css/style.css: $(shell find less -name "*.less")
	mkdir -p $(dir $@)
	lessc -clean-css less/style.less | postcss -u autoprefixer -o $@

js/main.js: $(shell find js/src -name "*.js")
	browserify -t babelify js/src/main.js -o | uglifyjs -o $@
