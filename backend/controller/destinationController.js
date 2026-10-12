const destinations = require("../model/destinationModel")

exports.addDestinationController = async (req, res) => {
    console.log("inside addDestinationController")

    const {name,besttime, imageurl, tag, description} = req.body
      
        console.log(req.body);
        

    try {
       const existingDestination = await destinations.findOne({ name })
        if (existingDestination) {
            res.status(409).json("package Already Added")
        } else {
            const newDestination = new destinations({
             name,besttime, imageurl, tag, description
               
            })
            await newDestination.save()
            res.status(200).json("package Added Successfully")
        }
    } catch (err) {
        res.status(500).json(err)
        console.log(err);
        
    }
}

exports.getDestinationController = async (req, res) => {
  console.log("Inside getDestinationController");

  const search = req.query.search || ""

  try {
    const query = {
      besttime: {
        $regex: search,
        $options: "i",
      },
    };

    const allDestination = await destinations.find(query)
    return res.status(200).json(allDestination);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.updateDestinationController = async (req, res) => {
    console.log("Inside updateDestinationController");
    const { id } = req.params
    const {name,besttime, imageurl, tag, description} = req.body

    try {
        const updateDestination = await destinations.findByIdAndUpdate({ _id: id }, {name,besttime, imageurl, tag, description }, { new: true })
        res.status(200).json(updateDestination)

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.deleteDestinationController= async (req, res) => {
    console.log("Inside deleteDestinationController");
    const { id } = req.params

    try {
        const deleteDestination = await destinations.findByIdAndDelete(id)
        res.status(200).json(deleteDestination)

    } catch (err) {
        res.status(500).json(err)
    }
}