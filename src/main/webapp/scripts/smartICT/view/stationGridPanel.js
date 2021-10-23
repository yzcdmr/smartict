ViewStationGridPanelUi = Ext.extend(Ext.grid.GridPanel, {
    title : 'Station List',
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
        this.btnSil = new Ext.Button({
            text : '<b>Sil</b>'
        });
        var rec = new Ext.data.Record.create([
            {
                name: 'id'
            },{
                name: 'stationName'
            }
        ]);

        var storeStation = new Ext.data.JsonStore({
            autoDestroy : true,
            url : '../station/getStation.ajax',
            root : 'data',
            totalProperty : 'totalCount',
            fields : rec,
            pruneModifiedRecords : true,
            autoLoad : true
        });
        this.store = storeStation;


        this.cm = new Ext.grid.ColumnModel({
            defaults : {
                sortable : true
            },
            columns : [
                {
                    header : 'Station Name',
                    dataIndex : 'stationName',
                }

            ]
        });
        this.tbar = ['->',this.btnSil];
        this.selModel = new Ext.grid.RowSelectionModel({
            singleSelect : true
        });
        this.view = new Ext.grid.GridView({
            forceFit : true
        });

        ViewStationGridPanelUi.superclass.initComponent.call(this);
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

ViewStationGridPanel = Ext.extend(ViewStationGridPanelUi, {
    initComponent : function() {
        ViewStationGridPanel.superclass.initComponent.call(this);
    }
});
Ext.reg('ViewStationGridPanel', ViewStationGridPanel);
