var changeCase = require('change-case'),
    ApiCategoryModel = require('../models/ApiCategoryModel'),
    ApiModel = require('../models/ApiModel');

var ApiController = {
    save: function (projectId, categoryName, data, callback) {
        ApiCategoryModel.findOne({
            'project_id': projectId,
            'name': categoryName
        }, function (err, category) {
            if (err) return console.error(err);

            if (category) {
                ApiModel.findOne({
                    'url': data.url
                }, function (err, savedApi) {
                    if (err) return console.error(err);

                    if (!savedApi) {
                        var newApi = new ApiModel({
                            'category_id': category._id,
                            'url': data.url,
                            'type': data.type,
                            'sentData': data.sentData,
                            'responseData': data.responseData,
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
    }
}

module.exports = ApiController;