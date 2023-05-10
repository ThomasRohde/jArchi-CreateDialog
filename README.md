
# Archi Dialogs #
Welcome to the Archi CreateDialog library.

CreateDialog is a user interface library that enables you to create nice and functional Eclipse dialogs in Archi with ease. Whether you need to display information, collect input, or perform actions on your Archi models, CreateDialog has you covered. With CreateDialog, you don’t have to worry about the technical details of Eclipse and Java. You can focus on the design and logic of your dialogs, while still having access to a rich set of UI elements and features that can handle any UI challenge you throw at them.

CreateDialog is powered by jArchi, the scripting plugin for Archi that lets you automate and extend Archi’s functionality with JavaScript. By combining the flexibility of jArchi with the simplicity of CreateDialog, you can unleash your creativity and productivity in building amazing user interfaces for your Archi projects.

### Quick start ###

To get started, download the following files from this repo:

- `CreateEclipseForm.js` - The main library containing the [createDialog](#createdialog) function. This should be placed in the `lib` directory
- `Model browser.ajs`- A small application to view models that have been structured to support this library
- `jArchi Dialogs.archimate` - A model that documents the library
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

|Option			|Dialog			|Values			|Description 			|
|:--------------|:--------------|:--------------|:----------------------|
|width			|All			|int			|Sets a width hint		|
|height			|All			|int			|Sets a height hint		|
|dialogType		|All			|"wizard" or "titleAndDialog"|Choose the dialog type|
|buttons		|titleAndDialog	|object			|Define the buttons in a dialog (see below)|
|finish			|wizard			|function		|Execute the provided function when the user presses the 'Finish' button in the wizard. </br>The function is called with the dialogResults as a parameter.|
|help			|wizard			|function		|Execute the provided function when the user presses the '?' button in the wizard.</br>If no help function is supplied, the '?' button is not displayed.|

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
## Top-level widgets ##
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

The `topLevelType` can be one of the following types:

- [form](#form) - A standard form, or composite, that can contain one or more `widgetTypes`
- [sash](#sash) - A composite of two or more `forms` separated with dividers, that can be moved to change the relative sizes of the sub-forms. The `sash´ can be layed out horizontally or vertically
- [folder](#folder) - A composite of one or more `forms`. The `forms` are selectable by clicking a top level folder button
- [pages](#pages) - A sequence of `forms` that are navigated by buttons to advance or go back from the current page, as well as a finish button. Pages are only awailable for the wizard dialog type
- [group](#group) - A composite of widgets framed by a titled border. Typically used on a form to group related widgets

### form ###
![form](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/form.png)
Form description
#### form ####

### group ###
![group](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/group.png)
Group description
#### group ####

### pages ###
![pages](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/pages.png)
Pages description
#### pages ####

### sash ###
![sash](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/sash.png)
Sash description
#### sash ####

## Widgets ##
Widgets are the main interactive visual elements of the dialogs. Currently the available widgets are:

- [form](#form) - the form can both be a top level widget as well a simple widget used for grouping
- [blank](#blank) - a placeholder widget - takes up one cell in the grid, but does nothing
- [text](#text)
- [browser](#browser)
- [option](#option)
- [combo](#combo)
- [list](#list)
- [checkbox](#checkbox)
- [radio](#radio)
- [button](#button)
- [date](#date)
- [color](#color)
- [tree](#tree)
- [scale](#scale)
## createDialog ##
