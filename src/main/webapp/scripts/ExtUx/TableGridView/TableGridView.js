Ext.ns('Ext.ux.grid');
Ext.ux.grid.TableGridView = Ext.extend(Ext.grid.GridView, {
    cellSelectorDepth: 3,
    rowSelectorDepth: 4,
    rowSelector: 'tr.x-grid3-row',
    initTemplates: function () {
        var ts = this.templates || {};
        if (!ts.body) {
            ts.body = new Ext.Template(
                '<table class="x-grid3-row-table ux-table-grid" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
                '<colgroup>{cols}</colgroup>',
                '<tbody>{rows}</tbody>',
                '</table>'
            );
        }
        if (!ts.col) {
            ts.col = new Ext.Template(
                '<col style="{style}" />'
            );
        }
        if (!ts.row) {
            ts.row = new Ext.Template(
                '<tr class="x-grid3-row {alt}" style="{tstyle}">{cells}</tr>'
            );
        }
        if (!ts.cell) {
            ts.cell = new Ext.Template('<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css} x-grid3-cell-inner x-grid3-col-{id}" style="{style}" tabIndex="0" {cellAttr} unselectable="on" {attr}>',
                '{value}',
                '</td>'
            );
        }
        this.templates = ts;
        Ext.ux.grid.TableGridView.superclass.initTemplates.call(this);
    },
    getRows: function () {
        return this.hasRows() ? this.mainBody.dom.firstChild.tBodies[0].rows : [];
    },
    getCols: function() {
        return this.hasRows() ? this.mainBody.dom.firstChild.firstChild.childNodes : [];
    },
    removeRows: function (firstRow, lastRow) {
        var rows = this.getRows();
        for (var rowIndex = firstRow; rowIndex <= lastRow; rowIndex++) {
            Ext.removeNode(rows[firstRow]);
        }
        this.syncFocusEl(firstRow);
    },
    updateAllColumnWidths: function () {
        var tw = this.getTotalWidth(),
            clen = this.cm.getColumnCount(),
            ws = [], cw = [],
            i,
            hd,
            cols = this.getCols();
        for (i = 0; i < clen; i++) {
            ws[i] = this.getColumnWidth(i);
            cw[i] = this.getCellWidth(i);
        }
        this.innerHd.firstChild.style.width = this.getOffsetWidth();
        this.innerHd.firstChild.firstChild.style.width = tw;
        this.mainBody.dom.style.width = tw;
        this.mainBody.dom.firstChild.style.width = tw;
        for (i = 0; i < clen; i++) {
            hd = this.getHeaderCell(i);
            hd.style.width = ws[i];
            cols[i].style.width = cw[i];
        }
        this.onAllColumnWidthsUpdated(ws, tw);
    },
    updateColumnWidth: function (col, width) {
        var w = this.getColumnWidth(col),
            cw = this.getCellWidth(col),
            tw = this.getTotalWidth(),
            hd = this.getHeaderCell(col),
            cols = this.getCols();
        this.innerHd.firstChild.style.width = this.getOffsetWidth();
        this.innerHd.firstChild.firstChild.style.width = tw;
        this.mainBody.dom.style.width = tw;
        this.mainBody.dom.firstChild.style.width = tw;
        hd.style.width = w;
        cols[col].style.width = cw;
        this.onColumnWidthUpdated(col, w, tw);
    },
    doRender: function (columns, records, store, startRow, colCount, stripe) {
        var templates = this.templates,
            cellTemplate = templates.cell,
            rowTemplate = templates.row,
            last = colCount - 1;
        var rowBuffer = [],
            colBuffer = [],
            rowParams = {
                tstyle: ''
            },
            meta = {},
            column, record;
        for (var j = 0, len = records.length; j < len; j++) {
            record = records[j];
            colBuffer = [];
            var rowIndex = j + startRow;
            for (var i = 0; i < colCount; i++) {
                column = columns[i];
                meta.id = column.id;
                meta.css = i === 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
                meta.attr = meta.cellAttr = '';
                meta.style = column.style;
                meta.value = column.renderer.call(column.scope, record.data[column.name], meta, record, rowIndex, i, store);
                if (Ext.isEmpty(meta.value)) {
                    meta.value = '&#160;';
                }
                if (this.markDirty && record.dirty && Ext.isDefined(record.modified[column.name])) {
                    meta.css += ' x-grid3-dirty-cell';
                }
                colBuffer[colBuffer.length] = cellTemplate.apply(meta);
            }
            var alt = [];
            if (stripe && ((rowIndex + 1) % 2 === 0)) {
                alt[0] = 'x-grid3-row-alt';
            }
            if (record.dirty) {
                alt[1] = ' x-grid3-dirty-row';
            }
            rowParams.cols = colCount;
            if (this.getRowClass) {
                alt[2] = this.getRowClass(record, rowIndex, rowParams, store);
            }
            rowParams.alt = alt.join(' ');
            rowParams.cells = colBuffer.join('');
            rowBuffer[rowBuffer.length] = rowTemplate.apply(rowParams);
        }
        return rowBuffer.join('');
    },
    processRows: function (startRow, skipStripe) {
        if (!this.ds || this.ds.getCount() < 1) {
            return;
        }
        var rows = this.getRows(),
            len = rows.length,
            i, r;
        if (len) {
            skipStripe = skipStripe || !this.grid.stripeRows;
            startRow = startRow || 0;
            for (i = 0; i < len; i++) {
                r = rows[i];
                if (r) {
                    if (!skipStripe) {
                        r.className = r.className.replace(this.rowClsRe, ' ');
                        if ((i + 1) % 2 === 0) {
                            r.className += ' x-grid3-row-alt';
                        }
                    }
                }
            }
            if (startRow === 0) {
                Ext.fly(rows[0]).addClass(this.firstRowCls);
            }
            Ext.fly(rows[rows.length - 1]).addClass(this.lastRowCls);
        }
    },
    afterRender: function () {
        if (!this.ds || !this.cm) {
            return;
        }
        this.mainBody.dom.innerHTML = this.renderBody();
        this.processRows(0, true);
        if (this.deferEmptyText !== true) {
            this.applyEmptyText();
        }
        this.grid.fireEvent('viewready', this.grid);
    },
    afterRenderUI: function () {
        var templates = this.templates,
            header = this.renderHeaders(),
            body = '&#160;';
        var html = templates.master.apply({
            body: body,
            header: header,
            ostyle: 'width:' + this.getOffsetWidth() + ';',
            bstyle: 'width:' + this.getTotalWidth() + ';'
        });
        var g = this.grid;
        g.getGridEl().dom.innerHTML = html;
        this.initElements();
        Ext.fly(this.innerHd).on('click', this.handleHdDown, this);
        this.mainHd.on({
            scope: this,
            mouseover: this.handleHdOver,
            mouseout: this.handleHdOut,
            mousemove: this.handleHdMove
        });
        this.scroller.on('scroll', this.syncScroll, this);
        if (g.enableColumnResize !== false) {
            this.splitZone = new Ext.grid.GridView.SplitDragZone(g, this.mainHd.dom);
        }
        if (g.enableColumnMove) {
            this.columnDrag = new Ext.grid.GridView.ColumnDragZone(g, this.innerHd);
            this.columnDrop = new Ext.grid.HeaderDropZone(g, this.mainHd.dom);
        }
        if (g.enableHdMenu !== false) {
            this.hmenu = new Ext.menu.Menu({
                id: g.id + '-hctx'
            });
            this.hmenu.add({
                itemId: 'asc',
                text: this.sortAscText,
                cls: 'xg-hmenu-sort-asc'
            }, {
                itemId: 'desc',
                text: this.sortDescText,
                cls: 'xg-hmenu-sort-desc'
            });
            if (g.enableColumnHide !== false) {
                this.colMenu = new Ext.menu.Menu({
                    id: g.id + '-hcols-menu'
                });
                this.colMenu.on({
                    scope: this,
                    beforeshow: this.beforeColMenuShow,
                    itemclick: this.handleHdMenuClick
                });
                this.hmenu.add('-', {
                    itemId: 'columns',
                    hideOnClick: false,
                    text: this.columnsText,
                    menu: this.colMenu,
                    iconCls: 'x-cols-icon'
                });
            }
            this.hmenu.on('itemclick', this.handleHdMenuClick, this);
        }
        if (g.trackMouseOver) {
            this.mainBody.on({
                scope: this,
                mouseover: this.onRowOver,
                mouseout: this.onRowOut
            });
        }
        if (g.enableDragDrop || g.enableDrag) {
            this.dragZone = new Ext.grid.GridDragZone(g, {
                ddGroup: g.ddGroup || 'GridDD'
            });
        }
        this.updateHeaderSortState();
    },
    insertRows: function (dm, firstRow, lastRow, isUpdate) {
        var last = dm.getCount() - 1;
        if (!isUpdate && firstRow === 0 && lastRow >= last) {
            this.fireEvent('beforerowsinserted', this, firstRow, lastRow);
            this.refresh();
            this.fireEvent('rowsinserted', this, firstRow, lastRow);
        } else {
            if (!isUpdate) {
                this.fireEvent('beforerowsinserted', this, firstRow, lastRow);
            }
            var html = this.renderRows(firstRow, lastRow),
                before = this.getRow(firstRow);
            if (before) {
                if (firstRow === 0) {
                    Ext.fly(this.getRow(0)).removeClass(this.firstRowCls);
                }
                Ext.DomHelper.insertHtml('beforeBegin', before, html);
            } else {
                var r = this.getRow(last - 1);
                if (r) {
                    Ext.fly(r).removeClass(this.lastRowCls);
                }
                Ext.DomHelper.insertHtml('beforeEnd', this.mainBody.dom.firstChild.tBodies[0], html);
            }
            if (!isUpdate) {
                this.fireEvent('rowsinserted', this, firstRow, lastRow);
                this.processRows(firstRow);
            } else if (firstRow === 0 || firstRow >= last) {
                Ext.fly(this.getRow(firstRow)).addClass(firstRow === 0 ? this.firstRowCls : this.lastRowCls);
            }
        }
        this.syncFocusEl(firstRow);
    },
    getColStyle: function (col) {
        return 'width:' + this.getCellWidth(col) + ';';
    },
    cellPadding: 10,
    getCellWidth: function(col) {
        var w = this.cm.getColumnWidth(col);
        if (Ext.isNumber(w)) {
            if (Ext.isStrict && (Ext.isIE6 || Ext.isIE7)) {
                w -= this.cellPadding;
            }
            return (w > 0 ? w : 0) + 'px';
        }
        return w;
    },
    getColumnStyle: function (col, isHeader) {
        var style = !isHeader ? (this.cm.config[col].css || '') :
                'width:' + this.getColumnWidth(col) + ';',
            align = this.cm.config[col].align;
        if (this.cm.isHidden(col)) {
            style += 'display:none;';
        }
        if (align) {
            style += 'text-align:' + align + ';';
        }
        return style;
    },
    renderBody: function () {
        var cols = [],
            i, len = this.cm.getColumnCount(),
            col = this.templates.col,
            rows = this.renderRows();
        if (!rows) {
            return '&#160;';
        }
        for(i = 0; i < len; i++) {
            cols.push(col.apply({
                style: this.getColStyle(i)
            }));
        }
        return this.templates.body.apply({
            tstyle: 'width:' + this.getTotalWidth() + ';',
            cols: cols.join(''),
            rows: rows
        });
    }
});