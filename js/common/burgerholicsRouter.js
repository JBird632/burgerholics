'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

var _sideBarView = require('../views/sideBarView');

var _sideBarView2 = _interopRequireDefault(_sideBarView);

var _hungryElephantView = require('../views/hungryElephantView');

var _hungryElephantView2 = _interopRequireDefault(_hungryElephantView);

var _elephantGourmetView = require('../views/elephantGourmetView');

var _elephantGourmetView2 = _interopRequireDefault(_elephantGourmetView);

var _farAwayElephantView = require('../views/farAwayElephantView');

var _farAwayElephantView2 = _interopRequireDefault(_farAwayElephantView);

var _reviewBurgerView = require('../views/reviewBurgerView');

var _reviewBurgerView2 = _interopRequireDefault(_reviewBurgerView);

var _viewBurgerView = require('../views/viewBurgerView');

var _viewBurgerView2 = _interopRequireDefault(_viewBurgerView);

var _faqView = require('../views/faqView');

var _faqView2 = _interopRequireDefault(_faqView);

var _homeView = require('../views/homeView');

var _homeView2 = _interopRequireDefault(_homeView);

var _submitBurgerView = require('../views/submitBurgerView');

var _submitBurgerView2 = _interopRequireDefault(_submitBurgerView);

var _reportsView = require('../views/reportsView');

var _reportsView2 = _interopRequireDefault(_reportsView);

var _reviewsView = require('../views/reviewsView');

var _reviewsView2 = _interopRequireDefault(_reviewsView);

var _mobileMenuView = require('../views/mobileMenuView');

var _mobileMenuView2 = _interopRequireDefault(_mobileMenuView);

var _thanksView = require('../views/thanksView');

var _thanksView2 = _interopRequireDefault(_thanksView);

var _backgroundView = require('../views/backgroundView');

var _backgroundView2 = _interopRequireDefault(_backgroundView);

var _clickableImageView = require('../views/clickableImageView');

var _clickableImageView2 = _interopRequireDefault(_clickableImageView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BurgerholicsRouter = function (_Backbone$Router) {
    _inherits(BurgerholicsRouter, _Backbone$Router);

    function BurgerholicsRouter() {
        _classCallCheck(this, BurgerholicsRouter);

        return _possibleConstructorReturn(this, (BurgerholicsRouter.__proto__ || Object.getPrototypeOf(BurgerholicsRouter)).apply(this, arguments));
    }

    _createClass(BurgerholicsRouter, [{
        key: 'initialize',
        value: function initialize() {
            this.sideBar();
            this.mobileMenu();
            this.background();
            this.clickableImages();
        }
    }, {
        key: 'routes',
        value: function routes() {
            return {
                'hungry-elephant': this.hungryElephant,
                'elephant-gourmet': this.elephantGourmet,
                'far-away-elephant': this.farAwayElephant,
                'review-burger/:id': this.reviewBurger,
                'view-burger/:id': this.viewBurger,
                'submit-burger': this.submitBurger,
                'reports': this.reports,
                'reviews': this.reviews,
                'statistics': this.reports,
                'faq': this.faq,
                'thanks-submitting': this.thanksSubmitting,
                'thanks-reviewing': this.thanksReviewing,
                '': this.home
            };
        }
    }, {
        key: 'home',
        value: function home() {
            if (!this.homeView) this.homeView = new _homeView2.default();
        }
    }, {
        key: 'hungryElephant',
        value: function hungryElephant() {
            if (!this.hungryElephantView) this.hungryElephantView = new _hungryElephantView2.default();
        }
    }, {
        key: 'elephantGourmet',
        value: function elephantGourmet() {
            this.backgroundView.setHeadingSize('30px');

            if (!this.elephantGourmetView) this.elephantGourmetView = new _elephantGourmetView2.default();
        }
    }, {
        key: 'farAwayElephant',
        value: function farAwayElephant() {
            this.backgroundView.setHeadingSize('30px');

            if (!this.farAwayElephantView) this.farAwayElephantView = new _farAwayElephantView2.default();
        }
    }, {
        key: 'reviewBurger',
        value: function reviewBurger(id) {
            if (!this.reviewBurgerView) this.reviewBurgerView = new _reviewBurgerView2.default({ id: id });
        }
    }, {
        key: 'viewBurger',
        value: function viewBurger(id) {
            if (!this.viewBurgerView) this.viewBurgerView = new _viewBurgerView2.default({ id: id });
        }
    }, {
        key: 'submitBurger',
        value: function submitBurger() {
            if (!this.submitBurgerView) this.submitBurgerView = new _submitBurgerView2.default();
        }
    }, {
        key: 'reports',
        value: function reports() {
            if (!this.reportsView) this.reportsView = new _reportsView2.default();
        }
    }, {
        key: 'reviews',
        value: function reviews() {
            if (!this.reviewsView) this.reviewsView = new _reviewsView2.default();
        }
    }, {
        key: 'faq',
        value: function faq() {
            if (!this.faqView) this.faqView = new _faqView2.default();
        }
    }, {
        key: 'sideBar',
        value: function sideBar() {
            if (!this.sideBarView) this.sideBarView = new _sideBarView2.default();
        }
    }, {
        key: 'thanksSubmitting',
        value: function thanksSubmitting() {
            this.backgroundView.setBackground('spiral-background.jpg');
            this.backgroundView.setHeadingSize('28px');

            if (!this.thanksView) this.thanksView = new _thanksView2.default({ type: 'submitting' });
        }
    }, {
        key: 'thanksReviewing',
        value: function thanksReviewing() {
            this.backgroundView.setBackground('spiral-background.jpg');
            this.backgroundView.setHeadingSize('28px');

            if (!this.thanksView) this.thanksView = new _thanksView2.default({ type: 'reviewing' });
        }
    }, {
        key: 'mobileMenu',
        value: function mobileMenu() {
            if (!this.mobileMenuView) this.mobileMenuView = new _mobileMenuView2.default();
        }
    }, {
        key: 'background',
        value: function background() {
            if (!this.backgroundView) this.backgroundView = new _backgroundView2.default();
        }
    }, {
        key: 'clickableImages',
        value: function clickableImages() {
            if (!this.clickableImagesView) this.clickableImagesView = new _clickableImageView2.default();
        }
    }]);

    return BurgerholicsRouter;
}(_backbone2.default.Router);

exports.default = BurgerholicsRouter;