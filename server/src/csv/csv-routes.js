const express = require('express');
const multer = require('multer');
const CSVUploadController = require('../controllers/csv-upload.controller');

const router = express.Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

module.exports = (container) => {
  const controller = new CSVUploadController(container.csvProcessingService);
  
  router.post('/upload', upload.single('csvFile'), (req, res) => 
    controller.uploadCSV(req, res)
  );
  
  return router;
};