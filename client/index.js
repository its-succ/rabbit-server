'use strict';

const m = require('mithril');
const Child = require('./children');

const Home = {
  view: () => {
    return <div>
            <h1>Rabbit</h1>
            <p>Welcome to Rabbit</p>
           </div>;
  }
};

m.route(document.getElementById('root'), '/', {
  '/': Home,
  '/child': Child
});
