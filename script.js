let cart = {};

// ======================
// PRICES
// ======================
let prices = {
    "Pizza": 199,
    "Cheese Pizza": 220,
    "Corn Pizza": 200,
    "Paneer Pizza": 249,
    "Onion Pizza": 200,
    "Capsicum Pizza": 160,
    "Pasta": 149,
    "Red Sauce Pasta": 149,
    "White Sauce Pasta": 149,
    "Aloo Tikki Burger": 149,
    "Cheese Burger": 149,
    "Chocolate Shake": 149,
    "Ice Cream": 149,
    "French Fries": 149,
    "Paneer Roll": 149
};

// ======================
// ADD TO CART
// ======================
function addToCart(item){
    if(cart[item]){
        cart[item]++;
    } else {
        cart[item] = 1;
    }
    updateCart();
}

// ======================
// UPDATE CART
// ======================
function updateCart(){

    let cartItems = document.getElementById("cart-items");
    let count = document.getElementById("count");
    let total = document.getElementById("total");

    if(!cartItems || !count || !total) return;

    cartItems.innerHTML = "";

    let itemCount = 0;
    let totalPrice = 0;

    for(let key in cart){

        let price = prices[key] || 149;
        let itemTotal = price * cart[key];

        cartItems.innerHTML += `
            <p>
                ${key} x ${cart[key]} = ₹${itemTotal}
                <button onclick="removeItem('${key}')">❌</button>
            </p>
        `;

        itemCount += cart[key];
        totalPrice += itemTotal;
    }

    count.innerText = itemCount;
    total.innerText = totalPrice;
}

// ======================
// REMOVE ITEM
// ======================
function removeItem(item){
    delete cart[item];
    updateCart();
}

// ======================
// CART TOGGLE
// ======================
function toggleCart(){
    let box = document.getElementById("cartBox");
    if(box) box.classList.toggle("active");
}

// ======================
// CHECKOUT OPEN
// ======================
function openCheckout(){

    let page = document.getElementById("checkoutPage");
    if(page) page.classList.add("active");

    let box = document.getElementById("checkoutItems");
    if(!box) return;

    box.innerHTML = "";

    let total = 0;

    for(let key in cart){
        box.innerHTML += `<p>${key} x ${cart[key]}</p>`;
        total += cart[key] * (prices[key] || 149);
    }

    let checkoutTotal = document.getElementById("checkoutTotal");
    if(checkoutTotal) checkoutTotal.innerText = total;
}

// ======================
// CLOSE CHECKOUT
// ======================
function closeCheckout(){
    let page = document.getElementById("checkoutPage");
    if(page) page.classList.remove("active");
}

// ======================
// PLACE ORDER (FINAL FIXED)
// ======================
function placeOrder(){

    let name = document.getElementById("name");
    let phone = document.getElementById("phone");
    let address = document.getElementById("address");

    if(!name || !phone || !address) return;

    if(name.value === "" || phone.value === "" || address.value === ""){
        alert("⚠️ Please fill all details!");
        return;
    }

    let orderData = {
        customer: name.value,
        phone: phone.value,
        address: address.value,
        items: cart
    };

    console.log("ORDER PLACED:", orderData);

    alert("🎉 Order Placed Successfully!");

    cart = {};
    updateCart();
    closeCheckout();
}

// ======================
// FILTER ITEMS
// ======================
function filterItems(category){

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let type = card.getAttribute("data-category");

        if(category === "all" || type === category){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// ======================
// SEARCH FOOD
// ======================
function searchFood(){

    let input = document.getElementById("searchInput");
    if(!input) return;

    let value = input.value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        let title = card.querySelector("h3").innerText.toLowerCase();

        if(title.includes(value)){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// ======================
// REVIEWS SYSTEM
// ======================
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

function addReview(){

    let input = document.getElementById("reviewText");
    if(!input) return;

    if(input.value.trim() === "") return;

    reviews.push(input.value);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    input.value = "";
    showReviews();
}

function showReviews(){

    let box = document.getElementById("reviewBox");
    if(!box) return;

    box.innerHTML = "";

    reviews.forEach(r => {
        let div = document.createElement("div");
        div.innerHTML = "⭐ " + r;
        box.appendChild(div);
    });
}

showReviews();

// ======================
// NOTIFICATIONS
// ======================
let notifications = [
    "🔥 20% OFF on Pizza!",
    "🍔 New Burger Added!",
    "🚚 Free Delivery above ₹199"
];

let notiBox = document.getElementById("notiBox");

if(notiBox){
    notifications.forEach(n => {
        let div = document.createElement("div");
        div.innerHTML = n;
        notiBox.appendChild(div);
    });
}

// ======================
// INIT CART
// ======================
updateCart();

function changeLanguage(){

    let lang = document.getElementById("languageSelect").value;

    if(lang === "hi"){
        document.querySelector(".hero h1").innerText = "स्वादिष्ट खाना आपके शहर में 🍕";
        document.querySelector(".hero p").innerText = "बेस्ट पिज़्ज़ा, बर्गर और पास्ता";
    }
    else{
        document.querySelector(".hero h1").innerText = "Welcome to PIZZAURA 🍕";
        document.querySelector(".hero p").innerText = "Best Pizza, Burger & Pasta in your city";
    }
}