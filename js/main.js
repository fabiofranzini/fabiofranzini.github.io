ko.observableArray.fn.pushAll = function (valuesToPush) {
    var underlyingArray = this();
    this.valueWillMutate();
    ko.utils.arrayPushAll(underlyingArray, valuesToPush);
    this.valueHasMutated();
    return this;  //optional
};

(function () {

    var MainViewModel = function () {
        this.title = "Hi, I'm Fabio Franzini";
        this.subTitle = "Office Servers and Services MVP"
        this.posts = ko.observableArray();
    };

    var viewModel = new MainViewModel()

    $.ajax({
        url: 'https://api.rss2json.com/v1/api.json',
        method: 'GET',
        dataType: 'json',
        data: {
            rss_url: 'https://medium.com/feed/@fabiofranzini',
            api_key: 'yigzymamuxzemotmjsgpkjdzdsphpjfvbyz6qgh2',
            count: 12
        }
    }).done(function (response) {
        if (response.status != 'ok') { throw response.message; }

        viewModel.posts.pushAll(response.items);
    });

    ko.applyBindings(viewModel);
})();