/*
Author: Thomas Klok Rohde, Danske Bank A/S
Description: Create an Eclipse dialog 
History: 
    March 27, 2023	: Created
*/

load(__DIR__ + "marked.js");

let parentShell = shell;

function createDialog(rootLayout,
    options = {
        dialogType: "titleAndDialog",
    }) {

    const SWT = Java.type('org.eclipse.swt.SWT');
    const JavaShell = Java.type('org.eclipse.swt.widgets.Shell');
    const GridData = Java.type('org.eclipse.swt.layout.GridData');
    const GridLayout = Java.type('org.eclipse.swt.layout.GridLayout');
    const GridLayoutFactory = Java.type('org.eclipse.jface.layout.GridLayoutFactory');
    const Composite = Java.type('org.eclipse.swt.widgets.Composite');
    const Group = Java.type('org.eclipse.swt.widgets.Group');
    const LabelWidget = Java.type('org.eclipse.swt.widgets.Label');
    const ListWidget = Java.type('org.eclipse.swt.widgets.List');
    const ScaleWidget = Java.type('org.eclipse.swt.widgets.Scale');
    const IMessageProvider = Java.type('org.eclipse.jface.dialogs.IMessageProvider');
    const TextWidget = Java.type('org.eclipse.swt.widgets.Text');
    const TitleAreaDialog = Java.extend(Java.type('org.eclipse.jface.dialogs.TitleAreaDialog'));
    const Combo = Java.type('org.eclipse.swt.widgets.Combo');
    const Point = Java.type('org.eclipse.swt.graphics.Point');
    const FillLayout = Java.type('org.eclipse.swt.layout.FillLayout');
    const RowLayout = Java.type('org.eclipse.swt.layout.RowLayout');
    const RowData = Java.type('org.eclipse.swt.layout.RowData');
    const ButtonWidget = Java.type('org.eclipse.swt.widgets.Button');
    const Color = Java.type('org.eclipse.swt.graphics.Color');
    const GC = Java.type('org.eclipse.swt.graphics.GC');
    const DateTime = Java.type('org.eclipse.swt.widgets.DateTime');
    const CTabFolder = Java.type('org.eclipse.swt.custom.CTabFolder');
    const CTabItem = Java.type('org.eclipse.swt.custom.CTabItem');
    const SashForm = Java.type('org.eclipse.swt.custom.SashForm');
    const SelectionListener = Java.type('org.eclipse.swt.events.SelectionListener');
    const TreeViewer = Java.type('org.eclipse.jface.viewers.TreeViewer');
    const FilteredTree = Java.type('org.eclipse.ui.dialogs.FilteredTree');
    const PatternFilter = Java.type('org.eclipse.ui.dialogs.PatternFilter');
    const ColumnLabelProvider = Java.extend(Java.type('org.eclipse.jface.viewers.ColumnLabelProvider'));
    const IArchiImages = Java.type('com.archimatetool.editor.ui.IArchiImages');
    const Image = Java.type('org.eclipse.swt.graphics.Image');
    const Browser = Java.type('org.eclipse.swt.browser.Browser');
    const IDialogConstants = Java.type('org.eclipse.jface.dialogs.IDialogConstants');
    const CustomColorDialog = Java.type("com.archimatetool.editor.ui.components.CustomColorDialog");
    const Locale = Java.type('java.util.Locale');
    const WizardPage = Java.extend(Java.type('org.eclipse.jface.wizard.WizardPage'));
    const Wizard = Java.extend(Java.type('org.eclipse.jface.wizard.Wizard'));
    const WizardDialog = Java.type('org.eclipse.jface.wizard.WizardDialog');
    const StringArray = Java.type("java.lang.String[]");
    const JFaceResources = Java.type('org.eclipse.jface.resource.JFaceResources');
    const ITreeContentProvider = Java.extend(Java.type('org.eclipse.jface.viewers.ITreeContentProvider'));
    const EditingSupport = Java.extend(Java.type('org.eclipse.jface.viewers.EditingSupport'));
    const TextCellEditor = Java.type('org.eclipse.jface.viewers.TextCellEditor');
    const TreeViewerColumn = Java.type('org.eclipse.jface.viewers.TreeViewerColumn');
    const ColumnViewerEditorActivationStrategy = Java.extend(Java.type('org.eclipse.jface.viewers.ColumnViewerEditorActivationStrategy'));
    const ColumnViewerEditorActivationEvent = Java.type('org.eclipse.jface.viewers.ColumnViewerEditorActivationEvent');
    const ColumnViewerEditor = Java.type('org.eclipse.jface.viewers.ColumnViewerEditor');
    const TreeViewerEditor = Java.type('org.eclipse.jface.viewers.TreeViewerEditor');
    const ToolBar = Java.type('org.eclipse.swt.widgets.ToolBar');
    const ToolItem = Java.type('org.eclipse.swt.widgets.ToolItem');
    const Runnable = Java.extend(Java.type('java.lang.Runnable'));
    const ProgressAdapter = Java.extend(Java.type('org.eclipse.swt.browser.ProgressAdapter'));
    const LocationAdapter = Java.extend(Java.type('org.eclipse.swt.browser.LocationAdapter'));
    const CustomFunction = Java.extend(Java.type('org.eclipse.swt.browser.BrowserFunction'));
    const StructuredSelection = Java.type('org.eclipse.jface.viewers.StructuredSelection');

    let dialogObject = {};
    let valueMap = new Map();

    let { dialogType, width, height, buttons, finish, help } = options;

    if (!width) width = 0;
    if (!height) height = 0;

    function log(obj) {
        console.log(JSON.stringify(obj, null, 2));
    }

    function elementIcon(element) {
        if (element.type == 'application-collaboration') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_APPLICATION_COLLABORATION);
        if (element.type == 'application-component') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_APPLICATION_COMPONENT);
        if (element.type == 'application-event') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_APPLICATION_EVENT);
        if (element.type == 'application-function') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_APPLICATION_FUNCTION);
        if (element.type == 'application-interaction') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_APPLICATION_INTERACTION);
        if (element.type == 'application-interface') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_APPLICATION_INTERFACE);
        if (element.type == 'application-process') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_APPLICATION_PROCESS);
        if (element.type == 'application-service') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_APPLICATION_SERVICE);
        if (element.type == 'artifact') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_ARTIFACT);
        if (element.type == 'assessment') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_ASSESSMENT);
        if (element.type == 'business-actor') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_BUSINESS_ACTOR);
        if (element.type == 'business-collaboration') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_BUSINESS_COLLABORATION);
        if (element.type == 'business-event') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_BUSINESS_EVENT);
        if (element.type == 'business-function') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_BUSINESS_FUNCTION);
        if (element.type == 'business-interaction') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_BUSINESS_INTERACTION);
        if (element.type == 'business-interface') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_BUSINESS_INTERFACE);
        if (element.type == 'business-object') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_BUSINESS_OBJECT);
        if (element.type == 'business-process') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_BUSINESS_PROCESS);
        if (element.type == 'business-role') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_BUSINESS_ROLE);
        if (element.type == 'business-service') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_BUSINESS_SERVICE);
        if (element.type == 'communication-network') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_COMMUNICATION_NETWORK);
        if (element.type == 'capability') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_CAPABILITY);
        if (element.type == 'constraint') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_CONSTRAINT);
        if (element.type == 'contract') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_CONTRACT);
        if (element.type == 'course-of-action') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_COURSE_OF_ACTION);
        if (element.type == 'data-object') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_DATA_OBJECT);
        if (element.type == 'deliverable') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_DELIVERABLE);
        if (element.type == 'device') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_DEVICE);
        if (element.type == 'distribution-network') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_DISTRIBUTION_NETWORK);
        if (element.type == 'driver') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_DRIVER);
        if (element.type == 'equipment') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_EQUIPMENT);
        if (element.type == 'facility') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_FACILITY);
        if (element.type == 'gap') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_GAP);
        if (element.type == 'goal') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_GOAL);
        if (element.type == 'grouping') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_GROUPING);
        if (element.type == 'implementation-event') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_IMPLEMENTATION_EVENT);
        if (element.type == 'location') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_LOCATION);
        if (element.type == 'material') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_MATERIAL);
        if (element.type == 'meaning') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_MEANING);
        if (element.type == 'node') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_NODE);
        if (element.type == 'outcome') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_OUTCOME);
        if (element.type == 'path') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_PATH);
        if (element.type == 'plateau') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_PLATEAU);
        if (element.type == 'principle') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_PRINCIPLE);
        if (element.type == 'product') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_PRODUCT);
        if (element.type == 'representation') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_REPRESENTATION);
        if (element.type == 'resource') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_RESOURCE);
        if (element.type == 'requirement') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_REQUIREMENT);
        if (element.type == 'stakeholder') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_STAKEHOLDER);
        if (element.type == 'system-software') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_SYSTEM_SOFTWARE);
        if (element.type == 'technology-collaboration') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_TECHNOLOGY_COLLABORATION);
        if (element.type == 'technology-event') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_TECHNOLOGY_EVENT);
        if (element.type == 'technology-function') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_TECHNOLOGY_FUNCTION);
        if (element.type == 'technology-interaction') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_TECHNOLOGY_INTERACTION);
        if (element.type == 'technology-interface') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_TECHNOLOGY_INTERFACE);
        if (element.type == 'technology-process') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_TECHNOLOGY_PROCESS);
        if (element.type == 'technology-service') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_TECHNOLOGY_SERVICE);
        if (element.type == 'value') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_VALUE);
        if (element.type == 'value-stream') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_VALUE_STREAM);
        if (element.type == 'workpackage') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_WORKPACKAGE);
        if (element.type == 'acess-relationship') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_ACESS_RELATION);
        if (element.type == 'aggregation-relationship') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_AGGREGATION_RELATION);
        if (element.type == 'assignment-relationship') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_ASSIGNMENT_RELATION);
        if (element.type == 'association-relationship') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_ASSOCIATION_RELATION);
        if (element.type == 'composition-relationship') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_COMPOSITION_RELATION);
        if (element.type == 'flow-relationship') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_FLOW_RELATION);
        if (element.type == 'influence-relationship') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_INFLUENCE_RELATION);
        if (element.type == 'realization-relationship') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_REALIZATION_RELATION);
        if (element.type == 'specialization-relationship') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_SPECIALIZATION_RELATION);
        if (element.type == 'triggering-relationship') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_TRIGGERING_RELATION);
        if (element.type == 'serving-relationship') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_SERVING_RELATION);
        if (element.type == 'and-junction') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_AND_JUNCTION);
        if (element.type == 'or-junction') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_OR_JUNCTION);
        if (element.type == 'folder') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_FOLDER_DEFAULT);
        if (element.type == 'archimate-diagram-model') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_DIAGRAM);
        if (element.type == 'diagram-model-note') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_NOTE);

        if (element.type == 'diagram-model-connection') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_CONNECTION_PLAIN);
        if (element.type == 'diagram-model-image') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_NOTE);
        if (element.type == 'diagram-model-reference') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_NOTE);
        if (element.type == 'sketch-model-sticky') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_STICKY);
        if (element.type == 'sketch-model-actor') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_BUSINESS_ACTOR);
        if (element.type == 'canvas-model-block') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_GROUP);
        if (element.type == 'canvas-model-sticky') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_STICKY);
        if (element.type == 'canvas-model-image') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_NOTE);
        if (element.type == 'sketch-model') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_SKETCH);
        if (element.type == 'canvas-model') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_NAVIGATOR);
        if (element.type == 'canvas-model-connection') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_ASSOCIATION_RELATION);
        if (element.type == 'diagram-model-group') return IArchiImages.ImageFactory.getImage(IArchiImages.ICON_GROUP);

        console.log(element, element.type)
        return null;
    }

    function traverseLayout(layout) {
        let result = {};
        for (const property in layout.properties) {
            let propertyDefinition = layout.properties[property];
            let propertyType = propertyDefinition.type;
            try {
                switch (propertyType) {
                    case "combo":
                    case "text":
                        result[property] = propertyDefinition.widget.getText();
                        break;
                    case "option":
                        let buttons = propertyDefinition.widget.getChildren();
                        for (let button of buttons) {
                            if (button.getSelection()) result[property] = button.getText();
                        }
                        break;
                    case "scale":
                        result[property] = propertyDefinition.widget.getChildren()[0].getSelection();
                        break;
                    case "list":
                    case "radio":
                    case "checkbox":
                        result[property] = propertyDefinition.widget.getSelection();
                        break;
                    case "tree":
                        let treeItems = propertyDefinition.widget.getTree().getSelection();
                        let elements = [];
                        for (const item of treeItems) {
                            let archiElement = $("#"+item.getData().id).first(); // Coerce to Archi object.
                            elements.push(archiElement);
                        }
                        result[property] = elements;
                        break;
                    case "sash":
                    case "form":
                    case "group":
                        result[property] = traverseLayout(propertyDefinition);
                        break;
                    case "button":
                    case "color":
                        result[property] = propertyDefinition.widget.getData();
                        break;
                    case "date":
                        let day = propertyDefinition.widget.getDay();
                        let month = propertyDefinition.widget.getMonth();
                        let year = propertyDefinition.widget.getYear();
                        let date = new Date(year, month, day);
                        result[property] = date.toLocaleDateString(Locale.getDefault().toString().replace("_", "-"));
                        break;
                }
            }
            catch (e) {
                result[property] = null;
            }
        };
        return result;
    };

    // Traverse all "text" widgets with verifiers which has a property "verification" set to false
    // The property "verification" is set by the verification handlers triggered by changes to "text" widgets
    function verificationSet(layout) {
        let result = [];
        for (const property in layout.properties) {
            let propertyDefinition = layout.properties[property];
            let propertyType = propertyDefinition.type;
            if (propertyType != "form" && propertyType != "group" && propertyDefinition.hasOwnProperty("verification") && !propertyDefinition.verification)
                result.push(property);
            else result = [...result, ...verificationSet(propertyDefinition)];
        }
        return result;
    }

    function requiredSet(required, result) {
        let labels = [];
        if (required) {
            if (!Array.isArray(required)) required = [required];
            for (property of required) {
                let value = findValue(result, property);
                let label = findWidget(dialogObject, property)?.label;
                if (!isTruthyOrZero(value)) labels.push(label);
            };
        };
        return labels;
    }

    function findWidget(layout, widgetName) {
        if (layout.properties && layout.properties.hasOwnProperty(widgetName)) return layout.properties[widgetName];
        for (let property in layout.properties) {
            if (typeof layout.properties[property] === "object") {
                let result = findWidget(layout.properties[property], widgetName);
                if (result) return result;
            }
        };
        return null;
    };

    function findValue(object, property) {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                if (key === property) {
                    return object[key];
                } else if (typeof object[key] === "object") {
                    const result = findValue(object[key], property);
                    if (result !== null) {
                        return result;
                    }
                }
            }
        }
        return null;
    }

    function findItem(tree, itemName) {
        function findItemChildren(item, itemName) {
            if (item.getText() == itemName) return item;
            let children = item.getItems();
            let result = null;
            for (const child of children) {
                result = findItemChildren(child, itemName);
                if (result !== null) break;
            };
            return result;
        };
        let children = tree.getTree().getItems();
        let result = null;
        for (const child of children) {
            result = findItemChildren(child, itemName);
            if (result !== null) break;
        };
        return result;
    }

    function lookupProperty(object, property) {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                if (key === property) {
                    return true;
                } else if (typeof object[key] === "object") {
                    const result = lookupProperty(object[key], property);
                    if (result) {
                        return result;
                    }
                }
            }
        }
        return false;
    }

    let ObjectContentProvider = new ITreeContentProvider({
        getElements: function (inputElement) {
            return inputElement;
        },
        getChildren: function (parentElement) {
            return $(parentElement).children();
        },
        getParent: function (element) {
            return $(element).parent().first();
        },
        hasChildren: function (element) {
            return $(element).children().size() > 0;
        }
    });

    let ObjectContentProviderNoRelations = new ITreeContentProvider({
        getElements: function (inputElement) {
            return inputElement;
        },
        getChildren: function (parentElement) {
            return $(parentElement).children().not("relationship");
        },
        getParent: function (element) {
            return $(element).parent().first();
        },
        hasChildren: function (element) {
            return $(element).children().size() > 0;
        }
    });

    // Get Archi element property. Use caching so we can cancel and undo the dialog
    // After the dialog is completed, the changes can be persisted

    function getProperty(element, property) {
        let cache = valueMap.get(element.id);
        if (cache && cache.hasOwnProperty(property) && cache[property]) {
            return cache[property];
        }
        else if (property == "documentation") {
            return element.documentation;
        }
        else {
            return $(element).prop(property);
        }
    }

    function setProperty(element, property, value) {
        let cache = valueMap.get(element.id);
        if (!cache) {
            cache = {
                [property]: value
            };
            valueMap.set(element.id, cache);
        }
        else {
            cache[property] = value;
        }
    }

    function isValidUrl(s) {
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        return regexp.test(s);
    }

    function isString(obj) {
        return typeof obj === "string" || obj instanceof String;
    }

    // Create a colored rectangle!
    function createColoredImage(width, height, rgb) {
        let image = new Image(shell.getDisplay(), width, height);
        let graphics = new GC(image);
        color = new Color(rgb.red, rgb.green, rgb.blue);
        graphics.setBackground(color);
        graphics.fillRectangle(0, 0, width, height);
        color.dispose();
        graphics.dispose();
        return image;
    }

    function isTruthyOrZero(value) {
        return !!value || value === 0;
    }

    function expandedIcons(item) {
        if (item.getData().type == "folder") {
            item.setImage(IArchiImages.ImageFactory.getImage(IArchiImages.ECLIPSE_IMAGE_FOLDER));
            let children = item.getItems();
            for (const c of children) {
                expandedIcons(c);
            }
        }
    }

    function getProperties(elements) {
        let result = new Set();
        elements.each(e => {
            let props = e.prop();
            props.forEach(p => { result.add(p); });
            let children = $(e).children();
            for (const c of children) {
                result = new Set([...result, ...getProperties($(c))]);
            }
        });
        return result;
    }

    function createForm(parent, layout, root = false, style = SWT.NONE) {
        let container = null;
        let { equalWidth, direction, weights, background, required, message, fill, columns, margin } = layout;
        columns ??= 2;
        // Handle composite widgets
        switch (layout.type) {
            case "group":
                // The group type creates a new composite (group), and then calls createFormContents to add widgets to it
                container = new Group(parent, style);
                if (margin === undefined) margin = 5;
                if (fill)
                    container.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
                else
                    container.setLayoutData(new GridData(SWT.BEGINNING, SWT.BEGINNING, false, false));
                if (equalWidth)
                    GridLayoutFactory.swtDefaults().numColumns(columns).margins(margin, margin).spacing(margin, margin).equalWidth(equalWidth).applyTo(container);
                else
                    GridLayoutFactory.swtDefaults().numColumns(columns).margins(margin, margin).spacing(margin, margin).applyTo(container);
                if (message) {
                    let messageLabel = new LabelWidget(container, SWT.NONE | SWT.WRAP);
                    messageLabel.setText(message);
                    messageLabel.setFont(JFaceResources.getFontRegistry().getItalic(JFaceResources.DEFAULT_FONT));
                    messageLabel.setBackground(container.getBackground());
                };
                return createFormContents(container, layout);
                break;
            case "form":
                // The form type creates a new composite, and then calls createFormContents to add widgets to it
                container = new Composite(parent, style);
                let gridData = new GridData(SWT.FILL, SWT.FILL, true, true);
                container.setLayoutData(gridData);
                if (background && background instanceof Color) container.setBackground(background);
                if (margin === undefined) margin = 5;
                if (equalWidth)
                    GridLayoutFactory.swtDefaults().numColumns(columns).margins(margin, margin).spacing(margin, margin).equalWidth(equalWidth).applyTo(container);
                else
                    GridLayoutFactory.swtDefaults().numColumns(columns).margins(margin, margin).spacing(margin, margin).applyTo(container);
                return createFormContents(container, layout);
                break;
            case "folder":
                // The Folder type creates a CTabFolder, and recursively calls CreateForm to add contents
                if (parent instanceof Wizard) {
                    throw "You cannot add folders to a wizard";
                }
                let tabFolder = new CTabFolder(parent, style);
                tabFolder.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
                tabFolder.setSimple(false);
                tabFolder.setSelectionBackground(new Color(240, 240, 240));
                tabFolder.setBackground(new Color(255, 255, 255));
                for (folder in layout.properties) {
                    if (layout.properties[folder].type == "form" || layout.properties[folder].type == "sash" || layout.properties[folder].type == "group") {
                        let tabItem = new CTabItem(tabFolder, SWT.NONE);
                        if (layout.properties[folder].title) tabItem.setText(layout.properties[folder].title);
                        else tabItem.setText(folder);
                        tabItem.setControl(createForm(tabFolder, layout.properties[folder], false).widget);
                    }
                };
                layout.widget = tabFolder;
                return layout;
            case "pages":
                // The Pages type creates the WizardPages in a Wizard by recursively calling createForm.
                // This will fail if the dialog type is TitleAndDialog
                let lastPage = null;
                let pageSet = new Map();
                // Figure out the last page added, which will be the default final page
                for (const page in layout.properties) {
                    if (layout.properties[page].type == "form" || layout.properties[page].type == "sash" || layout.properties[page].type == "group") {
                        lastPage = page;
                    }
                }
                for (const page in layout.properties) {
                    let currentPage = layout.properties[page];
                    let currentPageId = page;
                    if (currentPage.type == "form" || currentPage.type == "sash" || currentPage.type == "group") {
                        let wizardPage = new WizardPage(page, {
                            createControl: function (parent) {
                                let pageContents = createForm(parent, currentPage, false).widget;
                                wizardPage.setControl(pageContents);
                            },
                            performHelp: function () {
                                // For now, the same help appears on every page
                                if (help && help instanceof Function) help();
                            },
                            getNextPage: function () {
                                let nextFunction = currentPage?.next;
                                let pageId = null;
                                let page = null;
                                if (nextFunction && nextFunction instanceof Function) {
                                    pageId = nextFunction(traverseLayout(currentPage));
                                    page = pageSet.get(pageId);
                                }
                                if (page) return page;
                                else
                                    return Java.super(wizardPage).getNextPage();
                            },
                            canFlipToNextPage: function () {
                                if (currentPageId == lastPage) return false;
                                let nonValidFields = verificationSet(currentPage);
                                if (required) {
                                    let pageObject = traverseLayout(currentPage);
                                    for (let property of required) {
                                        if (lookupProperty(pageObject, property)) {
                                            let value = findValue(pageObject, property);
                                            if (!isTruthyOrZero(value)) {
                                                return false;
                                            }
                                        }
                                    }
                                }
                                if (nonValidFields.length > 0) return false;
                                return true;
                            }
                        });
                        pageSet.set(currentPageId, wizardPage);
                        if (currentPage.title) wizardPage.setTitle(currentPage.title);
                        if (currentPage.message) wizardPage.setDescription(currentPage.message);
                        parent.addPage(wizardPage);
                    }
                }
                layout.widget = parent;
                return layout;
            case "sash":
                // The Sash type creates a number of sub-forms separated by a moveable divider
                let sash = null;
                if (direction == "horizontal")
                    sash = new SashForm(parent, SWT.HORIZONTAL);
                else if (direction == "vertical")
                    sash = new SashForm(parent, SWT.VERTICAL);
                else
                    sash = new SashForm(parent, SWT.HORIZONTAL);
                sash.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
                //sash.setLayout(new FillLayout());
                if (background && background instanceof Color) sash.setBackground(background);
                let noSashes = 0;
                for (sashForm in layout.properties) {
                    if (layout.properties[sashForm].type == "form") {
                        noSashes++;
                        let form = createForm(sash, layout.properties[sashForm], false);
                    }
                };
                if (weights && Array.isArray(weights) && noSashes == weights.length) sash.setWeights(weights);
                layout.widget = sash;
                return layout;
            default:
                // Just add widgets to the parent, i.e., the Wizard or TitleAndDialog
                return createFormContents(parent, layout);
        }
    }

    let modelDialog =
    {
        type: "form",
        margin: 25,
        title: "Model selection",
        message: "Select the object types to browse.",
        columns: 2,
        properties: {
            includeFolders: {
                type: "checkbox",
                label: "Folders",
                message: "Include folders and their content",
                value: true
            },
            includeViews: {
                type: "checkbox",
                label: "Views",
                message: "Include views and their content",
                value: false
            },
            includeCanvasses: {
                type: "checkbox",
                label: "Canvasses",
                message: "Include canvasses and their content",
                value: false
            },
            includeSketches: {
                type: "checkbox",
                label: "Sketches",
                message: "Include sketches and their content",
                value: false
            },
            includeElements: {
                type: "checkbox",
                label: "Elements",
                message: "Include only elements",
                value: false
            },
            includeAll: {
                type: "checkbox",
                label: "All objects",
                message: "Include all object",
                value: false
            },
            includeConcepts: {
                type: "checkbox",
                label: "Concepts",
                message: "Include all concepts",
                value: false
            },
        }
    }


    function createFormContents(container, layout) {
        let column = 1;
        let { required, columns } = layout;
        columns ??= 2;
        let gridData = null;
        // Handle property widgets
        for (const property in layout.properties) {
            let propertyDefinition = layout.properties[property];
            let propertyType = propertyDefinition.type;
            let { message, tooltip, echo, values, value, extend, span, direction, breakrow, min, max, icons, border, doEvent, relations, tree, fill, enable, disabled, selection, multi, verify, title, filter, objects, editable, toolbar } = propertyDefinition;
            //let label = propertyDefinition.label ? propertyDefinition.label : property;
            let label = propertyDefinition.label ? propertyDefinition.label : null;
            let style = SWT.NONE;
            if (label) {
                let labelWidget = new LabelWidget(container, SWT.NONE);
                if (propertyType != "blank") {
                    labelWidget.setText(label);
                    gridData = new GridData();
                    //gridData.verticalAlignment = GridData.VERTICAL_ALIGN_CENTER;
                    labelWidget.setLayoutData(gridData);
                }
                else {
                    labelWidget.setText("");
                    gridData = new GridData();
                    gridData.horizontalAlignment = GridData.FILL;
                    gridData.verticalAlignment = GridData.TOP
                    labelWidget.setLayoutData(gridData);
                };
                column += 1;
                if (column > columns) column = 1;
            };
            switch (propertyType) {
                case "blank":
                    propertyDefinition.widget = new LabelWidget(container, SWT.NONE);
                    gridData = new GridData();
                    gridData.horizontalAlignment = GridData.FILL;
                    propertyDefinition.widget.setLayoutData(gridData);
                    break;
                case "text":
                    if (multi)
                        propertyDefinition.widget = new TextWidget(container, SWT.MULTI | SWT.BORDER | SWT.WRAP | SWT.V_SCROLL);
                    else
                        propertyDefinition.widget = new TextWidget(container, SWT.SINGLE | SWT.BORDER);
                    if (tooltip) propertyDefinition.widget.setToolTipText(tooltip);
                    if (message) propertyDefinition.widget.setMessage(message);
                    if (echo) propertyDefinition.widget.setEchoChar(echo);
                    if (value) propertyDefinition.widget.setText(value.toString());
                    if (fill && multi) propertyDefinition.widget.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
                    if (fill && !multi) propertyDefinition.widget.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
                    if (verify && verify instanceof Function) {
                        propertyDefinition.widget.addListener(SWT.Modify, e => {
                            let verification = verify(propertyDefinition.widget.getText());
                            propertyDefinition.verification = verification;
                            if (!verification)
                                propertyDefinition.widget.setForeground(new Color(255, 0, 0));
                            else
                                propertyDefinition.widget.setForeground(new Color(0, 0, 0));
                            // If we have a wizard dialog, then update the buttons 
                            if (dialogObject.type == "pages") {
                                let wizardDialog = dialogObject.dialog;
                                let currentPage = wizardDialog.getCurrentPage();
                                currentPage.getWizard().getContainer().updateButtons();
                            }
                            return;
                        })
                    }
                    break;
                case "browser":
                    propertyDefinition.widget = new Browser(container, SWT.EDGE | SWT.BORDER);
                    if (value) {
                        if (isValidUrl(value))
                            propertyDefinition.widget.setUrl(value.toString());
                        else
                            propertyDefinition.widget.setText(value.toString());
                    }
                    if (fill && multi) propertyDefinition.widget.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
                    if (fill && !multi) propertyDefinition.widget.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
                    let treeWidget = null;
                    propertyDefinition.widget.addProgressListener(new ProgressAdapter({
                        completed: function (event) {
                            let fncButton = new CustomFunction(propertyDefinition.widget, "doEventHandler", {
                                function: function (args) {
                                    if (doEvent && doEvent instanceof Function) {
                                        let element = $("#" + args[0]).first();
                                        doEvent(element, args[1]);
                                    }
                                }
                            });
                            let fncLink = new CustomFunction(propertyDefinition.widget, "handleLink", {
                                function: function (args) {
                                    treeWidget = findWidget(dialogObject, tree);
                                    if (treeWidget) {
                                        let treeViewer = treeWidget.widget;
                                        treeViewer.expandAll();
                                        let treeItem = findItem(treeViewer, args[0]);
                                        if (treeItem) {
                                            treeViewer.setSelection(new StructuredSelection(treeItem.getData()));
                                        }
                                    }
                                }
                            });
                            propertyDefinition.widget.addLocationListener(new LocationAdapter({
                                changed: function (e) {
                                    propertyDefinition.widget.removeLocationListener(this);
                                    fncButton.dispose();
                                    fncLink.dispose();
                                }
                            }));
                        }
                    }));
                    break;
                case "option":
                    propertyDefinition.widget = new Composite(container, SWT.NONE);
                    if (tooltip) propertyDefinition.widget.setToolTipText(tooltip);
                    if (direction == "horizontal")
                        propertyDefinition.widget.setLayout(new FillLayout(SWT.HORIZONTAL));
                    else
                        propertyDefinition.widget.setLayout(new FillLayout(SWT.VERTICAL));
                    for (let option of values) {
                        let button = new ButtonWidget(propertyDefinition.widget, SWT.RADIO);
                        if (tooltip) button.setToolTipText(tooltip);
                        button.setText(option);
                        if (option == value) button.setSelection(true);
                    }
                    break;
                case "combo":
                    propertyDefinition.widget = new Combo(container, SWT.NONE);
                    if (tooltip) propertyDefinition.widget.setToolTipText(tooltip);
                    propertyDefinition.widget.setLayout(new FillLayout());
                    propertyDefinition.widget.setItems(values);
                    if (value && values.includes(value)) propertyDefinition.widget.setText(value);
                    if (extend) propertyDefinition.widget.addTraverseListener(e => {
                        if (e.detail == SWT.TRAVERSE_RETURN) {
                            e.doit = false;
                            e.detail = SWT.TRAVERSE_NONE;
                            let newItem = propertyDefinition.widget.getText();
                            propertyDefinition.widget.add(newItem);
                            propertyDefinition.widget.setSelection(new Point(0, newItem.length()));
                        }
                    });
                    break;
                case "list":
                    if (multi)
                        propertyDefinition.widget = new ListWidget(container, SWT.MULTI | SWT.BORDER);
                    else
                        propertyDefinition.widget = new ListWidget(container, SWT.SINGLE | SWT.BORDER);
                    if (tooltip) propertyDefinition.widget.setToolTipText(tooltip);
                    //propertyDefinition.widget.setLayout(new FillLayout());
                    propertyDefinition.widget.setItems(values);
                    if (value && values.includes(value)) propertyDefinition.widget.setSelection(Java.to([value], StringArray));
                    break;
                case "checkbox":
                    propertyDefinition.widget = new ButtonWidget(container, SWT.CHECK);
                    if (tooltip) propertyDefinition.widget.setToolTipText(tooltip);
                    if (value) propertyDefinition.widget.setSelection(value);
                    if (message) propertyDefinition.widget.setText(message);
                    if (enable) {
                        propertyDefinition.widget.addListener(SWT.Selection, e => {
                            if (!Array.isArray(enable)) enable = [enable];
                            enable.forEach(widget => {
                                let targetWidget = findWidget(dialogObject, widget).widget;
                                let sourceState = propertyDefinition.widget.getSelection();
                                if (targetWidget) targetWidget.setEnabled(sourceState);
                            });
                        })
                    }
                    break;
                case "radio":
                    propertyDefinition.widget = new ButtonWidget(container, SWT.RADIO);
                    if (tooltip) propertyDefinition.widget.setToolTipText(tooltip);
                    if (value) propertyDefinition.widget.setSelection(value);
                    if (message) propertyDefinition.widget.setText(message);
                    break;
                case "button":
                    propertyDefinition.widget = new ButtonWidget(container, SWT.PUSH);
                    if (tooltip) propertyDefinition.widget.setToolTipText(tooltip);
                    if (message) propertyDefinition.widget.setText(message);
                    if (selection && selection instanceof Function) {
                        propertyDefinition.widget.addListener(SWT.Selection, e => {
                            let result = selection(property, propertyDefinition.widget);
                            propertyDefinition.widget.setData(result);
                            if (dialogObject.shell) {
                                dialogObject.shell.setActive();
                                dialogObject.shell.setVisible(true);
                            }
                        })
                    }
                    break;
                case "date":
                    propertyDefinition.widget = new DateTime(container, SWT.DATE | SWT.DROP_DOWN | SWT.CALENDAR_WEEKNUMBERS);
                    if (tooltip) propertyDefinition.widget.setToolTipText(tooltip);
                    if (fill) propertyDefinition.widget.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
                    break;
                case "color":
                    propertyDefinition.widget = new ButtonWidget(container, SWT.TOGGLE);
                    if (tooltip) propertyDefinition.widget.setToolTipText(tooltip);
                    if (value) {
                        propertyDefinition.widget.setImage(createColoredImage(24, 24, value));
                    }
                    else {
                        let defaultColor = { red: 255, green: 0, blue: 0 };
                        propertyDefinition.widget.setImage(createColoredImage(24, 24, defaultColor));
                        propertyDefinition.widget.setData(defaultColor)
                    }
                    propertyDefinition.widget.addListener(SWT.Selection, e => {
                        let dialogShell = new JavaShell(shell);
                        let x = e.widget.getLocation().x + e.widget.getShell().getLocation().x;
                        let y = e.widget.getLocation().y + e.widget.getShell().getLocation().y;
                        dialogShell.setLocation(x, y);
                        let colorDlg = new CustomColorDialog(dialogShell);
                        let selectedColor = colorDlg.open();
                        if (selectedColor) {
                            let image = e.widget.getImage();
                            if (image) image.dispose();
                            e.widget.setImage(createColoredImage(24, 24, selectedColor));
                            e.widget.setData(selectedColor);
                        }
                        colorDlg.dispose();
                    })
                    break;
                case "tree":
                    if (objects) {
                        let treeModel = { objects };
                        let style = multi ? SWT.MULTI : SWT.SINGLE;
                        let editor = null;
                        if (filter) {
                            treeModel.filteredTree = new FilteredTree(container, SWT.FULL_SELECTION | style | SWT.BORDER | SWT.H_SCROLL | SWT.V_SCROLL, new PatternFilter(), true, true);
                            propertyDefinition.widget = treeModel.filteredTree.getViewer();
                            if (toolbar) {
                                try {
                                    // This is a hack to add an extra button to the filtered tree
                                    // This might fail if the viewer changes layout
                                    let filterParent = treeModel.filteredTree.getChildren()[0];
                                    let filterControl = filterParent.getChildren()[0];
                                    filterLayout = new GridLayout();
                                    filterLayout.numColumns = 3;
                                    filterLayout.marginHeight = 0;
                                    filterLayout.marginWidth = 0;
                                    filterParent.setLayout(filterLayout);
                                    let toolBar = new ToolBar(filterParent, SWT.FLAT | SWT.HORIZONTAL);
                                    let expandTool = new ToolItem(toolBar, SWT.PUSH);
                                    expandTool.setImage(IArchiImages.ImageFactory.getImage(IArchiImages.ICON_EXPANDALL));
                                    expandTool.setToolTipText("Expand all objects");
                                    expandTool.addListener(SWT.Selection, e => {
                                        propertyDefinition.widget.expandAll();
                                        let treeColumns = propertyDefinition.widget.getTree().getColumns();
                                        shell.getDisplay().asyncExec(new Runnable({
                                            run: function () {
                                                for (const treeColumn of treeColumns) {
                                                    treeColumn.pack();
                                                }
                                            }
                                        }));
                                        let items = propertyDefinition.widget.getTree().getItems();
                                        for (const item of items) {
                                            expandedIcons(item);
                                        }
                                    });
                                    let collapseTool = new ToolItem(toolBar, SWT.PUSH);
                                    collapseTool.setImage(IArchiImages.ImageFactory.getImage(IArchiImages.ICON_COLLAPSEALL));
                                    collapseTool.setToolTipText("Collapse all objects");
                                    collapseTool.addListener(SWT.Selection, e => {
                                        propertyDefinition.widget.collapseAll();
                                        let items = propertyDefinition.widget.getTree().getItems();
                                        for (const item of items) {
                                            item.setImage(IArchiImages.ImageFactory.getImage(IArchiImages.ICON_FOLDER_DEFAULT));
                                        };
                                    });
                                    let separator = new ToolItem(toolBar, SWT.SEPARATOR);
                                    let addTool = new ToolItem(toolBar, SWT.PUSH);
                                    addTool.setImage(IArchiImages.ImageFactory.getImage(IArchiImages.ECLIPSE_IMAGE_FOLDER));
                                    addTool.setToolTipText("Replace objects in the tree");
                                    addTool.addListener(SWT.Selection, e => {
                                        let dialog = createDialog(modelDialog, {
                                            dialogType: "titleAndDialog",
                                            width: 600,
                                            height: 400
                                        });
                                        if (dialog.open()) {
                                            let newObjects = $("#null");
                                            if (dialog.dialogResult.includeFolders) newObjects = newObjects.add($("folder"));
                                            if (dialog.dialogResult.includeViews) newObjects = newObjects.add($("view"));
                                            if (dialog.dialogResult.includeElements) newObjects = newObjects.add($("element"));
                                            if (dialog.dialogResult.includeAll) newObjects = newObjects.add($("*"));
                                            if (dialog.dialogResult.includeConcepts) newObjects = newObjects.add($("concept"));
                                            if (dialog.dialogResult.includeCanvasses) newObjects = newObjects.add($("canvas-model"));
                                            if (dialog.dialogResult.includeSketches) newObjects = newObjects.add($("sketch-model"));
                                            propertyDefinition.widget.setInput(newObjects);
                                            propertyDefinition.widget.refresh();
                                            let treeColumns = propertyDefinition.widget.getTree().getColumns();
                                            for (const treeColumn of treeColumns) {
                                                treeColumn.pack();
                                            };
                                        }
                                    });
                                }
                                catch {
                                    // Ignore
                                }
                            }
                        }
                        else {
                            propertyDefinition.widget = new TreeViewer(container, SWT.FULL_SELECTION | SWT.BORDER);
                        }
                        if (relations) propertyDefinition.widget.setContentProvider(ObjectContentProvider);
                        else propertyDefinition.widget.setContentProvider(ObjectContentProviderNoRelations);
                        // The title parameter determins the columns in the tree
                        let showTitle = true;
                        if (isString(title)) {
                            title = [[title, "name"]];
                        }
                        else if (Array.isArray(title)) {
                            if (title.length == 0 && objects.size() > 0) {
                                // Empty title array will produce default columns with all properties from all objects
                                title = [["Name", "name"], ...Array.from(getProperties(objects))];
                            }
                        }
                        else {
                            showTitle = false;
                            title = ["name"];
                        }
                        if (editable) {
                            let actSupport = new ColumnViewerEditorActivationStrategy(propertyDefinition.widget, {
                                isEditorActivationEvent: function (event) {
                                    return event.eventType == ColumnViewerEditorActivationEvent.TRAVERSAL
                                        || event.eventType == ColumnViewerEditorActivationEvent.MOUSE_DOUBLE_CLICK_SELECTION
                                        || (event.eventType == ColumnViewerEditorActivationEvent.KEY_PRESSED && event.keyCode == SWT.CR)
                                        || event.eventType == ColumnViewerEditorActivationEvent.PROGRAMMATIC;

                                }
                            });
                            let feature = ColumnViewerEditor.TABBING_HORIZONTAL
                                | ColumnViewerEditor.TABBING_MOVE_TO_ROW_NEIGHBOR
                                | ColumnViewerEditor.TABBING_VERTICAL
                                | ColumnViewerEditor.KEYBOARD_ACTIVATION;
                            TreeViewerEditor.create(propertyDefinition.widget, actSupport, feature);
                            editor = new TextCellEditor(propertyDefinition.widget.getTree());
                        };
                        for (const tc of title) {
                            let tcName = null;
                            let tcSelector = null;
                            if (Array.isArray(tc) && tc.length == 2) {
                                tcName = tc[0].toString();
                                tcSelector = tc[1].toString();
                            }
                            else if (isString(tc)) {
                                tcName = tc;
                                tcSelector = tc;
                            }
                            else throw "Title columns in Tree widget must either be an Array of two strings, or a String";
                            let treeViewerColumn = new TreeViewerColumn(propertyDefinition.widget, SWT.NONE);
                            let treeColumn = treeViewerColumn.getColumn();
                            if (tcSelector == "name" || tcName == "Name") {
                                treeViewerColumn.setLabelProvider(new ColumnLabelProvider({
                                    getText: function (element) {
                                        if (!element.name && element.type.includes("relationship")) {
                                            let source = element.source.name;
                                            let target = element.target.name;
                                            let kind = element.type.replace("-", " ");
                                            kind = kind.charAt(0).toUpperCase() + kind.slice(1);
                                            return `${kind.replace("ship", "")} (${source} - ${target})`;
                                        }
                                        else if (!element.name && element.type == 'diagram-model-note') {
                                            if (element.text) return element.text.split('\n', 1)[0].trim();
                                            else return "Note"
                                        }
                                        else if (element.type == "canvas-model-image") return "Image";
                                        else if (element.type == "canvas-model-connection") return "Model connection";
                                        else if (element.type == "canvas-model-sticky") return "Sticky note";
                                        else if (element.type == "sketch-model-sticky") return "Sticky note";
                                        else if (element.type == "canvas-model-block") return "Block";
                                        else if (element.type == "diagram-model-group") return element.name;
                                        else if (element.type == "diagram-model-connection") return "Connection";
                                        else return element.name;
                                    },
                                    getImage: function (element) {
                                        if (icons) return elementIcon(element);
                                        else return null;
                                    },
                                    getFont: function (element) {
                                        if (treeModel.filteredTree) return FilteredTree.getBoldFont(element, treeModel.filteredTree, treeModel.filteredTree.getPatternFilter());
                                        else return JFaceResources.getFontRegistry().defaultFont();
                                    }
                                }));
                            }
                            else {
                                treeViewerColumn.setLabelProvider(new ColumnLabelProvider({
                                    getText: function (element) {
                                        return getProperty(element, tcSelector);
                                    },
                                    getFont: function (element) {
                                        return JFaceResources.getFontRegistry().defaultFont();
                                    }
                                }));
                            }
                            if (showTitle) {
                                treeColumn.setText(tcName);
                                propertyDefinition.widget.getTree().setHeaderVisible(true);
                            };
                            if (editable && tcSelector !== "name") {
                                treeViewerColumn.setEditingSupport(new EditingSupport(propertyDefinition.widget, {
                                    canEdit: function (element) {
                                        return true;
                                    },
                                    getCellEditor: function (element) {
                                        return editor;
                                    },
                                    getValue: function (element) {
                                        return getProperty(element, tcSelector);
                                    },
                                    setValue: function (element, value) {
                                        setProperty(element, tcSelector, value);
                                        propertyDefinition.widget.update(element, null);
                                    }
                                }));
                            };
                            treeColumn.pack();
                        };
                        propertyDefinition.widget.setInput(treeModel.objects);
                        propertyDefinition.widget.getTree().getColumn(0).pack();
                        propertyDefinition.widget.getTree().addListener(SWT.Expand, e => {
                            let treeItem = e.item;
                            let treeColumns = treeItem.getParent().getColumns();
                            if (treeItem.getData().type == "folder" && icons)
                                treeItem.setImage(IArchiImages.ImageFactory.getImage(IArchiImages.ECLIPSE_IMAGE_FOLDER));
                            shell.getDisplay().asyncExec(new Runnable({
                                run: function () {
                                    for (const treeColumn of treeColumns) {
                                        treeColumn.pack();
                                    }
                                }
                            }))
                        });
                        propertyDefinition.widget.getTree().addListener(SWT.Collapse, e => {
                            let treeItem = e.item;
                            if (treeItem.getData().type == "folder" && icons)
                                treeItem.setImage(IArchiImages.ImageFactory.getImage(IArchiImages.ICON_FOLDER_DEFAULT));
                        });
                        if (fill) propertyDefinition.widget.getTree().setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
                        if (selection && Array.isArray(selection)) {
                            propertyDefinition.widget.addSelectionChangedListener(e => {
                                for (const trigger of selection) {
                                    let { source, target } = trigger;
                                    let targetObject = findWidget(dialogObject, target)
                                    let targetWidget = targetObject.widget;
                                    let field = source ? source : "name";

                                    let fieldObject = e.getSelection().iterator().next();
                                    fieldObject = $("#" + fieldObject.id).first(); // Coerce to Archi object.
                                    let fieldValue = "No value";
                                    switch (field) {
                                        case "name":
                                            fieldValue = fieldObject.name;
                                            break;
                                        case "documentation":
                                            fieldValue = fieldObject.documentation;
                                            break;
                                        default:
                                            fieldValue = $(fieldObject).prop(source);
                                    }
                                    if (targetObject.type == "browser") {
                                        let svg = "";
                                        if ($(fieldObject).children().size() && $(fieldObject).is("archimate-diagram-model") || $(fieldObject).is("diagram-model-reference") || $(fieldObject).is("sketch-model") || $(fieldObject).is("canvas-model")) {
                                            if ($(fieldObject).is("diagram-model-reference")) {
                                                fieldObject = fieldObject.refView;
                                            }
                                            let outputView = $(fieldObject).prop("dialog:outputView");

                                            if (outputView !== "false") svg = $.model.renderViewAsSVGString(fieldObject, true);
                                        }
                                        let markdown = `### ${fieldObject.name} ###` + "\n\n";
                                        // If the selected item is a note, then the first line has been used 
                                        // as the tree item name, the rest will be used as the body of text
                                        if ($(fieldObject).is("diagram-model-note")) {
                                            let newlineIndex = fieldObject.text.indexOf('\n');
                                            markdown += newlineIndex !== -1 ? fieldObject.text.slice(newlineIndex + 1) : "";
                                        }
                                        else if (fieldValue) markdown += fieldValue;
                                        let html = marked.parse(markdown);
                                        html = /*html*/ `
                                            <html>
                                                <style>
                                                    svg {
                                                        width: 75%;
                                                        display: block;
                                                        margin-left: auto;
                                                        margin-right: auto;
                                                        margin-top: 20; 
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
                                                        background-color: #0078D7;
                                                        border: none;
                                                        color: white;
                                                        padding: 8px 16px;
                                                        text-align: center;
                                                        text-decoration: none;
                                                        display: inline-block;
                                                        font-size: 12;
                                                        font-weight: bold;
                                                        margin: 4px 2px;
                                                        cursor: pointer;
                                                        border-radius: 2px;
                                                        transition-duration: 0.4s;
                                                    }
                                                    button:hover {
                                                        background-color: #134EB0;
                                                        color: white;
                                                    }
                                                    button:disabled {
                                                        background-color: #FEFEFE;
                                                        color: #666666;
                                                    }
                                                </style>
                                                <script type="text/javascript">
                                                    function doEvent(...args) {
                                                        doEventHandler("${fieldObject.id}", args);
                                                    };
                                                    function isValidUrl(url) {
                                                        console.log(url)
                                                        try {
                                                            new URL(url);
                                                            return true;
                                                        } catch (e) {
                                                            return false;
                                                        }
                                                    }
                                                    function attachLinkInspectHandler() {
                                                        const links = document.querySelectorAll('a');

                                                        function handleLinkClick(event) {
                                                            let destination = event.target.href;
                                                            if (destination.startsWith("about:blank"))
                                                                destination = destination.replace("about:blank","");
                                                            console.log(destination)
                                                            if (!isValidUrl(destination)) {
                                                                handleLink(event.target.innerText);
                                                                event.preventDefault();
                                                            };
                                                        }
                                                        links.forEach((link) => {
                                                            link.addEventListener('click', handleLinkClick);
                                                        });
                                                    };
                                                    document.addEventListener('DOMContentLoaded', attachLinkInspectHandler);
                                                </script>
                                                <body style="margin:4;padding:0">
                                                    <div style="position: fixed; top: 0; width: 100%;">
                                                        <button id="backButton" onclick="window.history.back()" style="background-color: white; color: black; padding: 0px 0px; text-align: center; text-decoration: none; display: inline-block; font-size: 12px;">&#8592;</button>
                                                        <button id="forwardButton" onclick="window.history.forward()" style="background-color: white; color: black; padding: 0px 0px; text-align: center; text-decoration: none; display: inline-block; font-size: 12px;">&#8594;</button>
                                                    </div>
                                                    ${svg}
                                                    <div style='margin-top:20;font-family: Segoe UI;font-size: 12'>
                                                        ${html}
                                                    </div>
                                                </body>
                                            </html>`;
                                        fieldValue = html;
                                    };
                                    if (targetWidget) {
                                        targetWidget.setText(fieldValue);
                                    };
                                }
                            })
                        }
                    }
                    break;
                case "scale":
                    let compound = new Composite(container, SWT.NONE);
                    let rowLayout = new RowLayout();
                    rowLayout.center = true;
                    rowLayout.marginLeft = 0;
                    rowLayout.marginTop = 0;
                    rowLayout.marginRight = 0;
                    rowLayout.marginBottom = 0;
                    rowLayout.spacing = 0;
                    compound.setLayout(rowLayout);
                    let scaleWidget = new ScaleWidget(compound, SWT.HORIZONTAL);
                    scaleWidget.setLayoutData(new RowData(scaleWidget.computeSize(SWT.DEFAULT, SWT.DEFAULT).x * 1.5, scaleWidget.computeSize(SWT.DEFAULT, SWT.DEFAULT).y))
                    // Minimal error handling
                    if (!max) max = 100;
                    if (!min) min = 0;
                    if (!value) value = min;
                    if (max < min) {
                        min = 0;
                        max = 100;
                    }
                    // The indicator holds the current value of the scale
                    let indicator = new LabelWidget(compound, SWT.NONE);
                    // Make sure the indicator is wide enough 
                    indicator.setText(value.toString() + '  '.repeat(max.toString().length - value.toString().length));
                    if (min) scaleWidget.setMinimum(min);
                    else scaleWidget.setMinimum(0);
                    if (max) scaleWidget.setMaximum(max);
                    else scaleWidget.setMaximum(100);
                    scaleWidget.setPageIncrement(10);
                    scaleWidget.setSelection(value);
                    scaleWidget.addSelectionListener(SelectionListener.widgetSelectedAdapter((e) => {
                        indicator.setText(e.widget.getSelection().toString());
                    }));;
                    compound.pack();
                    propertyDefinition.widget = compound;
                    break;
                case "form":
                    if (border) style = style | SWT.BORDER;
                    propertyDefinition.widget = createForm(container, propertyDefinition, false, style).widget;
                    if (message) propertyDefinition.widget.setText(message);
                    break;
                case "group":
                    propertyDefinition.widget = createForm(container, propertyDefinition, false, style).widget;
                    if (title) propertyDefinition.widget.setText(title);
                    break;
                case "pages":
                    throw "Wizard pages  are only allowed on root level!";
                case "folder":
                    throw "Folder widgets are only allowed on root level!";
                default:
                    throw "Unknown field type: " + propertyType;
            };
            // If the property is required, assign an event handler to update buttons on the wizard dialog (enable/disable next/finish buttons)
            if (required && required.includes(property)) {
                propertyDefinition.widget.addListener(SWT.Modify, e => {
                    if (dialogObject.type == "pages") {
                        let wizardDialog = dialogObject.dialog;
                        let currentPage = wizardDialog.getCurrentPage();
                        currentPage.getWizard().getContainer().updateButtons();
                    }
                })
            }
            if (disabled) {
                propertyDefinition.widget.setEnabled(false);
            }
            // The span property sets the number of columns this form element spans. 
            // Each form element use two columns, one for the label, and one for the data entry widget
            if (span) {
                let gridData = propertyDefinition.widget.getLayoutData();
                if (!gridData) gridData = new GridData();
                gridData.horizontalSpan = span;
                propertyDefinition.widget.setLayoutData(gridData);
                column += span - 1;
            }
            column += 1; if (column > columns) column = 1;
            // If the breakrow property is true, start putting form elements in a new row
            if (breakrow) {
                let blankSpace = new LabelWidget(container, SWT.NONE);
                let gridData = new GridData();
                gridData.horizontalAlignment = GridData.FILL;
                gridData.horizontalSpan = columns - column + 1;
                blankSpace.setLayoutData(gridData);
                column = 1;
            };
        };
        layout.widget = container;
        return layout;
    }

    let CustomDialog = {};

    let persistToFile = function () {
        let System = Java.type('java.lang.System');
        let tmpfile = __SCRIPTS_DIR__ + "update.ajs";
        let text = "";
        for (const e of valueMap.keys()) {
            let element = $("#" + e).first();
            let cache = valueMap.get(e);
            if (element && cache) {
                for (const property in cache) {
                    if (property == "documentation")
                        text = text + `$("#${e}").first().documentation = "${cache[property]}";\n`;
                    else
                        text = text + `$("#${e}").first().prop("${property}","${cache[property]}");\n`;
                }
            }
        }
        $.fs.writeFile(tmpfile, text);
    };

    let persist = function () {
        for (const e of valueMap.keys()) {
            let element = $("#" + e).first();
            let cache = valueMap.get(e);
            if (element && cache) {
                for (const property in cache) {
                    if (property == "documentation")
                        element.documentation = cache[property];
                    else
                        $(element).prop(property, cache[property]);
                }
            }
        }
    };

    if (dialogType == "wizard") {
        CustomDialog = {
            dialogResult: null,
            persistToFile: function () {
                persistToFile();
            },
            persist: function () {
                persist();
            },
            open: function () {
                let wizardModel = new Wizard({
                    performFinish: function () {
                        CustomDialog.dialogResult = traverseLayout(dialogObject);
                        if (finish && finish instanceof Function) finish(CustomDialog.dialogResult);
                        return true;
                    },
                    canFinish: function () {
                        let result = traverseLayout(dialogObject);
                        let verifications = verificationSet(dialogObject);
                        let requiredProperties = requiredSet(rootLayout.required, result);
                        if (requiredProperties.length == 0 && verifications.length == 0) return true;
                        else return false;
                    }
                });
                dialogObject = createForm(wizardModel, rootLayout, true);
                wizardModel.setWindowTitle(rootLayout.title);
                wizardDialog = new WizardDialog(shell, wizardModel);
                if (help && help instanceof Function)
                    wizardDialog.setHelpAvailable(true);
                else
                    wizardDialog.setHelpAvailable(false);
                wizardDialog.setMinimumPageSize(width, height);
                dialogObject.dialog = wizardDialog;
                result = wizardDialog.open();
                result.valueMap = valueMap;
                return result;
            }
        };
        return CustomDialog;
    }
    if (dialogType == "titleAndDialog") {
        CustomDialog = {
            dialogResult: null,
            buttonIds: IDialogConstants.CLIENT_ID,

            open: function () {
                let result = this.dialog.open() == 0;
                return result;
            },
            persistToFile: function () {
                persistToFile();
            },
            persist: function () {
                persist();
            },
            dialog: new TitleAreaDialog(shell, {
                create: function () {
                    Java.super(CustomDialog.dialog).create();
                    CustomDialog.dialog.setTitle(rootLayout.title);
                    CustomDialog.dialog.setMessage(rootLayout.message, IMessageProvider.NONE);
                    CustomDialog.dialog.setTitleImage(IArchiImages.ImageFactory.getImage(IArchiImages.ICON_APP_64));
                },

                createDialogArea: function (parent) {
                    let area = Java.super(CustomDialog.dialog).createDialogArea(parent);
                    let clientArea = new Composite(area, SWT.NONE);
                    data = new GridData(SWT.FILL, SWT.FILL, true, true);
                    data.heightHint = height;
                    data.widthHint = width;
                    GridLayoutFactory.swtDefaults().numColumns(1).margins(0, 0).spacing(0, 0).applyTo(clientArea);
                    clientArea.setLayoutData(data);
                    dialogObject = createForm(clientArea, rootLayout, true);
                    return area;
                },

                createButtonBar: function (parent) {
                    if (buttons) {
                        let line = new LabelWidget(parent, SWT.SEPARATOR | SWT.HORIZONTAL);
                        line.setLayoutData(new GridData(SWT.FILL, SWT.TOP, true, false));
                        let buttonBar = new Composite(parent, SWT.NONE);
                        buttonBar.setLayoutData(new GridData(SWT.END, SWT.END, true, false));
                        GridLayoutFactory.fillDefaults().margins(5, 10).spacing(15, 15).applyTo(buttonBar);
                        for (let button in buttons) {
                            let label;
                            let buttonId;
                            let defaultButton = false;

                            if (buttons[button].okButton) {
                                label = buttons[button]?.label ? buttons[button].label : "Ok";
                                defaultButton = true;
                                buttonId = IDialogConstants.OK_ID;
                            }
                            else if (buttons[button].cancelButton) {
                                label = buttons[button]?.label ? buttons[button].label : "Cancel";
                                buttonId = IDialogConstants.CANCEL_ID;
                            }
                            else {
                                label = buttons[button]?.label ? buttons[button].label : button;
                                buttonId = CustomDialog.buttonIds++;
                            };
                            let newButton = Java.super(CustomDialog.dialog).createButton(buttonBar, buttonId, label, defaultButton);
                            if (buttons[button]?.selection && buttons[button].selection instanceof Function) {
                                newButton.addListener(SWT.Selection, e => {
                                    let result = buttons[button].selection(button, newButton);
                                    newButton.setData(result);
                                })
                            }
                        }
                        buttonBar.setSize(buttonBar.computeSize(SWT.DEFAULT, IDialogConstants.BUTTON_BAR_HEIGHT));
                        return buttonBar;
                    }
                    else return Java.super(CustomDialog.dialog).createButtonBar(parent);
                },

                okPressed: function () {
                    let result = traverseLayout(dialogObject);
                    result.valueMap = valueMap;
                    let verifications = verificationSet(dialogObject);
                    let requiredProperties = requiredSet(rootLayout.required, result);
                    if (requiredProperties.length == 0 && verifications.length == 0) {
                        CustomDialog.dialogResult = result;
                        Java.super(CustomDialog.dialog).okPressed();
                    } else {
                        if (requiredProperties.length > 0) {
                            window.alert("The following fields are required: " + ([...new Set([...requiredProperties])]).join(", "));
                        } else if (verifications.length > 0) {
                            let widget = findWidget(dialogObject, verifications[0]);
                            let label = widget?.label ? widget.label : verifications[0];
                            let error = widget?.error ? widget.error : `Some error in field ${label}`;
                            window.alert(error);
                        }
                    }

                }
            })
        }
        CustomDialog.dialog.setHelpAvailable(false);
        return CustomDialog;
    }
}