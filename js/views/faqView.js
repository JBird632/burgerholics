'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

var _editableBoxView = require('./editableBoxView');

var _editableBoxView2 = _interopRequireDefault(_editableBoxView);

var _faqCollection = require('../collections/faqCollection');

var _faqCollection2 = _interopRequireDefault(_faqCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FAQView = function (_Backbone$View) {
    _inherits(FAQView, _Backbone$View);

    function FAQView() {
        _classCallCheck(this, FAQView);

        return _possibleConstructorReturn(this, (FAQView.__proto__ || Object.getPrototypeOf(FAQView)).apply(this, arguments));
    }

    _createClass(FAQView, [{
        key: 'initialize',
        value: function initialize() {
            this.faqs = new _faqCollection2.default();
            this.faqs.fetch({ success: this.render.bind(this) });
        }
    }, {
        key: 'el',
        value: function el() {
            return 'body';
        }
    }, {
        key: 'events',
        value: function events() {
            return {
                'click .addFAQ': this.addFAQ
            };
        }
    }, {
        key: 'render',
        value: function render() {
            this.faqs.forEach(function (model) {
                new _editableBoxView2.default({ parent: '.faqList', tag: 'li', model: model, content: model.get('content'), prepend: true });
            });
        }
    }, {
        key: 'addFAQ',
        value: function addFAQ(event) {
            new _editableBoxView2.default({ parent: '.faqList', tag: 'li', model: this.faqs.model(), prepend: true });
        }
    }]);

    return FAQView;
}(_backbone2.default.View);

exports.default = FAQView;