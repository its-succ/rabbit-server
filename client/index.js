'use strict';

const m = require('mithril');

const Home = {
  view: () => {
    return <div>
            <h1>Rabbit</h1>
            <p>Welcome to Rabbit</p>
           </div>;
  }
};

m.route(document.getElementById('root'), '/', {
  '/': Home
});
