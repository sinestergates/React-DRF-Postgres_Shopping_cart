from django.db import models

class Packaging(models.Model):
    packaging_name = models.CharField(max_length=255, blank=True, null=True)
    packaging_descr = models.CharField(max_length=1000, blank=True, null=True)
    packaging_store = models.BooleanField(default=True)

    class Meta:
        managed = True
        db_table = 'Packaging'


class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    product_name = models.CharField(max_length=255, blank=True, null=True)
    product_descr = models.CharField(max_length=1000, blank=True, null=True)
    quant = models.IntegerField(blank=True, null=True)
    unit_of_measurement = models.CharField(max_length=100, blank=True, null=True)
    price_all = models.FloatField()
    price_per_piece = models.FloatField()
    article = models.IntegerField(blank=True, null=True)
    packaging = models.ForeignKey(Packaging, models.DO_NOTHING, blank=True, null=True)
    image = models.BinaryField(blank=True, null=True)
    next_packaging = models.IntegerField(blank=True, null=True)
    quant_next_packaging = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Product'


class Order(models.Model):
    order_timestamp = models.DateTimeField(blank=True, null=True)
    available = models.BooleanField(default=True)
    order_desc = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'Order'

class OrderProduct(models.Model):
    product = models.ForeignKey(Product, models.DO_NOTHING, db_column='product_id', blank=True, null=True)
    quant = models.IntegerField(db_column='quant', blank=True, null=True)
    packaging = models.ForeignKey(Packaging, models.DO_NOTHING, db_column='packaging', blank=True, null=True)
    order = models.ForeignKey(Order, models.DO_NOTHING, db_column='order_id', blank=True, null=True)
    class Meta:
        managed = True
        db_table = 'OrderProduct'




