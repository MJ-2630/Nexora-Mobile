/* =========================================================
   NEXORA MOBILES
   PRODUCT DATABASE
   ========================================================= */

const products = [

    /* =====================================================
       APPLE
    ===================================================== */

    {
        id: 1,
        brand: "Apple",
        name: "iPhone 17 Pro Max",
        slug: "iphone-17-pro-max",

        category: "smartphones",

        price: 149999,
        oldPrice: 159999,
        discount: 6,

        rating: 4.9,
        reviews: 324,

        badge: "NEW",

        color: "Deep Blue",
        ram: "12GB",
        storage: "256GB",

        processor: "A19 Pro",
        display: "6.9-inch Super Retina XDR",
        camera: "48MP Pro Camera System",
        battery: "4850 mAh",

        stock: 18,

        description:
            "The iPhone 17 Pro Max delivers exceptional performance, an advanced camera system and a stunning display designed for users who want the ultimate smartphone experience.",

        image: "images/products/iphone-17-pro-max.png"
    },


    {
        id: 2,
        brand: "Apple",
        name: "iPhone 17 Pro",
        slug: "iphone-17-pro",

        category: "smartphones",

        price: 129999,
        oldPrice: 139999,
        discount: 7,

        rating: 4.8,
        reviews: 218,

        badge: "NEW",

        color: "Silver",
        ram: "12GB",
        storage: "256GB",

        processor: "A19 Pro",
        display: "6.3-inch Super Retina XDR",
        camera: "48MP Pro Camera System",
        battery: "4200 mAh",

        stock: 22,

        description:
            "Powerful performance meets a compact premium design with an advanced camera system and brilliant Super Retina XDR display.",

        image: "images/products/iphone-17-pro.png"
    },


    {
        id: 3,
        brand: "Apple",
        name: "iPhone 16",
        slug: "iphone-16",

        category: "smartphones",

        price: 69999,
        oldPrice: 79999,
        discount: 13,

        rating: 4.8,
        reviews: 542,

        badge: "BEST SELLER",

        color: "Black",
        ram: "8GB",
        storage: "128GB",

        processor: "A18",
        display: "6.1-inch Super Retina XDR",
        camera: "48MP Fusion Camera",
        battery: "3561 mAh",

        stock: 31,

        description:
            "Experience smooth everyday performance, advanced photography and a beautiful Super Retina XDR display with the iPhone 16.",

        image: "images/products/iphone-16.webp"
    },


    /* =====================================================
       SAMSUNG
    ===================================================== */

    {
        id: 4,
        brand: "Samsung",
        name: "Galaxy S26 Ultra",
        slug: "samsung-galaxy-s26-ultra",

        category: "smartphones",

        price: 139999,
        oldPrice: 149999,
        discount: 7,

        rating: 4.9,
        reviews: 412,

        badge: "NEW",

        color: "Titanium Black",
        ram: "12GB",
        storage: "256GB",

        processor: "Snapdragon Elite",
        display: "6.9-inch Dynamic AMOLED 2X",
        camera: "200MP Quad Camera",
        battery: "5000 mAh",

        stock: 15,

        description:
            "The Galaxy S26 Ultra combines flagship performance, a powerful 200MP camera system and a premium Dynamic AMOLED display.",

        image: "images/products/samsung-s26-ultra.png"
    },


    {
        id: 5,
        brand: "Samsung",
        name: "Galaxy S26 Plus",
        slug: "samsung-galaxy-s26-plus",

        category: "smartphones",

        price: 99999,
        oldPrice: 109999,
        discount: 9,

        rating: 4.8,
        reviews: 281,

        badge: "POPULAR",

        color: "Navy",
        ram: "12GB",
        storage: "256GB",

        processor: "Snapdragon Elite",
        display: "6.7-inch Dynamic AMOLED 2X",
        camera: "50MP Triple Camera",
        battery: "4900 mAh",

        stock: 20,

        description:
            "A premium Samsung smartphone with powerful performance, a smooth AMOLED display and an advanced multi-camera system.",

        image: "images/products/samsung-s26-plus.jpg"
    },


    {
        id: 6,
        brand: "Samsung",
        name: "Galaxy A56 5G",
        slug: "samsung-galaxy-a56-5g",

        category: "smartphones",

        price: 41999,
        oldPrice: 46999,
        discount: 11,

        rating: 4.7,
        reviews: 634,

        badge: "DEAL",

        color: "Awesome Graphite",
        ram: "8GB",
        storage: "128GB",

        processor: "Exynos 1580",
        display: "6.7-inch Super AMOLED",
        camera: "50MP Triple Camera",
        battery: "5000 mAh",

        stock: 42,

        description:
            "A stylish 5G smartphone offering an immersive AMOLED display, reliable performance and long-lasting battery life.",

        image: "images/products/samsung-a56.jpg"
    },


    /* =====================================================
       ONEPLUS
    ===================================================== */

    {
        id: 7,
        brand: "OnePlus",
        name: "OnePlus 13",
        slug: "oneplus-13",

        category: "smartphones",

        price: 69999,
        oldPrice: 74999,
        discount: 7,

        rating: 4.8,
        reviews: 391,

        badge: "BEST SELLER",

        color: "Midnight Ocean",
        ram: "12GB",
        storage: "256GB",

        processor: "Snapdragon 8 Elite",
        display: "6.82-inch AMOLED",
        camera: "50MP Hasselblad Camera",
        battery: "6000 mAh",

        stock: 26,

        description:
            "OnePlus 13 combines flagship performance with a stunning AMOLED display, Hasselblad cameras and a large 6000mAh battery.",

        image: "images/products/oneplus-13.png"
    },


    {
        id: 8,
        brand: "OnePlus",
        name: "OnePlus 13R",
        slug: "oneplus-13r",

        category: "smartphones",

        price: 42999,
        oldPrice: 46999,
        discount: 9,

        rating: 4.7,
        reviews: 518,

        badge: "POPULAR",

        color: "Nebula Noir",
        ram: "12GB",
        storage: "256GB",

        processor: "Snapdragon 8 Gen 3",
        display: "6.78-inch AMOLED",
        camera: "50MP Triple Camera",
        battery: "6000 mAh",

        stock: 37,

        description:
            "A performance-focused smartphone with a smooth AMOLED display, powerful processor and excellent battery life.",

        image: "images/products/oneplus-13r.png"
    },


    /* =====================================================
       GOOGLE
    ===================================================== */

    {
        id: 9,
        brand: "Google",
        name: "Pixel 10 Pro",
        slug: "google-pixel-10-pro",

        category: "smartphones",

        price: 109999,
        oldPrice: 119999,
        discount: 8,

        rating: 4.8,
        reviews: 245,

        badge: "NEW",

        color: "Obsidian",
        ram: "16GB",
        storage: "256GB",

        processor: "Google Tensor G5",
        display: "6.7-inch LTPO OLED",
        camera: "50MP Pro Triple Camera",
        battery: "5000 mAh",

        stock: 17,

        description:
            "Pixel 10 Pro brings Google's intelligent photography, smooth performance and a premium OLED display into a refined flagship design.",

        image: "images/products/pixel-10-pro.webp"
    },


    {
        id: 10,
        brand: "Google",
        name: "Pixel 10",
        slug: "google-pixel-10",

        category: "smartphones",

        price: 79999,
        oldPrice: 84999,
        discount: 6,

        rating: 4.7,
        reviews: 188,

        badge: "POPULAR",

        color: "Porcelain",
        ram: "12GB",
        storage: "256GB",

        processor: "Google Tensor G5",
        display: "6.3-inch OLED",
        camera: "48MP Dual Camera",
        battery: "4970 mAh",

        stock: 24,

        description:
            "Enjoy Google's smart features, excellent camera experience and clean Android software in a compact flagship smartphone.",

        image: "images/products/pixel-10.png"
    },


    /* =====================================================
       NOTHING
    ===================================================== */

    {
        id: 11,
        brand: "Nothing",
        name: "Nothing Phone (3)",
        slug: "nothing-phone-3",

        category: "smartphones",

        price: 59999,
        oldPrice: 64999,
        discount: 8,

        rating: 4.7,
        reviews: 267,

        badge: "NEW",

        color: "White",
        ram: "12GB",
        storage: "256GB",

        processor: "Snapdragon 8s Gen 4",
        display: "6.7-inch AMOLED",
        camera: "50MP Dual Camera",
        battery: "5150 mAh",

        stock: 19,

        description:
            "Nothing Phone (3) delivers a distinctive transparent-inspired design, smooth AMOLED display and powerful everyday performance.",

        image: "images/products/nothing-phone-3.webp"
    },


    /* =====================================================
       XIAOMI
    ===================================================== */

    {
        id: 12,
        brand: "Xiaomi",
        name: "Xiaomi 15 Ultra",
        slug: "xiaomi-15-ultra",

        category: "smartphones",

        price: 99999,
        oldPrice: 109999,
        discount: 9,

        rating: 4.8,
        reviews: 314,

        badge: "FLAGSHIP",

        color: "Black",
        ram: "16GB",
        storage: "512GB",

        processor: "Snapdragon 8 Elite",
        display: "6.73-inch AMOLED",
        camera: "200MP Leica Camera",
        battery: "5410 mAh",

        stock: 14,

        description:
            "A flagship Xiaomi smartphone focused on photography, performance and premium display technology.",

        image: "images/products/xiaomi-15-ultra.png"
    },


    {
        id: 13,
        brand: "Xiaomi",
        name: "Redmi Note 14 Pro+",
        slug: "redmi-note-14-pro-plus",

        category: "smartphones",

        price: 29999,
        oldPrice: 33999,
        discount: 12,

        rating: 4.6,
        reviews: 742,

        badge: "DEAL",

        color: "Frost Blue",
        ram: "8GB",
        storage: "256GB",

        processor: "Snapdragon 7s Gen 3",
        display: "6.67-inch AMOLED",
        camera: "200MP OIS Camera",
        battery: "5110 mAh",

        stock: 48,

        description:
            "A feature-packed smartphone with a high-resolution camera, curved AMOLED display and dependable battery life.",

        image: "images/products/redmi-note-14-pro-plus.png"
    },


    /* =====================================================
       VIVO
    ===================================================== */

    {
        id: 14,
        brand: "Vivo",
        name: "Vivo X200 Pro",
        slug: "vivo-x200-pro",

        category: "smartphones",

        price: 94999,
        oldPrice: 99999,
        discount: 5,

        rating: 4.8,
        reviews: 229,

        badge: "PREMIUM",

        color: "Titanium Grey",
        ram: "16GB",
        storage: "512GB",

        processor: "Dimensity 9400",
        display: "6.78-inch AMOLED",
        camera: "50MP ZEISS Camera",
        battery: "6000 mAh",

        stock: 16,

        description:
            "Vivo X200 Pro delivers premium photography with ZEISS optics, powerful performance and an immersive AMOLED display.",

        image: "images/products/vivo-x200-pro.png"
    },


    /* =====================================================
       OPPO
    ===================================================== */

    {
        id: 15,
        brand: "Oppo",
        name: "Oppo Find X8 Pro",
        slug: "oppo-find-x8-pro",

        category: "smartphones",

        price: 99999,
        oldPrice: 109999,
        discount: 9,

        rating: 4.7,
        reviews: 194,

        badge: "POPULAR",

        color: "Pearl White",
        ram: "16GB",
        storage: "512GB",

        processor: "Dimensity 9400",
        display: "6.78-inch AMOLED",
        camera: "50MP Hasselblad Camera",
        battery: "5910 mAh",

        stock: 18,

        description:
            "A premium Oppo flagship featuring a powerful processor, advanced camera system and beautiful high-refresh-rate display.",

        image: "images/products/oppo-find-x8-pro.png"
    },


    /* =====================================================
       REALME
    ===================================================== */

    {
        id: 16,
        brand: "Realme",
        name: "Realme GT 7 Pro",
        slug: "realme-gt-7-pro",

        category: "smartphones",

        price: 59999,
        oldPrice: 64999,
        discount: 8,

        rating: 4.7,
        reviews: 386,

        badge: "BEST VALUE",

        color: "Mars Orange",
        ram: "12GB",
        storage: "256GB",

        processor: "Snapdragon 8 Elite",
        display: "6.78-inch AMOLED",
        camera: "50MP Sony Camera",
        battery: "6500 mAh",

        stock: 29,

        description:
            "Realme GT 7 Pro offers flagship-grade performance, a high-quality AMOLED display and an impressive large-capacity battery.",

        image: "images/products/realme-gt-7-pro.webp"
    },


    /* =====================================================
       MOTOROLA
    ===================================================== */

    {
        id: 17,
        brand: "Motorola",
        name: "Motorola Edge 60 Pro",
        slug: "motorola-edge-60-pro",

        category: "smartphones",

        price: 34999,
        oldPrice: 39999,
        discount: 13,

        rating: 4.6,
        reviews: 271,

        badge: "DEAL",

        color: "Shadow Black",
        ram: "12GB",
        storage: "256GB",

        processor: "Dimensity 8350",
        display: "6.7-inch pOLED",
        camera: "50MP Triple Camera",
        battery: "6000 mAh",

        stock: 33,

        description:
            "A stylish Motorola smartphone with a vibrant pOLED display, versatile cameras and long-lasting battery performance.",

        image: "images/products/motorola-edge-60-pro.png"
    },


    /* =====================================================
       ACCESSORIES
    ===================================================== */

    {
        id: 101,
        brand: "Nexora",
        name: "Nexora AirBuds Pro",
        slug: "nexora-airbuds-pro",

        category: "accessories",
        subCategory: "audio",

        price: 2999,
        oldPrice: 3999,
        discount: 25,

        rating: 4.6,
        reviews: 156,

        badge: "DEAL",

        color: "White",
        ram: null,
        storage: null,

        processor: null,
        display: null,
        camera: null,
        battery: "32 Hours",

        stock: 65,

        description:
            "Wireless earbuds with active noise cancellation, clear audio and a compact charging case.",

        image: "images/accessories/airbuds-pro.png"
    },


    {
        id: 102,
        brand: "Nexora",
        name: "65W Fast Charger",
        slug: "65w-fast-charger",

        category: "accessories",
        subCategory: "chargers",

        price: 1499,
        oldPrice: 1999,
        discount: 25,

        rating: 4.7,
        reviews: 209,

        badge: "BEST SELLER",

        color: "White",
        ram: null,
        storage: null,

        processor: null,
        display: null,
        camera: null,
        battery: null,

        stock: 84,

        description:
            "Compact 65W fast charger designed to deliver reliable and efficient charging for compatible devices.",

        image: "images/accessories/65w-charger.jpg"
    },


    {
        id: 103,
        brand: "Nexora",
        name: "Premium MagSafe Case",
        slug: "premium-magsafe-case",

        category: "accessories",
        subCategory: "cases",

        price: 999,
        oldPrice: 1499,
        discount: 33,

        rating: 4.5,
        reviews: 127,

        badge: "DEAL",

        color: "Clear",
        ram: null,
        storage: null,

        processor: null,
        display: null,
        camera: null,
        battery: null,

        stock: 92,

        description:
            "A slim protective case with MagSafe compatibility, raised edges and a clean premium finish.",

        image: "images/accessories/magsafe-case.jpg"
    },


    {
        id: 104,
        brand: "Nexora",
        name: "Smart Watch Active",
        slug: "smart-watch-active",

        category: "accessories",
        subCategory: "wearables",

        price: 3999,
        oldPrice: 4999,
        discount: 20,

        rating: 4.6,
        reviews: 173,

        badge: "POPULAR",

        color: "Black",
        ram: null,
        storage: null,

        processor: null,
        display: "1.78-inch AMOLED",
        camera: null,
        battery: "10 Days",

        stock: 44,

        description:
            "A modern smartwatch with health tracking, notifications, activity monitoring and a bright AMOLED display.",

        image: "images/accessories/smart-watch.jpg"
    }

];


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */


