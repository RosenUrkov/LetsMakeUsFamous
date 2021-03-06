/* eslint-disable */

const chai = require('chai');
const mock = require('mock-require');

const { expect } = chai;
let model = require('../../../models/user.model');

describe('user model tests', () => {
    beforeEach(() => {
        model.username = 'Petko';
        model.password = 'xaxaxa';
        model.email = 'petko@abv.bg'
        model.password_confirm = 'xaxaxa1'
    });
    afterEach(() => {
        let model = require('../../../models/user.model');
    });

    it('should reject when user is undefined', (done) => {
        model.validateModel('undefined')
            .then(() => {
                expect(true).to.be.false;
            }, () => {
                expect(true).to.be.true
            })
            .then(done, done);
    })
    it('should reject when user is password do not match', (done) => {
        model.validateModel(model)
            .then(() => {
                expect(true).to.be.false;
            }, () => {
                expect(true).to.be.true
            })
            .then(done, done);
    })
    it('should resolve when user is password do  match', (done) => {
        model.username = 'Petar';
        model.password = 'xaxaxa22'
        model.email = 'some@valid.bg'
        model.password_confirm = 'xaxaxa22';
        model.validateModel(model)
            .then(() => {
                expect(true).to.be.true;
            })
            .then(done, done);
    })
    it('should Promise reject rank', (done) => {
        model.username = 'Petar';
        model.password = 'xaxaxa22'
        model.email = 'some@valid.bg'
        model.password_confirm = 'xaxaxa22';
        model.validateRank('xaxa')
            .then(() => {
                expect(true).to.be.false;
            }, () => {
                expect(true).to.be.true
            })
            .then(done, done);
    })
    it('should Promise resolve rank', (done) => {
        model.username = 'Petar';
        model.password = 'xaxaxa22'
        model.email = 'some@valid.bg'
        model.password_confirm = 'xaxaxa22';
        model.validateRank(3)
            .then(() => {
                expect(true).to.be.true;
            })
            .then(done, done);
    })
    it('Validate password should reject when user is invalid', (done) => {
        model.validatePassword(null, 'xaxa')
            .then(() => {
                expect(true).to.be.false;
            }, () => {
                expect(true).to.be.true
            })
            .then(done, done)
    })
    it('Validate password should reject when password is invalid', (done) => {
        model.validatePassword(model, null)
            .then(() => {
                expect(true).to.be.false;
            }, () => {
                expect(true).to.be.true
            })
            .then(done, done)
    });

    it('Validate UserInfo should reject when birthday is invalid', (done) => {
        model.birthday = 12;
        model.validateUserInfo(model)
            .then(() => {
                expect(true).to.be.false;
            }, () => {
                expect(true).to.be.true
            })
            .then(done, done)
    })

    it('Validate UserInfo should reject when city is invalid', (done) => {
        const user = {
            birthDate: '12.12.2017',
            city: 1,
        };
        model.validateUserInfo(user)
            .then(() => {
                expect(true).to.be.false;
            }, () => {
                expect(true).to.be.true
            })
            .then(done, done)
    })

    it('Validate UserInfo should reject when city is invalid', (done) => {
        const user = {
            birthDate: '12.12.2017',
            city: 'Sofia',
            email: 'invalidEmail',
        };

        model.validateUserInfo(user)
            .then(() => {
                expect(true).to.be.false;
            }, () => {
                expect(true).to.be.true
            })
            .then(done, done)
    })

    it('Validate UserInfo should reject when email is invalid', (done) => {
        const user = {
            birthDate: '12.12.2017',
            city: 'Sofia',
            email: 'email@abv.bg',
            phoneNumber: 'asdf'
        };

        model.validateUserInfo(user)
            .then(() => {
                expect(true).to.be.false;
            }, () => {
                expect(true).to.be.true
            })
            .then(done, done)
    })
    it('Validate UserInfo should reject when description is invalid', (done) => {
        const user = {
            birthDate: '12.12.2017',
            city: 'Sofia',
            email: 'email@abv.bg',
            phoneNumber: '1234567890',
            description: 111,
        };

        model.validateUserInfo(user)
            .then(() => {
                expect(true).to.be.false;
            }, () => {
                expect(true).to.be.true
            })
            .then(done, done)
    })


})
