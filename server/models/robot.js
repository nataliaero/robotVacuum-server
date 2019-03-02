const mongoose = require('../db');

const Schema = mongoose.Schema;

const RobotDataSchema = new Schema ({
  model: {
    type: String,
    required: true
  },
  weight: {
    type: String
  },
  dimensions: {
    type: String
  },
  capacityTrash: {
    type: String
  },
  capacityWater: {
    type: String
  },
  noise: {
    type: String
  },
  autonomy: {
    type: String
  },
  chargeTime: {
    type: String
  },
  nominalPower: {
    type: String
  },
  suctionPower: {
    type: String
  },
  programmable: {
    type: String
  },
  avoidsFall: {
    type: String
  },
  anticollisionSystem: {
    type: String
  },
  remoteControl: {
    type: String
  },
  appMobile: {
    type: String
  },
},{
  timestamp: true
});

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  }
});

const RobotSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  top10: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Boolean,
    default: 0
  },
  subtitle: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  title1: {
    type: String,
    required: true
  },
  imageCard1: {
    type: String,
    required: true
  },
  descriptionCard1: {
    type: String,
    required: true
  },
  title2: {
    type: String,
    required: true
  },
  imageCard2: {
    type: String,
    required: true
  },
  descriptionCard2: {
    type: String,
    required: true
  },
  title3: {
    type: String,
    required: true
  },
  imageCard3: {
    type: String,
    required: true
  },
  descriptionCard3: {
    type: String,
    required: true
  },
  whereToBuy: {
    type: String,
    required: true
  },
  webBuy: {
    type: String,
    required: true
  },
  descriptionCompare: {
    type: String,
    required: true
  },
  tableProps: RobotDataSchema,
  comments: [commentSchema]
},{
  timestamp: true
});

const Robot = mongoose.model('Robot', RobotSchema);

module.exports = Robot;