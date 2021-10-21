ViewLoginMainPanel = Ext.extend(Ext.Panel, {
    frame: false,
    border: false,
    collapsible: false,
    autoScroll: true,
    monitorValid: false,
    layout: 'fit',
    // addCls:'onlineSiparisTakipCss',
    title: 'Login Ekranı',
    iconCls    : 'kilit2',
    tools: [{
        id: 'refresh',
        handler: function () {
            document.location.reload(true);
        }
    }
    ],

    initComponent: function () {
        this.items = [];

        ViewLoginMainPanel.superclass.initComponent.call(this);
    }
});
Ext.reg('ViewLoginMainPanel', ViewLoginMainPanel);