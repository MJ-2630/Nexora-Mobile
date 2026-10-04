/* =========================================================
   NEXORA MOBILES - PRODUCT DETAILS JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initProductPage();
});


/* =========================================================
   INITIALIZE PRODUCT PAGE
========================================================= */

function initProductPage() {

    if (!window.NexoraStore) {
        return;
    }

    const product =
        getCurrentProduct();

    if (!product) {
        showProductNotFound();
        return;
    }

    renderProductDetails(product);
    renderRelatedProducts(product);

    initProductQuantity(product);
    initProductActions(product);
    initProductGallery(product);

    updateProductWishlistState(product.id);
}


/* =========================================================
   GET CURRENT PRODUCT
========================================================= */

function getCurrentProduct() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const productId =
        params.get("id");

    const slug =
        params.get("slug");


    if (productId) {

        return NexoraStore.getProductById(
            Number(productId)
        );
    }


    if (slug) {

        return NexoraStore.getProductBySlug(
            slug
        );
    }


    return null;
}


/* =========================================================
   RENDER PRODUCT DETAILS
========================================================= */

function renderProductDetails(product) {

    setText(
        "#productBrand",
        product.brand
    );

    setText(
        "#productName",
        product.name
    );

    setText(
        "#productPrice",
        NexoraStore.formatPrice(
            product.price
        )
    );


    const oldPrice =
        document.querySelector(
            "#productOldPrice"
        );

    if (oldPrice) {

        if (product.oldPrice) {

            oldPrice.textContent =
                NexoraStore.formatPrice(
                    product.oldPrice
                );

            oldPrice.style.display =
                "inline";
        } else {

            oldPrice.style.display =
                "none";
        }
    }


    setText(
        "#productDiscount",
        product.discount
            ? `${product.discount}% OFF`
            : ""
    );


    setText(
        "#productRating",
        product.rating
            ? product.rating.toFixed(1)
            : "0.0"
    );


    setText(
        "#productReviews",
        product.reviews
            ? `(${product.reviews} reviews)`
            : "(0 reviews)"
    );


    setText(
        "#productDescription",
        product.description
    );


    setText(
        "#productColor",
        product.color
    );


    setText(
        "#productRam",
        product.ram
    );


    setText(
        "#productStorage",
        product.storage
    );


    setText(
        "#productProcessor",
        product.processor
    );


    setText(
        "#productDisplay",
        product.display
    );


    setText(
        "#productCamera",
        product.camera
    );


    setText(
        "#productBattery",
        product.battery
    );


    setText(
        "#productStock",
        product.stock > 0
            ? `${product.stock} units available`
            : "Out of stock"
    );


    /* Main image */

    const mainImage =
        document.querySelector(
            "#productMainImage, .product-main-image img"
        );

    if (mainImage) {

        mainImage.src =
            product.image;

        mainImage.alt =
            product.name;
    }


    /* Badge */

    const badge =
        document.querySelector(
            "#productBadge, .product-detail-badge"
        );

    if (badge) {

        if (product.badge) {

            badge.textContent =
                product.badge;

            badge.style.display =
                "inline-flex";

        } else {

            badge.style.display =
                "none";
        }
    }


    /* Rating stars */

    const stars =
        document.querySelector(
            "#productStars, .product-detail-stars"
        );

    if (stars) {

        stars.innerHTML =
            createProductStars(
                product.rating
            );
    }


    /* Breadcrumb */

    setText(
        "#breadcrumbProduct",
        product.name
    );


    /* Page title */

    document.title =
        `${product.name} | Nexora Mobiles`;
}


/* =========================================================
   PRODUCT NOT FOUND
========================================================= */

function showProductNotFound() {

    const container =
        document.querySelector(
            "#productPage, .product-detail-page, [data-product-page]"
        );


    if (!container) {
        return;
    }


    container.innerHTML = `
        <div class="product-not-found">

            <div class="not-found-icon">
                <i class="fa-solid fa-mobile-screen-button"></i>
            </div>

            <h2>Product Not Found</h2>

            <p>
                The product you're looking for is
                unavailable or the link is incorrect.
            </p>

            <a
                href="shop.html"
                class="btn btn-primary"
            >
                Browse Products
            </a>

        </div>
    `;
}


/* =========================================================
   TEXT HELPER
========================================================= */

