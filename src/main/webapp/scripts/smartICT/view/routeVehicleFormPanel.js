ViewRouteVehicleFormPanel = Ext.extend(Ext.form.FormPanel, {
    //title: "",
    frame: true,
    border: false,
    collapsible: false,
    autoScroll: true,
    monitorValid: true,

    initComponent: function() {
        var routeCombo = Ext.extend(Ext.form.ComboBox, {
            hiddenName: 'routeId',
            selectOnFocus: true,
            emptyText: 'Seçiniz',
            fieldLabel: 'Route',
            editable: true,
            forceSelection: true,
            autoScroll: true,
            triggerAction: 'all',
            mode: 'local',
            anchor: '80%',
            typeAhead: true,
            enableKeyEvents: true,
            minChars: 2,
            // mode: 'remote',
            initComponent: function () {
                var config = {
                    mode: typeof(this.mode) == 'undefined' ? 'local' : this.mode,
                    valueField: "id",
                    displayField: "routeName",

                    store: typeof(this.store) == 'undefined' ? new Ext.data.JsonStore({
                        proxy: new Ext.data.HttpProxy({
                            url: '../route/getRoute.ajax'
                        }),
                        restful: true,
                        autoLoad: true,
                        fields: ['id', 'routeName'],
                        totalProperty: "totalCount",
                        baseParams: {},
                        root: 'data'
                    }) : this.store
                };
                Ext.apply(this, config);
                Ext.apply(this.initialConfig, config);
                routeCombo.superclass.initComponent.apply(this, arguments);
            },
            onRender: function () {
                routeCombo.superclass.onRender.apply(this, arguments);
            }
        });

        this.routeCombo = new routeCombo();

        var vehicleCombo = Ext.extend(Ext.form.ComboBox, {
            hiddenName: 'vehicleId',
            selectOnFocus: true,
            emptyText: 'Seçiniz',
            fieldLabel: 'Vehicle',
            editable: true,
            forceSelection: true,
            autoScroll: true,
            triggerAction: 'all',
            mode: 'local',
            anchor: '80%',
            typeAhead: true,
            enableKeyEvents: true,
            minChars: 2,
            // mode: 'remote',
            initComponent: function () {
                var config = {
                    mode: typeof(this.mode) == 'undefined' ? 'local' : this.mode,
                    valueField: "id",
                    displayField: "vehicleName",

                    store: typeof(this.store) == 'undefined' ? new Ext.data.JsonStore({
                        proxy: new Ext.data.HttpProxy({
                            url: '../vehicle/getVehicle.ajax'
                        }),
                        restful: true,
                        autoLoad: true,
                        fields: ['id', 'vehicleName'],
                        totalProperty: "totalCount",
                        baseParams: {},
                        root: 'data'
                    }) : this.store
                };
                Ext.apply(this, config);
                Ext.apply(this.initialConfig, config);
                vehicleCombo.superclass.initComponent.apply(this, arguments);
            },
            onRender: function () {
                vehicleCombo.superclass.onRender.apply(this, arguments);
            }
        });

        this.vehicleCombo = new vehicleCombo();

        this.items = [this.routeCombo,this.vehicleCombo];

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

        ViewRouteVehicleFormPanel.superclass.initComponent.call(this);
    }
});
Ext.reg('ViewRouteVehicleFormPanel', ViewRouteVehicleFormPanel);