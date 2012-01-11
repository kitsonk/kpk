define([
        "dojo/_base/declare",
        "./StreamContainer",
        "dojo/text!./resources/StreamContainer.html",
        "dojo/store/DataStore",
        "dojo/store/Observable",
        "dojo/_base/Deferred" //Deferred.when
],function(declare,StreamContainer,template,DataStore,Observable,Deferred) {
	
	return declare([StreamContainer],{
		
		templateString: template,
		
		store: null,
		query: null,
		newItemQuery: null,
		queryOptions: null,
		start: 0,
		count: 10,
		totalCount: 0,
		totalAutoLoad: 0,
		sort: null,
		contentField: 'value',
		_start: 0,
		_storeWrite: false,
		
		startup: function(){
			this.inherited(arguments);
			this._doQuery();
		},
		
		_setStoreAttr: function(value) {
			this.store = value;
		},
		
		_setStoreAttr: function(store) {
			if (typeof store.getFeatures === "function") {
				this.store = new Observable(new DataStore(store));
			} else {
				if (typeof store.notify !== "function") {
					this.store = new Observable(store);
				} else {
					this.store = store;
				}
			}
		},
		
		_setQueryAttr: function(query) {
			this.query = query;
		},
		
		_setStartAttr: function(start) {
			this.start = start;
			this._start = start;
		},
		
		_doQuery: function() {
			var self=this;
			if (this.store) {
				var options = {};
				if (self._start) options.start = self._start;
				if (self.count) options.count = self.count;
				if (self.sort) options.sort = self.sort;
				if (self.queryOptions) options.queryOptions = self.queryOptions;
				var results = self.store.query(self.query,options);
				Deferred.when(results.total, function(totalCount){
					self.totalCount = totalCount;
					Deferred.when(results,function(results){
						for(var i=0; i<results.length;i++) {
							self._onItem(results[i]);
						}
						if ((results.length+self._start) < self.totalCount) {
							self.set("more",true);
						} else {
							self.set("more",false);
						}
						self._start += results.length;
						self.onQueryComplete(results);
					});
				});
			}
		},
		
		_onItem: function(item) {
			var content = this.onItem(item);
			if (content) {
				this.appendItem(content, item);
			} else {
				if (this.contentField in item) {
					this.appendItem(item[this.contentField],item);
				}
			}
		},
		
		onQueryStart: function(query,options) { },
		
		onQueryComplete: function(items) { },
		
		onItem: function(item) { }
		
	});
		
});