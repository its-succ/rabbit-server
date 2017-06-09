'use strict';

const EditPage = require('../crud-page/edit');
const Protector = require('../../model/Protector');

/**
 * 保護者編集ページ
 */
class EditProtectorPage extends EditPage {
  constructor() {
    super(Protector,
      'protectors',
      [
        {prop: 'id', title: 'ID', editable: false},
        {prop: 'lastName', title: '姓', editable: true},
        {prop: 'firstName', title: '名', editable: true}
      ]
    );
  }
}

module.exports = EditProtectorPage;
