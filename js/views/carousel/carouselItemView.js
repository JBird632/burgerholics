'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CarouselItemView = function (_Backbone$View) {
    _inherits(CarouselItemView, _Backbone$View);

    function CarouselItemView() {
        _classCallCheck(this, CarouselItemView);

        return _possibleConstructorReturn(this, (CarouselItemView.__proto__ || Object.getPrototypeOf(CarouselItemView)).apply(this, arguments));
    }

    _createClass(CarouselItemView, [{
        key: 'initialize',
        value: function initialize() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.title = options.title;
            this.description = options.description;
            this.image = options.image;
            this.links = options.links;
            this.render();
        }
    }, {
        key: 'el',
        value: function el() {
            return '.carousel';
        }
    }, {
        key: 'template',
        value: function template() {
            var template = (0, _jquery2.default)('<div class="carousel-item">\n            ' + (this.image ? '<img class=\'carouselPhoto\' src=\'' + this.image + '\'/>' : '') + '\n            ' + (this.title ? '<h1>' + this.title + '</h1>' : '') + '\n            ' + (this.description ? '<p>' + this.description + '</p>' : '') + '\n        </div>');

            if (this.links) {
                this.links.forEach(function (link) {
                    template.append((0, _jquery2.default)('<a class="btn ' + (link.class ? link.class : 'btn-info') + '" href="' + link.href + '">' + (link.text ? link.text : 'Link') + '</a>'));
                });
            }

            return template;
        }
    }, {
        key: 'render',
        value: function render() {
            this.$el.append(this.template());
        }
    }]);

    return CarouselItemView;
}(_backbone2.default.View);

exports.default = CarouselItemView;