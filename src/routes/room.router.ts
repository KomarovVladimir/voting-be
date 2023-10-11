import { Router } from "express"

import {
    getRoomById,
    getRooms,
    addRoom,
    updateRoom,
    deleteRoom,
} from "@controllers/room.controller"
import {
    getItems,
    addItem,
    updateItem,
    deleteItem,
} from "@controllers/item.controller"

export const roomsRouter = Router()

roomsRouter.get("/", getRooms)

roomsRouter.post("/", addRoom)

roomsRouter
    .route("/:roomId")
    .get(getRoomById)
    .patch(updateRoom)
    .delete(deleteRoom)

roomsRouter.get("/:roomId/items", getItems)

roomsRouter.post("/:roomId/items", addItem)

roomsRouter.route("/:roomId/items/:id").put(updateItem).delete(deleteItem)
