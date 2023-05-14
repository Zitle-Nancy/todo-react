import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
interface ITaskList {
  task: string;
  checked: boolean;
}
const App = () => {
  const [task, setTask] = useState<string>("");
  const [listOfTasks, setListOfTasks] = useState<ITaskList[]>([]);

  const getValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setTask(value);
  };

  const addNewTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    task &&
      setListOfTasks([
        {
          task,
          checked: false
        },
        ...listOfTasks
      ]);
    setTask("");
  };

  const deleteTask = (index: number) => {
    setListOfTasks(
      listOfTasks.filter((_, tasIndex) => {
        return tasIndex !== index;
      })
    );
  };

  const handleDoneTask = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { checked } = event.target;
    listOfTasks[index].checked = checked;
    setListOfTasks([...listOfTasks]);
  };

  return (
    <div className="App">
      <h1>Welcome again, Nancy!</h1>
      <form onSubmit={addNewTask}>
        <input type="text" value={task} onChange={getValue} />
        <input type="submit" value="Add Task"></input>
      </form>
      {listOfTasks.length > 0 && (
        <>
          <h2> All tasks to do</h2>
          <ol>
            {listOfTasks.map(({ task, checked }, index) => (
              <div className="container" key={uuidv4()}>
                <li className={checked ? "lineThrough" : ""}>{task}</li>
                <label htmlFor={`${task}-${index}`}>
                  This task is done.
                  <input
                    id={`${task}-${index}`}
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => handleDoneTask(event, index)}
                  />
                </label>
                <button onClick={() => deleteTask(index)}>Remove</button>
              </div>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export default App;
