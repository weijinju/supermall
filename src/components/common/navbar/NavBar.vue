<!--导航栏分装-->
<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
	export default {
		name: "NavBar"
	}
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-high-text);
    height: 44px;
    display: flex;
    line-height: 44px;
    font-size: 20px;
    margin-bottom: -10px;
    box-shadow: 0 1px 1px rgba(100,100,100,0.1);
  }
  .left,.right{
    width: 60px;
  }
  .center{
    flex: 1;
    text-align: center;

  }

</style>
