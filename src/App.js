import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Product from './components/Product/Product';
import ProductInBasket from './components/ProductInBasket/ProductInBasket';
import basketImg from './assets/basket_logo.png';

let basket = document.getElementsByClassName('basket');                 // определяем, необходимые для реализации плавающей 
let wrapperBasket = document.getElementsByClassName('wrapper__basket'); // корзины, блоки

window.onscroll = () => { // функция для плавающей корзины
  if (window.pageYOffset > 150) {
    basket[0].style.position = 'fixed';
    wrapperBasket[0].style.top = '0';
  } else {
    basket[0].style.position = 'absolute';
    wrapperBasket[0].style.top = '11.7%';
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {  // товары
      products: [
        {
          id: 0, 
          productName: 'Пакет видеопрограмм', 
          productDescription: 'Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray.', 
          productPrice: 1990},
        {
          id: 1, 
          productName: 'Фотостудия Movavi', 
          productDescription: 'Полный набор инструментов для легкой фотообработки. Настраивайте параметры изображения вручную и улучшайте качество автоматически, добавляйте крутые фильтры и надписи. Обрезайте, отражайте и поворачивайте кадр, изменяйте размер фото. Удаляйте с фото лишние объекты и заменяйте скучные фоны. Обрабатывайте папки с фото в пакетном режиме, создавайте слайд-шоу с музыкой и переходами.', 
          productPrice: 1890},
        {
          id: 2, 
          productName: 'Movavi Фоторедактор', 
          productDescription: 'Улучшайте качество фото автоматически и вручную. Настраивайте резкость, контраст и цветность. Удаляйте с фотографий объекты, случайно попавшие в кадр. Заменяйте фон изображения. Добавляйте надписи. Выделяйте элементы при помощи удобных инструментов – кисти, волшебной палочки или лассо. Используйте штамп, чтобы устранять мелкие дефекты изображений. ', 
          productPrice: 990},
        {
          id: 3, 
          productName: 'Movavi Пакетный фоторедактор',
          productDescription: 'Обрабатывайте любое количество фотографий одним нажатием кнопки – уменьшайте целые фотоальбомы, переименовывайте файлы, конвертируйте формат и улучшайте качество изображений в пакетном режиме. Теперь вам не придется сохранять каждый файл по отдельности: просто примените изменения ко всем фото сразу и экспортируйте их с новыми настройками!', 
          productPrice: 490},
        {
          id: 4, 
          productName: 'Захват видео с экрана', 
          productDescription: 'Записывайте все, что происходит на экране вашего монитора: видеочаты, работу в программах и интернет-браузерах и многое другое. Сохраняйте скринкасты в любые популярные форматы и для мобильных устройств.', 
          productPrice: 1490}
      ],
      orderList: [],
      isUpdate: false,
    }

    if (JSON.parse(localStorage.getItem('basket'))) { // берём если есть в localStorage
      this.state.orderList = JSON.parse(localStorage.getItem('basket'));
    }

    this.addProductToOrder = (id, name, price) => { // добавить товар в корзину
      this.state.orderList[id] = {id, name, price};
      this.setState({
        isUpdate: true,
      })
      let localOrderList = JSON.stringify(this.state.orderList); 
      localStorage.setItem('basket', localOrderList); // сохранияем в localStorage
    }

    this.deleteProductFormOrder = (id) => { // убрать товар из корзины
      delete this.state.orderList[id];
      this.setState({
        isUpdate: true,
      })
      let localOrderList = JSON.stringify(this.state.orderList);
      localStorage.setItem('basket', localOrderList); // сохранияем в localStorage
    }

    this.listProducts = this.state.products.map((item) => { // под каждый товар создаем компонент
        return <Product                                     // с необходимыми параметрами
                  key={item.id} 
                  img={item.id} 
                  name={item.productName} 
                  description={item.productDescription}
                  price={item.productPrice}
                  toOrder={this.addProductToOrder}
                />
      }
    );
    
    
  }

  shouldComponentUpdate(nextState) { // обновляем, если содержимое корзины изменилось
    if(this.state.orderList !== nextState.orderList) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    this.totalPrice = 0; // переменная для общей суммы
    this.orderList = this.state.orderList.map((item) => { // выводим содержимое корзины
      if (item !== null) {                          // и считаем сумму
        this.totalPrice += item.price;  
        return <ProductInBasket
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              fromOrder={this.deleteProductFormOrder}
             />
        } else {
          return false;
        }        
      }   
    );

    this.orderListShow = ''; // переменная для отображения в алерте списка товаров
    this.state.orderList.map((item) => {
      if (item !== null) {     
        this.orderListShow += item.name + ', ';
        return true;
      } else {
        return false;
      }
    });

    this.toOrder = () => { // вывод алерта с информацией о заказе
      if(this.orderListShow === '') {
        alert('Вы ничего не выбрали');
      } else {
        alert('Вы добавили в корзину ' + this.orderListShow + ' на сумму ' + this.totalPrice + ',00 руб.');
      }
    }

    return (
      <div className="App">
        <Header/>
        <section className="wrapper__products"> 
          {this.listProducts} {/*список товаров*/}
        </section>
        <div className="wrapper__basket">
          <section className="basket">
            <header className="basket__header">
              <img src={basketImg} alt='basket-logo'/>
              <h3 className="basket__title">Корзина</h3>
            </header>
            <section className="orderList">
              {this.orderList} {/*список товаров в корзине*/}
            </section>
            <div className="line"></div>
            <div className="total">
              <span className="totalReg">Всего:</span> {this.totalPrice},00 руб.
            </div>
            <button className="toOrder" onClick={this.toOrder}>Оформить заказ</button>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
