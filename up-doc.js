class UpDoc {
  _sY = 0
  _threshold = 0

  targets = {
    sel: `[data-updoc]`,
    el: null,
  }

  constructor(threshold = 0) {
    // Get DOM elements
    this.targets.el = document.querySelectorAll(this.targets.sel)

    // Set threshold (optional)
    this.threshold = threshold
  }

  set sY(sY = window.scrollY) {
    this._sY = sY
  }

  set threshold(threshold = 0) {
    this._threshold = threshold
  }

  // Up/Down handling
  down = () => {
    this.targets.el.forEach((el) => {
      el.dataset.updoc = 'down'
    })
    this.sY = window.scrollY
  }

  up = () => {
    this.targets.el.forEach((el) => {
      el.dataset.updoc = 'up'
    })
    this.sY = window.scrollY
  }

  // Events
  onScroll = () => {
    if (window.scrollY + this._threshold < this._sY) {
      requestAnimationFrame(this.up)
    } else if (window.scrollY > this._sY + this._threshold) {
      requestAnimationFrame(this.down)
    }
  }

  bindScroll() {
    document.addEventListener('scroll', this.onScroll)
  }

  unbindScroll = () => {
    document.removeEventListener('scroll', this.onScroll)
  }

  // INIT
  init() {
    this.bindScroll()

    return this
  }
}

export const upDoc = new UpDoc().init()
// module.exports = new UpDoc().init()