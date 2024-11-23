export async function getTasks() {
    const data_state = useState("data");
    try {
        const response = await request("/tasks");

        if (response.data.value.code != 200) return;

        data_state.value = response.data.value.data;
    } catch (error) {}
}

export async function checkTask(task_id, new_value) {
    try {
        const response = await request("/tasks/check", {
            task_id: task_id,
            new_value: new_value,
        });

        if (response.data.value.code != 200) return;
    } catch {}
}

export async function archiveTask(task_id) {
    try {
        const response = await request("/tasks/archive", {
            task_id: task_id,
        });

        if (response.data.value.code != 200) return;
    } catch {}
}

export async function deleteTask(task_id) {
    try {
        const response = await request("/tasks/delete", {
            task_id: task_id,
        });

        if (response.data.value.code != 200) return;
    } catch {}
}

export async function addTask(data) {
    try {
        const data_state = useState("data");
        const response = await request("/tasks/add", data);

        if (response.data.value.code != 200) return;

        data_state.value.push(response.data.value.data);
    } catch {}
}

export async function renameTask(task_id, new_name) {
    try {
        const response = await request("/tasks/rename", {
            task_id: task_id,
            new_name: new_name,
        });

        if (response.data.value.code != 200) return;
    } catch {}
}

export async function newDescriptionTask(task_id, description) {
    try {
        let resopnse = null;
        if (description)
            resopnse = await request("/tasks/description", {
                task_id: task_id,
                description: description,
            });
        else 
            response = await request("/tasks/description", {
                task_id: task_id,
            });

        if (response.data.value.code != 200) return;
    } catch {}
}

export async function retypeTask(task_id, new_category) {
    try {
        let resopnse = null;
        if (new_category)
            resopnse = await request("/tasks/retype", {
                task_id: task_id,
                new_category: new_category,
            });
        else 
            response = await request("/tasks/retype", {
                task_id: task_id,
            });

        if (response.data.value.code != 200) return;
    } catch {}
}
