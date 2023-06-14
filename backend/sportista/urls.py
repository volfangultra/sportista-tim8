from django.urls import path, include

from sportista import views

urlpatterns = [
    path("", views.index, name="index"),

    path("test/", views.test, name="index"),

    path("admin/getRentersCount/", views.getRentersCount, name="getRentersCount"),
    path("admin/getUsersCount/", views.getUsersCount, name="getUsersCount"),
    path("admin/getRentalsData/", views.getRentalsData, name="getRentalsData"),
    path("admin/renters/getRenters/", views.getRenters, name="getRenters"),
    path("admin/renters/deleteRenter/<int:params>/", views.deleteRenter, name="deleteRenter"),
    path("admin/renters/send-email/", views.sendEmail, name="sendEmail"),
    path("admin/users/deleteUser/<int:params>/", views.deleteUser, name="deleteUser"),
    path("admin/users/getUsers/", views.getUsers, name="getUsers"),
    path("admin/users/send-email/", views.sendEmail, name="sendEmail"),

    path("renter/spremi", views.spremi, name="spremi"),
    path("daj_sportove", views.dajSportove),
    path("sport/<int:params>/", views.getFields, name="getSport"),
    path("renter/my-fields/<int:params>/", views.getRenterFields, name="getRenterFields"),
    path("user/my-reservations/<int:params>/", views.getUserReservations, name="getUserReservations"),
    path("user/dashboard", views.getUserFields, name="getUserFields"),
    path("renter/delete/<int:params>/", views.deleteRenterField, name="deleteRenterField"),

    path("renter/lock_field/<int:id_field>/<int:state>/", views.lock_field, name="lock_field"),
    path("user/solo_book_field/", views.book_field_solo, name="book_field_solo"),
    path("user/get_dates/<int:field_id>/", views.get_dates, name="book_field_solo"),

    path("renter/getData/<int:params>/", views.getRenterData, name="getRenterData"),
    path("renter/changeData/<int:params>/", views.changeRenterData, name="changeRenterData"),
    path("renter/editFieldData/<int:params>/", views.editFieldData, name="editFieldData"),
    path("renter/getFieldData/<int:params>/", views.getFieldData, name="getFieldData"),
    path("user/getData/<int:params>/", views.getUserData, name="getUserData"),
    path("user/changeData/<int:params>/", views.changeUserData, name="changeUserData"),

]
