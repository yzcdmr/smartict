/**********************************************************************************************
* JAFFA - Java Application Framework For All - Copyright (C) 2008 JAFFA Development Group
*
* This library is free software; you can redistribute it and/or modify it under the terms
* of the GNU Lesser General Public License (version 2.1 any later).
*
* See http://jaffa.sourceforge.net/site/legal.html for more details.
*********************************************************************************************/

Ext.namespace("Ext.ux.grid");

/** Based on Original Work found at http://extjs.com/forum/showthread.php?p=203828#post203828
*
* @author chander, PaulE
* @contributor aarobone Upgraded for ExtJS 3.4 support
*
* config
* ------
* i18nText : Object name/value pair of strings to use as labels 
* indentSize : int number of pixels to indent each grouping (Default: 5)
*
*
*/

Ext.ux.grid.MultiGroupingView = Ext.extend(Ext.grid.GroupingView, {


	i18nText: {
		title: 'Quick Groupings',
		help: '<b>Group By</b><br>Check column names to enable/disable grouping for a column. ({0} max)<br><br><b>Ordering</b><br>Reorder groupings by dragging column names up/down.',
		groupings: 'Groupings',
		clear: 'Clear Groupings',
		reset: 'Default Groupings',
		ok: 'Ok',
		cancel: 'Cancel'
	},


	groupTextTpl: '{text} : {group}',

	constructor: function (config) {
		if (config.i18nText) {
			this.i18nText = Ext.apply(this.i18nText, config.i18nText);
		} else if ( window.JSResources ) { // AMA My custom global i18n lookup object
			this.i18nText.title = JSResources.Javascript.QuickGroupings;
			this.i18nText.help = JSResources.Javascript.Help;
			this.i18nText.ok = JSResources.Javascript.Ok;
			this.i18nText.cancel = JSResources.Javascript.Cancel;
			this.i18nText.groupings = JSResources.Javascript.Groupings;
			this.i18nText.clear = JSResources.Javascript.ClearGroupings;
			this.i18nText.reset = JSResources.Javascript.DefaultGroupings;
		}

		Ext.ux.grid.MultiGroupingView.superclass.constructor.apply(this, arguments);
		// Added so we can clear cached rows each time the view is refreshed
		this.on("beforerefresh", function () {
			//if (window.console) console.debug("MultiGroupingView.beforerefresh: Cleared Row Cache");
			if (this.rowsCache) delete this.rowsCache;
		}, this);

	}

	, groups: [] // list of groups for the current view

	, indentSize: 5 //12

	, displayEmptyFields: false


	// private variables

	// toolbar buttons where already created or not (false to have buttons created, true to disable them)
	, groupingBarAdded: false

	// this collection keeps a fast reference for group memberships for each record
	// it is not kept in the record since it would be destroyed during edit
	// it is used to do a fast update of summaries
	// @see GroupSummary.js
	, record_memberships: []


	, renderRows: function () {

		//alert('renderRows');
		var groupField = this.getGroupField();
		var eg = !!groupField;

		// if they turned off grouping and the last grouped field is hidden
		if (this.hideGroupedColumn) {
			var colIndexes = [];

			// get array of group by columns
			if (eg)
				for (var i = 0, len = groupField.length; i < len; ++i) {
					var cidx = this.cm.findColumnIndex(groupField[i]);
					if (cidx >= 0)
						colIndexes.push(cidx);
					else
						if (window.console) console.debug("Ignore unknown column : ", groupField[i]);
				}

			// if no group fields and there exists a last group field = unhide column
			if (!eg && this.lastGroupField !== undefined) {
				this.mainBody.update('');
				for (var i = 0, len = this.lastGroupField.length; i < len; ++i) {
					var cidx = this.cm.findColumnIndex(this.lastGroupField[i]);
					if (cidx >= 0)
						this.cm.setHidden(cidx, false);
					else
						if (window.console) console.debug("Error unhiding column " + cidx);
				}
				delete this.lastGroupField;
				delete this.lgflen;
			}
			// if has group fields AND nothing was being gruoped before = hide the columns
			else if (eg && colIndexes.length > 0 && this.lastGroupField === undefined) {
				this.lastGroupField = groupField;
				this.lgflen = groupField.length;
				for (var i = 0, len = colIndexes.length; i < len; ++i) {
					this.cm.setHidden(colIndexes[i], true);
				}
			}
			// if has group fields AND has existing group fields AND EITHER they aren't the same group fields OR number of fields has changed = hode/show needed column
			else if (eg && this.lastGroupField !== undefined && (groupField !== this.lastGroupField || this.lgflen != this.lastGroupField.length)) {
				this.mainBody.update('');
				for (var i = 0, len = this.lastGroupField.length; i < len; ++i) {
					var cidx = this.cm.findColumnIndex(this.lastGroupField[i]);
					if (cidx >= 0)
						this.cm.setHidden(cidx, false);
					else
						if (window.console) console.debug("Error unhiding column " + cidx);
				}
				this.lastGroupField = groupField;
				this.lgflen = groupField.length;
				for (var i = 0, len = colIndexes.length; i < len; ++i) {
					this.cm.setHidden(colIndexes[i], true);
				}
			}
		}
		return Ext.ux.grid.MultiGroupingView.superclass.renderRows.apply(this, arguments);
	}

	//
	// creates a floating panel with columns rendered in a reorderable list
	//
	, createQuickGroupingPanel: function (groupField) {
		// check it exists
		if (!groupField) groupField = [];

		var maxGroupings = this.grid.store.maxGroupings;

		// construct column model buttons
		var treeNodes = [];
		var selectedNodes = [];
		var cols = this.grid.getColumnModel().config;
		Ext.each(cols, function (item, index, allItems) {

			// if it's hidden and it's not showable, skip it
			if (item.hidden && !item.hideable) return;
			// if it doesn't have header text, skip it
			if (!item.header) return;
			// if it's not groupable, skip it
			if (item.groupable === false) return;
			// if it's the check all column, skip it
			if (item.id == 'checkAllColumn') return;

			var groupBy = this.grid.store.translateGroupByField(item.dataIndex);
			var isGrouped = groupField.contains(groupBy);

			// create column node
			var node = {
				cls: 'x-tree-noicon',
				text: item.header,
				allowChildren: false,
				allowDrop: false,
				draggable: true,
				editable: true,
				leaf: true,
				checked: isGrouped,
				groupBy: groupBy,
				groupBySort: groupField.indexOf(groupBy)
			};

			// add to tree node arrays
			if (isGrouped) {
				selectedNodes.push(node);
			} else {
				treeNodes.push(node);
			}
		}, this);

		// sort grouped fields
		selectedNodes.sort(function (a, b) {
			return a.groupBySort - b.groupBySort;
		});
		// concat arrays
		treeNodes = selectedNodes.concat(treeNodes);

		// tree
		var tree = new Ext.tree.TreePanel({
			useArrows: true,
			autoScroll: true,
			animate: true,
			enableDD: true,
			containerScroll: true,

			flex: 1,

			border: true,
			bodyStyle: 'background-color: white; border-top: 0px; border-bottom: 0px; border-left: 0px;',
			padding: 5,

			rootVisible: false,
			root: {
				id: 'quickGroupingRootFilter',
				expanded: true,
				draggable: false,
				children: treeNodes
			},

			listeners: {
				checkchange: function (node, checked) {
					// if checking a new node
					if (checked) {
						// check if max number of groupings were hit, if so disable the last one
						var count = 0;
						var lastNode;
						Ext.each(node.parentNode.childNodes, function (item, index, allItems) {
							if (item.attributes.checked && item != node) {
								lastNode = item;
								count++;
							}
						});
						if (count >= maxGroupings) {
							lastNode.getUI().toggleCheck(false);
						}
					}
				},

				dblclick: function (node, e) {
				},
				movenode: function (tree, node, oldParent, newParent, index) {
				}
			}
		});

		// panel
		var panel = new Ext.Panel({
			id: 'quickGroupingPanel',
			floating: true,
			draggable: {
				//      Config option of Ext.Panel.DD class.
				//      It's a floating Panel, so do not show a placeholder proxy in the original position.
				insertProxy: false,

				//      Called for each mousemove event while dragging the DD object.
				onDrag: function (e) {
					//          Record the x,y position of the drag proxy so that we can
					//          position the Panel at end of drag.
					var pel = this.proxy.getEl();
					this.x = pel.getLeft(true);
					this.y = pel.getTop(true);

					//          Keep the Shadow aligned if there is one.
					var s = this.panel.getEl().shadow;
					if (s) {
						s.realign(this.x, this.y, pel.getWidth(), pel.getHeight());
					}
				},

				//      Called on the mouseup event.
				endDrag: function (e) {
					this.panel.setPosition(this.x, this.y);
				}
			},
			renderTo: Ext.getBody(),
			padding: 0,
			width: 300,
			autoHeight: true,
			title: this.i18nText.title,
			shadowOffset: 8,
			layout: 'hbox',
			layoutConfig: {
				align: 'stretchmax'
			},
			items: [
				tree,
				{ xtype: 'panel', padding: 5, border: false, width: 120, cls: 'auxText', html: this.i18nText.help.replace('{0}', maxGroupings) }
			],
			bbar: [
				'->',
				{ text: this.i18nText.ok, iconCls: 'ss_sprite ss_tick',
					scope: this,
					handler: function (b, e) {
						// get new groupings
						var nodes = tree.root.childNodes;
						var grouping = [];
						for (var i = 0; i < nodes.length; i++) {
							if (nodes[i].getUI().isChecked()) grouping.push(nodes[i].attributes.groupBy);
						}

						// do group
						this.grid.store.groupBy(grouping, true);
						this.grid.fireEvent('groupchange', this, grouping);

						// close
						panel.hide();
						panel.destroy();
						this.quickGroupingPanel = null;
					}
				},
				{ text: this.i18nText.cancel, iconCls: 'ss_sprite ss_cross', scope: this, handler: function (b, e) { panel.hide(); panel.destroy(); this.quickGroupingPanel = null; } }
			]
		});

		return panel;
	}



	/** This sets up the toolbar for the grid based on what is grouped
	* It also iterates over all the rows and figures out where each group should appeaer
	* The store at this point is already stored based on the groups.
	*/
	, doRender: function (cs, rs, ds, startRow, colCount, stripe) {
		//if ( window.console) console.debug ("MultiGroupingView.doRender: ",cs, rs, ds, startRow, colCount, stripe);
		if (rs.length < 1) {
			return '';
		}

		var groupField = this.getGroupField();
		var gfLen = groupField ? groupField.length : 0;

		var tb = this.grid.getTopToolbar();
		var bb = this.grid.getBottomToolbar();
		// only render grouping options if toolbar exists and it hasn't already been added and multi-grouping is enabled
		if (bb && !this.groupingBarAdded && this.grid.store.enableMultiGrouping) {
			this.groupingBarAdded = true;

			// on bottom
			bb.insert(12, { xtype: 'tbseparator' });
			bb.insert(13, {
				text: this.i18nText.groupings,
				iconCls: 'ss_sprite ss_application_cascade',
				menu: {
					xtype: 'menu',
					items: [
						{ text: this.i18nText.clear, iconCls: 'ss_sprite ss_application_delete', scope: this.grid, handler: function () {
							this.store.clearGrouping();
							this.fireEvent('groupchange', this, []);
						}
						},
						{ text: this.i18nText.reset, iconCls: 'ss_sprite ss_application_key', scope: this.grid, handler: function () {
							var gstate = this.store.defaultGrouping();
							this.fireEvent('groupchange', this, gstate);
						}
						},
						{ text: this.i18nText.title, iconCls: 'ss_sprite ss_application_view_tile', scope: this,
							handler: function (button, e) {
								if (!this.quickGroupingPanel) {
									// popup grouping editor
									this.quickGroupingPanel = this.createQuickGroupingPanel(this.getGroupField());
									this.quickGroupingPanel.show();
									var xy = e.getXY();
									this.quickGroupingPanel.setPosition(xy[0] - 50, xy[1] - this.quickGroupingPanel.getHeight());
								}
							}
						}
					]
				}
			});
			if (this.summary) {
				bb.insert(14, { xtype: 'tbseparator' });
				bb.insert(15, {
					text: 'Summary',
					iconCls: 'ss_sprite ss_application_bottom_expand',
					enableToggle: true,
					pressed: true,
					scope: this,
					handler: function (button, e) {
						this.summary.toggleSummaries(button.pressed);
					}
				});
			}
			// refresh toolbar
			bb.doLayout();
		}

		this.enableGrouping = !!groupField;

		if (!this.enableGrouping || this.isUpdating) {
			return Ext.grid.GroupingView.superclass.doRender.apply(this, arguments);
		}

		var gstyle = 'width:' + this.getTotalWidth() + ';';
		var gidPrefix = this.grid.getGridEl().id;
		var curGroup, len, gid;
		var lastvalues = [];
		var currGroups = [];
		this.groups = [];

		// Loop through all rows in record set
		for (var i = 0, len = rs.length; i < len; i++) {
			var r = rs[i];

			var colIndex = 0;
			var rowIndex = startRow + i;
			var differ = 0;
			var gvalue = [];
			var fieldName;
			var fieldLabel;
			var prefix;
			var grpFieldNames = [];
			var grpFieldLabels = [];
			var v;
			var changed = false;
			var addGroup = [];
			var member_of_groups = [];
			this.record_memberships[r.id] = member_of_groups;

			// for each field we are grouping on
			// find which groups this row's fields belong too, addGroup array
			for (var j = 0; j < gfLen; j++) {
				fieldName = groupField[j];

				colIndex = this.cm.findColumnIndex(fieldName);
				var col = this.cm.config[colIndex];
				fieldLabel = this.cm.getColumnHeader(colIndex);
				prefix = col.groupName || fieldLabel;

				v = r.data[fieldName];
				if (v || !this.displayEmptyFields) { // AMA don't handle empty grouping values any differently

					// AMA Group Renderer support
					var groupOutput = v
					if (col.groupRenderer) {
						groupOutput = col.groupRenderer.call(col.scope, v, {}, r, rowIndex, colIndex, ds);
						if (groupOutput === '' || groupOutput === '&#160;') {
							groupOutput = col.emptyGroupText || this.emptyGroupText;
						} else if (this.hideGroupedColumn) {
							groupOutput = v + ' ' + groupOutput;
						}
					}
					// AMA End

					if (i == 0) {
						// First record always starts a new group, pushes each group field
						addGroup.push({ idx: j, dataIndex: fieldName, header: prefix, value: v, group: groupOutput });
						lastvalues[j] = v;
					} else {
						if ((typeof (v) == "object" && (lastvalues[j].toString() != v.toString())) || (typeof (v) != "object" && (lastvalues[j] != v))) {
							// This record is not in same group as previous one
							//if ( window.console) console.debug("Row ",i," added group. Values differ: prev=",lastvalues[j]," curr=",v);
							addGroup.push({ idx: j, dataIndex: fieldName, header: prefix, value: v, group: groupOutput });
							lastvalues[j] = v;
							changed = true;
						} else {
							if (gfLen - 1 == j && !changed) {
								// last group value was not changed
								// This row is in all the same groups to the previous group
								curGroup.rs.push(r);
								member_of_groups.push(curGroup);
								//if ( window.console) console.debug("Row ",i," added to current group");
							} else if (changed) {
								// This group has changed because an earlier group changed.
								addGroup.push({ idx: j, dataIndex: fieldName, header: prefix, value: v, group: groupOutput });
								//if ( window.console) console.debug("Row ",i," added group. Higher level group change");
							} else if (j < gfLen - 1) {
								// This is a parent group, and this record is part of this parent so add it
								//if (window.console) console.debug("Same parent group on row ", i, " current group for ", fieldName, currGroups[fieldName]);
								if (currGroups[fieldName]) {
									currGroups[fieldName].rs.push(r);
									member_of_groups.push(currGroups[fieldName]);
								}
								//else
								//    if ( window.console) console.error("Missing on row ",i," current group for ",fieldName);
							}
						}
					}
				} else {
					if (this.displayEmptyFields) {
						addGroup.push({ idx: j, dataIndex: fieldName, header: prefix, value: this.emptyGroupText || '(none)' });
					}
				}
			} //for j
			//if(addGroup.length>0) if ( window.console) console.debug("Added groups for row=",i,", Groups=",addGroup);

			for (var k = 0; k < addGroup.length; k++) {
				var grp = addGroup[k];
				gid = gidPrefix + '-gp-' + grp.dataIndex + '-' + Ext.util.Format.htmlEncode(grp.value) + '-' + rowIndex;

				// if state is defined use it, however state is in terms of expanded
				// so negate it, otherwise use the default.
				var isCollapsed = typeof this.state[gid] !== 'undefined' ? !this.state[gid] : this.startCollapsed;
				var gcls = isCollapsed ? 'x-grid-group-collapsed' : '';
				var rndr = this.cm.config[this.cm.findColumnIndex(grp.dataIndex)].renderer;

				// AMA Group Renderer support
				var groupOutput = grp.value
				if (grp.group) {
					groupOutput = grp.group;
					rndr = null;
				}
				// AMA End

				curGroup = {
					group_level: grp.idx	// for summary code
					, group: rndr ? rndr(grp.value) : groupOutput
					, groupName: grp.dataIndex
					, gvalue: rndr ? rndr(grp.value) : grp.value // AMA render the cell value
					, text: grp.header
					, groupId: gid
					, startRow: rowIndex
					, rs: [r]				// array of records in this group
					, cls: gcls
					, coloredCls: this.grid.disableSummaryColors ? '' : 'x-grid-group-hd-' + grp.idx
				};

				// AMA toggle group indention
				if (this.indentGroups) {
					// grouped row styles
					//curGroup.ggstyle = gstyle + 'padding-left:' + (grp.idx == 0 ? 0 : this.indentSize) + 'px; overflow: hidden;'; // AMA indent the sub groups and stop overflow
					curGroup.ggstyle = 'padding-left:' + (grp.idx == 0 ? 0 : this.indentSize) + 'px; overflow: hidden;'; // AMA indent the sub groups and stop overflow
				} else {
					// grouped header styles
					curGroup.style = gstyle + 'padding-left:' + (grp.idx == 0 ? 0 : this.indentSize) + 'px;';
					//curGroup.style = (grp.idx == gfLen - 1 ? gstyle : '') + 'padding-left:' + (grp.idx * this.indentSize) + 'px;';
					//curGroup.style = 'padding-left:' + (grp.idx * this.indentSize) + 'px;';
					// grouped row styles
					curGroup.ggstyle = gstyle + 'overflow: hidden;'; // stop overflow
				}

				currGroups[grp.dataIndex] = curGroup;

				r._groupId = gid; // Associate this row to a group

				member_of_groups.push(curGroup);
				this.groups.push(curGroup);
			} //for k
		} //for i

		// Flag the last groups as incomplete if more rows are available
		//NOTE: this works if the associated store is a MultiGroupingPagingStore!
		for (var gfi = 0; gfi < gfLen; gfi++) {
			var c = currGroups[groupField[gfi]];
			if (this.grid.store.nextKey) c.incomplete = true;
			//if ( window.console) console.debug("Final Groups are...",c);
		}

		var buf = [];
		var toEnd = 0;
		var stack = [];
		for (var ilen = 0, len = this.groups.length; ilen < len; ilen++) {
			toEnd++;
			var g = this.groups[ilen];
			var leaf = g.groupName == groupField[gfLen - 1]
			this.doMultiGroupStart(buf, g, cs, ds, colCount);
			if (g.rs.length != 0 && leaf)
				buf[buf.length] = Ext.grid.GroupingView.superclass.doRender.call(this, cs, g.rs, ds, g.startRow, colCount, stripe);
			stack.push(g);

			if (leaf) {
				var jj;
				var gg = this.groups[ilen + 1];
				if (gg != null) {
					for (jj = 0; jj < groupField.length; jj++) {
						if (gg.groupName == groupField[jj])
							break;
					}
					toEnd = groupField.length - jj;
				}
				for (var k = 0; k < toEnd; k++) {
					var nextg = stack.pop();
					this.doMultiGroupEnd(buf, nextg, cs, ds, colCount);
				}
				toEnd = jj;
			}
		}
		// Clear cache as rows have just been generated, so old cache must be invalid
		if (this.rowsCache) delete this.rowsCache;
		return buf.join('');
	}

	/** Initialize new templates */
	, initTemplates: function () {
		Ext.ux.grid.MultiGroupingView.superclass.initTemplates.call(this);

		if (!this.startMultiGroup) {
			this.startMultiGroup = new Ext.XTemplate('<div id="{groupId}" class="x-grid-group {cls}" style="{ggstyle}">',
				'<div id="{groupId}-hd" class="x-grid-group-hd {coloredCls}" style="{style} display:inline-block;">',
					'<div class="x-grid-group-title" style="display:inline-block;">',
						this.groupTextTpl,
					'</div>',
					'<div id="{groupId}-hd-sumtoggle" style="display:inline-block;"></div>',
				'</div>',
				'<div id="{groupId}-bd" class="x-grid-group-body">');
		}
		this.startMultiGroup.compile();
		this.endMultiGroup = '</div></div>';
	}

	/** Private - Selects a custom group template if one has been defined
	*/
	, doMultiGroupStart: function (buf, g, cs, ds, colCount) {
		var groupName = g.groupName, tpl = null;

		if (this.groupFieldTemplates) {
			tpl = this.groupFieldTemplates[groupName];
			//if ( window.console) console.debug("doMultiGroupStart: Template for group ",groupName, tpl);
			if (tpl && typeof (tpl) == 'string') {
				tpl = new Ext.XTemplate('<div id="{groupId}" class="x-grid-group {cls}" style="{ggstyle}">', '<div id="{groupId}-hd" class="x-grid-group-hd" style="{style}"><div class="x-grid-group-title">', tpl, '</div></div>', '<div id="{groupId}-bd" class="x-grid-group-body">');
				tpl.compile();
				this.groupFieldTemplates[groupName] = tpl;
			}
		}
		if (tpl)
			buf[buf.length] = tpl.apply(g);
		else
			buf[buf.length] = this.startMultiGroup.apply(g);
	}

	, doMultiGroupEnd: function (buf, g, cs, ds, colCount) {
		//console.debug('base.doMultiGroup');
		buf[buf.length] = this.endMultiGroup;
	}

	// AMA added from 3.3 branch of code
	, getGroups: function () {
		return Ext.DomQuery.select("div.x-grid-group", this.mainBody.dom);
	}

	// AMA added from 3.3 branch of code
    , getGroupById: function (gid) {
    	var g = null;
    	for (var i = 0; i < this.groups.length; i++) {
    		group = this.groups[i];
    		if (group.groupId == gid)
    			return group;
    	}
    	return g;
    }

	, getGroupsData: function () {
		return this.groups;
	}


	/** Should return an array of all elements that represent a row, it should bypass
	*  all grouping sections
	*/
	, getRows: function () {
		var r = [];
		// This function is called may times, so use a cache if it is available
		if (this.rowsCache) {
			r = this.rowsCache;
			//if ( window.console) console.debug('View.getRows: cached');
		} else {
			//if ( window.console) console.debug('View.getRows: calculate');
			if (!this.enableGrouping) {
				r = Ext.grid.GroupingView.superclass.getRows.call(this);
			} else {
				var groupField = this.getGroupField();
				if (groupField) {
					var g, gs = this.getGroups();
					// this.getGroups() contains an array of DIVS for the top level groups
					//if (window.console) console.debug("Get Rows", groupField, gs, groupField[groupField.length - 1]);

					r = this.getRowsFromGroup(r, gs, groupField[groupField.length - 1]);
				}

				if (!r || r.length == 0)
				// AMA pulled from 3.3 branch of this code.
					r = Ext.DomQuery.select("div.x-grid3-row", this.mainBody.dom);
			}

			if (!r || r.length == 0)
			// AMA pulled from 3.3 branch of this code.
				r = Ext.DomQuery.select("div.x-grid3-row", this.mainBody.dom);

			// Clone the array, but not the objects in it
			if (r.length > 0) {
				// Don't cache if there is nothing there, as this happens during a refresh
				//@TODO comment this to disble caching, incase of problems
				this.rowsCache = r;
			} // else   
			//if ( window.console) console.debug("No Rows to Cache!");
		}
		//if ( window.console) console.debug("View.getRows: Found ", r.length, " rows",r[0]);
		//if ( window.console) console.trace();
		return r;
	}


	/** Return array of records under a given group
	* @param r Record array to append to in the returned object
	* @param gs Grouping Sections, an array of DIV element that represent a set of grouped records
	* @param lsField The name of the grouping section we want to count
	*/
	, getRowsFromGroup: function (r, gs, lsField) {
		var rx = new RegExp(".*-gp-" + lsField + "-.*");

		// Loop over each section
		for (var i = 0, len = gs.length; i < len; i++) {

			// Get group name for this section
			var groupName = gs[i].id;
			if (rx.test(groupName)) {
				//if ( window.console) console.debug(groupName, " matched ", lsField);
				g = gs[i].childNodes[1].childNodes;
				for (var j = 0, jlen = g.length; j < jlen; j++) {
					r[r.length] = g[j];
				}
				//if ( window.console) console.debug("Found " + g.length + " rows for group " + lsField);
			} else {
				if (!gs[i].childNodes[1]) {
					if (window.console) console.error("Can't get rowcount for field ", lsField, " from ", gs, i);
				}
				// AMA No need for recursive call anymore because the gs array is selected via DOM query, getting all grid groups
				// else
				// if its an interim level, each group needs to be traversed as well
				//r = this.getRowsFromGroup(r, gs[i].childNodes[1].childNodes, lsField);
			}
		}
		return r;
	}

	/** Override the onLoad, as it always scrolls to the top, we only
	*  want to do this for an initial load or reload. There is a new event registered in 
	*  the constructor to do this     
	*/
	, onLoad: function () { }


	// AMA add override for super processEvent
	//
	// fix for group field array
	//
	, processEvent: function (name, e) {
		Ext.grid.GroupingView.superclass.processEvent.call(this, name, e);
		//Ext.grid.MultiGroupingView.superclass.processEvent.call(this, name, e);

		var hd = e.getTarget('.x-grid-group-hd', this.mainBody);
		if (hd) {
			// group value is at the end of the string
			var fields = this.getGroupField();

			var field = fields[fields.length - 1];


			var prefix = this.getPrefix(field);
			var groupValue = hd.id.substring(prefix.length);
			var emptyRe = new RegExp('gp-' + Ext.escapeRe(field) + '--hd');

			// remove trailing '-hd'
			groupValue = groupValue.substr(0, groupValue.length - 3);

			// also need to check for empty groups
			if (groupValue || emptyRe.test(hd.id)) {
				this.grid.fireEvent('group' + name, this.grid, field, groupValue, e);
			}
			if (name == 'mousedown' && e.target.className == 'x-grid-group-title') { // e.button == 0) {
				this.toggleGroup(hd.parentNode);
			}
		}
	}


	// AMA override colum header menu clicks
	// private
    , onShowGroupsClick: function (mi, checked) {
    	this.enableGrouping = checked;
    	if (checked) {
    		this.onGroupByClick();
    	} else {
    		var column = this.cm.getDataIndex(this.hdCtxIndex)
    		var gstate = this.grid.store.removeGroupBy(column);
    		this.grid.fireEvent('groupchange', this, gstate);
    	}
    }

	// AMA override resizing routine
	, updateGroupWidths: function () {
		if (!this.grid.store.enableMultiGrouping) Ext.ux.grid.MultiGroupingView.superclass.updateGroupWidths.call(this);

		if (!this.canGroup() || !this.hasRows()) {
			return;
		}
		var tw = Math.max(this.cm.getTotalWidth(), this.el.dom.offsetWidth - this.getScrollOffset()) + 'px';
		var gs = this.getGroups();
		var groupField = this.getGroupField();
		var gfLen = groupField ? groupField.length : 0;
		for (var i = 0, len = gs.length; i < len; i++) {

			var g = this.getGroupById(gs[i].id);
			var leaf = g.groupName == groupField[gfLen - 1]
			if (leaf)
				gs[i].firstChild.style.width = tw;
			else
				delete gs[i].firstChild.style.width;
		}
	}

});