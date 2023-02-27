from rest_framework import serializers
from shopping import models as model


class Product_serializer(serializers.ModelSerializer):

    class Meta:
        model = model.Product
        fields = '__all__'
        depth = 1

class OrderProduct_serializer(serializers.ModelSerializer):
    class Meta:
        model = model.OrderProduct
        fields = '__all__'