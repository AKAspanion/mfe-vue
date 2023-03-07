<template>
  <div style="margin:16px">
    <div style="border: 1px solid red;padding: 16px">
      <h1>Hello Vue3 App</h1>
    </div>
    <div style="padding: 8px">
    </div>
    <div style="border: 1px solid red;padding: 16px">
      <h3>Vue3 App's Router</h3>
      <router-view />
    </div>
    <router-link to="/react" class="nav-link">Go to react pages</router-link>
  </div>
</template>

<script>

</script>
