ViewStationFormPanel = Ext.extend(Ext.form.FormPanel, {
    //title: "",
    frame: true,
    border: false,
    collapsible: false,
    autoScroll: true,
    monitorValid: true,

    initComponent: function() {
        this.txtStationName = new Ext.form.TextField({
            name		: 'stationName',
            anchor: '80%',
            fieldLabel	: 'Station Name'
        });

        this.items = [this.txtStationName];

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

        ViewStationFormPanel.superclass.initComponent.call(this);
    }
});
Ext.reg('ViewStationFormPanel', ViewStationFormPanel);