function setText(
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
        value ?? "";
}


/* =========================================================
   PRODUCT STARS
========================================================= */

function createProductStars(
    rating
) {

    const rounded =
        Math.round(
            Number(rating) || 0
        );


    let html = "";


    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        html +=
            i <= rounded
                ? `<i class="fa-solid fa-star"></i>`
                : `<i class="fa-regular fa-star"></i>`;
    }


    return html;
}


/* =========================================================
   QUANTITY
========================================================= */

function initProductQuantity(
    product
) {

    const quantityInput =
        document.querySelector(
            "#productQuantity, .product-quantity-input, [data-product-quantity]"
        );


    const minusButton =
        document.querySelector(
            ".quantity-minus, [data-quantity-minus]"
        );


    const plusButton =
        document.querySelector(
            ".quantity-plus, [data-quantity-plus]"
        );


    if (!quantityInput) {
        return;
    }


    quantityInput.value = 1;

    quantityInput.min = 1;

    quantityInput.max =
        Math.max(
            1,
            Number(product.stock) || 1
        );


    minusButton?.addEventListener(
        "click",
        () => {

            let quantity =
                Number(
                    quantityInput.value
                ) || 1;


            quantity =
                Math.max(
                    1,
                    quantity - 1
                );


            quantityInput.value =
                quantity;
        }
    );


    plusButton?.addEventListener(
        "click",
        () => {

            let quantity =
                Number(
                    quantityInput.value
                ) || 1;


            const max =
                Number(product.stock) || 1;


            quantity =
                Math.min(
                    max,
                    quantity + 1
                );


            quantityInput.value =
                quantity;
        }
    );


    quantityInput.addEventListener(
        "input",
        () => {

            let quantity =
                Number(
                    quantityInput.value
                ) || 1;


            const max =
                Number(product.stock) || 1;


            quantity =
                Math.max(
                    1,
                    Math.min(
                        max,
                        quantity
                    )
                );


            quantityInput.value =
                quantity;
        }
    );
}


/* =========================================================
   PRODUCT ACTIONS
========================================================= */

function initProductActions(
    product
) {

    const addButton =
        document.querySelector(
            "#productAddToCart, [data-product-add-cart]"
        );


    const buyButton =
        document.querySelector(
            "#productBuyNow, [data-product-buy]"
        );


    const wishlistButton =
        document.querySelector(
            "#productWishlist, [data-product-wishlist]"
        );


    const quantityInput =
        document.querySelector(
            "#productQuantity, .product-quantity-input, [data-product-quantity]"
        );


    /* Add to cart */

    addButton?.addEventListener(
        "click",
        () => {

            if (
                Number(product.stock) <= 0
            ) {

                showToast(
                    "This product is currently out of stock."
                );

                return;
            }


            const quantity =
                Math.max(
                    1,
                    Number(
                        quantityInput?.value
                    ) || 1
                );


            NexoraApp.addToCart(
                product.id,
                quantity
            );
        }
    );


    /* Buy now */

    buyButton?.addEventListener(
        "click",
        () => {

            if (
                Number(product.stock) <= 0
            ) {

                showToast(
                    "This product is currently out of stock."
                );

                return;
            }


            const quantity =
                Math.max(
                    1,
                    Number(
                        quantityInput?.value
                    ) || 1
                );


            NexoraApp.addToCart(
                product.id,
                quantity
            );


            setTimeout(() => {

                window.location.href =
                    "checkout.html";

            }, 250);
        }
    );


    /* Wishlist */

    wishlistButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();

            NexoraApp.toggleWishlist(
                product.id
            );

            updateProductWishlistState(
                product.id
            );
        }
    );
}


/* =========================================================
   UPDATE PRODUCT WISHLIST
========================================================= */

function updateProductWishlistState(
    productId
) {

    const button =
        document.querySelector(
            "#productWishlist, [data-product-wishlist]"
        );


    if (!button) {
        return;
    }


    const wishlist =
        NexoraApp.getWishlist();


    const active =
        wishlist.includes(
            Number(productId)
        );


    button.classList.toggle(
        "active",
        active
    );


    button.setAttribute(
        "aria-pressed",
        active
            ? "true"
            : "false"
    );


    const icon =
        button.querySelector("i");


    if (icon) {

        icon.className =
            active
                ? "fa-solid fa-heart"
                : "fa-regular fa-heart";
    }


    const text =
        button.querySelector(
            ".wishlist-text"
        );


    if (text) {

        text.textContent =
            active
                ? "Remove from Wishlist"
                : "Add to Wishlist";
    }
}


