'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _mapsAPI = require('../utility/mapsAPI');

var _mapsAPI2 = _interopRequireDefault(_mapsAPI);

var _burgerCollection = require('../collections/burgerCollection');

var _burgerCollection2 = _interopRequireDefault(_burgerCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FarAwayElephantView = function (_Backbone$View) {
    _inherits(FarAwayElephantView, _Backbone$View);

    function FarAwayElephantView() {
        _classCallCheck(this, FarAwayElephantView);

        return _possibleConstructorReturn(this, (FarAwayElephantView.__proto__ || Object.getPrototypeOf(FarAwayElephantView)).apply(this, arguments));
    }

    _createClass(FarAwayElephantView, [{
        key: 'initialize',
        value: function initialize() {
            var _this2 = this;

            this.furthestBurgers = [];
            this.map = this.$el.find('img.map');
            this.mapCanvas = this.$el.find('canvas.map');
            this.mapContext = this.$el.find('canvas.map')[0].getContext('2d');
            this.body = this.$el.find('.faraway-body');
            this.collection = new _burgerCollection2.default();
            this.collection.fetch({ success: this.render.bind(this) });

            (0, _jquery2.default)(window).resize(function () {
                return _this2.mapCanvas.height(_this2.mapCanvas.width());
            });
        }
    }, {
        key: 'el',
        value: function el() {
            return '.content';
        }
    }, {
        key: 'template',
        value: function template(options, className) {
            return (0, _jquery2.default)('<div class=' + ('\'row ' + className + '\'') + '>\n            <div class=\'col-2\'>' + options.rank + '</div>\n            <div class=\'col-3 tableExtend-6\'>' + options.member + '</div>\n            <div class=\'col-3 tableRemove\'>' + options.burger.get('location') + '</div>\n            <div class=\'col-4 center\'>' + options.distance + '</div></div>');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var memberBurgers = this.collection.groupBy(function (model) {
                return model.get('member');
            });
            var members = Object.keys(memberBurgers).map(function (member) {
                var furthest = 0;
                var furthestBurger = void 0;

                memberBurgers[member].forEach(function (burger) {
                    var dist = parseFloat(burger.get('distance')) || 0;

                    if (dist > furthest) {
                        furthest = dist;
                        furthestBurger = burger;
                    }
                });

                return {
                    member: member,
                    distance: _this3.round(furthest),
                    burger: furthestBurger
                };
            });

            members = _underscore2.default.sortBy(members, function (member) {
                return member.distance;
            }).reverse();

            var memberIndex = 0;
            members.forEach(function (member) {
                var memberClass = '';
                member.rank = memberIndex + 1;

                if (memberIndex == 0) memberClass = 'first';else if (memberIndex == 1) memberClass = 'second';else if (memberIndex == 2) memberClass = 'third';

                _this3.body.append(_this3.template(member, memberClass));
                memberIndex++;
            });

            this.mapCanvas.height(this.mapCanvas.width());
            this.mapCanvas[0].width = this.mapCanvas.width();
            this.mapCanvas[0].height = this.mapCanvas.height();
            this.mapContext.drawImage(this.map[0], 0, 0, this.map[0].width, this.map[0].height, 0, 0, this.mapCanvas[0].width, this.mapCanvas[0].height);
            var coordinates = members.map(function (member) {
                return member.burger.get('coordinates');
            });
            var fillColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
            var lineColors = ['#FFF922', '#E2E2E2', '#EF9F54'];
            var i = 0;

            coordinates.forEach(function (coordinate) {
                if (coordinate && coordinate.long && coordinate.lat) {
                    var point = _this3.coordinateToPoint(coordinate);
                    var fillColor = i < 3 ? fillColors[i] : '#C13119';
                    var lineColor = i < 3 ? lineColors[i] : '#E2433B';
                    var radius = i < 3 ? _this3.mapCanvas.width() / 50 : _this3.mapCanvas.width() / 200;
                    _this3.drawPoint(point, radius, fillColor, lineColor);
                }

                i++;
            });

            this.drawPoint(this.coordinateToPoint(_mapsAPI2.default.vcVancouverCoordinates), this.mapCanvas.width() / 75, '#4A87C9', '#6B98DA');
        }
    }, {
        key: 'drawPoint',
        value: function drawPoint(point, radius, fillColor, lineColor) {
            this.mapContext.beginPath();
            this.mapContext.arc(point.x, point.y, radius, 0, 2 * Math.PI, true);
            this.mapContext.fillStyle = fillColor;
            this.mapContext.fill();
            this.mapContext.lineWidth = 2;
            this.mapContext.strokeStyle = lineColor;
            this.mapContext.stroke();
        }
    }, {
        key: 'coordinateToPoint',
        value: function coordinateToPoint(coordinate) {
            return {
                x: (coordinate.long + 179) / 360 * this.mapCanvas.width(),
                y: this.mapCanvas.height() - (coordinate.lat + 72) / 180 * this.mapCanvas.height()
            };
        }
    }, {
        key: 'round',
        value: function round(value) {
            return Math.round(value * 10) / 10;
        }
    }]);

    return FarAwayElephantView;
}(_backbone2.default.View);

exports.default = FarAwayElephantView;