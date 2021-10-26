<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://greatsoft.uz" target="_blank">GreatSoft</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}}</span>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
