import React, { Component } from 'react';
import './Product.scss';
import product1 from '../../assets/product1.png';
import product2 from '../../assets/product2.png';
import product3 from '../../assets/product3.png';
import product4 from '../../assets/product4.png';
import product5 from '../../assets/product5.png';

class Product extends Component {
  constructor(props) {
    super(props);

    this.imageList = [product1,product2,product3,product4,product5]; // массив изображений товаров

    for(let i=0; i<this.imageList.length; i++) { // определяем необходимое изображение
      if(this.props.img === i) {
        this.image = this.imageList[i];
        break;
      }
    }
  }

  render() {
    return (
      <div className="Product">
        <div className="Product__image">
          <img src={this.image} alt=""/>
        </div>
        <div className="Product__info">
          <div className="Product__name">{this.props.name}</div>
          <div className="Product__description">{this.props.description}</div>
        </div>
        <div className="Product__buy">
          <div className="Product__price">{this.props.price} руб.</div>
          <button className="Product__buyButton" 
            onClick={() => {this.props.toOrder(this.props.img ,this.props.name, this.props.price)}}>
            В корзину!
          </button>
        </div>
      </div>
    );
  }
}

export default Product;