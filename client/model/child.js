'use strict';

const m = require('mithril');

class Child {
  constructor(data) {
    this.reflect(data);
  }

  reflect(data) {
    data = data || {};
    this.id = m.prop(data._id);
    this.name = m.prop(data.name || '');
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
          name: this.name(),
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
          name: this.name(),
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
