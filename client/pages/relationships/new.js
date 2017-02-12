'use strict';

const m = require('mithril');
const prop = require("mithril/stream");
const BasePage = require('../base-page');
const Relationship = require('../../model/relationship');

class RelationshipPage extends BasePage {
  constructor() {
    super();
  }

  oninit() {
    const id = m.route.param("relationshipId");
    this.relationship = prop(new Relationship());
    if (id !== 'new') {
      Relationship.load(id).then(this.relationship);
    }
  }

  save() {
    return this.relationship().save()
    .then(() => {
      m.route.set('/relationships');
    });
  }

  contentView(vnode) {
    const ctrl = vnode.state;
    const relationship = ctrl.relationship();
    return <div>
            <h1>{relationship.id() ? '編集' : '追加'}</h1>
            <form class="pure-form pure-form-aligned">
              <fieldset>
              <div class="pure-control-group">
                <label for="name">続柄名</label>
                <input id="name" type="text" placeholder="続柄名"
                value={relationship.name()} onchange={m.withAttr('value', relationship.name)}/>
              </div>
              <div class="pure-controls">
                <button type="button" onclick={ctrl.save.bind(ctrl)} class="pure-button pure-button-primary">保存</button>
             </div>
          </fieldset>
        </form>
      </div>;
  }
}

module.exports = RelationshipPage;
