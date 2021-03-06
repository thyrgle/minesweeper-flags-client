<template>
  <div>
    <v-container fluid>
      <v-layout column align-center justify-center>
        <h1>Minesweeper Flags Extreme</h1>
        <img class="logo" :src="require('@/assets/icon1024.png')" />
        <h2>Choose your login option</h2>
        <v-alert type="error" :value="usingHTTP">
          <span>You need to use HTTPS to sign in with a login provider.</span>
        </v-alert>
        <v-alert type="warning" :value="currentVersion === 0">
          <span>
            You are in a local development environment.<br />
            Remember to synchronize with the remote repository sometimes.<br />
            Feel free to create any issues in the GitHub repository.<br />
            Happy sweeping!
          </span>
        </v-alert>
        <v-alert
          type="warning"
          :value="currentVersion > 0 && currentVersion < latestVersion"
        >
          <span>
            There is a more recent version than the one you are using.<br />
            Refresh your browser to use build {{ latestVersion }}
          </span>
        </v-alert>
        <v-alert type="error" :value="loginError !== null">{{
          loginError
        }}</v-alert>
        <v-btn
          v-for="provider in ['google', 'facebook', 'github']"
          :key="provider"
          class="provider"
          @click="authenticate(provider)"
        >
          <img
            height="30"
            width="30"
            :key="provider"
            class="auth-provider"
            :src="require('@/assets/logos/' + provider + '.svg')"
            @click="authenticate(provider)"
          />
          &nbsp;&nbsp;Sign in with {{ provider }}
        </v-btn>
      </v-layout>
      <v-layout justify-center row>
        <v-btn color="info" @click="authenticateGuest()">Guest</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Home",
  props: ["logout"],
  data() {
    let guestName = Math.floor(Math.random() * 90000) + 10000;
    if (typeof localStorage.guestName === "undefined") {
      localStorage.guestName = guestName;
    } else {
      guestName = localStorage.guestName;
    }
    return {
      latestVersion: 0,
      guestName: guestName
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.logout) {
        this.$store.dispatch("socket/connect");
        this.autoLogin();
      } else {
        this.$store.dispatch("socket/disconnect");
        this.$store.dispatch("socket/connect");
        delete localStorage.lastUsedProvider;
      }
    });
    axios
      .get(process.env.VUE_APP_AUTH_REDIRECT_URL + "/version.json")
      .then(response => (this.latestVersion = response.data));
  },
  watch: {
    loggedIn(newValue) {
      console.log("loggedIn changed to " + newValue);
      if (newValue !== null) {
        this.$router.push("/lobby");
      }
    }
  },
  computed: {
    currentVersion() {
      return parseInt(process.env.VUE_APP_BUILD_NUMBER, 10);
    },
    usingHTTP() {
      return !document.location.protocol.toLowerCase().startsWith("https");
    },
    ...mapState("socket", ["loggedIn", "loginError"])
  },
  methods: {
    autoLogin() {
      let lastUsedProvider = localStorage.lastUsedProvider;
      if (lastUsedProvider) {
        this.$store.dispatch("socket/login", {
          token: this.$auth.getToken(),
          provider: lastUsedProvider,
          guestName: this.guestName
        });
      }
    },
    authenticateGuest() {
      localStorage.lastUsedProvider = "guest";
      let auth = { provider: "guest", guestName: this.guestName };
      this.$store.dispatch("socket/login", auth);
    },
    authenticate(provider) {
      console.log("trying to authenticate with " + provider);
      this.$auth.authenticate(provider).then(() => {
        console.log("Authenticated with " + provider);
        let auth = {
          token: this.$auth.getToken(),
          provider: provider
        };
        localStorage.lastUsedProvider = provider;
        this.$store.dispatch("socket/login", auth);
      });
    },
    getToken() {
      if (this.$auth.isAuthenticated()) {
        return this.$auth.getToken();
      }
      return false;
    }
  }
};
</script>
<style scoped>
.logo {
  width: 128px;
  height: 128px;
}

.provider {
  min-width: 300px;
}
</style>
