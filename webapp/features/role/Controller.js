sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/m/MessageToast"
], function(ManagedObject, MessageToast) {
    'use strict';
    

    return ManagedObject.extend("testplugin.features.role.Controller", {

        constructor: function(oComponent, oRenderer) {
            this._oComponent = oComponent;
            this._oRenderer = oRenderer;
        },

        addHeaderEndItemToShell() {
           
            const oHeaderItem = {
                id: "myHeaderButton",
                icon: "sap-icon://role",
                tooltip: this._oComponent.getTextFromI18n("RoleBtnTooltip"),
                press: () => {
                    MessageToast.show(this._oComponent.getTextFromI18n("CustomTextForPlugin"));
                }
            };
            this._oRenderer.addHeaderEndItem(oHeaderItem, false, false);
        },

        showHeaderEndItemToShell() {
            const oShellHash = sap.ushell.Container.getService("URLParsing").parseShellHash(window.location.hash);
            const oFeProductsApp = {
                semanticObject: "feProducts",
                action: "managing"
            }
            const bIsRoleBtnVisible = oShellHash.semanticObject === oFeProductsApp.semanticObject && oShellHash.action === oFeProductsApp.action;
            
            if(bIsRoleBtnVisible) {
                this._oRenderer.showHeaderEndItem(
                    ["myHeaderButton"],
                    bIsRoleBtnVisible,
                    ["app"]
                )
            } else {
                this._oRenderer.hideHeaderEndItem("myHeaderButton");
            }
        }
    })
});