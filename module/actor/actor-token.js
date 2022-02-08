export class HeroSystem6eTokenDocument extends TokenDocument {}

export class HeroSystem6eToken extends Token {
  /**
   * Draw a single resource bar, given the `data`.
   *
   * @param {Number} number The value represented by the bar
   * @param {PIXI.Graphics} bar The bar graphics element
   * @param {Object} data Resource data for this bar
   * @returns Bar that is drawn to represent a resource
   */
  _drawBar(number, bar, data) {
    let drawBar = super._drawBar(number, bar, data)

    let h = Math.max(canvas.dimensions.size / 12, 8)

    if (this.data.height >= 2) {
      // Enlarge the bar for large tokens
      h *= 1.6
    }

    let posY = this.h - h * (number + 1)
    bar.position.set(0, posY)

    return drawBar
  }
}
