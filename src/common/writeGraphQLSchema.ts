import { buildSchema } from "./handler";
import { printSchema } from "graphql";
const fs = require("fs");

const contractLocation = "src/generated";

(() => {
  fs.writeFileSync(
    `${contractLocation}/schema.graphql`,
    printSchema(buildSchema({}))
  );
})();
