const router = {
    location: window.location,
    history: window.history,
    push: function (path) {
        this.location.assign(path);
    },
    back: function () {
        this.history.back();
    },
};
