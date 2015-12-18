'use strict';

const m = require('mithril');

const Home = {
  view: () => {
    return m('div', [
      m('h1', 'Rabbit'),
      m('p', 'Welcome to Rabbit')
    ]);
  }
};

m.route(document.getElementById('root'), '/', {
  '/': Home
});
