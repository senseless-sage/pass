import { Glob } from "bun";
import { build } from "sage-ui/builder";

build("./public", [
    ...Array.from(new Glob("./src/**/!*.js").scanSync(".")),
    ...Array.from(new Glob("./vendor/**/*").scanSync("."))
]);