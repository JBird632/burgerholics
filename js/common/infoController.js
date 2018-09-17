'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfoController = function (_Controller) {
    _inherits(InfoController, _Controller);

    function InfoController() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, InfoController);

        var _this = _possibleConstructorReturn(this, (InfoController.__proto__ || Object.getPrototypeOf(InfoController)).call(this, options));

        _this.registerPost('/info', { callback: _this.addInfo.bind(_this) });
        _this.registerDelete('/info/:id', { callback: _this.deleteInfo.bind(_this) });
        _this.registerGet('/info', { callback: _this.getInfo.bind(_this) });
        return _this;
    }

    _createClass(InfoController, [{
        key: 'addInfo',
        value: function addInfo(request, response) {
            var model = request.body;
            this.database.ref('info').push(model).then(function () {
                response.statusCode = 201;
                response.json(model);
            });
        }
    }, {
        key: 'deleteInfo',
        value: function deleteInfo(request, response) {
            this.database.ref('info/' + request.params.id).remove().then(function () {
                response.statusCode = 202;
                response.send();
            });
        }
    }, {
        key: 'getInfo',
        value: function getInfo(request, response) {
            var info = [];
            this.database.ref('info').on('value', function (snapshot) {
                info = snapshot.val();
                response.statusCode = 200;
                response.json(info);
            });
        }
    }]);

    return InfoController;
}(_controller2.default);

exports.default = InfoController;