var store = require('store.js');

'use strict'

var CountDown = function (options) {
	this.options = this.getOptions(options);
}

CountDown.OPTIONS = {
	primaryKey: '', // 默认为当前 location.pathname
    callback: $.noop, // 倒计时完毕触发的回调
    tickCallback: $.noop, // 每秒触发的回调
    second: 60 // 倒计时秒数，默认为60秒
};

CountDown.prototype.getDefaults = function () {
	return CountDown.DEFAULTS
}

Tooltip.prototype.getOptions = function (options) {
	options = $.extend({}, this.getDefaults(), options)

	return options
}
/**
 * 初始化倒计时
 */
CountDown.prototype.init = function () {
    var self = this;
    var primaryKey = this.options.primaryKey;
    if (self.options.pathname === '' || !self.options.pathname) {
        self.options.pathname = location.pathname;
    }

    // 尝试获取localStorage是否有为倒计时完毕的秒数
    self.second = store.get('primaryKey') || self.options.second;
};

CountDown.prototype.start = function () {
	var self = this;
    var primaryKey = this.options.primaryKey;
    var callback = this.options.callback;
    var tickCallback = this.options.tickCallback;

    // 使用setInterval执行倒计时
    self.timer = window.setInterval(function () {
        self.second--;
        if (self.second <= 0) {
            self.clear();
            // 倒计时完成，执行callback回调
            callback && callback.call(self);
        } else {
            store.set(primaryKey, self.second);
            // 读秒是，执行tickCallback回调
            tickCallback && tickCallback.call(self, self.second);
        }
    }, 1000);
};

/**
 * Has countdown finished?
 */
CountDown.prototype.hasDone = function () {
    return this.second === 0;
};

/**
 * clear timer and localStorage record
 */
CountDown.prototype.clear = function () {
    var self = this;
    var primaryKey = this.options.primaryKey;

    if (self.timer) {
        window.clearInterval(self.timer);
        store.remove(primaryKey);
    }
};

modules.export = CountDown;