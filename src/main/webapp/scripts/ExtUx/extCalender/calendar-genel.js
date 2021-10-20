/**
 * @author Volkan
 */

(function(){
    
    Ext.ns('Calendar.akgun.ux', 'Calendar.akgun.sample', 'Calendar.akgun.plugins', 'Calendar.akgun.cal');
    
    Ext.apply(Calendar.akgun, {
        /**
         * The version of the framework
         * @type String
         */
        version : '1.0',
        /**
         * The version of the framework, broken out into its numeric parts. This returns an
         * object that contains the following integer properties: major, minor and patch.
         * @type Object
         */
        versionDetails : {
            major: 1,
            minor: 0,
            patch: 0
        },
        
        hasBorderRadius : !(Ext.isIE || Ext.isOpera),
        
        log : function(s){
            //console.log(s);
        },
    
       /**
        * @class Calendar.akgun.cal.Date
        * @extends Object
        * <p>Contains utility date functions used by the calendar components.</p>
        * @singleton
        */
	    Date : {
            /**
             * Determines whether times used throughout all Extensible components should be displayed as
             * 12 hour times with am/pm (default) or 24 hour / military format. Note that some locale files
             * may override this value by default.
             * @type Boolean
             * @property use24HourTime
             */
            use24HourTime : false,
            
            /**
             * Returns the time duration between two dates in the specified units. For finding the number
             * of calendar days (ignoring time) between two dates use {@link Calendar.akgun.Date.diffDays diffDays} instead.
             * @param {Date} start The start date
             * @param {Date} end The end date
             * @param {String} unit (optional) The time unit to return. Valid values are 'ms' (milliseconds, the default), 's' (seconds),
             * 'm' (minutes) or 'h' (hours).
             * @return {Number} The time difference between the dates in the units specified by the unit param
             */
            diff : function(start, end, unit){
                var denom = 1,
                    diff = end.getTime() - start.getTime();
                
                if(unit == 's'){ 
                    denom = 1000;
                }
                else if(unit == 'm'){
                    denom = 1000*60;
                }
                else if(unit == 'h'){
                    denom = 1000*60*60;
                }
                return Math.round(diff/denom);
            },
            
            /**
             * Calculates the number of calendar days between two dates, ignoring time values. 
             * A time span that starts at 11pm (23:00) on Monday and ends at 1am (01:00) on Wednesday is 
             * only 26 total hours, but it spans 3 calendar days, so this function would return 3. For the
             * exact time difference, use {@link Calendar.akgun.Date.diff diff} instead.
             * @param {Date} start The start date
             * @param {Date} end The end date
             * @return {Number} The number of calendar days difference between the dates
             */
            diffDays : function(start, end){
                day = 1000*60*60*24;
                diff = end.clearTime(true).getTime() - start.clearTime(true).getTime();
                return Math.ceil(diff/day);
            },
            
            /**
             * Copies the time value from one date object into another without altering the target's 
             * date value. This function returns a new Date instance without modifying either original value.
             * @param {Date} fromDt The original date from which to copy the time
             * @param {Date} toDt The target date to copy the time to
             * @return {Date} The new date/time value
             */
            copyTime : function(fromDt, toDt){
                var dt = toDt.clone();
                dt.setHours(
                    fromDt.getHours(),
                    fromDt.getMinutes(),
                    fromDt.getSeconds(),
                    fromDt.getMilliseconds());
                
                return dt;
            },
            
            /**
             * Compares two dates and returns a value indicating how they relate to each other.
             * @param {Date} dt1 The first date
             * @param {Date} dt2 The second date
             * @param {Boolean} precise (optional) If true, the milliseconds component is included in the comparison,
             * else it is ignored (the default).
             * @return {Number} The number of milliseconds difference between the two dates. If the dates are equal
             * this will be 0.  If the first date is earlier the return value will be positive, and if the second date
             * is earlier the value will be negative.
             */
            compare : function(dt1, dt2, precise){
                var d1 = dt1, d2 = dt2;
                if(precise !== true){
                    d1 = dt1.clone();
                    d1.setMilliseconds(0);
                    d2 = dt2.clone();
                    d2.setMilliseconds(0);
                }
                return d2.getTime() - d1.getTime();
            },

	        // private helper fn
	        maxOrMin : function(max){
	            var dt = (max ? 0 : Number.MAX_VALUE), i = 0, args = arguments[1], ln = args.length;
	            for(; i < ln; i++){
	                dt = Math[max ? 'max' : 'min'](dt, args[i].getTime());
	            }
	            return new Date(dt);
	        },
	        
            /**
             * Returns the maximum date value passed into the function. Any number of date 
             * objects can be passed as separate params.
             * @param {Date} dt1 The first date
             * @param {Date} dt2 The second date
             * @param {Date} dtN (optional) The Nth date, etc.
             * @return {Date} A new date instance with the latest date value that was passed to the function
             */
			max : function(){
	            return this.maxOrMin.apply(this, [true, arguments]);
	        },
	        
            /**
             * Returns the minimum date value passed into the function. Any number of date 
             * objects can be passed as separate params.
             * @param {Date} dt1 The first date
             * @param {Date} dt2 The second date
             * @param {Date} dtN (optional) The Nth date, etc.
             * @return {Date} A new date instance with the earliest date value that was passed to the function
             */
			min : function(){
	            return this.maxOrMin.apply(this, [false, arguments]);
	        },
            
            isInRange : function(dt, rangeStart, rangeEnd) {
                return  (dt >= rangeStart && dt <= rangeEnd);
            },
            
            /**
             * Returns true if two date ranges overlap (either one starts or ends within the other, or one completely
             * overlaps the start and end of the other), else false if they do not.
             * @param {Date} start1 The start date of range 1
             * @param {Date} end1   The end date of range 1
             * @param {Date} start2 The start date of range 2
             * @param {Date} end2   The end date of range 2
             * @return {Booelan} True if the ranges overlap, else false
             */
            rangesOverlap : function(start1, end1, start2, end2){
                var startsInRange = (start1 >= start2 && start1 <= end2),
                    endsInRange = (end1 >= start2 && end1 <= end2),
                    spansRange = (start1 <= start2 && end1 >= end2);
                
                return (startsInRange || endsInRange || spansRange);
            }
	    }
    });
})();

//TODO: remove this once we are synced to trunk again
Ext.override(Ext.XTemplate, {
    applySubTemplate : function(id, values, parent, xindex, xcount){
        var me = this,
            len,
            t = me.tpls[id],
            vs,
            buf = [];
        if ((t.test && !t.test.call(me, values, parent, xindex, xcount)) ||
            (t.exec && t.exec.call(me, values, parent, xindex, xcount))) {
            return '';
        }
        vs = t.target ? t.target.call(me, values, parent) : values;
        len = vs.length;
        parent = t.target ? values : parent;
        if(t.target && Ext.isArray(vs)){
            Ext.each(vs, function(v, i) {
                buf[buf.length] = t.compiled.call(me, v, parent, i+1, len);
            });
            return buf.join('');
        }
        return t.compiled.call(me, vs, parent, xindex, xcount);
    }
});
/* This fix is in Ext 3.2 */
Ext.override(Ext.form.DateField, {
	
	altFormats : "m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j",
	
    safeParse : function(value, format) {
        if (/[gGhH]/.test(format.replace(/(\\.)/g, ''))) {
            // if parse format contains hour information, no DST adjustment is necessary
            return Date.parseDate(value, format);
        } else {
            // set time to 12 noon, then clear the time
            var parsedDate = Date.parseDate(value + ' ' + this.initTime, format + ' ' + this.initTimeFormat);
            if (parsedDate) return parsedDate.clearTime();
        }
    }
});
/* This override applies to the current 3.3.x line to fix duplicate remote actions */
Ext.override(Ext.data.Store, {
    add : function(records) {
        var i, record, index;
        
        records = [].concat(records);
        if (records.length < 1) {
            return;
        }
        
        for (i = 0, len = records.length; i < len; i++) {
            record = records[i];
            
            record.join(this);
            
            //Extensible: Added the modified.indexOf check to avoid adding duplicate recs
            if ((record.dirty || record.phantom) && this.modified.indexOf(record) == -1) {
                this.modified.push(record);
            }
        }
        
        index = this.data.length;
        this.data.addAll(records);
        
        if (this.snapshot) {
            this.snapshot.addAll(records);
        }
        
        this.fireEvent('add', this, records, index);
    },
    
    insert : function(index, records) {
        var i, record;
        
        records = [].concat(records);
        for (i = 0, len = records.length; i < len; i++) {
            record = records[i];
            
            this.data.insert(index + i, record);
            record.join(this);
            
            //Extensible: Added the modified.indexOf check to avoid adding duplicate recs
            if ((record.dirty || record.phantom) && this.modified.indexOf(record) == -1) {
                this.modified.push(record);
            }
        }
        
        if (this.snapshot) {
            this.snapshot.addAll(records);
        }
        
        this.fireEvent('add', this, records, index);
    },
    
    // Interestingly, this method has no changes, but is included here because without it a very strange
    // race condition occurs. This method is used as a callback internally for the add event which
    // is fired from the add method (overridden above). As long as both methods are here everything is OK
    // but with createRecords removed and defaulted to the original class you end up with duplicate copies
    // of added records in the store's modified collection (since both methods add to it). Not sure exactly
    // how that happens, but including this fixes it.
    createRecords : function(store, records, index) {
        var modified = this.modified,
            length   = records.length,
            record, i;
        
        for (i = 0; i < length; i++) {
            record = records[i];
            
            if (record.phantom && record.isValid()) {
                record.markDirty();  // <-- Mark new records dirty (Ed: why?)
                
                //Extensible: Added the modified.indexOf check to avoid adding duplicate recs
                if (modified.indexOf(record) == -1) {
                    modified.push(record);
                }
            }
        }
        if (this.autoSave === true) {
            this.save();
        }
    }
});
//Have to add in full API support so that EventMemoryProxy can do its thing.
//Won't hurt normal read-only MemoryProxy read actions.
Ext.data.MemoryProxy = function(data){
 var api = {};
 api[Ext.data.Api.actions.read] = true;
 api[Ext.data.Api.actions.create] = true;
 api[Ext.data.Api.actions.update] = true;
 api[Ext.data.Api.actions.destroy] = true;
 Ext.data.MemoryProxy.superclass.constructor.call(this, {
     api: api
 });
 this.data = data;
};
Ext.extend(Ext.data.MemoryProxy, Ext.data.DataProxy, {
 doRequest : function(action, rs, params, reader, callback, scope, arg) {
     if(action === Ext.data.Api.actions.read){
         params = params || {};
         var result;
         try {
             result = reader.readRecords(this.data);
         }catch(e){
             // @deprecated loadexception
             this.fireEvent("loadexception", this, null, arg, e);
             this.fireEvent('exception', this, 'response', action, arg, null, e);
             callback.call(scope, null, arg, false);
             return;
         }
     }
     callback.call(scope, result, arg, true);
 }
});

