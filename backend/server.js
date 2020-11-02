const Glue = require("@hapi/glue");
const manifest = require("./manifest");
const config = require("./config");

const options = {
  relativeTo: __dirname,
};

const startServer = async () => {
  try {
    const server = await Glue.compose(manifest, options);
    await server.start();
    console.log("Server running at: ", "http://localhost:" + server.info.port);
    console.log("Environment:", config("/env"));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
