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
import {
    addMessage,
    deleteMessage,
    getMessages,
    updateMessage,
} from "@controllers/message.controller"

export const roomsRouter = Router()

//Rooms manages
roomsRouter.route("/api/rooms/").get(getRooms).post(addRoom)

//Room
roomsRouter
    .route("/api/rooms/:roomId")
    .get(getRoomById)
    .patch(updateRoom)
    .delete(deleteRoom)

//Room items
roomsRouter.route("/api/rooms/:roomId/items").get(getItems).post(addItem)
roomsRouter
    .route("/api/rooms/:roomId/items/:id")
    .put(updateItem)
    .delete(deleteItem)

//Messages
roomsRouter
    .route("/api/rooms/:roomId/messages")
    .get(getMessages)
    .post(addMessage)
roomsRouter
    .route("/api/rooms/:roomId/messages/:id")
    .put(updateMessage)
    .delete(deleteMessage)
