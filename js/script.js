// ==============================
// Shopping Cart
// ==============================

let cart = [];



// ==============================
// QuickCart Product Data
// ==============================

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1499,
        icon: "🎧"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2499,
        icon: "⌚"
    },

    {
        id: 3,
        name: "Cotton T-Shirt",
        category: "Fashion",
        price: 699,
        icon: "👕"
    },

    {
        id: 4,
        name: "Backpack",
        category: "Fashion",
        price: 999,
        icon: "🎒"
    },

    {
        id: 5,
        name: "Coffee Mug",
        category: "Home",
        price: 299,
        icon: "☕"
    },

    {
        id: 6,
        name: "Desk Lamp",
        category: "Home",
        price: 799,
        icon: "💡"
    }

];



// ==============================
// Display Products
// ==============================

const productContainer =
    document.getElementById("productContainer");


function displayProducts(productList = products) {

    productContainer.innerHTML = "";


    if (productList.length === 0) {

        productContainer.innerHTML = `

            <p class="no-products">

                No products found.

            </p>

        `;

        return;
    }


    productList.forEach(function(product) {

        const productCard =
            document.createElement("div");


        productCard.className =
            "product-card";


        productCard.innerHTML = `

            <div class="product-icon">

                ${product.icon}

            </div>


            <h3>

                ${product.name}

            </h3>


            <p class="product-category">

                ${product.category}

            </p>


            <p class="product-price">

                ₹${product.price}

            </p>


            <button
                class="add-cart-btn"
                onclick="addToCart(${product.id})"
            >

                Add to Cart

            </button>

        `;


        productContainer.appendChild(
            productCard
        );

    });

}



// ==============================
// Add Product To Cart
// ==============================

function addToCart(productId) {

    const selectedProduct =
        products.find(function(product) {

            return product.id === productId;

        });


    if (!selectedProduct) {

        return;

    }


    const existingItem =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (existingItem) {

        existingItem.quantity++;

    }

    else {

        cart.push({

            ...selectedProduct,

            quantity: 1

        });

    }


    updateCart();


    alert(
        selectedProduct.name +
        " added to cart!"
    );

}



// ==============================
// Update Cart
// ==============================

function updateCart() {

    updateCartCount();

    displayCart();

}



// ==============================
// Update Cart Counter
// ==============================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");


    let totalQuantity = 0;


    cart.forEach(function(item) {

        totalQuantity += item.quantity;

    });


    cartCount.textContent =
        totalQuantity;

}



// ==============================
// Display Cart
// ==============================

function displayCart() {

    const cartContainer =
        document.getElementById("cartContainer");


    const cartTotal =
        document.getElementById("cartTotal");


    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <p class="empty-cart">

                Your cart is empty.

            </p>

        `;


        cartTotal.textContent = "0";

        return;

    }


    cartContainer.innerHTML = "";


    let total = 0;


    cart.forEach(function(item) {


        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h3>

                    ${item.icon}
                    ${item.name}

                </h3>


                <p class="cart-item-price">

                    ₹${item.price} each

                </p>

            </div>



            <div class="quantity-controls">


                <button
                    class="quantity-btn"
                    onclick="decreaseQuantity(${item.id})"
                >

                    −

                </button>


                <span class="quantity">

                    ${item.quantity}

                </span>


                <button
                    class="quantity-btn"
                    onclick="increaseQuantity(${item.id})"
                >

                    +

                </button>


            </div>



            <strong>

                ₹${itemTotal}

            </strong>



            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})"
            >

                Remove

            </button>

        `;


        cartContainer.appendChild(
            cartItem
        );

    });


    cartTotal.textContent =
        total;

}



// ==============================
// Increase Quantity
// ==============================

function increaseQuantity(productId) {

    const item =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (item) {

        item.quantity++;

        updateCart();

    }

}



// ==============================
// Decrease Quantity
// ==============================

function decreaseQuantity(productId) {

    const item =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (!item) {

        return;

    }


    if (item.quantity > 1) {

        item.quantity--;

    }

    else {

        removeFromCart(productId);

        return;

    }


    updateCart();

}



// ==============================
// Remove Product
// ==============================

function removeFromCart(productId) {

    cart =
        cart.filter(function(item) {

            return item.id !== productId;

        });


    updateCart();

}



// ==============================
// Clear Cart
// ==============================

function clearCart() {

    cart = [];

    updateCart();

}



// ==============================
// Search and Filter
// ==============================

