var changeCase = require('change-case'),
    ApiCategoryModel = require('../models/ApiCategoryModel'),
    ApiModel = require('../models/ApiModel');

var ApiController = {
    save: function (projectId, categoryName, data, callback) {

        ApiCategoryModel.findOne({
            'name': categoryName,
            'project_id': projectId
        }, function (err, category) {
            if (err) return console.error(err);

            if (category) {
                ApiModel.findOne({
                    'category_id': category._id,
                    'url': data.url,
                    'type': data.type
                }, function (err, savedApi) {
                    if (err) return console.error(err);

                    if (!savedApi) {
                        var newApi = new ApiModel({
                            'category_id': category._id,
                            'url': data.url,
                            'type': data.type,
                            'queryParams': data.queryParams,
                            'postData': data.postData,
                            'response': data.response,
                            'description': data.description
                        });

                        newApi.save(function (err, api) {
                            if (err) return console.error(err);
                            callback(api);
                        });
                    } else {
                        callback();
                    }
                });
            } else {
                callback();
            }
        });
    },
    getAll: function (projectId, categoryId, callback) {
        ApiModel.find({
            'category_id': categoryId
        }, function (err, apiList) {
            if (err) return console.error(err);
            callback(apiList);
        });
    },
    getApi: function (id, callback) {
        ApiModel.findById(id, function (err, api) {
            if (err) return console.error(err);
            callback(api);
        });
    }
}

module.exports = ApiController;