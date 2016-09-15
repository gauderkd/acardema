import DS from 'ember-data';

export default DS.Model.extend({
  // Details
  title       : DS.attr('string'),
  year        : DS.attr('string'),
  // // Study
  // abstract    : DS.attr('string'),
  // hypothesis  : DS.attr('string'),
  // methods     : DS.attr('string'),
  // results     : DS.attr('string'),
  // conclusion  : DS.attr('string'),
  // // Extra
  // notes       : DS.attr('string'),
  isRead      : DS.attr('boolean'),
  rev         : DS.attr('string')
});
