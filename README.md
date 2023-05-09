# jArchi-CreateDialog
A utility JavaScript script for Archi that creates Eclipse dialogs from object layout descriptions

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
