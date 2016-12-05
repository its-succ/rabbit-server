'use strict';

const request = require('supertest');
const should = require('chai').should();
const sequelizeFixtures = require('sequelize-fixtures');

const app = require('../../app');
const models = require('../../models');

describe('API /api/children', () => {
  beforeEach(() => {
    this.Child = models.child;
    return sequelizeFixtures.loadFile('test/routes/fixtures/child.test.yml', models);
  });

  afterEach(() => {
    return this.Child.destroy({where: {id: {$ne: null}}, force: true});
  });

  it('園児が登録できる', done => {
    const req = {
      lastName: '鈴木',
      firstName: '一郎',
      birthday: '2013-04-01',
      sex: 'M'
    };
    request(app)
      .post('/api/children')
      .send(req)
      .expect(200)
      .expect(res => {
        res.body.should.have.property('lastName', '鈴木');
        res.body.should.have.property('firstName', '一郎');
        res.body.should.have.property('birthday', '2013-04-01');
        res.body.should.have.property('sex', 'M');
      })
      .end(done);
  });

  it('園児の一覧を取得できる', done => {
    request(app)
      .get('/api/children')
      .expect(200)
      .expect(res => {
        res.body.length.should.equal(1);
        const child = res.body[0];
        child.should.have.property('id', -1);
        child.should.have.property('lastName', '山田');
        child.should.have.property('firstName', '花子');
        child.should.have.property('birthday', '2015-11-11');
        child.should.have.property('sex', 'M');
      })
      .end(done);
  });

  it('園児一人の情報を取得できる', done => {
    request(app)
      .get('/api/children/-1')
      .expect(200)
      .expect(res => {
        res.body.should.have.property('lastName', '山田');
        res.body.should.have.property('firstName', '花子');
        res.body.should.have.property('birthday', '2015-11-11');
        res.body.should.have.property('sex', 'M');
      })
      .end(done);
  });

  it('園児を更新できる', done => {
    const updateReq = {
      sex: 'F',
    };

    // 園児更新
    request(app)
      .put('/api/children/-1')
      .send(updateReq)
      .expect(200)
      .expect(res => {
        res.body.should.have.property('lastName', '山田');
        res.body.should.have.property('firstName', '花子');
        res.body.should.have.property('birthday', '2015-11-11');
        res.body.should.have.property('sex', 'F');
      })
      .end(done);
  });


  it('園児を削除できる', done => {
    request(app)
      .del('/api/children/-1')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        request(app)
          .get('/api/children')
          .expect(200)
          .end(done);
      });
  });
});
