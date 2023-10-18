import { Router } from "express"

import {
    getRoomById,
    getRooms,
    addRoom,
    updateRoom,
    deleteRoom,
    joinRoom,
    leaveRoom,
    getUserRooms,
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
import { downvote, vote } from "@controllers/vote.controller"

export const roomsRouter = Router()

//TODO: update the routes
//Rooms manager
roomsRouter.route("/api/rooms").get(getRooms)

roomsRouter.route("/api/user/:userId/rooms").get(getUserRooms)

//Room
roomsRouter.route("/api/room").post(addRoom)

roomsRouter
    .route("/api/room/:roomId")
    .get(getRoomById)
    .patch(updateRoom)
    .delete(deleteRoom)

roomsRouter
    .route("/api/room/:roomId/join/:userId")
    .post(joinRoom)
    .delete(leaveRoom)

//Items
roomsRouter.route("/api/room/:roomId/items").get(getItems)
roomsRouter.route("/api/room/:roomId/items/:userId").get(getVotingData)

roomsRouter.route("/api/room/:roomId/item").post(addItem)

roomsRouter
    .route("/api/room/:roomId/item/:id")
    .put(updateItem)
    .delete(deleteItem)

roomsRouter
    .route("/api/room/:roomId/item/:itemId/user/:userId/vote")
    .post(vote)
    .delete(downvote)

//Messages
roomsRouter.route("/api/room/:roomId/messages").get(getMessages)

roomsRouter.route("/api/room/:roomId/message").post(addMessage)

roomsRouter
    .route("/api/room/:roomId/message/:id")
    .put(updateMessage)
    .delete(deleteMessage)
