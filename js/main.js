/* =========================================================
   NEXORA MOBILES - MAIN JAVASCRIPT
   Common functionality for all pages
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initMobileNavigation();
    initHeaderScroll();
    initSearch();
    initCartAndWishlist();
    initWishlistButtons();
    initAddToCartButtons();
    initNewsletter();
    initCurrentYear();
    renderHomeProducts();
});


/* =========================================================
   STORAGE
========================================================= */

const NexoraApp = {

    getCart() {
        try {
            return JSON.parse(localStorage.getItem("nexoraCart")) || [];
        } catch (error) {
            return [];
        }
    },

    saveCart(cart) {
        localStorage.setItem("nexoraCart", JSON.stringify(cart));
        this.updateCartCount();
    },

    getWishlist() {
        try {
            return JSON.parse(localStorage.getItem("nexoraWishlist")) || [];
        } catch (error) {
            return [];
        }
    },

    saveWishlist(wishlist) {
        localStorage.setItem(
            "nexoraWishlist",
            JSON.stringify(wishlist)
        );

        this.updateWishlistCount();
        this.updateWishlistButtons();
    },

    updateCartCount() {
        const cart = this.getCart();

        const count = cart.reduce((total, item) => {
            return total + (Number(item.quantity) || 1);
        }, 0);

        document.querySelectorAll(
            ".cart-count, [data-cart-count]"
        ).forEach(element => {
            element.textContent = count;
        });
    },

    updateWishlistCount() {
        const wishlist = this.getWishlist();

        document.querySelectorAll(
            ".wishlist-count, [data-wishlist-count]"
        ).forEach(element => {
            element.textContent = wishlist.length;
        });
    },

    updateWishlistButtons() {
        const wishlist = this.getWishlist();

        document.querySelectorAll(
            "[data-wishlist-id]"
        ).forEach(button => {

            const id = Number(button.dataset.wishlistId);

            const active = wishlist.includes(id);

            button.classList.toggle("active", active);
            button.setAttribute(
                "aria-pressed",
                active ? "true" : "false"
            );

            const icon = button.querySelector("i");

            if (icon) {
                icon.className = active
                    ? "fa-solid fa-heart"
                    : "fa-regular fa-heart";
            }
        });
    },

    addToCart(productId, quantity = 1) {

        const product = window.NexoraStore?.getProductById(productId);

        if (!product) {
            console.warn("Product not found:", productId);
            return;
        }

        const cart = this.getCart();

        const existingProduct = cart.find(
            item => Number(item.id) === Number(productId)
        );

        if (existingProduct) {

            existingProduct.quantity =
                (Number(existingProduct.quantity) || 1) +
                Number(quantity);

        } else {

            cart.push({
                id: product.id,
                quantity: Number(quantity),
                price: product.price
            });
        }

        this.saveCart(cart);

        showToast(
            `${product.name} added to cart`
        );
    },

    toggleWishlist(productId) {

        const wishlist = this.getWishlist();

        const index = wishlist.indexOf(Number(productId));

        const product =
            window.NexoraStore?.getProductById(productId);

        if (index > -1) {

            wishlist.splice(index, 1);

            this.saveWishlist(wishlist);

            if (product) {
                showToast(
                    `${product.name} removed from wishlist`
                );
            }

        } else {

            wishlist.push(Number(productId));

            this.saveWishlist(wishlist);

            if (product) {
                showToast(
                    `${product.name} added to wishlist`
                );
            }
        }
    }
};


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function initMobileNavigation() {

    const menuToggle = document.querySelector(
        "#mobileMenuBtn, .mobile-menu-btn, .menu-toggle, .mobile-menu-toggle, [data-menu-toggle]"
    );

    const nav = document.querySelector(
        "#navLinks, .nav-links, .main-nav, .nav-menu, .navbar-menu, [data-mobile-menu]"
    );

    const overlay = document.querySelector(
        ".nav-overlay, .menu-overlay"
    );

    if (!menuToggle || !nav) {
        return;
    }

    menuToggle.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("active");

        document.body.classList.toggle(
            "nav-open",
            isOpen
        );

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        /* Change menu icon */
        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.className = isOpen
                ? "bi bi-x-lg"
                : "bi bi-list";
        }

        if (overlay) {
            overlay.classList.toggle(
                "active",
                isOpen
            );
        }
    });


    /* Close menu when clicking a navigation link */

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            document.body.classList.remove(
                "nav-open"
            );

            menuToggle.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = "bi bi-list";
            }

            if (overlay) {
                overlay.classList.remove(
                    "active"
                );
            }
        });

    });


    /* Close by overlay */

    if (overlay) {

        overlay.addEventListener("click", () => {

            nav.classList.remove("active");

            document.body.classList.remove(
                "nav-open"
            );

            menuToggle.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = "bi bi-list";
            }

            overlay.classList.remove("active");
        });

    }


    /* Close when pressing Escape */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") {
            return;
        }

        nav.classList.remove("active");

        document.body.classList.remove(
            "nav-open"
        );

        menuToggle.classList.remove(
            "active"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.className = "bi bi-list";
        }

        if (overlay) {
            overlay.classList.remove("active");
        }
    });
}


