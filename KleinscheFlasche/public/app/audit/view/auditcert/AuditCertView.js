/**
 * Created by apple on 16/1/17.
 */
define('app/audit/view/auditcert/AuditCertView',
[
    'underscore',
    'jquery',
    'backbone',

    'text!/app/audit/template/auditcert/AuditCertView.ejs'
],
function(_, $, Backbone){
    var v = Backbone.View.extend({
        el:'.auditcert-container',
        initialize:function(){
            this.template = _.template(tmpl);
        },
        render:function(){
            $(this.el).html(this.template({

            }));
            return this;
        },
        hide:function(){
            $(this.el).css({
                'display':'none'
            });
        },
        show:function(){
            $(this.el).css({
                'display':'block'
            });
        }
    });
    return v;
})