define([
    'jquery', 'underscore', 'backbone', 'events', 'views/BaseView', 'models/ProjectApiModel', 'text!templates/addapi.tmpl', 'text!templates/addqueryparams.tmpl'
], function ($, _, Backbone, Events, BaseView, ApiModel, viewTemplate, queryParams) {
    var AddApiView = BaseView.extend({
        'className': 'container',
        onInitialize: function (options) {
            var thisView = this;
            thisView.options = options;
            this.model = new ApiModel();
            this.model.urlRoot = '/api/routes/' + thisView.options.projectId + '/category/' + thisView.options.categoryName + '/api';
        },
        events: {
            'click .request-type': 'selectRequestType',
            'click .create-api-submit': 'saveNewApi',
            'click .add-more-query-params-buttom': 'addQueryParams',
            'click .remove-query-params': 'removeQueryParam'
        },
        render: function () {
            var thisView = this;

            var template = _.template(viewTemplate);

            thisView.$el.html(template());

            thisView.$el.find('.query-params').append(_.template(queryParams));

            return this;
        },
        selectRequestType: function (e) {
            var thisView = this,
                $targetEle = $(e.target);

            thisView.$el.find('.request-type').removeClass('selected-type');
            $targetEle.addClass('selected-type');

            switch ($targetEle.text()) {
            case 'GET':
                thisView.$('.add-query-params').show();
                thisView.$('.add-post-data').hide();
                thisView.$('.add-more-query-params-buttom').show();
                break;
            case 'POST':
                thisView.$('.add-query-params').hide();
                thisView.$('.add-post-data').show();
                thisView.$('.add-more-query-params-buttom').hide();
                break;
            }
        },
        getSaveObject: function () {
            var thisView = this,
                formData = thisView.$el.find('.create-api-form').serializeArray(),
                returnObj = {};

            _.each(formData, function (item) {
                returnObj[item.name] = item.value;
            });

            returnObj.type = thisView.$el.find('.selected-type').text();

            switch (returnObj.type) {
            case 'GET':
                returnObj.queryParams = thisView.getQueryParams()
                break;
            case 'POST':
                returnObj.postData = $.trim(thisView.$('.add-post-data').val());
                break;
            }
            return returnObj;
        },
        saveNewApi: function () {
            var thisView = this;
            thisView.model.set(thisView.getSaveObject());
            thisView.model.save({}, {
                success: function (model, response) {
                    var url = 'project/' + thisView.options.projectId + '/category/' + thisView.options.categoryName;
                    Events.trigger('router:navigate', url);
                }
            });
        },
        getQueryParams: function () {
            var thisView = this,
                queryParams = [];
            _.each(thisView.$('.query-param-item'), function (ele) {
                var key = $.trim($(ele).val());
                if (key) {
                    queryParams.push(key)
                }
            });

            return queryParams;
        },
        addQueryParams: function () {
            var thisView = this;

            thisView.$el.find('.query-params').append(_.template(queryParams));
        },
        removeQueryParam: function (e) {
            var thisView = this;

            thisView.$el.find(e.target).closest('li').remove();
            if (thisView.$el.find('.query-params').children().length === 0) {
                thisView.addQueryParams();
            }
        }
    });
    return AddApiView;
});