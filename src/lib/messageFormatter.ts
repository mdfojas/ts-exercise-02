import { Transform, TransformCallback } from 'stream'

import { Character, TransformedMessage } from './interfaces.js'

export default class MessageFormatter extends Transform {
  constructor(options?: object) {
    super({ ...options, objectMode: true })
  }

  _transform(character: Character, encoding: BufferEncoding, callback: TransformCallback) {
    this.push({
      level: 'info',
      message: character.name,
    } as TransformedMessage)
    callback()
  }
}
