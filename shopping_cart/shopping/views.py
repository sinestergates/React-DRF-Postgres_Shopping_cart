import base64
from django.forms import model_to_dict
from rest_framework.response import Response
from rest_framework.views import APIView
from shopping import models
from shopping import serializers

class Product(APIView):

    def get(self, request: object) -> Response:

        """Простой get, только перевод картинки и запрос ключа упаковки для вывода в front"""

        product = models.Product.objects.all()

        dict = {}
        for i in product:

            values = model_to_dict(i)

            values['image'] = base64.b64encode(i.image)
            values['packaging_name'] = i.packaging.packaging_name
            dict[values['article']] = values


        return Response(dict)




class Order(APIView):

    def post(self, request: object) -> Response:

        """Сохраняем данные в таблицу Order, далее сохраняем все товары в таблицуOrderProduct"""

        order = models.Order(available=True, order_desc='Order from React')
        order.save()
        id = order.id

        for i in request.data:

            request.data[i]['order'] = id
            request.data[i]['product'] = request.data[i]['id']

            serializer = serializers.OrderProduct_serializer(data=request.data[i])
            if serializer.is_valid():
                serializer.save()

        return Response('')