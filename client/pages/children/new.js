'use strict';

const m = require('mithril');
const prop = require("mithril/stream");
const BasePage = require('../base-page');
const Child = require('../../model/child');

class AddChild extends BasePage {
  constructor() {
    super();
  }

  oninit() {
    const id = m.route.param("childId");
    this.child = prop(new Child({sex: 'M'}));
    if (id !== 'new') {
      Child.load(id).then(this.child);
    }
  }

  save() {
    return this.child().save()
    .then(() => {
      m.route.set('/children');
    });
  }

  contentView(vnode) {
    const ctrl = vnode.state;
    const child = ctrl.child();
    return <div>
            <h1>{child.id() ? '編集' : '追加'}</h1>
            <form class="pure-form pure-form-aligned">
              <fieldset>
              <div class="pure-control-group">
                <label for="lastName">姓</label>
                <input id="lastName" type="text" placeholder="姓"
                value={child.lastName()} onchange={m.withAttr('value', child.lastName)}/>
              </div>
              <div class="pure-control-group">
                <label for="firstName">名</label>
                <input id="firstName" type="text" placeholder="名"
                value={child.firstName()} onchange={m.withAttr('value', child.firstName)}/>
              </div>
              <div class="pure-control-group">
                <label for="sex">性別</label>
                {createSexSelect(child)}
              </div>
              <div class="pure-control-group">
                <label for="foo">生年月日</label>
                <input id="foo" type="date" placeholder="Enter birthday here..."
                value={child.birthday()} onchange={m.withAttr('value', child.birthday)}
                />
              </div>
              <div class="pure-controls">
                <button type="button" onclick={ctrl.save.bind(ctrl)} class="pure-button pure-button-primary">保存</button>
             </div>
          </fieldset>
        </form>
      </div>;
  }
}

function createSexSelect(child) {
  const manProps = {};
  if (child.sex() === 'M') {
    manProps.selected = 'selected';
  }
  const femaleProps = {};
  if (child.sex() === 'F') {
    femaleProps.selected = 'selected';
  }
  return <select id="sex" placeholder="性別" onchange={m.withAttr('value', child.sex)}>
    <option value="M" {...manProps}>男</option>
    <option value="F" {...femaleProps}>女</option>
  </select>;
}

module.exports = AddChild;
