from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^process$', views.process, name="process"),
    # url(r'^result$', views.result, name="result"),
    url(r'^data.json$', views.data_json, name="data.json"),
]