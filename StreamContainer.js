define([
        "dojo/_base/declare",
        "dojo/text!./resources/StreamContainer.html",
        "dijit/layout/_LayoutWidget",
        "dijit/_TemplatedMixin",
        "dijit/_CssStateMixin",
        "./_StreamContainerItem",
        "dojo/_base/array", //arrayUtil.forEach
        "dojo/_base/connect", //connect.disconnect
        "dojo/_base/event", //event.stop
        "dojo/_base/lang", //lang.trim
        "dojo/dom-attr", //attr.set attr.get attr.has
        "dojo/dom-geometry", //domGeometry.position
        "dojo/dom-style", //style.set
        "dojo/html", //html.set
        "dojo/query", //query
        "dojo/window" //winUtils.getBox
],function(declare,template,_LayoutWidget,_TemplatedMixin,_CssStateMixin,_StreamContainerItem,arrayUtil,connect,event,lang,attr,domGeometry,style,html,query,winUtils) {
	
	return declare([_LayoutWidget,_TemplatedMixin,_CssStateMixin],{
		
		templateString: template,
		title: "",
		header: "",
		post: false,
		more: false,
		moreLabel: "More...",
		moreVisible: false,
		moreLoading: false,
		moreAutoLoad: true,
		emptyMessage: "Nothing here...",
		
		_titleStyle: "",
		_headerStyle: "",
		_emptyContainer: true,
		
		baseClass: "kpkStreamContainer",
		cssStateNodes: {
			"moreNode" : "kpkStreamContainerMore",
			"titleNode" : "kpkStreamContainerTitle"
		},
		
		constructor: function() {
			this._moreConnections = [];
		},
		
		postCreate: function(){
			this.inherited(arguments);
			
			if (this.title) {
				html.set(this.titleNode,this.title);
			}
			if (this.header) {
				html.set(this.headerNode,this.header);
			}
			if (this._titleStyle) {
				attr.set(this.titleNode,'style',this._titleStyle);
			}
			if (this._headerStyle) {
				attr.set(this.headerNode,'style',this._headerStyle);
			}
			if (this.post) {
				style.set(this.postNode,'visibility','visible');
			}
		},
				
		markupFactory: function (params, srcNodeRef, ctor) {
			query('div',srcNodeRef).map(function(node){
				if (attr.has(node,'data-dojo-subtype')) {
					var subType = lang.trim(attr.get(node,'data-dojo-subtype')).toLowerCase();
					switch (subType) {
					case 'title' :
						params.title = (node.children.length) ? node.children : node.innerHTML;
						if (attr.has(node,'style')) params._titleStyle = attr.get(node,'style');
						break;
					case 'header' :
						params.header = (node.children.length) ? node.children : node.innerHTML;
						if (attr.has(node,'style')) params._headerStyle = attr.get(node,'style');
						break;
					}
				}
				srcNodeRef.removeChild(node);
			});
			return new ctor(params, srcNodeRef);
		},
		
		_setTitleAttr: null,
		
		_setMoreAttr: function(more) {
			if (more !== this.more) {
				if (more) {
					style.set(this.moreNode,'visibility','visible');
					this._moreConnections.push(this.connect(this.domNode.parentNode, "onscroll", "_calcMoreVisible"));
					this._moreConnections.push(this.connect(null, "onscroll", "_calcMoreVisible"));
				} else {
					style.set(this.moreNode,'visibility','hidden');
					arrayUtil.forEach(this._moreConnections,connect.disconnect);
				}
				this.more = more;
			}
		},
		
		_setPostAttr: function(value) {
			if (value !== this.post) {
				if (value) {
					style.set(this.postNode,'visibility','visible');
				} else {
					style.set(this.postNode,'visibility','hidden');
				}
				this.post = value;
			}
		},
		
		addChild: function(/*dijit._Widget*/ widget, /*int?*/ insertIndex){
			if (this._emptyContainer) {
				this.destroyDescendants();
				this.containerNode.innerHTML = "";
				this._emptyContainer = false;
			}
			this.inherited(arguments);
		},
		
		addItem: function (/* String */ content, /*Object */ item) {
			this.addChild(new _StreamContainerItem({
				content: content,
				insert: true,
				item: item
			}),0);
		},
		
		appendItem: function(/* String */ content, /* Object */ item) {
			this.addChild(new _StreamContainerItem({
				content: content,
				insert: false,
				item: item
			}));
		},
		
		resize: function(changeSize,resultSize) {
			this.inherited(arguments);
			if (this.more) {
				this._calcMoreVisible();
			}
		},
		
		_calcMoreVisible: function() {
			var morePos = domGeometry.position(this.moreNode,true);
			var winPos = winUtils.getBox();
			var moreVisible = (((morePos.y > (winPos.t))&&(morePos.y <= (winPos.h + winPos.t))) && ((morePos.x > winPos.l)&&(morePos.x <= (winPos.w + winPos.l))));
			if (moreVisible !== this.moreVisible) {
				if (!this.moreVisible && moreVisible) {
					this.onMoreVisible();
				}
				this.moreVisible = moreVisible;
			}
		},
		
		onMoreVisible: function() {},
		
		_onMoreClick: function(/* Event */ e) {
			if (this.disabled) {
				event.stop(e);
				return false;
			}
			return this.onMoreClick(e);
		},
		
		onMoreClick: function(/* Event */ e) {
			return true;
		},
		
		onPost: function() {
			return true;
		}
		
	});
	
});