import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import {selectCollectionsLoaded} from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

const mapStateToprops = createStructuredSelector({
  isLoaded: state => !selectCollectionsLoaded(state)
});

const CollectionPageContainer = compose(
  connect(mapStateToprops),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;
