.PHONY: test test-ci-coverage release coverage

CODECOV=node_modules/.bin/codecov

default:
	npm run build

test:
	npm test

coverage:
	npm run coverage
	rm -rf .nyc_output

test-ci-coverage: coverage
	npm install codecov.io
	rm -f ./lcov.info
	npm run coverage

	@echo
	@echo Sending report to codecov...
	@cat ./lcov.info | $(CODECOV)
	@rm -f ./lcov.info
	@echo Done

release:
ifeq ($(strip $(version)),)
	@echo "\033[31mERROR:\033[0;39m No version provided."
	@echo "\033[1;30mmake release version=1.0.0\033[0;39m"
else
	rm -rf node_modules
	npm install
	make
	make test
	sed -i.bak 's/"version": "[^"]*"/"version": "$(version)"/' package.json
	rm *.bak
	git add .
	git commit -a -m "Released $(version)."
	git tag v$(version)
	git push origin master
	git push origin --tags
	npm publish
	@echo "\033[32mv${version} released\033[0;39m"
endif
