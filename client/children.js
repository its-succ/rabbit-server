'use strict';

const m = require('mithril');


class ChildListModel {
  constructor() {
    this.id = m.prop('');
    this.name = m.prop('');
    this.birthday = m.prop('');
    this.sex = m.prop('');
    this.childList = m.prop([]);
  }

  loadChildList() {
    this.childList = m.request({
      method: 'GET',
      url: '/children',
      //initialValue: []
    });
  }
}

class ChildListController {
  constructor() {
    this.vm = new ChildListModel();
    this.vm.loadChildList();
  }
}


//childList:{JSON.stringify(ctrl.vm.childList())}
const Component = {
  controller: ChildListController,
  view: ctrl => {
    return <div>
            <h1>園児一覧</h1>
            <table class="pure-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>名前</th>
                        <th>性別</th>
                        <th>誕生日</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                  <tr>
                  {ctrl.vm.childList().map(child => {
                    return  <td>{child._id}</td>;
                  })}
                  {ctrl.vm.childList().map(child => {
                    return  <td>{child.name}</td>;
                  })}
                  </tr>
                </tbody>

            </table>
           </div>;
  }
};

module.exports =Component;
