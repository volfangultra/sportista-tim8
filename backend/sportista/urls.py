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
    path("admin/inbox/getMessages/", views.getMessages, name="getMessages"),
    path("admin/inbox/getArchivedMessages/", views.getArchivedMessages, name="getArchivedMessages"),
    path("admin/inbox/delete/<int:params>/", views.deleteMessage, name="deleteMessage"),
    path("admin/inbox/archive/<int:params>/", views.archiveMessage, name="archiveMessage"),

    path("renter/spremi", views.spremi, name="spremi"),
    path("get_sports/", views.get_sports),
    path("get_emails/", views.get_emails),
    path("sport/<int:params>/", views.getFields, name="getSport"),
    path("renter/my-fields/<int:params>/", views.getRenterFields, name="getRenterFields"),
    path("user/my-reservations/<int:params>/", views.getUserReservations, name="getUserReservations"),
    path("user/dashboard", views.getUserFields, name="getUserFields"),
    path("renter/delete/<int:params>/", views.deleteRenterField, name="deleteRenterField"),

    path("renter/lock_field/<int:id_field>/<int:state>/", views.lock_field, name="lock_field"),
    path("user/solo_book_field/", views.book_field_solo, name="book_field_solo"),
    path("user/get_dates/<int:field_id>/", views.get_dates, name="book_field_solo"),
    path("user/get_favorite_fields/<int:user_id>/", views.get_favorite_field, name="get_favorite_field"),
    path("user/favorite_field/<int:field_id>/<int:user_id>/", views.favorite_field, name="favorite_field"),
    path("user/unfavorite_field/<int:field_id>/<int:user_id>/", views.unfavorite_field, name="unfavorite_field"),

    path("renter/getData/<int:params>/", views.getRenterData, name="getRenterData"),
    path("renter/changeData/<int:params>/", views.changeRenterData, name="changeRenterData"),
    path("renter/editFieldData/<int:params>/", views.editFieldData, name="editFieldData"),
    path("renter/getFieldData/<int:params>/", views.getFieldData, name="getFieldData"),
    path("user/getData/<int:params>/", views.getUserData, name="getUserData"),
    path("user/changeData/<int:params>/", views.changeUserData, name="changeUserData"),
    path("renter/get_bookings/<int:id_rentera>/", views.get_bookings, name="get_bookings"),
    path("renter/approve_booking/<int:id_booking>/", views.approve_booking, name="get_bookings"),
    path("renter/cancel_booking/<int:id_booking>/", views.cancel_booking, name="get_bookings"),
    path("user/rate_field/<int:rating>/<int:id_field>/<int:id_user>/", views.rate_field, name="rate"),
    path("get_ratings/", views.get_ratings, name="get_ratings"),

    path("inbox/message/", views.sendMessage, name="sendMessage"),

]
