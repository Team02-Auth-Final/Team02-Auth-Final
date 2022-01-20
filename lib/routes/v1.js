'use strict';

const express = require('express');
const dataModules = require('../models');
console.log('DATAMODULES', dataModules);
const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  console.log(modelName);
  console.log(dataModules[modelName]);  
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

//routes require no authentication
//non authenticated viewers can view all public posts

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);


async function handleGetAll(req, res, next) {
  try {
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
  } catch (err) {
    next(err.message);
  }
}

async function handleGetOne(req, res, next) {
  const id = req.params.id;
  try {
    let theRecord = await req.model.get(id);
    res.status(200).json(theRecord);
  } catch (err) {
    next(err.message);
  }
}


module.exports = router;