//This heinous override is required to fix IE9's removal of createContextualFragment.
//Unfortunately since DomHelper is a singleton there's not much of a way around it.
Ext.apply(Ext.DomHelper,
function(){
 var tempTableEl = null,
     emptyTags = /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,
     tableRe = /^table|tbody|tr|td$/i,
     confRe = /tag|children|cn|html$/i,
     tableElRe = /td|tr|tbody/i,
     cssRe = /([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi,
     endRe = /end/i,
     pub,
     // kill repeat to save bytes
     afterbegin = 'afterbegin',
     afterend = 'afterend',
     beforebegin = 'beforebegin',
     beforeend = 'beforeend',
     ts = '<table>',
     te = '</table>',
     tbs = ts+'<tbody>',
     tbe = '</tbody>'+te,
     trs = tbs + '<tr>',
     tre = '</tr>'+tbe;

 // private
 function doInsert(el, o, returnElement, pos, sibling, append){
     var newNode = pub.insertHtml(pos, Ext.getDom(el), createHtml(o));
     return returnElement ? Ext.get(newNode, true) : newNode;
 }

 // build as innerHTML where available
 function createHtml(o){
     var b = '',
         attr,
         val,
         key,
         cn;

     if(typeof o == "string"){
         b = o;
     } else if (Ext.isArray(o)) {
         for (var i=0; i < o.length; i++) {
             if(o[i]) {
                 b += createHtml(o[i]);
             }
         };
     } else {
         b += '<' + (o.tag = o.tag || 'div');
         for (attr in o) {
             val = o[attr];
             if(!confRe.test(attr)){
                 if (typeof val == "object") {
                     b += ' ' + attr + '="';
                     for (key in val) {
                         b += key + ':' + val[key] + ';';
                     };
                     b += '"';
                 }else{
                     b += ' ' + ({cls : 'class', htmlFor : 'for'}[attr] || attr) + '="' + val + '"';
                 }
             }
         };
         // Now either just close the tag or try to add children and close the tag.
         if (emptyTags.test(o.tag)) {
             b += '/>';
         } else {
             b += '>';
             if ((cn = o.children || o.cn)) {
                 b += createHtml(cn);
             } else if(o.html){
                 b += o.html;
             }
             b += '</' + o.tag + '>';
         }
     }
     return b;
 }

 function ieTable(depth, s, h, e){
     tempTableEl.innerHTML = [s, h, e].join('');
     var i = -1,
         el = tempTableEl,
         ns;
     while(++i < depth){
         el = el.firstChild;
     }
//   If the result is multiple siblings, then encapsulate them into one fragment.
     if(ns = el.nextSibling){
         var df = document.createDocumentFragment();
         while(el){
             ns = el.nextSibling;
             df.appendChild(el);
             el = ns;
         }
         el = df;
     }
     return el;
 }

 /**
  * @ignore
  * Nasty code for IE's broken table implementation
  */
 function insertIntoTable(tag, where, el, html) {
     var node,
         before;

     tempTableEl = tempTableEl || document.createElement('div');

     if(tag == 'td' && (where == afterbegin || where == beforeend) ||
        !tableElRe.test(tag) && (where == beforebegin || where == afterend)) {
         return;
     }
     before = where == beforebegin ? el :
              where == afterend ? el.nextSibling :
              where == afterbegin ? el.firstChild : null;

     if (where == beforebegin || where == afterend) {
         el = el.parentNode;
     }

     if (tag == 'td' || (tag == 'tr' && (where == beforeend || where == afterbegin))) {
         node = ieTable(4, trs, html, tre);
     } else if ((tag == 'tbody' && (where == beforeend || where == afterbegin)) ||
                (tag == 'tr' && (where == beforebegin || where == afterend))) {
         node = ieTable(3, tbs, html, tbe);
     } else {
         node = ieTable(2, ts, html, te);
     }
     el.insertBefore(node, before);
     return node;
 }


 pub = {
     /**
      * Returns the markup for the passed Element(s) config.
      * @param {Object} o The DOM object spec (and children)
      * @return {String}
      */
     markup : function(o){
         return createHtml(o);
     },

     /**
      * Applies a style specification to an element.
      * @param {String/HTMLElement} el The element to apply styles to
      * @param {String/Object/Function} styles A style specification string e.g. 'width:100px', or object in the form {width:'100px'}, or
      * a function which returns such a specification.
      */
     applyStyles : function(el, styles){
         if (styles) {
             var matches;

             el = Ext.fly(el);
             if (typeof styles == "function") {
                 styles = styles.call();
             }
             if (typeof styles == "string") {
                 /**
                  * Since we're using the g flag on the regex, we need to set the lastIndex.
                  * This automatically happens on some implementations, but not others, see:
                  * http://stackoverflow.com/questions/2645273/javascript-regular-expression-literal-persists-between-function-calls
                  * http://blog.stevenlevithan.com/archives/fixing-javascript-regexp
                  */
                 cssRe.lastIndex = 0;
                 while ((matches = cssRe.exec(styles))) {
                     el.setStyle(matches[1], matches[2]);
                 }
             } else if (typeof styles == "object") {
                 el.setStyle(styles);
             }
         }
     },

     /**
      * Inserts an HTML fragment into the DOM.
      * @param {String} where Where to insert the html in relation to el - beforeBegin, afterBegin, beforeEnd, afterEnd.
      * @param {HTMLElement} el The context element
      * @param {String} html The HTML fragment
      * @return {HTMLElement} The new node
      */
     insertHtml : function(where, el, html){
         var hash = {},
             hashVal,
             setStart,
             range,
             frag,
             rangeEl,
             rs,
             temp;

         where = where.toLowerCase();
         // add these here because they are used in both branches of the condition.
         hash[beforebegin] = ['BeforeBegin', 'previousSibling'];
         hash[afterend] = ['AfterEnd', 'nextSibling'];

         if (el.insertAdjacentHTML) {
             if(tableRe.test(el.tagName) && (rs = insertIntoTable(el.tagName.toLowerCase(), where, el, html))){
                 return rs;
             }
             // add these two to the hash.
             hash[afterbegin] = ['AfterBegin', 'firstChild'];
             hash[beforeend] = ['BeforeEnd', 'lastChild'];
             if ((hashVal = hash[where])) {
                 el.insertAdjacentHTML(hashVal[0], html);
                 return el[hashVal[1]];
             }
         } else {
             range = el.ownerDocument.createRange();
             setStart = 'setStart' + (endRe.test(where) ? 'After' : 'Before');
             if (hash[where]) {
                 range[setStart](el);
                 if (range.createContextualFragment) {
                     frag = range.createContextualFragment(html);
                 } else {
                     frag = document.createDocumentFragment(), 
                     temp = document.createElement('div');
                     frag.appendChild(temp);
                     temp.outerHTML = html;
                 }
                 el.parentNode.insertBefore(frag, where == beforebegin ? el : el.nextSibling);
                 return el[(where == beforebegin ? 'previous' : 'next') + 'Sibling'];
             } else {
                 rangeEl = (where == afterbegin ? 'first' : 'last') + 'Child';
                 if (el.firstChild) {
                     range[setStart](el[rangeEl]);
                     frag = range.createContextualFragment(html);
                     if(where == afterbegin){
                         el.insertBefore(frag, el.firstChild);
                     }else{
                         el.appendChild(frag);
                     }
                 } else {
                     el.innerHTML = html;
                 }
                 return el[rangeEl];
             }
         }
         throw 'Illegal insertion point -> "' + where + '"';
     },

     /**
      * Creates new DOM element(s) and inserts them before el.
      * @param {Mixed} el The context element
      * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
      * @param {Boolean} returnElement (optional) true to return a Ext.Element
      * @return {HTMLElement/Ext.Element} The new node
      */
     insertBefore : function(el, o, returnElement){
         return doInsert(el, o, returnElement, beforebegin);
     },

     /**
      * Creates new DOM element(s) and inserts them after el.
      * @param {Mixed} el The context element
      * @param {Object} o The DOM object spec (and children)
      * @param {Boolean} returnElement (optional) true to return a Ext.Element
      * @return {HTMLElement/Ext.Element} The new node
      */
     insertAfter : function(el, o, returnElement){
         return doInsert(el, o, returnElement, afterend, 'nextSibling');
     },

     /**
      * Creates new DOM element(s) and inserts them as the first child of el.
      * @param {Mixed} el The context element
      * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
      * @param {Boolean} returnElement (optional) true to return a Ext.Element
      * @return {HTMLElement/Ext.Element} The new node
      */
     insertFirst : function(el, o, returnElement){
         return doInsert(el, o, returnElement, afterbegin, 'firstChild');
     },

     /**
      * Creates new DOM element(s) and appends them to el.
      * @param {Mixed} el The context element
      * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
      * @param {Boolean} returnElement (optional) true to return a Ext.Element
      * @return {HTMLElement/Ext.Element} The new node
      */
     append : function(el, o, returnElement){
         return doInsert(el, o, returnElement, beforeend, '', true);
     },

     /**
      * Creates new DOM element(s) and overwrites the contents of el with them.
      * @param {Mixed} el The context element
      * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
      * @param {Boolean} returnElement (optional) true to return a Ext.Element
      * @return {HTMLElement/Ext.Element} The new node
      */
     overwrite : function(el, o, returnElement){
         el = Ext.getDom(el);
         el.innerHTML = createHtml(o);
         return returnElement ? Ext.get(el.firstChild) : el.firstChild;
     },

     createHtml : createHtml
 };
 return pub;
}());
/**
 * @class Calendar.akgun.cal.DayHeaderTemplate
 * @extends Ext.XTemplate
 * <p>This is the template used to render the all-day event container used in {@link Calendar.akgun.cal.DayView DayView} and 
 * {@link Calendar.akgun.cal.WeekView WeekView}. Internally the majority of the layout logic is deferred to an instance of
 * {@link Calendar.akgun.cal.BoxLayoutTemplate}.</p> 
 * <p>This template is automatically bound to the underlying event store by the 
 * calendar components and expects records of type {@link Calendar.akgun.cal.EventRecord}.</p>
 * <p>Note that this template would not normally be used directly. Instead you would use the {@link Calendar.akgun.cal.DayViewTemplate}
 * that internally creates an instance of this template along with a {@link Calendar.akgun.cal.DayBodyTemplate}.</p>
 * @constructor
 * @param {Object} config The config object
 */
Calendar.akgun.cal.DayHeaderTemplate = function(config){
    
    Ext.apply(this, config);
    
    this.allDayTpl = new Calendar.akgun.cal.BoxLayoutTemplate(config);
    this.allDayTpl.compile();
    
    Calendar.akgun.cal.DayHeaderTemplate.superclass.constructor.call(this,
        '<div class="ext-cal-hd-ct">',
            '<table class="ext-cal-hd-days-tbl" cellspacing="0" cellpadding="0">',
                '<tbody>',
                    '<tr>',
                        '<td class="ext-cal-gutter"></td>',
                        '<td class="ext-cal-hd-days-td"><div class="ext-cal-hd-ad-inner">{allDayTpl}</div></td>',
                        '<td class="ext-cal-gutter-rt"></td>',
                    '</tr>',
                '</tbody>',
            '</table>',
        '</div>'
    );
};

Ext.extend(Calendar.akgun.cal.DayHeaderTemplate, Ext.XTemplate, {
    // private
    applyTemplate : function(o){
        return Calendar.akgun.cal.DayHeaderTemplate.superclass.applyTemplate.call(this, {
            allDayTpl: this.allDayTpl.apply(o)
        });
    }
});

Calendar.akgun.cal.DayHeaderTemplate.prototype.apply = Calendar.akgun.cal.DayHeaderTemplate.prototype.applyTemplate;
/**
 * @class Calendar.akgun.cal.DayBodyTemplate
 * @extends Ext.XTemplate
 * <p>This is the template used to render the scrolling body container used in {@link Calendar.akgun.cal.DayView DayView} and 
 * {@link Calendar.akgun.cal.WeekView WeekView}. This template is automatically bound to the underlying event store by the 
 * calendar components and expects records of type {@link Calendar.akgun.cal.EventRecord}.</p>
 * <p>Note that this template would not normally be used directly. Instead you would use the {@link Calendar.akgun.cal.DayViewTemplate}
 * that internally creates an instance of this template along with a {@link Calendar.akgun.cal.DayHeaderTemplate}.</p>
 * @constructor
 * @param {Object} config The config object
 */
Calendar.akgun.cal.DayBodyTemplate = function(config){
    
    Ext.apply(this, config);
    
    Calendar.akgun.cal.DayBodyTemplate.superclass.constructor.call(this,
        '<table class="ext-cal-bg-tbl" cellspacing="0" cellpadding="0" style="height:{dayHeight}px;">',
            '<tbody>',
                '<tr height="1">',
                    '<td class="ext-cal-gutter"></td>',
                    '<td colspan="{dayCount}">',
                        '<div class="ext-cal-bg-rows">',
                            '<div class="ext-cal-bg-rows-inner">',
                                '<tpl for="times">',
                                    '<div class="ext-cal-bg-row ext-row-{[xindex]}" style="height:{parent.hourHeight}px;">',
                                        '<div class="ext-cal-bg-row-div {parent.hourSeparatorCls}" style="height:{parent.hourSeparatorHeight}px;"></div>',
                                    '</div>',
                                '</tpl>',
                            '</div>',
                        '</div>',
                    '</td>',
                '</tr>',
                '<tr>',
                    '<td class="ext-cal-day-times">',
                        '<tpl for="times">',
                            '<div class="ext-cal-bg-row" style="height:{parent.hourHeight}px;">',
                                '<div class="ext-cal-day-time-inner"  style="height:{parent.hourHeight-1}px;">{.}</div>',
                            '</div>',
                        '</tpl>',
                    '</td>',
                    '<tpl for="days">',
                        '<td class="ext-cal-day-col">',
                            '<div class="ext-cal-day-col-inner">',
                                '<div id="{[this.id]}-day-col-{.:date("Ymd")}" class="ext-cal-day-col-gutter" style="height:{parent.dayHeight}px;"></div>',
                            '</div>',
                        '</td>',
                    '</tpl>',
                '</tr>',
            '</tbody>',
        '</table>'
    );
};
Ext.extend(Calendar.akgun.cal.DayBodyTemplate, Ext.XTemplate, {
    // private
    applyTemplate : function(o){
        this.today = new Date().clearTime();
        this.dayCount = this.dayCount || 1;
        
        var i = 0, days = [],
            dt = o.viewStart.clone();
            
        for(; i<this.dayCount; i++){
            days[i] = dt.add(Date.DAY, i);
        }

        var times = [],
            start = this.viewStartHour,
            end = this.viewEndHour,
            mins = this.hourIncrement,
            dt = new Date().clearTime().add(Date.HOUR, start),
            dayHeight = this.hourHeight * (end - start)
            fmt = Calendar.akgun.Date.use24HourTime ? 'G:i' : 'ga';
        
        for(i=start; i<end; i++){
            times.push(dt.format(fmt));
            dt = dt.add(Date.MINUTE, mins);
        }
        
        return Calendar.akgun.cal.DayBodyTemplate.superclass.applyTemplate.call(this, {
            days: days,
            dayCount: days.length,
            times: times,
            hourHeight: this.hourHeight,
            hourSeparatorCls: this.showHourSeparator ? '' : 'no-sep', // the class suppresses the default separator
            dayHeight: dayHeight,
            hourSeparatorHeight: (this.hourHeight / 2) - 1
        });
    }
});

Calendar.akgun.cal.DayBodyTemplate.prototype.apply = Calendar.akgun.cal.DayBodyTemplate.prototype.applyTemplate;
/**
 * @class Calendar.akgun.cal.BoxLayoutTemplate
 * @extends Ext.XTemplate
 * <p>This is the template used to render calendar views based on small day boxes within a non-scrolling container (currently
 * the {@link Calendar.akgun.cal.MonthView MonthView} and the all-day headers for {@link Calendar.akgun.cal.DayView DayView} and 
 * {@link Calendar.akgun.cal.WeekView WeekView}. This template is automatically bound to the underlying event store by the 
 * calendar components and expects records of type {@link Calendar.akgun.cal.EventRecord}.</p>
 * @constructor
 * @param {Object} config The config object
 */
Calendar.akgun.cal.BoxLayoutTemplate = function(config){
    
    Ext.apply(this, config);
    
    var weekLinkTpl = this.showWeekLinks ? '<div id="{weekLinkId}" class="ext-cal-week-link">{weekNum}</div>' : '';
    
    Calendar.akgun.cal.BoxLayoutTemplate.superclass.constructor.call(this,
        '<tpl for="weeks">',
            '<div id="{[this.id]}-wk-{[xindex-1]}" class="ext-cal-wk-ct" style="top:{[this.getRowTop(xindex, xcount)]}%; height:{[this.getRowHeight(xcount)]}%;">',
                weekLinkTpl,
                '<table class="ext-cal-bg-tbl" cellpadding="0" cellspacing="0">',
                    '<tbody>',
                        '<tr>',
                            '<tpl for=".">',
                                 '<td id="{[this.id]}-day-{date:date("Ymd")}" class="{cellCls}">&#160;</td>',
                            '</tpl>',
                        '</tr>',
                    '</tbody>',
                '</table>',
                '<table class="ext-cal-evt-tbl" cellpadding="0" cellspacing="0">',
                    '<tbody>',
                        '<tr>',
                            '<tpl for=".">',
                                '<td id="{[this.id]}-ev-day-{date:date("Ymd")}" class="{titleCls}"><div>{title}</div></td>',
                            '</tpl>',
                        '</tr>',
                    '</tbody>',
                '</table>',
            '</div>',
        '</tpl>', {
            getRowTop: function(i, ln){
                return ((i-1)*(100/ln));
            },
            getRowHeight: function(ln){
                return 100/ln;
            }
        }
    );
};

Ext.extend(Calendar.akgun.cal.BoxLayoutTemplate, Ext.XTemplate, {
    /**
     * @cfg {String} firstWeekDateFormat
     * The date format used for the day boxes in the first week of the view only (subsequent weeks
     * use the {@link #otherWeeksDateFormat} config). Defaults to 'D j'. Note that if the day names header is displayed
     * above the first row (e.g., {@link Calendar.akgun.cal.MonthView#showHeader MonthView.showHeader} = true)
     * then this value is ignored and {@link #otherWeeksDateFormat} will be used instead.
     */
    firstWeekDateFormat: 'D j',
    /**
     * @cfg {String} otherWeeksDateFormat
     * The date format used for the date in day boxes (other than the first week, which is controlled by
     * {@link #firstWeekDateFormat}). Defaults to 'j'.
     */
    otherWeeksDateFormat: 'j',
    /**
     * @cfg {String} singleDayDateFormat
     * The date format used for the date in the header when in single-day view (defaults to 'l, F j, Y').
     */
    singleDayDateFormat: 'l, F j, Y',
    /**
     * @cfg {String} multiDayFirstDayFormat
     * The date format used for the date in the header when more than one day are visible (defaults to 'M j, Y').
     */
    multiDayFirstDayFormat: 'M j, Y',
    /**
     * @cfg {String} multiDayMonthStartFormat
     * The date format to use for the first day in a month when more than one day are visible (defaults to 'M j').
     * Note that if this day falls on the first day within the view, {@link #multiDayFirstDayFormat} takes precedence.
     */
    multiDayMonthStartFormat: 'M j',
    
    // private
    applyTemplate : function(o){
        
        Ext.apply(this, o);
        
        var w = 0, title = '', first = true, isToday = false, showMonth = false, prevMonth = false, nextMonth = false,
            weeks = [[]],
            today = new Date().clearTime(),
            dt = this.viewStart.clone(),
            thisMonth = this.startDate.getMonth();
        
        for(; w < this.weekCount || this.weekCount == -1; w++){
            if(dt > this.viewEnd){
                break;
            }
            weeks[w] = [];
            
            for(var d = 0; d < this.dayCount; d++){
                isToday = dt.getTime() === today.getTime();
                showMonth = first || (dt.getDate() == 1);
                prevMonth = (dt.getMonth() < thisMonth) && this.weekCount == -1;
                nextMonth = (dt.getMonth() > thisMonth) && this.weekCount == -1;
                
                if(dt.getDay() == 1){
                    // The ISO week format 'W' is relative to a Monday week start. If we
                    // make this check on Sunday the week number will be off.
                    weeks[w].weekNum = this.showWeekNumbers ? dt.format('W') : '&#160;';
                    weeks[w].weekLinkId = 'ext-cal-week-'+dt.format('Ymd');
                }
                
                if(showMonth){
                    if(isToday){
                        title = this.getTodayText();
                    }
                    else{
                        title = dt.format(this.dayCount == 1 ? this.singleDayDateFormat : 
                                (first ? this.multiDayFirstDayFormat : this.multiDayMonthStartFormat));
                    }
                }
                else{
                    var dayFmt = (w == 0 && this.showHeader !== true) ? this.firstWeekDateFormat : this.otherWeeksDateFormat;
                    title = isToday ? this.getTodayText() : dt.format(dayFmt);
                }
                
                weeks[w].push({
                    title: title,
                    date: dt.clone(),
                    titleCls: 'ext-cal-dtitle ' + (isToday ? ' ext-cal-dtitle-today' : '') + 
                        (w==0 ? ' ext-cal-dtitle-first' : '') +
                        (prevMonth ? ' ext-cal-dtitle-prev' : '') + 
                        (nextMonth ? ' ext-cal-dtitle-next' : ''),
                    cellCls: 'ext-cal-day ' + (isToday ? ' ext-cal-day-today' : '') + 
                        (d==0 ? ' ext-cal-day-first' : '') +
                        (prevMonth ? ' ext-cal-day-prev' : '') +
                        (nextMonth ? ' ext-cal-day-next' : '')
                });
                dt = dt.add(Date.DAY, 1);
                first = false;
            }
        }
        
        return Calendar.akgun.cal.BoxLayoutTemplate.superclass.applyTemplate.call(this, {
            weeks: weeks
        });
    },
    
    // private
    getTodayText : function(){
        var timeFmt = Calendar.akgun.Date.use24HourTime ? 'G:i ' : 'g:ia ',
            todayText = this.showTodayText !== false ? this.todayText : '',
            timeText = this.showTime !== false ? ' <span id="'+this.id+'-clock" class="ext-cal-dtitle-time">' + 
                    new Date().format(timeFmt) + '</span>' : '',
            separator = todayText.length > 0 || timeText.length > 0 ? ' &#8212; ' : ''; // &#8212; == &mdash;
        
        if(this.dayCount == 1){
            return new Date().format(this.singleDayDateFormat) + separator + todayText + timeText;
        }
        fmt = this.weekCount == 1 ? this.firstWeekDateFormat : this.otherWeeksDateFormat;
        return todayText.length > 0 ? todayText + timeText : new Date().format(fmt) + timeText;
    }
});

Calendar.akgun.cal.BoxLayoutTemplate.prototype.apply = Calendar.akgun.cal.BoxLayoutTemplate.prototype.applyTemplate;
/**
 * @class Calendar.akgun.cal.MonthViewTemplate
 * @extends Ext.XTemplate
 * <p>This is the template used to render the {@link Calendar.akgun.cal.MonthView MonthView}. Internally this class defers to an
 * instance of {@link Ext.calerndar.BoxLayoutTemplate} to handle the inner layout rendering and adds containing elements around
 * that to form the month view.</p> 
 * <p>This template is automatically bound to the underlying event store by the 
 * calendar components and expects records of type {@link Calendar.akgun.cal.EventRecord}.</p>
 * @constructor
 * @param {Object} config The config object
 */
Calendar.akgun.cal.MonthViewTemplate = function(config){
    
    Ext.apply(this, config);
    
    this.weekTpl = new Calendar.akgun.cal.BoxLayoutTemplate(config);
    this.weekTpl.compile();
    
    var weekLinkTpl = this.showWeekLinks ? '<div class="ext-cal-week-link-hd">&#160;</div>' : '';
    
    Calendar.akgun.cal.MonthViewTemplate.superclass.constructor.call(this,
	    '<div class="ext-cal-inner-ct {extraClasses}">',
            '<div class="ext-cal-hd-ct ext-cal-month-hd">',
                weekLinkTpl,
		        '<table class="ext-cal-hd-days-tbl" cellpadding="0" cellspacing="0">',
		            '<tbody>',
                        '<tr>',
                            '<tpl for="days">',
		                        '<th class="ext-cal-hd-day{[xindex==1 ? " ext-cal-day-first" : ""]}" title="{title}">{name}</th>',
		                    '</tpl>',
                        '</tr>',
		            '</tbody>',
		        '</table>',
            '</div>',
	        '<div class="ext-cal-body-ct">{weeks}</div>',
        '</div>'
    );
};

Ext.extend(Calendar.akgun.cal.MonthViewTemplate, Ext.XTemplate, {
    /**
     * @cfg {String} dayHeaderFormat
     * The date format to use for day headers, if used (defaults to 'D', e.g. 'Mon' for Monday)
     */
    dayHeaderFormat: 'D',
    /**
     * @cfg {String} dayHeaderTitleFormat
     * The date format to use for the day header's HTML title attribute displayed on mouseover 
     * (defaults to 'l, F j, Y', e.g. 'Monday, December 27, 2010')
     */
    dayHeaderTitleFormat: 'l, F j, Y',
    
    // private
    applyTemplate : function(o){
        var days = [],
            weeks = this.weekTpl.apply(o),
            dt = o.viewStart;
        
        for(var i = 0; i < 7; i++){
            var d = dt.add(Date.DAY, i);
            days.push({
                name: d.format(this.dayHeaderFormat),
                title: d.format(this.dayHeaderTitleFormat)
            });
        }
        
        var extraClasses = this.showHeader === true ? '' : 'ext-cal-noheader';
        if(this.showWeekLinks){
            extraClasses += ' ext-cal-week-links';
        }
        
        return Calendar.akgun.cal.MonthViewTemplate.superclass.applyTemplate.call(this, {
            days: days,
            weeks: weeks,
            extraClasses: extraClasses
        });
    }
});

Calendar.akgun.cal.MonthViewTemplate.prototype.apply = Calendar.akgun.cal.MonthViewTemplate.prototype.applyTemplate;
/* @private
 * @class Ext.dd.ScrollManager
 * <p>Provides automatic scrolling of overflow regions in the page during drag operations.</p>
 * <p>The ScrollManager configs will be used as the defaults for any scroll container registered with it,
 * but you can also override most of the configs per scroll container by adding a 
 * <tt>ddScrollConfig</tt> object to the target element that contains these properties: {@link #hthresh},
 * {@link #vthresh}, {@link #increment} and {@link #frequency}.  Example usage:
 * <pre><code>
var el = Ext.get('scroll-ct');
el.ddScrollConfig = {
    vthresh: 50,
    hthresh: -1,
    frequency: 100,
    increment: 200
};
Ext.dd.ScrollManager.register(el);
</code></pre>
 * <b>Note: This class uses "Point Mode" and is untested in "Intersect Mode".</b>
 * @singleton
 */
Ext.dd.ScrollManager = function(){
    var ddm = Ext.dd.DragDropMgr;
    var els = {};
    var dragEl = null;
    var proc = {};
    
    var onStop = function(e){
        dragEl = null;
        clearProc();
    };
    
    var triggerRefresh = function(){
        if(ddm.dragCurrent){
             ddm.refreshCache(ddm.dragCurrent.groups);
        }
    };
    
    var doScroll = function(){
        if(ddm.dragCurrent){
            var dds = Ext.dd.ScrollManager;
            var inc = proc.el.ddScrollConfig ?
                      proc.el.ddScrollConfig.increment : dds.increment;
            if(!dds.animate){
                if(proc.el.scroll(proc.dir, inc)){
                    triggerRefresh();
                }
            }else{
                proc.el.scroll(proc.dir, inc, true, dds.animDuration, triggerRefresh);
            }
        }
    };
    
    var clearProc = function(){
        if(proc.id){
            clearInterval(proc.id);
        }
        proc.id = 0;
        proc.el = null;
        proc.dir = "";
    };
    
    var startProc = function(el, dir){
        clearProc();
        proc.el = el;
        proc.dir = dir;
        var freq = (el.ddScrollConfig && el.ddScrollConfig.frequency) ? 
                el.ddScrollConfig.frequency : Ext.dd.ScrollManager.frequency,
            group = el.ddScrollConfig ? el.ddScrollConfig.ddGroup : undefined;
        
        if(group === undefined || ddm.dragCurrent.ddGroup == group){
            proc.id = setInterval(doScroll, freq);
        }
    };
    
    var onFire = function(e, isDrop){
        if(isDrop || !ddm.dragCurrent){ return; }
        var dds = Ext.dd.ScrollManager;
        if(!dragEl || dragEl != ddm.dragCurrent){
            dragEl = ddm.dragCurrent;
            // refresh regions on drag start
            dds.refreshCache();
        }
        
        var xy = Ext.lib.Event.getXY(e);
        var pt = new Ext.lib.Point(xy[0], xy[1]);
        for(var id in els){
            var el = els[id], r = el._region;
            var c = el.ddScrollConfig ? el.ddScrollConfig : dds;
            if(r && r.contains(pt) && el.isScrollable()){
                if(r.bottom - pt.y <= c.vthresh){
                    if(proc.el != el){
                        startProc(el, "down");
                    }
                    return;
                }else if(r.right - pt.x <= c.hthresh){
                    if(proc.el != el){
                        startProc(el, "left");
                    }
                    return;
                }else if(pt.y - r.top <= c.vthresh){
                    if(proc.el != el){
                        startProc(el, "up");
                    }
                    return;
                }else if(pt.x - r.left <= c.hthresh){
                    if(proc.el != el){
                        startProc(el, "right");
                    }
                    return;
                }
            }
        }
        clearProc();
    };
    
    ddm.fireEvents = ddm.fireEvents.createSequence(onFire, ddm);
    ddm.stopDrag = ddm.stopDrag.createSequence(onStop, ddm);
    
    return {
        /**
         * Registers new overflow element(s) to auto scroll
         * @param {Mixed/Array} el The id of or the element to be scrolled or an array of either
         */
        register : function(el){
            if(Ext.isArray(el)){
                for(var i = 0, len = el.length; i < len; i++) {
                    this.register(el[i]);
                }
            }else{
                el = Ext.get(el);
                els[el.id] = el;
            }
        },
        
        /**
         * Unregisters overflow element(s) so they are no longer scrolled
         * @param {Mixed/Array} el The id of or the element to be removed or an array of either
         */
        unregister : function(el){
            if(Ext.isArray(el)){
                for(var i = 0, len = el.length; i < len; i++) {
                    this.unregister(el[i]);
                }
            }else{
                el = Ext.get(el);
                delete els[el.id];
            }
        },
        
        /**
         * The number of pixels from the top or bottom edge of a container the pointer needs to be to
         * trigger scrolling (defaults to 25)
         * @type Number
         */
        vthresh : 25,
        /**
         * The number of pixels from the right or left edge of a container the pointer needs to be to
         * trigger scrolling (defaults to 25)
         * @type Number
         */
        hthresh : 25,

        /**
         * The number of pixels to scroll in each scroll increment (defaults to 50)
         * @type Number
         */
        increment : 100,
        
        /**
         * The frequency of scrolls in milliseconds (defaults to 500)
         * @type Number
         */
        frequency : 500,
        
        /**
         * True to animate the scroll (defaults to true)
         * @type Boolean
         */
        animate: true,
        
        /**
         * The animation duration in seconds - 
         * MUST BE less than Ext.dd.ScrollManager.frequency! (defaults to .4)
         * @type Number
         */
        animDuration: .4,
        
        /**
         * Manually trigger a cache refresh.
         */
        refreshCache : function(){
            for(var id in els){
                if(typeof els[id] == 'object'){ // for people extending the object prototype
                    els[id]._region = els[id].getRegion();
                }
            }
        }
    };
}();/**
 * @class Calendar.akgun.cal.StatusProxy
 * A specialized drag proxy that supports a drop status icon, {@link Ext.Layer} styles and auto-repair. It also
 * contains a calendar-specific drag status message containing details about the dragged event's target drop date range.  
 * This is the default drag proxy used by all calendar views.
 * @constructor
 * @param {Object} config
 */
Calendar.akgun.cal.StatusProxy = function(config){
    Ext.apply(this, config);
    this.id = this.id || Ext.id();
    this.el = new Ext.Layer({
        dh: {
            id: this.id, cls: 'ext-dd-drag-proxy x-dd-drag-proxy '+this.dropNotAllowed, cn: [
                {cls: 'x-dd-drop-icon'},
                {cls: 'ext-dd-ghost-ct', cn:[
                    {cls: 'x-dd-drag-ghost'},
                    {cls: 'ext-dd-msg'}
                ]}
            ]
        }, 
        shadow: !config || config.shadow !== false
    });
    this.ghost = Ext.get(this.el.dom.childNodes[1].childNodes[0]);
    this.message = Ext.get(this.el.dom.childNodes[1].childNodes[1]);
    this.dropStatus = this.dropNotAllowed;
};

Ext.extend(Calendar.akgun.cal.StatusProxy, Ext.dd.StatusProxy, {
    /**
     * @cfg {String} moveEventCls
     * The CSS class to apply to the status element when an event is being dragged (defaults to 'ext-cal-dd-move').
     */
    moveEventCls : 'ext-cal-dd-move',
    /**
     * @cfg {String} addEventCls
     * The CSS class to apply to the status element when drop is not allowed (defaults to 'ext-cal-dd-add').
     */
    addEventCls : 'ext-cal-dd-add',

    // inherit docs
    update : function(html){
        if(typeof html == 'string'){
            this.ghost.update(html);
        }else{
            this.ghost.update('');
            html.style.margin = '0';
            this.ghost.dom.appendChild(html);
        }
        var el = this.ghost.dom.firstChild;
        if(el){
            Ext.fly(el).setStyle('float', 'none').setHeight('auto');
            Ext.getDom(el).id += '-ddproxy';
        }
    },
    
    /* @private
     * Update the calendar-specific drag status message without altering the ghost element.
     * @param {String} msg The new status message
     */
    updateMsg : function(msg){
        this.message.update(msg);
    }
});

/* @private
 * Internal drag zone implementation for the calendar components. This provides base functionality
 * and is primarily for the month view -- DayViewDD adds day/week view-specific functionality.
 */
Calendar.akgun.cal.DragZone = Ext.extend(Ext.dd.DragZone, {
    ddGroup : 'CalendarDD',
    eventSelector : '.ext-cal-evt',
    
    constructor : function(el, config){
        if(!Calendar.akgun.cal._statusProxyInstance){
            Calendar.akgun.cal._statusProxyInstance = new Calendar.akgun.cal.StatusProxy();
        }
        this.proxy = Calendar.akgun.cal._statusProxyInstance;
        Calendar.akgun.cal.DragZone.superclass.constructor.call(this, el, config);
    },
    
    getDragData : function(e){
        // Check whether we are dragging on an event first
        var t = e.getTarget(this.eventSelector, 3);
        if(t){
            var rec = this.view.getEventRecordFromEl(t);
            if(!rec){
                // if rec is null here it usually means there was a timing issue between drag 
                // start and the browser reporting it properly. Simply ignore and it will 
                // resolve correctly once the browser catches up.
                return;
            }
            return {
                type: 'eventdrag',
                ddel: t,
                eventStart: rec.data[Calendar.akgun.cal.EventMappings.StartDate.name],
                eventEnd: rec.data[Calendar.akgun.cal.EventMappings.EndDate.name],
                proxy: this.proxy
            };
        }
        
        // If not dragging an event then we are dragging on 
        // the calendar to add a new event
        t = this.view.getDayAt(e.xy[0], e.xy[1]);
        if(t.el){
            return {
                type: 'caldrag',
                start: t.date,
                proxy: this.proxy
            };
        }
        return null;
    },
    
    onInitDrag : function(x, y){
        if(this.dragData.ddel){
            var ghost = this.dragData.ddel.cloneNode(true),
                child = Ext.fly(ghost).child('dl');
            
            Ext.fly(ghost).setWidth('auto');
            
            if(child){
                // for IE/Opera
                child.setHeight('auto');
            }
            this.proxy.update(ghost);
            this.onStartDrag(x, y);
        }
        else if(this.dragData.start){
            this.onStartDrag(x, y);
        }
        this.view.onInitDrag();
        return true;
    },
    
    afterRepair : function(){
        if(Ext.enableFx && this.dragData.ddel){
            Ext.Element.fly(this.dragData.ddel).highlight(this.hlColor || 'c3daf9');
        }
        this.dragging = false;
    },
    
    getRepairXY : function(e){
        if(this.dragData.ddel){
            return Ext.Element.fly(this.dragData.ddel).getXY();
        }
    },
    
    afterInvalidDrop : function(e, id){
        Ext.select('.ext-dd-shim').hide();
    },
    
    destroy : function(){
        Calendar.akgun.cal.DragZone.superclass.destroy.call(this);
        delete Calendar.akgun.cal._statusProxyInstance;
    }    
});

/* @private
 * Internal drop zone implementation for the calendar components. This provides base functionality
 * and is primarily for the month view -- DayViewDD adds day/week view-specific functionality.
 */
Calendar.akgun.cal.DropZone = Ext.extend(Ext.dd.DropZone, {
    ddGroup : 'CalendarDD',
    eventSelector : '.ext-cal-evt',
    dateRangeFormat : '{0}-{1}',
    dateFormat : 'n/j',
    
    // private
    shims : [],
    
    getTargetFromEvent : function(e){
        var dragOffset = this.dragOffset || 0,
            y = e.getPageY() - dragOffset,
            d = this.view.getDayAt(e.getPageX(), y);
        
        return d.el ? d : null;
    },
    
    onNodeOver : function(n, dd, e, data){
        var D = Calendar.akgun.Date,
            start = data.type == 'eventdrag' ? n.date : D.min(data.start, n.date),
            end = data.type == 'eventdrag' ? n.date.add(Date.DAY, D.diffDays(data.eventStart, data.eventEnd)) : 
                D.max(data.start, n.date);
        
        if(!this.dragStartDate || !this.dragEndDate || (D.diffDays(start, this.dragStartDate) != 0) || (D.diffDays(end, this.dragEndDate) != 0)){
            this.dragStartDate = start;
            this.dragEndDate = end.clearTime().add(Date.DAY, 1).add(Date.MINUTE, -30);
            this.shim(start, end);
            
            var range = start.format(this.dateFormat);
                
            if(D.diffDays(start, end) > 0){
                end = end.format(this.dateFormat);
                range = String.format(this.dateRangeFormat, range, end);
            }
            var msg = String.format(data.type == 'eventdrag' ? this.moveText : this.createText, range);
            data.proxy.updateMsg(msg);
        }
        return this.dropAllowed;
    },
    
    shim : function(start, end){
        this.currWeek = -1;
        var dt = start.clone(),
            i = 0, shim, box,
            cnt = Calendar.akgun.Date.diffDays(dt, end)+1
        
        Ext.each(this.shims, function(shim){
            if(shim){
                shim.isActive = false;
            }
        });
        
        while(i++ < cnt){
            var dayEl = this.view.getDayEl(dt);
            
            // if the date is not in the current view ignore it (this
            // can happen when an event is dragged to the end of the
            // month so that it ends outside the view)
            if(dayEl){
                var wk = this.view.getWeekIndex(dt),
                    shim = this.shims[wk];
            
                if(!shim){
                    shim = this.createShim();
                    this.shims[wk] = shim;
                }
                if(wk != this.currWeek){
                    shim.boxInfo = dayEl.getBox();
                    this.currWeek = wk;
                }
                else{
                    box = dayEl.getBox();
                    shim.boxInfo.right = box.right;
                    shim.boxInfo.width = box.right - shim.boxInfo.x;
                }
                shim.isActive = true;
            }
            dt = dt.add(Date.DAY, 1);
        }
        
        Ext.each(this.shims, function(shim){
            if(shim){
                if(shim.isActive){
                    shim.show();
                    shim.setBox(shim.boxInfo);
                }
                else if(shim.isVisible()){
                    shim.hide();
                }
            }
        });
    },
    
    createShim : function(){
        var owner = this.view.ownerCalendarPanel ? this.view.ownerCalendarPanel : this.view;
        if(!this.shimCt){
            this.shimCt = Ext.get('ext-dd-shim-ct-'+owner.id);
            if(!this.shimCt){
                this.shimCt = document.createElement('div');
                this.shimCt.id = 'ext-dd-shim-ct-'+owner.id;
                owner.getEl().parent().appendChild(this.shimCt);
            }
        }
        var el = document.createElement('div');
        el.className = 'ext-dd-shim';
        this.shimCt.appendChild(el);
        
        return new Ext.Layer({
            shadow:false, 
            useDisplay:true, 
            constrain:false
        }, el);
    },
    
    clearShims : function(){
        Ext.each(this.shims, function(shim){
            if(shim){
                shim.hide();
            }
        });
    },
    
    onContainerOver : function(dd, e, data){
        return this.dropAllowed;
    },
    
    onCalendarDragComplete : function(){
        delete this.dragStartDate;
        delete this.dragEndDate;
        this.clearShims();
    },
    
    onNodeDrop : function(n, dd, e, data){
        if(n && data){
            if(data.type == 'eventdrag'){
                var rec = this.view.getEventRecordFromEl(data.ddel),
                    dt = Calendar.akgun.Date.copyTime(rec.data[Calendar.akgun.cal.EventMappings.StartDate.name], n.date);
                    
                this.view.onEventDrop(rec, dt);
                this.onCalendarDragComplete();
                return true;
            }
            if(data.type == 'caldrag'){
                this.view.onCalendarEndDrag(this.dragStartDate, this.dragEndDate, 
                    this.onCalendarDragComplete.createDelegate(this));
                //shims are NOT cleared here -- they stay visible until the handling
                //code calls the onCalendarDragComplete callback which hides them.
                return true;
            }
        }
        this.onCalendarDragComplete();
        return false;
    },
    
    onContainerDrop : function(dd, e, data){
        this.onCalendarDragComplete();
        return false;
    }
});

/* @private
 * Internal drag zone implementation for the calendar day and week views.
 */
Calendar.akgun.cal.DayViewDragZone = Ext.extend(Calendar.akgun.cal.DragZone, {
    ddGroup : 'DayViewDD',
    resizeSelector : '.ext-evt-rsz',
    
    getDragData : function(e){
        var t = e.getTarget(this.resizeSelector, 2, true);
        if(t){
            var p = t.parent(this.eventSelector), 
                rec = this.view.getEventRecordFromEl(p);
            
            if(!rec){
                // if rec is null here it usually means there was a timing issue between drag 
                // start and the browser reporting it properly. Simply ignore and it will 
                // resolve correctly once the browser catches up.
                return;
            }
            return {
                type: 'eventresize',
                xy: e.xy,
                ddel: p.dom,
                eventStart: rec.data[Calendar.akgun.cal.EventMappings.StartDate.name],
                eventEnd: rec.data[Calendar.akgun.cal.EventMappings.EndDate.name],
                proxy: this.proxy
            };
        }
        var t = e.getTarget(this.eventSelector, 3);
        if(t){
            var rec = this.view.getEventRecordFromEl(t);
            if(!rec){
                // if rec is null here it usually means there was a timing issue between drag 
                // start and the browser reporting it properly. Simply ignore and it will 
                // resolve correctly once the browser catches up.
                return;
            }
            return {
                type: 'eventdrag',
                xy: e.xy,
                ddel: t,
                eventStart: rec.data[Calendar.akgun.cal.EventMappings.StartDate.name],
                eventEnd: rec.data[Calendar.akgun.cal.EventMappings.EndDate.name],
                proxy: this.proxy
            };
        }
        
        // If not dragging/resizing an event then we are dragging on 
        // the calendar to add a new event
        t = this.view.getDayAt(e.xy[0], e.xy[1]);
        if(t.el){
            return {
                type: 'caldrag',
                dayInfo: t,
                proxy: this.proxy
            };
        }
        return null;
    }
});

/* @private
 * Internal drop zone implementation for the calendar day and week views.
 */
Calendar.akgun.cal.DayViewDropZone = Ext.extend(Calendar.akgun.cal.DropZone, {
    ddGroup : 'DayViewDD',
    dateRangeFormat : '{0}-{1}',
    dateFormat : 'n/j',
    
    onNodeOver : function(n, dd, e, data){
        var dt, text = this.createText,
            timeFormat = Calendar.akgun.Date.use24HourTime ? 'G:i' : 'g:ia';
            
        if(data.type == 'caldrag'){
            if(!this.dragStartMarker){
                // Since the container can scroll, this gets a little tricky.
                // There is no el in the DOM that we can measure by default since
                // the box is simply calculated from the original drag start (as opposed
                // to dragging or resizing the event where the orig event box is present).
                // To work around this we add a placeholder el into the DOM and give it
                // the original starting time's box so that we can grab its updated
                // box measurements as the underlying container scrolls up or down.
                // This placeholder is removed in onNodeDrop.
                this.dragStartMarker = n.el.parent().createChild({
                    style: 'position:absolute;'
                });
                // use the original dayInfo values from the drag start
                this.dragStartMarker.setBox(data.dayInfo.timeBox);
                this.dragCreateDt = data.dayInfo.date;
            }
            var endDt, box = this.dragStartMarker.getBox();
            box.height = Math.ceil(Math.abs(e.xy[1] - box.y) / n.timeBox.height) * n.timeBox.height;
            
            if(e.xy[1] < box.y){
                box.height += n.timeBox.height;
                box.y = box.y - box.height + n.timeBox.height;
                endDt = this.dragCreateDt.add(Date.MINUTE, this.ddIncrement);
            }
            else{
                n.date = n.date.add(Date.MINUTE, this.ddIncrement);
            }
            this.shim(this.dragCreateDt, box);
            
            var curr = Calendar.akgun.Date.copyTime(n.date, this.dragCreateDt);
            this.dragStartDate = Calendar.akgun.Date.min(this.dragCreateDt, curr);
            this.dragEndDate = endDt || Calendar.akgun.Date.max(this.dragCreateDt, curr);
                
            dt = String.format(this.dateRangeFormat, this.dragStartDate.format(timeFormat), this.dragEndDate.format(timeFormat));
        }
        else{
            var evtEl = Ext.get(data.ddel),
                dayCol = evtEl.parent().parent(),
                box = evtEl.getBox();
            
            box.width = dayCol.getWidth();
            
            if(data.type == 'eventdrag'){
                if(this.dragOffset === undefined){
                    this.dragOffset = data.xy[1]-box.y;
                    box.y = data.xy[1]-this.dragOffset;
                }
                else{
                    box.y = n.timeBox.y;
                }
                dt = n.date.format(this.dateFormat + ' ' + timeFormat);
                box.x = n.el.getLeft();
                
                this.shim(n.date, box);
                text = this.moveText;
            }
            if(data.type == 'eventresize'){
                if(!this.resizeDt){
                    this.resizeDt = n.date;
                }
                box.x = dayCol.getLeft();
                box.height = Math.ceil(Math.abs(e.xy[1] - box.y) / n.timeBox.height) * n.timeBox.height;
                if(e.xy[1] < box.y){
                    box.y -= box.height;
                }
                else{
                    n.date = n.date.add(Date.MINUTE, this.ddIncrement);
                }
                this.shim(this.resizeDt, box);
                
                var curr = Calendar.akgun.Date.copyTime(n.date, this.resizeDt),
                    start = Calendar.akgun.Date.min(data.eventStart, curr),
                    end = Calendar.akgun.Date.max(data.eventStart, curr);
                    
                data.resizeDates = {
                    StartDate: start,
                    EndDate: end
                }
                dt = String.format(this.dateRangeFormat, start.format(timeFormat), end.format(timeFormat));
                text = this.resizeText;
            }
        }
        
        data.proxy.updateMsg(String.format(text, dt));
        return this.dropAllowed;
    },
    
    shim : function(dt, box){
        Ext.each(this.shims, function(shim){
            if(shim){
                shim.isActive = false;
                shim.hide();
            }
        });
        
        var shim = this.shims[0];
        if(!shim){
            shim = this.createShim();
            this.shims[0] = shim;
        }
        
        shim.isActive = true;
        shim.show();
        shim.setBox(box);
    },
    
    onNodeDrop : function(n, dd, e, data){
        if(n && data){
            if(data.type == 'eventdrag'){
                var rec = this.view.getEventRecordFromEl(data.ddel);
                this.view.onEventDrop(rec, n.date);
                this.onCalendarDragComplete();
                delete this.dragOffset;
                return true;
            }
            if(data.type == 'eventresize'){
                var rec = this.view.getEventRecordFromEl(data.ddel);
                this.view.onEventResize(rec, data.resizeDates);
                this.onCalendarDragComplete();
                delete this.resizeDt;
                return true;
            }
            if(data.type == 'caldrag'){
                Ext.destroy(this.dragStartMarker);
                delete this.dragStartMarker;
                delete this.dragCreateDt;
                this.view.onCalendarEndDrag(this.dragStartDate, this.dragEndDate, 
                    this.onCalendarDragComplete.createDelegate(this));
                //shims are NOT cleared here -- they stay visible until the handling
                //code calls the onCalendarDragComplete callback which hides them.
                return true;
            }
        }
        this.onCalendarDragComplete();
        return false;
    }
});

Calendar.akgun.cal.EventStore = Ext.extend(Ext.data.Store, {
    constructor: function(config){
        // By default autoLoad will cause the store to load itself during the
        // constructor, before the owning calendar view has a chance to set up
        // the initial date params to use during loading.  We replace autoLoad
        // with a deferLoad property that the view can check for and use to set
        // up default params as needed, then call the load itself. 
        this.deferLoad = config.autoLoad;
        config.autoLoad = false;
        
        //this._dateCache = [];
        
        Calendar.akgun.cal.EventStore.superclass.constructor.apply(this, arguments);
    },
    
    load : function(o){
        Calendar.akgun.log('store load');
        
        // if params are passed delete the one-time defaults
        if(o && o.params){
            delete this.initialParams;
        }
        // this.initialParams will only be set if the store is being loaded manually
        // for the first time (autoLoad = false) so the owning calendar view set
        // the initial start and end date params to use. Every load after that will
        // have these params set automatically during normal UI navigation.
        if(this.initialParams){
            o = Ext.isObject(o) ? o : {};
            o.params = o.params || {};
            Ext.apply(o.params, this.initialParams);
            delete this.initialParams;
        }
        
        Calendar.akgun.cal.EventStore.superclass.load.call(this, o);
    }
    
//    execute : function(action, rs, options, /* private */ batch) {
//        if(action=='read'){
//            var i = 0, 
//                dc = this._dateCache, 
//                len = dc.length,
//                range,
//                p = options.params,
//                start = p.start,
//                end = p.end;
//                
//            //options.add = true;
//            for(i; i<len; i++){
//                range = dc[i];
//                
//            }
//        }
//        Calendar.akgun.cal.EventStore.superclass.execute.apply(this, arguments);
//    }
});

Ext.reg('extensible.eventstore', Calendar.akgun.cal.EventStore);

/**
 * @class Calendar.akgun.cal.EventMappings
 * @extends Object
 * <p>A simple object that provides the field definitions for 
 * {@link Calendar.akgun.cal.EventRecord EventRecord}s so that they can be easily overridden.</p>
 * 
 * <p>There are several ways of overriding the default Event record mappings to customize how 
 * Ext records are mapped to your back-end data model. If you only need to change a handful 
 * of field properties you can directly modify the EventMappings object as needed and then 
 * reconfigure it. The simplest approach is to only override specific field attributes:</p>
 * <pre><code>
var M = Calendar.akgun.cal.EventMappings;
M.Title.mapping = 'evt_title';
M.Title.name = 'EventTitle';
Calendar.akgun.cal.EventRecord.reconfigure();
</code></pre>
 * 
 * <p>You can alternately override an entire field definition using object-literal syntax, or 
 * provide your own custom field definitions (as in the following example). Note that if you do 
 * this, you <b>MUST</b> include a complete field definition, including the <tt>type</tt> attribute
 * if the field is not the default type of <tt>string</tt>.</p>
 * <pre><code>
// Add a new field that does not exist in the default EventMappings:
Calendar.akgun.cal.EventMappings.Timestamp = {
    name: 'Timestamp',
    mapping: 'timestamp',
    type: 'date'
};
Calendar.akgun.cal.EventRecord.reconfigure();
</code></pre>
 * 
 * <p>If you are overriding a significant number of field definitions it may be more convenient 
 * to simply redefine the entire EventMappings object from scratch. The following example
 * redefines the same fields that exist in the standard EventRecord object but the names and 
 * mappings have all been customized. Note that the name of each field definition object 
 * (e.g., 'EventId') should <b>NOT</b> be changed for the default EventMappings fields as it 
 * is the key used to access the field data programmatically.</p>
 * <pre><code>
Calendar.akgun.cal.EventMappings = {
    EventId:     {name: 'ID', mapping:'evt_id', type:'int'},
    CalendarId:  {name: 'CalID', mapping: 'cal_id', type: 'int'},
    Title:       {name: 'EvtTitle', mapping: 'evt_title'},
    StartDate:   {name: 'StartDt', mapping: 'start_dt', type: 'date', dateFormat: 'c'},
    EndDate:     {name: 'EndDt', mapping: 'end_dt', type: 'date', dateFormat: 'c'},
    RRule:       {name: 'RecurRule', mapping: 'recur_rule'},
    Location:    {name: 'Location', mapping: 'location'},
    Notes:       {name: 'Desc', mapping: 'full_desc'},
    Url:         {name: 'LinkUrl', mapping: 'link_url'},
    IsAllDay:    {name: 'AllDay', mapping: 'all_day', type: 'boolean'},
    Reminder:    {name: 'Reminder', mapping: 'reminder'},
    
    // We can also add some new fields that do not exist in the standard EventRecord:
    CreatedBy:   {name: 'CreatedBy', mapping: 'created_by'},
    IsPrivate:   {name: 'Private', mapping:'private', type:'boolean'}
};
// Don't forget to reconfigure!
Calendar.akgun.cal.EventRecord.reconfigure();
</code></pre>
 * 
 * <p><b>NOTE:</b> Any record reconfiguration you want to perform must be done <b>PRIOR to</b> 
 * initializing your data store, otherwise the changes will not be reflected in the store's records.</p>
 * 
 * <p>Another important note is that if you alter the default mapping for <tt>EventId</tt>, make sure to add
 * that mapping as the <tt>idProperty</tt> of your data reader, otherwise it won't recognize how to
 * access the data correctly and will treat existing records as phantoms. Here's an easy way to make sure
 * your mapping is always valid:</p>
 * <pre><code>
var reader = new Ext.data.JsonReader({
    totalProperty: 'total',
    successProperty: 'success',
    root: 'data',
    messageProperty: 'message',
    
    // read the id property generically, regardless of the mapping:
    idProperty: Calendar.akgun.cal.EventMappings.EventId.mapping  || 'id',
    
    // this is also a handy way to configure your reader's fields generically:
    fields: Calendar.akgun.cal.EventRecord.prototype.fields.getRange()
});
</code></pre>
 */

//TODO Değiştirilebilir
Calendar.akgun.cal.EventMappings = {
    EventId:     {name: 'EventId', mapping:'id', type:'int'},
    CalendarId:  {name: 'CalendarId', mapping: 'cid', type: 'int'},
    Title:       {name: 'Title', mapping: 'title', type: 'string'},
    StartDate:   {name: 'StartDate', mapping: 'start', type: 'date', dateFormat: 'd/m/Y H:i'},
    EndDate:     {name: 'EndDate', mapping: 'end', type: 'date', dateFormat: 'd/m/Y H:i'},
    RRule:       {name: 'RecurRule', mapping: 'recur_rule'}, // not currently used
    Location:    {name: 'Location', mapping: 'loc', type: 'string'},
    Notes:       {name: 'Notes', mapping: 'notes', type: 'string'},
    Url:         {name: 'Url', mapping: 'url', type: 'string'},
    IsAllDay:    {name: 'IsAllDay', mapping: 'ad', type: 'boolean'},
    Reminder:    {name: 'Reminder', mapping: 'rem', type: 'string'}
};/**
 * @class Calendar.akgun.cal.CalendarMappings
 * @extends Object
 * A simple object that provides the field definitions for 
 * {@link Calendar.akgun.cal.CalendarRecord CalendarRecord}s so that they can be easily overridden.
 * 
 * <p>There are several ways of overriding the default Calendar record mappings to customize how 
 * Ext records are mapped to your back-end data model. If you only need to change a handful 
 * of field properties you can directly modify the CalendarMappings object as needed and then 
 * reconfigure it. The simplest approach is to only override specific field attributes:</p>
 * <pre><code>
var M = Calendar.akgun.cal.CalendarMappings;
M.Title.mapping = 'cal_title';
M.Title.name = 'CalTitle';
Calendar.akgun.cal.CalendarRecord.reconfigure();
</code></pre>
 * 
 * <p>You can alternately override an entire field definition using object-literal syntax, or 
 * provide your own custom field definitions (as in the following example). Note that if you do 
 * this, you <b>MUST</b> include a complete field definition, including the <tt>type</tt> attribute
 * if the field is not the default type of <tt>string</tt>.</p>
 * <pre><code>
// Add a new field that does not exist in the default CalendarMappings:
Calendar.akgun.cal.CalendarMappings.Owner = {
    name: 'Owner',
    mapping: 'owner',
    type: 'string'
};
Calendar.akgun.cal.CalendarRecord.reconfigure();
</code></pre>
 * 
 * <p>If you are overriding a significant number of field definitions it may be more convenient 
 * to simply redefine the entire CalendarMappings object from scratch. The following example
 * redefines the same fields that exist in the standard CalendarRecord object but the names and 
 * mappings have all been customized. Note that the name of each field definition object 
 * (e.g., 'CalendarId') should <b>NOT</b> be changed for the default CalendarMappings fields as it 
 * is the key used to access the field data programmatically.</p>
 * <pre><code>
Calendar.akgun.cal.CalendarMappings = {
    CalendarId:   {name:'ID', mapping: 'id', type: 'int'},
    Title:        {name:'CalTitle', mapping: 'title', type: 'string'},
    Description:  {name:'Desc', mapping: 'desc', type: 'string'},
    ColorId:      {name:'Color', mapping: 'color', type: 'int'},
    IsHidden:     {name:'Hidden', mapping: 'hidden', type: 'boolean'},
    
    // We can also add some new fields that do not exist in the standard CalendarRecord:
    Owner:        {name: 'Owner', mapping: 'owner'}
};
// Don't forget to reconfigure!
Calendar.akgun.cal.CalendarRecord.reconfigure();
</code></pre>
 * 
 * <p><b>NOTE:</b> Any record reconfiguration you want to perform must be done <b>PRIOR to</b> 
 * initializing your data store, otherwise the changes will not be reflected in the store's records.</p>
 * 
 * <p>Another important note is that if you alter the default mapping for <tt>CalendarId</tt>, make sure to add
 * that mapping as the <tt>idProperty</tt> of your data reader, otherwise it won't recognize how to
 * access the data correctly and will treat existing records as phantoms. Here's an easy way to make sure
 * your mapping is always valid:</p>
 * <pre><code>
var reader = new Ext.data.JsonReader({
    totalProperty: 'total',
    successProperty: 'success',
    root: 'data',
    messageProperty: 'message',
    
    // read the id property generically, regardless of the mapping:
    idProperty: Calendar.akgun.cal.CalendarMappings.CalendarId.mapping  || 'id',
    
    // this is also a handy way to configure your reader's fields generically:
    fields: Calendar.akgun.cal.CalendarRecord.prototype.fields.getRange()
});
</code></pre>
 */
Calendar.akgun.cal.CalendarMappings = {
    CalendarId:   {name:'CalendarId', mapping: 'id', type: 'int'},
    Title:        {name:'Title', mapping: 'title', type: 'string'},
    Description:  {name:'Description', mapping: 'desc', type: 'string'},
    ColorId:      {name:'ColorId', mapping: 'color', type: 'int'},
    IsHidden:     {name:'IsHidden', mapping: 'hidden', type: 'boolean'}
};/**
 * @class Calendar.akgun.cal.EventRecord
 * @extends Ext.data.Record
 * <p>This is the {@link Ext.data.Record Record} specification for calendar event data used by the
 * {@link Calendar.akgun.cal.CalendarPanel CalendarPanel}'s underlying store. It can be overridden as 
 * necessary to customize the fields supported by events, although the existing field definition names 
 * should not be altered. If your model fields are named differently you should update the <b>mapping</b>
 * configs accordingly.</p>
 * <p>The only required fields when creating a new event record instance are <tt>StartDate</tt> and
 * <tt>EndDate</tt>.  All other fields are either optional or will be defaulted if blank.</p>
 * <p>Here is a basic example for how to create a new record of this type:<pre><code>
rec = new Calendar.akgun.cal.EventRecord({
    StartDate: '2101-01-12 12:00:00',
    EndDate: '2101-01-12 13:30:00',
    Title: 'My cool event',
    Notes: 'Some notes'
});
</code></pre>
 * If you have overridden any of the record's data mappings via the {@link Calendar.akgun.cal.EventMappings EventMappings} object
 * you may need to set the values using this alternate syntax to ensure that the field names match up correctly:<pre><code>
var M = Calendar.akgun.cal.EventMappings,
    rec = new Calendar.akgun.cal.EventRecord();

rec.data[M.StartDate.name] = '2101-01-12 12:00:00';
rec.data[M.EndDate.name] = '2101-01-12 13:30:00';
rec.data[M.Title.name] = 'My cool event';
rec.data[M.Notes.name] = 'Some notes';
</code></pre>
 * @constructor
 * @param {Object} data (Optional) An object, the properties of which provide values for the new Record's
 * fields. If not specified the {@link Ext.data.Field#defaultValue defaultValue}
 * for each field will be assigned.
 * @param {Object} id (Optional) The id of the Record. The id is used by the
 * {@link Ext.data.Store} object which owns the Record to index its collection
 * of Records (therefore this id should be unique within each store). If an
 * id is not specified a {@link #phantom}
 * Record will be created with an {@link #Record.id automatically generated id}.
 */
Calendar.akgun.cal.EventRecord = Ext.extend(Ext.data.Record, {
    fields: new Ext.util.MixedCollection(false, function(field){
        return field.name;
    })
});

/**
 * Reconfigures the default record definition based on the current {@link Calendar.akgun.cal.EventMappings EventMappings}
 * object. See the header documentation for {@link Calendar.akgun.cal.EventMappings} for complete details and 
 * examples of reconfiguring an EventRecord.
 * @method create
 * @static
 * @return {Function} The updated EventRecord constructor function
 */
Calendar.akgun.cal.EventRecord.reconfigure = function(){
    var C = Calendar.akgun.cal,
        M = C.EventMappings,
        proto = C.EventRecord.prototype,
        fields = [];
    
    for(prop in M){
        if(M.hasOwnProperty(prop)){
            fields.push(M[prop]);
        }
    }
    proto.fields.clear();
    for(var i = 0, len = fields.length; i < len; i++){
        proto.fields.add(new Ext.data.Field(fields[i]));
    }
    return C.EventRecord;
};

// Create the default definition now:
Calendar.akgun.cal.EventRecord.reconfigure();
/**
 * @class Calendar.akgun.cal.CalendarRecord
 * @extends Ext.data.Record
 * <p>This is the {@link Ext.data.Record Record} specification for calendar items used by the
 * {@link Calendar.akgun.cal.CalendarPanel CalendarPanel}'s calendar store. If your model fields 
 * are named differently you should update the <b>mapping</b> configs accordingly.</p>
 * <p>The only required fields when creating a new calendar record instance are CalendarId and
 * Title.  All other fields are either optional or will be defaulted if blank.</p>
 * <p>Here is a basic example for how to create a new record of this type:<pre><code>
rec = new Calendar.akgun.cal.CalendarRecord({
    CalendarId: 5,
    Title: 'My Holidays',
    Description: 'My personal holiday schedule',
    ColorId: 3
});
</code></pre>
 * If you have overridden any of the record's data mappings via the {@link Calendar.akgun.cal.CalendarMappings CalendarMappings} object
 * you may need to set the values using this alternate syntax to ensure that the fields match up correctly:<pre><code>
var M = Calendar.akgun.cal.CalendarMappings;

rec = new Calendar.akgun.cal.CalendarRecord();
rec.data[M.CalendarId.name] = 5;
rec.data[M.Title.name] = 'My Holidays';
rec.data[M.Description.name] = 'My personal holiday schedule';
rec.data[M.ColorId.name] = 3;
</code></pre>
 * @constructor
 * @param {Object} data (Optional) An object, the properties of which provide values for the new Record's
 * fields. If not specified the {@link Ext.data.Field#defaultValue defaultValue}
 * for each field will be assigned.
 * @param {Object} id (Optional) The id of the Record. The id is used by the
 * {@link Ext.data.Store} object which owns the Record to index its collection
 * of Records (therefore this id should be unique within each store). If an
 * id is not specified a {@link #phantom}
 * Record will be created with an {@link #Record.id automatically generated id}.
 */
Calendar.akgun.cal.CalendarRecord = Ext.extend(Ext.data.Record, {
    fields: new Ext.util.MixedCollection(false, function(field){
        return field.name;
    })
});

/**
 * Reconfigures the default record definition based on the current {@link Calendar.akgun.cal.CalendarMappings CalendarMappings}
 * object. See the header documentation for {@link Calendar.akgun.cal.CalendarMappings} for complete details and 
 * examples of reconfiguring a CalendarRecord.
 * @method create
 * @static
 * @return {Function} The updated CalendarRecord constructor function
 */
Calendar.akgun.cal.CalendarRecord.reconfigure = function(){
    var C = Calendar.akgun.cal,
        M = C.CalendarMappings,
        proto = C.CalendarRecord.prototype,
        fields = [];
    
    for(prop in M){
        if(M.hasOwnProperty(prop)){
            fields.push(M[prop]);
        }
    }
    proto.fields.clear();
    for(var i = 0, len = fields.length; i < len; i++){
        proto.fields.add(new Ext.data.Field(fields[i]));
    }
    return C.CalendarRecord;
};

// Create the default definition now:
Calendar.akgun.cal.CalendarRecord.reconfigure();/* @private
 * This is an internal helper class for the calendar views and should not be overridden.
 * It is responsible for the base event rendering logic underlying all views based on a 
 * box-oriented layout that supports day spanning (MonthView, MultiWeekView, DayHeaderView).
 */
Calendar.akgun.cal.WeekEventRenderer = function(){
    
    var getEventRow = function(id, week, index){
        var indexOffset = 1; //skip row with date #'s
        var evtRow, wkRow = Ext.get(id+'-wk-'+week);
        if(wkRow){
            var table = wkRow.child('.ext-cal-evt-tbl', true);
            evtRow = table.tBodies[0].childNodes[index+indexOffset];
            if(!evtRow){
                evtRow = Ext.DomHelper.append(table.tBodies[0], '<tr></tr>');
            }
        }
        return Ext.get(evtRow);
    };
    
    return {
        render: function(o){
            var w = 0, grid = o.eventGrid, 
                dt = o.viewStart.clone(),
                eventTpl = o.tpl,
                max = o.maxEventsPerDay != undefined ? o.maxEventsPerDay : 999,
                weekCount = o.weekCount < 1 ? 6 : o.weekCount,
                dayCount = o.weekCount == 1 ? o.dayCount : 7;
            
            for(; w < weekCount; w++){
                var row, d = 0, wk = grid[w];
                var startOfWeek = dt.clone();
                var endOfWeek = startOfWeek.add(Date.DAY, dayCount).add(Date.MILLI, -1);
                
                for(; d < dayCount; d++){
                    if(wk && wk[d]){
                        var ev = emptyCells = skipped = 0, 
                            day = wk[d], ct = day.length, evt;
                        
                        for(; ev < ct; ev++){
                            if(!day[ev]){
                                emptyCells++;
                                continue;
                            }
                            if(emptyCells > 0 && ev-emptyCells < max){
                                row = getEventRow(o.id, w, ev-emptyCells);
                                var cellCfg = {
                                    tag: 'td',
                                    cls: 'ext-cal-ev',
                                    html: '&#160;',
                                    id: o.id+'-empty-'+ct+'-day-'+dt.format('Ymd')
                                }
                                if(emptyCells > 1 && max-ev > emptyCells){
                                    cellCfg.rowspan = Math.min(emptyCells, max-ev);
                                }
                                Ext.DomHelper.append(row, cellCfg);
                                emptyCells = 0;
                            }
                            
                            if(ev >= max){
                                skipped++;
                                continue;
                            }
                            evt = day[ev];
                            
                            if(!evt.isSpan || evt.isSpanStart){ //skip non-starting span cells
                                var item = evt.data || evt.event.data;
                                item._weekIndex = w;
                                item._renderAsAllDay = item[Calendar.akgun.cal.EventMappings.IsAllDay.name] || evt.isSpanStart;
                                item.spanLeft = item[Calendar.akgun.cal.EventMappings.StartDate.name].getTime() < startOfWeek.getTime();
                                item.spanRight = item[Calendar.akgun.cal.EventMappings.EndDate.name].getTime() > endOfWeek.getTime();
                                item.spanCls = (item.spanLeft ? (item.spanRight ? 'ext-cal-ev-spanboth' : 
                                    'ext-cal-ev-spanleft') : (item.spanRight ? 'ext-cal-ev-spanright' : ''));
                                        
                                var row = getEventRow(o.id, w, ev),
                                    cellCfg = {
                                        tag: 'td',
                                        cls: 'ext-cal-ev',
                                        cn : eventTpl.apply(o.templateDataFn(item))
                                    },
                                    diff = Calendar.akgun.Date.diffDays(dt, item[Calendar.akgun.cal.EventMappings.EndDate.name]) + 1,
                                    cspan = Math.min(diff, dayCount-d);
                                    
                                if(cspan > 1){
                                    cellCfg.colspan = cspan;
                                }
                                Ext.DomHelper.append(row, cellCfg);
                            }
                        }
                        if(ev > max){
                            row = getEventRow(o.id, w, max);
                            Ext.DomHelper.append(row, {
                                tag: 'td',
                                cls: 'ext-cal-ev-more',
                                id: 'ext-cal-ev-more-'+dt.format('Ymd'),
                                cn: {
                                    tag: 'a',
                                    html: String.format(o.moreText, skipped)
                                }
                            });
                        }
                        if(ct < o.evtMaxCount[w]){
                            row = getEventRow(o.id, w, ct);
                            if(row){
                                var cellCfg = {
                                    tag: 'td',
                                    cls: 'ext-cal-ev',
                                    //html: '&#160;',
                                    id: o.id+'-empty-'+(ct+1)+'-day-'+dt.format('Ymd')
                                };
                                var rowspan = o.evtMaxCount[w] - ct;
                                if(rowspan > 1){
                                    cellCfg.rowspan = rowspan;
                                }
                                Ext.DomHelper.append(row, cellCfg);
                            }
                        }
                    }else{
                        row = getEventRow(o.id, w, 0);
                        if(row){
                            var cellCfg = {
                                tag: 'td',
                                cls: 'ext-cal-ev',
                                html: '&#160;',
                                id: o.id+'-empty-day-'+dt.format('Ymd')
                            };
                            if(o.evtMaxCount[w] > 1){
                                cellCfg.rowspan = o.evtMaxCount[w];
                            }
                            Ext.DomHelper.append(row, cellCfg);
                        }
                    }
                    dt = dt.add(Date.DAY, 1);
                }
            }
        }
    };
}();
/**
 * @class Calendar.akgun.cal.CalendarCombo
 * @extends Ext.form.ComboBox
 * <p>A custom combo used for choosing from the list of available calendars to assign an event to. You must
 * pass a populated calendar store as the store config or the combo will not work.</p>
 * <p>This is pretty much a standard combo that is simply pre-configured for the options needed by the
 * calendar components. The default configs are as follows:<pre><code>
fieldLabel: 'Calendar',
triggerAction: 'all',
mode: 'local',
forceSelection: true,
width: 200
</code></pre>
 * @constructor
 * @param {Object} config The config object
 */
Calendar.akgun.cal.CalendarCombo = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'Calendar',
    triggerAction: 'all',
    mode: 'local',
    forceSelection: true,
    selectOnFocus: true,
    width: 200,
    
    // private
    defaultCls: 'x-cal-default',
    
    // private
    initComponent: function(){
        var C = Calendar.akgun.cal,
            M = C.CalendarMappings;
        
        C.CalendarCombo.superclass.initComponent.call(this);
        
        this.valueField = M.CalendarId.name;
        this.displayField = M.Title.name;
        
        this.tpl = this.tpl ||
              '<tpl for="."><div class="x-combo-list-item x-cal-{' + M.ColorId.name +
              '}"><div class="ext-cal-picker-icon">&#160;</div>{' + this.displayField + '}</div></tpl>';
    },
    
    // private
    afterRender: function(){
        Calendar.akgun.cal.CalendarCombo.superclass.afterRender.call(this);
        
        this.wrap = this.el.up('.x-form-field-wrap');
        this.wrap.addClass('ext-calendar-picker');
        
        this.icon = Ext.DomHelper.append(this.wrap, {
            tag: 'div', cls: 'ext-cal-picker-icon ext-cal-picker-mainicon'
        });
    },
    
    // private
    assertValue  : function(){
        var val = this.getRawValue(),
            rec = this.findRecord(this.displayField, val);

        if(!rec && this.forceSelection){
            if(val.length > 0 && val != this.emptyText){
                // Override this method simply to fix the original logic that was here.
                // The orignal method simply reverts the displayed text but the store remains
                // filtered with the invalid query, meaning it contains no records. This causes
                // problems with redisplaying the field -- much better to clear the filter and
                // reset the original value so everything works as expected.
                this.store.clearFilter();
                this.setValue(this.value);
                this.applyEmptyText();
            }else{
                this.clearValue();
            }
        }else{
            if(rec){
                if (val == rec.get(this.displayField) && this.value == rec.get(this.valueField)){
                    return;
                }
                val = rec.get(this.valueField || this.displayField);
            }
            this.setValue(val);
        }
    },
    
    // private
    getStyleClass: function(calendarId){
        if(calendarId && calendarId !== ''){
            var rec = this.store.getById(calendarId);
            return 'x-cal-' + rec.data[Calendar.akgun.cal.CalendarMappings.ColorId.name];
        }
    },
    
    // inherited docs
    setValue: function(value) {
        this.wrap.removeClass(this.getStyleClass(this.getValue()));
        value = value || this.store.getAt(0).data[Calendar.akgun.cal.CalendarMappings.CalendarId.name];
        Calendar.akgun.cal.CalendarCombo.superclass.setValue.call(this, value);
        this.wrap.addClass(this.getStyleClass(value));
    }
});

