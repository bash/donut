#
# (c) 2015 Ruben Schmidmeister <ruby@fog.im>
#
SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

BUNDLE := build/css/style.css build/js/main.js
LESS_FILES := $(shell find less -name "*.less")
JS_FILES := $(shell find js -name "*.js")

.PHONY: all clean lint

all: $(BUNDLE)

clean:
	rm -rf build/

lint:
	standard js/**/*.js
	lessc --lint less/style.less

build/css/style.css: $(LESS_FILES)
	mkdir -p $(dir $@)
	lessc -clean-css less/style.less | postcss -u autoprefixer -o $@

build/js/main.js: $(JS_FILES)
	mkdir -p $(dir $@)
	browserify -t babelify js/main.js -o | uglifyjs -o $@
