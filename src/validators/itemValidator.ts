import { Item } from "../entities/Item";

const validateItem = (item: Partial<Item>) => {
    const errors: { field: string, message: string }[] = [];
    if (!item.name) {
        errors.push({ field: 'name', message: 'Field "name" is required' });
    }
    if (item.price == null) {
        errors.push({ field: 'price', message: 'Field "price" is required' });
    } else if (item.price < 0) {
        errors.push({ field: 'price', message: 'Field "price" cannot be negative' });
    }
    return errors;
};

export { validateItem };