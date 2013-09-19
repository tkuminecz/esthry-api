all: node_modules

lint: node_modules
	./node_modules/.bin/grunt

node_modules: package.json
	npm install

clean:
	rm -rf node_modules/
