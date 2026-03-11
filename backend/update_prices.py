import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from products.models import Product

prices_data = {
    'nvidia-rtx-4090': {'price': 165000.00, 'discount_price': 155000.00},
    'amd-rx-7900-xtx': {'price': 105000.00, 'discount_price': 94999.00},
    'nvidia-rtx-4070-ti-super': {'price': 82000.00, 'discount_price': 76999.00},
    'amd-ryzen-9-7950x': {'price': 58000.00, 'discount_price': 54999.00},
    'intel-i9-14900k': {'price': 55000.00, 'discount_price': 52999.00},
    'amd-ryzen-7-7800x3d': {'price': 38000.00, 'discount_price': 35999.00},
    'gskill-trident-z5-32gb': {'price': 14000.00, 'discount_price': 12499.00},
    'corsair-dominator-64gb': {'price': 28000.00, 'discount_price': 25999.00},
    'samsung-990-pro-2tb': {'price': 18000.00, 'discount_price': 15999.00},
    'wd-black-sn850x-1tb': {'price': 9500.00, 'discount_price': 8499.00},
    'asus-rog-swift-pg27aqn': {'price': 90000.00, 'discount_price': 84999.00},
    'lg-ultragear-27gp850': {'price': 38000.00, 'discount_price': 34999.00},
    'razer-huntsman-v3-pro': {'price': 24000.00, 'discount_price': 21999.00},
    'corsair-k100-rgb': {'price': 22000.00, 'discount_price': 19999.00},
    'logitech-gpro-superlight-2': {'price': 15000.00, 'discount_price': 13499.00},
    'razer-deathadder-v3-pro': {'price': 14000.00, 'discount_price': 12999.00},
    'secretlab-titan-evo-2024': {'price': 48000.00, 'discount_price': 44999.00},
    'corsair-h150i-elite-lcd': {'price': 26000.00, 'discount_price': 23999.00},
    'nzxt-h7-flow-rgb': {'price': 15000.00, 'discount_price': None},
}

def update_prices():
    for slug, data in prices_data.items():
        try:
            p = Product.objects.get(slug=slug)
            p.price = data['price']
            if data.get('discount_price'):
                p.discount_price = data['discount_price']
            else:
                p.discount_price = None
            p.save()
            print(f"Updated {p.name} to {p.price}")
        except Product.DoesNotExist:
            print(f"Not found: {slug}")
            
if __name__ == '__main__':
    update_prices()
