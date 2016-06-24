var request = require('supertest');
var should = require('chai').should();
var app = require('../app');
var mongoose = require('mongoose');
var Child = require('../models/Child');
var Card = require('../models/Card');

describe('API /api/children', () => {
  before(done => {
    const func = () => {
      Child.remove({}, err => {
        done();
      });
    };

    if (mongoose.connection.readyState == 1) {
      func();
    } else {
      mongoose.connection.on('connected', func);
    }
  });

  afterEach(done => {
    Child.remove({}, err => {
      done();
    });
  });

  it('園児が登録できる', done => {
    var req = {
      name: '鈴木一郎',
      birthday: '2013-04-01',
      sex: 'M'
    };
    request(app)
      .post('/api/children')
      .send(req)
      .expect(200)
      .expect(res => {
        res.body.should.have.property('name', '鈴木一郎');
        res.body.should.have.property('birthday', '2013-04-01');
        res.body.should.have.property('sex', 'M');
      })
      .end(done);
  });

  it('園児の一覧を取得できる', done => {
    var req = {
      name: '鈴木一郎',
      birthday: '2013-04-01',
      sex: 'M'
    };
    // 園児登録
    request(app)
      .post('/api/children')
      .send(req)
      .expect(200)
      .expect(res => {
        res.body.should.have.property('name', '鈴木一郎');
        res.body.should.have.property('birthday', '2013-04-01');
        res.body.should.have.property('sex', 'M');
      })
      .end((err, cardRes) => {
        // 園児一覧取得
        request(app)
          .get('/api/children')
          .expect(200)
          .expect(res => {
            res.body.length.should.equal(1);
            var child = res.body[0];
            child.should.have.property('name', '鈴木一郎');
            child.should.have.property('birthday', '2013-04-01');
            child.should.have.property('sex', 'M');
          })
          .end(done);
      });
  });

  it('園児一人の情報を取得できる', done => {
    var id;
    // 古いテストデータ（カード）を削除する
    Card.remove({}, err => {
      if (err) {
        done(err);
      }

      var childReq = {
        name: '鈴木一郎',
        birthday: '2013-04-01',
        sex: 'M'
      };
      // 園児登録
      request(app)
        .post('/api/children')
        .send(childReq)
        .expect(200)
        .expect(res => {
          res.body.should.have.property('name', '鈴木一郎');
          res.body.should.have.property('birthday', '2013-04-01');
          res.body.should.have.property('sex', 'M');

          id = res.body._id;
        })
        .end((err, childRes) => {
          var cardReq = {
            _id: '123456',
            owner: 'hoge',
            children: [id]
          };
          // カード登録
          request(app)
            .post('/api/cards')
            .send(cardReq)
            .expect(200)
            .expect(res => {
              res.body.should.have.property('_id', '123456');
              res.body.should.have.property('owner', 'hoge');
              res.body.should.have.property('children', [id]);
            })
            .end((err, cardRes) => {
              // 園児取得
              request(app)
                .get('/api/children/' + id)
                .expect(200)
                .expect(res => {
                  res.body.should.have.property('name', '鈴木一郎');
                  res.body.should.have.property('birthday', '2013-04-01');
                  res.body.should.have.property('sex', 'M');
                  res.body.should.have.property('cards');
                  res.body.should.have.deep.property('cards.length', 1);
                  res.body.should.have.deep.property('cards[0]._id', '123456');
                  res.body.should.have.deep.property('cards[0].owner', 'hoge');
                  res.body.should.have.deep.property('cards[0].children.length', 1);
                  res.body.should.have.deep.property('cards[0].children[0]', id);
                })
                .end(done);
            });
        });
    });
  });

  it('園児を更新できる', done => {
    var id;
    var createReq = {
      name: '鈴木一郎',
      birthday: '2013-04-01',
      sex: 'M'
    };
    var updateReq = {
      name: '鈴木次郎'
    };
    // 園児登録
    request(app)
      .post('/api/children')
      .send(createReq)
      .expect(200)
      .expect(res => {
        res.body.should.have.property('name', '鈴木一郎');
        res.body.should.have.property('birthday', '2013-04-01');
        res.body.should.have.property('sex', 'M');

        id = res.body._id;
      })
      .end((err, cardRes) => {
        // 園児更新
        request(app)
          .put('/api/children/' + id)
          .send(updateReq)
          .expect(200)
          .expect(res => {
            res.body.should.have.property('name', '鈴木次郎');
            res.body.should.have.property('birthday', '2013-04-01');
            res.body.should.have.property('sex', 'M');
          })
          .end(done);
      });
  });

  it('園児を削除できる', done => {
    var id;
    var finalResult = [];
    var req = {
      name: '鈴木一郎',
      birthday: '2013-04-01',
      sex: 'M'
    };
    // 園児登録
    request(app)
      .post('/api/children')
      .send(req)
      .expect(200)
      .expect(res => {
        res.body.should.have.property('name', '鈴木一郎');
        res.body.should.have.property('birthday', '2013-04-01');
        res.body.should.have.property('sex', 'M');

        id = res.body._id;
      })
      .end((err, cardRes) => {
        request(app)
          .del('/api/children/' + id)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            request(app)
              .get('/api/children')
              .expect(200, finalResult, done);
          });
      });
  });
});
