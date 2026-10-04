/* =========================================================
   NEXORA MOBILES - CHECKOUT JAVASCRIPT
   Checkout form, validation, order summary and confirmation
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initCheckoutPage();
});


/* =========================================================
   CHECKOUT STATE
========================================================= */

const CheckoutApp = {

    getCart() {
        return NexoraApp.getCart();
    },


    getProduct(productId) {
        return NexoraStore.getProductById(
            Number(productId)
        );
    },


    getSubtotal() {

        const cart =
            this.getCart();

        return cart.reduce(
            (total, item) => {

                const product =
                    this.getProduct(
                        item.id
                    );

                if (!product) {
                    return total;
                }

                const quantity =
                    Math.max(
                        1,
                        Number(item.quantity) || 1
                    );

                return total +
                    (
                        Number(product.price) *
                        quantity
                    );

            },
            0
        );
    },


    getDiscount(subtotal) {

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
    },


    getDelivery(subtotal) {

        if (subtotal === 0) {
            return 0;
        }

        return subtotal >= 2000
            ? 0
            : 99;
    },


    getTotal() {

        const subtotal =
            this.getSubtotal();

        const discount =
            this.getDiscount(
                subtotal
            );

        const delivery =
            this.getDelivery(
                subtotal
            );

        return Math.max(
            0,
            subtotal +
            delivery -
            discount
        );
    }
};


/* =========================================================
   INITIALIZE CHECKOUT
========================================================= */

function initCheckoutPage() {

    const checkoutForm =
        document.querySelector(
            "#checkoutForm, .checkout-form, [data-checkout-form]"
        );


    if (!checkoutForm) {
        return;
    }


    const cart =
        CheckoutApp.getCart();


    if (!cart.length) {

        showEmptyCheckout();

        return;
    }


    renderCheckoutItems();

    updateCheckoutSummary();

    initPaymentMethods();

    initFormValidation();

    initPlaceOrder();

    initSameAddress();

    initCheckoutInputs();

    NexoraApp.updateCartCount();
}


/* =========================================================
   RENDER CHECKOUT ITEMS
========================================================= */

