'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slackEndpoint = 'https://hooks.slack.com/services/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';

exports.default = {
    postMessage: function postMessage() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var attachment = {};
        var body = {
            'channel': '#e-burgerholics-club',
            'username': 'BurgerholicsBot',
            'icon_emoji': ':hamburger:',
            'attachments': [attachment]
        };

        if (options.text) body.text = options.text;

        if (options.title) attachment.title = options.title;

        if (options.title_link) attachment.title_link = options.title_link;

        if (options.content) attachment.text = options.content;

        if (options.image) attachment.image_url = options.image;

        if (options.links) {
            var actions = [];
            attachment.actions = actions;
            options.links.forEach(function (link) {
                actions.push({
                    'type': 'button',
                    'name': link.text,
                    'text': link.text,
                    'url': link.href
                });
            });
        }

        _request2.default.post(slackEndpoint, {
            json: JSON.stringify(body),
            headers: JSON.stringify({ "Content-type": "application/json" })
        });
    }
};