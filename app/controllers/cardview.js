import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createNewCard() {
      var card = this.store.createRecord("card", {
        title: this.get('title'),
        year: this.get('year'),
        isRead: this.get('isRead')
      });
      card.save();

      this.set('title', '');
      this.set('year', '');
      this.set('isRead', false);
    },

    deleteCard(card) {
      card.deleteRecord();
      card.save();
    },

    toggleCardRead(card) {
        var isitRead =  card.get('isRead');
        if (isitRead === false) {
          card.set('isRead',true);
        } else {
          card.set('isRead',false);
        }
        card.save();
    },

    viewCard(card) {
      var title = card.get('title');
      var year = card.get('year');
      Ember.$('.cardTitle').text(title);
      Ember.$('.cardYear').text(year);
    }
  }
});
