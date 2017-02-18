'use strict';

const m = require('mithril');
const prop = require("mithril/stream");
const BasePage = require('../base-page');
const Child = require('../../model/child');

class ChildListModel {
  constructor() {
    this.childList = prop([]);
  }

  loadChildList() {
    return m.request({
      method: 'GET',
      url: '/api/children',
      type: Child
    }).then(children => {
      this.childList(children);
    });
  }
}

const model = new ChildListModel();

class ChildList extends BasePage {
  constructor() {
    super();
    this.vm = model;
  }

  oninit() {
    this.vm.loadChildList();
  }

  add() {
    m.route.set('/children/new');
  }

  edit(id) {
    m.route.set(`/children/${id}`);
  }

  delete(id) {
    return m.request({
      method: 'DELETE',
      url: `/api/children/${id}`
    }).then(() => {
      return this.vm.loadChildList();
    });
  }

  contentView(vnode) {
    const ctrl = vnode.state;
    return <div>
            <h1>園児一覧</h1>
            <table class="pure-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>姓</th>
                        <th>名</th>
                        <th>性別</th>
                        <th>誕生日</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                  {ctrl.vm.childList().map(child => {
                    return  <tr>
                              <td>{child.id()}</td>
                              <td>{child.lastName()}</td>
                              <td>{child.firstName()}</td>
                              <td>{child.sex()}</td>
                              <td>{formatDate(new Date(child.birthday()), 'YYYY/MM/DD')}</td>
                              <td>
                                <button class="pure-button" onclick={ctrl.edit.bind(ctrl, child.id())}>編集</button>
                                { }
                                <button class="pure-button" onclick={ctrl.delete.bind(ctrl, child.id())}>削除</button>
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

var formatDate = function (date, format) {
  if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
  format = format.replace(/YYYY/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  if (format.match(/S/g)) {
    var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
    var length = format.match(/S/g).length;
    for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
  }
  return format;
};

module.exports = ChildList;
