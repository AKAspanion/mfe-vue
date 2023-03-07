<template>
  <div style="margin:16px">
    <div style="border: 1px solid #42b883;">
      <div style="padding: 16px">

        <h1>Hello from Vue3</h1>
        <div style="padding: 2px">
        </div>
        <div style="display: flex;gap: 16px">
          <router-link to="/page-1" class="nav-link">Go to vue page 1</router-link>
          <router-link to="/page-2" class="nav-link">Go to vue page 2</router-link>
          <router-link to="/react/page-1" class="nav-link">Go to react page 1</router-link>
          <router-link to="/react/page-2" class="nav-link">Go to react page 2</router-link>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>
<style>
* {
  margin: 0px;
  padding: 0px;
}
</style>