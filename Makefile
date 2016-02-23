SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

BUNDLE := build/index.js build/index.min.js
JS_FILES := $(shell find lib -name "*.js")

.PHONY: all clean lint

all: $(BUNDLE)

clean:
	rm -rf $(BUNDLE)

lint:
	standard lib/**/*.js

build/index.js: $(JS_FILES)
	mkdir -p $(dir $@)
	browserify -t babelify lib/index.js -o $@

build/index.min.js: build/index.js
	mkdir -p $(dir $@)
	uglifyjs $< -o $@
