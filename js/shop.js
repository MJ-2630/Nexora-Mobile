/* =========================================================
   NEXORA MOBILES - SHOP PAGE JAVASCRIPT
   Search, filters, sorting and product rendering
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initShopPage();
});


/* =========================================================
   SHOP STATE
========================================================= */

const ShopState = {
    products: [],
    filteredProducts: [],
    search: "",
    brand: "all",
    category: "all",
    minPrice: 0,
    maxPrice: 200000,
    rating: 0,
    sort: "default",
    page: 1,
    perPage: 12
};


/* =========================================================
   INITIALIZE SHOP
========================================================= */

function initShopPage() {

    if (!window.NexoraStore) {
        return;
    }

    const shopContainer =
        document.querySelector(
            "#shopProducts, #shop-products, [data-shop-products]"
        );

    if (!shopContainer) {
        return;
    }

    ShopState.products =
        [...NexoraStore.products];

    ShopState.filteredProducts =
        [...ShopState.products];


    readSearchFromURL();

    setupBrandFilters();

    setupCategoryFilters();

    setupPriceFilter();

    setupRatingFilter();

    setupSort();

    setupSearch();

    setupClearFilters();

    applyShopFilters();
}


/* =========================================================
   READ SEARCH FROM URL
========================================================= */

function readSearchFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const search =
        params.get("search");

    if (!search) {
        return;
    }

    ShopState.search =
        search.trim().toLowerCase();


    const searchInputs =
        document.querySelectorAll(
            "#shopSearch, .shop-search-input, [data-shop-search]"
        );

    searchInputs.forEach(input => {
        input.value = search;
    });
}


/* =========================================================
   BRAND FILTER
========================================================= */

function setupBrandFilters() {

    const brandContainer =
        document.querySelector(
            "#brandFilters, .brand-filters, [data-brand-filters]"
        );

    if (!brandContainer) {
        return;
    }


    const brands =
        NexoraStore.getAllBrands();


    const existingAll =
        brandContainer.querySelector(
            "[data-brand='all']"
        );

    if (!existingAll) {

        brandContainer.insertAdjacentHTML(
            "afterbegin",
            `
            <label class="filter-option">
                <input
                    type="radio"
                    name="brand"
                    value="all"
                    data-brand="all"
                    checked
                >
                <span>All Brands</span>
            </label>
            `
        );
    }


    brands.forEach(brand => {

        if (
            brandContainer.querySelector(
                `[data-brand="${brand}"]`
            )
        ) {
            return;
        }

        brandContainer.insertAdjacentHTML(
            "beforeend",
            `
            <label class="filter-option">
                <input
                    type="radio"
                    name="brand"
                    value="${brand}"
                    data-brand="${brand}"
                >
                <span>${brand}</span>
            </label>
            `
        );
    });


    brandContainer
        .querySelectorAll(
            "input[name='brand']"
        )
        .forEach(input => {

            input.addEventListener(
                "change",
                () => {

                    ShopState.brand =
                        input.value;

                    ShopState.page = 1;

                    applyShopFilters();
                }
            );
        });
}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function setupCategoryFilters() {

    const categoryContainer =
        document.querySelector(
            "#categoryFilters, .category-filters, [data-category-filters]"
        );

    if (!categoryContainer) {
        return;
    }


    const categories = [
        "all",
        "smartphone",
        "accessories"
    ];


    categories.forEach(category => {

        if (
            categoryContainer.querySelector(
                `[data-category="${category}"]`
            )
        ) {
            return;
        }


        const label =
            category === "all"
                ? "All Categories"
                : capitalize(category);


        categoryContainer.insertAdjacentHTML(
            "beforeend",
            `
            <label class="filter-option">

                <input
                    type="radio"
                    name="category"
                    value="${category}"
                    data-category="${category}"
                    ${category === "all" ? "checked" : ""}
                >

                <span>${label}</span>

            </label>
            `
        );
    });


    categoryContainer
        .querySelectorAll(
            "input[name='category']"
        )
        .forEach(input => {

            input.addEventListener(
                "change",
                () => {

                    ShopState.category =
                        input.value;

                    ShopState.page = 1;

                    applyShopFilters();
                }
            );
        });
}


