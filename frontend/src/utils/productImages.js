/**
 * Product image mapping - maps product slugs to real product images.
 * Uses high-quality images from Unsplash for each product.
 */

const PRODUCT_IMAGES = {
    // GPUs
    'nvidia-rtx-4090': 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&q=80',
    'amd-rx-7900-xtx': 'https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=500&q=80',
    'nvidia-rtx-4070-ti-super': 'https://images.unsplash.com/photo-1555618254-5e7f5f tried41?w=500&q=80',

    // CPUs
    'amd-ryzen-9-7950x': 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=500&q=80',
    'intel-i9-14900k': 'https://images.unsplash.com/photo-1555617766-c1dae21fbb8a?w=500&q=80',
    'amd-ryzen-7-7800x3d': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&q=80',

    // RAM
    'gskill-trident-z5-32gb': 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&q=80',
    'corsair-dominator-64gb': 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=500&q=80',

    // SSDs
    'samsung-990-pro-2tb': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80',
    'wd-black-sn850x-1tb': 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=500&q=80',

    // Monitors
    'asus-rog-swift-pg27aqn': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
    'lg-ultragear-27gp850': 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&q=80',

    // Keyboards
    'razer-huntsman-v3-pro': 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&q=80',
    'corsair-k100-rgb': 'https://images.unsplash.com/photo-1595225476484-a5b21f2b5a2e?w=500&q=80',

    // Mice
    'logitech-gpro-superlight-2': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    'razer-deathadder-v3-pro': 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80',

    // Gaming Chairs
    'secretlab-titan-evo-2024': 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&q=80',

    // Accessories
    'corsair-h150i-elite-lcd': '/images/products/corsair-h150i-elite-lcd.png',
    'nzxt-h7-flow-rgb': '/images/products/nzxt-h7-flow-rgb.png',
};

// Category fallback images
const CATEGORY_FALLBACK = {
    'gpu': 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&q=80',
    'cpu': 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=500&q=80',
    'ram': 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&q=80',
    'ssd': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80',
    'monitors': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
    'keyboards': 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&q=80',
    'mice': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    'chairs': 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&q=80',
    'accessories': 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&q=80',
};

/**
 * Get the best image URL for a product.
 * Priority: product.image (if valid) > slug mapping > category fallback > generic placeholder
 */
export function getProductImage(product) {
    if (product.image) {
        const img = product.image;
        if (img.startsWith('http')) {
            return img;
        }
        
        // Resolve correctly to your Render URL
        const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000';
        const cleanImgPath = img.startsWith('/') ? img : `/media/${img}`;
        return `${baseUrl}${cleanImgPath}`;
    }

    if (product.slug && PRODUCT_IMAGES[product.slug]) {
        return PRODUCT_IMAGES[product.slug];
    }

    const catSlug = product.category_slug || product.category?.slug || '';
    if (CATEGORY_FALLBACK[catSlug]) {
        return CATEGORY_FALLBACK[catSlug];
    }

    return `https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80`;
}

export default getProductImage;
