const app = require("./src/app");
const config = require("./src/configs/config.mongodb"); // Import file config

const server = app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
