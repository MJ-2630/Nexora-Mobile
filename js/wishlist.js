
/* =========================================================
   NEXORA MOBILES - WISHLIST
   ========================================================= */

(function () {
    "use strict";

    const WISHLIST_KEY = "nexoraWishlist";
    const CART_KEY = "nexoraCart";

    const wishlistGrid = document.getElementById("wishlistGrid");
    const wishlistEmpty = document.getElementById("wishlistEmpty");


    /* =========================================================
       STORAGE HELPERS
       ========================================================= */

    function getWishlist() {
        try {
            const data = JSON.parse(
                localStorage.getItem(WISHLIST_KEY)
            );

            return Array.isArray(data) ? data : [];
        } catch (error) {
            return [];
        }
    }


    function saveWishlist(items) {
        localStorage.setItem(
            WISHLIST_KEY,
            JSON.stringify(items)
        );
    }


    function getCart() {
        try {
            const data = JSON.parse(
                localStorage.getItem(CART_KEY)
            );

            return Array.isArray(data) ? data : [];
        } catch (error) {
            return [];
        }
    }


    function saveCart(items) {
        localStorage.setItem(
            CART_KEY,
            JSON.stringify(items)
        );
    }


    /* =========================================================
       PRODUCT FINDER
       ========================================================= */

    function findProduct(productId) {

        if (
            !window.NexoraStore ||
            !Array.isArray(window.NexoraStore.products)
        ) {
            return null;
        }

        return window.NexoraStore.products.find(
            product =>
                String(product.id) === String(productId)
        ) || null;
    }


    /* =========================================================
       FORMATTERS
       ========================================================= */

    function formatPrice(price) {
        return "₹" + Number(price || 0).toLocaleString("en-IN");
    }


    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =========================================================
       PRODUCT CARD
       ========================================================= */

    function createWishlistCard(product) {

        const productId = escapeHTML(product.id);
        const name = escapeHTML(product.name);
        const brand = escapeHTML(product.brand || "");
        const image = escapeHTML(
            product.image ||
            "images/products/product-placeholder.jpg"
        );

        const price = Number(product.price || 0);

        const oldPrice =
            product.oldPrice ||
            product.originalPrice ||
            null;

        const discount =
            product.discount ||
            (
                oldPrice && oldPrice > price
                    ? Math.round(
                        ((oldPrice - price) / oldPrice) * 100
                    )
                    : 0
            );


        return `
            <article class="product-card wishlist-product-card">

                <div class="product-card-image">

                    ${
                        discount > 0
                            ? `
                                <span class="product-badge">
                                    ${discount}% OFF
                                </span>
                            `
                            : ""
                    }

                    <button
                        type="button"
                        class="product-wishlist-btn active"
                        data-remove-wishlist="${productId}"
                        aria-label="Remove ${name} from wishlist"
                    >
                        ♥
                    </button>

                    <a
                        href="product.html?id=${encodeURIComponent(product.id)}"
                        class="product-image-link"
                    >
                        <img
                            src="${image}"
                            alt="${name}"
                            loading="lazy"
                            onerror="this.src='images/products/placeholder.jpg'"
                        >
                    </a>

                </div>


                <div class="product-card-content">

                    ${
                        brand
                            ? `
                                <span class="product-brand">
                                    ${brand}
                                </span>
                            `
                            : ""
                    }

                    <h3 class="product-name">
                        <a
                            href="product.html?id=${encodeURIComponent(product.id)}"
                        >
                            ${name}
                        </a>
                    </h3>


                    ${
                        product.rating
                            ? `
                                <div class="product-rating">
                                    <span class="stars">★</span>
                                    <span>
                                        ${escapeHTML(product.rating)}
                                    </span>
                                </div>
                            `
                            : ""
                    }


                    <div class="product-price">

                        <strong>
                            ${formatPrice(price)}
                        </strong>

                        ${
                            oldPrice && Number(oldPrice) > price
                                ? `
                                    <span class="product-old-price">
                                        ${formatPrice(oldPrice)}
                                    </span>
                                `
                                : ""
                        }

                    </div>


                    <div class="wishlist-card-actions">

                        <button
                            type="button"
                            class="btn btn-primary wishlist-add-cart"
                            data-add-cart="${productId}"
                        >
                            Add to Cart
                        </button>

                        <button
                            type="button"
                            class="btn btn-outline wishlist-remove-btn"
                            data-remove-wishlist="${productId}"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            </article>
        `;
    }


    /* =========================================================
       RENDER WISHLIST
       ========================================================= */

    function renderWishlist() {

        if (!wishlistGrid || !wishlistEmpty) {
            return;
        }

        const wishlistIds = getWishlist();

        const products = wishlistIds
            .map(id => findProduct(id))
            .filter(Boolean);


        if (products.length === 0) {

            wishlistGrid.innerHTML = "";

            wishlistEmpty.hidden = false;

            return;
        }


        wishlistEmpty.hidden = true;


        wishlistGrid.innerHTML = products
            .map(createWishlistCard)
            .join("");
    }


    /* =========================================================
       REMOVE FROM WISHLIST
       ========================================================= */

    function removeFromWishlist(productId) {

        const wishlist = getWishlist();

        const updatedWishlist = wishlist.filter(
            id => String(id) !== String(productId)
        );

        saveWishlist(updatedWishlist);

        renderWishlist();

        updateHeaderCounts();

        showToast("Removed from wishlist");
    }


    /* =========================================================
       ADD TO CART
       ========================================================= */

    function addToCart(productId) {

        const product = findProduct(productId);

        if (!product) {
            showToast("Product not found");
            return;
        }


        const cart = getCart();

        const existingItem = cart.find(
            item =>
                String(item.id) === String(product.id)
        );


        if (existingItem) {

            existingItem.quantity =
                Number(existingItem.quantity || 1) + 1;

        } else {

            cart.push({
                id: product.id,
                quantity: 1
            });

        }


        saveCart(cart);

        updateHeaderCounts();

        showToast("Added to cart");
    }


    /* =========================================================
       HEADER COUNTS
       ========================================================= */

    function updateHeaderCounts() {

        const wishlistCount =
            document.getElementById("wishlistCount");

        const cartCount =
            document.getElementById("cartCount");


        if (wishlistCount) {

            wishlistCount.textContent =
                getWishlist().length;

        }


        if (cartCount) {

            const cart = getCart();

            const totalQuantity = cart.reduce(
                (total, item) =>
                    total + Number(item.quantity || 1),
                0
            );

            cartCount.textContent = totalQuantity;

        }
    }


    /* =========================================================
       TOAST
       ========================================================= */

    function showToast(message) {

        const toast =
            document.getElementById("toast");

        const toastMessage =
            document.getElementById("toastMessage");


        if (!toast || !toastMessage) {
            return;
        }


        toastMessage.textContent = message;

        toast.classList.add("show");


        clearTimeout(window.nexoraWishlistToastTimer);


        window.nexoraWishlistToastTimer =
            setTimeout(function () {

                toast.classList.remove("show");

            }, 2500);
    }


    /* =========================================================
       EVENTS
       ========================================================= */

    document.addEventListener("click", function (event) {

        const removeButton =
            event.target.closest(
                "[data-remove-wishlist]"
            );


        if (removeButton) {

            const productId =
                removeButton.dataset.removeWishlist;

            removeFromWishlist(productId);

            return;
        }


        const addCartButton =
            event.target.closest(
                "[data-add-cart]"
            );


        if (addCartButton) {

            const productId =
                addCartButton.dataset.addCart;

            addToCart(productId);

        }

    });


    /* =========================================================
       NEWSLETTER
       ========================================================= */

    const newsletterForm =
        document.getElementById("newsletterForm");


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const email =
                    document.getElementById(
                        "newsletterEmail"
                    );


                if (!email || !email.value.trim()) {
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
       INITIALIZE
       ========================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            renderWishlist();

            updateHeaderCounts();

        }
    );


    /* =========================================================
       PUBLIC API
       ========================================================= */

    window.NexoraWishlist = {
        getWishlist,
        saveWishlist,
        renderWishlist,
        removeFromWishlist,
        addToCart
    };

})();