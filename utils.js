export function findByName(name, array) {
    for (let item of array) {
        if (item.name === name) {
            return item;
        }
    }
}