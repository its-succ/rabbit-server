'use strict';

const m = require('mithril');
const pubsub = require('pubsub-js');
const SideMenu = require('./side-menu');

class BasePage {
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

  view(vnode) {
    const ctrl = vnode.state;
    return <div id="layout" class={SideMenu.toggleClass([], ctrl.active)}>
        <SideMenu/>
        <div id="main" onclick={ctrl.hideSideMenu}>
          {ctrl.contentView(vnode)}
        </div>
    </div>;
  }
}

module.exports = BasePage;
