const bookings = require("../model/bookingModel")
const stripe = require("stripe")(process.env.stripeKey)

exports.addBookingController = async (req, res) => {
    console.log("inside addBookingController")

    const { username, email, destination, date, person, amount } = req.body
    console.log(username, email, destination, date, person, amount);
    console.log(req.body);


    try {
        const existingBooking = await bookings.findOne({ email, destination, date })
        if (existingBooking) {
            res.status(409).json(" Already book the users for this date")
        } else {
            const newBooking = new bookings({
                username, email, destination, date, person, amount

            })
            await newBooking.save()
            res.status(201).json("booking is pending state Successfully")
        }
    } catch (err) {
        res.status(500).json(err)
        console.log(err);

    }
}

// get all booking
exports.getAllBookingController = async (req, res) => {
    console.log("Inside getAllBookingController");
    try {
        const allBookings = await bookings.find()
        return res.status(200).json(allBookings)

    } catch (err) {
        res.status(500).json(err)
    }
}

// get user 
exports.getUserBookingController = async (req, res) => {
    console.log("Inside getUserBookingController");
    const { email } = req.params;

    try {
        const booking = await bookings.find({ email })
        return res.status(200).json(booking)

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.updateBookingController = async (req, res) => {
    console.log("Inside updateBookingController");
    const { id } = req.params
    const { username, email, destination, date, person, amount } = req.body

    try {
        const updateBooking = await bookings.findByIdAndUpdate({ _id: id }, { username, email, destination, date, person, amount }, { new: true })
        res.status(200).json(updateBooking)

    } catch (err) {
        res.status(500).json(err)
    }
}

// update booking status
exports.updateBookingStatusController = async (req, res) => {
    console.log("Inside updateBookingStatusController");
    const { id } = req.params
    const { status } = req.body

    try {
        const updateStatus = await bookings.findByIdAndUpdate({ _id: id }, { status }, { new: true })
        res.status(200).json(updateStatus)

    } catch (err) {
        res.status(500).json(err)
    }
}




// delete single employee
exports.deleteBookingController = async (req, res) => {
    console.log("Inside deleteBookingController");
    const { id } = req.params

    try {
        const deleteBooking = await bookings.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteBooking)

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.makePaymentController = async (req, res) => {
  const { booking } = req.body;

  try {
    if (!booking || !booking.amount) {
      return res.status(400).json("Invalid booking data");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: booking.destination,
              metadata: {
                username: booking.username,
                email: booking.email,
                date: booking.date,
                person: booking.person
              }
            },
            unit_amount: Math.round(booking.amount * 100)
          },
          quantity: 1
        }
      ],

      success_url: `http://localhost:5173/payment-success`,
      cancel_url: `http://localhost:5173/payment-error`
    });

    res.status(200).json({ url: session.url });

  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
};



