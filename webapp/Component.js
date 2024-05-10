sap.ui.define([
        "sap/ui/core/UIComponent",
        "testplugin/features/role/Controller",
        "testplugin/features/PersonalSettings/Controller"
    ],
    function (UIComponent, RoleController, PersonalSettingsController) {
        "use strict";

        return UIComponent.extend("testplugin.Component", {
            metadata: {
                manifest: "json"
            },

            
            init: async function () {
                UIComponent.prototype.init.apply(this, arguments);
               
                this._getRendererAsync().then(async (oRenderer) => {
                    const oAppLifeCycle = await sap.ushell.Container.getServiceAsync('AppLifeCycle');
                    
                    this._oPersonalSettingsController = new PersonalSettingsController(this, oRenderer);
                    this._oPersonalSettingsController.addUserPreferencesEntryToShell();
                    this._oRoleController = new RoleController(this, oRenderer);
                    this._oRoleController.addHeaderEndItemToShell();

                    oAppLifeCycle.attachAppLoaded(this.onAppLoaded.bind(this))
                }) 
            },

            onAppLoaded() {
                this._oRoleController.showHeaderEndItemToShell();
            },

            _getRendererAsync() {
                return new Promise((fnResolve, fnReject) => {
                    const vShell = sap.ushell.Container;
        
                    if (!vShell) {
                        fnReject(
                            this.getTextFromI18n("UndefinedUshellErrorMessage")
                        )
                    }
        
                    const vRenderer = vShell.getRenderer();
        
                    if (vRenderer) {
                        return fnResolve(vRenderer)
                    }
        
                    vShell.attachRendererCreatedEvent((oEvent) => {
                        const vCreatedRenderer = oEvent.getParameter('renderer');
            
                        if (vCreatedRenderer) {
                            fnResolve(vCreatedRenderer);
                        }
            
                        fnReject(
                            this.getTextFromI18n("UndefinedRendererErrorMessage")
                        )
                    })
                })
            },

            getTextFromI18n(sText) {
                return this.getModel("i18n").getResourceBundle().getText(sText);
            }
        });
    }
);
