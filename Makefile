REPORTER = spec

test:
	    @./node_modules/.bin/mocha \
	          --reporter $(REPORTER) tests/*.js

.PHONY: test
