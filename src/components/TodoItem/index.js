import {RiDeleteBin2Fill} from 'react-icons/ri'

import './index.css'

const TodoItem = props => {
  const {
    todoItemDetail,
    deleteTask,
    changeTodoListStatusOnClickingCheckBox,
    changeTodoListStatusOnClickingList,
  } = props
  const {completed, id, title} = todoItemDetail

  const onClickDelete = () => {
    deleteTask(id)
  }

  const onClickCheckBox = event => {
    changeTodoListStatusOnClickingCheckBox(id, event.target.checked)
  }

  const onClickingList = () => {
    changeTodoListStatusOnClickingList(id, completed)
  }

  return (
    <button
      type="button"
      onClick={onClickingList}
      className="todo-list-item-button"
    >
      <li className="todo-list-item">
        <div className="checkbox-task">
          <input
            type="checkbox"
            onChange={onClickCheckBox}
            checked={completed}
          />
          {completed === true ? (
            <p className="todo-task">{title}</p>
          ) : (
            <p>{title}</p>
          )}
        </div>
        <RiDeleteBin2Fill
          className="delete-sign"
          onClick={onClickDelete}
          size={20}
        />
      </li>
    </button>
  )
}

export default TodoItem
