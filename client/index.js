'use strict';

const m = require('mithril');
const Home = require('./pages/home');
const Children = require('./pages/children');
const NewChild = require('./pages/children/new');
const Relationships = require('./pages/relationships');
const NewRelationship = require('./pages/relationships/new');

m.route(document.getElementById('root'), '/', {
  '/': Home,
  '/children': Children,
  '/children/:childId': NewChild,
  '/relationships': Relationships,
  '/relationships/:relationshipId': NewRelationship
});
