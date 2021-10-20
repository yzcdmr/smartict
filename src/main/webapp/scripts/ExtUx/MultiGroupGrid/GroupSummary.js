/*
 * Ext JS Library 3.4
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/*
* Ext.ux.GroupSummary
*
* config
* ------
* showHeader : bool show summary header (Default: false)
* showToggle : bool show summary toggle buttons (Default: false)
* disableSummaryColors : bool true to disable coloring of summary areas (Default: false)
* headerTpl : String custom header template
* footerTpl : String custom footer template
* i18nText : Object name/value pair of strings to use as label text (see i18nText object below)
*
* events
* ------
* beforeapply : function (summary, data, g)
* render : function (summary, data, g)
*/
Ext.ux.GroupSummary = Ext.extend(Ext.util.Observable, {

	// I18N text
	i18nText: {
		summary: 'Summary',
		toggleSummary: 'Toggle Summary'
	},

	// header and footer templates
	headerTpl: '<tpl if="!!header">' +
		'<span class="headerText">{values.header.text}:</span> {values.header.value}' +
        '</tpl>',
	footerTpl: '{footer}',

	showHeader: false,
	showToggle: false,

	// show each grouping level in different color ?
	disableSummaryColors: false,

	visibility: true,

	// show a hovering tooltip over summary row (TR 'title' attribute)
	show_group_title: true,


	
	constructor: function (config) {
		this.addEvents('beforeapply', 'render');

		Ext.apply(this, config);

		Ext.ux.GroupSummary.superclass.constructor.call(this);
	},


	init: function (grid) {
		this.grid = grid;
		this.cm = grid.getColumnModel();
		this.view = grid.getView();
		this.view.summary = this;

		var v = this.view;
		v.doMultiGroupEnd = this.doMultiGroupEnd.createDelegate(this);

		v.afterMethod('onColumnWidthUpdated', this.doWidth, this);
		v.afterMethod('onAllColumnWidthsUpdated', this.doAllWidths, this);
		v.afterMethod('onColumnHiddenUpdated', this.doHidden, this);
		if (this.view.markDirty) v.afterMethod('onUpdate', this.doUpdate, this);
		if (this.view.markDirty) v.afterMethod('onRemove', this.doRemove, this);

		if (!this.rowTpl) {
			this.rowTpl = new Ext.XTemplate(
                '<div class="x-grid3-summary-row {tclass}" style="{tstyle}">',
					'<div class="x-grid3-summary-header" style="{hstyle}">', this.headerTpl, '</div>',
					'<table class="x-grid3-summary-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
						'<tbody><tr {title} style="{trstyle}">{cells}</tr></tbody>',
					'</table>',
					'<div class="x-grid3-summary-footer" style="{fstyle}">', this.footerTpl, '</div>',
				'</div>'
            );
			this.rowTpl.disableFormats = true;
		}
		this.rowTpl.compile();

		if (!this.cellTpl) {
			this.cellTpl = new Ext.XTemplate(
                '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}">',
                '<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on">{value}</div>',
                "</td>"
            );
			this.cellTpl.disableFormats = true;
		}
		this.cellTpl.compile();
	},


	toggleSummaries: function (visible) {

		var gs = Ext.DomQuery.select("div.x-grid3-summary-row", this.view.mainBody.dom);
		for (var i = 0; i < gs.length; i++) {
			//var el = this.grid.getGridEl();
			var el = gs[i];
			el = Ext.fly(el);
			if (el) {

				if (visible === undefined) {
					visible = el.hasClass('x-grid-hide-summary');
				}
				el[visible ? 'removeClass' : 'addClass']('x-grid-hide-summary');
			}
		}

		this.visibility = visible;
	},

	toggleSummary: function (groupId, visible) {
		var g = Ext.get(groupId);
		var el = Ext.fly(g.dom.childNodes[2]);
		if (el) {
			if (visible === undefined) {
				visible = el.hasClass('x-grid-hide-summary');
			}
			el[visible ? 'removeClass' : 'addClass']('x-grid-hide-summary');
		}
	},

	createToggleButton: function (value, id, groupId) {
		new Ext.Button({
			//id: id,
			tooltip: value,
			enableToggle: true,
			pressed: true,
			iconCls: 'ss_sprite ss_application_bottom_expand',
			scope: this,
			handler: function (button, e) {
				this.toggleSummary(groupId, button.pressed);
			}
		}).render(id);
	},


	renderSummary: function (o, cs, g) {
		cs = cs || this.view.getColumnData();
		var cfg = this.cm.config;

		var buf = [], c, p = {}, cf, last = cs.length - 1;
		var grpId = g.groupId.split(':')[0].split('gp-')[1];

		var group_summary_desc = g.text + " " + this.i18nText.summary + ": " + g.group;
		var title_text = this.show_group_title ? "title='" + group_summary_desc + "'" : "";

		g.summaries = {};
		for (var i = 0, len = cs.length; i < len; i++) {
			c = cs[i];
			cf = cfg[i];
			p.id = c.id;
			p.style = c.style;
			p.css = i == 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
			if (cf.summaryType || cf.summaryRenderer) {
				p.value = (cf.summaryRenderer || c.renderer)(o.data[c.name], p, o, g);
			} else {
				p.value = '';
			}
			g.summaries[c.name] = Ext.value(p.value, "");
			if (p.value == undefined || p.value === "") p.value = "&#160;";
			buf[buf.length] = this.cellTpl.apply(p);
		}

		g.buyId = Ext.id();
		g.filterId = Ext.id();
		var indentSize = this.view.indentSize;
		var gsw = (parseInt(this.view.getTotalWidth()) - (indentSize * g.group_level)) + 'px'; // subtract indent padding
		var tplData = {
			tclass: (!this.disableSummaryColors ? 'x-grid3-summary-row-' + g.group_level : '') + ' ' + (this.visibility ? '' : 'x-grid-hide-summary'),
			tstyle: 'width:' + gsw + ';',
			trstyle: '',
			cells: buf.join(''),
			title: title_text,
			hstyle: '',
			header: {
				text: g.text + " " + this.i18nText.summary,
				value: g.group
			},
			fstyle: '',
			footer: ''
		};

		if (!this.showHeader) {
			tplData.header = null;
		}

		// fire apply data event
		this.fireEvent('beforeapply', this, tplData, g);

		return row = this.rowTpl.apply(tplData);
	},

	calculate: function (rs, cs) {
		var data = {}, r, c, cfg = this.cm.config, cf;
		var grp, grpId;
		for (var j = 0, jlen = rs.length; j < jlen; j++) {
			r = rs[j];
			if (r._groupId) {
				grp = r._groupId.split(':')[0];
				grpId = grp.split('gp-')[1];
			} else {
				grpId = '';
			}
			for (var i = 0, len = cs.length; i < len; i++) {
				c = cs[i];
				cf = cfg[i];
				if (cf.summaryType) {
					data[c.name] = Ext.ux.GroupSummary.Calculations[cf.summaryType](data[c.name] || 0, r, c.name, data);
				}
			}
		}
		return data;
	},

	doMultiGroupEnd: function (buf, g, cs, ds, colCount) {
		//console.debug('doMultiGroupEnd', g.groupId);
		var data = this.calculate(g.rs, cs, g);
		buf.push('</div>', this.renderSummary({ data: data }, cs, g), '</div>');


		// inject group header's collapse/expand summary button
		if ( this.showToggle )
			this.createToggleButton.defer(1, this, [this.i18nText.toggleSummary, g.groupId + '-hd-sumtoggle', g.groupId]);

		// fire render event
		this.fireEvent('render', this, data, g);
	},

	doWidth: function (col, w, tw) {
		//console.debug('doWidth');
		var gs = this.view.getGroups(), s;
		for (var i = 0, len = gs.length; i < len; i++) {
			s = gs[i].childNodes[2];
			s.style.width = tw;
			s.firstChild.style.width = tw;
			s.firstChild.rows[0].childNodes[col].style.width = w;
		}
	},

	doAllWidths: function (ws, tw) {
		//console.debug('doAllWidths');
		var indentSize = this.view.indentSize;
		var gs = this.view.getGroups(), cells, wlen = ws.length;
		for (var i = 0, len = gs.length; i < len; i++) {
			var g = gs[i];
			var gd = this.view.getGroupById(g.id);
			var gsw = (parseInt(tw) - (indentSize * gd.group_level)) + 'px'; // subtract indent padding

			g.style.width = tw; // the group wrapper div 

			// child 0 = group header div
			// child 1 = group body div
			// child 2 = group summary div
			//		child 0 = description div
			//		child 1 = summary row columns

			// group header
			//delete g.childNodes[0].style.width;

			// group body, and nested table rows
			//g.childNodes[1].style.width = tw;

			// summary div
			var summaryDiv = g.childNodes[2];
			summaryDiv.style.width = gsw;
			// summary's total table
			summaryDiv.childNodes[1].style.width = gsw; // summary table
			cells = summaryDiv.childNodes[1].rows[0].childNodes; // summary table rows
			for (var j = 0; j < wlen; j++) {
				if (j == 0)
					cells[j].style.width = (parseInt(ws[j]) - (indentSize * gd.group_level)) + 'px';
				else
					cells[j].style.width = ws[j];
			}
		}
	},

	doHidden: function (col, hidden, tw) {
		//console.debug('doHidden');
		var gs = this.view.getGroups(), s, display = hidden ? 'none' : '';
		for (var i = 0, len = gs.length; i < len; i++) {
			s = gs[i].childNodes[2];
			s.style.width = tw;
			s.childNodes[1].style.width = tw;
			s.childNodes[1].rows[0].childNodes[col].style.display = display;
		}
	},

	// Note: requires that all (or the first) record in the 
	// group share the same group value. Returns false if the group
	// could not be found.
	refreshSummary: function (groupValue) {
		console.debug('refreshSummary ', groupValue);
		return this.refreshSummaryById(this.view.getGroupId(groupValue));
	},

	getSummaryNode: function (gid) {
		var g = Ext.fly(gid, '_gsummary');
		if (g) {
			return g.down('.x-grid3-summary-row', true);
		}
		return null;
	},

	refreshSummaryById: function (gid) {
		//console.debug('refreshSummaryById', gid);
		var gElement = document.getElementById(gid);
		if (!gElement) {
			return false;
		}
		var g = this.view.getGroupById(gid);
		var rs = g.rs;
		var cs = this.view.getColumnData();
		var data = this.calculate(rs, cs);
		var markup = this.renderSummary({ data: data }, cs, g);

		var existing = this.getSummaryNode(gid);
		if (existing) {
			gElement.removeChild(existing);
		}

		Ext.DomHelper.append(gElement, markup);

		// TODO if summary refreshes need to rebind buttons

		return true;
	},

	doUpdate: function (ds, record) {
		//console.debug('doUpdate');
		// refresh summary for the groups to which the record belongs
		var member_of_groups = this.view.record_memberships[record.id];
		for (var i = 0; member_of_groups && i < member_of_groups.length; i++) {
			var group = member_of_groups[i];
			this.refreshSummaryById(group.groupId);
		}
	},

	doRemove: function (ds, record, index, isUpdate) {
		if (!isUpdate) {
			this.refreshSummaryById(record._groupId);
		}
	},

	showSummaryMsg: function (groupValue, msg) {
		var gid = this.view.getGroupId(groupValue);
		var node = this.getSummaryNode(gid);
		if (node) {
			node.innerHTML = '<div class="x-grid3-summary-msg">' + msg + '</div>';
		}
	}
});
Ext.grid.GroupSummary = Ext.ux.GroupSummary;

