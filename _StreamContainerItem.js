define([
        "dojo/_base/declare",
        "dojo/text!./resources/_StreamContainerItem.html",
        "dijit/_Widget",
        "dijit/_TemplatedMixin",
        "dijit/_CssStateMixin",
        "dijit/_Contained",
        "dojo/_base/fx", //baseFx.fadeIn
        "dojo/dom-style", //style.set
        "dojo/fx", //coreFx.combine coreFx.wipeIn
        "dojo/html" //html.set
],function(declare,template,_Widget,_TemplatedMixin,_CssStateMixin,_Contained,baseFx,style,coreFx,html) {
	
	return declare([_Widget,_TemplatedMixin,_Contained,_CssStateMixin],{
		
		templateString: template,
		insert: false,
		item: null,
		
		baseClass: "kpkStreamContainerItem",
		
		startup: function() {
			this.inherited(arguments);
			if (this.content) {
				if (this.insert) {
					style.set(this.containerNode,"opacity","0");
					style.set(this.domNode,"height","0px");
					html.set(this.containerNode,this.content);
					coreFx.combine([coreFx.wipeIn({node: this.domNode, duration: 750}),baseFx.fadeIn({node: this.containerNode, duration: 1000})]).play();
				} else {
					style.set(this.containerNode,"opacity","0");
					html.set(this.containerNode,this.content);
					baseFx.fadeIn({node: this.containerNode, duration: 1000}).play();
				}
			}
		}
	});
		
});