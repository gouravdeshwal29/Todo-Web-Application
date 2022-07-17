import {Component} from 'react'

import TodoItem from '../TodoItem'

import './index.css'

let Id = 20

class Todo extends Component {
  state = {
    byDefaultTodoList: [],
    addTaskInput: '',
  }

  componentDidMount() {
    this.getByDefaultTodoList()
  }

  onChangeAddTaskInput = event => {
    this.setState({addTaskInput: event.target.value})
  }

  getByDefaultTodoList = async () => {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/1/todos`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.map(each => ({
        completed: each.completed,
        id: each.id,
        title: each.title,
        userId: each.userId,
      }))
      this.setState({
        byDefaultTodoList: updatedData,
      })
    }
  }

  changeTodoListStatusOnClickingCheckBox = (id, currentStatus) => {
    this.setState(prevState => ({
      byDefaultTodoList: prevState.byDefaultTodoList.map(each => {
        if (id === each.id) {
          return {...each, completed: currentStatus}
        }
        return each
      }),
    }))
  }

  changeTodoListStatusOnClickingList = (id, completed) => {
    this.setState(prevState => ({
      byDefaultTodoList: prevState.byDefaultTodoList.map(each => {
        if (id === each.id) {
          return {...each, completed: !completed}
        }
        return each
      }),
    }))
  }

  onClickAddTask = () => {
    const {byDefaultTodoList, addTaskInput} = this.state
    Id += 1
    const addTask = {
      completed: false,
      id: Id,
      title: addTaskInput,
      userId: 1,
    }
    const updateList = [...byDefaultTodoList, addTask]
    this.setState({byDefaultTodoList: updateList, addTaskInput: ''})
  }

  deleteTask = id => {
    const {byDefaultTodoList} = this.state
    const filteredTodoList = byDefaultTodoList.filter(
      eachTodo => eachTodo.id !== id,
    )
    this.setState({byDefaultTodoList: filteredTodoList})
  }

  render() {
    const {byDefaultTodoList, addTaskInput} = this.state
    // console.log(byDefaultTodoList)
    let count = 0
    byDefaultTodoList.map(each => {
      if (each.completed === true) {
        count += 1
      }
      return count
    })

    const listView =
      byDefaultTodoList.length !== 0 ? (
        <ul className="todo-list">
          {byDefaultTodoList.map(each => (
            <TodoItem
              key={each.id}
              todoItemDetail={each}
              deleteTask={this.deleteTask}
              changeTodoListStatusOnClickingCheckBox={
                this.changeTodoListStatusOnClickingCheckBox
              }
              changeTodoListStatusOnClickingList={
                this.changeTodoListStatusOnClickingList
              }
            />
          ))}
        </ul>
      ) : (
        <p className="empty-list-line">
          Looks like you are completely free today
        </p>
      )

    return (
      <div>
        <h1 className="page-headings">THINGS TO DO:</h1>
        <hr />
        {listView}
        <hr />
        <h1 className="page-headings">Done: {count}</h1>
        <div className="input-task-container">
          <input
            className="input-container"
            type="text"
            onChange={this.onChangeAddTaskInput}
            value={addTaskInput}
            placeholder="Enter new task"
          />
          <button
            className="add-task-button"
            type="button"
            onClick={this.onClickAddTask}
          >
            Add Task
          </button>
        </div>
      </div>
    )
  }
}

export default Todo
