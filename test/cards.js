var request = require('supertest');
var app = require('../app');
var mongoose = require('mongoose');
var Card = require('../models/Card')

describe('API /api/cards', () => {
  before(done => {
    const func = () => {
      // 事前にコレクションを空にしておく
      Card.remove({}, err => {
        done();
      });
    };
    if (mongoose.connection.readyState == 1) {
      // 接続済
      func();
    } else {
      // 接続を待つ
      mongoose.connection.on('connected', func);
    }
  });

  it('カードが登録できる', done => {
    var req = {
      _id: '123456',
      owner: 'hoge'
    };
    var ret = {
      __v: 0,
      _id: '123456',
      owner: 'hoge',
      children: []
    };
    request(app)
      .post('/api/cards')
      .send(req)
      .expect(200, ret, done);
  });

  it('カード一覧が取得できる', done => {
    var ret = [
      {
        __v: 0,
        _id: '123456',
        owner: 'hoge',
        children: []
      }
    ];
    request(app)
      .get('/api/cards')
      .expect(200, ret, done);
  });

  // TODO: Childモデルが追加されたらchildrenを変更するテストを追加する
  it('カードを更新できる', done => {
    var req = {
      owner: 'fuga'
    };
    var ret = {
      __v: 0,
      _id: '123456',
      owner: 'fuga',
      children: []
    };
    request(app)
      .put('/api/cards/123456')
      .send(req)
      .expect(200, ret, done);
  });

  it('カードを削除できる', done => {
    var ret = [];
    request(app)
      .del('/api/cards/123456')
      .expect(200, {})
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        request(app)
          .get('/api/cards')
          .expect(200, ret, done);
      });
  });
});