Ext.ux.GroupSummary.Calculations = {
    'sum' : function(v, record, field){
        var new_sum = v + (parseFloat(record.data[field]) || 0);
        return new_sum;
    },
	'sum2dec' : function(v, record, field){
        return Math.round((v + (record.data[field]||0))*100)/100;
    },
    'count' : function(v, record, field, data){
        return data[field+'count'] ? ++data[field+'count'] : (data[field+'count'] = 1);
    },

    'max' : function(v, record, field, data){
        var rec_val = record.data[field];
        var max = data[field+'max'] === undefined ?
            (data[field+'max'] = rec_val) : data[field+'max'];
        return rec_val > max ? (data[field+'max'] = v) : max;
    },

    'min' : function(v, record, field, data){
        var rec_val = record.data[field];
        var min = data[field+'min'] === undefined ?
            (data[field+'min'] = rec_val) : data[field+'min'];
        return rec_val < min ? (data[field+'min'] = rec_val) : min;
    },

    'average' : function(v, record, field, data){
        var c = data[field+'count'] ? ++data[field+'count'] : (data[field+'count'] = 1);
        var t = (data[field+'total'] = ((data[field+'total']||0) + (record.data[field]||0)));
        return t === 0 ? 0 : parseFloat(t) / parseFloat(c);
    }
};
Ext.grid.GroupSummary.Calculations = Ext.ux.GroupSummary.Calculations;

Ext.ux.HybridSummary = Ext.extend(Ext.ux.GroupSummary, {
    calculate : function(rs, cs){
        var gcol = this.view.getGroupField();
        var gvalue = rs[0].data[gcol];
        var gdata = this.getSummaryData(gvalue);
        return gdata || Ext.ux.HybridSummary.superclass.calculate.call(this, rs, cs);
    },

    updateSummaryData : function(groupValue, data, skipRefresh){
        var json = this.grid.store.reader.jsonData;
        if(!json.summaryData){
            json.summaryData = {};
        }
        json.summaryData[groupValue] = data;
        if(!skipRefresh){
            this.refreshSummary(groupValue);
        }
    },

    getSummaryData : function(groupValue){
        var json = this.grid.store.reader.jsonData;
        if(json && json.summaryData){
            return json.summaryData[groupValue];
        }
        return null;
    }
});
Ext.grid.HybridSummary = Ext.ux.HybridSummary;