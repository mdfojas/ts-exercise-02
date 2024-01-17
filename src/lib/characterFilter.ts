import { Transform, TransformCallback } from 'node:stream'

import { Character } from './interfaces.js'

export default class CharacterFilter extends Transform {
  constructor(options?: object) {
    super({ ...options, objectMode: true })
  }

  _transform(character: Character, encoding: BufferEncoding, callback: TransformCallback) {
    if (character.gender.toLowerCase() === 'female') {
      this.push(character)
    }
    callback()
  }
}
