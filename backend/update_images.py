"""
Update product images in the database.
Run with: python update_images.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from products.models import Product

# Map slug to image file
image_map = {
    'nvidia-rtx-4090': 'products/nvidia-rtx-4090.png',
    'amd-rx-7900-xtx': 'products/amd-rx-7900-xtx.png',
    'nvidia-rtx-4070-ti-super': 'products/nvidia-rtx-4070-ti-super.png',
    'amd-ryzen-9-7950x': 'products/amd-ryzen-9-7950x.png',
    'intel-i9-14900k': 'products/intel-i9-14900k.png',
    'amd-ryzen-7-7800x3d': 'products/amd-ryzen-7-7800x3d.png',
    'gskill-trident-z5-32gb': 'products/gskill-trident-z5-32gb.png',
    'corsair-dominator-64gb': 'products/corsair-dominator-64gb.png',
    'samsung-990-pro-2tb': 'products/samsung-990-pro-2tb.png',
    'wd-black-sn850x-1tb': 'products/wd-black-sn850x-1tb.png',
    'asus-rog-swift-pg27aqn': 'products/asus-rog-swift-pg27aqn.png',
    'lg-ultragear-27gp850': 'products/lg-ultragear-27gp850.png',
    'razer-huntsman-v3-pro': 'products/razer-huntsman-v3-pro.png',
    'corsair-k100-rgb': 'products/corsair-k100-rgb.png',
    'logitech-gpro-superlight-2': 'products/logitech-gpro-superlight-2.png',
    'razer-deathadder-v3-pro': 'products/razer-deathadder-v3-pro.png',
    'secretlab-titan-evo-2024': 'products/secretlab-titan-evo-2024.png',
    # These 2 images not generated (quota limit) - will use placeholders
    'corsair-h150i-elite-lcd': 'products/corsair-h150i-elite-lcd.png',
    'nzxt-h7-flow-rgb': 'products/nzxt-h7-flow-rgb.png',
}

updated = 0
for slug, image_path in image_map.items():
    try:
        product = Product.objects.get(slug=slug)
        product.image = image_path
        product.save()
        print(f"  [OK] {product.name} -> {image_path}")
        updated += 1
    except Product.DoesNotExist:
        print(f"  [SKIP] Product not found: {slug}")

print(f"\nUpdated {updated} product images!")
