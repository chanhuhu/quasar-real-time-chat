<template>
  <q-page
    ref="pageChat"
    class="flex column">
    <q-banner
      v-if="!otherUserDetails.online"
      dense
      inline-actions
      class="text-center bg-grey-4">
      {{otherUserDetails.name}} is offline
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        :class="{ 'invisible' : !showMessage}"
        v-for="message in messages"
        :key="message.text"
        :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from === 'me' ? true : false "
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-input
          v-model="newMessage"
          outlined
          dense
          rounded
          class="full-width"
          bg-color="white"
        >
          <template  slot:after>
            <q-btn
              rounded
              color="white"
              dense
              type="submit"
              flat
              @click="sendMessage"
              icon="send"/>
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'PageChat',
        data: () => ({
            newMessage: '',
            showMessage:false
        }),
        methods: {
            ...mapActions('store', ['firebaseGetMessages', 'firebaseStopGettingMessages', 'firebaseSendMessage']),
            sendMessage() {
                this.firebaseSendMessage({
                    message: {
                        text: this.newMessage,
                        from: 'me'
                    },
                    otherUserId: this.$route.params.otherUserId
                });
                this.clearMessage()
            },
            destroyed() {
                this.firebaseStopGettingMessages()
            },
            clearMessage() {
                this.newMessage = ''
            },
            scrollToBottom() {
                let pageChat = this.$refs.pageChat.$el;
                setTimeout(() => {
                    window.scrollTo(0, pageChat.scrollHeight)
                },200)
            }
        },
        watch: {
            messages: function (val) {
                if (Object.keys(val).length) {
                    this.scrollToBottom();
                    setTimeout(() => {
                        this.showMessage = true
                    },200)
                }
            }
        },
        mounted() {
            this.firebaseGetMessages(this.$route.params.otherUserId);
        },
        computed: {
            ...mapState('store', ['messages', 'userDetails']),
            otherUserDetails() {
                if (this.$store.state.store.users[this.$route.params.otherUserId]) {
                    return this.$store.state.store.users[this.$route.params.otherUserId]
                }
                return {}

            }
        }
    }
</script>

<style>

</style>
