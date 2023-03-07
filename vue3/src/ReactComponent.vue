<template>
    <div>
        React
        <div ref="reactApp">
        </div>
    </div>
</template>
  
<script>

import { mount } from "react/Bootstrap";

import { vue3BrowserHistory } from "./constants";

export default {
    data() {
        return {
            iswatch: true,
        };
    },
    mounted() {
        this.app1Basename = '/react';
        this.initialPathname = vue3BrowserHistory.location.replace(
            this.app1Basename,
            ""
        )

        const navigate = (next) => {
            if (this.$route.path !== next) {
                this.iswatch = false;
                this.$router.push(next);
            }
        }

        const app1NavigationEventHandler = (event) => {
            const pathname = (event).detail;
            const newPathname = `${this.app1Basename}${pathname}`;
            if (newPathname === vue3BrowserHistory.location) {
                return;
            }
            navigate(newPathname);
        };
        window.addEventListener("[react] navigated", app1NavigationEventHandler);


        mount({ mountPoint: this.$refs.reactApp, initialPathname: this.initialPathname });

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
        getInnerRoute(path) {
            let inner = path.split(this.initialPathname)[1];
            return inner;
        },
    },
};
</script>
  