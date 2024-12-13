import { Item } from "../entities/Item";

const formatItem = (item: Item) => ({
    ...item,
    price: parseFloat(item.price as unknown as string),
});

export { formatItem };