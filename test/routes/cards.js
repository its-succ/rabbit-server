'use strict';

const request = require('supertest');
const sequelizeFixtures = require('sequelize-fixtures');

const app = require('../../app');
const models = require('../../models');

describe('API /api/cards', () => {
  beforeEach(() => {
    this.Card = models.card;
    return sequelizeFixtures.loadFile('test/routes/fixtures/card.test.yml', models);
  });

  afterEach(() => {
    return this.Card.destroy({where: {id: {$ne: null}}, force: true});
  });

  it('カードが登録できる', done => {
    const req = {
      cardNumber: 'cardNumnber-123'
    };
    request(app)
      .post('/api/cards')
      .send(req)
      .expect(200)
      .expect(res => {
        const card = res.body;
        card.should.have.property('cardNumber', 'cardNumnber-123');
      })
      .end(done);
  });

  it('カード一覧が取得できる', done => {
    request(app)
      .get('/api/cards')
      .expect(200)
      .expect(res => {
        const cards = res.body;
        cards.length.should.equal(1);
        cards[0].should.have.property('id', -1);
        cards[0].should.have.property('cardNumber', 'A12345');
      })
      .end(done);
  });

  // TODO: Childモデルが追加されたらchildrenを変更するテストを追加する
  it('カードを更新できる', done => {
    const req = {
      cardNumber: 'fuga'
    };
    request(app)
      .put('/api/cards/-1')
      .send(req)
      .expect(200)
      .expect(res => {
        const card = res.body;
        card.should.have.property('id', -1);
        card.should.have.property('cardNumber', 'fuga');
      })
      .end(done);
  });

  it('カードを削除できる', done => {
    const ret = [];
    request(app)
      .del('/api/cards/-1')
      .expect(200)
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
