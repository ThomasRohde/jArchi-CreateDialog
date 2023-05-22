console.show();
console.clear();

load(__DIR__ + 'CreateEclipseForm.js');
load(__DIR__ + 'modeltrap.js');
load(__DIR__ + 'marked.js');

function runModelBrowser(objects, options = {}) {
    const outputSVG = false;
    const outputImages = true;

    let { buttonActions, outputMarkdown, githubImageDirectory, filter, icons, toolbar } = options;    
    if (!filter) filter = false;
    if (!icons) icons = false;
    if (!toolbar) toolbar = false;
    if (!githubImageDirectory) githubImageDirectory = "https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/";

    function documentModel(path) {
        function markdownLevel(level) {
            return "#".repeat(level);
        };

        function titleString(level, string) {
            return "\n" + markdownLevel(level) + " " + string + " " + markdownLevel(level) + "\n";
        }

        function outputElement(level, element) {
            let title = "";
            let body = "";
            let outputChildren = true;
            if ($(element).is("diagram-model-reference")) {
                title = outputMarkdown ? titleString(level, element.refView.name) : marked.parse(titleString(level, element.refView.name));
                body = outputMarkdown ? element.refView.documentation.replace(/<button.*?<\/button>/g, '') : marked.parse(element.refView.documentation);
                outputChildren = false;
            }
            else {
                title = outputMarkdown ? titleString(level, element.name) : marked.parse(titleString(level, element.name));
                body = outputMarkdown ? element.documentation.replace(/<button.*?<\/button>/g, '') : marked.parse(element.documentation);
            }
            let image = "";
            if (outputSVG && $(element).is("archimate-diagram-model") || $(element).is("diagram-model-reference") || $(element).is("sketch-model") || $(element).is("canvas-model")) {
                if ($(element).is("diagram-model-reference")) {
                    element = element.refView;
                }
                let outputView = $(element).prop("dialog:outputView");
                if (outputView !== "false") image = $.model.renderViewAsSVGString(element, true);
            }
            if (outputImages && $(element).is("archimate-diagram-model") || $(element).is("diagram-model-reference") || $(element).is("sketch-model") || $(element).is("canvas-model")) {
                if ($(element).is("diagram-model-reference")) {
                    element = element.refView;
                }
                let outputView = $(element).prop("dialog:outputView");
                if (outputView !== "false") {
                    $.model.renderViewToFile(element, path + "images\\" + element.name + ".png", "PNG");
                    if (outputMarkdown)
                        image = `![${element.name}](${githubImageDirectory}${element.name.replaceAll(" ", "%20") + ".png"})` + "\n\n";
                    else
                        image = `<img>src='images/${element.name + ".png"}'</img>` + "\n";
                }
            }
            let output = title + image + body;
            if (outputChildren) {
                let children = $(element).children().not("relationship");
                for (const child of children) {
                    output += outputElement(level + 1, child);
                }
            }
            return output;
        };

        function logHierarchy(level, element) {
            console.log(" ".repeat(level), element, $(element).is("diagram-model-reference"));
            let children = $(element).children().not("relationship");
            for (const child of children) logHierarchy(level + 1, child);
        }

        let markdown = titleString(1, model.name);
        markdown += model.purpose;

        let body = outputMarkdown ? markdown : marked.parse(markdown) + "\n";

        let elements = objects;
        elements.each(e => {
            body += outputElement(1, e);
        })

        if (outputMarkdown) return body;

        let output = /*html*/ `
    <html>
        <style>
            html {
                font-family: Segoe UI;
                font-size: 12
            }
            table {
                font-size: 12px;
                width: 100%;
            }
            th, td {
               border-bottom: 1px solid #ddd;
               font-size: 12px;
            }
            pre {
                background: #f4f4f4;
                border: 1px solid #ddd;
                border-left: 3px solid #f36d33;
                color: #666;
                page-break-inside: avoid;
                font-family: monospace;
                font-size: 12px;
                line-height: 1;
                margin-bottom: 1em;
                max-width: 100%;
                overflow: auto;
                padding: 1em 1.5em;
                display: block;
                word-wrap: break-word;
            }
            button {
                background: transparent;
                border: none;
                font-size: 0;
                padding: 0;
                margin: 0;
                width: 0;
                height: 0;
            }
            body {
                counter-reset: h1;
            }
            h1 {
                counter-reset: h2;
            }
            h2 {
                counter-reset: h3;
            }
            h3 {
                counter-reset: h4;
            }
            h1:before {
                counter-increment: h1;
                content: counter(h1) ". ";
            }
            h2:before {
                counter-increment: h2;
                content: counter(h1) "." counter(h2) ". ";
            }
            h3:before {
                counter-increment: h3;
                content: counter(h1) "." counter(h2) "." counter(h3) ". ";
            }
            h4:before {
                counter-increment: h4;
                content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) ". ";
            }
        </style>
        <body>
            ${body}
        </body>
    </html>`;
        return output;
    }

    function cloneWithoutEmpty(obj) {
        let newObj = {};
        for (let key in obj) {
            if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "" && !(typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0)) {
                newObj[key] = obj[key];
            }
        }
        return newObj;
    }

    let browserButton = function (element, buttonId) {
        if (!buttonActions) {
            window.alert(`You pressed the button '${buttonId}' in element '${element.name}'`);
            return;
        };
        try {
            let action = buttonActions[element.name][buttonId];
            let { dialog, options } = action;
            let showDialog = null;
            if (options) {
                showDialog = createDialog(dialog, options);
            }
            else
                showDialog = createDialog(dialog);
            showDialog.open();
            console.log(`You pressed the button '${buttonId}' in element '${element.name}'. The result of the dialog is: `)
            console.log(JSON.stringify(cloneWithoutEmpty(showDialog.dialogResult), function (key, value) { 
                if (value instanceof Object && value.id) return value.toString(); else return value;
            }, 2))
        }
        catch (e) {
            console.log("Something went wrong executing a browser action");
        }
    }

    let ModelExplorer = {
        type: "sash",
        title: model.name,
        message: model.purpose,
        direction: "horizontal",
        weights: [2, 5],
        properties: {
            left: {
                type: "form",
                margin: 0,
                columns: 1,
                properties: {
                    treeWidget: {
                        type: "tree",
                        fill: true,
                        relations: false,
                        objects: objects,
                        filter: filter,
                        icons: icons,
                        toolbar: toolbar,
                        tooltip: "Select tree item",
                        selection: [{
                            source: "documentation",
                            target: "documentation"
                        }]
                    }
                }

            },
            right: {
                type: "form",
                margin: 0,
                columns: 1,
                properties: {
                    documentation: {
                        type: "browser",
                        doEvent: browserButton,
                        tree: "treeWidget",
                        fill: true,
                        multi: true,
                    }
                }
            }
        }
    }

    let customOptions = {
        dialogType: "titleAndDialog",
        width: 3*shell.getDisplay().getBounds().width/5,
        height: 3*shell.getDisplay().getBounds().height/5,
        buttons: {
            Markdown: {
                label: "Markdown",
                value: "Markdown",
                selection: function (button, widget) {
                    let System = Java.type('java.lang.System');
                    let path = System.getProperty("java.io.tmpdir");
                    let tmpfile = path + `\\${model.name}\\${model.name}.md`;

                    let html = documentModel(path + `${model.name}\\`);
                    try {
                        $.fs.writeFile(tmpfile, html);
                        window.alert(`Markdown exported to: ` + path + `${model.name}\\`);
                    }
                    catch (e) {
                        window.alert("Something went wrong!", e);
                    }
                }
            },
            cancel: {
                label: "&Cancel",
                value: "Cancel pressed",
                cancelButton: true
            }
        }
    };

    if (!outputMarkdown) customOptions.buttons = null;

    let dialog = createDialog(ModelExplorer, customOptions);

    dialog.open();
}