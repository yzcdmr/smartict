ViewRouteFormPanel = Ext.extend(Ext.form.FormPanel, {
    //title: "",
    frame: true,
    border: false,
    collapsible: false,
    autoScroll: true,
    monitorValid: true,

    initComponent: function() {
        this.txtRouteName = new Ext.form.TextField({
            name		: 'routeName',
            anchor: '80%',
            fieldLabel	: 'Route Name'
        });

        this.items = [this.txtRouteName];

        this.btnAra = new Ext.Button({
            text: 'Ara',
            formBind: true
        });

        this.btnKaydet = new Ext.Button({
            text: 'Kaydet',
            formBind: false
        });

        this.buttons = [this.btnAra, this.btnKaydet];
        this.buttonAlign = "right";

        ViewRouteFormPanel.superclass.initComponent.call(this);
    }
});
Ext.reg('ViewRouteFormPanel', ViewRouteFormPanel);