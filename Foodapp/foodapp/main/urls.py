from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('dessert/', views.dessert, name='dessert'),
    path('pizza/', views.pizza, name='pizza'),
    path('burger/', views.burger, name='burger'),
    path('soup/', views.soup, name='soup'),
    path('drinks/', views.drinks, name='drinks'),
    path('signin/', views.signin, name='signin'),
    path('signUp/', views.signUp, name='signUp'),
    path('help/', views.help, name='help'),
    path('cart/', views.cart, name='cart'),  # Handles GET for cart page
    path('save-address/', views.save_address, name='save_address'),
    path('payment/', views.payment_page, name='payment'),
]
