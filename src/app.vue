<template>
    <div class="app">
        <p>
            {{value}}
        </p>
        <comA></comA>    
    </div>
</template>


<script>
    import comA from './comA.vue'
    import "./app.scss"
    export default{
        data(){
            return{
                value:"hello vue!!!"
            }
        },
        components:{
            comA
        }
    }
</script>
