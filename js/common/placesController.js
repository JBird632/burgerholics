'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlacesController = function (_Controller) {
    _inherits(PlacesController, _Controller);

    function PlacesController() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, PlacesController);

        var _this = _possibleConstructorReturn(this, (PlacesController.__proto__ || Object.getPrototypeOf(PlacesController)).call(this, options));

        _this.registerPost('/places', { callback: _this.addPlace.bind(_this) });
        _this.registerGet('/places', { callback: _this.getPlaces.bind(_this) });
        return _this;
    }

    _createClass(PlacesController, [{
        key: 'addPlace',
        value: function addPlace(request, response) {
            var model = { place: request.body.place };
            this.database.ref('places').push(model).then(function () {
                response.statusCode = 201;
                response.send();
            });
        }
    }, {
        key: 'getPlaces',
        value: function getPlaces(request, response) {
            var places = [];
            this.database.ref('places').on('value', function (snapshot) {
                places = snapshot.val();
                response.statusCode = 200;
                response.json(places);
            });
        }
    }]);

    return PlacesController;
}(_controller2.default);

exports.default = PlacesController;