<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="../assets/img/sidebar/icon.png"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownItem @click="logout()">
      <CIcon name="cil-lock-locked" /> Chiqish
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      delete this.$http.defaults.headers.common['Authorization'];
      this.$store.commit('setToken','');
      this.$router.push('/pages/login');
      this.$toast.success('Muvaffaqiyatli tark etdingiz.')
    }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>