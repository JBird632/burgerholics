'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _routes = require('../common/routes');

var _routes2 = _interopRequireDefault(_routes);

var _alertView = require('./alertView');

var _alertView2 = _interopRequireDefault(_alertView);

var _exifJs = require('exif-js');

var _exifJs2 = _interopRequireDefault(_exifJs);

var _burgerModel = require('../models/burgerModel');

var _burgerModel2 = _interopRequireDefault(_burgerModel);

var _placeCollection = require('../collections/placeCollection');

var _placeCollection2 = _interopRequireDefault(_placeCollection);

var _slackApi = require('../utility/slackApi');

var _slackApi2 = _interopRequireDefault(_slackApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubmitBurgerView = function (_Backbone$View) {
    _inherits(SubmitBurgerView, _Backbone$View);

    function SubmitBurgerView() {
        _classCallCheck(this, SubmitBurgerView);

        return _possibleConstructorReturn(this, (SubmitBurgerView.__proto__ || Object.getPrototypeOf(SubmitBurgerView)).apply(this, arguments));
    }

    _createClass(SubmitBurgerView, [{
        key: 'initialize',
        value: function initialize() {
            this.name = this.$el.find('#burgerName');
            this.restaurant = this.$el.find('#restaurant');
            this.description = this.$el.find('#description');
            this.location = this.$el.find('#location');
            this.member = this.$el.find('#member');
            this.file = this.$el.find('#photo');
            this.fileButton = this.$el.find('.photoUpload');
            this.file.change(this.updateFile.bind(this));
            this.date = this.$el.find('#date');
            this.country = this.$el.find('#country');
            this.photoIcon = this.$el.find('.photo-icon');
            this.photoToggleSection = this.$el.find('.photo-toggle-content');
            this.noPhotoToggle = this.$el.find('.no-photo-toggle');
            this.placeList = this.$el.find('#restaurant-list');
            this.photoOptions = this.$el.find('.photo-options');
            this.photoDisplay = this.$el.find('.photo-display');
            this.photoDisplayGroup = this.$el.find('.photo-display-group');
            this.addressLabel = this.$el.find('.address-label');

            var now = new Date();
            var day = ('0' + now.getDate()).slice(-2);
            var month = ('0' + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear() + '-' + month + '-' + day;
            this.date.val(today);

            this.places = new _placeCollection2.default();
            this.places.fetch({ success: this.render.bind(this) });
        }
    }, {
        key: 'events',
        value: function events() {
            return {
                'click .submitBurgerButton': this.submitBurger,
                'click .cancelBurgerButton': this.cancelBurger,
                'click #photoToggle': this.updatePhotoToggle,
                'click .cancelPhoto': this.cancelPhoto,
                'change #photo': this.updateFileName
            };
        }
    }, {
        key: 'el',
        value: function el() {
            return '.submitBurgerForm';
        }
    }, {
        key: 'render',
        value: function render() {
            var placesSelect = this.placeList.find('select');
            this.places.forEach(function (model) {
                placesSelect.append((0, _jquery2.default)('<option value=\'' + model.get('place') + '\'>' + model.get('place') + '</option>'));
            });
        }
    }, {
        key: 'submitBurger',
        value: function submitBurger(event) {
            event.preventDefault();

            if (!this.isFormValid()) return;

            var formData = new FormData();
            formData.append('name', this.name.val());
            formData.append('description', this.description.val());
            formData.append('restaurant', this.restaurant.val());
            formData.append('member', this.member.val());
            formData.append('country', this.country.val());
            formData.append('location', this.location.val());
            formData.append('photo', this.file[0].files[0]);
            formData.append('date', this.date.val());
            (0, _jquery2.default)('.loading').removeClass('hidden');

            _jquery2.default.ajax({
                url: this.$el.closest('form').attr('action'),
                type: 'POST',
                data: formData,
                success: this.burgerSuccess.bind(this),
                error: this.burgerError.bind(this),
                cache: false,
                contentType: false,
                processData: false
            });
        }
    }, {
        key: 'isFormValid',
        value: function isFormValid() {
            if (!this.member.val()) {
                new _alertView2.default({ text: 'Please select a member', type: 'danger' });
                return false;
            }

            if (!this.name.val()) {
                new _alertView2.default({ text: 'Please provide a burger name', type: 'danger' });
                return false;
            }

            if (!this.file.val() && !this.$el.find('#photoToggle')[0].checked) {
                new _alertView2.default({ text: 'Please provide a photo or select No Photo', type: 'danger' });
                return false;
            }

            if (!this.location.val()) {
                new _alertView2.default({ text: 'Please provide an address', type: 'danger' });
                return false;
            }

            if (!this.restaurant.val()) {
                new _alertView2.default({ text: 'Please provide the place you ate', type: 'danger' });
                return false;
            }

            return true;
        }
    }, {
        key: 'cancelBurger',
        value: function cancelBurger(event) {
            event.preventDefault();
            window.location.href = _routes2.default.home;
        }
    }, {
        key: 'updateFile',
        value: function updateFile(event) {
            if (!this.file[0].files[0]) return;

            var imageFile = this.file[0].files[0];
            this.photoOptions.addClass('hidden');
            this.noPhotoToggle.addClass('hidden');
            this.$el.find('.photo-toggle-date').removeClass('hidden');
            this.$el.find('.photo-toggle-address').removeClass('hidden');
            this.photoDisplayGroup.removeClass('hidden');
            this.updateDisplayImage(imageFile);

            var _this = this;
            _exifJs2.default.getData(imageFile, function () {
                var latRef = _exifJs2.default.getTag(this, 'GPSLatitudeRef');
                var lat = _exifJs2.default.getTag(this, 'GPSLatitude');
                var longRef = _exifJs2.default.getTag(this, 'GPSLongitudeRef');
                var long = _exifJs2.default.getTag(this, 'GPSLongitude');
                var date = _exifJs2.default.getTag(this, 'DateTime');

                if (date) _this.date.val(date.split(' ')[0].replace(/:/g, '-'));else {
                    var _date = imageFile.lastModifiedDate;
                    var day = ('0' + _date.getDate()).slice(-2);
                    var month = ('0' + (_date.getMonth() + 1)).slice(-2);
                    var stringDate = _date.getFullYear() + '-' + month + '-' + day;
                    _this.date.val(stringDate);
                }

                _this.date.addClass('autoFill');

                if (lat && long) {
                    _this.location.val((latRef == 'S' ? '-' + _this.convertGeolocation(lat) : _this.convertGeolocation(lat)) + ' ' + (longRef == 'W' ? '-' + _this.convertGeolocation(long) : _this.convertGeolocation(long)));
                    _this.location.addClass('autoFill');
                    _this.addressLabel.html('Geo Coordinates');
                    _this.addressLabel.prop('disabled', true);
                    _this.$el.find('.photo-toggle-country').addClass('hidden');
                } else {
                    new _alertView2.default({ text: 'No Geolocation in photo, enter address', type: 'info' });
                    _this.addressLabel.html('Address');
                    _this.addressLabel.prop('disabled', false);
                    _this.$el.find('.photo-toggle-country').removeClass('hidden');
                }
            });
        }
    }, {
        key: 'updateDisplayImage',
        value: function updateDisplayImage(file) {
            var _this3 = this;

            var fileReader = new FileReader();

            fileReader.onload = function (event) {
                _this3.photoDisplay.attr('src', event.target.result);
            };

            fileReader.readAsDataURL(file);
        }
    }, {
        key: 'updatePhotoToggle',
        value: function updatePhotoToggle() {
            this.photoToggleSection.toggleClass('hidden');
            this.fileButton.toggleClass('hidden');
            var toggle = this.$el.find('.photoToggleIcon');
            toggle.toggleClass('hidden');
        }
    }, {
        key: 'cancelPhoto',
        value: function cancelPhoto(event) {
            this.file.val('');
            this.photoOptions.removeClass('hidden');
            this.noPhotoToggle.removeClass('hidden');
            this.$el.find('.photo-toggle-date').addClass('hidden');
            this.$el.find('.photo-toggle-country').addClass('hidden');
            this.$el.find('.photo-toggle-address').addClass('hidden');
            this.photoDisplayGroup.addClass('hidden');
            this.photoDisplay.attr('src', '');
        }
    }, {
        key: 'convertGeolocation',
        value: function convertGeolocation(number) {
            return number[0].numerator + number[1].numerator / (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
        }
    }, {
        key: 'burgerSuccess',
        value: function burgerSuccess(jqXHR) {
            var _this4 = this;

            new _burgerModel2.default(jqXHR).save(null, {
                success: function success(response) {
                    // SlackApi.postMessage({
                    //     title: response.get('name'),
                    //     image: response.get('photo'),
                    //     text: response.get('member')
                    // });

                    window.location.href = _routes2.default.thanksSubmitting;
                },
                error: function error(jqXHR) {
                    _this4.burgerError(jqXHR).bind(_this4);
                }
            });
        }
    }, {
        key: 'burgerError',
        value: function burgerError(jqXHR) {
            (0, _jquery2.default)('.loading').addClass('hidden');
            new _alertView2.default({ text: jqXHR.responseText ? jqXHR.responseText : 'Error Submitting Burger', type: 'danger' });
        }
    }]);

    return SubmitBurgerView;
}(_backbone2.default.View);

exports.default = SubmitBurgerView;