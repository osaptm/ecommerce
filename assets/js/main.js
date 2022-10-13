const items = [
  {
    id: 1,
    name: 'Hoodies',
    price: "$45.00",
    image: 'assets/images/featured1.png',
    category: 'hoodies',
    quantity: 10
  },
  {
    id: 2,
    name: 'Shirts',
    price: "$40.00",
    image: 'assets/images/featured2.png',
    category: 'shirts',
    quantity: 15
  },
  {
    id: 3,
    name: 'Sweatshirts',
    price: "$35.00",
    image: 'assets/images/featured3.png',
    category: 'shirts',
    quantity: 20
  },
  {
      id: 4,
      name: 'Otro Shirts',
      price: "$30.00",
      image: 'assets/images/featured2.png',
      category: 'shirts',
      quantity: 30
    },
    {
      id: 5,
      name: 'Otro Hoodies',
      price: "$20.00",
      image: 'assets/images/featured2.png',
      category: 'shirts',
      quantity: 40
    },
    {
      id: 6,
      name: 'New TShirts',
      price: "$10.00",
      image: 'assets/images/featured2.png',
      category: 'shirts',
      quantity: 50
    },
    {
      id: 7,
      name: 'BAG',
      price: "$5.00",
      image: 'assets/images/featured2.png',
      category: 'shirts',
      quantity: 60
    }
    
];
//CARGA DE DOM
   document.addEventListener("DOMContentLoaded",()=>{
    productosSeccion();
    pinta_allProducts_inCart();
    total_items_inCard();
    monto_total_Card();
  })
//MODO OSCURO DE LA PAG
  const darkmode=document.getElementById("darkmode")
  darkmode.addEventListener("click",()=>{
    if(darkmode.classList.contains("bx-moon")){
     darkmode.classList.replace("bx-moon","bx-sun")
     
    }else{
      darkmode.classList.replace("bx-sun","bx-moon")
    }
   
      document.body.classList.toggle("darktheme")
  })
//SECCION DE PRODUCTOS
function productosSeccion(){
  const productosPadre=document.getElementById("cajapadre-productos")
    let item=``
    items.forEach(producto=>{
        item+=`<div class="product-card">
        <img src=${producto.image} alt="">
        <div class="info-product">
        <p class='product-card-price'>${producto.price}</p>
        <p class='product-card-stock'>Stock:${producto.quantity}</p>
        </div>
        <p class='product-card-name'>${producto.name}</p>
        <span class="btn-add add-cart" onclick="add_to_cart(${producto.id})">+</span>
        </div>
        `
      })
    productosPadre.innerHTML=item
}
//MENU HAMB
const menuicon=document.getElementById("menuicono")
const closemenunav=document.getElementById("closemenu-nav")
menuicon.addEventListener("click",()=>{
  document.getElementById("menunav").classList.add("active")
})
closemenunav.addEventListener("click",()=>{
  document.getElementById("menunav").classList.remove("active")
})
//BOTONES PARA ABRIR CARRITO Y CERRARLO
const shopbag=document.getElementById("shopbag")
const closeshopBag=document.getElementById("closeshopbag")
shopbag.addEventListener("click",()=>{
 document.getElementById("cartPadreSeccion").classList.remove("hide")
})
closeshopBag.addEventListener("click",()=>{
  document.getElementById("cartPadreSeccion").classList.add("hide")
})

// ADD PROCUCTO AL CARRITO

function add_to_cart(id){
  const cart = localStorage.getItem('cart');
  if(cart === null || cart===''){
    const obj_producto_db = data_x_indice_db(id);
    const obj_producto = {...obj_producto_db,precioNumber:0,cantidadInCart:1,stock:0,subtotal:0}
    obj_producto.precioNumber = precioToDecimal(obj_producto_db.price);
    obj_producto.stock = obj_producto_db.quantity - obj_producto.cantidadInCart;
    obj_producto.subtotal = obj_producto.cantidadInCart * obj_producto.precioNumber;
    localStorage.setItem('cart', JSON.stringify([obj_producto]));
    document.getElementById('contenido-cart').innerHTML = '';
    if(obj_producto.stock<0){
      alert("No hay Stock Suficiente");
    }else{
      pinta_productInCart(obj_producto);
    }
  }else{
    const obj_producto_db = data_x_indice_storage(id);
    obj_producto_db.cantidadInCart = obj_producto_db.cantidadInCart + 1;
    obj_producto_db.stock = obj_producto_db.quantity - obj_producto_db.cantidadInCart;
    obj_producto_db.subtotal = obj_producto_db.cantidadInCart * obj_producto_db.precioNumber;
    if(obj_producto_db.stock<0){
      alert("No hay Stock Suficiente");
    }else{
      document.getElementById('stock-product-cart'+id).innerHTML = 'Stock:'+obj_producto_db.stock;
      document.getElementById('subtotal-product-cart'+id).innerHTML = 'Subtotal:'+obj_producto_db.subtotal;
      document.getElementById('cantidad-procduct-cart'+id).innerHTML = obj_producto_db.cantidadInCart;
      const cart_final = localStorage.getItem('cart');
      actualiza_storage(obj_producto_db, cart_final, id)
    }
   
  }  
  total_items_inCard();
  monto_total_Card();
}

