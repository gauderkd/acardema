import { Adapter } from 'ember-pouch';
import PouchDB from 'pouchdb';
import config from 'acardema/config/environment';
import Ember from 'ember';

// PouchDB.debug.enable('*');

var remote = new PouchDB('http://localhost:5984/acardema');
var db = new PouchDB('local_pouch');

db.sync(remote, {
   live: true,   // do a live, ongoing sync
   retry: false   // retry if the conection is lost
});

export default Adapter.extend({
  db: db
});
//
//
// import { Adapter } from 'ember-pouch';
// import PouchDB from 'pouchdb';
// import config from 'acardema/config/environment';
// import Ember from 'ember';
//
// const { assert, isEmpty } = Ember;
//
// function createDb() {
//   let localDb = config.emberPouch.localDb;
//
//   assert('emberPouch.localDb must be set', !isEmpty(localDb));
//
//   let db = new PouchDB('localDb');
//
//   if (config.emberPouch.remoteDb) {
//     let remoteDb = new PouchDB(config.emberPouch.remoteDb);
//
//     db.sync(remoteDb, {
//       live: true,
//       retry: true
//     });
//   }
//
//   return db;
// }
//
// export default Adapter.extend({
//   init() {
//     this._super(...arguments);
//     this.set('db', createDb());
//   }
// });
