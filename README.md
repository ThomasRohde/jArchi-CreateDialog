
# Archi Dialogs #
This model describes and documents the CreateDialog script library.
# Introduction to the CreateDialog library #
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
## createDialog ##
#### Function: createDialog() ####

##### Usage #####

    let dialog = createDialog(dialogObject);

or

    let dialog = createDialog(dialogObject, options);

If no options are given to the function, a standard Eclipse JFace TitleAndDialog dialog will we created.

The function returns an dialog object providing the following functionalities:

- [open()](#open) - opens a modal dialog and waits for the user to exit. Returns `true` if Ok, or similar, is pressed or `false` otherwise.
- [persist()](#persist) - persists any changes to model objects and properties 
- [dialogResult](#dialogresult) - the result of the dialog data entry formatted as an object

Read about crafting a [dialogObject](#dialogobject).
### persist() ###

### open() ###
This function opens the dialog, and returns truthy if an Ok button has been clicked.
## dialogObject ##
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

### sash ###

### form ###

### pages ###

### group ###

### Widgets ###
Widgets are the main interactive visual elements of the dialogs. Currently the available widgets are:

- [form](#form) - the form can both be a top level widget as well a simple widget used for grouping
#### form-widget ####

## dialogResult ##
The dialog result is available after the succesful execution of [createDialog]() as a member object.

The result is created as a flattened version of the [dialogObject]()#dialogobject, where every member of the `properties` objects are created as new members with their current widget value as the value.
