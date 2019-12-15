

function createPost(){
    var post = new THREE.Object3D();
    var padding = new THREE.Mesh(
       new THREE.CubeGeometry(1,3,1),
             palatte.maroon
       );
    var bar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 3.5, 32, 1),
        palatte.silver
    );
    bar.position.y = 3.25;
    post.add(padding);
    post.add(bar);
    return post;
}

function createUprights() {
   // Create the main uprights model.
   var uprightsModel = new THREE.Object3D();
   var leftPost = createPost();
   var rightPost = createPost();
   leftPost.position.x = -1.25;
   rightPost.position.x = 1.25;

   var bar = new THREE.Mesh(
       new THREE.CylinderGeometry(0.1, 0.1, 2.35, 32, 1),
       palatte.silver
   );
    bar.position.y = 2.5;
    bar.rotation.x = 1.55;
    bar.rotation.z = 1.55;


   uprightsModel.add(leftPost);
   uprightsModel.add(rightPost);
   uprightsModel.add(bar);

   return uprightsModel;
}
