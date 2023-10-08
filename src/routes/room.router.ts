import { Router } from "express"

import {
    getRooms,
    addRoom,
    updateRoom,
    deleteRoom,
} from "@controllers/room.controller"

export const roomsRouter = Router()

roomsRouter.get("/", getRooms)

roomsRouter.post("/", addRoom)

roomsRouter.route("/:id").put(updateRoom).delete(deleteRoom)
