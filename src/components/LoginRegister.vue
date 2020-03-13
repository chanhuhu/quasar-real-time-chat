<template>
    <q-form @submit="submitForm">
      <q-input
        v-if="tab === 'register'"
        outlined
        class="q-mb-md"
        v-model="formData.name"
        label="Name"
      ></q-input>
      <q-input
        outlined
        class="q-mb-md"
        v-model="formData.email"
        label="Email"
      ></q-input>
      <q-input
        outlined
        class="q-mb-md"
        v-model="formData.password"
        label="Password"
      ></q-input>
      <div class="row">
        <q-space/>
        <q-btn
          color="primary"
          type="submit"
        >{{tab}}</q-btn>
      </div>
    </q-form>
</template>

<script>
  import { mapActions } from 'vuex'
  import {firebaseAuth, firebaseDb} from "../boot/firebase";
    export default {
        name: "LoginRegister",
        props: ['tab'],
        data: () => ({
            formData: {
                name: "",
                email: "",
                password: ""
            }
        }),
        methods: {
            ...mapActions('store', ['registerUser','loginUser']),
            submitForm() {
                if (this.tab === 'login') {
                    this.loginUser(this.formData)
                }else {
                    this.registerUser(this.formData)
                }
            },
        }
    }
</script>

<style scoped>

</style>
