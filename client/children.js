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
      url: '/children'
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
                  {ctrl.vm.childList().map(child => {
                    return  <tr>
                              <td>{child._id}</td>
                              <td>{child.name}</td>
                              <td>{child.sex}</td>
                              <td>{formatDate(new Date(child.birthday), 'YYYY/MM/DD')}</td>
                              <td><button onclick="">Edit</button></td>
                            </tr>;
                  })}
                </tbody>

            </table>
           </div>;
  }
};

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
module.exports =Component;
