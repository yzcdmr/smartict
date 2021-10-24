ViewRouteStationFormPanel = Ext.extend(Ext.form.FormPanel, {
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

        var stationCombo = Ext.extend(Ext.ux.form.SuperBoxSelect, {
            fieldLabel: 'Station',
            hiddenName: 'stationId',
            autoScroll	: true,
            triggerAction: 'all',
            minChars	: 2,
            mode		: 'local',
            pageSize 	: 20,
            anchor: '80%',
            listEmptyText : 'Kayıt bulunamadı',
            emptyText 	: 'Çoklu Seçim',
            queryDelay	: 0,
            initComponent: function () {

                var recSuperBox = new Ext.data.Record.create([
                    { name : 'id', type : 'int' },
                    { name : 'stationName', type : 'string' }
                ]);

                var storeSuperBox = new Ext.data.JsonStore({
                    url		: '../station/getStation.ajax',
                    fields	: recSuperBox,
                    autoLoad: true,
                    totalProperty: "totalCount",
                    root	: 'data'
                });

                this.minListWidth = 500;

                var config = {
                    mode		: typeof(this.mode) == 'undefined' ? 'local' : this.mode,
                    store		: storeSuperBox,
                    valueField	: 'id',
                    displayField: 'stationName'
                };
                Ext.apply(this, config);
                Ext.apply(this.initialConfig, config);
                stationCombo.superclass.initComponent.apply(this, arguments);
            },
            onRender: function () {
                stationCombo.superclass.onRender.apply(this, arguments);
            }
        });

        this.stationCombo = new stationCombo();

        this.items = [this.routeCombo,this.stationCombo];

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

        ViewRouteStationFormPanel.superclass.initComponent.call(this);
    }
});
Ext.reg('ViewRouteStationFormPanel', ViewRouteStationFormPanel);