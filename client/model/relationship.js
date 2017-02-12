'use strict';

const m = require('mithril');
const prop = require("mithril/stream");

class Relationship {
  constructor(data) {
    this.reflect(data);
  }

  reflect(data) {
    data = data || {};
    this.id = prop(data.id);
    this.name = prop(data.name || '');
  }

  static load(id) {
    return m.request({
      method: 'GET',
      url: `/api/relationships/${id}`,
      type: Relationship
    });
  }

  save() {
    if (this.id()) {
      return m.request({
        method: 'PUT',
        url: `/api/relationships/${this.id()}`,
        data: this
      }).then(data => {
        return this.reflect(data);
      });
    } else {
      return m.request({
        method: 'POST',
        url: '/api/relationships',
        data: this
      }).then(data => {
        return this.reflect(data);
      });
    }
  }
}

module.exports = Relationship;
