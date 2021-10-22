ViewSmartIctMainPanel = Ext.extend(Ext.Panel, {
    frame: false,
    border: false,
    collapsible: false,
    autoScroll: false,
    monitorValid: false,
    layout: 'fit',

    initComponent: function () {
        this.items = [];

        ViewSmartIctMainPanel.superclass.initComponent.call(this);
    }
});
Ext.reg('ViewSmartIctMainPanel', ViewSmartIctMainPanel);