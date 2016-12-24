SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

PROJECT_NAME := donut

LESS_FILES := $(shell find less -name "*.less")
JS_FILES := $(shell find js -name "*.js")

# List of polyfills to include (sorted manually)
POLYFILLS := polyfills/MutationObserver.js \
			 polyfills/harmony-collections.js \
             polyfills/fetch.js \
             polyfills/custom-elements.js

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
ifeq ($(NODE_ENV), production)
	lessc less/$(PROJECT_NAME).less | postcss -u autoprefixer -u cssnano -o $@
else
	lessc less/$(PROJECT_NAME).less | postcss -u autoprefixer -o $@
endif

build/js/$(PROJECT_NAME).js: $(JS_FILES)
	@mkdir -p $(@D)
	rollup -c $(ROLLUP_CONFIG) -o $@ js/$(PROJECT_NAME).js

build/js/polyfills.js: $(POLYFILLS)
	@mkdir -p $(@D)
	uglifyjs $+ -o $@

