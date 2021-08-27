import express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.get("/", async (req, res) => {
  try {
    const task = await Task.find();
    console.log(task);
    res.send(task);
    
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  const tasks = await Task.findById(req.params.id);
  console.log(tasks);
  res.send(tasks);
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const myTask = new Task({ title, description });
  await myTask.save();
  res.json({ status: "saved" });
});

router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  const myTask = { title, description };
  await Task.findByIdAndUpdate(req.params.id, myTask);
  res.json({ status: "updated" });
});

router.delete("/:id", async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({ status: "deleted" });
});

module.exports = router;
