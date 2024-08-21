import { fetchRequestRouting } from "./node_modules/sage-ui/js/router/routing.js";
import { storeAndComplete } from "./node_modules/sage-ui/js/router/config/utils.js";
import { buildRouterConfigProd } from "./node_modules/sage-ui/js/router/config/builder.js";
import { listDirContentGithub } from "./node_modules/sage-ui/js/router/fileLoader.js";

self.addEventListener("install", (event) => {
    event.waitUntil(storeAndComplete(buildRouterConfigProd({
        language: "en",
        listDirContentFunc: listDirContentGithub("senseless-sage", "pass", "public")
    })));
});

self.addEventListener("fetch", fetchRequestRouting);