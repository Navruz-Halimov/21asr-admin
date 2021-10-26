<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="login()">
                  <h1>Login</h1>
                  <p class="text-muted">Kirish</p>
                  <CInput placeholder="9989*******" v-model="form.phone_number">
                    <template #prepend-content>
                      <CIcon name="cil-user" />
                    </template>
                  </CInput>
                  <CInput placeholder="Parol" type="password" v-model="form.password">
                    <template #prepend-content>
                      <CIcon name="cil-lock-locked" />
                    </template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton type="submit" color="primary" class="px-4">Login</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        phone_number: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$http
        .post("token/", this.form)
        .then((res) => {
          const token = res.data.access;
          localStorage.setItem("token", "Bearer " + token);
          this.$store.commit("setToken", token);
          this.$http.defaults.headers.common["Authorization"] =
            "Bearer " + token;
          this.$toast.success("Muvaffaqiyatli bajarildi.");
          this.$router.push("/");
        })
        .catch(() => {
          this.$toast.error("Login yoki parol xato kiritilgan.");
        });
    },
  },
};
</script>
