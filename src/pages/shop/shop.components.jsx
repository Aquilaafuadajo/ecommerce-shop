import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CollectionsOverviewContainer from '../../components/collection-overview/collections-overview.container';
import CollectionPageContainer from '../../pages/collection/collection.container';

import {fetchCollectionStart} from '../../redux/shop/shop.actions';


const ShopPage = ({fetchCollectionStart, match}) => {

  useEffect(() => {
    fetchCollectionStart();
  }, [fetchCollectionStart])
    
  return(
    <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
    </div>
  )
};

const mapDispatchToprops = dispatch => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart())
})


export default connect(null, mapDispatchToprops)(ShopPage);

