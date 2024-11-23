export async function getCategories() {
    const data_categories = useState("types");
    try {
        const response = await request("/categories");
        data_categories.value = response.data.value.data;
    } catch (error) {}
}

export async function addCategories(value) {
    try {
        return await request("/categories/add", {
            value: value,
        });
    } catch (error) {}
}

export async function deleteCategories(category_id) {
    try {
        return await request("/categories/delete", {
            category_id: category_id,
        });
    } catch (error) {}
}

export async function changeCategories(category_id, new_value) {
    try {
        return await request("/categories/change", {
            category_id: category_id,
            new_value: new_value,
        });
    } catch (error) {}
}
