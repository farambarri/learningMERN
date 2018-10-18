"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});
module.exports = mongoose.model("Task", TaskSchema);
//# sourceMappingURL=task.js.map