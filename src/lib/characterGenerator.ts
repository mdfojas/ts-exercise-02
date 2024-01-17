import fetch, { Response } from 'node-fetch'

import { Character, ApiResponse } from './interfaces.js'

export default async function* characterGenerator(url: string | null = 'https://swapi.dev/api/people/'): AsyncGenerator<Character, void, undefined> {
  const response: Response = await fetch(url)

  const data = await response.json() as ApiResponse

  for (const result of data.results) {
    yield result
  }

  if (data.next) {
    yield* characterGenerator(data.next)
  }
}
