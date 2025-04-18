// utils/socket.ts
import { io } from "socket.io-client"
export const socket = io(process.env.NEXT_PUBLIC_BASE_URL) // replace with your server
