import React from 'react';
import {connect} from 'react-redux';

import {ReactComponent as ShopBag} from '../../assets/shopping-bag.svg';

import {addItem} from '../../redux/testing/testing.action';

import './test.styles.scss';

const TestPage = ({addItem, items}) => {
  console.log(items)
  return ( 
      <div className='test-page' onClick={addItem}>
        <ShopBag className='shop-bag'/>
        <span className='item-count'>{items}</span>
      </div>
    );
}

const mapStateToProps = state => ({
  items: state.test.items
})

const mapDispatchToProps = dispatch => ({
  addItem: () => dispatch(addItem())
})

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);