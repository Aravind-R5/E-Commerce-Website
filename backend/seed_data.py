"""
Seed data management command for gaming e-commerce store.
Run with: python manage.py seed_data
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from products.models import Category, Product

User = get_user_model()


def seed():
    print("🎮 Seeding gaming store database...")

    # Create admin user
    if not User.objects.filter(email='admin@nexgengear.com').exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@nexgengear.com',
            password='admin123',
            first_name='Admin',
            last_name='User'
        )
        print("✅ Admin user created (admin@nexgengear.com / admin123)")

    # Create demo user
    if not User.objects.filter(email='demo@nexgengear.com').exists():
        User.objects.create_user(
            username='gamer',
            email='demo@nexgengear.com',
            password='demo1234',
            first_name='Demo',
            last_name='Gamer'
        )
        print("✅ Demo user created (demo@nexgengear.com / demo1234)")

    # Categories
    categories_data = [
        {'name': 'Graphics Cards', 'slug': 'gpu', 'description': 'High-performance GPUs for gaming and rendering'},
        {'name': 'Processors', 'slug': 'cpu', 'description': 'Latest CPUs for maximum performance'},
        {'name': 'RAM', 'slug': 'ram', 'description': 'High-speed memory modules'},
        {'name': 'Storage', 'slug': 'ssd', 'description': 'NVMe SSDs and HDDs for fast storage'},
        {'name': 'Monitors', 'slug': 'monitors', 'description': 'Gaming monitors with high refresh rates'},
        {'name': 'Keyboards', 'slug': 'keyboards', 'description': 'Mechanical gaming keyboards'},
        {'name': 'Mice', 'slug': 'mice', 'description': 'Precision gaming mice'},
        {'name': 'Gaming Chairs', 'slug': 'chairs', 'description': 'Ergonomic gaming chairs for long sessions'},
        {'name': 'Accessories', 'slug': 'accessories', 'description': 'PC accessories and peripherals'},
    ]

    categories = {}
    for cat_data in categories_data:
        cat, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults=cat_data
        )
        categories[cat_data['slug']] = cat
        if created:
            print(f"  📁 Category: {cat.name}")

    # Products
    products_data = [
        # GPUs
        {
            'name': 'NVIDIA GeForce RTX 4090',
            'slug': 'nvidia-rtx-4090',
            'description': 'The ultimate gaming GPU. NVIDIA GeForce RTX 4090 delivers incredible performance with Ada Lovelace architecture, 24GB GDDR6X memory, and advanced ray tracing capabilities for the most demanding games and creative workflows.',
            'price': 165000.00,
            'discount_price': 155000.00,
            'brand': 'NVIDIA',
            'stock': 15,
            'category': categories['gpu'],
            'featured': True,
            'specifications': {'Memory': '24GB GDDR6X', 'Boost Clock': '2.52 GHz', 'CUDA Cores': '16384', 'TDP': '450W'}
        },
        {
            'name': 'AMD Radeon RX 7900 XTX',
            'slug': 'amd-rx-7900-xtx',
            'description': 'AMD Radeon RX 7900 XTX with RDNA 3 architecture delivers stunning 4K gaming performance with 24GB GDDR6 memory and hardware-accelerated ray tracing.',
            'price': 105000.00,
            'discount_price': 94999.00,
            'brand': 'AMD',
            'stock': 20,
            'category': categories['gpu'],
            'featured': True,
            'specifications': {'Memory': '24GB GDDR6', 'Boost Clock': '2.5 GHz', 'Stream Processors': '6144', 'TDP': '355W'}
        },
        {
            'name': 'NVIDIA GeForce RTX 4070 Ti Super',
            'slug': 'nvidia-rtx-4070-ti-super',
            'description': 'Amazing 1440p and great 4K gaming performance with 16GB GDDR6X memory. Perfect balance of power and efficiency.',
            'price': 82000.00,
            'discount_price': 76999.00,
            'brand': 'NVIDIA',
            'stock': 25,
            'category': categories['gpu'],
            'featured': False,
            'specifications': {'Memory': '16GB GDDR6X', 'Boost Clock': '2.61 GHz', 'CUDA Cores': '8448', 'TDP': '285W'}
        },
        # CPUs
        {
            'name': 'AMD Ryzen 9 7950X',
            'slug': 'amd-ryzen-9-7950x',
            'description': '16-core, 32-thread unlocked desktop processor with Zen 4 architecture. The ultimate processor for gamers and creators.',
            'price': 58000.00,
            'discount_price': 54999.00,
            'brand': 'AMD',
            'stock': 30,
            'category': categories['cpu'],
            'featured': True,
            'specifications': {'Cores': '16', 'Threads': '32', 'Base Clock': '4.5 GHz', 'Boost Clock': '5.7 GHz', 'TDP': '170W'}
        },
        {
            'name': 'Intel Core i9-14900K',
            'slug': 'intel-i9-14900k',
            'description': 'Intel\'s flagship 14th Gen processor with 24 cores (8P+16E), 32 threads. Blazing fast single and multi-threaded performance.',
            'price': 55000.00,
            'discount_price': 52999.00,
            'brand': 'Intel',
            'stock': 22,
            'category': categories['cpu'],
            'featured': True,
            'specifications': {'Cores': '24 (8P+16E)', 'Threads': '32', 'Base Clock': '3.2 GHz', 'Boost Clock': '6.0 GHz', 'TDP': '125W'}
        },
        {
            'name': 'AMD Ryzen 7 7800X3D',
            'slug': 'amd-ryzen-7-7800x3d',
            'description': 'The best gaming processor with 3D V-Cache technology. 8 cores, 16 threads of pure gaming dominance.',
            'price': 38000.00,
            'discount_price': 35999.00,
            'brand': 'AMD',
            'stock': 35,
            'category': categories['cpu'],
            'featured': False,
            'specifications': {'Cores': '8', 'Threads': '16', 'Base Clock': '4.2 GHz', 'Boost Clock': '5.0 GHz', 'L3 Cache': '96MB'}
        },
        # RAM
        {
            'name': 'G.Skill Trident Z5 RGB 32GB DDR5',
            'slug': 'gskill-trident-z5-32gb',
            'description': 'Premium DDR5 memory kit with stunning RGB lighting. 32GB (2x16GB) DDR5-6000 for extreme performance.',
            'price': 14000.00,
            'discount_price': 12499.00,
            'brand': 'G.Skill',
            'stock': 50,
            'category': categories['ram'],
            'featured': True,
            'specifications': {'Capacity': '32GB (2x16GB)', 'Speed': 'DDR5-6000', 'CAS Latency': 'CL30', 'Voltage': '1.35V'}
        },
        {
            'name': 'Corsair Dominator Platinum 64GB DDR5',
            'slug': 'corsair-dominator-64gb',
            'description': 'Premium 64GB DDR5 kit with Corsair DHX cooling and customizable RGB. Built for professionals and enthusiasts.',
            'price': 28000.00,
            'discount_price': 25999.00,
            'brand': 'Corsair',
            'stock': 18,
            'category': categories['ram'],
            'featured': False,
            'specifications': {'Capacity': '64GB (2x32GB)', 'Speed': 'DDR5-5600', 'CAS Latency': 'CL36', 'Voltage': '1.25V'}
        },
        # SSDs
        {
            'name': 'Samsung 990 Pro 2TB NVMe SSD',
            'slug': 'samsung-990-pro-2tb',
            'description': 'Next-level SSD performance with PCIe 4.0 NVMe. Sequential read up to 7,450 MB/s for lightning-fast load times.',
            'price': 18000.00,
            'discount_price': 15999.00,
            'brand': 'Samsung',
            'stock': 40,
            'category': categories['ssd'],
            'featured': True,
            'specifications': {'Capacity': '2TB', 'Interface': 'PCIe 4.0 NVMe', 'Read Speed': '7,450 MB/s', 'Write Speed': '6,900 MB/s'}
        },
        {
            'name': 'WD Black SN850X 1TB',
            'slug': 'wd-black-sn850x-1tb',
            'description': 'WD_BLACK SN850X NVMe SSD with Game Mode 2.0 for faster gaming. Up to 7,300 MB/s read speeds.',
            'price': 9500.00,
            'discount_price': 8499.00,
            'brand': 'Western Digital',
            'stock': 55,
            'category': categories['ssd'],
            'featured': False,
            'specifications': {'Capacity': '1TB', 'Interface': 'PCIe 4.0 NVMe', 'Read Speed': '7,300 MB/s', 'Write Speed': '6,300 MB/s'}
        },
        # Monitors
        {
            'name': 'ASUS ROG Swift PG27AQN 27" 360Hz',
            'slug': 'asus-rog-swift-pg27aqn',
            'description': '27-inch 1440p IPS gaming monitor with 360Hz refresh rate, 1ms response time, G-SYNC and HDR support.',
            'price': 90000.00,
            'discount_price': 84999.00,
            'brand': 'ASUS',
            'stock': 12,
            'category': categories['monitors'],
            'featured': True,
            'specifications': {'Panel': 'IPS', 'Resolution': '2560x1440', 'Refresh Rate': '360Hz', 'Response Time': '1ms'}
        },
        {
            'name': 'LG 27GP850-B UltraGear 165Hz',
            'slug': 'lg-ultragear-27gp850',
            'description': '27" Nano IPS QHD gaming monitor with 165Hz (OC 180Hz), 1ms GtG, HDR400, and DCI-P3 98% color gamut.',
            'price': 38000.00,
            'discount_price': 34999.00,
            'brand': 'LG',
            'stock': 28,
            'category': categories['monitors'],
            'featured': False,
            'specifications': {'Panel': 'Nano IPS', 'Resolution': '2560x1440', 'Refresh Rate': '165Hz', 'Color Gamut': 'DCI-P3 98%'}
        },
        # Keyboards
        {
            'name': 'Razer Huntsman V3 Pro',
            'slug': 'razer-huntsman-v3-pro',
            'description': 'Analog optical gaming keyboard with adjustable actuation, magnetic wrist rest, and Razer Chroma RGB.',
            'price': 24000.00,
            'discount_price': 21999.00,
            'brand': 'Razer',
            'stock': 45,
            'category': categories['keyboards'],
            'featured': True,
            'specifications': {'Switch': 'Razer Analog Optical', 'Layout': 'Full-Size', 'Backlight': 'RGB Per-Key', 'Connection': 'USB-C'}
        },
        {
            'name': 'Corsair K100 RGB Mechanical',
            'slug': 'corsair-k100-rgb',
            'description': 'Premium mechanical gaming keyboard with Corsair OPX switches, iCUE control wheel, and per-key RGB lighting.',
            'price': 22000.00,
            'discount_price': 19999.00,
            'brand': 'Corsair',
            'stock': 30,
            'category': categories['keyboards'],
            'featured': False,
            'specifications': {'Switch': 'Corsair OPX', 'Layout': 'Full-Size', 'Backlight': 'RGB Per-Key', 'Macro Keys': '6'}
        },
        # Mice
        {
            'name': 'Logitech G Pro X Superlight 2',
            'slug': 'logitech-gpro-superlight-2',
            'description': 'Ultra-lightweight wireless gaming mouse at just 60g with HERO 2 sensor, LIGHTSPEED wireless, and 95-hour battery.',
            'price': 15000.00,
            'discount_price': 13499.00,
            'brand': 'Logitech',
            'stock': 60,
            'category': categories['mice'],
            'featured': True,
            'specifications': {'Sensor': 'HERO 2', 'DPI': '32,000', 'Weight': '60g', 'Battery': '95 hours'}
        },
        {
            'name': 'Razer DeathAdder V3 Pro',
            'slug': 'razer-deathadder-v3-pro',
            'description': 'Ergonomic wireless gaming mouse with Focus Pro 30K sensor, HyperSpeed wireless, and ultra-lightweight 63g design.',
            'price': 14000.00,
            'discount_price': 12999.00,
            'brand': 'Razer',
            'stock': 42,
            'category': categories['mice'],
            'featured': False,
            'specifications': {'Sensor': 'Focus Pro 30K', 'DPI': '30,000', 'Weight': '63g', 'Battery': '90 hours'}
        },
        # Gaming Chairs
        {
            'name': 'Secretlab Titan Evo 2024',
            'slug': 'secretlab-titan-evo-2024',
            'description': 'Award-winning ergonomic gaming chair with Neo Hybrid Leatherette, 4D armrests, and magnetic memory foam head pillow.',
            'price': 48000.00,
            'discount_price': 44999.00,
            'brand': 'Secretlab',
            'stock': 15,
            'category': categories['chairs'],
            'featured': True,
            'specifications': {'Material': 'Neo Hybrid Leatherette', 'Max Load': '130kg', 'Recline': '165°', 'Armrests': '4D'}
        },
        # Accessories
        {
            'name': 'Corsair iCUE H150i Elite LCD XT',
            'slug': 'corsair-h150i-elite-lcd',
            'description': 'Premium 360mm AIO liquid CPU cooler with customizable IPS LCD display and three AF120 RGB Elite fans.',
            'price': 26000.00,
            'discount_price': 23999.00,
            'brand': 'Corsair',
            'stock': 20,
            'category': categories['accessories'],
            'featured': True,
            'specifications': {'Radiator': '360mm', 'Display': '2.1" IPS LCD', 'Fans': '3x AF120 RGB Elite', 'Socket': 'LGA 1700/AM5'}
        },
        {
            'name': 'NZXT H7 Flow RGB Mid-Tower Case',
            'slug': 'nzxt-h7-flow-rgb',
            'description': 'Premium mid-tower PC case with perforated front panel for optimal airflow, tempered glass side panel, and RGB fan hub.',
            'price': 15000.00,
            'brand': 'NZXT',
            'stock': 25,
            'category': categories['accessories'],
            'featured': False,
            'specifications': {'Form Factor': 'Mid-Tower ATX', 'GPU Clearance': '400mm', 'CPU Cooler': '185mm', 'Drive Bays': '2x 2.5" + 2x 3.5"'}
        },
    ]

    for prod_data in products_data:
        product, created = Product.objects.get_or_create(
            slug=prod_data['slug'],
            defaults=prod_data
        )
        if created:
            print(f"  🎮 Product: {product.name}")

    print(f"\n✅ Seeding complete! {Category.objects.count()} categories, {Product.objects.count()} products")
    print("🔑 Admin login: admin@nexgengear.com / admin123")
    print("👤 Demo login: demo@nexgengear.com / demo1234")


if __name__ == '__main__':
    seed()
