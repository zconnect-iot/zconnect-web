export const camelCaseRegex = /([a-z])([A-Z])/g
export const camelCaseSplit = (match, a, b) => `${a} ${b.toLowerCase()}`
export const camelToTitleCase = s =>
  `${s[0].toUpperCase()}${s.slice(1).replace(camelCaseRegex, camelCaseSplit)}`

