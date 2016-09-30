import Ember from 'ember';
import Remarkable from 'remarkable';
import Card from '../models/card';

// General functions
function addPer(str) {
  if (typeof str === "string") {
    if (str.slice(-1) !== '.') {
      return str + '.';
    }
    else {
      return str;
    }
  } else {
    return str;
  }
}

// Set attribute names and gather into lost
var attributes = Ember.get(Card, 'attributes');
var attributeList = [];
var attributeTempList = [];


attributes.forEach(function(meta, name) {
  window[name] = name;
  if (name === 'cardID' || name === 'rev') {} else {
    attributeList.push(name);
    attributeTempList.push('temp'+name);
  }
});
console.log(attributeList);

export default Ember.Controller.extend({
  actions: {
    // Changes view to show text input boxes
    openCardCreator() {
      // Empty Forms
      Ember.$('.createBox').val('');
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
      // Display All forms
      attributeList.forEach(function (name) {
        Ember.$('.'+name+'space').css('display','table');
      });
      Ember.$('.createStart').hide();
      Ember.$('.slotDisplay').hide();
      Ember.$('.createSubmit').css("display","inline-block");
      Ember.$('.createCancel').css("display","inline-block");
      Ember.$('.slotCreate').css("display","table-cell");
    },

    viewCard: function(card) {
      // Set up Remarkable Markdown
      var md = new Remarkable();
      // Grab Current ID
      var currentID = card.get('cardID');

      // Hide full-text Areas
      Ember.$('.cardfulltext').hide();
      // Hide all Cardslots
      Ember.$('.cardslot').hide();
      // Set all Cardslot Cursors to default
      Ember.$('.cardsentence').css('cursor','default');


      attributeList.forEach(function(attr) {
        var currentAttrText = card.get(attr);

        // unbind click event
        Ember.$('.card'+attr+'_sen').unbind('click');
        // Only continue if card attribute isn't undefined (empty).
        if (typeof currentAttrText !== 'undefined') {
          // If card section has text, display and continue. Otherwise, do nothing.
          if (currentAttrText === null || currentAttrText.length <= 0) {} else {
            Ember.$('.'+attr+'space').show();
            // If this is the title, year, or authors, use .text()
            if (attr === "title" || attr === "year" || attr === "authors") {
              Ember.$('.card'+attr).text(currentAttrText);
            } else {
              // Otherwise, use html and md.render. Only show up to first period.
              // Check if text has any period
              if (currentAttrText.indexOf('.') !== -1) {
                Ember.$('.card'+attr+'_sen').html(md.render(currentAttrText.split('.').shift()));
                // If there is any text after the first period, place that in full section and make it active
                if (currentAttrText.split('.').pop().length > 0) {
                  Ember.$('.card'+attr+'_full').html(md.render(currentAttrText.split('.').pop()));
                  // Add read more indicator
                  Ember.$('.card'+attr+'_sen').append('<div class="cardReadMore">+++</div>');
                  Ember.$('.card'+attr+'_sen').css('cursor','pointer');
                  // Add click event for slide toggling the full-text area
                  Ember.$('.card'+attr+'_sen').click(function() {
                    Ember.$(this).siblings().slideToggle();
                  });
                }
              } else {
                Ember.$('.card'+attr+'_sen').html(md.render(currentAttrText));
              }
            }
          }
        }
      });

    // Indicate on list
      Ember.$('.listRow').removeClass('selectedButton');
      Ember.$('.'+currentID+'_row').addClass('selectedButton');
    },

    cancelNewCard() {
      // Empty Forms
      Ember.$('.createBox').val('');
      // Change button displays
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
        abstract: addPer(this.get('abstract')),
        intro: addPer(this.get('intro')),
        hypothesis: addPer(this.get('hypothesis')),
        methods: addPer(this.get('methods')),
        results: addPer(this.get('results')),
        discussion: addPer(this.get('discussion')),
        conclusion: addPer(this.get('conclusion')),
        notes: addPer(this.get('notes')),
        cardID: newID
      });

      card.save();
      // Empty Forms
      Ember.$('.createBox').val('');
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

      Ember.$('.cardslot').show();

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
