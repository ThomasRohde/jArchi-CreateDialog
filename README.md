
# Archi Dialogs #
Welcome to the Archi CreateDialog library.

CreateDialog is a user interface library that enables you to create nice and functional Eclipse dialogs in Archi with ease. Whether you need to display information, collect input, or perform actions on your Archi models, CreateDialog has you covered. With CreateDialog, you don’t have to worry about the technical details of Eclipse and Java. You can focus on the design and logic of your dialogs, while still having access to a rich set of UI elements and features that can handle any UI challenge you throw at them.

CreateDialog is powered by jArchi, the scripting plugin for Archi that lets you automate and extend Archi’s functionality with JavaScript. By combining the flexibility of jArchi with the simplicity of CreateDialog, you can unleash your creativity and productivity in building amazing user interfaces for your Archi projects.

### Quick start ###

To get started, download the following files from this repo:

- `CreateEclipseForm.js` - The main library containing the [createDialog](#createdialog) function. This should be placed in the `lib` directory
- `BrowseModel.js`- A small utility function to view models that have been structured to support this library
- `jArchi Dialogs.archimate` - A model that documents the library
- `jArchi Dialogs Help.ajs` - Displays a help dialog using `BrowseModel.js` on the `jArchi Dialogs.archimate` model
- `modeltrap.js` - a utility script to ensure that a model is selected. Should be place in the `lib` directory

After placing the files in the proper directories, please verify the `load()` statements in `CreateEclipseForm.js`.

To use the library for the first time, open `jArchi Dialogs.archimate` in Archi and follow the instructions there. You will learn how to use the createDialog function and its parameters, how to design your dialog layout and content, how to add event handlers and validations, how to access and manipulate your Archi models from within your dialogs, and much more.
# Introduction to the CreateDialog library #
![Introduction to the CreateDialog library](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/Introduction%20to%20the%20CreateDialog%20library.png)

The CreateDialog library, creates dialogs in script from simple JavaScript object literals.

This code is the "Hello World" of CreateDialog.

	let dialog = createDialog( {
    	type: "form",
	    title: "Hello",
    	message: "World"
	});

	if (dialog.open()) {
    	dialog.persist();
	};

<button onclick="doEvent('Run')">Run!</button>

Currently, the CreateDialog libray supports two kinds of dialogs, the TitleAndDialog dialog, and the Wizard dialog.
## titleAndDialog ##
The Eclipse JFace TitleAreaDialog class is a versatile and customizable dialog that provides a reserved space for UI elements and controls.
## wizard ##
The Eclipse JFace Wizard is a powerful and flexible framework for creating multi-step user interfaces, allowing you to guide users through a sequence of tasks or decision-making processes. It is particularly useful when you have complex or interdependent user inputs that require multiple steps to complete.
# Creating a dialog #
The [createDialog](#createdialog) function takes a layout object and an optional object, setting various options for the dialog.

The following example options object creates a dialog with three buttons:

    let customOptions = {
        dialogType: "titleAndDialog",
        width: 1200,
        height: 800,
            buttons: {
                test: {
                    label: "Hello",
                    selection: function (button, widget) {
                        window.alert("World")
                    } 
                },
                ok: {
                    label: "&Ok",
                    value: "Ok pressed",
                    okButton: true
                },
                cancel: {
                    label: "&Cancel",
                    value: "Cancel pressed",
                    cancelButton: true
                }
            } 
    };
<button onclick="doEvent('Run')">Run!</button>

The `ok` and `cancel` buttons recreate the standard buttons in a normal dialog box. The test button displays new dialog when pressed.
## createDialog ##
#### Usage ####

    let dialog = createDialog(dialogObject);

or

    let dialog = createDialog(dialogObject, options);

If no options are given to the function, a standard Eclipse JFace TitleAndDialog dialog will be created.

The function returns an dialog object providing the following functionalities:

- [open()](#open) - opens a modal dialog and waits for the user to exit. Returns `true` if Ok, or similar, is pressed or `false` otherwise.
- [persist()](#persist) - persists any changes to model objects and properties 
- [dialogResult](#dialogresult) - the result of the dialog data entry formatted as an object

The `dialogObject` describes the layout and functionality of a dialog as a JavaScript object. The general layout is formatted as this:

	let dialogObject = {
		type: "topLevelType",
		option: "optionChoice,
		properties: {
			property1: {
				type: "widgetType",
				option: "optionChoice",
				...
			},
			...
		}
	}

Property names, e.g., `property1`, must be unique.

The `type` member is alwasy required.

The `topLevelType` can be one of the following types:

- [form](#form) - A standard form, or composite, that can contain one or more `widgetTypes`
- [sash](#sash) - A composite of two or more `forms` separated with dividers, that can be moved to change the relative sizes of the sub-forms. The `sash´ can be layed out horizontally or vertically
- [folder](#folder) - A composite of one or more `forms`. The `forms` are selectable by clicking a top level folder button
- [pages](#pages) - A sequence of `forms` that are navigated by buttons to advance or go back from the current page, as well as a finish button. Pages are only awailable for the wizard dialog type
- [group](#group) - A composite of widgets framed by a titled border. Typically used on a form to group related widgets

The `options` paratemer sets a few global options for the dialog.

|Option			|Dialog			|Values			|Description 			|
|:--------------|:--------------|:--------------|:----------------------|
|width			|All			|int			|Sets a width hint		|
|height			|All			|int			|Sets a height hint		|
|dialogType		|All			|"wizard" or "titleAndDialog"|Choose the dialog type|
|buttons		|titleAndDialog	|object			|Define the buttons in a dialog (see below)|
|finish			|wizard			|function		|Execute the provided function when the user presses the 'Finish' button in the wizard. </br>The function is called with the dialogResults as a parameter.|
|help			|wizard			|function		|Execute the provided function when the user presses the '?' button in the wizard.</br>If no help function is supplied, the '?' button is not displayed.|


### open() ###
This function opens the dialog, and returns truthy if an Ok button has been clicked.
### persist() ###

### dialogResult ###
The dialog result is available after the succesful execution of [createDialog]() as a member object.

The result is created as a flattened version of the dialogObject as supplied to the [creadteDialog]() function, where every member of the `properties` objects are created as new members with their current widget value as the value.
## Top-level widgets ##
Again, the available top-level widgets are:

-	A `form` is a simple composite, that can contain one or more widgetTypes

- A `group` is a composite of widgets framed by a titled border

- The type `pages` are a sequence of `forms` that are navigated by buttons to advance or go back from the current page

- A `sash` is a composite of two or more forms separated with dividers

- A `folder` is a composite of one or more forms. The forms are stacked and selectable 
### form ###
![form](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/form.png)

A `form` is a simple composite, that can contain one or more widgetTypes. The implementation uses the Composite SWT widget, and uses a gridlayout with a user defined number of columns. The form will fill out the entire parent space.

`form` have the following options.

| Option | Values | Description |
| :------ | :------ | :------------ |
| columns | integer | Sets the number of columns in the grid. Default is `2` |
| equalWidth | boolean | If true, the columns will have equal width. Default is `false` |
| margin | integer | Sets the margin around the `form` and the spacing between child widgets |
| background | `org.eclipse.swt.graphics.Color` | Sets the background color of the `form`. Default is the system default|
|next| function|Function to determine the next page based on the current value of the dialogObject|
### group ###
![group](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/group.png)

A `group`composite of widgets framed by a titled border. Typically used on a form to group related widgets.


| Option | Values | Description |
| :------ | :------ | :------------ |
|fill|boolean|If `true` the `group`fills the available space|
| columns | integer | Sets the number of columns in the grid. Default is `2` |
| equalWidth | boolean | If true, the columns will have equal width. Default is `false` |
|message|string|Inserts a label with the message text inserted as the first child. The text is italicized|
### pages ###
![pages](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/pages.png)

The type `pages` are a sequence of `forms`, `group` or `sash` widget. The pages are navigated by buttons to advance or go back from the current page, as well as a finish button. Pages are only awailable for the wizard dialog type.

Typically, the wizard can advance to the next page. However, pages in the wizard, can define a `next` function that takes the current state of the `dialogObject` and returns the name of the next page to advance to.

The following examples displays a 3-page wizard. If you enter `last` in the text box on page 1, the Next button will jump to Page 3.

    let dialog = createDialog(
        {
            type: "pages",
            properties: {
                page1: {
                    type: "form",
                    title: "Form",
                    message: "This is page 1",
                    next: function (values) {
                        if (values.text1 == "last") return "page3";
                    },
                    properties: {
                        text1: {
                            type: "text",
                            label: "Text",
                        }
                    }
                },
                page2: {
                    type: "form",
                    title: "Form",
                    message: "This is page 2",
                    properties: {
                        text2: {
                            type: "text",
                            label: "Text",
                        }
                    }
                },
                page3: {
                    type: "form",
                    title: "Form",
                    message: "This is page 3",
                    properties: {
                        text3: {
                            type: "text",
                            label: "Text",
                        }
                    }
                }
            }
        },
        { dialogType: "wizard" });

    dialog.open();

<button onclick="doEvent('Run')">Run!</button>

There are no options for `pages`.
### folder ###
![folder](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/folder.png)

A `folder` is a composite of one or more forms. Child properties (widgets) that are not of type `form`, `sash`, or `group` are ignored. The forms are selectable by clicking a top level folder button.

There are no options.

### sash ###
![sash](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/sash.png)

A `sash` is a composite of two or more forms separated with dividers, that can be moved to change the relative sizes of the sub-forms. The `sash´ can be layed out horizontally or vertically.

| Option | Values | Description |
| :------ | :------ | :------------ |
## Widgets ##
Widgets are the main interactive visual elements of the dialogs. Currently the available widgets are:

- [form](#formwidget) - the form can both be a top level widget as well a simple widget used for grouping
- [blank](#blank) - a placeholder widget - takes up one cell in the grid, but does nothing
- [text](#text) - a text entry widget with support for password masking
- [browser](#browser) - an embedded browser for optional HTML or URLs
- [option](#option) - one or more radio buttons
- [combo](#combo) - selection of one option from a drop-down list
- [list](#list) - selection of one option from a list
- [checkbox](#checkbox) - a selectable option 
- [radio](#radio) - a single radio button, which interacts with other radio buttons within the same parent form (but not those defined with an `option`)
- [button](#button) - a standard button which can trigger an optional function
- [date](#date) - a date picker
- [color](#color) - a color picker
- [tree](#tree) - a tree browser of Archi collections
- [scale](#scale) - a sliding scale
