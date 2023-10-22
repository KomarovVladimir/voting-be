import { Router } from "express"

import {
    getRoomById,
    getRooms,
    addRoom,
    updateRoom,
    deleteRoom,
    joinRoom,
    leaveRoom,
    getRoomMembers,
    excludeMember,
} from "@controllers/room.controller"
import {
    getItems,
    addItem,
    updateItem,
    deleteItem,
    getVotingData,
} from "@controllers/item.controller"
import {
    addMessage,
    deleteMessage,
    getRoomMessages,
    updateMessage,
} from "@controllers/message.controller"
import { downvote, vote } from "@controllers/vote.controller"

export const roomsRouter = Router()

//Room
roomsRouter.route("/").get(getRooms).post(addRoom)
roomsRouter
    .route("/:roomId")
    .get(getRoomById)
    .patch(updateRoom)
    .delete(deleteRoom)

//Members
roomsRouter.route("/:roomId/members").get(getRoomMembers)
roomsRouter.route("/:roomId/join/:userId").post(joinRoom).delete(leaveRoom)
roomsRouter.route("/:roomId/members/:userId/exclude").delete(excludeMember)

//Items
//TODO: Rename getVotingData
roomsRouter.route("/:roomId/items").get(getItems).post(addItem)
roomsRouter.route("/:roomId/items/:id").put(updateItem).delete(deleteItem)
roomsRouter.route("/:roomId/user/:userId/items").get(getVotingData)
roomsRouter
    .route("/:roomId/users/:userId/items/:itemId/vote")
    .post(vote)
    .delete(downvote)

//Messages
roomsRouter.route("/:roomId/messages").get(getRoomMessages).post(addMessage)
roomsRouter
    .route("/:roomId/messages/:id")
    .put(updateMessage)
    .delete(deleteMessage)
