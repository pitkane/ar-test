import React from "react";
import { StyleSheet, Text, View } from "react-native";

import * as THREE from "three";
import ExpoTHREE from "expo-three";
import Expo from "expo";

console.disableYellowBox = true;

export default class App extends React.Component {
  _onGLContextCreate = async gl => {
    // Ar stuff
    const arSession = await this._glView.startARSessionAsync();

    // Do graphics stuff here!

    const scene = new THREE.Scene();

    // camera
    const camera = ExpoTHREE.createARCamera(
      arSession,
      gl.drawingBufferWidth,
      gl.drawingBufferHeight,
      0.01,
      1000
    );

    const renderer = ExpoTHREE.createRenderer({ gl });

    // background
    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);

    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const geometry = new THREE.BoxGeometry(0.07, 0.07, 0.07);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    // camera.position.z = 5;
    cube.position.z = -0.6;
    cube.position.y = -0.4;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.07;
      cube.rotation.y += 0.04;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();
  };

  render() {
    return (
      <Expo.GLView
        ref={ref => (this._glView = ref)}
        style={{ flex: 1 }}
        onContextCreate={this._onGLContextCreate}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
