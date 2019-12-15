/* This is a starter file for experimenting with 3D animated models in THREE.js.
 * The user can rotate the model using the keyboard, and can turn animation on and off.
 *
 * To make your own model,
 * - add for now a global variable
 * - build it in the createWorld() function, and
 * - update animation variables in the updateForFrame() function to animate it
 *
 * You will need to refactor this experimental code, using for example
 * an array of elements (Drawable objects) produced in a init function to
 * integrate it within a robust design for your final project).
 *
 * Read/skim this code before to tinker to it.
 * In particular find my CHECK comments...
 */

"use strict";
//
// // Nodes in the scene graphs that are modified as part of the animation:
// var sphereRotator;  // The sphere is a child of this object; rotating
// // this object about the y-axis rotates the sphere.

const LIGHT = 0;
const MEDIUM = 1;

const BLONDE = 0;
const BROWN = 1;
const GINGER = 2;
const DARK = 3;

var yellowleaves = new THREE.ImageUtils.loadTexture('textures/yellowleaves.png');
var redleaves = new THREE.ImageUtils.loadTexture('textures/redleaves.png');
var orangeleaves = new THREE.ImageUtils.loadTexture('textures/orangeleaves.png');
var solidMaroon = new THREE.ImageUtils.loadTexture('textures/toppost.png');
var jersey1 = new THREE.ImageUtils.loadTexture('textures/jersey1.png');
var jersey2 = new THREE.ImageUtils.loadTexture('textures/jersey2.png');
var jersey3 = new THREE.ImageUtils.loadTexture('textures/jersey3.png');
var jersey4 = new THREE.ImageUtils.loadTexture('textures/jersey4.png');
var jersey5 = new THREE.ImageUtils.loadTexture('textures/jersey5.png');
var jersey6 = new THREE.ImageUtils.loadTexture('textures/jersey6.png');
var jersey7 = new THREE.ImageUtils.loadTexture('textures/jersey7.png');

var face0 = new THREE.ImageUtils.loadTexture('textures/face_allegra.png');
var face1 = new THREE.ImageUtils.loadTexture('textures/emma.png');
var face2 = new THREE.ImageUtils.loadTexture('textures/val.png');
var face3 = new THREE.ImageUtils.loadTexture('textures/nicole.png');
var face4 = new THREE.ImageUtils.loadTexture('textures/tubes.png');
var face5 = new THREE.ImageUtils.loadTexture('textures/shelley.png');
var face6 = new THREE.ImageUtils.loadTexture('textures/face.png');

var bark = new THREE.ImageUtils.loadTexture('textures/treetrunk.png');

var palatte = {
  skin: [new THREE.MeshLambertMaterial({color:0xffe4b5}),//PALE
          new THREE.MeshLambertMaterial({color:0xcc9e4e})],
  hair: [new THREE.MeshLambertMaterial({color:0xcfa117}),//blonde
          new THREE.MeshLambertMaterial({color:0x854424}),//brown
          new THREE.MeshLambertMaterial({color:0xd95716}), //red
          new THREE.MeshLambertMaterial({color:0x000000})],//dark
  playerFaces: [new THREE.MeshLambertMaterial({map: face0}),
            new THREE.MeshLambertMaterial({map: face1}),
            new THREE.MeshLambertMaterial({map: face2}),
            new THREE.MeshLambertMaterial({map: face3}),
            new THREE.MeshLambertMaterial({map: face4}),
            new THREE.MeshLambertMaterial({map: face5}),
            new THREE.MeshLambertMaterial({map: face6})],//map: loader.load('./textures/face.png')
  leaves: [new THREE.MeshLambertMaterial({map: orangeleaves}), //orange //map: loader.load('./textures/orangeleaves.png')
        new THREE.MeshLambertMaterial({map: yellowleaves}),//yellow //map: loader.load('./textures/yellowleaves.png')}
        new THREE.MeshLambertMaterial({map: redleaves})],//red //map: loader.load('./textures/redleaves.png')}
  maroon: new THREE.MeshLambertMaterial({map: solidMaroon}),//color:0x660b0b
  green: new THREE.MeshLambertMaterial({color:0x5A6B34}),
  silver: new THREE.MeshLambertMaterial({color:0xe4f3ef}),
  black: new THREE.MeshLambertMaterial({color:0x000000}),
  white: new THREE.MeshLambertMaterial({color:0xffffff}),
  bark: new THREE.MeshLambertMaterial({map: bark}), //map: loader.load('textures/treetrunk.png')
  leather: new THREE.MeshLambertMaterial({color:0xAB8024})
}

var heroPalatte = {
    shirt:  [new THREE.MeshLambertMaterial({map: jersey1}),
                new THREE.MeshLambertMaterial({map: jersey2}),
                new THREE.MeshLambertMaterial({map: jersey3}),
                new THREE.MeshLambertMaterial({map: jersey4}),
                new THREE.MeshLambertMaterial({map: jersey5}),
                new THREE.MeshLambertMaterial({map: jersey6}),
                new THREE.MeshLambertMaterial({map: jersey7})],
    lowerLeg: new THREE.MeshLambertMaterial({map: solidMaroon}),
    upperArm: new THREE.MeshLambertMaterial({map: solidMaroon}),
}

var colors = [0x99ccff, 0xffccff, 0xccff99, 0xffcc99,0x00ffcc];
var childPalatte = {
    shirt: [new THREE.MeshLambertMaterial({color: colors[Math.floor(Math.random()*5)]})],
    lowerLeg: palatte.skin[LIGHT],
    upperArm: new THREE.MeshLambertMaterial({color: colors[Math.floor(Math.random()*5)]}),
}
