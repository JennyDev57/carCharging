// process.env.NODE_ENV = 'test';

import assert from 'assert';
// import { RechargeFonction } from '../src/lib/recharge';

//Require the dev-dependencies
import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from "../src/index";

chai.use(chaiHttp);
describe("Test de Recharge", function() {
    
    describe('/ADD hours', () => {
        it('add hours', function(done){

            let startDate = new Date();
            startDate.setHours(18);
            startDate.setMinutes(30);
            startDate.setSeconds(0);
    
            let endDate = new Date();
            endDate.setDate(startDate.getDate() + 1)
            endDate.setHours(8);
            endDate.setMinutes(0);
            endDate.setSeconds(0);

            let data = {
                startDate: startDate,
                endDate: endDate
            }

            chai.request(startServer)
                .post('/recharge/add')
                .send(data)
                .end((err: any, res: any) => {
                    res.should.have.status(200);

                    done();
                });
    
            // assert.equal(startDate, endDate);
            // RechargeFonction.addDates(startDate, endDate);
        })
    })
    
})