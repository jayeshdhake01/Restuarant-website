// Auto Dark Mode
const hour=new Date().getHours();
if(hour>=18||hour<6){document.body.classList.add("dark");}

let cart=JSON.parse(localStorage.getItem("cart"))||[];

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
updateCartCount();
}

function updateCartCount(){
const count=document.getElementById("cartCount");
if(count){
let totalItems=cart.reduce((sum,item)=>sum+item.quantity,0);
count.innerText=totalItems;
}
}

function addToCart(name,price){
const existing=cart.find(item=>item.name===name);
if(existing){existing.quantity++;}
else{cart.push({name,price,quantity:1});}
saveCart();
updateCart();
}

function updateCart(){
const cartItems=document.getElementById("cartItems");
const totalElement=document.getElementById("total");
if(!cartItems)return;
cartItems.innerHTML="";
let total=0;

cart.forEach((item,index)=>{
total+=item.price*item.quantity;
cartItems.innerHTML+=`
<div class="cart-item">
<p>${item.name}</p>
<div class="qty-controls">
<button onclick="changeQty(${index},-1)">-</button>
<span>${item.quantity}</span>
<button onclick="changeQty(${index},1)">+</button>
</div>
</div>`;
});
if(totalElement)totalElement.innerText=total;
}

function changeQty(index,change){
cart[index].quantity+=change;
if(cart[index].quantity<=0){cart.splice(index,1);}
saveCart();
updateCart();
}

function placeOrder(){
if(cart.length===0){alert("Cart is empty!");return;}
cart=[];
saveCart();
window.location.href="tracking.html";
}

function bookTable(){
const name=document.getElementById("resName").value;
if(!name){alert("Fill details!");return;}
alert("Reservation Confirmed!");
}

function startTracking(){
const steps=["step1","step2","step3","step4"];
let i=0;
const interval=setInterval(()=>{
if(i<steps.length){
document.getElementById(steps[i]).classList.add("active");
i++;
}else{clearInterval(interval);}
},2000);
}

updateCart();
updateCartCount();