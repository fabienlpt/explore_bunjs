import { Server, ServerWebSocket } from "bun"
import { FSWatcher, WatchEventType, watch } from "node:fs"
import { join } from "node:path"

const port: number = parseInt(process.argv[2])
const baseDir = join(import.meta.dir, "..", "..", "www")

const wsClients : Set<ServerWebSocket> = new Set()
const watcher: FSWatcher = watch(
    baseDir,
    { recursive: true },
    (event: WatchEventType, data: string | Error | undefined) => {
        console.log("Something changed" + data);
        wsClients.forEach(ws => ws.send("reload"))
    }
)
process.on("SIGINT", () => watcher.close());

const server = Bun.serve({
    port: port,
    async fetch(req: Request, srv: Server) {
        if(srv.upgrade(req)) return
        const url = new URL(req.url)
        const filename = url.pathname === "/" ? "/index.html" : url.pathname
        const filePath = join(baseDir, filename)
        console.log(filePath);
        const fileToServe = Bun.file(filePath)
        if (!(await fileToServe.exists())) {
            return new Response(
                `Unknown file ${filePath}`, 
                { status: 404 }
            )
        }
        return new Response(Bun.file(filePath))
    },
    websocket: {
        open(ws: ServerWebSocket) {
            wsClients.add(ws)
        },
        close(ws: ServerWebSocket) {
            wsClients.delete(ws)
        },
        message(ws: ServerWebSocket, msg: string) {
            console.log(`Received message: ${msg}`)
            ws.send("Well received")
        }
    }
})
console.log(`Listening on ${server.hostname}:${server.port}`)