'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _imgur = require('imgur');

var _imgur2 = _interopRequireDefault(_imgur);

var _mapsAPI = require('../utility/mapsAPI');

var _mapsAPI2 = _interopRequireDefault(_mapsAPI);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _slackNode = require('slack-node');

var _slackNode2 = _interopRequireDefault(_slackNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_imgur2.default.setClientId('52a727e5f7ccd4e');
_imgur2.default.setAPIUrl('https://api.imgur.com/3/');

var BurgerController = function (_Controller) {
    _inherits(BurgerController, _Controller);

    function BurgerController() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, BurgerController);

        var _this2 = _possibleConstructorReturn(this, (BurgerController.__proto__ || Object.getPrototypeOf(BurgerController)).call(this, options));

        _this2.registerPost('/burgers', { callback: _this2.submitBurger.bind(_this2) });
        _this2.registerPut('/burgers/:id', { callback: _this2.updateBurger.bind(_this2) });
        _this2.registerGet('/burgers', { callback: _this2.getBurgers.bind(_this2) });
        _this2.registerGet('/burgers/:id', { callback: _this2.getBurgers.bind(_this2) });
        _this2.registerGet('/burger-reviews', { callback: _this2.getBurgerReviews.bind(_this2) });
        _this2.registerPost('/burgers/:id/review', { callback: _this2.postReview.bind(_this2) });
        _this2.uploadImages = true;
        _this2.slack = new _slackNode2.default();
        _this2.slack.setWebhook('https://hooks.slack.com/services/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');

        var filesPath = _path2.default.join(__dirname, '../../files');

        if (!_fs2.default.existsSync(filesPath)) _fs2.default.mkdirSync(filesPath);
        return _this2;
    }

    _createClass(BurgerController, [{
        key: 'submitBurger',
        value: function submitBurger(request, response) {
            var _this = this;

            if (request.body.location) {
                var coordinates = void 0;
                var coordTokens = request.body.location.split(' ');

                if (coordTokens.length == 2 && parseInt(coordTokens[0]) && parseInt(coordTokens[1])) {
                    coordinates = { lat: coordTokens[0], long: coordTokens[1] };
                    request.body.coordinates = coordinates;
                    this.asyncGetLocation(coordinates, request, response);
                } else {
                    (0, _request2.default)(_mapsAPI2.default.bingRoot + 'Locations?query=' + request.body.location + ',%20' + request.body.country + '&key=' + _mapsAPI2.default.bingKey, { json: true }, function (err, res, body) {
                        if (err) {
                            response.statusCode = 400;
                            response.send('Invalid Address');
                        } else {
                            if (body.resourceSets.length > 0 && body.resourceSets[0].resources.length > 0) {
                                var _coordinates = { lat: body.resourceSets[0].resources[0].bbox[2], long: body.resourceSets[0].resources[0].bbox[3] };
                                var officeCoords = _this.getMemberLocation(request.body.member) == 'Vancouver' ? _mapsAPI2.default.vcVancouverCoordinates : _mapsAPI2.default.vcTorontoCoordinates;
                                request.body.coordinates = _coordinates;

                                (0, _request2.default)(_mapsAPI2.default.bingRoot + 'Routes/DistanceMatrix?origins=' + officeCoords.lat + ',' + officeCoords.long + '&destinations=' + _coordinates.lat + ',' + _coordinates.long + '&travelMode=driving&distanceUnit=km&key=' + _mapsAPI2.default.bingKey, { json: true }, function (err, res, body) {
                                    if (err) {
                                        response.statusCode = 400;
                                        response.send('Invalid Address');
                                    } else {
                                        request.body.distance = body.resourceSets[0].resources[0].results[0].travelDistance;
                                        _this.saveBurgerRequest(request, response);
                                    }
                                });
                            } else {
                                response.statusCode = 400;
                                response.send('Invalid Address');
                            }
                        }
                    });
                }
            } else this.saveBurgerRequest(request, response);
        }
    }, {
        key: 'getMemberLocation',
        value: function getMemberLocation(name) {
            var location = 'Vancouver';

            this.config.members.forEach(function (member) {
                if (member.name == name) location = member.location;
            });

            return location;
        }
    }, {
        key: 'asyncGetLocation',
        value: function asyncGetLocation(coordinates, request, response) {
            var _this = this;

            (0, _request2.default)(_mapsAPI2.default.bingRoot + 'Locations/' + coordinates.lat + ',' + coordinates.long + '?o=json&key=' + _mapsAPI2.default.bingKey, { json: true }, function (err, res, body) {
                if (err) console.log(err);

                request.body.location = body.resourceSets[0].resources[0].address.addressLine + ', ' + body.resourceSets[0].resources[0].address.locality + ', ' + body.resourceSets[0].resources[0].address.adminDistrict;
                var officeCoords = _this.getMemberLocation(request.body.member) == 'Vancouver' ? _mapsAPI2.default.vcVancouverCoordinates : _mapsAPI2.default.vcTorontoCoordinates;

                (0, _request2.default)(_mapsAPI2.default.bingRoot + 'Routes/DistanceMatrix?origins=' + officeCoords.lat + ',' + officeCoords.long + '&destinations=' + coordinates.lat + ',' + coordinates.long + '&travelMode=driving&distanceUnit=km&key=' + _mapsAPI2.default.bingKey, { json: true }, function (err, res, body) {
                    if (err) {
                        response.statusCode = 400;
                        response.send('BBR: Bad Burger Request');
                    }

                    request.body.distance = body.resourceSets[0].resources[0].results[0].travelDistance;
                    _this.saveBurgerRequest(request, response);
                });
            });
        }
    }, {
        key: 'saveBurgerRequest',
        value: function saveBurgerRequest(request, response) {
            var _this3 = this;

            var burger = {
                name: request.body.name,
                description: request.body.description,
                restaurant: request.body.restaurant,
                location: request.body.location,
                member: request.body.member,
                date: request.body.date,
                country: request.body.country,
                distance: request.body.distance,
                coordinates: request.body.coordinates,
                rating: ''
            };

            if (this.isValidBurgerRequest(request.body) && this.isValidPhoto(request.file)) {
                if (request.file && this.uploadImages) {
                    _imgur2.default.uploadFile(request.file.path).then(function (json) {
                        burger.photo = json.data.link;

                        _fs2.default.unlink(request.file.path, function (error) {
                            if (error) throw error;
                        });

                        _this3.slack.webhook({
                            channel: '#e-burgerholics-club',
                            username: 'Burger Submission',
                            icon_emoji: ':hamburger:',
                            attachments: [{
                                fallback: 'Burger Submission',
                                text: '*Member*: ' + burger.member + ' \n*Burger Name*: ' + burger.name + ' \n*Location*: ' + burger.restaurant + ' \n*Distance*: ' + burger.distance + 'km \n*Description*: ' + burger.description + ' \n',
                                image_url: burger.photo
                            }]
                        }, function () {
                            response.statusCode = 201;
                            response.json(burger);
                        });
                    }).catch(function (error) {
                        response.statusCode = 400;
                        response.send('BBR: Bad Burger Request');
                    });
                } else {
                    this.slack.webhook({
                        channel: '#e-burgerholics-club',
                        username: 'Burger Submission',
                        icon_emoji: ':hamburger:',
                        attachments: [{
                            fallback: 'Burger Submission',
                            text: '*Member*: ' + burger.member + ' \n*Burger Name*: ' + burger.name + ' \n*Location*: ' + burger.restaurant + ' \n*Distance*: ' + burger.distance + 'km \n*Description*: ' + burger.description + ' \n',
                            image_url: burger.photo
                        }]
                    }, function () {
                        response.statusCode = 201;
                        response.json(burger);
                    });
                }
            } else {
                response.statusCode = 400;
                response.send('BBR: Bad Burger Request');
            }
        }
    }, {
        key: 'roundTwoDecimalPlaces',
        value: function roundTwoDecimalPlaces(number) {
            return;
        }
    }, {
        key: 'isVideo',
        value: function isVideo(file) {
            if (!file) return true;

            var extension = _path2.default.extname(file.originalname);
            return extension == '.mov' || extension == '.mp4';
        }
    }, {
        key: 'updateBurger',
        value: function updateBurger(request, response) {
            this.database.ref('burgers/' + request.params.id).set(request.body).then(function () {
                response.statusCode = 200;
                response.send();
            });
        }
    }, {
        key: 'isValidBurgerRequest',
        value: function isValidBurgerRequest(body) {
            return body.name && body.name != '' && body.member && body.member != '' && body.date && body.date != '' && body.location && body.location != '' && body.restaurant && body.restaurant != '';
        }
    }, {
        key: 'isValidPhoto',
        value: function isValidPhoto(file) {
            if (!file) return true;

            var extension = _path2.default.extname(file.originalname).toLowerCase();
            return extension == '.jpg' || extension == '.jpeg' || extension == '.png' || extension == '.gif' || extension == '.mov' || extension == '.mp4';
        }
    }, {
        key: 'addBurgerToDB',
        value: function addBurgerToDB(burger) {
            //this.addPlaceIfNew(burger.restaurant);
            this.database.ref('burgers').push(burger);
            return burger;
        }
    }, {
        key: 'getBurgers',
        value: function getBurgers(request, response) {
            var burgers = [];
            var collection = request.params.id ? 'burgers/' + request.params.id : 'burgers';

            this.database.ref(collection).on('value', function (snapshot) {
                var firebaseBurgers = snapshot.toJSON();
                burgers = Object.keys(firebaseBurgers).map(function (key) {
                    var burger = firebaseBurgers[key];
                    burger.id = key;
                    return burger;
                });
                response.statusCode = 200;
                response.json(burgers);
            });
        }
    }, {
        key: 'getBurgerReviews',
        value: function getBurgerReviews(request, response) {
            var burgers = void 0;
            var collection = request.params.id ? 'burgers/' + request.params.id : 'burgers';

            this.database.ref(collection).on('value', function (snapshot) {
                burgers = Object.keys(snapshot.val()).map(function (key) {
                    return snapshot.val()[key];
                });
                burgers = burgers.filter(function (burger) {
                    return burger.rating != '';
                });
                response.statusCode = 200;
                response.json(burgers);
            });
        }
    }, {
        key: 'addPlaceIfNew',
        value: function addPlaceIfNew(place) {
            var _this4 = this;

            var places = void 0;
            this.database.ref('places').on('value', function (snapshot) {
                places = snapshot.val() || [];
            }).then(function () {
                if (!places.contains(place)) _this4.database.ref('places').push(place);
            });
        }
    }, {
        key: 'capitalize',
        value: function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }, {
        key: 'postReview',
        value: function postReview(request, response) {
            var burger = request.body;

            this.slack.webhook({
                channel: '#e-burgerholics-club',
                username: 'Burger Review',
                icon_emoji: ':hamburger:',
                attachments: [{
                    fallback: 'Burger Review',
                    text: '*Member*: ' + burger.member + ' \n*Burger Name*: ' + burger.name + ' \n*Hugh Points*: `' + burger.rating + '` \n*Comment*: ' + burger.comment
                }]
            }, function () {
                response.statusCode = 200;
                response.send();
            });
        }
    }]);

    return BurgerController;
}(_controller2.default);

exports.default = BurgerController;