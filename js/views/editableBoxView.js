'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var markdown = new _markdownIt2.default({ breaks: true });

var EditableBoxView = function (_Backbone$View) {
    _inherits(EditableBoxView, _Backbone$View);

    function EditableBoxView() {
        _classCallCheck(this, EditableBoxView);

        return _possibleConstructorReturn(this, (EditableBoxView.__proto__ || Object.getPrototypeOf(EditableBoxView)).apply(this, arguments));
    }

    _createClass(EditableBoxView, [{
        key: 'initialize',
        value: function initialize() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.parent = (0, _jquery2.default)(options.parent);
            this.content = options.content || '';
            this.tag = options.tag || 'div';
            this.model = options.model;
            this.prepend = options.prepend || false;
            this.render();
        }
    }, {
        key: 'render',
        value: function render() {
            this.$el = this.template();

            if (this.prepend) this.parent.prepend(this.$el);else this.parent.append(this.$el);

            this.$el.find('.editableContent').on('focus', this.editBox.bind(this));
            this.$el.find('.editableContent').on('blur', this.stopEditingBox.bind(this));
            this.$el.find('.editableContent').keydown(this.consumeEnterKey.bind(this));
            this.$el.find('.close-editable-box').on('click', this.deleteEditableBox.bind(this));
        }
    }, {
        key: 'template',
        value: function template() {
            return (0, _jquery2.default)('<' + this.tag + ' class="editableBox">\n            <div class="card card-body bg-light editableContent" contenteditable="true">' + markdown.render(this.content) + '</div>\n            <i class="close-editable-box material-icons" data-toggle="tooltip" data-placement="right" title="Close">close</i>\n        </' + this.tag);
        }
    }, {
        key: 'editBox',
        value: function editBox() {
            this.$el.find('.editableContent')[0].innerText = this.content;
        }
    }, {
        key: 'stopEditingBox',
        value: function stopEditingBox() {
            var _this2 = this;

            var newContent = this.$el.find('.editableContent')[0].innerText;

            if (newContent != this.content) {
                this.model.set('content', newContent);
                this.model.save(null, {
                    success: function success(model, response) {
                        _this2.model.set('id', response.id);
                    }
                });
            }

            this.content = newContent;
            this.$el.find('.editableContent').html(markdown.render(this.content));
        }
    }, {
        key: 'consumeEnterKey',
        value: function consumeEnterKey(event) {
            if (event.keyCode === 13) {
                document.execCommand('insertHTML', false, '<br><br>');
                return false;
            }
        }
    }, {
        key: 'deleteEditableBox',
        value: function deleteEditableBox() {
            this.model.destroy({ success: this.$el.remove() });
        }
    }]);

    return EditableBoxView;
}(_backbone2.default.View);

exports.default = EditableBoxView;