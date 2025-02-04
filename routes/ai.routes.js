const express = require("express");
const { SummarizeAi } = require("../controller/ai.controller");
const router = express.Router();

router.post('/summarize-text', SummarizeAi);

module.exports = router;