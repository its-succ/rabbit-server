'use strict';

const m = require('mithril');
const Child = require('../model/child');

class AddChildController {
  constructor() {
    const id = m.route.param("childId");
    if (id === 'new') {
      this.child = m.prop(new Child({sex: 'M'}));
    } else {
      this.child = Child.load(id);
    }
  }

  save() {
    return this.child().save()
    .then(() => {
      m.route('/children');
    });
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

const New = {
  controller: AddChildController,
  view: ctrl => {
    const child = ctrl.child();
    return <div>
            <h1>{child.id() ? '編集' : '追加'}</h1>
            <form class="pure-form pure-form-aligned">
              <fieldset>
              <div class="pure-control-group">
                <label for="name">名前</label>
                <input id="name" type="text" placeholder="名前"
                value={child.name()} onchange={m.withAttr('value', child.name)}/>
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
};

module.exports = New;