Ext.reg('extensible.calendarcombo', Calendar.akgun.cal.CalendarCombo);
/* @private
 * Currently not used
 */
Calendar.akgun.cal.RecurrenceCombo = Ext.extend(Ext.form.ComboBox, {
    width: 160,
    fieldLabel: 'Repeats',
    mode: 'local',
    triggerAction: 'all',
    forceSelection: true,
    displayField: 'pattern',
    valueField: 'id',
    
    recurrenceText: {
        none: 'Does not repeat',
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        yearly: 'Yearly'
    },
    
    initComponent: function(){
        Calendar.akgun.cal.RecurrenceCombo.superclass.initComponent.call(this);
        
        this.addEvents('recurrencechange');
        
        this.store = this.store || new Ext.data.ArrayStore({
            fields: ['id', 'pattern'],
            idIndex: 0,
            data: [
                ['NONE', this.recurrenceText.none],
                ['DAILY', this.recurrenceText.daily],
                ['WEEKLY', this.recurrenceText.weekly],
                ['MONTHLY', this.recurrenceText.monthly],
                ['YEARLY', this.recurrenceText.yearly]
            ]
        });
    },
    
    initValue : function(){
        Calendar.akgun.cal.RecurrenceCombo.superclass.initValue.call(this);
        if(this.value != undefined){
            this.fireEvent('recurrencechange', this.value);
        }
    },
    
    setValue : function(v){
        var old = this.value;
        Calendar.akgun.cal.RecurrenceCombo.superclass.setValue.call(this, v);
        if(old != v){
            this.fireEvent('recurrencechange', v);
        }
        return this;
    }
});

