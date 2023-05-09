/*
Author: Thomas Klok Rohde
Description: Catch situations where no model is selected, and prompt user to select a model (if more than 1 model is loaded)
History: 
    April 9, 2023	: Created
*/

window.promptSelection = function (title, choices) {
    let ElementListSelectionDialog = Java.extend(Java.type('org.eclipse.ui.dialogs.ElementListSelectionDialog'));
    let LabelProvider = Java.type('org.eclipse.jface.viewers.LabelProvider');
    let dialog = new ElementListSelectionDialog(shell, new LabelProvider(), {
        // Get rid of the pesky help button
        createHelpControl: function (parent) {
            let help = Java.super(dialog).createHelpControl(parent);
            help.setVisible(false);
            return help;
        }
    });
    dialog.setElements(choices);
    dialog.setTitle(title);
    dialog.open();
    result = dialog.getFirstResult();
    return result ? new String(result) : null;
}

try {
    // Do we have a current model? If not, then an exception is thrown!
    let name = model.toString();
}
catch (e) {
    let models = $.model.getLoadedModels();
    if (models.length == 0) {
        window.alert("Please load a model!");
        exit();
    };
     if (models.length == 1) {
        models[0].setAsCurrent();
    }
    else  {
        let selection = window.promptSelection("Choose model", models.map(e => e.name));
        if (selection) {
            selectedModel = models.find(e => e.name == selection);
            selectedModel.setAsCurrent();
        }
        else {
            window.alert("No model selected");
            exit();
        }
    }
}