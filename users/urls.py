from django.urls import path
from .views import UserFilterAPIView, UserListCreateAPIView, UserRetrieveUpdateDestroyAPIView, ProfileListCreateAPIView, ProfileRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', UserListCreateAPIView.as_view(), name='user-list'),
    path('<int:pk>/', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-detail'),
	path('filter/', UserFilterAPIView.as_view(), name='user-filter'),
]