function renderCheckoutItems() {

    const container =
        document.querySelector(
            "#checkoutItems, .checkout-items, [data-checkout-items]"
        );


    if (!container) {
        return;
    }


    const cart =
        CheckoutApp.getCart();


    if (!cart.length) {

        container.innerHTML = "";

        return;
    }


    let html = "";


    cart.forEach(item => {

        const product =
            CheckoutApp.getProduct(
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
            <div
                class="checkout-product"
                data-checkout-product="${product.id}"
            >

                <div class="checkout-product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <span class="checkout-product-quantity">
                        ${quantity}
                    </span>

                </div>


                <div class="checkout-product-info">

                    <h4>
                        ${product.name}
                    </h4>

                    <span>
                        ${product.brand}
                    </span>

                </div>


                <strong class="checkout-product-price">

                    ${NexoraStore.formatPrice(
                        itemTotal
                    )}

                </strong>

            </div>
        `;
    });


    container.innerHTML =
        html;
}


/* =========================================================
   CHECKOUT SUMMARY
========================================================= */

function updateCheckoutSummary() {

    const subtotal =
        CheckoutApp.getSubtotal();


    const discount =
        CheckoutApp.getDiscount(
            subtotal
        );


    const delivery =
        CheckoutApp.getDelivery(
            subtotal
        );


    const total =
        CheckoutApp.getTotal();


    setCheckoutPrice(
        "#checkoutSubtotal",
        subtotal
    );


    setCheckoutPrice(
        "#checkoutDiscount",
        discount
    );


    setCheckoutPrice(
        "#checkoutDelivery",
        delivery
    );


    setCheckoutPrice(
        "#checkoutTotal",
        total
    );


    document
        .querySelectorAll(
            "[data-checkout-subtotal]"
        )
        .forEach(element => {

            element.textContent =
                NexoraStore.formatPrice(
                    subtotal
                );
        });


    document
        .querySelectorAll(
            "[data-checkout-discount]"
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
            "[data-checkout-delivery]"
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
            "[data-checkout-total]"
        )
        .forEach(element => {

            element.textContent =
                NexoraStore.formatPrice(
                    total
                );
        });
}


/* =========================================================
   SET PRICE
========================================================= */

function setCheckoutPrice(
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
   PAYMENT METHODS
========================================================= */

function initPaymentMethods() {

    const paymentOptions =
        document.querySelectorAll(
            "input[name='paymentMethod'], [data-payment-method]"
        );


    if (!paymentOptions.length) {
        return;
    }


    paymentOptions.forEach(
        option => {

            option.addEventListener(
                "change",
                () => {

                    updatePaymentUI(
                        option.value
                    );
                }
            );
        }
    );


    const checked =
        document.querySelector(
            "input[name='paymentMethod']:checked"
        );


    if (checked) {

        updatePaymentUI(
            checked.value
        );
    }
}


/* =========================================================
   PAYMENT UI
========================================================= */

function updatePaymentUI(
    method
) {

    document
        .querySelectorAll(
            "[data-payment-content]"
        )
        .forEach(content => {

            const target =
                content.dataset.paymentContent;


            content.classList.toggle(
                "active",
                target === method
            );
        });


    document
        .querySelectorAll(
            ".payment-option"
        )
        .forEach(option => {

            const input =
                option.querySelector(
                    "input"
                );


            option.classList.toggle(
                "active",
                input?.checked
            );
        });
}


/* =========================================================
   FORM VALIDATION
========================================================= */

function initFormValidation() {

    const form =
        document.querySelector(
            "#checkoutForm, .checkout-form, [data-checkout-form]"
        );


    if (!form) {
        return;
    }


    const inputs =
        form.querySelectorAll(
            "input, select, textarea"
        );


    inputs.forEach(input => {

        input.addEventListener(
            "blur",
            () => {

                validateField(
                    input
                );
            }
        );


        input.addEventListener(
            "input",
            () => {

                if (
                    input.classList.contains(
                        "input-error"
                    )
                ) {

                    validateField(
                        input
                    );
                }
            }
        );
    });
}


/* =========================================================
   VALIDATE FIELD
========================================================= */

function validateField(
    field
) {

    if (
        field.type === "hidden" ||
        field.disabled
    ) {
        return true;
    }


    const required =
        field.hasAttribute(
            "required"
        );


    const value =
        field.value.trim();


    if (
        required &&
        !value
    ) {

        markFieldError(
            field,
            "This field is required."
        );

        return false;
    }


    if (
        field.type === "email" &&
        value &&
        !isValidCheckoutEmail(value)
    ) {

        markFieldError(
            field,
            "Please enter a valid email address."
        );

        return false;
    }


    if (
        field.type === "tel" &&
        value &&
        !isValidPhone(value)
    ) {

        markFieldError(
            field,
            "Please enter a valid phone number."
        );

        return false;
    }


    clearFieldError(
        field
    );


    return true;
}


/* =========================================================
   ERROR STATE
========================================================= */

function markFieldError(
    field,
    message
) {

    field.classList.add(
        "input-error"
    );


    const wrapper =
        field.closest(
            ".form-group, .input-group, .field"
        );


    if (!wrapper) {
        return;
    }


    let error =
        wrapper.querySelector(
            ".field-error"
        );


    if (!error) {

        error =
            document.createElement(
                "small"
            );

        error.className =
            "field-error";

        wrapper.appendChild(
            error
        );
    }


    error.textContent =
        message;
}


function clearFieldError(
    field
) {

    field.classList.remove(
        "input-error"
    );


    const wrapper =
        field.closest(
            ".form-group, .input-group, .field"
        );


    const error =
        wrapper?.querySelector(
            ".field-error"
        );


    if (error) {
        error.remove();
    }
}


/* =========================================================
   VALIDATE COMPLETE FORM
========================================================= */

function validateCheckoutForm(
    form
) {

    let valid = true;


    const requiredFields =
        form.querySelectorAll(
            "input[required], select[required], textarea[required]"
        );


    requiredFields.forEach(
        field => {

            const fieldValid =
                validateField(
                    field
                );


            if (!fieldValid) {
                valid = false;
            }
        }
    );


    const payment =
        form.querySelector(
            "input[name='paymentMethod']:checked"
        );


    if (!payment) {

        showToast(
            "Please select a payment method."
        );

        valid = false;
    }


    if (!valid) {

        const firstError =
            form.querySelector(
                ".input-error"
            );


        firstError?.focus();
    }


    return valid;
}


/* =========================================================
   PLACE ORDER
========================================================= */

function initPlaceOrder() {

    const form =
        document.querySelector(
            "#checkoutForm, .checkout-form, [data-checkout-form]"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (
                !validateCheckoutForm(
                    form
                )
            ) {
                return;
            }


            placeOrder(
                form
            );
        }
    );
}


/* =========================================================
   PLACE ORDER
========================================================= */

function placeOrder(
    form
) {

    const cart =
        CheckoutApp.getCart();


    if (!cart.length) {

        showToast(
            "Your cart is empty."
        );

        return;
    }


    const formData =
        new FormData(
            form
        );


    const customer = {

        firstName:
            formData.get(
                "firstName"
            ) || "",

        lastName:
            formData.get(
                "lastName"
            ) || "",

        email:
            formData.get(
                "email"
            ) || "",

        phone:
            formData.get(
                "phone"
            ) || "",

        address:
            formData.get(
                "address"
            ) || "",

        city:
            formData.get(
                "city"
            ) || "",

        state:
            formData.get(
                "state"
            ) || "",

        pincode:
            formData.get(
                "pincode"
            ) || "",

        paymentMethod:
            formData.get(
                "paymentMethod"
            ) || ""
    };


    const orderId =
        generateOrderId();


    const subtotal =
        CheckoutApp.getSubtotal();


    const discount =
        CheckoutApp.getDiscount(
            subtotal
        );


    const delivery =
        CheckoutApp.getDelivery(
            subtotal
        );


    const total =
        CheckoutApp.getTotal();


    const order = {

        orderId,

        createdAt:
            new Date().toISOString(),

        customer,

        items:
            cart.map(item => {

                const product =
                    CheckoutApp.getProduct(
                        item.id
                    );


                return {

                    id:
                        product?.id,

                    name:
                        product?.name,

                    brand:
                        product?.brand,

                    price:
                        product?.price,

                    quantity:
                        Number(
                            item.quantity
                        ) || 1,

                    image:
                        product?.image
                };
            }),

        pricing: {

            subtotal,

            discount,

            delivery,

            total
        },

        status:
            "Order Placed"
    };


    saveOrder(
        order
    );


    showOrderSuccess(
        order
    );


    /*
       Clear cart only after
       successful order creation.
    */

    localStorage.removeItem(
        "nexoraCart"
    );


    NexoraApp.updateCartCount();
}


/* =========================================================
   ORDER ID
========================================================= */

function generateOrderId() {

    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        String(
            now.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const random =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return `NX${year}${month}${random}`;
}


/* =========================================================
   SAVE ORDER
========================================================= */

function saveOrder(
    order
) {

    let orders = [];


    try {

        orders =
            JSON.parse(
                localStorage.getItem(
                    "nexoraOrders"
                )
            ) || [];

    } catch (error) {

        orders = [];
    }


    orders.push(
        order
    );


    localStorage.setItem(
        "nexoraOrders",
        JSON.stringify(
            orders
        )
    );


    localStorage.setItem(
        "nexoraLastOrder",
        JSON.stringify(
            order
        )
    );
}


/* =========================================================
   ORDER SUCCESS
========================================================= */

function showOrderSuccess(
    order
) {

    const form =
        document.querySelector(
            "#checkoutForm, .checkout-form, [data-checkout-form]"
        );


    const checkoutLayout =
        document.querySelector(
            ".checkout-layout, .checkout-content, [data-checkout-layout]"
        );


    if (form) {

        form.style.display =
            "none";
    }


    if (checkoutLayout) {

        checkoutLayout.style.display =
            "none";
    }


    let success =
        document.querySelector(
            "#orderSuccess, .order-success"
        );


    if (!success) {

        success =
            document.createElement(
                "section"
            );

        success.id =
            "orderSuccess";

        success.className =
            "order-success";


        document
            .querySelector(
                "main"
            )
            ?.appendChild(
                success
            );
    }


    success.innerHTML = `
        <div class="order-success-inner">

            <div class="order-success-icon">
                <i class="fa-solid fa-check"></i>
            </div>


            <span class="success-label">
                Order Confirmed
            </span>


            <h1>
                Thank you for your order
            </h1>


            <p>
                Your order has been placed successfully.
                We have received your order details.
            </p>


            <div class="order-number">

                <span>
                    Order Number
                </span>

                <strong>
                    ${order.orderId}
                </strong>

            </div>


            <div class="success-summary">

                <div>
                    <span>Payment</span>
                    <strong>
                        ${formatPaymentMethod(
                            order.customer.paymentMethod
                        )}
                    </strong>
                </div>


                <div>
                    <span>Total</span>
                    <strong>
                        ${NexoraStore.formatPrice(
                            order.pricing.total
                        )}
                    </strong>
                </div>

            </div>


            <div class="success-actions">

                <a
                    href="shop.html"
                    class="btn btn-primary"
                >
                    Continue Shopping
                </a>


                <a
                    href="index.html"
                    class="btn btn-outline"
                >
                    Back to Home
                </a>

            </div>

        </div>
    `;


    success.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   PAYMENT METHOD LABEL
========================================================= */

function formatPaymentMethod(
    method
) {

    const methods = {

        cod:
            "Cash on Delivery",

        upi:
            "UPI Payment",

        card:
            "Credit / Debit Card",

        netbanking:
            "Net Banking"
    };


    return (
        methods[method] ||
        method ||
        "Payment"
    );
}


/* =========================================================
   SAME ADDRESS
========================================================= */

function initSameAddress() {

    const checkbox =
        document.querySelector(
            "#sameAddress, [data-same-address]"
        );


    if (!checkbox) {
        return;
    }


    checkbox.addEventListener(
        "change",
        () => {

            const shippingFields =
                document.querySelector(
                    "#shippingAddress, [data-shipping-address]"
                );


            if (!shippingFields) {
                return;
            }


            shippingFields.classList.toggle(
                "hidden",
                checkbox.checked
            );


            if (
                checkbox.checked
            ) {

                const billingAddress =
                    document.querySelector(
                        "[name='address']"
                    );


                const shippingAddress =
                    shippingFields.querySelector(
                        "[name='shippingAddress']"
                    );


                if (
                    billingAddress &&
                    shippingAddress
                ) {

                    shippingAddress.value =
                        billingAddress.value;
                }
            }
        }
    );
}


/* =========================================================
   CHECKOUT INPUT HELPERS
========================================================= */

function initCheckoutInputs() {

    const phoneInputs =
        document.querySelectorAll(
            "input[name='phone'], input[type='tel']"
        );


    phoneInputs.forEach(
        input => {

            input.addEventListener(
                "input",
                () => {

                    input.value =
                        input.value
                            .replace(
                                /[^0-9+ ]/g,
                                ""
                            );
                }
            );
        }
    );


    const pincodeInputs =
        document.querySelectorAll(
            "input[name='pincode'], input[name='postalCode']"
        );


    pincodeInputs.forEach(
        input => {

            input.addEventListener(
                "input",
                () => {

                    input.value =
                        input.value
                            .replace(
                                /\D/g,
                                ""
                            )
                            .slice(
                                0,
                                6
                            );
                }
            );
        }
    );
}


/* =========================================================
   VALIDATION HELPERS
========================================================= */

function isValidCheckoutEmail(
    email
) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);
}


function isValidPhone(
    phone
) {

    const cleaned =
        phone.replace(
            /\D/g,
            ""
        );


    return (
        cleaned.length >= 10 &&
        cleaned.length <= 12
    );
}


/* =========================================================
   EMPTY CHECKOUT
========================================================= */

function showEmptyCheckout() {

    const main =
        document.querySelector(
            "main"
        );


    if (!main) {
        return;
    }


    main.innerHTML = `
        <section class="empty-checkout">

            <div class="empty-checkout-icon">
                <i class="fa-solid fa-cart-shopping"></i>
            </div>

            <h1>
                Your cart is empty
            </h1>

            <p>
                Add some products before
                proceeding to checkout.
            </p>

            <a
                href="shop.html"
                class="btn btn-primary"
            >
                Browse Products
            </a>

        </section>
    `;
}


/* =========================================================
   GLOBAL ACCESS
========================================================= */

window.NexoraCheckout = {
    getSubtotal:
        () => CheckoutApp.getSubtotal(),

    getDiscount:
        subtotal =>
            CheckoutApp.getDiscount(
                subtotal
            ),

    getDelivery:
        subtotal =>
            CheckoutApp.getDelivery(
                subtotal
            ),

    getTotal:
        () =>
            CheckoutApp.getTotal(),

    generateOrderId
};