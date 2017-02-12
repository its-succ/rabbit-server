'use strict';

const m = require('mithril');
const BasePage = require('../base-page');

class HomePage extends BasePage {
  constructor() {
    super();
  }
  contentView(vnode) {
    return <div class="content">
      <h1>Rabbit</h1>
      <p>Welcome to Rabbit</p>
    </div>;
  }
}

module.exports = HomePage;
