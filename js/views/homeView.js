'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

var _carouselView = require('./carousel/carouselView');

var _carouselView2 = _interopRequireDefault(_carouselView);

var _carouselItemView = require('./carousel/carouselItemView');

var _carouselItemView2 = _interopRequireDefault(_carouselItemView);

var _infoCollection = require('../collections/infoCollection');

var _infoCollection2 = _interopRequireDefault(_infoCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomeView = function (_Backbone$View) {
    _inherits(HomeView, _Backbone$View);

    function HomeView() {
        _classCallCheck(this, HomeView);

        return _possibleConstructorReturn(this, (HomeView.__proto__ || Object.getPrototypeOf(HomeView)).apply(this, arguments));
    }

    _createClass(HomeView, [{
        key: 'initialize',
        value: function initialize() {
            this.collection = new _infoCollection2.default();
            this.collection.fetch({ success: this.render.bind(this) });
        }
    }, {
        key: 'el',
        value: function el() {
            return '.index';
        }
    }, {
        key: 'render',
        value: function render() {
            this.collection.forEach(function (info) {
                new _carouselItemView2.default({
                    title: info.get('title'),
                    description: info.get('description'),
                    image: info.get('image'),
                    links: info.get('links')
                });
            });

            new _carouselView2.default();
        }
    }]);

    return HomeView;
}(_backbone2.default.View);

exports.default = HomeView;