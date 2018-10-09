import React, { Component } from 'react';
import './ProductInBasket.scss';

class ProductInBasket extends Component {
  render() {
    return(
      <div className="ProductInBasket">
        <button className="ProductInBasket__close" onClick={() => {this.props.fromOrder(this.props.id)}}></button>
        <div className="ProductInBasket__name">{this.props.name}</div>
        <div className="ProductInBasket__price">{this.props.price} руб.</div>
      </div>
    )
  }
}

export default ProductInBasket;