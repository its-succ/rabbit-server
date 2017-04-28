'use strict';

const m = require('mithril');
const prop = require('mithril/stream');
const BasePage = require('../base-page');

class CrudListModel {

  constructor(type, apiPath) {
    this.type = type;
    this.apiPath = apiPath;
    this.listData = prop([]);
    this.error = prop();
  }

  loadListData() {
    this.error(undefined);
    m.request({
      method: 'GET',
      url: `${this.apiPath}`,
      type: this.type
    }).then(this.listData);
  }

  delete(id) {
    return m.request({
      method: 'DELETE',
      url: `${this.apiPath}/${id}`
    }).then(() => {
      return this.loadListData();
    }).catch(err => {
      this.error(err);
    });
  }
}

class CrudListPage extends BasePage {
  constructor(type, routingPath, apiPath, fields) {
    super();
    this.routingPath = routingPath;
    this.fields = fields;
    this.Type = type;
    this.vm = new CrudListModel(type, apiPath);
  }

  oninit(vnode) {
    this.vm.loadListData();
  }

  add() {
    m.route.set(`/${this.routingPath}/new`);
  }

  edit(id) {
    m.route.set(`/${this.routingPath}/${id}`);
  }

  delete(id) {
    this.vm.delete(id);
  }

  title(vnode) {
    vnode.state.vm.type;
  }

  contentView(vnode) {
    const state = this;
    const items = state.vm.listData();
    const fields = state.fields;
    const error = state.vm.error();
    return <div>
            <h1>{state.title(vnode)}</h1>
            {error ? <p class="error-message">{error.message}</p>: ''}
            <table class="pure-table">
                <thead>
                    <tr>
                       {fields.map(field => <th>{field.title}</th>)}
                       <th></th>
                    </tr>
                </thead>

                <tbody>
                  {items.map(item => {
                    return <tr>
                             {fields.map(field => <td>{item[field.prop]()}</td>)}
                              <td>
                                <button class="pure-button" onclick={state.edit.bind(state, item.id())}>編集</button>
                                { }
                                <button class="pure-button" onclick={state.delete.bind(state, item.id())}>削除</button>
                              </td>
                            </tr>;
                  })}
                </tbody>
            </table>
            <div>
              <button class="pure-button" onclick={state.add.bind(state)}>追加</button>
            </div>
           </div>;
  }
}

module.exports = CrudListPage;
