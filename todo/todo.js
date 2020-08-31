const fs = require("fs");
let todoList = [];

const create = (description) => {
  loadDB();
  let todo = {
    description,
    completed: false,
  };

  todoList.push(todo);
  saveToDB();
  return todo;
};

const loadDB = () => {
  try {
    todoList = require("../db/data.json");
  } catch (error) {
    todoList = [];
  }
};

const saveToDB = () => {
  let data = JSON.stringify(todoList);
  fs.writeFile("db/data.json", data, (err) => {
    if (err) throw new Error("couldn't save: ", err);
  });
};

const getList = () => {
  loadDB();
  return todoList;
};

const update = (description, completed = true) => {
  loadDB();
  const index = todoList.findIndex((task) => task.description === description);
  if (index >= 0) {
    todoList[index].completed = completed;
    saveToDB();
    return true;
  } else {
    return false;
  }
};

const remove = (description) => {
  loadDB();
  const updatedArray = todoList.filter(
    (task) => task.description !== description
  );
  if (todoList.length === updatedArray.length) {
    return false;
  } else {
    todoList = updatedArray;
    saveToDB();
    return true;
  }
};

module.exports = { create, getList, update, remove };
