
# Archi Dialogs 0.9 #
Welcome to the Archi CreateDialog library.

CreateDialog is a user interface library that enables you to create nice and functional Eclipse dialogs in Archi with ease. Whether you need to display information, collect input, or perform actions on your Archi models, CreateDialog has you covered. With CreateDialog, you don’t have to worry about the technical details of Eclipse and Java. You can focus on the design and logic of your dialogs, while still having access to a rich set of UI elements and features that can handle any UI challenge you throw at them.

CreateDialog is powered by jArchi, the scripting plugin for Archi that lets you automate and extend Archi’s functionality with JavaScript. By combining the flexibility of jArchi with the simplicity of CreateDialog, you can unleash your creativity and productivity in building amazing user interfaces for your Archi projects.

### Quick start ###

To get started, download the following files from this repo:

- `CreateEclipseForm.js` - The main library containing the [createDialog](#createdialog) function. This should be placed in the `lib` directory
- `BrowseModel.js`- A small utility function to view models that have been structured to support this library. This should be placed in the `lib` directory
- `jArchi Dialogs.archimate` - A model that documents the library
- `jArchi Dialogs Help.ajs` - Displays a help dialog using `BrowseModel.js` on the `jArchi Dialogs.archimate` model
- `modeltrap.js` - a utility script to ensure that a model is selected. Should be place in the `lib` directory
- `Assess TIME.ajs` - an example dialog based application for assessing Application Components according to the Gartner TIME model (Tolerate-Invest-Migrate-Eliminate)

After placing the files in the proper directories, please verify the `load()` statements in `CreateEclipseForm.js`.

To use the library for the first time, open `jArchi Dialogs.archimate` in Archi, select it as the current model. Run the script `jArchi Dialogs Help.ajs` and follow the instructions there. 

You will learn how to use the createDialog function and its parameters, how to design your dialog layout and content, how to add event handlers and validations, how to access and manipulate your Archi models from within your dialogs, and much more.
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
|message		|titleAndDialog|string|The sub title of the dialog|
|width			|All			|int			|Sets a width hint		|
|height			|All			|int			|Sets a height hint		|
|dialogType		|All			|"wizard" or "titleAndDialog"|Choose the dialog type|
|buttons		|titleAndDialog	|object			|Define the buttons in a dialog (see below)|
|finish			|wizard			|function		|Execute the provided function when the user presses the 'Finish' button in the wizard. </br>The function is called with the dialogResults as a parameter.|
|help			|wizard			|function		|Execute the provided function when the user presses the '?' button in the wizard.</br>If no help function is supplied, the '?' button is not displayed.|
|required|All|string[]|List of properties that are required to have a value|


### open() ###
This function opens the dialog, and returns truthy if an Ok button has been clicked.
### persist() ###
The `tree` widget support edititing and changing the values of element properties displayed in the tree. The changes are maintained in a cache and are not immeadiately reflected in the model. Calling `persist()` after the successful execution of `open()` will persist the changes in the model.
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
|next|function|Function to determine the next page based on the current value of the dialogObject|

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



There are no options for `pages`.
### folder ###
![folder](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/folder.png)

A `folder` is a composite of one or more forms. Child properties (widgets) that are not of type `form`, `sash`, or `group` are ignored. The forms are selectable by clicking a top level folder button.

There are no options.

### sash ###
![sash](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/sash.png)

A `sash` is a composite of two or more forms separated with dividers, that can be moved to change the relative sizes of the sub-forms. The `sash´ can be layed out horizontally or vertically.

The `sash` only support child widgets of type `form`.

| Option | Values | Description |
| :------ | :------ | :------------ |
|direction|`horizontal` or `vertical`|Determines the spacial layout of a `sash`. Default is `horizontal`|
|background|`Java.type('org.eclipse.swt.graphics.Color')`|Sets the background color of the `sash`. The background of a `sash` is the narrow margin around the vertical or horizontal divider.|
|weights|`integer[]`|Set the relative weight of each child `form` in the `sash`. The weight represents the percent of the total width (if the `sash` has horizontal orientation) or total height (if the `sash` has vertical orientation) each `form` occupies| 
## Widgets ##
Widgets are the main interactive visual elements of the dialogs. Currently the available widgets are:

- [form](#form) - the form can both be a top level widget as well a simple widget used for grouping
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
- [scale](#scale) - a sliding scale
- [tree](#tree) - a tree browser of Archi collections

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
|next|function|Function to determine the next page based on the current value of the dialogObject|

### blank ###
A `blank` is a empty label widget. The main purpose of `blank` is to fill a cell in a `form` grid and aid in the layout.
### text ###
![text](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/text.png)

A `text` widget provides text entry support. If an echo character, e.g., '*', is supplied as an option then the text is replaced with a string of echo characters obscuring the entered text, making it suitable for password entry.

The following example shows a `form` with two `text` entry widgets. One `text` widget is a password entry widget. The password widget has a optional verifyer function testing for the length of the password.

    let dialog = {
        type: "form",
        title: "Text widget",
        message: "A form with a text entry widget and a password entry widget",
        properties: {
            text: {
                type: "text",
                label: "Text",
                message: "This is a text field",
                tooltip: "This is a tooltip text field",
                fill: true
            },
            password: {
                type: "text",
                label: "Password",
                message: "Enter a password",
                tooltip: "The password must be longer than 6",
                error: "The password must be longer than 6",
                verify: input => { return (input.length > 6) },
                echo: "*"
            }
        }
    }



The `text` widget support the following options.

| Option | Values | Description |
| :------ | :------ | :------------ |
|label|string|The label displayed in front of the widget|
|message|string|The message displayed in the widget if the widget is empty and the focus is on another widget|
|value|string|The initial value of the widget|
|tooltip|string|The text to diplay when the cursor hovers over the widget|
|fill|boolean|Instructs the widget to take up all available horizontal and vertical space|
|multi|boolean|Whether the widget support multi-line text entry|
|echo|character|The character to use as an echo character|
|verify|function|A function taking the current value of the widget and returns a boolean. If the function returns false, then the color of the text in the widget is turned red. If the widget is part of a wizard, the buttons are updated to reflect the verification.|




### browser ###
The `browser` widget is used to display arbitrary formatted text as well as support a level of interaction with the model, and the jArchi application built with this library.
   
The `browser` widget is optimised to work in tandem with the `tree` object, as demonstrated in the sample application `jArchi Dialogs Help.ajs`. Links in the browser can point to objects in the `tree`, so that when the link is clicked, the tree navigates to the corresponding tree element.

Links can be written like this in Markdown:

	[link to form element](#form)	

If the element named `form` is found in the `tree`, the element is selected. In turn, the `tree` has the possibility to update the `browser` based on the new selection.

The `browser` also support buttons in the HTML if used in conjunction with the `tree`.

	



The `doEvent` event handler is an option to the `browser`, and should be a function that takes an Archi element (the currently selected tree element), as well as any extra parameters supplied in the HTML, in this case the button id `'Run'`.

Links to [external](https://www.google.com) sites also work.

<mark>Currently, there is a bug, either in the script or in Eclipse, that prevents showing two `browser` widgets inside two dialogs at the same time, which is why there is no demo for this widget.</mark>

<mark>You may have to change the type of browser in `CreateEclipseForm.js`. It is currently set to use EDGE.</mark>

The `browser` widget support the following options.

| Option | Values | Description |
| :------ | :------ | :------------ |
|value|string|Either a valid URL or a string of HTML|
|fill|boolean|If `true` the `browser` grabs available space|
|multi|boolean|if `true` and `fill` is true, the `browser` grabs both available horizontal and vertical space, otherwise only horizontal space|
|doEvent|function|An function to handle button clicks in the browser|
### option ###
![option](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/option.png)

The `option` widget displays a group of radio buttons, with an optional pre-selected button.

    let dialog = {
        type: "form",
        title: "Option widget",
        message: "This is an option widget with three options, and Option 2 is pre-selected",
        properties: {
            options: {
                type: "option",
                values: ["Option 1", "Option 2", "Option 3"],
                tooltip: "Select an option",
                label: "Options",
                value: "Option 2"
            }
        }
    }



| Option | Values | Description |
| :------ | :------ | :------------ |
|direction|`horizontal`or `vertical`|The direction of the group of radio buttons. Default is `vertical`|
|values|string[]|The list of option values|
|value|string|The default selected option|
|label|string|The label displayed in front of the widget|
|tooltip|string|The text to diplay when the cursor hovers over the widget|

### combo ###
![combo](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/combo.png)

A combo box is a commonly used graphical user interface widget. It is a combination of a drop-down list or list box and a single-line editable textbox, allowing the user to either type a new value directly or select a value from the list. The term "combo box" is sometimes used to mean "drop-down list".

    let dialog = {
        type: "form",
        title: "Combo widget",
        message: "This is two combo widgets. The second combo can create new options to choose.",
        columns: 2,
        properties: {
            combo: {
                type: "combo",
                label: "Combo 1",
                value: "Value 1",
                values: ["Value 1", "Value two", "Value three"],
                tooltip: "Select a value from the list"
            },
            combo2: {
                type: "combo",
                label: "Combo 2",
                values: ["Value 1", "Value 2", "Value three"],
                tooltip: "Enter new value and press Enter",
                extend: true
            }
        }
    }



| Option | Values | Description |
| :------ | :------ | :------------ |
|values|string[]|The list of option values|
|value|string|The default selected option|
|extend|boolean|If `true` the user can enter a new value|
|label|string|The label displayed in front of the widget|
|tooltip|string|The text to diplay when the cursor hovers over the widget|
### list ###
![list](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/list.png)

A `list` widget allows the user to choose an option from a list.

    let dialog = {
        type: "form",
        title: "List widget",
        message: "This is a list widget",
        columns: 2,
        properties: {
            list: {
                type: "list",
                label: "List",
                value: "List item 3",
                values: ["List item 1", "List item 2", "List item 3", "List item 4"],
                tooltip: "Select a value from the list"
            }
        }
    }



| Option | Values | Description |
| :------ | :------ | :------------ |
|values|string[]|The list of string to show in list `widget`|
|value|string|The default selected option|
|multi|boolean|Enable selection of multiple `list` items. The default is `false`|
|label|string|The label displayed in front of the widget|
|tooltip|string|The text to diplay when the cursor hovers over the widget|
### checkbox ###
![checkbox](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/checkbox.png)

The `checkbox` is a simple binary selection widget. The widget value is either `true` or `false`, and can optionally enable or disable target widgets accordingly.

    let dialog = {
        type: "form",
        title: "Checkbox widget",
        message: "This is a checkbox widget",
        columns: 2,
        properties: {
            checkbox: {
                type: "checkbox",
                label: "Check box",
                message: "Enable text widget",
                enable: "text",
                value: true
            },
            text: {
                type: "text",
                label: "Text",
                message: "This is a text field",
                tooltip: "This is a tooltip text field",
                fill: true
            }
        }
    }



| Option | Values | Description |
| :------ | :------ | :------------ |
|value|boolean|The default value, i.e., either `true` or `false`|
|enable|string or string[]|The target widgets|
|label|string|The label displayed in front of the widget|
|tooltip|string|The text to diplay when the cursor hovers over the widget|
### radio ###
![radio](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/radio.png)

The `radio` widget is similar to the `option` widget, but the scope of widget collaboration is the entire `form`, or any other composite parent widget where the `radio` sibling widgets are placed.

    let dialog = {
        type: "form",
        title: "Radio widget",
        message: "This is two radio widgets interacting",
        properties: {
            radio1: {
                type: "radio",
                tooltip: "Radio 1",
                label: "Radio 1",
            },
            radio2: {
                type: "radio",
                tooltip: "Radio 2",
                label: "Radio 2",
            }
        }
    }



| Option | Values | Description |
| :------ | :------ | :------------ |
|value|boolean|`true` if the `radio` button is selected|
|label|string|The label displayed in front of the widget|
|tooltip|string|The text to diplay when the cursor hovers over the widget|
### button ###
![button](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/button.png)

A `button` widget can trigger a function when clicked.

    let dialog = {
        type: "form",
        title: "Button widget",
        message: "This is a button widget",
        properties: {
            button: {
                type: "button",
                label: "Button",
                message: "Click me!",
                tooltip: "Click to alert",
                selection: function (button, widget) {
                    window.alert(`You pressed "${button}" on widget "${widget}"`);
					return "Clicked";
                }
            }
        }
    }



| Option | Values | Description |
| :------ | :------ | :------------ |
|selection|function|A callback function taking the `button` id and the Eclipse widget object as arguments|
|value|boolean|The return value of the `selection` function|
|label|string|The label displayed in front of the widget|
|tooltip|string|The text to diplay when the cursor hovers over the widget|
### date ###
![date](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/date.png)

A simple `date` picker.

    let dialog = {
        type: "form",
        title: "Date widget",
        message: "This is a date widget",
        properties: {
            date: {
                type: "date",
                label: "Date",
                tooltip: "Select a date"
            }
        }
    }



| Option | Values | Description |
| :------ | :------ | :------------ |
|value|boolean|The selected date|
|label|string|The label displayed in front of the widget|
|tooltip|string|The text to diplay when the cursor hovers over the widget|
### color ###
![color](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/color.png)

A simple color picker.

    let dialog = {
        type: "form",
        title: "Color widget",
        message: "This is a color widget",
        properties: {
            color: {
                type: "color",
                value: { red: 255, green: 0, blue: 0 }, 
                label: "Color",
                tooltip: "Select a color"
            }
        }
    }



| Option | Values | Description |
| :------ | :------ | :------------ |
|value|boolean|The selected `color` as an object with `red`, `green` and `blue` members |
|label|string|The label displayed in front of the widget|
|tooltip|string|The text to diplay when the cursor hovers over the widget|
### scale ###
![scale](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/scale.png)

The `scale` widget is a slider for selecting a value in a range of numbers.

    let dialog = {
        type: "form",
        title: "Scale widget",
        message: "This is a scale widget",
        properties: {
            scale: {
                type: "scale",
                value: 10,
                min: 0,
                max: 100,
                label: "Scale",
                tooltip: "Select a value"
            }
        }
    }



| Option | Values | Description |
| :------ | :------ | :------------ |
|value|boolean|The current value in the `scale`|
|min|integer|The minimum value of the `scale`. Default is 0|
|max|integer|The maximum value of the `scale`. Default is 100|
|label|string|The label displayed in front of the widget|
|tooltip|string|The text to diplay when the cursor hovers over the widget|
### tree ###
![tree](https://github.com/ThomasRohde/jArchi-CreateDialog/blob/main/images/tree.png)

The `tree` widget can display any arbitrary jArchi collection of object in a tree structure, and is by far the most complex in the library. It is specifically designed to work in conjunction with the `browser` widget. 

If the selection target of the `tree` is a browser, the source property (and potential view) of the selected element will be formatted as Markdown.

The `tree` hierarchy is based on parent-child relationships, and not Archi relationships. That means it is good at displaying folders and visual composition, e.g., view references in views.

If the `filter` option is `true`, then a small text entry box will appear together with an optional `toolbar`. The `filter` text entry support interactive filtering and highlightning of matching element (names). The `toolbar` has "Expand all" and "Collapse all" functionality, as well as a quick open of a new set of objects.

The following example is a minimal property editor. For a functional script, the script to end a succesful completion of `open()` with a call to `persist()`.

    let dialog = {
        type: "tree",
        title: "Tree widget",
        message: "This is a tree widget",
        properties: {
            tree: {
                type: "tree",
                title: [],
                fill: true,
                filter: true,
                editable: true,
                toolbar: true,
                icons: true,
                objects: $("*"),
                tooltip: "Select tree item"
            }
        }
    }



| Option | Values | Description |
| :------ | :------ | :------------ |
|filter|boolean|Display a text widget to filter the items in the `tree`|
|toolbar|boolean|If the `tree` is filtered, also display a toolbar|
|objects|Archi collection|The objects to display in the `tree`|
|editable|boolean|If `true` the element properties of the `objects` is editable. The edited properties is not changed in the model, but returned as a `valueMap` object in the `dialogResult`|
|title|string, string[] or string[][]|The properties (incl. `name`) to display in the `tree`. If an array element is an array, the first element is the display name, and the second element is the real property name. If the argument is an array of length 0, then all properties will be shown|
|selection|object[]|Sets the mapping of fields between source Archi elements selected in the tree, and target widget values. The array items has the format `{ source: "<Archi property>", target: "<widget name>" }`. If the target widget is a `browser`, the source  property value is formatted as Markdown before being copied to the target. If the source element is a view, note, or sketch the view is included in the Markdown|
|fill|boolean|If `true` the `tree` will occupy all available horizontal and vertical space|
|icons|boolean|If `true`, the standard Archi icons will be displayed with the element name in the `tree`|
|value|string|The default selected option|
|label|string|The label displayed in front of the widget|
|tooltip|string|The text to diplay when the cursor hovers over the widget|
