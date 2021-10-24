ViewVehicleFormPanel = Ext.extend(Ext.form.FormPanel, {
    //title: "",
    frame: true,
    border: false,
    collapsible: false,
    autoScroll: true,
    monitorValid: true,

    initComponent: function() {
        this.txtVehicleName = new Ext.form.TextField({
            name		: 'vehicleName',
            anchor: '80%',
            fieldLabel	: 'Vehicle Name'
        });

        this.txtPlate = new Ext.form.TextField({
            name		: 'plate',
            anchor: '80%',
            fieldLabel	: 'Plate',
            allowBlank : false
        });

        this.items = [this.txtVehicleName,this.txtPlate];

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

        ViewVehicleFormPanel.superclass.initComponent.call(this);
    }
});
Ext.reg('ViewVehicleFormPanel', ViewVehicleFormPanel);