Ext.reg('extensible.recurrencecombo', Calendar.akgun.cal.RecurrenceCombo);
/* @private
 * Currently not used
 * Rrule info: http://www.kanzaki.com/docs/ical/rrule.html
 */
Calendar.akgun.cal.RecurrenceField = Ext.extend(Ext.form.Field, {
    
    fieldLabel: 'Repeats',
    startDate: new Date().clearTime(),
    enableFx: true,
    
    initComponent : function(){
        Calendar.akgun.cal.RecurrenceField.superclass.initComponent.call(this);
        if(!this.height){
            this.autoHeight = true;
        }
    },
    
    onRender: function(ct, position){
        if(!this.el){
            this.frequencyCombo = new Calendar.akgun.cal.RecurrenceCombo({
                id: this.id+'-frequency',
                listeners: {
                    'recurrencechange': {
                        fn: this.showOptions,
                        scope: this
                    }
                }
            });
            if(this.fieldLabel){
                this.frequencyCombo.fieldLabel = this.fieldLabel;
            }
            
            this.innerCt = new Ext.Container({
                cls: 'extensible-recur-inner-ct',
                items: []
            });
            this.fieldCt = new Ext.Container({
                autoEl: {id:this.id}, //make sure the container el has the field's id
                cls: 'extensible-recur-ct',
                renderTo: ct,
                items: [this.frequencyCombo, this.innerCt]
            });
            
            this.fieldCt.ownerCt = this;
            this.innerCt.ownerCt = this.fieldCt;
            this.el = this.fieldCt.getEl();
            this.items = new Ext.util.MixedCollection();
            this.items.addAll(this.initSubComponents());
        }
        Calendar.akgun.cal.RecurrenceField.superclass.onRender.call(this, ct, position);
    },
    
//    afterRender : function(){
//        Calendar.akgun.cal.RecurrenceField.superclass.afterRender.call(this);
//        this.setStartDate(this.startDate);
//    },
    
    // private
    initValue : function(){
        this.setStartDate(this.startDate);
        
        if(this.value !== undefined){
            this.setValue(this.value);
        }
        else if(this.frequency !== undefined){
            this.setValue('FREQ='+this.frequency);
        }
        else{
            this.setValue('NONE');
        }
        this.originalValue = this.getValue();
    },
    
    showOptions : function(o){
        var layoutChanged = false, unit = 'day';
        
        if(o != 'NONE'){
            this.hideSubPanels();
        }
        this.frequency = o;
        
        switch(o){
            case 'DAILY':
                layoutChanged = this.showSubPanel(this.repeatEvery);
                layoutChanged |= this.showSubPanel(this.until);
                break;
                
            case 'WEEKLY':
                layoutChanged = this.showSubPanel(this.repeatEvery);
                layoutChanged |= this.showSubPanel(this.weekly);
                layoutChanged |= this.showSubPanel(this.until);
                unit = 'week';
                break;
                
            case 'MONTHLY':
                layoutChanged = this.showSubPanel(this.repeatEvery);
                layoutChanged |= this.showSubPanel(this.monthly);
                layoutChanged |= this.showSubPanel(this.until);
                unit = 'month';
                break;
                
            case 'YEARLY':
                layoutChanged = this.showSubPanel(this.repeatEvery);
                layoutChanged |= this.showSubPanel(this.yearly);
                layoutChanged |= this.showSubPanel(this.until);
                unit = 'year';
                break;
            
            default:
                // case NONE
                this.hideInnerCt();
                return; 
        }
        
        if(layoutChanged){
            this.innerCt.doLayout();
        }
        
        this.showInnerCt();
        this.repeatEvery.updateLabel(unit);
    },
    
    showSubPanel : function(p){
        if (p.rendered) {
            p.show();
            return false;
        }
        else{
            if(this.repeatEvery.rendered){
                // make sure weekly/monthly options show in the middle
                p = this.innerCt.insert(1, p);
            }
            else{
                p = this.innerCt.add(p);
            }
            p.show();
            return true;
        }
    },
    
    showInnerCt: function(){
        if(!this.innerCt.isVisible()){
            if(this.enableFx && Ext.enableFx){
                this.innerCt.getPositionEl().slideIn('t', {
                    duration: .3
                });
            }
            else{
                this.innerCt.show();
            }
        }
    },
    
    hideInnerCt: function(){
        if(this.innerCt.isVisible()){
            if(this.enableFx && Ext.enableFx){
                this.innerCt.getPositionEl().slideOut('t', {
                    duration: .3,
                    easing: 'easeIn',
                    callback: this.hideSubPanels,
                    scope: this
                });
            }
            else{
                this.innerCt.hide();
                this.hideSubPanels();
            }
        }
    },
    
    setStartDate : function(dt){
        this.items.each(function(p){
            p.setStartDate(dt);
        });
    },
    
    getValue : function(){
        if(!this.rendered) {
            return this.value;
        }
        if(this.frequency=='NONE'){
            return '';
        }
        var value = 'FREQ='+this.frequency;
        this.items.each(function(p){
            if(p.isVisible()){
                value += p.getValue();
            }
        });
        return value;
    },
    
    setValue : function(v){
        this.value = v;
        
        if(v == null || v == '' || v == 'NONE'){
            this.frequencyCombo.setValue('NONE');
            this.showOptions('NONE');
            return this;
        }
        var parts = v.split(';');
        this.items.each(function(p){
            p.setValue(parts);
        });
        Ext.each(parts, function(p){
            if(p.indexOf('FREQ') > -1){
                var freq = p.split('=')[1];
                this.frequencyCombo.setValue(freq);
                this.showOptions(freq);
                return;
            }
        }, this);
        
        return this;
    },
    
    hideSubPanels : function(){
        this.items.each(function(p){
            p.hide();
        });
    },
    
    initSubComponents : function(){
        Calendar.akgun.cal.recurrenceBase = Ext.extend(Ext.Container, {
            fieldLabel: ' ',
            labelSeparator: '',
            layout: 'table',
            anchor: '100%',
            startDate: this.startDate,

            //TODO: This is not I18N-able:
            getSuffix : function(n){
                if(!Ext.isNumber(n)){
                    return '';
                }
                switch (n) {
                    case 1:
                    case 21:
                    case 31:
                        return "st";
                    case 2:
                    case 22:
                        return "nd";
                    case 3:
                    case 23:
                        return "rd";
                    default:
                        return "th";
                }
            },
            
            //shared by monthly and yearly components:
            initNthCombo: function(cbo){
                var cbo = Ext.getCmp(this.id+'-combo'),
                    dt = this.startDate,
                    store = cbo.getStore(),
                    last = dt.getLastDateOfMonth().getDate(),
                    dayNum = dt.getDate(),
                    nthDate = dt.format('jS') + ' day',
                    isYearly = this.id.indexOf('-yearly') > -1,
                    yearlyText = ' in ' + dt.format('F'),
                    nthDayNum, nthDay, lastDay, lastDate, idx, data, s;
                    
                nthDayNum = Math.ceil(dayNum / 7);
                nthDay = nthDayNum + this.getSuffix(nthDayNum) + dt.format(' l');
                if(isYearly){
                    nthDate += yearlyText;
                    nthDay += yearlyText;
                }
                data = [[nthDate],[nthDay]];
                
                s = isYearly ? yearlyText : '';
                if(last-dayNum < 7){
                    data.push(['last '+dt.format('l')+s]);
                }
                if(last == dayNum){
                    data.push(['last day'+s]);
                }
                
                idx = store.find('field1', cbo.getValue());
                store.removeAll();
                cbo.clearValue();
                store.loadData(data);
                
                if(idx > data.length-1){
                    idx = data.length-1;
                }
                cbo.setValue(store.getAt(idx > -1 ? idx : 0).data.field1);
                return this;
            },
            setValue:Ext.emptyFn
        });
        
        this.repeatEvery = new Calendar.akgun.cal.recurrenceBase({
            id: this.id+'-every',
            layoutConfig: {
                columns: 3
            },
            items: [{
                xtype: 'label',
                text: 'Repeat every'
            },{
                xtype: 'numberfield',
                id: this.id+'-every-num',
                value: 1,
                width: 35,
                minValue: 1,
                maxValue: 99,
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    'keyup': {
                        fn: function(){
                            this.repeatEvery.updateLabel();
                        },
                        scope: this
                    }
                }
            },{
                xtype: 'label',
                id: this.id+'-every-label'
            }],
            setStartDate: function(dt){
                this.startDate = dt;
                this.updateLabel();
                return this;
            },
            getValue: function(){
                var v = Ext.getCmp(this.id+'-num').getValue();
                return v > 1 ? ';INTERVAL='+v : '';
            },
            setValue : function(v){
                var set = false, 
                    parts = Ext.isArray(v) ? v : v.split(';');
                
                Ext.each(parts, function(p){
                    if(p.indexOf('INTERVAL') > -1){
                        var interval = p.split('=')[1];
                        Ext.getCmp(this.id+'-num').setValue(interval);
                    }
                }, this);
                return this;
            },
            updateLabel: function(type){
                if(this.rendered){
                    var s = Ext.getCmp(this.id+'-num').getValue() == 1 ? '' : 's';
                    this.type = type ? type.toLowerCase() : this.type || 'day';
                    var lbl = Ext.getCmp(this.id+'-label');
                    if(lbl.rendered){
                        lbl.update(this.type + s + ' beginning ' + this.startDate.format('l, F j'));
                    }
                }
                return this;
            },
            afterRender: function(){
                Calendar.akgun.cal.recurrenceBase.superclass.afterRender.call(this);
                this.updateLabel();
            }
        });
            
        this.weekly = new Calendar.akgun.cal.recurrenceBase({
            id: this.id+'-weekly',
            layoutConfig: {
                columns: 2
            },
            items: [{
                xtype: 'label',
                text: 'on:'
            },{
                xtype: 'checkboxgroup',
                id: this.id+'-weekly-days',
                items: [
                    {boxLabel: 'Sun', name: 'SU', id: this.id+'-weekly-SU'},
                    {boxLabel: 'Mon', name: 'MO', id: this.id+'-weekly-MO'},
                    {boxLabel: 'Tue', name: 'TU', id: this.id+'-weekly-TU'},
                    {boxLabel: 'Wed', name: 'WE', id: this.id+'-weekly-WE'},
                    {boxLabel: 'Thu', name: 'TH', id: this.id+'-weekly-TH'},
                    {boxLabel: 'Fri', name: 'FR', id: this.id+'-weekly-FR'},
                    {boxLabel: 'Sat', name: 'SA', id: this.id+'-weekly-SA'}
                ]
            }],
            setStartDate: function(dt){
                this.startDate = dt;
                this.selectToday();
                return this;
            },
            selectToday: function(){
                this.clearValue();
                var day = this.startDate.format('D').substring(0,2).toUpperCase();
                Ext.getCmp(this.id + '-days').setValue(day, true);
            },
            clearValue: function(){
                Ext.getCmp(this.id + '-days').setValue([false, false, false, false, false, false, false]);
            },
            getValue: function(){
                var v = '', sel = Ext.getCmp(this.id+'-days').getValue();
                Ext.each(sel, function(chk){
                    if(v.length > 0){
                        v += ',';
                    }
                    v += chk.name;
                });
                var day = this.startDate.format('D').substring(0,2).toUpperCase();
                return v.length > 0 && v != day ? ';BYDAY='+v : '';
            },
            setValue : function(v){
                var set = false, 
                    parts = Ext.isArray(v) ? v : v.split(';');
                
                this.clearValue();
                
                Ext.each(parts, function(p){
                    if(p.indexOf('BYDAY') > -1){
                        var days = p.split('=')[1].split(','),
                            vals = {};
                            
                        Ext.each(days, function(d){
                            vals[d] = true;
                        }, this);
                        
                        Ext.getCmp(this.id+'-days').setValue(vals);
                        return set = true;
                    }
                }, this);
                
                if(!set){
                    this.selectToday();
                }
                return this;
            }
        });
            
        this.monthly = new Calendar.akgun.cal.recurrenceBase({
            id: this.id+'-monthly',
            layoutConfig: {
                columns: 3
            },
            items: [{
                xtype: 'label',
                text: 'on the'
            },{
                xtype: 'combo',
                id: this.id+'-monthly-combo',
                mode: 'local',
                width: 150,
                triggerAction: 'all',
                forceSelection: true,
                store: []
            },{
                xtype: 'label',
                text: 'of each month'
            }],
            setStartDate: function(dt){
                this.startDate = dt;
                this.initNthCombo();
                return this;
            },
            getValue: function(){
                var cbo = Ext.getCmp(this.id+'-combo'),
                    store = cbo.getStore(),
                    idx = store.find('field1', cbo.getValue()),
                    dt = this.startDate,
                    day = dt.format('D').substring(0,2).toUpperCase();
                
                if (idx > -1) {
                    switch(idx){
                        case 0:  return ';BYMONTHDAY='+dt.format('j');
                        case 1:  return ';BYDAY='+cbo.getValue()[0].substring(0,1)+day;
                        case 2:  return ';BYDAY=-1'+day;
                        default: return ';BYMONTHDAY=-1';
                    }
                }
                return '';
            }
        });
            
        this.yearly = new Calendar.akgun.cal.recurrenceBase({
            id: this.id+'-yearly',
            layoutConfig: {
                columns: 3
            },
            items: [{
                xtype: 'label',
                text: 'on the'
            },{
                xtype: 'combo',
                id: this.id+'-yearly-combo',
                mode: 'local',
                width: 170,
                triggerAction: 'all',
                forceSelection: true,
                store: []
            },{
                xtype: 'label',
                text: 'each year'
            }],
            setStartDate: function(dt){
                this.startDate = dt;
                this.initNthCombo();
                return this;
            },
            getValue: function(){
                var cbo = Ext.getCmp(this.id+'-combo'),
                    store = cbo.getStore(),
                    idx = store.find('field1', cbo.getValue()),
                    dt = this.startDate,
                    day = dt.format('D').substring(0,2).toUpperCase(),
                    byMonth = ';BYMONTH='+dt.format('n');
                
                if(idx > -1){
                    switch(idx){
                        case 0:  return byMonth;
                        case 1:  return byMonth+';BYDAY='+cbo.getValue()[0].substring(0,1)+day;
                        case 2:  return byMonth+';BYDAY=-1'+day;
                        default: return byMonth+';BYMONTHDAY=-1';
                    }
                }
                return '';
            }
        });
            
        this.until = new Calendar.akgun.cal.recurrenceBase({
            id: this.id+'-until',
            untilDateFormat: 'Ymd\\T000000\\Z',
            layoutConfig: {
                columns: 5
            },
            items: [{
                xtype: 'label',
                text: 'and continuing'
            },{
                xtype: 'combo',
                id: this.id+'-until-combo',
                mode: 'local',
                width: 85,
                triggerAction: 'all',
                forceSelection: true,
                value: 'forever',
                store: ['forever', 'for', 'until'],
                listeners: {
                    'select': {
                        fn: function(cbo, rec){
                            var dt = Ext.getCmp(this.id+'-until-date');
                            if(rec.data.field1 == 'until'){
                                dt.show();
                                if (dt.getValue() == '') {
                                    dt.setValue(this.startDate.add(Date.DAY, 5));
                                    dt.setMinValue(this.startDate.clone().add(Date.DAY, 1));
                                }
                            }
                            else{
                                dt.hide();
                            }
                            if(rec.data.field1 == 'for'){
                                Ext.getCmp(this.id+'-until-num').show();
                                Ext.getCmp(this.id+'-until-endlabel').show();
                            }
                            else{
                                Ext.getCmp(this.id+'-until-num').hide();
                                Ext.getCmp(this.id+'-until-endlabel').hide();
                            }
                        },
                        scope: this
                    }
                }
            },{
                xtype: 'datefield',
                id: this.id+'-until-date',
                showToday: false,
                hidden: true
            },{
                xtype: 'numberfield',
                id: this.id+'-until-num',
                value: 5,
                width: 35,
                minValue: 1,
                maxValue: 99,
                allowBlank: false,
                hidden: true
            },{
                xtype: 'label',
                id: this.id+'-until-endlabel',
                text: 'occurrences',
                hidden: true
            }],
            setStartDate: function(dt){
                this.startDate = dt;
                return this;
            },
            getValue: function(){
                var dt = Ext.getCmp(this.id+'-date');
                if(dt.isVisible()){
                    return ';UNTIL='+dt.getValue().format(this.untilDateFormat);
                }
                var ct = Ext.getCmp(this.id+'-num');
                if(ct.isVisible()){
                    return ';COUNT='+ct.getValue();
                }
                return '';
            },
            setValue : function(v){
                var set = false, 
                    parts = Ext.isArray(v) ? v : v.split(';');
                
                Ext.each(parts, function(p){
                    if(p.indexOf('COUNT') > -1){
                        var count = p.split('=')[1];
                        Ext.getCmp(this.id+'-combo').setValue('for');
                        Ext.getCmp(this.id+'-num').setValue(count).show();
                        Ext.getCmp(this.id+'-endlabel').show();
                    }
                    else if(p.indexOf('UNTIL') > -1){
                        var dt = p.split('=')[1];
                        Ext.getCmp(this.id+'-combo').setValue('until');
                        Ext.getCmp(this.id+'-date').setValue(Date.parseDate(dt, this.untilDateFormat)).show();
                        Ext.getCmp(this.id+'-endlabel').hide();
                    }
                }, this);
                return this;
            }
        });
        
        return [this.repeatEvery, this.weekly, this.monthly, this.yearly, this.until];
    }
});

