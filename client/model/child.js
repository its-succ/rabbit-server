'use strict';

const m = require('mithril');

class Child {
  constructor(data) {
    this.reflect(data);
  }

  reflect(data) {
    data = data || {};
    this.id = m.prop(data.id);
    this.firstName = m.prop(data.firstName || '');
    this.lastName = m.prop(data.lastName || '');
    this.birthday = m.prop(data.birthday || '');
    this.sex = m.prop(data.sex || '');
  }

  static load(id) {
    return m.request({
      method: 'GET',
      url: `/api/children/${id}`,
      type: Child
    });
  }

  save() {
    if (this.id()) {
      return m.request({
        method: 'PUT',
        url: `/api/children/${this.id()}`,
        data: {
          firstName: this.firstName(),
          lastName: this.lastName(),
          birthday: this.birthday(),
          sex: this.sex()
        }
      }).then(data => {
        return this.reflect(data);
      });
    } else {
      return m.request({
        method: 'POST',
        url: '/api/children',
        data: {
          firstName: this.firstName(),
          lastName: this.lastName(),
          birthday: this.birthday(),
          sex: this.sex()
        }
      }).then(data => {
        return this.reflect(data);
      });
    }
  }
}

module.exports = Child;
