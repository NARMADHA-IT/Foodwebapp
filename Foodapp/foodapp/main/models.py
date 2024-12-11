
from django.db import models
from django.contrib.auth.models import User


class User(models.Model):
    email_or_phone = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.email_or_phone



class DeliveryAddress(models.Model):
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=10)
    additional_info = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.address_line_1}, {self.city}, {self.state} - {self.zipcode}'
    zipcode = models.CharField(max_length=10, default='000000')


