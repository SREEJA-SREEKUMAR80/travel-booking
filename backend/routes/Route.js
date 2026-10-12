const express = require("express");
const userController = require("../controller/userController");
const jwtMiddleware = require("../middleware/jwtMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const multerConfig=require("../middleware/multerMiddleware")
const packageController = require("../controller/packageController");
const  destinationController=require("../controller/destinationController")
const bookingControlller=require("../controller/bookingController")


const Route = new express.Router();

// User routes
Route.post('/register', userController.registerController);
Route.post('/login', userController.loginController);
Route.post('/google-login', userController.googleLoginController);
Route.put("/update-profile",jwtMiddleware,multerConfig.single("profile"),userController.editUserProfileController);
// Route.put("/admin-update-profile", userController.updateAdminProfile);

// payement
Route.put('/make-payment',jwtMiddleware,bookingControlller.makePaymentController)

// Package route
Route.post("/add-package",packageController.addPackageController);
Route.get("/package",packageController.getPackageController)
Route.put("/update-package/:id",packageController.updatePackageController)
Route.delete("/delete-package/:id",packageController.deletePackageController)


//destination route
Route.post("/add-destination",destinationController.addDestinationController)
Route.get("/get-destination",destinationController.getDestinationController)
Route.put("/update-destination/:id",destinationController.updateDestinationController)
Route.delete("/delete-destination/:id",destinationController.deleteDestinationController)

// booking route

Route.post("/add-booking",bookingControlller.addBookingController)
Route.get("/get-booking",bookingControlller.getAllBookingController)
Route.get("/user-booking/:email",bookingControlller.getUserBookingController)
Route.put("/update-booking/:id",bookingControlller.updateBookingController)
Route.put("/update-booking-status/:id",bookingControlller.updateBookingStatusController)
Route.delete("/delete-booking/:id",bookingControlller.deleteBookingController)





module.exports = Route;