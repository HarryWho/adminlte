const mongoose = require('mongoose')

const SettingSchema = new mongoose.Schema({

  layout: {
    type: String,
    default: 'fixed'
  },
  collapse: {
    type: String,
    default: ''
  },
  skin: {
    type: String,
    default: 'skin-yellow'
  },
  expand_on_hover: {
    type: String,
    default: ''
  },
  toggle_right: {
    type: String,
    default: ''
  },
  control_sidebar: {
    type: String,
    default: 'control-sidebar-light'
  }
})

module.exports = mongoose.model("Settings", SettingSchema);