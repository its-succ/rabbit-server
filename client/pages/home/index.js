'use strict';

const BasePage = require('../base-page');

class HomeController extends BasePage.BasePageController {
  constructor() {
    super();
  }
  contentView(ctrl) {
    return <div class="content">
      <h1>Rabbit</h1>
      <p>Welcome to Rabbit</p>
    </div>;
  }
}

module.exports = {
  controller: HomeController,
  view: (ctrl, args, extras) => {
    return BasePage.view(ctrl, args, extras);
  }
};
