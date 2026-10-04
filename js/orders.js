
/* =========================================================
   NEXORA MOBILES - ORDERS
   ========================================================= */

(function () {
    "use strict";

    const ORDERS_KEY = "nexoraOrders";

    const ordersList =
        document.getElementById("ordersList");

    const ordersEmpty =
        document.getElementById("ordersEmpty");


    /* =========================================================
       STORAGE
       ========================================================= */

    function getOrders() {

        try {

            const data =
                JSON.parse(
                    localStorage.getItem(ORDERS_KEY)
                );

            return Array.isArray(data) ? data : [];

        } catch (error) {

            return [];

        }
    }


    /* =========================================================
       HELPERS
       ========================================================= */

    function formatPrice(price) {

        return "₹" +
            Number(price || 0).toLocaleString("en-IN");

    }


    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function formatDate(dateValue) {

        if (!dateValue) {
            return "—";
        }

        const date = new Date(dateValue);

        if (isNaN(date.getTime())) {
            return String(dateValue);
        }

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    }


    function getPaymentName(method) {

        const paymentNames = {

            cod: "Cash on Delivery",

            upi: "UPI",

            card: "Credit / Debit Card",

            netbanking: "Net Banking"

        };

        return paymentNames[method] ||
            method ||
            "—";
    }


    function getStatusClass(status) {

        const value =
            String(status || "Processing")
                .toLowerCase()
                .replace(/\s+/g, "-");

        return value;
    }


    /* =========================================================
       PRODUCT INFORMATION
       ========================================================= */

    function getProduct(productId) {

        if (
            !window.NexoraStore ||
            !Array.isArray(
                window.NexoraStore.products
            )
        ) {
            return null;
        }

        return window.NexoraStore.products.find(
            product =>
                String(product.id) ===
                String(productId)
        ) || null;
    }


    /* =========================================================
       ORDER ITEMS
       ========================================================= */

    function renderOrderItems(order) {

        const items =
            Array.isArray(order.items)
                ? order.items
                : [];


        if (!items.length) {

            return `
                <div class="order-no-items">
                    <p>Order item details unavailable.</p>
                </div>
            `;
        }


        return items.map(function (item) {

            const product =
                getProduct(item.id);


            const name =
                item.name ||
                (product && product.name) ||
                "Product";


            const image =
                item.image ||
                (product && product.image) ||
                "images/products/product-placeholder.jpg";


            const price =
                Number(
                    item.price ||
                    (product && product.price) ||
                    0
                );


            const quantity =
                Number(item.quantity || 1);


            return `
                <div class="order-product">

                    <div class="order-product-image">

                        <img
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(name)}"
                            loading="lazy"
                            onerror="this.src='images/products/product-placeholder.jpg'"
                        >

                    </div>


                    <div class="order-product-info">

                        <h4>
                            ${escapeHTML(name)}
                        </h4>

                        <p>
                            Qty: ${quantity}
                        </p>

                    </div>


                    <div class="order-product-price">

                        ${formatPrice(
                            price * quantity
                        )}

                    </div>

                </div>
            `;

        }).join("");
    }


    /* =========================================================
       ORDER CARD
       ========================================================= */

    function createOrderCard(order, index) {

        const orderNumber =
            order.orderNumber ||
            order.id ||
            `NX-${String(index + 1).padStart(6, "0")}`;


        const orderDate =
            order.date ||
            order.createdAt;


        const paymentMethod =
            getPaymentName(
                order.paymentMethod
            );


        const total =
            Number(
                order.total ||
                order.grandTotal ||
                order.amount ||
                0
            );


        const status =
            order.status ||
            "Processing";


        const statusClass =
            getStatusClass(status);


        const itemCount =
            Array.isArray(order.items)
                ? order.items.reduce(
                    function (totalItems, item) {
                        return totalItems +
                            Number(item.quantity || 1);
                    },
                    0
                )
                : 0;


        return `
            <article
                class="order-card"
                data-order-id="${escapeHTML(orderNumber)}"
            >

                <!-- Order Header -->
                <div class="order-card-header">

                    <div class="order-card-number">

                        <span>
                            Order Number
                        </span>

                        <strong>
                            ${escapeHTML(orderNumber)}
                        </strong>

                    </div>


                    <div class="order-status ${statusClass}">
                        ${escapeHTML(status)}
                    </div>

                </div>


                <!-- Order Meta -->
                <div class="order-card-meta">

                    <div class="order-meta-item">

                        <span class="meta-label">
                            Order Date
                        </span>

                        <strong>
                            ${formatDate(orderDate)}
                        </strong>

                    </div>


                    <div class="order-meta-item">

                        <span class="meta-label">
                            Payment
                        </span>

                        <strong>
                            ${escapeHTML(paymentMethod)}
                        </strong>

                    </div>


                    <div class="order-meta-item">

                        <span class="meta-label">
                            Items
                        </span>

                        <strong>
                            ${itemCount}
                        </strong>

                    </div>


                    <div class="order-meta-item">

                        <span class="meta-label">
                            Total
                        </span>

                        <strong>
                            ${formatPrice(total)}
                        </strong>

                    </div>

                </div>


                <!-- Products -->
                <div class="order-products">

                    ${renderOrderItems(order)}

                </div>


                <!-- Order Footer -->
                <div class="order-card-footer">

                    <div class="order-delivery">

                        <span class="delivery-dot"></span>

                        <span>
                            ${
                                status.toLowerCase() === "delivered"
                                    ? "Your order has been delivered."
                                    : "Your order is being processed."
                            }
                        </span>

                    </div>


                    <div class="order-actions">

                        <a
                            href="shop.html"
                            class="btn btn-outline order-shop-btn"
                        >
                            Continue Shopping
                        </a>

                    </div>

                </div>

            </article>
        `;
    }


    /* =========================================================
       RENDER ORDERS
       ========================================================= */

    function renderOrders() {

        if (!ordersList || !ordersEmpty) {
            return;
        }


        const orders = getOrders();


        if (!orders.length) {

            ordersList.innerHTML = "";

            ordersEmpty.hidden = false;

            return;
        }


        ordersEmpty.hidden = true;


        ordersList.innerHTML =
            orders.map(
                createOrderCard
            ).join("");
    }


    /* =========================================================
       NEWSLETTER
       ========================================================= */

    function setupNewsletter() {

        const newsletterForm =
            document.getElementById(
                "newsletterForm"
            );


        if (!newsletterForm) {
            return;
        }


        newsletterForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const email =
                    document.getElementById(
                        "newsletterEmail"
                    );


                if (!email ||
                    !email.value.trim()) {
                    return;
                }


                showToast(
                    "Thanks for subscribing!"
                );


                newsletterForm.reset();

            }
        );
    }


    /* =========================================================
       TOAST
       ========================================================= */

    function showToast(message) {

        const toast =
            document.getElementById("toast");

        const toastMessage =
            document.getElementById(
                "toastMessage"
            );


        if (!toast || !toastMessage) {
            return;
        }


        toastMessage.textContent = message;

        toast.classList.add("show");


        clearTimeout(
            window.nexoraOrdersToastTimer
        );


        window.nexoraOrdersToastTimer =
            setTimeout(function () {

                toast.classList.remove("show");

            }, 2500);
    }


    /* =========================================================
       INITIALIZE
       ========================================================= */

    function initializeOrdersPage() {

        renderOrders();

        setupNewsletter();

    }


    document.addEventListener(
        "DOMContentLoaded",
        initializeOrdersPage
    );


    /* =========================================================
       PUBLIC API
       ========================================================= */

    window.NexoraOrders = {

        getOrders,

        renderOrders,

        formatDate,

        getPaymentName

    };

})();
