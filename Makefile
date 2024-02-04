NOW := $(shell date +"%y%m%dT%H%M%S")
SCRIPTS_PATH := $(CURDIR)/scripts
REPORTS_PATH := $(CURDIR)/reports
name ?=

k6-init:
ifdef name
	@docker run --rm -i -v $(SCRIPTS_PATH):/scripts -w /scripts grafana/k6 new $(name).js
else
	@docker run --rm -i -v $(SCRIPTS_PATH):/scripts -w /scripts grafana/k6 new $(NOW)-script.js
endif
.PHONY: init

k6-run:
ifdef name
	@docker run \
	-v $(REPORTS_PATH):/reports \
	-e K6_WEB_DASHBOARD=true \
	-e K6_WEB_DASHBOARD_EXPORT=/reports/$(NOW)-$(name).html \
	--rm -i grafana/k6 run - <$(SCRIPTS_PATH)/$(name).js && \
	open $(REPORTS_PATH)/$(NOW)-$(name).html
else
	@docker run \
	-v $(REPORTS_PATH):/reports \
	-p 5665:5665 \
	-e K6_WEB_DASHBOARD=true \
	-e K6_WEB_DASHBOARD_EXPORT=/reports/$(NOW)-script.html \
	--rm -i grafana/k6 run - <$(SCRIPTS_PATH)/$(NOW)-script.js && \
	open $(REPORTS_PATH)/$(NOW)-script.html
endif
.PHONY: run