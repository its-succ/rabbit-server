'use strict';

const m = require('mithril');
const pubsub = require('pubsub-js');
const SideMenu = require('./side-menu');

class BasePageController {
  constructor() {
    this.active = false;
    pubsub.subscribe('side-menu-active', (msg, data) => {
      this.active = data;
    });
  }

  contentView() {
  }

  hideSideMenu() {
    SideMenu.hideSideMenu();
  }
}

module.exports = {
  controller: BasePageController,
  view: (ctrl, args, extras) => {
    return <div id="layout" class={SideMenu.toggleClass([], ctrl.active)}>
        <SideMenu/>
        <div id="main" onclick={ctrl.hideSideMenu}>
          {ctrl.contentView(ctrl, args, extras)}
        </div>
    </div>;
  }
};
module.exports.BasePageController = BasePageController;
