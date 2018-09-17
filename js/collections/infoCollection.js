'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firebaseCollection = require('./firebaseCollection');

var _firebaseCollection2 = _interopRequireDefault(_firebaseCollection);

var _infoModel = require('../models/infoModel');

var _infoModel2 = _interopRequireDefault(_infoModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfoCollection = function (_FirebaseCollection) {
    _inherits(InfoCollection, _FirebaseCollection);

    function InfoCollection() {
        _classCallCheck(this, InfoCollection);

        return _possibleConstructorReturn(this, (InfoCollection.__proto__ || Object.getPrototypeOf(InfoCollection)).apply(this, arguments));
    }

    _createClass(InfoCollection, [{
        key: 'model',
        value: function model(options) {
            return new _infoModel2.default(options);
        }
    }, {
        key: 'url',
        value: function url() {
            return this.endpoint('info');
        }
    }]);

    return InfoCollection;
}(_firebaseCollection2.default);

exports.default = InfoCollection;