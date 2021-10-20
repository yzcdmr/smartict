/**
 * @copyright (c) 2010, by Otavio Augusto R. Fernandes
 * @date      22. February 2010
 * @version   $Id: FieldGroup.js 10 2010-03-10 11:47:15Z oaugusts $
 * @required  3.2.x
 */

Ext.ns('Ext.ux.form');
/**
 * @class Ext.ux.GroupField
 * @extends Ext.Container
 * <p>A group container that group two or more fields in a single row.</p>
 *
 * <p>Example usage:</p>
 *
<pre><code>
var a = new Ext.form.FormPanel({
  width: 500,
  title: 'FieldGroup',
  autoHeight: true,
  bodyStyle: 'padding:8px',
  items:[
    {
       xtype: 'fieldgroup',
       labelWidth: 30,
       items:[
           {
               xtype: 'textfield',
               fieldLabel: 'Nick',
               flex: 1
           },
           {
               xtype: 'textfield',
               fieldLabel: 'Fullname',
               flex: 2,
               labelWidth: 55
           },
           {
               xtype: 'numberfield',
               fieldLabel: 'Age',
               flex: 1
           }
       ]
    },
    {
       xtype: 'fieldgroup',
       labelWidth: 35,
       items:[
           {
               xtype: 'textfield',
               fieldLabel: 'Best friend name',
               flex: 2,
               labelWidth: 100
           },
           {
               xtype: 'textfield',
               fieldLabel: 'Movie',
               flex: 1
           }
       ]
    }
  ]
});
</code></pre>
 * @constructor Creates a new FieldGroup
 * @param {Object} config Configuration options
 *
 * @xtype  fieldgroup
 */
Ext.ux.form.FieldGroup = Ext.extend(Ext.Container,{
    /**
     * @property defaultMargins
     * @type String
     * The margins to apply by default to each field in the field group
     */
   defaultMargins : '0 8 0 0',

    /*!
     * Wrap items
     */
   initComponent : function(){       
       var config = {
           layout: 'hbox',
           autoHeight: true
       }

       //apply required configs
       Ext.apply(this, config);

       //wrap each item
       this.items = this.wrapItems(this.items);

       Ext.ux.form.FieldGroup.superclass.initComponent.apply(this, arguments);
   },

   /**
    * @private
    * Wrap each item in a container with form layout
    * @param {Array}  items
    * @return {Array} wraped items
    */
   wrapItems : function(items){
       var wraps = [], wrap, item;

       //wrap each item its container
       for (i = 0, j = items.length; i < j; i++){
           item = items[i];

           Ext.apply(item,{anchor: '100%'});

           //create the wrap for current item
           wrap = {
               xtype: 'container',               
               labelWidth: item.labelWidth,
               flex: item.flex,
               width: item.width,
               layout: 'form',
               items:[
                 item
               ]
           }

           //apply default margins to each item except the last
           if (i < j -1)
              Ext.applyIf(wrap, {margins: this.defaultMargins});

           wraps.push(wrap);
       }
       
       return wraps;
    }
});

Ext.reg('fieldgroup',Ext.ux.form.FieldGroup);
