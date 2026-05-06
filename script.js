const API = "https://task-manager-backenda.onrender.com/tasks";

async function fetchTasks() {
    const res = await axios.get(API);
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    res.data.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${task.text} ${task.completed ? "✅" : "❌"}
            <button onclick="toggleTask(${task.id})">Toggle</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;

        list.appendChild(li);
    });
}

async function addTask() {
    const text = document.getElementById("taskInput").value;

    await axios.post(API, { text });

    fetchTasks();
}

async function toggleTask(id) {
    await axios.put(`${API}/${id}`);
    fetchTasks();
}

async function deleteTask(id) {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
}

fetchTasks();