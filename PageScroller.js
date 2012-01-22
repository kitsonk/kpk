define([
        "dojo/_base/declare",
        "dijit/_Widget",
        "dijit/layout/_LayoutWidget",
        "dijit/_TemplatedMixin",
        "dijit/_Contained",
        "dojo/text!./resources/PageScroller.html",
        "dojo/i18n!dijit/nls/loading",
        "dojo/string",
        "dojo/i18n"
],function(declare, _Widget, _LayoutWidget, _TemplatedMixin, _Contained, template, nlsLoading, string, i18n){
	
	var _Page = declare([_Widget, _TemplatedMixin, _Contained],{
		template: "<div class='${baseClass}' role='presentation'><div data-dojo-attach-point='containerNode' class='${baseClass}Inner'></div></div>",
		item: null,
		baseClass: "kpkPageScrollerPage",
		
		startup: function() {
			
		}
	});
	
	return declare([_LayoutWidget, _TemplatedMixin],{
		
		templateString: template,
		baseClass: "kpkPageScroller",
		
		loadingMessage: "<span class='kpkPageScrollerLoading'><span class='dijitInline dijitIconLoading'></span>${loadingState}</span>",
		errorMessage: "<span class='kpkPageScrollerError'><span class='dijitInline dijitIconError'></span>${errorState}</span>",
		
		store: null,
		query: null,
		queryOptions: null,
		start: 0,
		count: 10,
		totalCount: 0,
		totalAutoLoad: 0,
		sort: null,
		pageField: "page",
		lineCountField: "lines",
		
		_pages: [],
		_contentSetter: null,
		
		postMixinProperties: function() {
			this.inherited(arguments);
			var messages = i18n.getLocalization("dijit", "loading", this.lang);
			this.loadingMessage = string.substitute(this.loadingMessage, messages);
			this.errorMessage = string.substitute(this.errorMessage, messages);
		},
		
		postCreate: function() {
			
		},
		
		_onScroll: function() {
			
		},
		
		_onKeyPress: function() {
			
		}
	});
	
});