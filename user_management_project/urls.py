from django.urls import path, include
from django.contrib import admin

urlpatterns = [
    path('users/', include('users.urls')),
	path('admin/', admin.site.urls)
]
