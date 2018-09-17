'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClickableImage = function (_Backbone$View) {
    _inherits(ClickableImage, _Backbone$View);

    function ClickableImage() {
        _classCallCheck(this, ClickableImage);

        return _possibleConstructorReturn(this, (ClickableImage.__proto__ || Object.getPrototypeOf(ClickableImage)).apply(this, arguments));
    }

    _createClass(ClickableImage, [{
        key: 'el',
        value: function el() {
            return '.clickable-image';
        }
    }, {
        key: 'events',
        value: function events() {
            return {
                'click': this.openPhoto
            };
        }
    }, {
        key: 'openPhoto',
        value: function openPhoto(event) {
            window.location.href = event.target.src;
        }
    }]);

    return ClickableImage;
}(_backbone2.default.View);

exports.default = ClickableImage;