// var uniqueID = "";

Template.uploadJquery.created = function(){
  // uniqueID = this.data.uniqueID;
  // console.log(uniqueID);
};

Template.uploadJquery.helpers({
  specificFormData: function() {
    // console.log(this);
    return {
      id: this._id,
      other: this.other,
      hard: 'Lolcats'
      // imgID: uniqueID 
    }
  }
});