const packages = require("../model/packageModel")

exports.addPackageController = async (req, res) => {
    console.log("inside addPackageController")

    const {title,destination, price, duration, highlights, startDate, endDate, imageurl} = req.body
        // const Uploadimage = req.file ? [req.file.filename] : []
        console.log(req.body);
        

    try {
       const existingPackage = await packages.findOne({ title })
        if (existingPackage) {
            res.status(409).json("package Already Added")
        } else {
            const newPackage = new packages({
                title,destination, price, duration, highlights, startDate, endDate, imageurl 
               
            })
            await newPackage.save()
            res.status(200).json("package Added Successfully")
        }
    } catch (err) {
        res.status(500).json(err)
        console.log(err);
        
    }
}

exports.getPackageController = async (req, res) => {
    console.log("Inside getPackageController");
    try {
        const allPackages = await packages.find()
      return  res.status(200).json(allPackages)

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.updatePackageController = async (req, res) => {
    console.log("Inside updatePackageController");
    const { id } = req.params
    const { title,destination, price, duration, highlights, startDate, endDate, imageurl } = req.body

    try {
        const updatePackage = await packages.findByIdAndUpdate({ _id: id }, {title,destination, price, duration, highlights, startDate, endDate, imageurl }, { new: true })
        res.status(200).json(updatePackage)

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.deletePackageController= async (req, res) => {
    console.log("Inside deletePackageController");
    const { id } = req.params

    try {
        const deletePackage = await packages.findByIdAndDelete(id)
        res.status(200).json(deletePackage)

    } catch (err) {
        res.status(500).json(err)
    }
}










