import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';

PouchDB.debug.enable('*');

var remote = new PouchDB('http://localhost:5984/acardema');
var db = new PouchDB('local_pouch');

db.sync(remote, {
   live: true,   // do a live, ongoing sync
   retry: false   // retry if the conection is lost
});

export default Adapter.extend({
  db: db
});
