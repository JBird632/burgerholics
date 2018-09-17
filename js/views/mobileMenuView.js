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

var MobileMenuView = function (_Backbone$View) {
    _inherits(MobileMenuView, _Backbone$View);

    function MobileMenuView() {
        _classCallCheck(this, MobileMenuView);

        return _possibleConstructorReturn(this, (MobileMenuView.__proto__ || Object.getPrototypeOf(MobileMenuView)).apply(this, arguments));
    }

    _createClass(MobileMenuView, [{
        key: 'initialize',
        value: function initialize() {
            this.mobileMenuButton = (0, _jquery2.default)('.mobile-menu-button');
            this.mobileMenuButton.on('click', this.toggleMobileMenu.bind(this));
            (0, _jquery2.default)(window).resize(this.closeMobileMenu.bind(this));
        }
    }, {
        key: 'el',
        value: function el() {
            return '.mobile-menu';
        }
    }, {
        key: 'toggleMobileMenu',
        value: function toggleMobileMenu(event) {
            this.$el.toggleClass('open');
        }
    }, {
        key: 'closeMobileMenu',
        value: function closeMobileMenu(event) {
            this.$el.removeClass('open');
        }
    }]);

    return MobileMenuView;
}(_backbone2.default.View);

exports.default = MobileMenuView;