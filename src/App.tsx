import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";

const App = () => {
  const [task, setTask] = useState<string | null>(null);
  const [listOfTasks, setListOfTasks] = useState<string[]>([]);

  const getValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setTask(value);
  };

  const addNewTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    task && setListOfTasks([task, ...listOfTasks]);
  };

  return (
    <div className="App">
      <h1>Welcome again, Nancy!</h1>
      <form onSubmit={addNewTask}>
        <input type="text" onChange={getValue} />
        <input type="submit" value="Add Task"></input>
      </form>
      {/* Our all task */}
      {listOfTasks.length > 0 && (
        <>
          <h2> All tasks to do</h2>
          <ol>
            {listOfTasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export default App;
