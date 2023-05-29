const express = require('express');
const router= express.Router();

const {createClass,mapSectionToClass,mapSectionToClassSection} = require('../../controllers/class')


router.post('/createclass',createClass);
router.post('/mapsection', mapSectionToClass);
router.post('/mapstudent',mapSectionToClassSection);


module.exports = router;
