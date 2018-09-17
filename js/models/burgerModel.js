'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firebaseModel = require('./firebaseModel');

var _firebaseModel2 = _interopRequireDefault(_firebaseModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BurgerModel = function (_FirebaseModel) {
    _inherits(BurgerModel, _FirebaseModel);

    function BurgerModel() {
        _classCallCheck(this, BurgerModel);

        return _possibleConstructorReturn(this, (BurgerModel.__proto__ || Object.getPrototypeOf(BurgerModel)).apply(this, arguments));
    }

    _createClass(BurgerModel, [{
        key: 'initialize',
        value: function initialize() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.id = options.id;
            this.name = options.name;
            this.description = options.description;
            this.restaurant = options.restaurant;
            this.location = options.location;
            this.member = options.member;
            this.date = options.date;
            this.country = options.country;
            this.distance = options.distance;
            this.coordinates = options.coordinates;
            this.rating = options.rating;
        }
    }, {
        key: 'url',
        value: function url() {
            return this.endpoint('burgers');
        }
    }]);

    return BurgerModel;
}(_firebaseModel2.default);

exports.default = BurgerModel;