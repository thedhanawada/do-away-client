<template>
  <main>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img
            src="@/assets/icons/logo.svg"
            alt="Bulma: Free, open source, and modern CSS framework based on Flexbox"
            width="112"
            height="28"
          />
        </router-link>

     
      </div>
         <div class="navbar-end">
          <router-link to="/" class="navbar-item">
            <ion-icon name="ios-information-circle-outline" size="large" class="has-text-dark"></ion-icon>
          </router-link>
          <router-link to="/" class="navbar-item">
            <ion-icon name="ios-code-working" size="large" class="has-text-dark"></ion-icon>
          </router-link>
        </div>
    </nav>
    <div class="cta-section">
      <div class="existing" v-if="existingBuckets">
        <h3 class="title is-3">Goto an existing bucket</h3>
        <div class="select">
          <select @change="loadSelectedBucket">
            <option>Select dropdown</option>
            <option v-for="bucket in existingBuckets" :key="bucket">{{bucket}}</option>
          </select>
        </div>
      </div>
      <hr v-if="existingBuckets" />
      <div class="form--wrapper">
        <form name="bucket-creation-form" @submit="createBucket($event)">
          <h3 class="title is-3">Create a new Bucket</h3>
          <input
            type="text"
            class="input"
            name="bucketname"
            id="bucketname"
            placeholder="Bucket name"
            required
          />
          <button
            type="submit"
            class="button is-fullwidth is-small"
            :class="{'is-loading' : isLoading}"
          >Create Bucket</button>
        </form>
      </div>
    </div>

    <div class="faq--wrapper">
      <h1 class="title">What is <span class="has-text-primary">DO</span>AWAY</h1>
    </div>
  </main>
</template>
<script>
/* eslint-disable */
import apiCall from "../../utils/apiCall";

export default {
  name: "LandingPage",
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    existingBuckets() {
      let existingBucketsData = localStorage.getItem("_doaway_buckets");
      if (existingBucketsData) {
        return existingBucketsData.split(",");
      } else {
        return false;
      }
    }
  },
  methods: {
    createBucket(event) {
      event.preventDefault();
      this.isLoading = true;

      /** TODO
       * Handle sanity of the input
       * Handle ascii chars
       * Handle XSS
       */
      let that = this;
      let notificationMeta = {
        group: "notify",
        duration: 3000,
        speed: 500
      };
      let form = event.target;
      let bucketName = form.children.bucketname.value
        .toLocaleLowerCase()
        .trim();
      // Handling multiple words
      bucketName = bucketName.split(" ").join("_");

      apiCall("POST", `createbucket/${bucketName}`).then(
        data => {
          // If Response from server
          /* If has the error key -> Show message and reset state
                        Else Show message, route to the `/{bucketName}/emails/` to view the list */
          if (data.status) {
            if (localStorage.getItem("_doaway_buckets")) {
              let bucketDetails = localStorage.getItem("_doaway_buckets");
              bucketDetails = bucketDetails.split(",");
              bucketDetails.push(bucketName);
              localStorage.setItem("_doaway_buckets", bucketDetails);
            } else {
              localStorage.setItem("_doaway_buckets", [bucketName]);
            }

            notificationMeta.type = "success";
            notificationMeta.title = "Done";
            notificationMeta.text = "Bucket Created.";
            that.$notify(notificationMeta);

            that.$router.push({ path: `inbox/${bucketName}/` });
          } else {
            notificationMeta.type = "warn";
            notificationMeta.title = "Ahem, Ahem";
            notificationMeta.text = data.message;
            that.$notify(notificationMeta);
          }
        },
        err => {
          // If any unknown errors, Sentry them and show notification
          notificationMeta.type = "error";
          notificationMeta.title = "Err..!!";
          notificationMeta.text =
            "Something happened and we are looking into it.";

          that.$notify(notificationMeta);
          // TODO: Log the err
        }
      );

      // resetting the button state
      this.isLoading = false;
    },
    loadSelectedBucket(event) {
      this.$router.push({ path: `inbox/${event.target.value}/` });
    }
  }
};
</script>
<style scoped>
.cta-section {
  width: 100%;
  min-height: 300px;
  height: auto;
  background-color: #f6eace;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

form {
  width: 100%;
  max-width: 320px;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
}

form > * {
  margin-bottom: 12px;
}

.faq--wrapper {
  margin-top: 40px;
  padding: 0px 40px;
}
</style>

