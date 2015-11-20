#
# (c) 2015 Ruben Schmidmeister <ruby@fog.im>
#
SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

.PHONY: all

all: css/style.min.css

css/style.min.css: $(shell find css -name "*.css" ! -iname "style.min.css")
	postcss -u postcss-selector-matches -u postcss-import -u postcss-simple-vars -u autoprefixer -u postcss-discard-comments -u csswring css/style.css -o $@
