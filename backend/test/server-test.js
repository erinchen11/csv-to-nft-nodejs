const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const server = require('../server.js')
const {createReadStream} = require('fs')

const parse = require('csv-parse')



chai.use(chaiHttp)

describe('POST /mint/csv', () => {

    before(function() {
        const rows = []
        createReadStream('../public/test.csv')
            .pipe(parse())
            .on('data', function(row) {
                console.log("row : " +row)
                rows.push(row)
            })
            .on('end', function() {
                console.log(rows);
            })

    })

    it("It should POST a CSV", (done) => {
        chai.request(server)
    })


})

