<template>
  <div>
    <CContainer>
      <CRow  v-if="$store.state.showLoader">
        <Loader />
      </CRow>
      <CRow v-else>
        
        <CCol sm="6" lg="3">
          <CWidgetDropdown color="info" :header="`${usersCount}`" text="Foydalanuvchilar soni" class="pb-4">
          </CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="3">
          <CWidgetDropdown color="info" :header="`${adsCount}`" text="Reklamalar soni" class="pb-4">
          </CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="3">
          <CWidgetDropdown color="info" :header="`${jobtypesCount}`" text="Kasb turlari soni" class="pb-4">
          </CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="3">
          <CWidgetDropdown color="info" :header="`${membersCount}`" text="Muharrirlar soni" class="pb-4">
          </CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="3">
          <CWidgetDropdown color="info" :header="`${postsCount}`" text="Yangiliklar soni" class="pb-4">
          </CWidgetDropdown>
        </CCol>
        <!-- <CCol sm="6" lg="3">
          <CWidgetDropdown color="info" :header="`${tagsAllCount}`" text="Teglar soni" class="pb-4">
          </CWidgetDropdown>
        </CCol> -->
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import Loader from '../components/Loader';
import { mapGetters } from 'vuex';
export default {
  name: 'Dashboard',
  components: {
    Loader
  },
  data () {
    return {
      adsCount: 0,
      membersCount: 0,
      jobtypesCount: 0,
      postsCount: 0,
      tagsAllCount: 0,
      usersCount: 0
    }
  },
  computed: {
    // ...mapGetters(['ads','members','jobtypes','posts','users','tagsAll'])
  },
  methods: {  

  },
  created() {
    this.$store.commit('setShowLoader',true);
    this.$store.dispatch('getads')
    .then(() => {
      this.adsCount = this.$store.state.numberOfItems;
    })
    this.$store.dispatch('getmembers')
    .then(() => {
      this.membersCount = this.$store.state.numberOfItems;
    })
    this.$store.dispatch('getjobtypes')
    .then(() => {
      this.jobtypesCount = this.$store.state.numberOfItems;
    })
    this.$store.dispatch('getposts')
    .then(() => {
      this.postsCount = this.$store.state.numberOfItems;
    })
    this.$store.dispatch('getusers')
    .then(() => {
      this.usersCount = this.$store.state.numberOfItems;
    })
    // this.$store.dispatch('gettagsall')
    // .then(() => {
    //   this.tagsAllCount = this.$store.state.numberOfItems;
    // })
    .then(() => {
      this.$store.commit('setShowLoader',false);
    })
  }
}
</script>
