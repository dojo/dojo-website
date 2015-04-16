<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Connecting Tree to a Store</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/dojo/1.7.8/dijit/themes/claro/claro.css" media="screen">
		<!-- load dojo and provide config via data attribute -->
<!--		<script src="/dojo/dojo.js"
				data-dojo-config="isDebug: true,parseOnLoad: true">
		</script>-->
		<script src="http://ajax.googleapis.com/ajax/libs/dojo/1.7.8/dojo/dojo.js"
			data-dojo-config="isDebug: true, async: true">
		</script>
		<script>

			require(["dojo/store/JsonRest", "dojo/store/Observable", "dijit/Tree", "dijit/tree/dndSource", "dojo/query", "dojo/domReady!"], function(JsonRest, Observable, Tree, dndSource, query) {

				usGov = JsonRest({
					target:"data/",
					mayHaveChildren: function(object){
						// see if it has a children property
						return "children" in object;
					},
					getChildren: function(object, onComplete, onError){
						// retrieve the full copy of the object
						this.get(object.id).then(function(fullObject){
							// copy to the original object so it has the children array as well.
							object.children = fullObject.children;
							// now that full object, we should have an array of children
							onComplete(fullObject.children);
						}, function(error){
							// an error occurred, log it, and indicate no children
							console.error(error);
							onComplete([]);
						});
					},
					getRoot: function(onItem, onError){
						// get the root object, we will do a get() and callback the result
						this.get("root").then(onItem, onError);
					},
					getLabel: function(object){
						// just get the name
						return object.name;
					},

					pasteItem: function(child, oldParent, newParent, bCopy, insertIndex){
						var store = this;
						store.get(oldParent.id).then(function(oldParent){
							store.get(newParent.id).then(function(newParent){
								var oldChildren = oldParent.children;
								dojo.some(oldChildren, function(oldChild, i){
									if(oldChild.id == child.id){
										oldChildren.splice(i, 1);
										return true; // done
									}
								});
								store.put(oldParent);
								newParent.children.splice(insertIndex || 0, 0, child);
								store.put(newParent);
							}, function(error){
								alert("Error occurred (this demo is not hooked up to a real database, so this is expected): " + error);
							});
						});
					},
					put: function(object, options){
						this.onChildrenChange(object, object.children);
						this.onChange(object);
						return JsonRest.prototype.put.apply(this, arguments);
					},
					remove: function(id){
						// We call onDelete to signal to the tree to remove the child. The
						// remove(id) gets and id, but onDelete expects an object, so we create
						// a fake object that has an identity matching the id of the object we
						// are removing.
						this.onDelete({id: id});
						// note that you could alternately wait for this inherited add function to
						// finish (using .then()) if you don't want the event to fire until it is
						// confirmed by the server
						return JsonRest.prototype.remove.apply(this, arguments);
					}
				});
				tree = new Tree({
					model: usGov,
					dndController: dndSource
				}, "tree"); // make sure you have a target HTML element with this id
				tree.startup();
				query("#add-new-child").on("click", function(){
					var selectedObject = tree.get("selectedItems")[0];
					if(!selectedObject){
						return alert("No object selected");
					}
					usGov.get(selectedObject.id).then(function(selectedObject){
						selectedObject.children.push({
							name: "New child",
							id: Math.random()
						});
						usGov.put(selectedObject);
					});

				});
				query("#remove").on("click", function(){
					var selectedObject = tree.get("selectedItems")[0];
					if(!selectedObject){
						return alert("No object selected");
					}
					usGov.remove(selectedObject.id);
				});
				tree.on("dblclick", function(object){
					object.name = prompt("Enter a new name for the object");
					usGov.put(object);
				}, true);
			});
		</script>
	</head>
	<body class="claro">
		<h1>Demo: Connecting Tree to a Store</h1>
		<div id="tree"></div>
		<p><button id="add-new-child">Add new child to selected item</button></p>
		<p><button id="remove">Remove selected item</button></p>
	</body>
</html>