/* =========================================================
   PRICE FILTER
========================================================= */

function setupPriceFilter() {

    const minInput =
        document.querySelector(
            "#minPrice, [data-min-price]"
        );

    const maxInput =
        document.querySelector(
            "#maxPrice, [data-max-price]"
        );

    const minValue =
        document.querySelector(
            "#minPriceValue, [data-min-price-value]"
        );

    const maxValue =
        document.querySelector(
            "#maxPriceValue, [data-max-price-value]"
        );


    if (minInput) {

        minInput.addEventListener(
            "input",
            () => {

                ShopState.minPrice =
                    Number(minInput.value) || 0;

                if (minValue) {

                    minValue.textContent =
                        NexoraStore.formatPrice(
                            ShopState.minPrice
                        );
                }

                applyShopFilters();
            }
        );
    }


    if (maxInput) {

        maxInput.addEventListener(
            "input",
            () => {

                ShopState.maxPrice =
                    Number(maxInput.value) || 200000;

                if (maxValue) {

                    maxValue.textContent =
                        NexoraStore.formatPrice(
                            ShopState.maxPrice
                        );
                }

                applyShopFilters();
            }
        );
    }
}


/* =========================================================
   RATING FILTER
========================================================= */

function setupRatingFilter() {

    const ratingContainer =
        document.querySelector(
            "#ratingFilters, .rating-filters, [data-rating-filters]"
        );

    if (!ratingContainer) {
        return;
    }


    ratingContainer
        .querySelectorAll(
            "[data-rating]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    ShopState.rating =
                        Number(
                            button.dataset.rating
                        ) || 0;


                    ratingContainer
                        .querySelectorAll(
                            "[data-rating]"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );
                        });


                    button.classList.add(
                        "active"
                    );

                    ShopState.page = 1;

                    applyShopFilters();
                }
            );
        });
}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    const searchInput =
        document.querySelector(
            "#shopSearch, .shop-search-input, [data-shop-search]"
        );

    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        () => {

            ShopState.search =
                searchInput.value
                    .trim()
                    .toLowerCase();

            ShopState.page = 1;

            applyShopFilters();
        }
    );
}


/* =========================================================
   SORT
========================================================= */

function setupSort() {

    const sortSelect =
        document.querySelector(
            "#sortProducts, .sort-products, [data-sort-products]"
        );

    if (!sortSelect) {
        return;
    }


    sortSelect.addEventListener(
        "change",
        () => {

            ShopState.sort =
                sortSelect.value;

            ShopState.page = 1;

            applyShopFilters();
        }
    );
}


/* =========================================================
   CLEAR FILTERS
========================================================= */

function setupClearFilters() {

    const clearButtons =
        document.querySelectorAll(
            ".clear-filters, [data-clear-filters]"
        );


    clearButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                resetShopFilters();
            }
        );
    });
}


function resetShopFilters() {

    ShopState.search = "";
    ShopState.brand = "all";
    ShopState.category = "all";
    ShopState.minPrice = 0;
    ShopState.maxPrice = 200000;
    ShopState.rating = 0;
    ShopState.sort = "default";
    ShopState.page = 1;


    document
        .querySelectorAll(
            "#shopSearch, .shop-search-input, [data-shop-search]"
        )
        .forEach(input => {
            input.value = "";
        });


    document
        .querySelectorAll(
            "input[name='brand']"
        )
        .forEach(input => {

            input.checked =
                input.value === "all";
        });


    document
        .querySelectorAll(
            "input[name='category']"
        )
        .forEach(input => {

            input.checked =
                input.value === "all";
        });


    document
        .querySelectorAll(
            "[data-rating]"
        )
        .forEach(button => {

            button.classList.remove(
                "active"
            );
        });


    document
        .querySelectorAll(
            "#sortProducts, .sort-products, [data-sort-products]"
        )
        .forEach(select => {

            select.value = "default";
        });


    const minInput =
        document.querySelector(
            "#minPrice, [data-min-price]"
        );

    const maxInput =
        document.querySelector(
            "#maxPrice, [data-max-price]"
        );


    if (minInput) {
        minInput.value = 0;
    }

    if (maxInput) {
        maxInput.value = 200000;
    }


    updatePriceLabels();

    applyShopFilters();
}


