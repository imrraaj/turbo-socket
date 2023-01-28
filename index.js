import { Server } from "socket.io";
const io = new Server({ maxHttpBufferSize: 1e10 });

io.on("connection", (socket) => {
  socket.on("starting-to-send-file", () => io.emit("starting-to-send-file"));

  socket.on("send-file-chunk", (args, cb) => {
    io.emit("receive-file-chunk", args);
    cb(`------ Server Sent File Chunk ${args.chunk + 1} to other User ------`);
  });

  socket.on("file-sent", (FILENAME) => io.emit("file-sent", FILENAME));
  socket.on("GREET", (args) => {
    console.log("Greetings, ", args);
  });
});

io.listen(process.env.PORT || 3000, () => {
  console.log(`${process.env.PORT || 3000}`);
});
