googleDriveConvertPrefix = "https://drive.google.com/uc?export=view&id=";

convertGDlink = function(link){
    if (link != "") {
        return googleDriveConvertPrefix + link.split("id=")[1];
    } else {
        return "";
    }
}


postSubmitHandleTag = function(tag) {

    // Handle tag
    var tags = [];
    var tag = tag.slice(0, 10);

    if (/\S/.test(tag)) { // if there's at least one character of non whitespace
        tag = tag.replace(/\s+/gi, '').split(','); // 공백 제거, ','를 기준으로 나눔
    }

    // '#' 제거
    if (tag != null && tag.length) {
        tag.forEach(function (t) {
            if (t[0] == '#') {
                var regex = /#+/gi;
                var rt = t.replace(regex, '');
                tags.push(rt);
            } else {
                tags.push(t);
            }
        });
    }

    console.log(tags);
    return tags;


}


Meteor.methods({
    xmlHTTPcall: function(thisImg, url) {
        console.log(thisImg);
        console.log(url);

        var xmlHTTP = new XMLHttpRequest();
        if ("withCredentials" in xmlHTTP) {

            xmlHTTP.open('GET', url, true);
        } else if (typeof XDomainRequest != "undefined") {
            xmlHTTP = new XDomainRequest();
            xmlHTTP.open('GET', url);
        } else {
            xmlHTTP = null;
            throw new Error("CORS not supported");
        }

        xmlHTTP.setRequestHeader('X-Custom-Header', 'pingpong');
        xmlHTTP.responseType = 'arraybuffer';

        xmlHTTP.onload = function(e) {
            var blob = new Blob([this.response]);
            thisImg.src = window.URL.createObjectURL(blob);
        };

        xmlHTTP.onprogress = function(e) {
            thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
        };

        xmlHTTP.onloadstart = function() {
            thisImg.completedPercentage = 0;
        };

        xmlHTTP.send();


    }
});

imgLoading = function(url) {
// imgLoading: function(url) {

    console.log("imgLoading()");
    console.log("url: " + url);

    Image.prototype.load = function(url){
        console.log("prototype.load()");
        console.log(url);

        var thisImg = this;

        // Meteor.call('xmlHTTPcall', thisImg, url, function(error, r) {
        //     if (error) return throwError(error.reason);
        //     console.log(r);
        // })

        var xmlHTTP = new XMLHttpRequest();
        if ("withCredentials" in xmlHTTP) {

            xmlHTTP.open('GET', url, true);
        } else if (typeof XDomainRequest != "undefined") {
            xmlHTTP = new XDomainRequest();
            xmlHTTP.open('GET', url);
        } else {
            xmlHTTP = null;
            throw new Error("CORS not supported");
        }

        xmlHTTP.setRequestHeader('X-Custom-Header', 'pingpong');
        xmlHTTP.responseType = 'arraybuffer';

        xmlHTTP.onload = function(e) {
            var blob = new Blob([this.response]);
            thisImg.src = window.URL.createObjectURL(blob);
        };

        xmlHTTP.onprogress = function(e) {
            thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
        };

        xmlHTTP.onloadstart = function() {
            thisImg.completedPercentage = 0;
        };

        xmlHTTP.send();

   };

    Image.prototype.completedPercentage = 0;
};
