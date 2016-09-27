import Ember from 'ember';
import Remarkable from 'remarkable';
import Card from '../models/card';

export default Ember.Controller.extend({
  actions: {
    openCardCreator() {
      // Empty Forms
      var attributes = Ember.get(Card, 'attributes');

      attributes.forEach(function(meta, name) {
        if (name === 'cardID' || name === 'rev') {

        } else {
          Ember.$('.'+name+'space').css('display','table');
        }
      });
      // Empty Forms
      this.set('title', '');
      this.set('year', '');
      this.set('authors', '');
      this.set('abstract', '');
      this.set('intro', '');
      this.set('hypothesis', '');
      this.set('methods', '');
      this.set('results', '');
      this.set('discussion', '');
      this.set('conclusion', '');
      this.set('notes', '');
      Ember.$('.createStart').hide();
      Ember.$('.slotDisplay').hide();
      Ember.$('.createSubmit').css("display","inline-block");
      Ember.$('.createCancel').css("display","inline-block");
      Ember.$('.slotCreate').css("display","table-cell");
    },
    viewCard: function(card) {
      var md = new Remarkable();
      var currentID = card.get('cardID');
      var listOfAttributes = Object.keys(card.toJSON());

      listOfAttributes.forEach(function(attr) {

        if (attr === 'cardID' || attr === 'rev') {} else {
        // unbind click event
        Ember.$('.cardfulltext').hide();
        Ember.$('.card'+attr+'_sen').unbind('click');

        if (card.get(attr).length > 0) {
          Ember.$('.'+attr+'space').show();
          if (attr === "title" || attr === "year" || attr === "authors") {
            Ember.$('.card'+attr).text(card.get(attr));
          } else {
            Ember.$('.card'+attr+'_sen').html(md.render(card.get(attr).split('.').shift()));
            if (card.get(attr).split('.').pop().length > 0) {
              Ember.$('.card'+attr+'_full').html(md.render(card.get(attr).split('.').pop()));
              // Add read more indicator
              Ember.$('.card'+attr+'_sen').append('<div class="cardReadMore">+++</div>');
              Ember.$('.card'+attr+'_sen').css('cursor','pointer');
              Ember.$('.card'+attr+'_sen').click(function() {
                Ember.$(this).siblings().slideToggle();
              });
            } else {
              Ember.$('.card'+attr+'_sen').css('cursor','default');
            }
          }
        } else {
          Ember.$('.'+attr+'space').hide();
        }
      }
      });

    // Indicate on list
      Ember.$('.listRow').removeClass('selectedButton');
      Ember.$('.'+currentID+'_row').addClass('selectedButton');
    },

    cancelNewCard() {
      // // Empty Forms
      // this.set('title', '');
      // this.set('year', '');
      // this.set('authors', '');
      // this.set('abstract', '');
      // this.set('intro', '');
      // this.set('hypothesis', '');
      // this.set('methods', '');
      // this.set('results', '');
      // this.set('conclusion', '');
      // this.set('notes', '');

      Ember.$('.createStart').css("display","inline-block");
      Ember.$('.slotDisplay').css("display","table-cell");
      Ember.$('.createSubmit').hide();
      Ember.$('.slotCreate').hide();
      Ember.$('.createCancel').hide();
      Ember.$('.editCard').css("display","table-cell");
      Ember.$('.saveCard').hide();
    },

    createNewCard() {
      // Generate ID
      //TODO Check all id's for identicals
      var newID ='_' + Math.random().toString(36).substr(2, 9);

      // Create new card with items
      var card = this.store.createRecord("card", {
        title: this.get('title'),
        year: this.get('year'),
        authors: this.get('authors'),
        abstract: this.get('abstract'),
        intro: this.get('intro'),
        hypothesis: this.get('hypothesis'),
        methods: this.get('methods'),
        results: this.get('results'),
        discussion: this.get('discussion'),
        conclusion: this.get('conclusion'),
        notes: this.get('notes'),
        cardID: newID
      });

      card.save();
      // Empty Forms
      this.set('title', '');
      this.set('year', '');
      this.set('authors', '');
      this.set('abstract', '');
      this.set('intro', '');
      this.set('hypothesis', '');
      this.set('methods', '');
      this.set('results', '');
      this.set('discussion', '');
      this.set('conclusion', '');
      this.set('notes', '');

      Ember.$('.createStart').css("display","inline-block");
      Ember.$('.slotDisplay').css("display","table-cell");
      Ember.$('.createSubmit').hide();
      Ember.$('.slotCreate').hide();
      Ember.$('.createCancel').hide();
    },
    editSelectedCard(card) {

      // Load ID
      var currentID = card.get('cardID');
      // Hide display and show creator boxes
      Ember.$('.createStart').hide();
      Ember.$('.slotDisplay').hide();
      Ember.$('.createSubmit').hide();
      Ember.$('.createCancel').css("display","inline-block");
      Ember.$('.slotCreate').css("display","table-cell");
      Ember.$('.editCard').hide();
      Ember.$('.saveCard.'+currentID).css("display","table-cell");

      var listOfAttributes = Object.keys(card.toJSON());

      listOfAttributes.forEach(function(attr) {
        Ember.$('.'+attr+'space').css('display','table');
      });

      // Fill creator boxes with card's files
      var title = card.get('title');
      var year = card.get('year');
      var authors = card.get('authors');
      var abstract = card.get('abstract');
      var intro = card.get('intro');
      var hypothesis = card.get('hypothesis');
      var methods = card.get('methods');
      var results = card.get('results');
      var discussion = card.get('discussion');
      var conclusion = card.get('conclusion');
      var notes = card.get('notes');

      this.set('title', title);
      this.set('year', year);
      this.set('authors', authors);
      this.set('abstract', abstract);
      this.set('intro', intro);
      this.set('hypothesis', hypothesis);
      this.set('methods', methods);
      this.set('results', results);
      this.set('discussion', discussion);
      this.set('conclusion', conclusion);
      this.set('notes', notes);
    },

    saveSelectedCard(card) {
      // Set new information
      card.set('title',this.get('title'));
      card.set('year',this.get('year'));
      card.set('authors',this.get('authors'));
      card.set('abstract',this.get('abstract'));
      card.set('intro',this.get('intro'));
      card.set('hypothesis',this.get('hypothesis'));
      card.set('methods',this.get('methods'));
      card.set('results',this.get('results'));
      card.set('discussion',this.get('discussion'));
      card.set('conclusion',this.get('conclusion'));
      card.set('notes',this.get('notes'));
      card.save();
      Ember.$('.createStart').css("display","inline-block");
      Ember.$('.slotDisplay').css("display","table-cell");
      Ember.$('.createSubmit').hide();
      Ember.$('.slotCreate').hide();
      Ember.$('.createCancel').hide();
      Ember.$('.editCard').css("display","table-cell");
      Ember.$('.saveCard').hide();
    },

    deleteCard(card) {
      if(confirm("Are you sure you'd like to delete this?")) {
        card.deleteRecord();
        card.save();
      } else {
        return false;
      }
    }
  }
});
