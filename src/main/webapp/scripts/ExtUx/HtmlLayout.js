/**
 * @author volkan
 */
 
 
 /*
  
  
  Ext.onReady(function() {
    var panel = new Ext.Panel({
        title: 'HtmlLayout test',
        autoHeight: true,
        layout: 'ux.html',
        html: '<table><tr><td>Please enter your name </td><td></td><td> and password </td><td><input type="password" /></td><td>.</td></tr></table>',
        defaultType: 'textfield',
        items: [{
            name: 'username',
            renderTarget: 'td:nth(2)'
        },{
            name: 'password',
            applyTarget: 'input[type=password]'
        }]
    }).render(Ext.getBody());
});
  
  
  
  * */
 
 
Ext.ns('Ext.ux.layout');
Ext.ux.layout.HtmlLayout = Ext.extend(Ext.layout.ContainerLayout, {
    renderItem: function(c, position, target){
        if(c.renderTarget){
            target = Ext.DomQuery.selectNode(c.renderTarget, Ext.getDom(target));
        }else if(c.applyTarget){
            var el = Ext.DomQuery.selectNode(c.applyTarget, Ext.getDom(target));;
            if(!c.rendered){
                c.el = el;
            }
            target = el.parentNode;
        }
        Ext.ux.layout.HtmlLayout.superclass.renderItem.call(this, c, undefined, target);
    }
});
Ext.Container.LAYOUTS['ux.html'] = Ext.ux.layout.HtmlLayout;