import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minLength: [1, "Title can bot be empty"],
      maxLength: [200, "Title cannot exceed 200 character"],
      required: [true, "Title is required"],
    },
    description: {
      type: true,
      trim: true,
      default: "",
      maxLength: [1000, "Description cannot exceed 1000 character"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timeseries: true },
);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
