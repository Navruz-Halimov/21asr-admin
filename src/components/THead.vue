<template>
    <thead>
        <tr>
            <th scope="col" v-for="(head,index) in theads" :key="index">{{ head }}</th>
        </tr>
    </thead>
</template>
<script>
export default {
    props: ['theads'],
    mounted() {
        
    }
}
</script>