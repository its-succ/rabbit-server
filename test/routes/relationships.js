'use strict';

const request = require('supertest');
const sequelizeFixtures = require('sequelize-fixtures');

const app = require('../../app');
const models = require('../../models');

describe('API /api/relationships', () => {
  beforeEach(() => {
    this.Relationship = models.relationship;
    return sequelizeFixtures.loadFile('test/routes/fixtures/relationship.test.yml', models);
  });

  afterEach(() => {
    return this.Relationship.destroy({where: {id: {$ne: null}}, force: true});
  });

  it('続柄が登録できる', done => {
    const req = {
      name: '父親'
    };
    request(app)
      .post('/api/relationships')
      .send(req)
      .expect(200)
      .expect(res => {
        const relationship = res.body;
        relationship.should.have.property('name', '父親');
      })
      .end(done);
  });

  it('続柄一覧が取得できる', done => {
    request(app)
      .get('/api/relationships')
      .expect(200)
      .expect(res => {
        const relationships = res.body;
        relationships.length.should.equal(1);
        relationships[0].should.have.property('id', -1);
        relationships[0].should.have.property('name', '母親');
      })
      .end(done);
  });

  it('続柄を更新できる', done => {
    const req = {
      name: '祖父'
    };
    request(app)
      .put('/api/relationships/-1')
      .send(req)
      .expect(200)
      .expect(res => {
        const relationship = res.body;
        relationship.should.have.property('id', -1);
        relationship.should.have.property('name', '祖父');
      })
      .end(done);
  });

  it('続柄を削除できる', done => {
    request(app)
      .del('/api/relationships/-1')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        request(app)
          .get('/api/relationships')
          .expect(200, [], done);
      });
  });
});