/* =========================================================
   HEADER SCROLL
========================================================= */

function initHeaderScroll() {

    const header =
        document.querySelector(
            ".site-header, .main-header, header"
        );

    if (!header) {
        return;
    }

    const handleScroll = () => {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    handleScroll();

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );
}


/* =========================================================
   SEARCH
========================================================= */

function initSearch() {

    const searchButtons =
        document.querySelectorAll(
            ".search-toggle, [data-search-toggle]"
        );

    const searchPanel =
        document.querySelector(
            ".search-panel, .search-overlay, [data-search-panel]"
        );

    const closeButton =
        document.querySelector(
            ".search-close, [data-search-close]"
        );

    const searchForm =
        document.querySelector(
            ".header-search-form, .search-form, [data-search-form]"
        );

    const searchInput =
        document.querySelector(
            ".header-search-input, .search-input, [data-search-input]"
        );


    searchButtons.forEach(button => {

        button.addEventListener("click", () => {

            if (!searchPanel) {
                return;
            }

            searchPanel.classList.add("active");

            document.body.classList.add("search-open");

            setTimeout(() => {
                searchInput?.focus();
            }, 100);
        });
    });


    if (closeButton && searchPanel) {

        closeButton.addEventListener("click", () => {

            searchPanel.classList.remove("active");

            document.body.classList.remove("search-open");
        });
    }


    if (searchPanel) {

        searchPanel.addEventListener("click", event => {

            if (event.target === searchPanel) {

                searchPanel.classList.remove("active");

                document.body.classList.remove("search-open");
            }
        });
    }


    if (searchForm) {

        searchForm.addEventListener("submit", event => {

            event.preventDefault();

            const value =
                searchInput?.value.trim() || "";

            if (!value) {
                return;
            }

            window.location.href =
                `shop.html?search=${encodeURIComponent(value)}`;
        });
    }
}


/* =========================================================
   CART + WISHLIST INITIALIZATION
========================================================= */

function initCartAndWishlist() {

    NexoraApp.updateCartCount();

    NexoraApp.updateWishlistCount();

    NexoraApp.updateWishlistButtons();
}


/* =========================================================
   ADD TO CART BUTTONS
========================================================= */

function initAddToCartButtons() {

    document.addEventListener("click", event => {

        const button =
            event.target.closest(
                "[data-add-cart]"
            );

        if (!button) {
            return;
        }

        event.preventDefault();

        const productId =
            Number(button.dataset.addCart);

        if (!productId) {
            return;
        }

        const quantity =
            Number(button.dataset.quantity) || 1;

        NexoraApp.addToCart(
            productId,
            quantity
        );
    });
}


/* =========================================================
   WISHLIST BUTTONS
========================================================= */

function initWishlistButtons() {

    document.addEventListener("click", event => {

        const button =
            event.target.closest(
                "[data-wishlist-id]"
            );

        if (!button) {
            return;
        }

        event.preventDefault();

        const productId =
            Number(button.dataset.wishlistId);

        if (!productId) {
            return;
        }

        NexoraApp.toggleWishlist(productId);
    });
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    if (!product) {
        return "";
    }

    const wishlist =
        NexoraApp.getWishlist();

    const isWishlisted =
        wishlist.includes(Number(product.id));

    const oldPrice =
        product.oldPrice
            ? `<span class="product-old-price">
                    ${NexoraStore.formatPrice(product.oldPrice)}
               </span>`
            : "";

    const badge =
        product.badge
            ? `<span class="product-badge">
                    ${product.badge}
               </span>`
            : "";

    const stars =
        createStars(product.rating);


    return `
        <article class="product-card">

            <div class="product-image-wrap">

                ${badge}

                <button
                    class="wishlist-btn ${isWishlisted ? "active" : ""}"
                    type="button"
                    data-wishlist-id="${product.id}"
                    aria-label="Add ${product.name} to wishlist"
                    aria-pressed="${isWishlisted}"
                >
                    <i class="${
                        isWishlisted
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                    }"></i>
                </button>

                <a
                    href="product.html?id=${product.id}"
                    class="product-image-link"
                >
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="product-image"
                        loading="lazy"
                    >
                </a>

            </div>


            <div class="product-content">

                <span class="product-brand">
                    ${product.brand}
                </span>

                <h3 class="product-title">
                    <a href="product.html?id=${product.id}">
                        ${product.name}
                    </a>
                </h3>


                <div class="product-rating">

                    <span class="rating-stars">
                        ${stars}
                    </span>

                    <span class="rating-count">
                        (${product.reviews})
                    </span>

                </div>


                <div class="product-price">

                    <strong>
                        ${NexoraStore.formatPrice(product.price)}
                    </strong>

                    ${oldPrice}

                    ${
                        product.discount
                            ? `<span class="discount-label">
                                    ${product.discount}% OFF
                               </span>`
                            : ""
                    }

                </div>


                <button
                    type="button"
                    class="add-cart-btn"
                    data-add-cart="${product.id}"
                >
                    <i class="fa-solid fa-cart-plus"></i>
                    Add to Cart
                </button>

            </div>

        </article>
    `;
}


