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

var timeout = void 0;

var AlertView = function (_Backbone$View) {
    _inherits(AlertView, _Backbone$View);

    function AlertView() {
        _classCallCheck(this, AlertView);

        return _possibleConstructorReturn(this, (AlertView.__proto__ || Object.getPrototypeOf(AlertView)).apply(this, arguments));
    }

    _createClass(AlertView, [{
        key: 'initialize',
        value: function initialize() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.text = options.text;
            this.type = options.type || 'info';
            this.duration = options.duration || 5;
            this.render();
        }
    }, {
        key: 'el',
        value: function el() {
            return '.alert';
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            this.$el.html('<strong>' + (this.type == 'danger' ? 'Error:' : '') + '</strong> ' + this.text);
            this.$el.addClass('alert-' + this.type);
            this.$el.removeClass('hidden');
            clearTimeout(timeout);

            timeout = setTimeout(function () {
                _this2.$el.html('');
                _this2.$el.removeClass('alert-' + _this2.type);
                _this2.$el.addClass('hidden');
            }, this.duration * 1000);
        }
    }]);

    return AlertView;
}(_backbone2.default.View);

exports.default = AlertView;