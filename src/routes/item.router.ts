import { Router } from "express"

import {
    addItem,
    deleteItem,
    getItems,
    updateItem,
} from "@controllers/item.controller"

export const itemsRouter = Router()

itemsRouter.get("/", getItems)

itemsRouter.post("/", addItem)

itemsRouter.route("/:id").put(updateItem).delete(deleteItem)
