'use strict';

const m = require('mithril');
const pubsub = require('pubsub-js');

const menus = [
  {
    path: '/children',
    content: '園児一覧'
  }
];

function toggleClass(baseClasses, isActive) {
  if (isActive) {
    return baseClasses.concat('active').join(' ');
  }
  return baseClasses.join(' ');
}

function hideSideMenu() {
  pubsub.publishSync('side-menu-active', false);
}

class SideMenuController {
  constructor() {
    this.active = false;
    pubsub.subscribe('side-menu-active', (msg, data) => {
      this.active = data;
    });
  }
  toggleAll()  {
    this.active = !this.active;
    pubsub.publishSync('side-menu-active', this.active);
  }
}

const SideMenu = {
  controller: SideMenuController,
  view: function(ctrl) {
    const currentPath = m.route();
    return <div>
      <a id="menuLink" class={toggleClass(['menu-link'], ctrl.active)} onclick={ctrl.toggleAll.bind(ctrl)}>
        <span></span>
      </a>
      <div id="menu" class={toggleClass([], ctrl.active)} >
        <div class="pure-menu">
          <a class="pure-menu-heading" href="/" config={m.route}>Rabbit</a>
          <ul class="pure-menu-list">
            {menus.map(menu => {
              return <li class={currentPath === menu.path ? 'menu-item-divided pure-menu-selected' : 'pure-menu-item'}>
                <a href={menu.path} class="pure-menu-link" config={m.route}>{menu.content}</a>
              </li>;
            })}
          </ul>
        </div>
      </div>
      </div>
    ;
  }
};

SideMenu.toggleClass = toggleClass;
SideMenu.hideSideMenu = hideSideMenu;

module.exports = SideMenu;
