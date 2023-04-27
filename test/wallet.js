const chai = require("chai");
const app = require("../app");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

describe("Wallet Api", function () {
  it("should throw Required fields are missing error", function (done) {
    chai
      .request(app)
      .post("/setup")
      .send({
        balance: 20,
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

  it("should Initialize Wallet", function (done) {
    chai
      .request(app)
      .post("/setup")
      .send({
        balance: 10,
        name: "john",
      })
      .end((err, response) => {
        expect(response.status).to.be.equal(201);
        expect(JSON.parse(response.text).status).to.be.equal("Success");
        expect(JSON.parse(response.text).message).to.be.equal(
          "Wallet Initialized successfully"
        );
        expect(JSON.parse(response.text).data.balance).to.be.equal(10);
        expect(JSON.parse(response.text).data.name).to.be.equal("john");
        done();
      });
  });
});
