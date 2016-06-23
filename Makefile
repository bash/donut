SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

BUNDLE := build/css/style.css build/js/main.js build/js/polyfills.js

LESS_FILES := $(shell find less -name "*.less")
JS_FILES := $(wildcard js/*.js)
POLYFILL_FILES := $(shell find polyfills -name "*.js")

.PHONY: all clean lint install-deps

all: $(BUNDLE)

clean:
	rm -rf build/

install-deps:
	npm install

lint:
	standard js/**/*.js
	lessc --lint less/style.less

build/css/style.css: $(LESS_FILES)
	@mkdir -p $(@D)
	lessc -clean-css less/style.less | postcss -u autoprefixer -o $@

build/js/main.js: $(JS_FILES)
	@mkdir -p $(@D)
	browserify -t babelify js/main.js -o | uglifyjs -o $@

build/js/polyfills.js: $(POLYFILL_FILES)
	@mkdir -p $(@D)
	uglifyjs $+ -o $@

