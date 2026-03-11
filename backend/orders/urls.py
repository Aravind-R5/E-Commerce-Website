from django.urls import path
from . import views

urlpatterns = [
    # Cart
    path('cart/', views.CartView.as_view(), name='cart'),
    path('cart/add/', views.AddToCartView.as_view(), name='cart-add'),
    path('cart/update/<int:item_id>/', views.UpdateCartItemView.as_view(), name='cart-update'),
    path('cart/remove/<int:item_id>/', views.RemoveCartItemView.as_view(), name='cart-remove'),
    path('cart/clear/', views.ClearCartView.as_view(), name='cart-clear'),
    # Checkout & Orders
    path('checkout/', views.CheckoutView.as_view(), name='checkout'),
    path('orders/', views.OrderListView.as_view(), name='order-list'),
    path('orders/<int:pk>/', views.OrderDetailView.as_view(), name='order-detail'),
    # Admin
    path('admin/orders/', views.AdminOrderListView.as_view(), name='admin-orders'),
    path('admin/orders/<int:pk>/', views.AdminOrderUpdateView.as_view(), name='admin-order-update'),
]
