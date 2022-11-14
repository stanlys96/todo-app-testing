import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import Swal from "sweetalert2";

interface TodoList {
  id: number;
  name: string;
}

export default function Home() {
  const [todoList, setTodoList] = useState<TodoList[]>([]);
  const [currentItem, setCurrentItem] = useState<string>("");
  const [currentId, setCurrentId] = useState<number>(0);

  return (
    <div className="p-10 min-h-screen bg-slate-500">
      <h1 className="text-2xl font-bold mb-5">To Do List</h1>
      <input value={currentItem} onChange={(e) => {
        setCurrentItem(e.target.value);
      }} className="p-2 rounded-lg mr-3 focus:outline-none" type="text" placeholder="Enter Task..."/>
      <input onClick={() => {
        if (currentItem === "") return;
        const currentTodoList: TodoList = {
          id: currentId,
          name: currentItem,
        }
        setTodoList([...todoList, currentTodoList]);
        setCurrentId(currentId + 1);
        setCurrentItem("");
      }} className="cursor-pointer bg-cyan-600 py-2 px-4 text-white rounded-lg mb-6" type="button" value="Add Task"/>
      <div className="grid grid-cols-4 gap-4">
        {
          todoList.map((item, index) => {
            return <div className="px-4 py-8 text-center bg-white rounded-lg relative" key={item.id}>
              <span>{item.name}</span>
              <a className="absolute top-2 left-3 font-bold text-red-600 cursor-pointer" onClick={async() => {
                const { value: newTask } = await Swal.fire({
                  title: 'Input new task',
                  input: 'text',
                  showCancelButton: true,
                  inputLabel: 'Your new task',
                  inputPlaceholder: 'Enter your new task',
                });
                if (newTask) {
                  let theIndex = todoList.findIndex((obj) => obj.id === item.id);
                  let todoListTemp = todoList;
                  todoListTemp[theIndex].name = newTask;
                  setTodoList([...todoListTemp]);
                }
              }}>Edit</a>
              <a onClick={() => {
                for (let i = 0; i < todoList.length; i++) {
                  if (todoList[i].id === item.id) {
                    setTodoList(todoList.filter((x) => x.id != item.id));
                    break;
                  }
                }
              }} className="absolute top-2 right-3 font-bold text-red-600 cursor-pointer">X</a>
            </div>
          })
        }
      </div>
    </div>
  )
}
