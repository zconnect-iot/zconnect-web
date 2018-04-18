import { Map } from 'immutable'

/*
  Default storeMethod for use in endpoint config that will merge the data into
  the store in the format expected by the AsyncList selectors

  This allows the Griddle to take the lastResponse as it's data to display but
  also caches the results by id for easier grabbing by other comonents.
  It assumes the results will always have an id field

  The resulting format is:
  {
    1: { id: 1, name: 'Item1' },
    2: { id: 2, name: 'Item2' },
    lastResponse: {
      count: 2,
      results: [
        { id: 1, name: 'Item1' },
        { id: 2, name: 'Item2' }
      ]
    }
  }
*/
export const storeMethod = (last = Map(), next) => {
  const resultsAsMap = next
    .get('results')
    .reduce((res, item) => res.set(item.get('id'), item), Map())
  return last
    .merge(resultsAsMap)
    .set('lastResponse', next)
}
