

// close and open aside 
const cart_button = document.querySelector('.fa-shopping-cart');
const overlay = document.querySelector('.overlay');
const aside_menu = document.querySelector('.aside-menu');
const close_aside = document.querySelector('.close-aside');

// shop_now button
const shop_now = document.getElementById('shop-now');
const products_container = document.getElementById('products-container');



//aside container for products 
const aside_container = document.getElementById('aside-container');


// shopping-cart-counter small notification
const shopping_cart_counter = document.querySelector('.shopping-cart-counter');


//clear_everything 
const clear_everything = document.getElementById('clear-everything');


//remove specific element in aside 
const remove_el_aside =  document.getElementById('remove-el-aside');

// mony
const monyEl =  document.getElementById('mony');




// the behavior 
shop_now.onclick = function() {
  fetch('products.json')
  .then(response => response.json())
  .then(data => data.items.map(el => {
    products_container.innerHTML+= `
          <div class="col-sm-3 mt-3" data-row="${el.sys.id}">
             <div class="hover-on-product">
              <img class="image add-to-cart" data-row="${el.fields.image.fields.file.url}" src="${el.fields.image.fields.file.url}" alt="${el.fields.title}">
             </div>
              <h5 row-title="${el.fields.title}">${el.fields.title}</h5>
              <h6 row-price="${el.fields.price}">$${el.fields.price}</h6>
           </div>
    `
  }));
}




// let arrayofproducts = document.querySelectorAll('.add-to-cart');
let arr_products = [];

products_container.onclick =function(e) {

 arr_products.push({
      "id":arr_products.length,
      "url":e.target.children[0].getAttribute('data-row'),
      "name":e.target.nextSibling.nextSibling.getAttribute('row-title'),
       "price": +e.target.nextSibling.nextSibling.nextElementSibling.getAttribute('row-price')
 });



 updateTheCounter(arr_products,shopping_cart_counter);
//   console.log(+e.target.nextSibling.nextSibling.nextElementSibling.getAttribute('row-price'));
 }



//  build aside products

function build(arr_products) {
  arr_products.map(el => {
    aside_container.innerHTML += `
    <div class="el-product" data-row=${el.id}>
        <img class="aside-image" src="${el.url}" alt="${el.name}">
          <div class="aside-info-element">
            <p class="name-el-aside">${el.name}</p>
            <p class="pice-el-aside">$${el.price}</p>
            <p class="remove-el-aside">remove</p>
          </div>
          <div class="aside-up-counter">
            <span><i class="fa fa-arrow-up"></i></span> 
            <span class="counter-up-down">1</span>  
            <span><i class="fa fa-arrow-down"></i></span> 
          </div>
    </div>
    `;
  });
  console.log(arr_products);
  calc();
  updateTheCounter(arr_products , shopping_cart_counter);
}





cart_button.onclick = function() {
  overlay.className = 'overlay';
  aside_menu.className = 'aside-menu';
  build(arr_products);
}

close_aside.onclick = function() {
  overlay.className = 'overlay hide';
  aside_menu.className = 'aside-menu hide-aside';
}

function updateTheCounter(arr , el) {
    el.innerHTML = arr.length;
}

clear_everything.onclick = function clearArray() {
  // console.log("sherif");
  arr_products = [];
  updateTheCounter(arr_products,shopping_cart_counter);
  aside_container.innerHTML = "";
}


aside_container.onclick = function(e) {
  if(e.target.className == 'remove-el-aside') {
    let index =  +e.target.parentNode.parentNode.getAttribute('data-row') -1;
    aside_container.innerHTML = "";
    arr_products.splice(index,1);
    build(arr_products);
    
  }
}


// calculate money

function calc() {
  let money = 0;
  arr_products.map(l => {
     money+= l.price;
  });

  monyEl.innerHTML = money;
}









