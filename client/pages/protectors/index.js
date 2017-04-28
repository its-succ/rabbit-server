'use strict';

const CrudListPage = require('../crud-page');
const Protector = require('../../model/Protector');

/**
 * 保護者一覧ページ
 */
class ProtectorsPage extends CrudListPage {
  constructor() {
    super(Protector,
      'protectors',
      '/api/protectors',
      [
        {prop: 'id', title: 'ID'},
        {prop: 'lastName', title: '姓'},
        {prop: 'firstName', title: '名'}
      ]
    );
  }

  title() {
    return '保護者一覧';
  }
}

module.exports = ProtectorsPage;
