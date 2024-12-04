import server from "./Express/app.js";

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`server on porta: ${port}`);
});
