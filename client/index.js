'use strict';

const m = require('mithril');
const SideMenu = require('./side-menu');
const Children = require('./children');
const NewChild = require('./children/new');

const Home = {
  view: () => {
    return <div>
            <h1>Rabbit</h1>
            <p>Welcome to Rabbit</p>
           </div>;
  }
};

m.mount(document.getElementById('side-menu'), SideMenu);
m.route(document.getElementById('main'), '/children', {
  '/': Home,
  '/children': Children,
  '/children/:childId': NewChild
});
