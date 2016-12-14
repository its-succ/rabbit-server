'use strict';

const m = require('mithril');

const menus = [
  {
    path: '/children',
    content: '園児一覧'
  }
];

const SideMenu = {
  controller: function() {
  },
  view: function(ctrl) {
    const currentPath = m.route();
    return [
      <a href="#menu" id="menuLink" class="menu-link">
        <span></span>
      </a>,
      <div id="menu">
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
    ];
  }
};

module.exports = SideMenu;
