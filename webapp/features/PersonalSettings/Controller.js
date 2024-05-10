sap.ui.define([
    "sap/ui/base/ManagedObject"
], function(ManagedObject) {
    'use strict';
    
    return ManagedObject.extend("testplugin.features.PersonalSettings.Controller", {

        constructor: function(oComponent, oRenderer) {
            this._oComponent = oComponent;
            this._oRenderer = oRenderer;
        },

        addUserPreferencesEntryToShell() {
            const oEntry = {
                title: this._oComponent.getTextFromI18n("CustomSettingPluginTitle"),
                icon: "sap-icon://role",
                value: () => {
                    return jQuery.Deferred().resolve(this._oComponent.getTextFromI18n("CustomSettingPluginDescription"));
                },
                content: () => {
                    return jQuery.Deferred().resolve(new sap.m.Text("plugin-text", {text: this._oComponent.getTextFromI18n("CustomTextForPlugin")}));
                },
                onSave: () => {
                    return jQuery.Deferred().resolve();
                }
            };
            this._oRenderer.addUserPreferencesEntry(oEntry);
        }
    })
});