'use strict';

const m = require('mithril');
const prop = require('mithril/stream');
const BasePage = require('../base-page');

class EditPageModel {

  constructor(type) {
    this.Type = type;
    this.error = prop();
    this.item = prop(new this.Type());
  }

  init() {
    this.item(new this.Type());
  }

  load(id) {
    return this.Type.load(id).then(this.item);
  }

  save() {
    return this.item().save();
  }
}

class EditPage extends BasePage {
  constructor(type, routingPath, fields) {
    super();
    this.routingPath = routingPath;
    this.fields = fields;
    this.Type = type;
    this.vm = new EditPageModel(type);
  }

  oninit(vnode) {
    const id = m.route.param('id');
    if (id === 'new') {
      this.vm.init();
    } else {
      this.vm.load(id);
    }
  }

  load(id) {
    return this.vm.load(id);
  }

  save() {
    return this.vm.save()
    .then(() => {
      m.route.set(`/${this.routingPath}`);
    });
  }

  title(vnode) {
    return vnode.state.vm.item().id() ? '編集' : '追加';
  }

  contentView(vnode) {
    const state = vnode.state;
    const item = state.vm.item();
    const fields = state.fields;
    return <div>
            <h1>{state.title(vnode)}</h1>
            <form class="pure-form pure-form-aligned">
              <fieldset>
                {fields.map(field => {
                  return <div class="pure-control-group">
                    <label for={field.prop}>{field.title}</label>
                    <input id={field.prop} type={field.inputType} placeholder={field.title}
                    value={item[field.prop]()} onchange={m.withAttr('value', item[field.prop])}
                    disabled={!field.editable}/>
                  </div>;
                })}
                <div class="pure-controls">
                  <button type="button" onclick={state.save.bind(state)} class="pure-button pure-button-primary">保存</button>
               </div>
             </fieldset>
           </form>
         </div>;
  }
}

module.exports = EditPage;
