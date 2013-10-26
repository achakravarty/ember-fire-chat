FireChat = Ember.Application.create();

FireChat.IndexRoute = Ember.Route.extend({
	model: function() {
		return EmberFire.Array.create({
			ref: new Firebase("https://ember-fire-chat.firebaseio.com/")
		});
	}
});

FireChat.IndexController = Ember.ArrayController.extend({
	from:localStorage.name,
	msg: "",
	actions: {
		sendMessage: function() {
			if(localStorage.name == undefined || localStorage.name == ""){
				localStorage.name = this.get("from");
			}
			this.pushObject({from: this.get("from"), msg: this.get("msg")});
			this.set("msg", null);
		}
	}
});

FireChat.ScrollingDivComponent = Ember.Component.extend({
	scheduleScrollIntoView: function() {
    // Only run once per tick, once rendering has completed;
    // avoid flood of scrolls when many updates happen at once
    Ember.run.scheduleOnce("afterRender", this, "scrollIntoView");
}.observes("update-when.@each"),

scrollIntoView: function() {
	this.$().scrollTop(this.$().prop("scrollHeight"));
}
});