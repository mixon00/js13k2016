var E = function () {
    this.init()
}

E.prototype = {
    init: function () {
        this.time = Date.now()
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.width = 800
        this.height = 480
        requestAnimFrame(this.loop.bind(this))
    },
    step: function (dt) {
    },
    render: function (dt) {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },
    loop: function () {
        var timeNow = Date.now()
        this.dt = (timeNow - this.time) / 1000
        this.time = timeNow
        this.step(this.dt)
        this.render(this.dt)
        requestAnimFrame(this.loop.bind(this))
    }
}

var r = function (a, b, c) {
    b = document, c = 'addEventListener'
    b[c] ? b[c]('DOMContentLoaded', a) : window.attachEvent('onload', a)
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60)
    }
})()

r (function () {
    new E()
})
