import {createSelector} from 'reselect';

// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5 
// }

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

//converting our collections object back to an array

export const selectCollectionForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
)

// export const selectCollection = collectionUrlParam => createSelector(
//   [selectCollections],
//   collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
// )

//CHANGING TO DATA NORMALIZATION
export const selectCollection = collectionUrlParam => createSelector(
  [selectCollections],
  collections => collections[collectionUrlParam]
)