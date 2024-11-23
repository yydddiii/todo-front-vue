
// вытаскивает имя типа по id
export function typeIdToTypeName(id) {
    if (!id) return
    
    const types = useState("types"); // все типы задач;
    const type_name = types.value.find((item) => item.id == id);
    return type_name?.name;
};