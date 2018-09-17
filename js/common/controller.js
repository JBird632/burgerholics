'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Controller);

        this.app = options.app;
        this.config = options.config;
        this.database = options.database;
        this.upload = (0, _multer2.default)({
            dest: _path2.default.join(__dirname, '../../files'),
            storage: _multer2.default.diskStorage({
                destination: function destination(request, file, callback) {
                    callback(null, _path2.default.join(__dirname, '../../files'));
                },
                filename: function filename(request, file, callback) {
                    callback(null, file.originalname);
                }
            })
        });
    }

    _createClass(Controller, [{
        key: 'registerGet',
        value: function registerGet(url, options) {
            var _this = this;

            if (options.template) this.app.get(url, function (request, response) {
                return response.render(options.template, { title: options.title, config: _this.config, params: options.params });
            });

            if (options.callback) this.app.get(url, function (request, response) {
                return options.callback(request, response);
            });
        }
    }, {
        key: 'registerPost',
        value: function registerPost(url, options) {
            if (options.callback) this.app.post(url, this.upload.single('photo'), function (request, response) {
                return options.callback(request, response);
            });
        }
    }, {
        key: 'registerPut',
        value: function registerPut(url, options) {
            if (options.callback) this.app.put(url, function (request, response) {
                return options.callback(request, response);
            });
        }
    }, {
        key: 'registerDelete',
        value: function registerDelete(url, options) {
            if (options.callback) this.app.delete(url, function (request, response) {
                return options.callback(request, response);
            });
        }
    }]);

    return Controller;
}();

exports.default = Controller;