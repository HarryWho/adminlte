const express = require('express')
const router = express.Router();
const Settings = require('../../model/SettingModel')
router.get('/', (req, res) => {
  res.redirect('/')
})

router.post('/', async(req, res) => {
  req.user.settings.layout = req.body.layout;
  req.user.settings.skin = req.body.skin;
  req.user.settings.collapse = req.body.collapse
  req.user.settings.expand_on_hover = req.body.expand_on_hover
  req.user.settings.toggle_right = req.body.toggle_right
  req.user.settings.control_sidebar = req.body.control_sidebar
  req.session.save(function(err) {
    req.session.reload(function(err) {

    });
  });
  await Settings.findByIdAndUpdate({ _id: req.user.settings._id }, {
    layout: req.body.layout,
    skin: req.body.skin,
    collapse: req.body.collapse,
    expand_on_hover: req.body.expand_on_hover,
    toggle_right: req.body.toggle_right,
    control_sidebar: req.body.control_sidebar
  });

  res.send('Settings saved successfully')
})


module.exports = router