function pinta_productInCart(obj_producto){
  let id = obj_producto['id'];
  let contenido_cart = document.getElementById('contenido-cart');
  contenido_cart.innerHTML = contenido_cart.innerHTML + `<div class="producto-in-cart">
  <img class="img-product-cart" src="${obj_producto.image}" alt="">
  <div class="detalle-product-cart">
    <div class="nombre-product-cart" id="nombre-product-cart${id}">${obj_producto.name}</div>
    <div class="stok-precio">
      <span class="stock-precio-product-cart" id="stock-product-cart${id}">Stock:${obj_producto.stock}</span>|
      <span class="precio-procduct-cart importante" id="precio-procduct-cart${id}">${obj_producto.price}</span>
    </div>
    <div class="subtotal-product-cart importante" id="subtotal-product-cart${id}">Subtotal:${obj_producto.subtotal}</div>
    <div class="actions-product-cart">
        <div class="aumenta-disminuye">
            <span onclick="add_to_cart(${id})" class="boton-suma btn-producto-in-cart">+</span>
            &nbsp; <span class="cantidad-procduct-cart" id="cantidad-procduct-cart${id}">${obj_producto.cantidadInCart}</span> &nbsp; ITEMS &nbsp;
            <span onclick="resta_to_cart(${id})" class="boton-resta btn-producto-in-cart">-</span>
        </div>
        <img class="btn-producto-in-cart" src="./assets/images/papelera.svg" onclick="delete_product_cart(${id})">
    </div>
  </div>
</div>
<hr>`;
}

function pinta_allProducts_inCart(){
    const json_cart = localStorage.getItem('cart');
    let contenido_cart = document.getElementById('contenido-cart');
    contenido_cart.innerHTML = `<img src="./assets/images/empty-cart.png" class="empty-car">
    <p>El Carrito esta vacio, puedes agregar productos haciendo click en el boton +</p>`;
    if(json_cart !== null && json_cart !== ''){
      const obj_cart = JSON.parse(json_cart);
      if(obj_cart.length!==0){ 
        contenido_cart.innerHTML = "";
        obj_cart.forEach((obj_producto)=>{
            pinta_productInCart(obj_producto);
        })
      }else{
        localStorage.clear();
      }
    }
}

function resta_to_cart(id){
    const cart = localStorage.getItem('cart');
    const obj_producto_db = data_x_indice_storage(id);
    obj_producto_db.cantidadInCart = obj_producto_db.cantidadInCart - 1;
    obj_producto_db.stock = obj_producto_db.quantity - obj_producto_db.cantidadInCart;
    obj_producto_db.subtotal = obj_producto_db.cantidadInCart * obj_producto_db.precioNumber;
    if(obj_producto_db.cantidadInCart>0){
      document.getElementById('stock-product-cart'+id).innerHTML = 'Stock:'+obj_producto_db.stock;
      document.getElementById('subtotal-product-cart'+id).innerHTML = 'Subtotal:'+obj_producto_db.subtotal;
      document.getElementById('cantidad-procduct-cart'+id).innerHTML = obj_producto_db.cantidadInCart;
      actualiza_storage(obj_producto_db, cart, id)
    } 
    total_items_inCard();
    monto_total_Card();
}

function delete_product_cart(id){
  const json_cart = localStorage.getItem('cart');
  const obj_cart = JSON.parse(json_cart);
  const indice_para_reemplaza = obj_cart.findIndex((producto)=>{
    return producto['id'] === id;
  })
  obj_cart.splice(indice_para_reemplaza,1);
  localStorage.setItem("cart",JSON.stringify(obj_cart))
  const json_cart_final = localStorage.getItem('cart');
  pinta_allProducts_inCart(json_cart_final);
  total_items_inCard();
  monto_total_Card();
}

function precioToDecimal(precioText){
    precioText = precioText.replace("$",'');
    return parseFloat(precioText);
}

function data_x_indice_db(id){
  return items.find((producto)=>{
    return producto['id'] === id;
  })
}

function data_x_indice_storage(id){
  const json_cart = localStorage.getItem('cart');
  const obj_cart = JSON.parse(json_cart);  
  const indice_para_reemplaza = obj_cart.findIndex((producto)=>{
    return producto['id'] === id;
  })
  if(indice_para_reemplaza === -1){
    add_newProductTo_storage(obj_cart,id);
  }
  const cart = localStorage.getItem('cart');
  const final_cart = JSON.parse(cart);
  return final_cart.find((producto)=>{
    return producto['id'] === id;
  })
}

function add_newProductTo_storage(obj_cart,id){
    let objeto_final = [...obj_cart];
    const obj_producto_db = data_x_indice_db(id);
    const obj_producto = {...obj_producto_db,precioNumber:0,cantidadInCart:0,stock:0,subtotal:0}
    obj_producto.precioNumber = precioToDecimal(obj_producto_db.price);
    objeto_final.push(obj_producto);
    localStorage.setItem("cart",JSON.stringify(objeto_final))
    pinta_productInCart(obj_producto);
}

function actualiza_storage(newObject, json_cart, id){
  const obj_cart = JSON.parse(json_cart);
  const indice_para_reemplaza = obj_cart.findIndex((producto)=>{
    return producto['id'] === id;
  })
  obj_cart.push(newObject);
  obj_cart.splice(indice_para_reemplaza,1);
  localStorage.setItem("cart",JSON.stringify(obj_cart))
}

function total_items_inCard(){
  const json_cart = localStorage.getItem('cart');
  let total = 0; 
  if(json_cart !== null && json_cart !== ''){
      const obj_cart = JSON.parse(json_cart);
      total = obj_cart.reduce((acc,val)=>{
        acc += val.cantidadInCart;
        return acc;
      },0);

  } 
  document.getElementById('cantidad-items-head').innerHTML = total;
  document.getElementById('cantidad-items-num').innerHTML = total;
 
}


function monto_total_Card(){
  const json_cart = localStorage.getItem('cart');
  let total = 0; 
  if(json_cart !== null && json_cart !== ''){
      const obj_cart = JSON.parse(json_cart);
      total = obj_cart.reduce((acc,val)=>{
        acc += val.subtotal;
        return acc;
      },0);

  } 
  document.getElementById('monto-total').innerHTML = '$'+total; 
}