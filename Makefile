SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

PROJECT_NAME := donut

LESS_FILES := $(shell find less -name "*.less")
JS_FILES := $(wildcard js/*.js)
POLYFILL_FILES := $(shell find polyfills -name "*.js")

ROLLUP_CONFIG := .rollup.config.js

.PHONY: all clean lint deps

all: build/css/$(PROJECT_NAME).css build/js/$(PROJECT_NAME).js build/js/polyfills.js

clean:
	rm -rf build/

deps:
	npm prune
	npm install

lint:
	standard js/**/*.js
	lessc --lint less/style.less

build/css/$(PROJECT_NAME).css: $(LESS_FILES)
	@mkdir -p $(@D)
	lessc -clean-css less/$(PROJECT_NAME).less | postcss -u autoprefixer -o $@

build/js/$(PROJECT_NAME).js: $(JS_FILES)
	@mkdir -p $(@D)
	rollup -c $(ROLLUP_CONFIG) -o $@ js/$(PROJECT_NAME).js

build/js/polyfills.js: $(POLYFILL_FILES)
	@mkdir -p $(@D)
	uglifyjs $+ -o $@

