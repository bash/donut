#
# (c) 2015 Ruben Schmidmeister <ruby@fog.im>
#
SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

.PHONY: all

all: build/style.css

build/style.css: $(shell find css -name "*.css")
	mkdir -p $(dir $@)
	postcss -u postcss-selector-matches -u postcss-import -u postcss-simple-vars -u autoprefixer css/style.css -o $@
