from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from django.contrib import admin
from django.urls import path,include



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('images.api.urls', namespace='api-images')),
    path('',TemplateView.as_view(template_name='index.html'))
] 

urlpatterns +=  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns +=  static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)