import { Router } from "express";
import multer from "multer";
import CsvContextContainer from "../containers/csv-context-container.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

const csvContextContainer = new CsvContextContainer();

router.post("/upload", upload.single("csvFile"), async (req, res) => {
  const csvController = csvContextContainer.getCsvController();
  return await csvController.uploadCsv(req, res);
});

router.get("/export", async (req, res) => {

  const csvController = csvContextContainer.getCsvController()
   return await csvController.exportPlayersCSV(req, res);
});

export default router;
