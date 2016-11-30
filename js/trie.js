var trie = function () {
	this.child = [];
	this.isLeaf = false;
	this.list = [];
}

var suggestList = [];

trie.prototype.trieInsert = function(str,pos) {
	
	if (pos == str.length) {
		this.isLeaf = true;
		return;
	};

	var node = this;
	var c;
	var next;

	c = str[pos];
 
	if (node.child[c] == undefined){

		node.child[c] = new trie();

	}
	next = node.child[c];
	next.list.push(str.slice(pos+1,str.length));
	
	next.trieInsert(str,pos+1);
};

trie.prototype.trieSearch = function (str,pos) {
	if (pos == str.length) {
	   return this.list;
	};

	var node = this;
	var c;
	var next;
  
	c = str[pos];
  
	if (node.child[c] == undefined){
		return false;
	}
	next = node.child[c];

	var rList = next.trieSearch(str,pos+1);
	return rList;
};

trie.prototype.trieRemove = function (str,pos) {
	console.log("Remove");
	var len = str.length;
	var node = this;
	if (this.isLeaf == true && pos == len){
		console.log("here");
		return true;
	} else if((this.isLeaf == true && pos <= len) || (this.isLeaf == false && pos == len)){
		console.log(pos +" "+ this.isLeaf);
		return false;
	}

	var c = str[pos];
    var next;

	if(this.child[c] == undefined){
		return false;
	} else {
		next = this.child[c];
		var res;
		res = next.trieRemove(str, pos+1);
		if(res == false){
			var tmpWord = str.slice(pos,len);
			var indx = this.list.indexOf(tmpWord);
		    if (indx > -1){
		 	  this.list.splice(indx,1);
		 	}
		 	console.log(this.list);
			return false;
		} else {
			delete this.child[c];
			var tmpWord = str.slice(pos,len);
			var indx = this.list.indexOf(tmpWord);
		    if (indx > -1){
		 	  this.list.splice(indx,1);
		 	}
		 	if(this.list.length == 0){
		 		this.isLeaf = true; 
		 		return true;
		 	}
		 	return false;
		}
	}
	
};

