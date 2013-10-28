FireChat = Ember.Application.create();

FireChat.IndexRoute = Ember.Route.extend({
	model: function() {
		return EmberFire.Array.create({
			ref: new Firebase("https://ember-fire-chat.firebaseio.com/")
		});
	}
});

FireChat.IndexController = Ember.ArrayController.extend({
	actions: {
		sendMessage: function() {
			if(localStorage.name == undefined || localStorage.name == ""){
				localStorage.name = this.get("from");
			}
			this.pushObject(
				FireChat.Chat.create({from: this.get("from"), msg: this.get("msg")}));
			this.set("msg", null);
		}
	}
});

FireChat.ScrollingDivComponent = Ember.Component.extend({
	scheduleScrollIntoView: function() {
		Ember.run.scheduleOnce("afterRender", this, "scrollIntoView");
	}.observes("update-when.@each"),

	scrollIntoView: function() {
		this.$().scrollTop(this.$().prop("scrollHeight"));
	}
});

FireChat.Chat = Ember.Object.extend({
	from:localStorage.name,
	msg:''
});