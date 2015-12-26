#
# (c) 2015 Ruben Schmidmeister <ruby@fog.im>
#
SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

BUNDLE := css/style.css js/main.min.js

.PHONY: all

all: $(BUNDLE)

clean:
	rm -rf $(BUNDLE)

css/style.css: $(shell find less -name "*.less")
	mkdir -p $(dir $@)
	lessc -clean-css less/style.less | postcss -u autoprefixer -o $@

js/main.min.js: $(shell find js -name "*.js" ! -iname "main.min.js")
	browserify -t babelify js/main.js -o | uglifyjs -o $@
