<template>
  <Renderer ref="renderer" antialias :orbit-ctrl="{ enableDamping: true }" resize>
    <Camera :position="{ x: 1, y: 0, z: 0 }" />
    <Scene>
      <AmbientLight></AmbientLight>
      <GltfModel src="/test.glb" />
    </Scene>
  </Renderer>
</template>

<script>
import {
  AmbientLight,
  Camera,
  GltfModel,
  Renderer,
  Scene,
} from 'troisjs';

export default {
  components: {
    AmbientLight,
    Camera,
    GltfModel,
    Renderer,
    Scene,
  },
};
</script>
<style >
canvas
{
  height: 100% !important;
  width: 100% !important;
}
</style>