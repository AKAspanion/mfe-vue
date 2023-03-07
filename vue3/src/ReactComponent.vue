<template>
  <div ref="reactApp">
  </div>
</template>
  
<script lang="ts">

import { mount } from "react/Bootstrap";
import { defineComponent } from "vue";

import { vue3BrowserHistory } from "./constants";

export default defineComponent({
  data() {
    return {
      iswatch: true,
      app1Basename: '/react',
      initialPathname: '',
    };
  },
  mounted() {
    this.initialPathname = vue3BrowserHistory.location.replace(
      this.app1Basename,
      ""
    )

    const navigate = (next: string) => {
      if (this.$route.path !== next) {
        this.iswatch = false;
        this.$router.push(next);
      }
    }

    const app1NavigationEventHandler = (event: Event) => {
      const pathname = ((event as CustomEvent<string>)).detail;
      const newPathname = `${this.app1Basename}${pathname}`;
      if (newPathname === vue3BrowserHistory.location) {
        return;
      }
      navigate(newPathname);
    };
    window.addEventListener("[react] navigated", app1NavigationEventHandler);


    mount({ mountPoint: this.$refs.reactApp as HTMLElement, initialPathname: this.initialPathname });

  },
  watch: {
    $route(to, from) {

      const isInner = to.path.startsWith(this.app1Basename);

      if (this.iswatch) {
        if (isInner) {
          window.dispatchEvent(
            new CustomEvent("[vue3] navigated", {
              detail: to.path.replace(this.app1Basename, ""),
            })
          );
        } else {
          return true;
        }
      } else {
        this.iswatch = true;
      }
    },
  },
  methods: {
    getInnerRoute(path: string) {
      let inner = path.split(this.initialPathname)[1];
      return inner;
    },
  },
});
</script>
  