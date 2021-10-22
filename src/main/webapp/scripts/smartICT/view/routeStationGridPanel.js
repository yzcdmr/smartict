ViewRouteStationGridPanelUi = Ext.extend(Ext.grid.GridPanel, {
    title : 'Route Station List',
    // height : 250,
    frame : true,
    layout: 'fit',
    loadMask : {
        msg : language.UY011
    },
    viewConfig : {
        forceFit : true
    },
    stripeRows : true,
    initComponent : function() {
        var rec = new Ext.data.Record.create([
            {
                name: 'id'
            },{
                name: 'routeName'
            },{
                name: 'stationName'
            }
        ]);

        var storeRouteStation = new Ext.data.JsonStore({
            autoDestroy : true,
            url : '../routeStation/getRouteStation.ajax',
            root : 'data',
            totalProperty : 'totalCount',
            fields : rec,
            pruneModifiedRecords : true,
            autoLoad : true
        });
        this.store = storeRouteStation;


        this.cm = new Ext.grid.ColumnModel({
            defaults : {
                sortable : true
            },
            columns : [
                {
                    header : 'Route Name',
                    dataIndex : 'routeName',
                },{
                    header : 'Station Name',
                    dataIndex : 'stationName',
                }

            ]
        });
        this.selModel = new Ext.grid.RowSelectionModel({
            singleSelect : true
        });
        this.view = new Ext.grid.GridView({
            forceFit : true
        });

        ViewRouteStationGridPanelUi.superclass.initComponent.call(this);
    },
    getSelected : function() {
        return this.selModel.getSelected();
    },
    getSelectedData : function() {
        return this.getSelected().data;
    },
    removeRecord : function(rec) {
        this.store.remove(rec);
    },
    loadStore : function() {
        this.store.load.defer(500, this.store);
    },
    insertNewRecord : function() {
        this.store.insert(0, new this.store.recordType());
    },
    stopEditing : function() {
        if (this.editor) {
            this.editor.stopEditing();
        }
    },
    startEditing : function(index) {
        if (this.editor) {
            this.editor.startEditing(index);
        }
    },
    hasSelected : function() {
        if (this.selModel.getSelected() == null) {
            return false;
        } else {
            return true;
        }
    }
});

ViewRouteStationGridPanel = Ext.extend(ViewRouteStationGridPanelUi, {
    initComponent : function() {
        ViewRouteStationGridPanel.superclass.initComponent.call(this);
    }
});
Ext.reg('ViewRouteStationGridPanel', ViewRouteStationGridPanel);
