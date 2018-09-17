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

var FirebaseCollection = function (_Backbone$Collection) {
    _inherits(FirebaseCollection, _Backbone$Collection);

    function FirebaseCollection() {
        _classCallCheck(this, FirebaseCollection);

        return _possibleConstructorReturn(this, (FirebaseCollection.__proto__ || Object.getPrototypeOf(FirebaseCollection)).apply(this, arguments));
    }

    _createClass(FirebaseCollection, [{
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
    }, {
        key: 'parse',
        value: function parse(data) {
            return Object.keys(data).filter(function (key) {
                return data[key] != undefined && data[key] != null;
            }).map(function (key) {
                var dataPoint = data[key];
                dataPoint.id = key;
                return dataPoint;
            });
        }
    }]);

    return FirebaseCollection;
}(_backbone2.default.Collection);

exports.default = FirebaseCollection;