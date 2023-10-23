import { Router } from "express"

import {
    getRoomById,
    addRoom,
    updateRoom,
    deleteRoom,
    joinRoom,
    leaveRoom,
    getRoomMembers,
    excludeMember,
    getItems,
    addItem,
    updateItem,
    deleteItem,
    addMessage,
    deleteMessage,
    getRoomMessages,
    updateMessage,
    downvote,
    vote,
    getUserRooms,
} from "controllers"

export const roomsRouter = Router()

//Room
roomsRouter.route("/").get(getUserRooms).post(addRoom)
roomsRouter
    .route("/:roomId")
    .get(getRoomById)
    .patch(updateRoom)
    .delete(deleteRoom)

//Members
roomsRouter.route("/:roomId/members").get(getRoomMembers)
roomsRouter.route("/:roomId/join").post(joinRoom).delete(leaveRoom)
roomsRouter.route("/:roomId/members/:userId/exclude").delete(excludeMember)

//Items
//TODO: Rename getItems
roomsRouter.route("/:roomId/items").get(getItems).post(addItem)
roomsRouter.route("/:roomId/items/:id").put(updateItem).delete(deleteItem)
roomsRouter.route("/:roomId/items/:itemId/vote").post(vote).delete(downvote)

//Messages
roomsRouter.route("/:roomId/messages").get(getRoomMessages).post(addMessage)
roomsRouter
    .route("/:roomId/messages/:id")
    .put(updateMessage)
    .delete(deleteMessage)
