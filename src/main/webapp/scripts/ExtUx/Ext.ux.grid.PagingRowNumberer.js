Ext.ns('Ext.ux.grid');

// custom RowNumberer for use with paging GridPanels
Ext.ux.grid.PagingRowNumberer = Ext.extend(Ext.grid.RowNumberer, {
    width:50,
    renderer: function(v, p, record, rowIndex, colIndex, store) {
        if (this.rowspan) {
            p.cellAttr = 'rowspan="' + this.rowspan + '"';
        }
        if(rowIndex != null){
        	var so = store.lastOptions;
            var sop = so ? so.params: null;
            return ((sop && sop.start) ? sop.start: 0) + rowIndex + 1;
        }
        
    }
});