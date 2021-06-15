from ..models import Image
from .serializers import ImageSerializer
from rest_framework import viewsets



class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all().order_by('-uploaded')
    serializer_class = ImageSerializer