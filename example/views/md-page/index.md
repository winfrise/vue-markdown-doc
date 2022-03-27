# Hello

foo

> This is test.

- How are you?
- Fine, Thank you, and you?
- I'm fine， too. Thank you.
- 🌚

::: demo-block Example
```html
<template>
    <div>
        count:{{count}}
        <button @click="onClick">Click Me</button>
    </div>
</template>

<script>
    export default{
        name: "demo",
        data() {
            return{
                count: 0
            }
        },
        methods: {
            onClick() {
                this.count++
            }
        }
    }
</script>
```
:::

```demo
<template>
    <div>
        count:{{count}}
        <button @click="onClick">Click Me</button>
    </div>
</template>

<script>
    export default{
        name: "MdPage",
        data() {
            return{
                count: 0
            }
        },
        methods: {
            onClick() {
                this.count++
            }
        }
    }
</script>
```
