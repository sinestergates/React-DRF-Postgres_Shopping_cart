
import './css/bootstrap.min.css'
import './css/form.css'
import './css/style.css'
import login from "./img/login.png";
import React, { useState } from 'react';
import Cart from './Runcart'




//запрашиваем данные и вводим в localStorage
fetch('http://127.0.0.1:8000/api/getproduct')
  .then(res => res.json())
  .then(data => {
    
    localStorage.setItem('numbers', JSON.stringify(data))
   })
  .then(() => {
    
   });

 

let storage = localStorage.getItem('numbers')
let numbers = JSON.parse(storage)

function CollectOrder(setState,priceState,num) {
  // Отправляем POST в backend
  fetch('http://127.0.0.1:8000/api/postorder',{
  
  method: "post",
  headers: {
       "Content-Type": "application/json"
  },
  body: JSON.stringify(num)
})

priceState(0)
numbers = JSON.parse(storage)
setState({})
alert("Заказ оформлен!")
}

function Delete (event,num,setState,price_order,priceState){
  // Удаляем товар
  let copy = {...num}
  let price_ord = price_order
  
  

  price_ord = price_ord - copy[event.target.dataset.id].price_all
  priceState(price_ord)
  numbers[event.target.dataset.id].quant = 1
  numbers[event.target.dataset.id].price_all = 10
  delete copy[event.target.dataset.id]
  
  
  setState(copy);
  
}

function Plus(event,num,setState,price_order,priceState){
  ///Логика функции при увеличении товара
    
    let copy = {...num}
    let price_ord = price_order
    copy[event.target.dataset.id].quant++
    copy[event.target.dataset.id].price_all = copy[event.target.dataset.id].price_all + copy[event.target.dataset.id].price_per_piece
    
    setState(copy);
    price_ord = price_ord +copy[event.target.dataset.id]['price_per_piece']
    if (num[event.target.dataset.id].price_all <= 0){
      
    }
    else  priceState(price_ord);
    // Далее логика добавления товара с другой упаковкой
    if (num[event.target.dataset.id].quant_next_packaging != null){
    if (num[event.target.dataset.id].quant >= num[event.target.dataset.id].quant_next_packaging){
      let key = copy[event.target.dataset.id]
      let next_packaging = key.next_packaging
      
      copy[event.target.dataset.id].quant = 0
      
      copy[next_packaging] = numbers[next_packaging]
      let quant_product = key.price_all
      copy[event.target.dataset.id].price_all = 0
      priceState(price_ord - quant_product + copy[next_packaging].price_all)
      
      
      setState(copy);
  
    
    }}

}

function Minus(event,num,setState,price_order,priceState){
    ///Логика функции при уменьшении товара
    
  let price_ord = price_order
  let copy = {...num}

  price_ord = price_ord -num[event.target.dataset.id]['price_per_piece']
  if (num[event.target.dataset.id].price_all <= 0){
    
  }
  else  priceState(price_ord);

  
  copy[event.target.dataset.id].quant--
  copy[event.target.dataset.id].price_all = copy[event.target.dataset.id].price_all - copy[event.target.dataset.id].price_per_piece

  if(copy[event.target.dataset.id].price_all <= 0){
    copy[event.target.dataset.id].quant = 0
    copy[event.target.dataset.id].price_all = 0
   
  }  

  setState(copy);
}


function Runcollet(){

  let [price_order,priceState] = useState(0)
  let [num, setState] = useState({});
  
  
  
  document.onclick = event =>{
  
  if (event.target.classList.contains('accordion-button')){
    
    
    setState({...num, [event.target.dataset.id]:numbers[event.target.dataset.id]});
    if (price_order<=0){
      priceState(numbers[event.target.dataset.id]['price_all'])
    }
    
    if( event.target.dataset.id in num ) {
      
    }
    else priceState(price_order + numbers[event.target.dataset.id]['price_all'])
    
  
  }
    if (event.target.classList.contains('plus')){
      
      
      Plus(event,num,setState,price_order,priceState)
      
  }
  if (event.target.classList.contains('minus')){
      Minus(event,num,setState,price_order,priceState)
      
  }
  if (event.target.classList.contains('delete')){
      Delete (event,num,setState,price_order,priceState)
    
  }
  
};
  
  return ( 
  
  <div>
    
<div class="container mt-5 p-3 rounded cart">
        <div class="row no-gutters">
            <div class="col-md-8">
                <div class="product-details mr-2">
                    <div class="d-flex flex-row align-items-center"><i class="fa fa-long-arrow-left"></i><span class="ml-2">Корзина покупок</span></div>
                    <hr/>
                    <h6 class="mb-0">Товары</h6>
                    
                    <Cart num={num} />
                    
                </div>
            </div>
            <div class="col-md-4">
                <div class="payment-info">
                    <div class="d-flex justify-content-between align-items-center"><span>Пользователь</span><img class="rounded" src={login} width="50"/></div>
                    <hr class="line"/>
                    <div class="d-flex justify-content-between information"><span>Сумма по заказу</span><span>{price_order}.руб</span></div>
                    
                    
                    <button onClick={e => CollectOrder(setState,priceState, num)}class="collect btn btn-primary btn-block d-flex justify-content-between mt-3" type="button"><span>Оплатить {price_order}.руб</span><span><i class="fa fa-long-arrow-right ml-1"></i></span></button></div>
                    
            </div>
        </div>
    </div>
</div>
                    
                    
              
  );
}


 function Iter(){

   
  return Object.keys(numbers).map((number) =>
  
  <div class="accordion">

  
  <div class="card" >
  <ul class="list-group list-group-flush">
  <button class="accordion-button"  onClick={Iter} type="button" data-id = {number} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      Артикул:  {number}   Название: {numbers[number]['product_name']} 
    </button>
  </ul>
  <div class="card-footer">
    {numbers[number]['product_descr']}
  </div>
</div>


</div>
  );
  

}

 function TypesExample() {
  
  return (
 <div> 
  
    
  <div class="alert alert-success" role="alert">
  Товары в наличии
  </div>
    <Iter ></Iter>
    
    <Runcollet/>
</div> );

}

export default TypesExample;    