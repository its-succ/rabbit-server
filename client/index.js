'use strict';

const m = require('mithril');
const Home = require('./pages/home');
const Children = require('./pages/children');
const NewChild = require('./pages/children/new');
const Protectors = require('./pages/protectors');
const EidtProtector = require('./pages/protectors/edit');
const Relationships = require('./pages/relationships');
const NewRelationship = require('./pages/relationships/new');

m.route(document.getElementById('root'), '/', {
  '/': Home,
  '/children': Children,
  '/children/:childId': NewChild,
  '/protectors': Protectors,
  '/protectors/:id': EidtProtector,
  '/relationships': Relationships,
  '/relationships/:relationshipId': NewRelationship
});
