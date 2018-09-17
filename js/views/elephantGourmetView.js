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

var _burgerCollection = require('../collections/burgerCollection');

var _burgerCollection2 = _interopRequireDefault(_burgerCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElephantGourmetView = function (_Backbone$View) {
    _inherits(ElephantGourmetView, _Backbone$View);

    function ElephantGourmetView() {
        _classCallCheck(this, ElephantGourmetView);

        return _possibleConstructorReturn(this, (ElephantGourmetView.__proto__ || Object.getPrototypeOf(ElephantGourmetView)).apply(this, arguments));
    }

    _createClass(ElephantGourmetView, [{
        key: 'initialize',
        value: function initialize() {
            this.canvas = this.$el.find('.elephantGourmetChart');
            this.body = this.$el.find('.gourmet-body');
            this.collection = new _burgerCollection2.default();
            this.collection.fetch({ success: this.render.bind(this) });
        }
    }, {
        key: 'el',
        value: function el() {
            return '.content';
        }
    }, {
        key: 'template',
        value: function template(options, className) {
            return (0, _jquery2.default)('<div class=' + ('\'row ' + className + '\'') + '>\n            <div class=\'col-2\'>' + options.rank + '</div>\n            <div class=\'col-6\'>' + options.member + '</div>\n            <div class=\'col-4 center\'>' + options.totalRating + '</div></div>');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var memberBurgers = this.collection.groupBy(function (model) {
                return model.get('member');
            });
            var memberKeys = Object.keys(memberBurgers);
            var members = memberKeys.map(function (member) {
                var totalRating = 0;
                memberBurgers[member].forEach(function (burger) {
                    return totalRating += parseInt(burger.get('rating')) || 0;
                });
                return {
                    member: member,
                    totalRating: totalRating
                };
            });

            members = _underscore2.default.sortBy(members, function (member) {
                return member.totalRating;
            }).reverse();

            var keys = members.map(function (member) {
                return member.member;
            });
            var ratings = members.map(function (member) {
                return member.totalRating;
            });

            new Chart(this.canvas[0].getContext('2d'), {
                type: 'bar',
                data: {
                    labels: keys,
                    datasets: [{
                        label: 'Gourmet Elephant',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 0.2)',
                        data: ratings
                    }]
                },
                options: {}
            });

            var memberIndex = 0;

            members.forEach(function (member) {
                if (member.member != 'Hugh') {
                    var memberClass = '';
                    member.rank = memberIndex + 1;

                    if (memberIndex == 0) memberClass = 'first';else if (memberIndex == 1) memberClass = 'second';else if (memberIndex == 2) memberClass = 'third';

                    _this2.body.append(_this2.template(member, memberClass));
                    memberIndex++;
                }
            });
        }
    }]);

    return ElephantGourmetView;
}(_backbone2.default.View);

exports.default = ElephantGourmetView;