Ext.reg('extensible.recurrencefield', Calendar.akgun.cal.RecurrenceField);
/**
 * @class Calendar.akgun.cal.DateRangeField
 * @extends Ext.form.Field
 * <p>A combination field that includes start and end dates and times, as well as an optional all-day checkbox.</p>
 * @constructor
 * @param {Object} config The config object
 */
Calendar.akgun.cal.DateRangeField = Ext.extend(Ext.form.Field, {
    /**
     * @cfg {String} toText
     * The text to display in between the date/time fields (defaults to 'to')
     */
    toText: 'to',
    /**
     * @cfg {String} allDayText
     * The text to display as the label for the all day checkbox (defaults to 'All day')
     */
    allDayText: 'All day',
    /**
     * @cfg {String/Boolean} singleLine
     * This value can be set explicitly to <code>true</code> or <code>false</code> to force the field to render on
     * one line or two lines respectively.  The default value is <code>'auto'</code> which means that the field will
     * calculate its container's width and compare it to {@link singleLineMinWidth} to determine whether to render 
     * on one line or two automatically.  Note that this only applies at render time -- once the field is rendered
     * the layout cannot be changed.
     */
    singleLine: 'auto',
    /**
     * @cfg {Number} singleLineMinWidth
     * If {@link singleLine} is set to 'auto' it will use this value to determine whether to render the field on one
     * line or two. This value is the approximate minimum width required to render the field on a single line, so if
     * the field's container is narrower than this value it will automatically be rendered on two lines.
     */
    singleLineMinWidth: 490,
    /**
     * @cfg {String} dateFormat
     * The date display format used by the date fields (defaults to 'n/j/Y') 
     */
    dateFormat: 'n/j/Y',
    
    // private
    onRender: function(ct, position){
        if(!this.el){
            this.startDate = new Ext.form.DateField({
                id: this.id+'-start-date',
                format: this.dateFormat,
                width:100,
                listeners: {
                    'change': {
                        fn: function(){
                            this.onFieldChange('date', 'start');
                        },
                        scope: this
                    }
                }
            });
            this.startTime = new Ext.form.TimeField({
                id: this.id+'-start-time',
                hidden: this.showTimes === false,
                labelWidth: 0,
                hideLabel:true,
                increment:5,
                width:90,
                listeners: {
                    'select': {
                        fn: function(){
                            this.onFieldChange('time', 'start');
                        },
                        scope: this
                    }
                }
            });
            this.endTime = new Ext.form.TimeField({
                id: this.id+'-end-time',
                hidden: this.showTimes === false,
                labelWidth: 0,
                hideLabel:true,
                increment:5,
                width:90,
                listeners: {
                    'select': {
                        fn: function(){
                            this.onFieldChange('time', 'end');
                        },
                        scope: this
                    }
                }
            })
            this.endDate = new Ext.form.DateField({
                id: this.id+'-end-date',
                format: this.dateFormat,
                hideLabel:true,
                width:100,
                listeners: {
                    'change': {
                        fn: function(){
                            this.onFieldChange('date', 'end');
                        },
                        scope: this
                    }
                }
            });
            this.allDay = new Ext.form.Checkbox({
                id: this.id+'-allday',
                hidden: this.showTimes === false || this.showAllDay === false,
                boxLabel: this.allDayText,
                handler: function(chk, checked){
                    this.startTime.setVisible(!checked);
                    this.endTime.setVisible(!checked);
                },
                scope: this
            });
            this.toLabel = new Ext.form.Label({
                xtype: 'label',
                id: this.id+'-to-label',
                text: this.toText
            });
            
            var singleLine = this.singleLine;
            if(singleLine == 'auto'){
                var el, w = this.ownerCt.getWidth() - this.ownerCt.getEl().getPadding('lr');
                if(el = this.ownerCt.getEl().child('.x-panel-body')){
                    w -= el.getPadding('lr');
                }
                if(el = this.ownerCt.getEl().child('.x-form-item-label')){
                    w -= el.getWidth() - el.getPadding('lr');
                }
                singleLine = w <= this.singleLineMinWidth ? false : true;
            }
            
            this.fieldCt = new Ext.Container({
                autoEl: {id:this.id}, //make sure the container el has the field's id
                cls: 'ext-dt-range',
                renderTo: ct,
                layout: 'table',
                layoutConfig: {
                    columns: singleLine ? 6 : 3
                },
                defaults: {
                    hideParent: true
                },
                items:[
                    this.startDate,
                    this.startTime,
                    this.toLabel,
                    singleLine ? this.endTime : this.endDate,
                    singleLine ? this.endDate : this.endTime,
                    this.allDay
                ]
            });
            
            this.fieldCt.ownerCt = this;
            this.el = this.fieldCt.getEl();
            this.items = new Ext.util.MixedCollection();
            this.items.addAll([this.startDate, this.endDate, this.toLabel, this.startTime, this.endTime, this.allDay]);
        }
        
        Calendar.akgun.cal.DateRangeField.superclass.onRender.call(this, ct, position);
        
        if(!singleLine){
            this.el.child('tr').addClass('ext-dt-range-row1');
        }
    },

    // private
    onFieldChange: function(type, startend){
        this.checkDates(type, startend);
        this.fireEvent('change', this, this.getValue());
    },
        
    // private
    checkDates: function(type, startend){
        var startField = Ext.getCmp(this.id+'-start-'+type),
            endField = Ext.getCmp(this.id+'-end-'+type),
            startValue = this.getDT('start'),
            endValue = this.getDT('end');

        if(startValue > endValue){
            if(startend=='start'){
                endField.setValue(startValue);
            }else{
                startField.setValue(endValue);
                this.checkDates(type, 'start');
            }
        }
        if(type=='date'){
            this.checkDates('time', startend);
        }
    },
    
    /**
     * Returns an array containing the following values in order:<div class="mdetail-params"><ul>
     * <li><b><code>DateTime</code></b> : <div class="sub-desc">The start date/time</div></li>
     * <li><b><code>DateTime</code></b> : <div class="sub-desc">The end date/time</div></li>
     * <li><b><code>Boolean</code></b> : <div class="sub-desc">True if the dates are all-day, false 
     * if the time values should be used</div></li><ul></div>
     * @return {Array} The array of return values
     */
    getValue: function(){
        return [
            this.getDT('start'), 
            this.getDT('end'),
            this.allDay.getValue()
        ];
    },
    
    // private getValue helper
    getDT: function(startend){
        var time = this[startend+'Time'].getValue(),
            dt = this[startend+'Date'].getValue();
            
        if(Ext.isDate(dt)){
            dt = dt.format(this[startend+'Date'].format);
        }
        else{
            return null;
        };
        if(time != ''){
            return Date.parseDate(dt+' '+time, this[startend+'Date'].format+' '+this[startend+'Time'].format);
        }
        return Date.parseDate(dt, this[startend+'Date'].format);
        
    },
    
    /**
     * Sets the values to use in the date range.
     * @param {Array/Date/Object} v The value(s) to set into the field. Valid types are as follows:<div class="mdetail-params"><ul>
     * <li><b><code>Array</code></b> : <div class="sub-desc">An array containing, in order, a start date, end date and all-day flag.
     * This array should exactly match the return type as specified by {@link #getValue}.</div></li>
     * <li><b><code>DateTime</code></b> : <div class="sub-desc">A single Date object, which will be used for both the start and
     * end dates in the range.  The all-day flag will be defaulted to false.</div></li>
     * <li><b><code>Object</code></b> : <div class="sub-desc">An object containing properties for StartDate, EndDate and IsAllDay
     * as defined in {@link Calendar.akgun.cal.EventMappings}.</div></li><ul></div>
     */
    setValue: function(v){
        if(Ext.isArray(v)){
            this.setDT(v[0], 'start');
            this.setDT(v[1], 'end');
            this.allDay.setValue(!!v[2]);
        }
        else if(Ext.isDate(v)){
            this.setDT(v, 'start');
            this.setDT(v, 'end');
            this.allDay.setValue(false);
        }
        else if(v[Calendar.akgun.cal.EventMappings.StartDate.name]){ //object
            this.setDT(v[Calendar.akgun.cal.EventMappings.StartDate.name], 'start');
            if(!this.setDT(v[Calendar.akgun.cal.EventMappings.EndDate.name], 'end')){
                this.setDT(v[Calendar.akgun.cal.EventMappings.StartDate.name], 'end');
            }
            this.allDay.setValue(!!v[Calendar.akgun.cal.EventMappings.IsAllDay.name]);
        }
    },
    
    // private setValue helper
    setDT: function(dt, startend){
        if(dt && Ext.isDate(dt)){
            this[startend+'Date'].setValue(dt);
            this[startend+'Time'].setValue(dt.format(this[startend+'Time'].format));
            return true;
        }
    },
    
    // inherited docs
    isDirty: function(){
        var dirty = false;
        if(this.rendered && !this.disabled) {
            this.items.each(function(item){
                if (item.isDirty()) {
                    dirty = true;
                    return false;
                }
            });
        }
        return dirty;
    },
    
    // private
    onDisable : function(){
        this.delegateFn('disable');
    },
    
    // private
    onEnable : function(){
        this.delegateFn('enable');
    },
    
    // inherited docs
    reset : function(){
        this.delegateFn('reset');
    },
    
    // private
    delegateFn : function(fn){
        this.items.each(function(item){
            if (item[fn]) {
                item[fn]();
            }
        });
    },
    
    // private
    beforeDestroy: function(){
        Ext.destroy(this.fieldCt);
        Calendar.akgun.cal.DateRangeField.superclass.beforeDestroy.call(this);
    },
    
    /**
     * @method getRawValue
     * @hide
     */
    getRawValue : Ext.emptyFn,
    /**
     * @method setRawValue
     * @hide
     */
    setRawValue : Ext.emptyFn
});

