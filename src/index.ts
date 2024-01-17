import { Readable, pipeline } from 'node:stream'

import winston from 'winston'

import characterGenerator from './lib/characterGenerator.js'
import CharacterFilter from './lib/characterFilter.js'
import MessageFormatter from './lib/messageFormatter.js'

const logger: winston.Logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({}),
    new winston.transports.File({
      filename: 'combined.log',
    }),
  ],
})

const readableCharacterGenerator: Readable = Readable.from(characterGenerator())

const characterFilter: CharacterFilter = new CharacterFilter()

const messageFormatter: MessageFormatter = new MessageFormatter()

pipeline(
  readableCharacterGenerator,
  characterFilter,
  messageFormatter,
  logger,
  (error: Error):void => {
    if(error) {
      console.error(error.message)
      process.exit(1)
    }
  }
)