/*
    Get product using ID
*/

function getProductById(id) {

    return products.find(
        product => Number(product.id) === Number(id)
    );

}


/*
    Get product using slug
*/

function getProductBySlug(slug) {

    return products.find(
        product => product.slug === slug
    );

}


/*
    Get products by brand
*/

function getProductsByBrand(brand) {

    return products.filter(
        product =>
            product.brand.toLowerCase() === brand.toLowerCase()
    );

}


/*
    Get products by category
*/

function getProductsByCategory(category) {

    return products.filter(
        product =>
            product.category.toLowerCase() === category.toLowerCase()
    );

}


/*
    Get products with discount
*/

function getDealProducts() {

    return products
        .filter(product => product.discount > 0)
        .sort((a, b) => b.discount - a.discount);

}


/*
    Get newest products
*/

function getNewProducts() {

    return products
        .filter(product => product.badge === "NEW")
        .slice(0, 8);

}


/*
    Get best selling / popular products
*/

function getPopularProducts() {

    return products
        .filter(
            product =>
                product.badge === "BEST SELLER" ||
                product.badge === "POPULAR"
        )
        .slice(0, 8);

}


/*
    Search products
*/

function searchProducts(query) {

    const search = query
        .toLowerCase()
        .trim();

    if (!search) {
        return products;
    }

    return products.filter(product => {

        return (
            product.name.toLowerCase().includes(search) ||
            product.brand.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        );

    });

}


/*
    Format Indian currency
*/

function formatPrice(price) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(price);

}


/*
    Create product image fallback
*/

function getProductImage(product) {

    return product.image ||
        "images/products/product-placeholder.jpg";

}


/*
    Get all brands
*/

function getAllBrands() {

    return [
        ...new Set(
            products
                .filter(product => product.category === "smartphones")
                .map(product => product.brand)
        )
    ];

}


/*
    Get products by price range
*/

function getProductsByPrice(min, max) {

    return products.filter(product => {

        return product.price >= min &&
               product.price <= max;

    });

}


/*
    Get related products
*/

function getRelatedProducts(product, limit = 4) {

    return products
        .filter(item => {

            return (
                item.id !== product.id &&
                (
                    item.brand === product.brand ||
                    item.category === product.category
                )
            );

        })
        .slice(0, limit);

}


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

window.NexoraStore = {

    products,

    getProductById,
    getProductBySlug,

    getProductsByBrand,
    getProductsByCategory,

    getDealProducts,
    getNewProducts,
    getPopularProducts,

    searchProducts,

    formatPrice,
    getProductImage,

    getAllBrands,
    getProductsByPrice,

    getRelatedProducts

};