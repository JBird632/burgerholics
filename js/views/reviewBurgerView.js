'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _burgerModel = require('../models/burgerModel');

var _burgerModel2 = _interopRequireDefault(_burgerModel);

var _routes = require('../common/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReviewBurgerView = function (_Backbone$View) {
    _inherits(ReviewBurgerView, _Backbone$View);

    function ReviewBurgerView() {
        _classCallCheck(this, ReviewBurgerView);

        return _possibleConstructorReturn(this, (ReviewBurgerView.__proto__ || Object.getPrototypeOf(ReviewBurgerView)).apply(this, arguments));
    }

    _createClass(ReviewBurgerView, [{
        key: 'initialize',
        value: function initialize() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.burgerName = this.$el.find('.burgerName');
            this.restaurant = this.$el.find('.restaurant');
            this.description = this.$el.find('.description');
            this.location = this.$el.find('.location');
            this.distance = this.$el.find('.distance');
            this.image = this.$el.find('.reviewPhoto');
            this.member = this.$el.find('.member');
            this.rating = this.$el.find('#rating');
            this.comment = this.$el.find('#comment');
            this.ratingValue = this.$el.find('#ratingValue');

            this.model = new _burgerModel2.default({ id: options.id });
            this.model.fetch({ success: this.render.bind(this) });
        }
    }, {
        key: 'events',
        value: function events() {
            return {
                'click .submitRatingButton': this.submitRating,
                'click .cancelRatingButton': this.cancelRating,
                'input #rating': this.updateRatingValue,
                'change #ratingValue': this.updateRating
            };
        }
    }, {
        key: 'el',
        value: function el() {
            return '.review';
        }
    }, {
        key: 'render',
        value: function render() {
            this.burgerName.html(this.model.get('name'));
            this.member.html(this.model.get('member'));
            this.restaurant.html(this.model.get('restaurant') || '<i>n/a</i>');
            this.description.html(this.model.get('description') || '');
            this.location.html(this.model.get('location') || '<i>n/a</i>');
            this.distance.html(this.model.get('distance') || '<i>n/a</i>');

            if (this.model.get('photo')) this.image.attr('src', this.model.get('photo'));else this.image.addClass('hidden');
        }
    }, {
        key: 'submitRating',
        value: function submitRating(event) {
            event.preventDefault();
            this.model.set({
                rating: this.rating.val(),
                comment: this.comment.val()
            });

            this.model.save(null, { success: this.successRating.bind(this) });
        }
    }, {
        key: 'successRating',
        value: function successRating(event) {
            var formData = new FormData();
            var burger = this.model.toJSON();

            for (var key in burger) {
                formData.append(key, burger[key]);
            }_jquery2.default.ajax({
                type: 'POST',
                url: '/burgers/' + this.model.get('id') + '/review',
                data: formData,
                processData: false,
                contentType: false
            }).done(function () {
                window.location.href = _routes2.default.thanksSubmitting;
            });
        }
    }, {
        key: 'cancelRating',
        value: function cancelRating(event) {
            event.preventDefault();
            window.location.href = _routes2.default.home;
        }
    }, {
        key: 'updateRatingValue',
        value: function updateRatingValue(event) {
            this.ratingValue.val(this.rating.val());
        }
    }, {
        key: 'updateRating',
        value: function updateRating(event) {
            this.rating.val(this.ratingValue.val());
        }
    }]);

    return ReviewBurgerView;
}(_backbone2.default.View);

exports.default = ReviewBurgerView;