Ext.reg('extensible.daterangefield', Calendar.akgun.cal.DateRangeField);
/**
 * @class Calendar.akgun.cal.ReminderField
 * @extends Ext.form.ComboBox
 * <p>A custom combo used for choosing a reminder setting for an event.</p>
 * <p>This is pretty much a standard combo that is simply pre-configured for the options needed by the
 * calendar components. The default configs are as follows:<pre><code>
width: 200,
fieldLabel: 'Reminder',
mode: 'local',
triggerAction: 'all',
forceSelection: true,
displayField: 'desc',
valueField: 'value',
noneText: 'None',
atStartTimeText: 'At start time',
minutesText: 'minutes',
hourText: 'hour',
hoursText: 'hours',
dayText: 'day',
daysText: 'days',
weekText: 'week',
weeksText: 'weeks',
reminderValueFormat: '{0} {1} before start'
</code></pre>
 * @constructor
 * @param {Object} config The config object
 */
Calendar.akgun.cal.ReminderField = Ext.extend(Ext.form.ComboBox, {
    width: 200,
    fieldLabel: 'Reminder',
    mode: 'local',
    triggerAction: 'all',
    forceSelection: true,
    displayField: 'desc',
    valueField: 'value',
    noneText: 'None',
    atStartTimeText: 'At start time',
    minutesText: 'minutes',
    hourText: 'hour',
    hoursText: 'hours',
    dayText: 'day',
    daysText: 'days',
    weekText: 'week',
    weeksText: 'weeks',
    reminderValueFormat: '{0} {1} before start',
    
    /**
     * Returns the list of reminder values used as the contents of the combo list. This method is provided so that
     * the value list can be easily overridden as needed.
     * @return {Array} A 2-dimensional array of type [{String}, {String}] which contains the value and description
     * respectively of each item in the combo list. By default the value is the number of minutes for the selected 
     * time value (e.g., value 120 == '2 hours') with empty string for no value, but these can be set to anything.
     */
    getValueList: function(){
        return [
            ['', this.noneText],
            ['0', this.atStartTimeText],
            ['5', String.format(this.reminderValueFormat, '5', this.minutesText)],
            ['15', String.format(this.reminderValueFormat, '15', this.minutesText)],
            ['30', String.format(this.reminderValueFormat, '30', this.minutesText)],
            ['60', String.format(this.reminderValueFormat, '1', this.hourText)],
            ['90', String.format(this.reminderValueFormat, '1.5', this.hoursText)],
            ['120', String.format(this.reminderValueFormat, '2', this.hoursText)],
            ['180', String.format(this.reminderValueFormat, '3', this.hoursText)],
            ['360', String.format(this.reminderValueFormat, '6', this.hoursText)],
            ['720', String.format(this.reminderValueFormat, '12', this.hoursText)],
            ['1440', String.format(this.reminderValueFormat, '1', this.dayText)],
            ['2880', String.format(this.reminderValueFormat, '2', this.daysText)],
            ['4320', String.format(this.reminderValueFormat, '3', this.daysText)],
            ['5760', String.format(this.reminderValueFormat, '4', this.daysText)],
            ['7200', String.format(this.reminderValueFormat, '5', this.daysText)],
            ['10080', String.format(this.reminderValueFormat, '1', this.weekText)],
            ['20160', String.format(this.reminderValueFormat, '2', this.weeksText)]
        ]
    },
    
    // private
    initComponent: function(){
        Calendar.akgun.cal.ReminderField.superclass.initComponent.call(this);
        this.store = this.store || new Ext.data.ArrayStore({
            fields: [this.valueField, this.displayField],
            idIndex: 0,
            data: this.getValueList()
        });
    },
    
    // inherited docs
    initValue : function(){
        if(this.value !== undefined){
            this.setValue(this.value);
        }
        else{
            this.setValue('');
        }
        this.originalValue = this.getValue();
    }
});

