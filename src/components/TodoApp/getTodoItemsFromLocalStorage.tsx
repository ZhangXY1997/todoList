export const getTodoItemsFromLocalStorage = (key: string) => {
    let value: string | null = localStorage.getItem(key);
    let todoItems = null;
    if (value) {
        try {
            const parsedJSON = JSON.parse(value);

            if (Array.isArray(parsedJSON)) {
                todoItems = parsedJSON;
            }
        } catch(e) {
            // If it's not a valid JSON string, then we should initialize an empty array for todoItems
            todoItems = [];
        }
    }

    return todoItems;
}
