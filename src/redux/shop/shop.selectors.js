import {createSelector} from 'reselect';


const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

//converting our collections object back to an array

export const selectCollectionForPreview = createSelector(
  [selectCollections],
  collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

//CHANGING TO DATA NORMALIZATION
export const selectCollection = collectionUrlParam => createSelector(
  [selectCollections],
  collections => collections ? collections[collectionUrlParam] : null
)

export const selectIsCollectionsFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
)

export const selectCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
)