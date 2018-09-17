'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FirebaseModel = function (_Backbone$Model) {
    _inherits(FirebaseModel, _Backbone$Model);

    function FirebaseModel() {
        _classCallCheck(this, FirebaseModel);

        return _possibleConstructorReturn(this, (FirebaseModel.__proto__ || Object.getPrototypeOf(FirebaseModel)).apply(this, arguments));
    }

    _createClass(FirebaseModel, [{
        key: 'endpoint',
        value: function endpoint(ref) {
            return 'https://burgerholics-29de2.firebaseio.com/' + ref + (this.get('id') ? '/' + this.get('id') : '') + '.json';
        }
    }, {
        key: 'sync',
        value: function sync(method, model) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            options.headers = options.headers || {};
            _underscore2.default.extend(options.headers, {
                'Authorization': 'Header AIzaSyA6Oo6mFp5n4RG_4Wt-lhsqL9MuPE63OeA'
            });

            _backbone2.default.sync.call(model, method, model, options);
        }
    }]);

    return FirebaseModel;
}(_backbone2.default.Model);

exports.default = FirebaseModel;