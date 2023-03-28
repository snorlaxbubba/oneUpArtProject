import { API } from "./stacks/APIStack";
import { FrontendStack } from "./stacks/FrontendStack";

export default {
  config(_input) {
    return {
      name: "oneUpArtProject",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(API).stack(FrontendStack);
  }
} 