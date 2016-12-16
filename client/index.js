'use strict';

const m = require('mithril');
const Home = require('./pages/home');
const Children = require('./pages/children');
const NewChild = require('./pages/children/new');

m.route(document.getElementById('root'), '/children', {
  '/': Home,
  '/children': Children,
  '/children/:childId': NewChild
});
