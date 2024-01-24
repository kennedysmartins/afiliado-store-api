import express from "express"
import * as extractorController from "../controllers/extractor.controller"

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const url = req.body.url;

    //parse a object with url
    const result = await extractorController.extractMetadata({url});
    res.json(result);
  } catch (error) {
    console.error("Erro durante a extração:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router
