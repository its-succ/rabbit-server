'use strict';

const m = require('mithril');
const prop = require("mithril/stream");
const Relationship = require('../../model/relationship');
const BasePage = require('../base-page');

class RelationshipViewModel {
  constructor() {
    this.relationships = prop([]);
    this.error = prop();
  }

  loadRelationships() {
    this.error(undefined);
    m.request({
      method: 'GET',
      url: '/api/relationships',
      type: Relationship
    }).then(this.relationships);
  }

  delete(id) {
    return m.request({
      method: 'DELETE',
      url: `/api/relationships/${id}`
    }).then(() => {
      return this.loadRelationships();
    }).catch(err => {
      this.error(err);
    });
  }
}

class RelationshipsPage extends BasePage {
  constructor() {
    super();
  }

  oninit() {
    this.vm = new RelationshipViewModel();
    this.vm.loadRelationships();
  }

  edit(id) {
    m.route.set(`/relationships/${id}`);
  }

  delete(id) {
    this.vm.delete(id);
  }

  add() {
    m.route.set('/relationships/new');
  }

  contentView(vnode) {
    const ctrl = vnode.state;
    const relationships = ctrl.vm.relationships();
    const error = ctrl.vm.error();
    return <div>
            <h1>続柄一覧</h1>
            {error ? <p class="error-message">{error.message}</p>: ''}
            <table class="pure-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>続柄名</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                  {relationships.map(relationship => {
                    return <tr>
                             <td>{relationship.id()}</td>
                              <td>{relationship.name()}</td>
                              <td>
                                <button class="pure-button" onclick={ctrl.edit.bind(ctrl, relationship.id())}>編集</button>
                                { }
                                <button class="pure-button" onclick={ctrl.delete.bind(ctrl, relationship.id())}>削除</button>
                              </td>
                            </tr>;
                  })}
                </tbody>
            </table>
            <div>
              <button class="pure-button" onclick={ctrl.add.bind(ctrl)}>追加</button>
            </div>
           </div>;
  }
}

module.exports = RelationshipsPage;
