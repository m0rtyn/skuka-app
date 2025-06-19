import { ADJECTIVES, NOUNS } from "./leaderboard.constants"

function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0 // Convert to 32bit integer
  }
  return Math.abs(hash)
}

export function getUserNicknameFromId(id: string) {
  if (!id) return null

  const hash = simpleHash(id)
  const adjIndex = hash % ADJECTIVES.length
  // Ensure noun index is different from adj index if possible, or just use a different seed
  const nounIndex = (hash + Math.floor(hash / ADJECTIVES.length)) % NOUNS.length

  const adjective = ADJECTIVES[adjIndex]
  const noun = NOUNS[nounIndex]

  // Capitalize first letter of each
  const capitalizedAdj = adjective.charAt(0).toUpperCase() + adjective.slice(1)
  const capitalizedNoun = noun.charAt(0).toUpperCase() + noun.slice(1)

  return capitalizedAdj + capitalizedNoun
}
