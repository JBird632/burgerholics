'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _burgerCollection = require('../collections/burgerCollection');

var _burgerCollection2 = _interopRequireDefault(_burgerCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReviewsView = function (_Backbone$View) {
    _inherits(ReviewsView, _Backbone$View);

    function ReviewsView() {
        _classCallCheck(this, ReviewsView);

        return _possibleConstructorReturn(this, (ReviewsView.__proto__ || Object.getPrototypeOf(ReviewsView)).apply(this, arguments));
    }

    _createClass(ReviewsView, [{
        key: 'initialize',
        value: function initialize() {
            this.reportBody = this.$el.find('.reportBody');
            this.collection = new _burgerCollection2.default({ reviewsOnly: true });
            this.collection.fetch({ success: this.render.bind(this) });
        }
    }, {
        key: 'el',
        value: function el() {
            return '.reports';
        }
    }, {
        key: 'template',
        value: function template(model) {
            return (0, _jquery2.default)('<div class=\'row reportRow\'>\n            <div class=\'col-3 tableRemove\'>' + model.get('member') + '</div>\n            <div class=\'col-3 center tableRemove\'>' + model.get('date') + '</div>\n            <div class=\'col-3 tableExtend-6\'>' + model.get('name') + '</div>\n            <div class=\'col-3 right tableExtend-6\'><a class=\'btn btn-primary\' href=\'/review-burger/' + model.get('id') + '\'>Review</a></div>\n        </div>');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            this.reportBody.html('');

            this.collection.forEach(function (model) {
                if (model.get('member') != 'Hugh' && model.get('name') != '') _this2.reportBody.prepend(_this2.template(model));
            });
        }
    }]);

    return ReviewsView;
}(_backbone2.default.View);

exports.default = ReviewsView;