/* =========================================================
   STAR RATING
========================================================= */

function createStars(rating) {

    const rounded =
        Math.round(Number(rating) || 0);

    let html = "";

    for (let i = 1; i <= 5; i++) {

        if (i <= rounded) {

            html +=
                `<i class="fa-solid fa-star"></i>`;

        } else {

            html +=
                `<i class="fa-regular fa-star"></i>`;
        }
    }

    return html;
}


/* =========================================================
   HOME PAGE PRODUCTS
========================================================= */

function renderHomeProducts() {

    if (!window.NexoraStore) {
        return;
    }

    const selectors = {

        deals: [
            "#dealProducts",
            "#deal-products",
            "[data-products='deals']"
        ],

        newProducts: [
            "#newProducts",
            "#new-products",
            "[data-products='new']"
        ],

        popular: [
            "#popularProducts",
            "#popular-products",
            "[data-products='popular']"
        ],

        featured: [
            "#featuredProducts",
            "#featured-products",
            "[data-products='featured']"
        ]
    };


    renderProductSection(
        selectors.deals,
        NexoraStore.getDealProducts()
    );


    renderProductSection(
        selectors.newProducts,
        NexoraStore.getNewProducts()
    );


    renderProductSection(
        selectors.popular,
        NexoraStore.getPopularProducts()
    );


    renderProductSection(
        selectors.featured,
        NexoraStore.getPopularProducts()
    );
}


function renderProductSection(
    selectors,
    products
) {

    let container = null;

    for (const selector of selectors) {

        container =
            document.querySelector(selector);

        if (container) {
            break;
        }
    }

    if (!container) {
        return;
    }

    if (!products || products.length === 0) {

        container.innerHTML = `
            <div class="empty-products">
                No products available.
            </div>
        `;

        return;
    }


    container.innerHTML =
        products
            .map(product =>
                createProductCard(product)
            )
            .join("");

    NexoraApp.updateWishlistButtons();
}


/* =========================================================
   QUICK SEARCH RESULT
========================================================= */

function renderSearchPreview(
    query,
    container
) {

    if (!window.NexoraStore || !container) {
        return;
    }

    const results =
        NexoraStore.searchProducts(query);

    if (!results.length) {

        container.innerHTML = `
            <div class="search-empty">
                <h3>No products found</h3>
                <p>
                    Try searching with another phone or brand name.
                </p>
            </div>
        `;

        return;
    }

    container.innerHTML =
        results
            .slice(0, 6)
            .map(product =>
                createProductCard(product)
            )
            .join("");

    NexoraApp.updateWishlistButtons();
}


/* =========================================================
   NEWSLETTER
========================================================= */

function initNewsletter() {

    const forms =
        document.querySelectorAll(
            ".newsletter-form, [data-newsletter-form]"
        );

    forms.forEach(form => {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const input =
                    form.querySelector(
                        "input[type='email']"
                    );

                const email =
                    input?.value.trim();

                if (!email) {
                    return;
                }

                if (!isValidEmail(email)) {

                    showToast(
                        "Please enter a valid email address."
                    );

                    return;
                }


                showToast(
                    "Thank you for subscribing to Nexora Mobiles."
                );

                form.reset();
            }
        );
    });
}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);
}


/* =========================================================
   TOAST MESSAGE
========================================================= */

function showToast(message) {

    let toast =
        document.querySelector(
            ".nexora-toast"
        );

    if (!toast) {

        toast =
            document.createElement("div");

        toast.className =
            "nexora-toast";

        document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(
        window.nexoraToastTimer
    );

    window.nexoraToastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);
}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initCurrentYear() {

    const year =
        new Date().getFullYear();

    document.querySelectorAll(
        "[data-current-year], #currentYear"
    ).forEach(element => {

        element.textContent = year;
    });
}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        document.body.classList.remove(
            "nav-open",
            "search-open"
        );

        document.querySelectorAll(
            ".search-panel.active, .search-overlay.active"
        ).forEach(element => {

            element.classList.remove("active");
        });
    }
);


/* =========================================================
   GLOBAL ACCESS
========================================================= */

window.NexoraApp = NexoraApp;

window.createProductCard =
    createProductCard;

window.createStars =
    createStars;

window.showToast =
    showToast;