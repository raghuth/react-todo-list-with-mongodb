const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/todoListModel");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost/TodoListDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/api/todo", async (req, res) => {
  const records = await Todo.find({});
  console.log("get todoList", records);
  res.json(records);
});

app.post("/api/create", async (req, res) => {
  const record = req.body;
  console.log(record);
  const response = await Todo.create(record);
  console.log("created new todoList", response);
  res.json({ status: "ok" });
});

// In progress edit //

// app.put("/api/edit", async (req, res) => {
//   const records = await Todo.find({});
//   console.log("get todoList", records);
//   res.json(records);
// });

// Get Single Student
app.get("/api/update-todo/:id", (req, res) => {
  Todo.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

app.put((req, res, next) => {
  Todo.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Student updated successfully !");
      }
    }
  );
});
// In progress edit //

// In progress delete //

app.delete("/api/delete/:id", async (req, res) => {
  let deleteTodo = req.params.id;
  console.log("deleteTodo", deleteTodo);
  await Todo.deleteOne({ _id: deleteTodo }, (err, data) => {
    if (err) {
      res.status(500),
        json({
          massage: " todo delete error",
        });
    } else {
      res.status(200).json({
        massage: " deleted todo successfully",
      });
    }
  });
});

// app.delete("/api/delete/:id", async (req, res, next) => {
//   await Todo.findByIdAndRemove(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data,
//       });
//     }
//   });
// });

// In progress delete //

const port = 8000;

app.listen(port, () => console.log(`{Server started on port ${port}}`));
