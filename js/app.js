'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _controller = require('./common/controller');

var _controller2 = _interopRequireDefault(_controller);

var _burgerController = require('./common/burgerController');

var _burgerController2 = _interopRequireDefault(_burgerController);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _countryList = require('country-list');

var _countryList2 = _interopRequireDefault(_countryList);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ipAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var config = JSON.parse(_fs2.default.readFileSync(_path2.default.join(__dirname, '../config.json'), 'utf8'));
var app = (0, _express2.default)();
app.set('view engine', 'pug');
app.set('views', _path2.default.join(__dirname, '../pug'));
app.use(_express2.default.static(_path2.default.join(__dirname, '../')));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

var database = _firebase2.default.initializeApp({
    apiKey: 'AIzaSyA6Oo6mFp5n4RG_4Wt-lhsqL9MuPE63OeA',
    authDomain: 'burgerholics-29de2.firebaseapp.com',
    databaseURL: 'https://burgerholics-29de2.firebaseio.com',
    storageBucket: 'burgerholics-29de2.appspot.com',
    rules: {
        '.read': true,
        '.write': true
    }
}).database();

var controller = new _controller2.default({ app: app, config: config, database: database });
controller.registerGet('/', { template: 'index', title: 'Burgerholics' });
controller.registerGet('/statistics', { template: 'reports', title: 'Statistics' });
controller.registerGet('/hungry-elephant', { template: 'hungryElephant', title: 'Hungry Elephant' });
controller.registerGet('/elephant-gourmet', { template: 'elephantGourmet', title: 'Elephant Gourmet' });
controller.registerGet('/far-away-elephant', { template: 'farAwayElephant', title: 'Far Away Elephant' });
controller.registerGet('/reviews', { template: 'reviews', title: 'Pending Reviews' });
controller.registerGet('/submit-burger', { template: 'submitBurger', title: 'Submit Burger', params: { countries: (0, _countryList2.default)().getNames() } });
controller.registerGet('/review-burger', { template: 'reviewBurger', title: 'Review Burger' });
controller.registerGet('/review-burger/:id', { template: 'reviewBurger', title: 'Review Burger' });
controller.registerGet('/view-burger/:id', { template: 'viewBurger', title: 'Burger', params: { countries: (0, _countryList2.default)().getNames() } });
controller.registerGet('/faq', { template: 'faq', title: 'FAQ' });
controller.registerGet('/nominations', { template: 'nominations', title: 'Nominations' });
controller.registerGet('/thanks-submitting', { template: 'thanks', title: 'Thanks Submitting' });
controller.registerGet('/thanks-reviewing', { template: 'thanks', title: 'Thanks Reviewing' });
controller.registerGet('/hall-of-fame', { template: 'hallOfFame', title: 'Hall of Fame' });

new _burgerController2.default({ app: app, config: config, database: database });
app.listen(port, ipAddress, function () {
    return console.log('Server: Listening on port ' + port);
});