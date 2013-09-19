all: node_modules run

lint: node_modules
	./node_modules/.bin/grunt

node_modules: package.json
	npm install

run: lint
	node index.js

clean:
	rm -rf node_modules/

$.PHONY: lint run
