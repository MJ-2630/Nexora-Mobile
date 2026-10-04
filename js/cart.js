 /* =========================================================
    NEXORA MOBILES - CART JAVASCRIPT
    Cart rendering, quantity, remove, summary
 ========================================================= */

 document.addEventListener("DOMContentLoaded", () => {
     initCartPage();
 });


 /* =========================================================
    CART STATE
 ========================================================= */

 const CartApp = {

     getCart() {
         return NexoraApp.getCart();
     },


     saveCart(cart) {
         NexoraApp.saveCart(cart);
     },


     getProducts() {
         return window.NexoraStore?.products || [];
     },


     getProduct(productId) {

         return NexoraStore.getProductById(
             Number(productId)
         );
     }
 };


 /* =========================================================
    INITIALIZE CART PAGE
 ========================================================= */

 function initCartPage() {

     const cartContainer =
         document.querySelector(
             "#cartItems, .cart-items, [data-cart-items]"
         );

     if (!cartContainer) {
         return;
     }


     renderCart();

     initCartEvents();

     updateCartSummary();
 }


 /* =========================================================
    RENDER CART
 ========================================================= */

 function renderCart() {

     const container =
         document.querySelector(
             "#cartItems, .cart-items, [data-cart-items]"
         );


     if (!container) {
         return;
     }


     const cart =
         CartApp.getCart();


     if (!cart.length) {

         renderEmptyCart();

         updateCartSummary();

         return;
     }


     let html = "";


     cart.forEach(item => {

         const product =
             CartApp.getProduct(
                 item.id
             );


         if (!product) {
             return;
         }


         const quantity =
             Math.max(
                 1,
                 Number(item.quantity) || 1
             );


         const itemTotal =
             Number(product.price) *
             quantity;


         html += `
             <article
                 class="cart-item"
                 data-cart-item="${product.id}"
             >

                 <div class="cart-item-image">

                     <a
                         href="product.html?id=${product.id}"
                     >
                         <img
                             src="${product.image}"
                             alt="${product.name}"
                         >
                     </a>

                 </div>


                 <div class="cart-item-details">

                     <span class="cart-item-brand">
                         ${product.brand}
                     </span>

                     <h3 class="cart-item-name">

                         <a
                             href="product.html?id=${product.id}"
                         >
                             ${product.name}
                         </a>

                     </h3>


                     <div class="cart-item-meta">

                         <span>
                             ${product.color || ""}
                         </span>

                         ${
                             product.storage
                                 ? `
                                     <span>
                                         ${product.storage}
                                     </span>
                                   `
                                 : ""
                         }

                     </div>


                     <button
                         type="button"
                         class="cart-remove"
                         data-remove-cart="${product.id}"
                     >
                         <i class="fa-regular fa-trash-can"></i>
                         Remove
                     </button>

                 </div>


                 <div class="cart-item-price">

                     <strong>
                         ${NexoraStore.formatPrice(
                             product.price
                         )}
                     </strong>

                     ${
                         product.oldPrice
                             ? `
                                 <del>
                                     ${NexoraStore.formatPrice(
                                         product.oldPrice
                                     )}
                                 </del>
                               `
                             : ""
                     }

                 </div>


                 <div class="cart-item-quantity">

                     <button
                         type="button"
                         class="quantity-btn"
                         data-cart-minus="${product.id}"
                         aria-label="Decrease quantity"
                     >
                         <i class="fa-solid fa-minus"></i>
                     </button>


                     <input
                         type="number"
                         min="1"
                         max="${Math.max(
                             1,
                             Number(product.stock) || 1
                         )}"
                         value="${quantity}"
                         class="cart-quantity-input"
                         data-cart-quantity="${product.id}"
                         aria-label="Quantity"
                     >


                     <button
                         type="button"
                         class="quantity-btn"
                         data-cart-plus="${product.id}"
                         aria-label="Increase quantity"
                     >
                         <i class="fa-solid fa-plus"></i>
                     </button>

                 </div>


                 <div class="cart-item-total">

                     <strong>
                         ${NexoraStore.formatPrice(
                             itemTotal
                         )}
                     </strong>

                 </div>

             </article>
         `;
     });


     container.innerHTML =
         html ||
         `
             <div class="cart-empty">
                 No valid products found in your cart.
             </div>
         `;


     NexoraApp.updateCartCount();

     updateCartSummary();
 }


 /* =========================================================
    EMPTY CART
 ========================================================= */

 function renderEmptyCart() {

     const container =
         document.querySelector(
             "#cartItems, .cart-items, [data-cart-items]"
         );


     if (!container) {
         return;
     }


     container.innerHTML = `
         <div class="cart-empty">

             <div class="cart-empty-icon">
                 <i class="fa-solid fa-cart-shopping"></i>
             </div>

             <h2>Your cart is empty</h2>

             <p>
                 Looks like you haven't added anything
                 to your cart yet.
             </p>

             <a
                 href="shop.html"
                 class="btn btn-primary"
             >
                 Continue Shopping
             </a>

         </div>
     `;
 }


 /* =========================================================
    CART EVENTS
 ========================================================= */

 function initCartEvents() {

     document.addEventListener(
         "click",
         event => {

             const removeButton =
                 event.target.closest(
                     "[data-remove-cart]"
                 );


             const minusButton =
                 event.target.closest(
                     "[data-cart-minus]"
                 );


             const plusButton =
                 event.target.closest(
                     "[data-cart-plus]"
                 );


             if (removeButton) {

                 const productId =
                     Number(
                         removeButton.dataset.removeCart
                     );


                 removeCartItem(
                     productId
                 );

                 return;
             }


             if (minusButton) {

                 const productId =
                     Number(
                         minusButton.dataset.cartMinus
                     );


                 changeCartQuantity(
                     productId,
                     -1
                 );

                 return;
             }


             if (plusButton) {

                 const productId =
                     Number(
                         plusButton.dataset.cartPlus
                     );


                 changeCartQuantity(
                     productId,
                     1
                 );

                 return;
             }
         }
     );


     document.addEventListener(
         "change",
         event => {

             const input =
                 event.target.closest(
                     "[data-cart-quantity]"
                 );


             if (!input) {
                 return;
             }


             const productId =
                 Number(
                     input.dataset.cartQuantity
                 );


             let quantity =
                 Number(input.value) || 1;


             updateCartQuantity(
                 productId,
                 quantity
             );
         }
     );
 }


 /* =========================================================
    CHANGE QUANTITY
 ========================================================= */

 function changeCartQuantity(
     productId,
     change
 ) {

     const cart =
         CartApp.getCart();


     const item =
         cart.find(
             cartItem =>
                 Number(cartItem.id) ===
                 Number(productId)
         );


     if (!item) {
         return;
     }


     const product =
         CartApp.getProduct(
             productId
         );


     const max =
         product
             ? Math.max(
                 1,
                 Number(product.stock) || 1
             )
             : 99;


     let quantity =
         Number(item.quantity) || 1;


     quantity += change;


     quantity =
         Math.max(
             1,
             Math.min(
                 max,
                 quantity
             )
         );


     item.quantity =
         quantity;


     CartApp.saveCart(cart);

     renderCart();

     showToast(
         "Cart updated"
     );
 }


 /* =========================================================
    UPDATE QUANTITY
 ========================================================= */

 function updateCartQuantity(
     productId,
     quantity
 ) {

     const cart =
         CartApp.getCart();


     const item =
         cart.find(
             cartItem =>
                 Number(cartItem.id) ===
                 Number(productId)
         );


     if (!item) {
         return;
     }


     const product =
         CartApp.getProduct(
             productId
         );


     const max =
         product
             ? Math.max(
                 1,
                 Number(product.stock) || 1
             )
             : 99;


     quantity =
         Math.max(
             1,
             Math.min(
                 max,
                 Number(quantity) || 1
             )
         );


     item.quantity =
         quantity;


     CartApp.saveCart(cart);

     renderCart();
 }


 /* =========================================================
    REMOVE CART ITEM
 ========================================================= */

 function removeCartItem(
     productId
 ) {

     const cart =
         CartApp.getCart();


     const product =
         CartApp.getProduct(
             productId
         );


     const updatedCart =
         cart.filter(
             item =>
                 Number(item.id) !==
                 Number(productId)
         );


     CartApp.saveCart(
         updatedCart
     );


     renderCart();


     showToast(
         product
             ? `${product.name} removed from cart`
             : "Product removed from cart"
     );
 }


 /* =========================================================
    CLEAR CART
 ========================================================= */

 function clearCart() {

     const cart =
         CartApp.getCart();


     if (!cart.length) {
         return;
     }


     CartApp.saveCart([]);


     renderCart();

     updateCartSummary();


     showToast(
         "Cart cleared"
     );
 }


 /* =========================================================
    CART SUMMARY
 ========================================================= */

 function updateCartSummary() {

     const cart =
         CartApp.getCart();


     let subtotal = 0;

     let itemCount = 0;


     cart.forEach(item => {

         const product =
             CartApp.getProduct(
                 item.id
             );


         if (!product) {
             return;
         }


         const quantity =
             Math.max(
                 1,
                 Number(item.quantity) || 1
             );


         subtotal +=
             Number(product.price) *
             quantity;


         itemCount +=
             quantity;
     });


     /*
        Free delivery above ₹2,000.
        Otherwise delivery is ₹99.
     */

     const delivery =
         subtotal === 0
             ? 0
             : subtotal >= 2000
                 ? 0
                 : 99;


     const discount =
         calculateCartDiscount(
             subtotal
         );


     const total =
         Math.max(
             0,
             subtotal +
             delivery -
             discount
         );


     setCartSummaryValue(
         "#cartSubtotal",
         subtotal
     );


     setCartSummaryValue(
         "#cartDelivery",
         delivery
     );


     setCartSummaryValue(
         "#cartDiscount",
         discount
     );


     setCartSummaryValue(
         "#cartTotal",
         total
     );


     document
         .querySelectorAll(
             "[data-cart-subtotal]"
         )
         .forEach(element => {

             element.textContent =
                 NexoraStore.formatPrice(
                     subtotal
                 );
         });


     document
         .querySelectorAll(
             "[data-cart-delivery]"
         )
         .forEach(element => {

             element.textContent =
                 delivery === 0
                     ? "FREE"
                     : NexoraStore.formatPrice(
                         delivery
                       );
         });


     document
         .querySelectorAll(
             "[data-cart-discount]"
         )
         .forEach(element => {

             element.textContent =
                 discount > 0
                     ? `- ${NexoraStore.formatPrice(
                         discount
                       )}`
                     : NexoraStore.formatPrice(
                         0
                       );
         });


     document
         .querySelectorAll(
             "[data-cart-total]"
         )
         .forEach(element => {

             element.textContent =
                 NexoraStore.formatPrice(
                     total
                 );
         });


     document
         .querySelectorAll(
             "[data-cart-items-count]"
         )
         .forEach(element => {

             element.textContent =
                 itemCount;
         });


     updateCheckoutButton(
         cart.length > 0
     );
 }


 /* =========================================================
    CART DISCOUNT
 ========================================================= */

 function calculateCartDiscount(
     subtotal
 ) {

     /*
        Demo project discount rules.
     */

     if (subtotal >= 50000) {
         return subtotal * 0.08;
     }


     if (subtotal >= 25000) {
         return subtotal * 0.05;
     }


     if (subtotal >= 10000) {
         return subtotal * 0.03;
     }


     return 0;
 }


 /* =========================================================
    SET SUMMARY VALUE
 ========================================================= */

 function setCartSummaryValue(
     selector,
     value
 ) {

     const element =
         document.querySelector(
             selector
         );


     if (!element) {
         return;
     }


     element.textContent =
         NexoraStore.formatPrice(
             value
         );
 }


 /* =========================================================
    CHECKOUT BUTTON
 ========================================================= */

 function updateCheckoutButton(
     hasItems
 ) {

     document
         .querySelectorAll(
             "#checkoutButton, .checkout-btn, [data-checkout]"
         )
         .forEach(button => {

             button.disabled =
                 !hasItems;


             if (!hasItems) {

                 button.classList.add(
                     "disabled"
                 );

             } else {

                 button.classList.remove(
                     "disabled"
                 );
             }
         });
 }


 /* =========================================================
    CHECKOUT REDIRECT
 ========================================================= */

 document.addEventListener(
     "click",
     event => {

         const button =
             event.target.closest(
                 "#checkoutButton, [data-checkout]"
             );


         if (!button) {
             return;
         }


         event.preventDefault();


         const cart =
             CartApp.getCart();


         if (!cart.length) {

             showToast(
                 "Your cart is empty."
             );

             return;
         }


         window.location.href =
             "checkout.html";
     }
 );


 /* =========================================================
    CLEAR CART BUTTON
 ========================================================= */

 document.addEventListener(
     "click",
     event => {

         const button =
             event.target.closest(
                 "#clearCart, .clear-cart, [data-clear-cart]"
             );


         if (!button) {
             return;
         }


         event.preventDefault();


         const confirmed =
             window.confirm(
                 "Are you sure you want to clear your cart?"
             );


         if (!confirmed) {
             return;
         }


         clearCart();
     }
 );


 /* =========================================================
    CART PAGE REFRESH
 ========================================================= */

 window.addEventListener(
     "storage",
     event => {

         if (
             event.key ===
             "nexoraCart"
         ) {

             renderCart();

             updateCartSummary();
         }
     }
 );


 /* =========================================================
    GLOBAL ACCESS
 ========================================================= */

 window.NexoraCart = {
     renderCart,
     updateCartSummary,
     changeCartQuantity,
     updateCartQuantity,
     removeCartItem,
     clearCart
 };