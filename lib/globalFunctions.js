googleDriveConvertPrefix = "https://drive.google.com/uc?export=view&id=";

convertGDlink = function(link){
    if (link != "") {
        return googleDriveConvertPrefix + link.split("id=")[1];
    } else {
        return "";
    }
}