const searchInput =
    document.getElementById("searchInput");


const categoryFilter =
    document.getElementById("categoryFilter");



function filterProducts() {

    const searchText =
        searchInput.value
            .toLowerCase();


    const selectedCategory =
        categoryFilter.value;


    const filteredProducts =
        products.filter(function(product) {


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    displayProducts(
        filteredProducts
    );

}



searchInput.addEventListener(
    "input",
    filterProducts
);


categoryFilter.addEventListener(
    "change",
    filterProducts
);



// ==============================
// Cart Button Events
// ==============================

const viewCartBtn =
    document.getElementById(
        "viewCartBtn"
    );


const closeCartBtn =
    document.getElementById(
        "closeCartBtn"
    );


const clearCartBtn =
    document.getElementById(
        "clearCartBtn"
    );


const cartSection =
    document.getElementById(
        "cartSection"
    );



viewCartBtn.addEventListener(
    "click",
    function() {


        cartSection.style.display =
            "block";


        cartSection.scrollIntoView({

            behavior: "smooth"

        });

    }
);



closeCartBtn.addEventListener(
    "click",
    function() {


        cartSection.style.display =
            "none";

    }
);



clearCartBtn.addEventListener(
    "click",
    function() {

        clearCart();

    }
);



// ==============================
// Checkout
// ==============================

const checkoutBtn =
    document.getElementById(
        "checkoutBtn"
    );


const closeCheckoutBtn =
    document.getElementById(
        "closeCheckoutBtn"
    );


const checkoutSection =
    document.getElementById(
        "checkoutSection"
    );


const checkoutItems =
    document.getElementById(
        "checkoutItems"
    );


const checkoutTotal =
    document.getElementById(
        "checkoutTotal"
    );


const placeOrderBtn =
    document.getElementById(
        "placeOrderBtn"
    );


const orderConfirmation =
    document.getElementById(
        "orderConfirmation"
    );



// ==============================
// Display Checkout
// ==============================

function displayCheckout() {


    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;

    }


    checkoutItems.innerHTML =
        "";


    let total = 0;


    cart.forEach(function(item) {


        const itemTotal =
            item.price *
            item.quantity;


        total += itemTotal;


        const checkoutItem =
            document.createElement(
                "div"
            );


        checkoutItem.className =
            "checkout-item";


        checkoutItem.innerHTML = `

            <span>

                ${item.icon}
                ${item.name}
                × ${item.quantity}

            </span>


            <strong>

                ₹${itemTotal}

            </strong>

        `;


        checkoutItems.appendChild(
            checkoutItem
        );

    });


    checkoutTotal.textContent =
        total;


    checkoutSection.style.display =
        "block";


    // Reset confirmation
    // when checkout is opened again

    orderConfirmation.style.display =
        "none";


    placeOrderBtn.style.display =
        "block";


    checkoutSection.scrollIntoView({

        behavior: "smooth"

    });

}



// ==============================
// Checkout Button
// ==============================

checkoutBtn.addEventListener(
    "click",
    function() {

        displayCheckout();

    }
);



// ==============================
// Close Checkout
// ==============================

closeCheckoutBtn.addEventListener(
    "click",
    function() {

        checkoutSection.style.display =
            "none";

    }
);



// ==============================
// Place Order
// ==============================

placeOrderBtn.addEventListener(
    "click",
    function() {


        const customerName =
            document.getElementById(
                "customerName"
            ).value.trim();


        const customerEmail =
            document.getElementById(
                "customerEmail"
            ).value.trim();


        const customerAddress =
            document.getElementById(
                "customerAddress"
            ).value.trim();



        // ==============================
        // Validation
        // ==============================

        if (
            customerName === "" ||
            customerEmail === "" ||
            customerAddress === ""
        ) {


            alert(
                "Please fill in all customer details."
            );


            return;

        }



        // ==============================
        // Show Confirmation
        // ==============================

        orderConfirmation.style.display =
            "block";


        placeOrderBtn.style.display =
            "none";


        alert(
            "Order placed successfully!"
        );



        // ==============================
        // Clear Cart
        // ==============================

        cart = [];


        updateCart();



        // Hide Cart Section

        cartSection.style.display =
            "none";



        // Scroll to Confirmation

        orderConfirmation.scrollIntoView({

            behavior: "smooth"

        });

    }
);



// ==============================
// Initial Page Load
// ==============================

displayProducts();

updateCart();
