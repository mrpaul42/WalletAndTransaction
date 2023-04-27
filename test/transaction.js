const chai = require("chai");
const app = require("../app");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

describe("Create transaction Api", function () {
  it("should throw Required fields are missing error", function (done) {
    chai
      .request(app)
      .post("/transaction/644a565da81412d7783b3af7")
      .send({
        amount: 20,
      })
      .end((err, response) => {
        expect(response.status).to.be.equal(400);
        expect(JSON.parse(response.text).status).to.be.equal("failure");
        expect(JSON.parse(response.text).message).to.be.equal(
          "Required fields are missing."
        );
        done();
      });
  });

  it("should throw Insufficient balance error", function (done) {
    chai
      .request(app)
      .post("/transaction/644a565da81412d7783b3af7")
      .send({
        amount: -200,
        description: "abc",
      })
      .end((err, response) => {
        expect(response.status).to.be.equal(400);
        expect(JSON.parse(response.text).status).to.be.equal("failure");
        expect(JSON.parse(response.text).message).to.be.equal(
          "Insufficient balance to processed the transaction."
        );
        done();
      });
  });

  it("should credit transaction successfully", function (done) {
    chai
      .request(app)
      .post("/transaction/644a565da81412d7783b3af7")
      .send({
        amount: 10,
        description: "abc",
      })
      .end((err, response) => {
        expect(response.status).to.be.equal(201);
        expect(JSON.parse(response.text).status).to.be.equal("Success");
        expect(JSON.parse(response.text).message).to.be.equal(
          "Transaction successful"
        );
        expect(JSON.parse(response.text).data.amount).to.be.equal(10);
        expect(JSON.parse(response.text).data.walletId).to.be.equal(
          "644a565da81412d7783b3af7"
        );
        expect(JSON.parse(response.text).data.transactionType).to.be.equal(
          "Credit"
        );
        done();
      });
  });

  it("should debit transaction successfully", function (done) {
    chai
      .request(app)
      .post("/transaction/644a565da81412d7783b3af7")
      .send({
        amount: -10,
        description: "abc",
      })
      .end((err, response) => {
        expect(response.status).to.be.equal(201);
        expect(JSON.parse(response.text).status).to.be.equal("Success");
        expect(JSON.parse(response.text).message).to.be.equal(
          "Transaction successful"
        );
        expect(JSON.parse(response.text).data.amount).to.be.equal(10);
        expect(JSON.parse(response.text).data.walletId).to.be.equal(
          "644a565da81412d7783b3af7"
        );
        expect(JSON.parse(response.text).data.transactionType).to.be.equal(
          "Debit"
        );
        done();
      });
  });

  //   it("should fetch the transaction data", function (done) {
  //     chai.request(app).get("/transaction/644a91863e184bce9df8a9eb");
  //   });
});
