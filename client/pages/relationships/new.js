'use strict';

const m = require('mithril');
const BasePage = require('../base-page');
const Relationship = require('../../model/relationship');

class RelationshipController extends BasePage.BasePageController {
  constructor() {
    super();
    const id = m.route.param("relationshipId");
    if (id === 'new') {
      this.relationship = m.prop(new Relationship());
    } else {
      this.relationship = Relationship.load(id);
    }
  }

  save() {
    return this.relationship().save()
    .then(() => {
      m.route('/relationships');
    });
  }

  contentView(ctrl) {
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

module.exports = {
  controller: RelationshipController,
  view: BasePage.view
};