Ext.reg('extensible.reminderfield', Calendar.akgun.cal.ReminderField);
/**
 * @class Calendar.akgun.cal.ColorPalette
 * @extends Ext.ColorPalette
 * Simple color palette class for choosing colors specifically for calendars. This is a lightly modified version
 * of the default Ext ColorPalette that is based on calendar ids rather than hex color codes so that the colors
 * can be easily modified via CSS and automatically applied to calendars. The specific colors used by default are
 * also chosen to provide good color contrast when displayed in calendars.
</code></pre>
 * @constructor
 * Create a new ColorPalette
 * @param {Object} config The config object
 * @xtype extensible.calendarcolorpalette
 */
Calendar.akgun.cal.ColorPalette = Ext.extend(Ext.ColorPalette, {

    // private
    colorCount: 32,
    
    /**
     * @cfg {Function} handler
     * Optional. A function that will handle the select event of this color palette.
     * The handler is passed the following parameters:<div class="mdetail-params"><ul>
     * <li><code>palette</code> : ColorPalette<div class="sub-desc">The {@link #palette Calendar.akgun.cal.ColorPalette} instance.</div></li>
     * <li><code>colorId</code> : String<div class="sub-desc">The id that identifies the selected color and relates it to a calendar.</div></li>
     * </ul></div>
     */
    
    // private
    initComponent: function(){
        Calendar.akgun.cal.ColorPalette.superclass.initComponent.call(this);
        this.addClass('x-calendar-palette');
        this.tpl = new Ext.XTemplate('<tpl for="."><a class="x-unselectable x-cal-color" id="' + this.id +
            '-color-{.}" href="#" hidefocus="on"><em><span class="x-cal-{.}">&#160;</span></em></a></tpl>');
            
        if(this.handler){
            this.on('select', this.handler, this.scope || this);
        }
        
        this.colors = [];
        for(var i=1; i<=this.colorCount; i++){
            this.colors.push(i);
        }
    },
    
    // private
    handleClick : function(e, t){
        e.preventDefault();
        var el = e.getTarget('.x-cal-color', 3, true);
        if(el){
            var id = el.id.split('-color-')[1];
            this.select(id);
        }
    },
    
    /**
     * Selects the specified color in the palette (fires the {@link #select} event)
     * @param {Number} colorId The id that identifies the selected color and relates it to a calendar
     * @param {Boolean} suppressEvent (optional) True to stop the select event from firing. Defaults to <tt>false</tt>.
     */
    select : function(colorId, suppressEvent){
        if(colorId != this.value){
            if(this.value){
                Ext.fly(this.id+'-color-'+this.value).removeClass('x-color-palette-sel');
            }
            Ext.get(this.id+'-color-'+colorId).addClass('x-color-palette-sel');
            this.value = colorId;
            
            if(suppressEvent !== true){
                this.fireEvent('select', this, colorId);
            }
        }
    }
});