/* =========================================================
   APPLY FILTERS
========================================================= */

function applyShopFilters() {

    let products =
        [...ShopState.products];


    /* Search */

    if (ShopState.search) {

        products =
            products.filter(product => {

                const searchableText = [
                    product.name,
                    product.brand,
                    product.category,
                    product.processor,
                    product.ram,
                    product.storage
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                return searchableText.includes(
                    ShopState.search
                );
            });
    }


    /* Brand */

    if (ShopState.brand !== "all") {

        products =
            products.filter(
                product =>
                    product.brand.toLowerCase() ===
                    ShopState.brand.toLowerCase()
            );
    }


    /* Category */

    if (ShopState.category !== "all") {

        products =
            products.filter(
                product =>
                    product.category.toLowerCase() ===
                    ShopState.category.toLowerCase()
            );
    }


    /* Price */

    products =
        products.filter(product => {

            const price =
                Number(product.price) || 0;

            return (
                price >= ShopState.minPrice &&
                price <= ShopState.maxPrice
            );
        });


    /* Rating */

    if (ShopState.rating > 0) {

        products =
            products.filter(product => {

                return (
                    Number(product.rating) >=
                    ShopState.rating
                );
            });
    }


    /* Sorting */

    products =
        sortProducts(
            products,
            ShopState.sort
        );


    ShopState.filteredProducts =
        products;


    renderShopProducts();

    updateShopResultCount();

    updateActiveFilterState();

    updatePriceLabels();
}


/* =========================================================
   SORT PRODUCTS
========================================================= */

function sortProducts(
    products,
    sort
) {

    const sorted =
        [...products];


    switch (sort) {

        case "price-low":
            sorted.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );
            break;


        case "price-high":
            sorted.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );
            break;


        case "rating":
            sorted.sort(
                (a, b) =>
                    Number(b.rating) -
                    Number(a.rating)
            );
            break;


        case "discount":
            sorted.sort(
                (a, b) =>
                    Number(b.discount || 0) -
                    Number(a.discount || 0)
            );
            break;


        case "newest":
            sorted.reverse();
            break;


        case "name":
            sorted.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name
                    )
            );
            break;


        default:
            break;
    }


    return sorted;
}


/* =========================================================
   RENDER SHOP PRODUCTS
========================================================= */

function renderShopProducts() {

    const container =
        document.querySelector(
            "#shopProducts, #shop-products, [data-shop-products]"
        );


    if (!container) {
        return;
    }


    const products =
        ShopState.filteredProducts;


    if (!products.length) {

        container.innerHTML = `
            <div class="shop-empty">

                <div class="shop-empty-icon">
                    <i class="fa-solid fa-mobile-screen-button"></i>
                </div>

                <h3>No products found</h3>

                <p>
                    We couldn't find any products matching
                    your current filters.
                </p>

                <button
                    type="button"
                    class="btn btn-primary clear-filters"
                    data-clear-filters
                >
                    Clear Filters
                </button>

            </div>
        `;

        const clearButton =
            container.querySelector(
                "[data-clear-filters]"
            );

        clearButton?.addEventListener(
            "click",
            resetShopFilters
        );

        return;
    }


    const total =
        products.length;


    const start =
        (ShopState.page - 1) *
        ShopState.perPage;


    const end =
        start +
        ShopState.perPage;


    const visibleProducts =
        products.slice(
            start,
            end
        );


    container.innerHTML =
        visibleProducts
            .map(product =>
                createProductCard(product)
            )
            .join("");


    NexoraApp.updateWishlistButtons();

    renderPagination(total);
}


/* =========================================================
   PAGINATION
========================================================= */