/* =========================================================
   PRODUCT GALLERY
========================================================= */

function initProductGallery(
    product
) {

    const mainImage =
        document.querySelector(
            "#productMainImage, .product-main-image img"
        );


    const thumbnails =
        document.querySelectorAll(
            ".product-thumbnail, [data-product-thumbnail]"
        );


    if (!mainImage || !thumbnails.length) {
        return;
    }


    thumbnails.forEach(
        thumbnail => {

            thumbnail.addEventListener(
                "click",
                () => {

                    const image =
                        thumbnail.dataset.image ||
                        thumbnail.querySelector("img")?.src;


                    if (!image) {
                        return;
                    }


                    mainImage.src =
                        image;


                    thumbnails.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );
                        }
                    );


                    thumbnail.classList.add(
                        "active"
                    );
                }
            );
        }
    );
}


/* =========================================================
   RELATED PRODUCTS
========================================================= */

function renderRelatedProducts(
    product
) {

    const container =
        document.querySelector(
            "#relatedProducts, .related-products-grid, [data-related-products]"
        );


    if (!container) {
        return;
    }


    const related =
        NexoraStore.getRelatedProducts(
            product.id,
            4
        );


    if (!related.length) {

        container.innerHTML =
            "";

        return;
    }


    container.innerHTML =
        related
            .map(item =>
                createProductCard(item)
            )
            .join("");


    NexoraApp.updateWishlistButtons();
}


/* =========================================================
   PRODUCT TABS
========================================================= */

function initProductTabs() {

    const tabButtons =
        document.querySelectorAll(
            "[data-product-tab]"
        );


    const tabContents =
        document.querySelectorAll(
            "[data-product-content]"
        );


    if (!tabButtons.length) {
        return;
    }


    tabButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const target =
                        button.dataset.productTab;


                    tabButtons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );
                        }
                    );


                    tabContents.forEach(
                        content => {

                            content.classList.remove(
                                "active"
                            );
                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const content =
                        document.querySelector(
                            `[data-product-content="${target}"]`
                        );


                    content?.classList.add(
                        "active"
                    );
                }
            );
        }
    );
}


/* =========================================================
   STOCK STATUS
========================================================= */

function updateStockStatus(
    product
) {

    const stockElement =
        document.querySelector(
            "#productStockStatus, [data-stock-status]"
        );


    if (!stockElement) {
        return;
    }


    const stock =
        Number(product.stock) || 0;


    stockElement.classList.remove(
        "in-stock",
        "low-stock",
        "out-of-stock"
    );


    if (stock <= 0) {

        stockElement.classList.add(
            "out-of-stock"
        );

        stockElement.textContent =
            "Out of stock";

    } else if (stock <= 5) {

        stockElement.classList.add(
            "low-stock"
        );

        stockElement.textContent =
            `Only ${stock} left`;

    } else {

        stockElement.classList.add(
            "in-stock"
        );

        stockElement.textContent =
            "In stock";
    }
}


/* =========================================================
   BREADCRUMB
========================================================= */

function updateProductBreadcrumb(
    product
) {

    const breadcrumb =
        document.querySelector(
            "#productBreadcrumb, [data-product-breadcrumb]"
        );


    if (!breadcrumb) {
        return;
    }


    breadcrumb.innerHTML = `
        <a href="index.html">Home</a>

        <span>
            <i class="fa-solid fa-chevron-right"></i>
        </span>

        <a href="shop.html">
            Shop
        </a>

        <span>
            <i class="fa-solid fa-chevron-right"></i>
        </span>

        <span>
            ${product.name}
        </span>
    `;
}


/* =========================================================
   START OPTIONAL FEATURES
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initProductTabs();

        const product =
            getCurrentProduct();

        if (product) {

            updateStockStatus(product);

            updateProductBreadcrumb(product);
        }
    }
);


/* =========================================================
   GLOBAL ACCESS
========================================================= */

window.NexoraProduct = {
    getCurrentProduct,
    renderProductDetails,
    renderRelatedProducts,
    updateProductWishlistState
};