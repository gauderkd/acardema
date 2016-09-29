import Ember from 'ember';
import CardArrayMixin from 'acardema/mixins/card-array';
import { module, test } from 'qunit';

module('Unit | Mixin | card array');

// Replace this with your real tests.
test('it works', function(assert) {
  let CardArrayObject = Ember.Object.extend(CardArrayMixin);
  let subject = CardArrayObject.create();
  assert.ok(subject);
});
