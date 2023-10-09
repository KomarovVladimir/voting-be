import { Router } from "express"

import {
    getRoomById,
    getRooms,
    addRoom,
    updateRoom,
    deleteRoom,
} from "@controllers/room.controller"

export const roomsRouter = Router()

roomsRouter.get("/", getRooms)

roomsRouter.post("/", addRoom)

roomsRouter.route("/:id").get(getRoomById).patch(updateRoom).delete(deleteRoom)
