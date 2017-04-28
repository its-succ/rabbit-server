'use strict';

const m = require('mithril');
const prop = require("mithril/stream");

class Protector {
  constructor(data) {
    this.reflect(data);
  }

  reflect(data) {
    data = data || {};
    this.id = prop(data.id);
    this.firstName = prop(data.firstName || '');
    this.lastName = prop(data.lastName || '');
    this.birthday = prop(data.birthday || '');
    this.sex = prop(data.sex || '');
  }

  static load(id) {
    return m.request({
      method: 'GET',
      url: `/api/protectors/${id}`,
      type: Protector
    });
  }

  save() {
    if (this.id()) {
      return m.request({
        method: 'PUT',
        url: `/api/protectors/${this.id()}`,
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
        url: '/api/protectors',
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

module.exports = Protector;
