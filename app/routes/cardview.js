import Ember from 'ember';
import Card from '../models/card';

export default Ember.Route.extend({
  model() {
  return this.store.findAll('card');
  },
  actions: {
    // Things to do when route is loaded
  }
});


// activate: function() {
//   console.log('Initialize!');
//   var attributes = Ember.get(Card, 'attributes');
//   console.log(attributes);
//    attributes.forEach(function(meta, name) {
//      console.log(name);
//      Ember.$('#cardform').append('<div>'+name+'</div>');
//   });
