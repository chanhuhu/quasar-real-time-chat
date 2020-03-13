<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          icon="arrow_back"
          v-go-back.single
          flat  
          dense
          label="Back"
        ></q-btn>
        <q-btn
          v-if="!userDetails.userId"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          flat
          dense
          label="Login"
          no-caps
          to="/auth"
        ></q-btn>
        <q-btn
          v-else
          class="absolute-right q-pr-sm"
          icon="account_circle"
          flat
          dense
          @click="logoutUser"
          no-caps
        >Logout<br/>{{userDetails.name}}</q-btn>
        <q-toolbar-title class="absolute-center">
          {{title}}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'MyLayout',
        data() {
            return {}
        },
        computed: {
            ...mapState('store', ['userDetails']),
            otherUserDetails() {
                if (this.$store.state.store.users[this.$route.params.otherUserId]) {
                    return this.$store.state.store.users[this.$route.params.otherUserId]
                }
                return {}
            },
            title() {
                let currentPath = this.$route.fullPath
                if (currentPath === '/') return 'DarkFacebook'
                else if (currentPath.includes('/chat')) return this.otherUserDetails.name
                else if (currentPath === '/auth') return 'Login'
                else if (currentPath === '/translate') return 'Translate'
            }
        },
        methods: {
            ...mapActions('store', ['logoutUser'])
        }
    }
</script>

<style lang="stylus">
  .q-toolbar
    .q-btn
      line-height : 1.2

</style>
