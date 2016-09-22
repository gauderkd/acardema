import Ember from 'ember';
import Remarkable from 'remarkable'
var md = new Remarkable();

export default Ember.Controller.extend({
  actions: {
    openCardCreator() {
      // Empty Forms
      this.set('title', '');
      this.set('year', '');
      this.set('authors', '');
      this.set('abstract', '');
      this.set('intro', '');
      this.set('hypothesis', '');
      this.set('methods', '');
      this.set('results', '');
      this.set('conclusion', '');
      this.set('notes', '');
      Ember.$('.createStart').hide();
      Ember.$('.slotDisplay').hide();
      Ember.$('.createSubmit').css("display","inline-block");
      Ember.$('.createCancel').css("display","inline-block");
      Ember.$('.slotCreate').css("display","table-cell");
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

      // Fill creator boxes with card's files
      var title = card.get('title');
      var year = card.get('year');
      var authors = card.get('authors');
      var abstract = card.get('abstract');
      var intro = card.get('intro');
      var hypothesis = card.get('hypothesis');
      var methods = card.get('methods');
      var results = card.get('results');
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
      card.set('conclusion',this.get('conclusion'));
      card.set('notes',this.get('notes'));
      card.save();
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
      var md = new Remarkable();

      var title = card.get('title');
      var year = card.get('year');
      var authors = card.get('authors');
      var abstract = card.get('abstract');
      var intro = card.get('intro');
      var hypothesis = card.get('hypothesis');
      var methods = card.get('methods');
      var results = card.get('results');
      var conclusion = card.get('conclusion');
      var notes = card.get('notes');
      var currentID = card.get('cardID');
      // Indicate on list
      Ember.$('.listRow').removeClass('selectedButton');
      Ember.$('.'+currentID+'_row').addClass('selectedButton');

      // Original method, replacing text in their respective boxes
      Ember.$('.cardTitle').text(title);
      Ember.$('.cardAuthors').text(authors);
      Ember.$('.cardYear').text(year);
      Ember.$('.cardAbstract').html(md.render(abstract));
      Ember.$('.cardIntro').html(md.render(intro));
      Ember.$('.cardHypothesis').html(md.render(hypothesis));
      Ember.$('.cardMethods').html(md.render(methods));
      Ember.$('.cardResults').html(md.render(results));
      Ember.$('.cardConclusion').html(md.render(conclusion));
      Ember.$('.cardNotes').html(md.render(notes));
    }
  }
});
