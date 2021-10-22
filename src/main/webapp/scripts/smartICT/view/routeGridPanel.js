ViewRouteGridPanelUi = Ext.extend(Ext.grid.GridPanel, {
    title : 'Route List',
    // height : 250,
    frame : true,
    layout: 'fit',
    initComponent : function() {
        var rec = new Ext.data.Record.create([
            {
                name: 'id'
            },{
                name: 'routeName'
            }
        ]);

        var storeRoute = new Ext.data.JsonStore({
            autoDestroy : true,
            url : '../route/getRoute.ajax',
            root : 'data',
            totalProperty : 'totalCount',
            fields : rec,
            pruneModifiedRecords : true,
            autoLoad : true
        });
        this.store = storeRoute;


        this.cm = new Ext.grid.ColumnModel({
            defaults : {
                sortable : true
            },
            columns : [
                {
                    header : 'Route Name',
                    dataIndex : 'routeName',
                }

            ]
        });
        this.selModel = new Ext.grid.RowSelectionModel({
            singleSelect : true
        });
        this.view = new Ext.grid.GridView({
            forceFit : true
        });

        ViewRouteGridPanelUi.superclass.initComponent.call(this);
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

ViewRouteGridPanel = Ext.extend(ViewRouteGridPanelUi, {
    initComponent : function() {
        ViewRouteGridPanel.superclass.initComponent.call(this);
    }
});
Ext.reg('ViewRouteGridPanel', ViewRouteGridPanel);
