import { For, createResource, createSignal } from 'solid-js';

const fetchData = async () =>
  fetch(import.meta.env.VITE_API_URL).then((res) => res.json());

function App() {
  const [todos] = createResource(fetchData);

  const [count, setCount] = createSignal(10);
  const adjustedCount = () => count() === 'all' ? todos()?.total : count();

  const filteredTodos = () => {
    return todos()?.todos.slice(0, adjustedCount()) || [];
  };

  return (
    <div class="flex flex-col h-[100dvh] justify-between items-center flex-grow">
      <nav class="py-2 bg-black/25 h-6 w-full">
        <div class="flex flex-row items-center justify-center">
          <p class="p-0 m-0">Todo List</p>
        </div>
      </nav>
      <div class="flex-grow overflow-y-scroll w-full p-0 flex justify-center">
        <div class="flex-grow p-3 max-w-[1080px]">
          <div id="form" class="flex items-center flex-grow">
            <input type="text" name="new" id="new" class="h-6 rounded" />
            <div class="m-2 p-1 flex items-center gap-2 border-1 border-solid w-fit rounded text-sm">
              <span class="i-ic-sharp-edit-note" />
              Add
            </div>
          </div>
          <div id="list">
            <div>
              Total: {adjustedCount()} / {todos()?.todos.length}, limit by{' '}
              <select
                name="count"
                id="count"
                value={count()}
                onInput={(e) => setCount(e?.target?.value)}
              >
                <option>5</option>
                <option selected>10</option>
                <option>25</option>
                <option>50</option>
                <option>all</option>
              </select>
            </div>
            <div>
              <For each={filteredTodos()} fallback={<>loading...</>}>
                {(todo) => (
                  <div>
                    <span class={`${todo.completed ? 'line-through' : ''}`}>
                      {todo.todo}
                    </span>
                    <span class="i-ic-sharp-edit-note ml-3">x</span>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
      <div class="py-2 bg-black/25 h-6 w-full">
        <div class="flex flex-row items-center justify-center">
          <p class="p-0 m-0">Not Copyrighted</p>
        </div>
      </div>
    </div>
  );
}

export default App;
