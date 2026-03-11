from rest_framework import generics, permissions, status, viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as django_filters
from .models import Category, Product, Review
from .serializers import (
    CategorySerializer, ProductListSerializer, ProductDetailSerializer,
    ProductAdminSerializer, ReviewSerializer
)


class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    category = django_filters.CharFilter(field_name='category__slug')
    brand = django_filters.CharFilter(field_name='brand', lookup_expr='iexact')

    class Meta:
        model = Product
        fields = ['category', 'brand', 'featured', 'min_price', 'max_price']


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.select_related('category').all()
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    filterset_class = ProductFilter
    search_fields = ['name', 'description', 'brand']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.select_related('category').prefetch_related('images', 'reviews__user').all()
    serializer_class = ProductDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'


class FeaturedProductsView(generics.ListAPIView):
    queryset = Product.objects.filter(featured=True).select_related('category')[:8]
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


class ProductBrandsView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        brands = Product.objects.values_list('brand', flat=True).distinct().order_by('brand')
        return Response(list(brands))


class ReviewCreateView(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        product = Product.objects.get(pk=self.kwargs['product_id'])
        serializer.save(user=self.request.user, product=product)


# Admin ViewSet
class ProductAdminViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductAdminSerializer
    permission_classes = [permissions.IsAdminUser]
