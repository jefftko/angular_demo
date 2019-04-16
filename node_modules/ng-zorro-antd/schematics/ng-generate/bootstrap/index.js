"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular/cdk/schematics");
const config_1 = require("@schematics/angular/utility/config");
const chalk_1 = require("chalk");
const bootstrapHTML = `<!-- NG-ZORRO -->
<a href="https://github.com/NG-ZORRO/ng-zorro-antd" target="_blank" style="display: flex;align-items: center;justify-content: center;height: 100%;width: 100%;">
  <img height="300" src="https://img.alicdn.com/tfs/TB1NvvIwTtYBeNjy1XdXXXXyVXa-89-131.svg">
</a>`;
function default_1(options) {
    return (host) => {
        const workspace = config_1.getWorkspace(host);
        const project = schematics_1.getProjectFromWorkspace(workspace, options.project);
        const appHTMLFile = `${project.sourceRoot}/app/app.component.html`;
        const buffer = host.read(appHTMLFile);
        if (!buffer) {
            console.log();
            console.error(chalk_1.default.red(`Could not find the project ${chalk_1.default.blue(appHTMLFile)} file inside of the ` +
                `workspace config`));
            return;
        }
        host.overwrite(appHTMLFile, bootstrapHTML);
        return host;
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map