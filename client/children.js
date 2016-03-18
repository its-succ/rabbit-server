'use strict';

const m = require('mithril');


class ChildListModel {
  constructor() {
    // this.id = m.prop('');
    // this.name = m.prop('');
    // this.birthday = m.prop('');
    // this.sex = m.prop('');
    this.childList = m.prop({});
  }

  loadChildList() {
    this.childList = m.request({
      method: 'GET',
      url: '/children',
      //initialValue: []
    });
    // .then(console.log('++++++++', this.childList()));
    //リクエストが返ってくるのを待つ方法があるはず
  }
}

class ChildListController {
  constructor() {
    this.vm = new ChildListModel();
    this.vm.loadChildList();
    //console.log('**********', this.vm.childList());
  }
}

const Component = {
  controller: ChildListController,
  view: ctrl => {
    return <div>
            <h1>園児一覧</h1>
            childList:{ctrl.vm.childList()}
            <table class="pure-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>名前</th>
                        <th>性別</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr class="pure-table-odd">
                        <td>1</td>
                        <td>保育園　花子</td>
                        <td>女</td>
                        <td><button class="pure-button">編集</button></td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>保育園　優子</td>
                        <td>女</td>
                        <td><button class="pure-button">編集</button></td>
                    </tr>

                    <tr class="pure-table-odd">
                        <td>3</td>
                        <td>保育園　太郎</td>
                        <td>男</td>
                        <td><button class="pure-button">編集</button></td>
                    </tr>

                    <tr>
                        <td>4</td>
                        <td>保育園　次郎</td>
                        <td>男</td>
                        <td><button class="pure-button">編集</button></td>
                    </tr>

                    <tr class="pure-table-odd">
                        <td>5</td>
                        <td>保育園　三郎</td>
                        <td>男</td>
                        <td><button class="pure-button">編集</button></td>
                    </tr>

                    <tr>
                        <td>6</td>
                        <td>保育園　四朗</td>
                        <td>男</td>
                        <td><button class="pure-button">編集</button></td>
                    </tr>

                    <tr class="pure-table-odd">
                        <td>7</td>
                        <td>保育園　五郎丸</td>
                        <td>男</td>
                        <td><button class="pure-button">編集</button></td>
                    </tr>

                    <tr>
                        <td>8</td>
                        <td>保育園　六郎</td>
                        <td>男</td>
                        <td><button class="pure-button">編集</button></td>
                    </tr>
                </tbody>
            </table>
           </div>;
  }
};

module.exports =Component;