function renderPagination(total) {

    const container =
        document.querySelector(
            "#shopPagination, .shop-pagination, [data-shop-pagination]"
        );


    if (!container) {
        return;
    }


    const totalPages =
        Math.ceil(
            total /
            ShopState.perPage
        );


    if (totalPages <= 1) {

        container.innerHTML = "";

        return;
    }


    let html = "";


    html += `
        <button
            type="button"
            class="pagination-btn pagination-prev"
            data-page="${ShopState.page - 1}"
            ${ShopState.page === 1 ? "disabled" : ""}
        >
            <i class="fa-solid fa-chevron-left"></i>
        </button>
    `;


    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {

        html += `
            <button
                type="button"
                class="pagination-btn ${
                    page === ShopState.page
                        ? "active"
                        : ""
                }"
                data-page="${page}"
            >
                ${page}
            </button>
        `;
    }


    html += `
        <button
            type="button"
            class="pagination-btn pagination-next"
            data-page="${ShopState.page + 1}"
            ${
                ShopState.page === totalPages
                    ? "disabled"
                    : ""
            }
        >
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    `;


    container.innerHTML = html;


    container
        .querySelectorAll(
            "[data-page]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const page =
                        Number(
                            button.dataset.page
                        );


                    if (
                        page < 1 ||
                        page > totalPages
                    ) {
                        return;
                    }


                    ShopState.page =
                        page;


                    renderShopProducts();

                    updateShopResultCount();


                    const section =
                        document.querySelector(
                            ".shop-products-section, .shop-grid-section, #shopProducts"
                        );


                    if (section) {

                        window.scrollTo({
                            top:
                                section
                                    .getBoundingClientRect()
                                    .top +
                                window.scrollY -
                                100,

                            behavior: "smooth"
                        });
                    }
                }
            );
        });
}


/* =========================================================
   RESULT COUNT
========================================================= */

function updateShopResultCount() {

    const count =
        ShopState.filteredProducts.length;


    document.querySelectorAll(
        "#shopResultCount, .shop-result-count, [data-result-count]"
    ).forEach(element => {

        element.textContent =
            `${count} ${count === 1 ? "product" : "products"}`;
    });


    const totalElement =
        document.querySelector(
            "[data-total-products]"
        );


    if (totalElement) {

        totalElement.textContent =
            count;
    }
}


/* =========================================================
   ACTIVE FILTER STATE
========================================================= */

function updateActiveFilterState() {

    document
        .querySelectorAll(
            "[data-brand]"
        )
        .forEach(element => {

            const brand =
                element.dataset.brand;

            element.classList.toggle(
                "active",
                brand === ShopState.brand
            );
        });


    document
        .querySelectorAll(
            "[data-category]"
        )
        .forEach(element => {

            const category =
                element.dataset.category;

            element.classList.toggle(
                "active",
                category === ShopState.category
            );
        });
}


/* =========================================================
   PRICE LABELS
========================================================= */

function updatePriceLabels() {

    const minValue =
        document.querySelector(
            "#minPriceValue, [data-min-price-value]"
        );

    const maxValue =
        document.querySelector(
            "#maxPriceValue, [data-max-price-value]"
        );


    if (minValue) {

        minValue.textContent =
            NexoraStore.formatPrice(
                ShopState.minPrice
            );
    }


    if (maxValue) {

        maxValue.textContent =
            NexoraStore.formatPrice(
                ShopState.maxPrice
            );
    }
}


/* =========================================================
   MOBILE FILTER TOGGLE
========================================================= */

function initMobileShopFilters() {

    const filterButton =
        document.querySelector(
            ".filter-toggle, [data-filter-toggle]"
        );

    const filterPanel =
        document.querySelector(
            ".shop-sidebar, .filter-sidebar, [data-filter-panel]"
        );

    const filterClose =
        document.querySelector(
            ".filter-close, [data-filter-close]"
        );


    if (!filterButton || !filterPanel) {
        return;
    }


    filterButton.addEventListener(
        "click",
        () => {

            filterPanel.classList.add(
                "active"
            );

            document.body.classList.add(
                "filter-open"
            );
        }
    );


    filterClose?.addEventListener(
        "click",
        () => {

            filterPanel.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "filter-open"
            );
        }
    );
}


/* =========================================================
   HELPERS
========================================================= */

function capitalize(value) {

    if (!value) {
        return "";
    }

    return (
        value.charAt(0).toUpperCase() +
        value.slice(1)
    );
}


/* =========================================================
   EXPOSE SHOP STATE
========================================================= */

window.NexoraShop =
    ShopState;


/* =========================================================
   START MOBILE FILTERS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {
        initMobileShopFilters();
    }
);