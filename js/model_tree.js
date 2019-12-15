function generateLeaves(){
    var leaves = new THREE.Object3D();
    var clump;
    var len;
    var col;

    //vary positions between -1 and 1
    var posy;
    var posx;
    var posz;
    var rot;

    for(var i = 0; i < 45; i++){
        len = Math.floor(Math.random() * 4);
        col = Math.floor(Math.random()*3);

        //vary positions between -1 and 1
        posy = (Math.random()*2)-1;
        posx = (Math.random()*2)-1;
        posz = Math.random()*2-1;

        rot = Math.random()*1;

        clump = new THREE.Mesh(new THREE.CubeGeometry(.25*len, .25*len, .25*len),
            palatte.leaves[col]);
        clump.position.y = posy;
        clump.position.x = posx;
        clump.position.z = posz;
        clump.rotation.x = rot;
        clump.rotation.y = rot;
        clump.rotation.z = rot;
        leaves.add(clump);
    }
    leaves.position.y = .5;
    return leaves;
}

function createTree() {
   var tree = new THREE.Object3D();

   // Tire, the wheel object also contains the spokes
   var trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 3, 32, 1),
                palatte.bark
      );
   trunk.position.y = -1;
   trunk.rotation.y = .75;
   tree.add(trunk);

   tree.add(generateLeaves());
   // a yellow cylinder with height 1 and diameter 1
   return tree;
}
