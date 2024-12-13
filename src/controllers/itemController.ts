import { Request, ResponseToolkit } from '@hapi/hapi';
import { AppDataSource } from '../config/data-source';
import { Item } from '../entities/Item';
import { validateItem } from '../validators/itemValidator';
import { formatItem } from '../helpers/formatItemData';

export const getItems = async (request: Request, h: ResponseToolkit) => {
    const itemRepository = AppDataSource.getRepository(Item);
    const items = await itemRepository.find();
    return items.map(formatItem);
};

export const getItemById = async (request: Request, h: ResponseToolkit) => {
    const id = parseInt(request.params.id);
    const itemRepository = AppDataSource.getRepository(Item);
    const item = await itemRepository.findOneBy({ id });
    if (!item) return h.response({ message: 'Item not found' }).code(404);
    return formatItem(item);
};

export const createItem = async (request: Request, h: ResponseToolkit) => {
    const errors = validateItem(request.payload as Partial<Item>);
    if (errors.length > 0) return h.response({ errors }).code(400);
    const itemRepository = AppDataSource.getRepository(Item);
    const newItem = itemRepository.create(request.payload as Item);
    await itemRepository.save(newItem);
    return h.response(newItem).code(201);
};

export const updateItem = async (request: Request, h: ResponseToolkit) => {
    const id = parseInt(request.params.id);
    const itemRepository = AppDataSource.getRepository(Item);
    const item = await itemRepository.findOneBy({ id });
    if (!item) return h.response({ message: 'Item not found' }).code(404);
    const errors = validateItem(request.payload as Partial<Item>);
    if (errors.length > 0) return h.response({ errors }).code(400);
    itemRepository.merge(item, request.payload as Partial<Item>);
    await itemRepository.save(item);
    return formatItem(item);
};

export const deleteItem = async (request: Request, h: ResponseToolkit) => {
    const id = parseInt(request.params.id);
    const itemRepository = AppDataSource.getRepository(Item);
    const item = await itemRepository.findOneBy({ id });
    if (!item) return h.response({ message: 'Item not found' }).code(404);
    await itemRepository.remove(item);
    return h.response({ message: 'Item deleted' }).code(204);
};