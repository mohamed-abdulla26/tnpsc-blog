// const { Schema, models, model } = require("mongoose");

// const enquirySchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//     }, 
//     phone: {
//       type: String,
//       required: true,
//       trim: true
//     }
// });

// const EnquiryModel = models.Enquiry || model('Enquiry', enquirySchema);

// export default EnquiryModel;


import { Schema, model, models } from "mongoose";

const enquirySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
});

const EnquiryModel = models.Enquiry || model("Enquiry", enquirySchema);
export default EnquiryModel;
