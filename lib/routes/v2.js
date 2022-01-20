'use strict';

const express = require('express');
const dataModules = require('../models');

const router = express.Router();

const basicAuth = require('../middleware/basic');
const bearerAuth = require('../middleware/bearer');
const permissions = require('../middleware/acl');

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model', basicAuth, handleGetAll);
router.get('/:model/:id', basicAuth, handleGetOne);
router.post('/:model', bearerAuth, permissions('create'), handleCreate);
router.put('/:model/:id', bearerAuth, permissions('update'), handleUpdate);
router.delete('/:model/:id', bearerAuth, permissions('delete'), handleDelete);

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

async function handleCreate(req, res, next) {
  let obj = req.body;
  try {
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
  } catch (err) {
    next(err.message);
  }
}

async function handleUpdate(req, res, next) {
  const id = req.params.id;
  const obj = req.body;
  try {
    let updatedRecord = await req.model.update(id, obj);
    res.status(200).json(updatedRecord);
  } catch (err) {
    next(err.message);
  }
}

async function handleDelete(req, res, next) {
  let id = req.params.id;
  try {
    let deletedRecord = await req.model.delete(id);
    res.status(200).json(deletedRecord);
  } catch (err) {
    next(err.message);
  }
}


module.exports = router;