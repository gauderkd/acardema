import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    openCardCreator() {
      Ember.$('.createStart').hide();
      Ember.$('.slotDisplay').hide();
      Ember.$('.createSubmit').css("display","inline-block");
      Ember.$('.createCancel').css("display","inline-block");
      Ember.$('.slotCreate').css("display","table-cell");
    },

    cancelNewCard() {
      this.set('title', '');
      this.set('year', '');
      this.set('abstract', '');
      this.set('isRead', false);

      Ember.$('.createStart').css("display","inline-block");
      Ember.$('.slotDisplay').css("display","table-cell");
      Ember.$('.createSubmit').hide();
      Ember.$('.slotCreate').hide();
      Ember.$('.createCancel').hide();
    },

    createNewCard() {
      var card = this.store.createRecord("card", {
        title: this.get('title'),
        year: this.get('year'),
        abstract: this.get('abstract'),
        isRead: this.get('isRead')
      });
      card.save();

      this.set('title', '');
      this.set('year', '');
      this.set('abstract', '');
      this.set('isRead', false);

      Ember.$('.createStart').css("display","inline-block");
      Ember.$('.slotDisplay').css("display","table-cell");
      Ember.$('.createSubmit').hide();
      Ember.$('.slotCreate').hide();
      Ember.$('.createCancel').hide();
    },

    deleteCard(card) {
      if(confirm("Are you sure you'd like to delete this?")) {
        card.deleteRecord();
        card.save();
      } else {
        return false;
      }
    },

    // toggleCardRead(card) {
    //     var isitRead =  card.get('isRead');
    //     if (isitRead === false) {
    //       card.set('isRead',true);
    //     } else {
    //       card.set('isRead',false);
    //     }
    //     card.save();
    // },

    viewCard(card) {
      var title = card.get('title');
      var year = card.get('year');
      var abstract = card.get('abstract');
      Ember.$('.cardTitle').text(title);
      Ember.$('.cardYear').text(year);
      Ember.$('.cardAbstract').text(abstract);
    }
  }
});
