import { HeroSystem6eActorSheet } from '../actor/actor-sheet.js'
import { HeroSystem6eAttackCard } from '../card/attack-card.js'
import { HeroSystem6eCard } from '../card/card.js'

/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class HeroSystem6eItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    super.prepareData()

    // Get the Item's data
    const itemData = this.data
    const actorData = this.actor ? this.actor.data : {}
    const data = itemData.data

    if (itemData.type === 'skill') this._prepareSkillData(actorData, itemData)
  }

  _prepareSkillData(actorData, itemData) {
    const data = itemData.data

    let roll = 6

    switch (data.state) {
      case 'trained':
        let levels = data.levels

        if (!data.characteristic) {
          roll = undefined
        } else if (data.characteristic != 'general') {
          if (actorData) {
            levels += actorData.data.characteristics[data.characteristic].value / 5
          }
        } else {
          roll = 11 + levels
        }
        roll = Math.round(9 + levels)
        break
      case 'proficient':
        roll = 10
        break
      case 'familiar':
        roll = 8
        break
      case 'everyman':
        if (data.ps) {
          roll = 11
        } else {
          roll = 8
        }
        break
      case 'noroll':
        roll = undefined
        break
    }

    data.roll = Math.round(roll)
  }

  /**
   * Display the chat card for an Item as a Chat Message
   * @param {object} options          Options which configure the display of the item chat card
   * @param {string} rollMode         The message visibility mode to apply to the created card
   * @param {boolean} createMessage   Whether to automatically create a ChatMessage entity (if true), or only return
   *                                  the prepared message data (if false)
   */
  async displayCard({ rollMode, createMessage = true } = {}) {
    switch (this.data.type) {
      case 'attack':
        const attackCard = await HeroSystem6eAttackCard.createChatDataFromItem(this)
        ChatMessage.applyRollMode(attackCard, rollMode || game.settings.get('core', 'rollMode'))
        return createMessage ? ChatMessage.create(attackCard) : attackCard
        break
    }
  }
}
