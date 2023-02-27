
import './css/bootstrap.min.css'
import './css/form.css'
import './css/style.css'
import React, { useState } from 'react';





function Cart({num}) {
  // Компонент вывода товаров в корзину
  
  return Object.keys(num).map((number) =>


<div>
    
<div data-id = {number} class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
        <div class="d-flex flex-row"><img class="rounded" src={`data:image/png;base64,${num[number]['image']}`} width="50"/>
            <div class="ml-2"><span class="spec font-weight-bold d-block"> {num[number]['product_name']}</span>
            <span class="spec">Цена за штуку: {num[number]['price_per_piece']}руб</span><br/>
            <span class="spec">Тара: {num[number]['packaging_name']}</span>
            </div>
        </div>
        
        <div class="d-flex flex-row align-items-center"><span class="d-block">Количество:{num[number]['quant']}
        <button data-id = {number} type="button" class="plus btn btn-success">+</button>
        <button data-id = {number} type="button" class="minus btn btn-danger">-</button>
        
        </span><span class="d-block ml-5 font-weight-bold"> {number['name']}</span><i class="fa fa-trash-o ml-3 text-black-50"></i></div>
        <div class="qty mt-5">
        <p data-id = {number} >Цена:{num[number]['price_all']}.руб </p>
        <button data-id = {number} type="button" class="delete btn btn-danger">Удалить</button>
        
    </div>
    </div>
    </div>
)

};




export default Cart;  