Ext.reg('extensible.calendarcolorpalette', Calendar.akgun.cal.ColorPalette);
/**
 * @class Calendar.akgun.cal.CalendarListMenu
 * @extends Ext.menu.Menu
 * <p>A menu containing a {@link Calendar.akgun.cal.ColorPalette palette} for choosing calendar colors, 
 * as well as other calendar-specific options.</p>
 * @xtype extensible.calendarlistmenu
 */
Calendar.akgun.cal.CalendarListMenu = Ext.extend(Ext.menu.Menu, {
    /** 
     * @cfg {Boolean} hideOnClick
     * False to continue showing the menu after a color is selected, defaults to true.
     */
    hideOnClick : true,
    /**
     * @cfg {Boolean} ignoreParentClicks
     * True to ignore clicks on any item in this menu that is a parent item (displays a submenu) 
     * so that the submenu is not dismissed when clicking the parent item (defaults to true).
     */
    ignoreParentClicks: true,
    /**
     * @cfg {String} cls
     * An optional extra CSS class that will be added to this component's Element (defaults to 'x-calendar-list-menu'). 
     * This can be useful for adding customized styles to the component or any of its children using standard CSS rules.
     */
    cls : 'x-calendar-list-menu',
    /**
     * @cfg {String} displayOnlyThisCalendarText
     * The text to display for the 'Display only this calendar' option in the menu.
     */
    displayOnlyThisCalendarText: 'Display only this calendar',
    /**
     * @cfg {Number} calendarId
     * The id of the calendar to be associated with this menu. This calendarId will be passed
     * back with any events from this menu to identify the calendar to be acted upon. The calendar
     * id can also be changed at any time after creation by calling {@link setCalendar}.
     */
    
    /** 
     * @cfg {Boolean} enableScrolling
     * @hide 
     */
    enableScrolling : false,
    /** 
     * @cfg {Number} maxHeight
     * @hide 
     */
    /** 
     * @cfg {Number} scrollIncrement
     * @hide 
     */
    /**
     * @event click
     * @hide
     */
    /**
     * @event itemclick
     * @hide
     */
    
    /**
     * @property palette
     * @type ColorPalette
     * The {@link Calendar.akgun.cal.ColorPalette ColorPalette} instance for this CalendarListMenu
     */
    
    // private
    initComponent : function(){
        this.addEvents(
            'showcalendar',
            'hidecalendar',
            'radiocalendar',
            'colorchange'
        );
        
        Ext.apply(this, {
            items: [{
                text: this.displayOnlyThisCalendarText,
                iconCls: 'extensible-cal-icon-cal-show',
                handler: this.handleRadioCalendarClick.createDelegate(this)
            }, '-', {
                xtype: 'extensible.calendarcolorpalette',
                handler: this.handleColorSelect.createDelegate(this)
            }]
        });
        Calendar.akgun.cal.CalendarListMenu.superclass.initComponent.call(this);
    },
    
    // private
    afterRender: function(){
        Calendar.akgun.cal.CalendarListMenu.superclass.afterRender.call(this);
        this.palette = this.findByType('extensible.calendarcolorpalette')[0];
        
        if(this.colorId){
            this.palette.select(this.colorId, true);
        }
    },
    
    // private
    handleRadioCalendarClick: function(e, t){
        this.fireEvent('radiocalendar', this, this.calendarId);
    },
    
    // private
    handleColorSelect: function(cp, selColorId){
        this.fireEvent('colorchange', this, this.calendarId, selColorId, this.colorId);
        this.colorId = selColorId;
        this.menuHide();
    },
    
    /**
     * Sets the calendar id and color id to be associated with this menu. This should be called each time the
     * menu is shown relative to a new calendar.
     * @param {Number} calendarId The id of the calendar to be associated
     * @param {Number} colorId The id of the color to be pre-selected in the color palette
     * @return {Calendar.akgun.cal.CalendarListMenu} this
     */
    setCalendar: function(id, cid){
        this.calendarId = id;
        this.colorId = cid;
        
        if(this.rendered){
            this.palette.select(cid, true);
        }
        return this;
    },

    // private
    menuHide : function(){
        if(this.hideOnClick){
            this.hide(true);
        }
    }
});

Ext.reg('extensible.calendarlistmenu', Calendar.akgun.cal.CalendarListMenu);/**
 * @class Calendar.akgun.cal.EventContextMenu
 * @extends Ext.menu.Menu
 * The context menu displayed for calendar events in any {@link Calendar.akgun.cal.CalendarView CalendarView} subclass. 
 * @xtype extensible.eventcontextmenu
 */
Calendar.akgun.cal.EventContextMenu = Ext.extend(Ext.menu.Menu, {
    /** 
     * @cfg {Boolean} hideOnClick
     * False to continue showing the menu after a color is selected, defaults to true.
     */
    hideOnClick : true,
    /**
     * @cfg {Boolean} ignoreParentClicks
     * True to ignore clicks on any item in this menu that is a parent item (displays a submenu) 
     * so that the submenu is not dismissed when clicking the parent item (defaults to true).
     */
    ignoreParentClicks: true,
    /**
     * @cfg {String} editDetailsText
     * The text to display for the 'Edit Details' option in the menu.
     */
    editDetailsText: 'Edit Details',
    /**
     * @cfg {String} deleteText
     * The text to display for the 'Delete' option in the menu.
     */
    deleteText: 'Delete',
    /**
     * @cfg {String} moveToText
     * The text to display for the 'Move to...' option in the menu.
     */
    moveToText: 'Move to...',
    
    /** 
     * @cfg {Boolean} enableScrolling
     * @hide 
     */
    enableScrolling : false,
    /** 
     * @cfg {Number} maxHeight
     * @hide 
     */
    /** 
     * @cfg {Number} scrollIncrement
     * @hide 
     */
    /**
     * @event click
     * @hide
     */
    /**
     * @event itemclick
     * @hide
     */
    
    // private
    initComponent : function(){
        this.addEvents(
            /**
             * @event editdetails
             * Fires when the user selects the option to edit the event details
             * (by default, in an instance of {@link Calendar.akgun.cal.EventEditForm}. Handling code should 
             * transfer the current event record to the appropriate instance of the detailed form by showing
             * the form and calling {@link Calendar.akgun.cal.EventEditForm#loadRecord loadRecord}.
             * @param {Calendar.akgun.cal.EventContextMenu} this
             * @param {Calendar.akgun.cal.EventRecord} rec The {@link Calendar.akgun.cal.EventRecord record} that is currently being edited
             * @param {Ext.Element} el The element associated with this context menu
             */
            'editdetails',
            /**
             * @event eventdelete
             * Fires after the user selectes the option to delete an event. Note that this menu does not actually
             * delete the event from the data store. This is simply a notification that the menu option was selected --
             * it is the responsibility of handling code to perform the deletion and any clean up required.
             * @param {Calendar.akgun.cal.EventContextMenu} this
             * @param {Calendar.akgun.cal.EventRecord} rec The {@link Calendar.akgun.cal.EventRecord record} for the event to be deleted
             * @param {Ext.Element} el The element associated with this context menu
             */
            'eventdelete',
            /**
             * @event eventmove
             * Fires after the user selects a date in the calendar picker under the "move event" menu option. Note that this menu does not actually
             * update the event in the data store. This is simply a notification that the menu option was selected --
             * it is the responsibility of handling code to perform the move action and any clean up required.
             * @param {Calendar.akgun.cal.EventContextMenu} this
             * @param {Calendar.akgun.cal.EventRecord} rec The {@link Calendar.akgun.cal.EventRecord record} for the event to be moved
             * @param {Date} dt The new start date for the event (the existing event start time will be preserved)
             */
            'eventmove'
        );
        this.buildMenu();
        Calendar.akgun.cal.CalendarListMenu.superclass.initComponent.call(this);
    },
    
    // private
    buildMenu: function(){
        this.dateMenu = new Ext.menu.DateMenu({
            scope: this,
            handler: function(dp, dt){
                dt = Calendar.akgun.Date.copyTime(this.rec.data[Calendar.akgun.cal.EventMappings.StartDate.name], dt);
                this.fireEvent('eventmove', this, this.rec, dt);
            }
        });
        
        Ext.apply(this, {
            items: [{
                text: this.editDetailsText,
                iconCls: 'extensible-cal-icon-evt-edit',
                scope: this,
                handler: function(){
                    this.fireEvent('editdetails', this, this.rec, this.ctxEl);
                }
            },{
                text: this.deleteText,
                iconCls: 'extensible-cal-icon-evt-del',
                scope: this,
                handler: function(){
                    this.fireEvent('eventdelete', this, this.rec, this.ctxEl);
                }
            },'-',{
                text: this.moveToText,
                iconCls: 'extensible-cal-icon-evt-move',
                menu: this.dateMenu
            }]
        });
    },
    
    /**
     * Shows the specified event at the given XY position. 
     * @param {Calendar.akgun.cal.EventRecord} rec The {@link Calendar.akgun.cal.EventRecord record} for the event
     * @param {Ext.Element} el The element associated with this context menu
     * @param {Array} xy The X & Y [x, y] values for the position at which to show the menu (coordinates are page-based) 
     */
    showForEvent: function(rec, el, xy){
        this.rec = rec;
        this.ctxEl = el;
        this.dateMenu.picker.setValue(rec.data[Calendar.akgun.cal.EventMappings.StartDate.name]);
        this.showAt(xy);
    },
    
    // private
    onHide : function(){
        Calendar.akgun.cal.CalendarListMenu.superclass.onHide.call(this);
        delete this.ctxEl;
    }
});

Ext.reg('extensible.eventcontextmenu', Calendar.akgun.cal.EventContextMenu);/**
 * @class Calendar.akgun.cal.CalendarList
 * @extends Ext.Panel
 * <p>This is a {@link Ext.Panel panel} subclass that renders a list of available calendars
 * @constructor
 * @param {Object} config The config object
 * @xtype calendarpanel
 */
Calendar.akgun.cal.CalendarList = Ext.extend(Ext.Panel, {
    title: 'Calendars',
    collapsible: true,
    autoHeight: true,
    layout: 'fit',
    menuSelector: 'em',
    width: 100, // this should be overridden by this container's layout
    
    /**
     * @cfg {Ext.data.Store} store
     * A {@link Ext.data.Store store} containing records of type {@link Calendar.akgun.cal.CalendarRecord CalendarRecord}.
     * This is a required config and is used to populate the calendar list.  The CalendarList widget will also listen for events from
     * the store and automatically refresh iteself in the event that the underlying calendar records in the store change.
     */
    
    // private
    initComponent: function(){
        this.addClass('x-calendar-list');
        Calendar.akgun.cal.CalendarList.superclass.initComponent.call(this);
    },
    
    // private
    afterRender : function(ct, position){
        Calendar.akgun.cal.CalendarList.superclass.afterRender.call(this);
        
        if(this.store){
            this.setStore(this.store, true);
        }
        this.refresh();
        
        this.body.on('click', this.onClick, this);
        this.body.on('mouseover', this.onMouseOver, this, {delegate: 'li'});
        this.body.on('mouseout', this.onMouseOut, this, {delegate: 'li'});
    },
    
    // private
    getListTemplate : function(){
        if(!this.tpl){
            this.tpl = !(Ext.isIE || Ext.isOpera) ? 
                new Ext.XTemplate(
                    '<ul class="x-unselectable"><tpl for=".">',
                        '<li id="{cmpId}" class="ext-cal-evr {colorCls} {hiddenCls}">{title}<em>&#160;</em></li>',
                    '</tpl></ul>'
                )
                : new Ext.XTemplate(
                    '<ul class="x-unselectable"><tpl for=".">',
                        '<li id="{cmpId}" class="ext-cal-evo {colorCls} {hiddenCls}">',
                            '<div class="ext-cal-evm">',
                                '<div class="ext-cal-evi">{title}<em>&#160;</em></div>',
                            '</div>',
                        '</li>',
                    '</tpl></ul>'
                );
            this.tpl.compile();
        }
        return this.tpl;
    },
    
    /**
     * Sets the store used to display the available calendars. It should contain 
     * records of type {@link Calendar.akgun.cal.CalendarRecord CalendarRecord}.
     * @param {Ext.data.Store} store
     */
    setStore : function(store, initial){
        if(!initial && this.store){
            this.store.un("load", this.refresh, this);
            this.store.un("add", this.refresh, this);
            this.store.un("remove", this.refresh, this);
            this.store.un("update", this.onUpdate, this);
            this.store.un("clear", this.refresh, this);
        }
        if(store){
            store.on("load", this.refresh, this);
            store.on("add", this.refresh, this);
            store.on("remove", this.refresh, this);
            store.on("update", this.onUpdate, this);
            store.on("clear", this.refresh, this);
        }
        this.store = store;
    },
    
    // private
    onUpdate : function(ds, rec, operation){
        // ignore EDIT notifications, only refresh after a commit
        if(operation == Ext.data.Record.COMMIT){
            this.refresh();
        }
    },
    
    /**
     * Refreshes the calendar list so that it displays based on the most current state of
     * the underlying calendar store. Usually this method does not need to be called directly
     * as the control is automatically bound to the store's events, but it is available in the
     * event that a manual refresh is ever needed.
     */
    refresh: function(){
        if(this.skipRefresh){
            return;
        }
        var data = [], i = 0, o = null,
            CM = Calendar.akgun.cal.CalendarMappings,
            recs = this.store.getRange(),
            len = recs.length;
            
        for(; i < len; i++){
            o = {
                cmpId: this.id + '__' + recs[i].data[CM.CalendarId.name],
                title: recs[i].data[CM.Title.name],
                colorCls: this.getColorCls(recs[i].data[CM.ColorId.name])
            };
            if(recs[i].data[CM.IsHidden.name] === true){
                o.hiddenCls = 'ext-cal-hidden';
            }
            data[data.length] = o;
        }
        this.getListTemplate().overwrite(this.body, data);
    },
    
    // private
    getColorCls: function(colorId){
        return 'x-cal-'+colorId+'-ad';
    },
    
    // private
    toggleCalendar: function(id, commit){
        var rec = this.store.getById(id),
            CM = Calendar.akgun.cal.CalendarMappings,
            isHidden = rec.data[CM.IsHidden.name]; 
        
        rec.set([CM.IsHidden.name], !isHidden);
        
        if(commit !== false){
            rec.commit();
        }
    },
    
    // private
    showCalendar: function(id, commit){
        var rec = this.store.getById(id);
        if(rec.data[Calendar.akgun.cal.CalendarMappings.IsHidden.name] === true){
            this.toggleCalendar(id, commit);
        }
    },
    
    // private
    hideCalendar: function(id, commit){
        var rec = this.store.getById(id);
        if(rec.data[Calendar.akgun.cal.CalendarMappings.IsHidden.name] !== true){
            this.toggleCalendar(id, commit);
        }
    },
    
    // private
    radioCalendar: function(id){
        var i = 0, recId,
            calendarId = Calendar.akgun.cal.CalendarMappings.CalendarId.name,
            recs = this.store.getRange(),
            len = recs.length;
            
        for(; i < len; i++){
            recId = recs[i].data[calendarId];
            // make a truthy check so that either numeric or string ids can match
            if(recId == id){
                this.showCalendar(recId, false);
            }
            else{
                this.hideCalendar(recId, false);
            }
        }
        
        // store.commitChanges() just loops over each modified record and calls rec.commit(),
        // which in turns fires an update event that would cause a full refresh for each record.
        // To avoid this we simply set a flag and make sure we only refresh once per commit set.
        this.skipRefresh = true;
        this.store.commitChanges();
        delete this.skipRefresh;
        this.refresh();
    },
    
    // private
    onMouseOver: function(e, t){
        Ext.fly(t).addClass('hover');
    },
    
    // private
    onMouseOut: function(e, t){
        Ext.fly(t).removeClass('hover');
    },
    
    // private
    getCalendarId: function(el){
        return el.id.split('__')[1];
    },
    
    // private
    getCalendarItemEl: function(calendarId){
        return Ext.get(this.id+'__'+calendarId);
    },
    
    // private
    onClick : function(e, t){
        var el;
        if(el = e.getTarget(this.menuSelector, 3, true)){
            this.showEventMenu(el, e.getXY());
        }
        else if(el = e.getTarget('li', 3, true)){
            this.toggleCalendar(this.getCalendarId(el));
        } 
    },
    
    // private
    handleColorChange: function(menu, id, colorId, origColorId){
        var rec = this.store.getById(id);
        rec.data[Calendar.akgun.cal.CalendarMappings.ColorId.name] = colorId;
        rec.commit();
    },
    
    // private
    handleRadioCalendar: function(menu, id){
        this.radioCalendar(id);
    },
    
    // private
    showEventMenu : function(el, xy){
        var id = this.getCalendarId(el.parent('li')),
            rec = this.store.getById(id),
            colorId = rec.data[Calendar.akgun.cal.CalendarMappings.ColorId.name];
            
        if(!this.menu){
            this.menu = new Calendar.akgun.cal.CalendarListMenu();
            this.menu.on('colorchange', this.handleColorChange, this);
            this.menu.on('radiocalendar', this.handleRadioCalendar, this);
        }
        this.menu.setCalendar(id, colorId);
        this.menu.showAt(xy);
    }
});

Ext.reg('extensible.calendarlist', Calendar.akgun.cal.CalendarList);

































































