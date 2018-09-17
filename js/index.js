'use strict';

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _burgerholicsRouter = require('./common/burgerholicsRouter');

var _burgerholicsRouter2 = _interopRequireDefault(_burgerholicsRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function preventParentScroll(event) {
    if (!(0, _jquery2.default)(event.target).parents('.scrollable')[0]) event.preventDefault();
}

(0, _jquery2.default)(document).ready(function () {
    //document.addEventListener('touchmove', preventParentScroll, {passive: false});

    var router = new _burgerholicsRouter2.default();
    _backbone2.default.history.start({ pushState: true });
});