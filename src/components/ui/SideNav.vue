<template>
    <nav>
       <Modal v-if="isModalActive" @onclose="hideModal">
      <h3 class="title is-3">Info</h3>
      <ul>
         <li>
          <a href="https://github.com/Gaurav-Shankar/testbox-email/wiki/doaway.email-API-Documentation">Docs URL</a>
        </li>
        <li>
          <a href="https://github.com/team-underscore/">GitHub Repo</a>
        </li>
        <li>
          <a
            href="https://github.com/team-underscore/do-away-client/wiki/COOKIE-POLICY"
            target="blank"
          >cookie policy</a>
        </li>
      </ul>
      <br />
      <h3 class="title is-3">Other Tools</h3>
      <ul>
        <li>
          <a href="https://revealurl.xyz">Reveal URL</a>
        </li>
      </ul>
    </Modal>
      <ul class="nav-top">
        <li>
          <router-link to="/">
            <span class="icon">
              <i class="logo logo-short"></i>
            </span>
          </router-link>
        </li>
        <li @click="refreshView">
          <ion-icon name="ios-refresh-circle" size="large" class="has-text-dark"></ion-icon>
        </li>
      </ul>
      <ul class="nav-bottom">
        <li @click="deleteBucket">
          <ion-icon name="ios-trash" size="large" class="has-text-dark"></ion-icon>
        </li>
        <li @click="showModal">
          <ion-icon name="ios-information-circle-outline" size="large" class="has-text-dark"></ion-icon>
        </li>
      </ul>
    </nav>
</template>
<script>
import apiCall from "../../utils/apiCall";
import Modal from "../ui/Modal";
import deleteFromArray from "../../utils/deleteFromArray";

export default {
  name: "SideNav",
  data() {
    return {
      isModalActive: false
    };
  },
  components: {
    Modal
  },
  methods: {
    refreshView() {
      // TODO: This is not the ideal case
      window.location.reload();
    },
    deleteBucket() {
      let that = this;
      let notificationMeta = {
        group: "notify",
        duration: 3000,
        speed: 500
      };
      let bucketName = this.$route.params.email;
      apiCall("DELETE", `destroybucket/${bucketName}`).then(
        data => {
          // If Response from server
          /* If has the error key -> Show message and reset state
                        Else Show message, route to the `/{bucketName}/emails/` to view the list */
          if (data.status) {
            let array = localStorage.getItem("_doaway_buckets").split(",");
            localStorage.setItem(
              "_doaway_buckets",
              deleteFromArray(bucketName, array)
            );

            notificationMeta.type = "success";
            notificationMeta.title = "Deleted";
            notificationMeta.text = "Bucket and related emails are deleted.";
            that.$notify(notificationMeta);
            that.$router.push({ path: `/` });
          } else {
            notificationMeta.type = "warn";
            notificationMeta.title = "Bucket Already Deleted";
            notificationMeta.text = data.errorMessage;
            that.$notify(notificationMeta);
            that.$router.push({ path: `/` });
          }
        },
        err => {
          // TODO: If any unknown errors, Sentry them and show notification
          notificationMeta.type = "error";
          notificationMeta.title = "Err..!!";
          notificationMeta.text = err;

          that.$notify(notificationMeta);
          // TODO: Log the err
        }
      );
    },
    showModal() {
      this.isModalActive = true;
    },
    hideModal() {
      this.isModalActive = false;
    }
  }
};
</script>
<style scoped>
nav {
  padding: 0px 16px;
}

.nav-top,
.nav-bottom {
  display: flex;
  flex-direction: column;
  position: fixed;
}

.nav-top {
  top: 12px;
}

.nav-bottom {
  bottom: 12px;
}

.icon {
  width: 40px;
  height: 40px;
}

li {
  list-style: none;
  cursor: pointer;
}
</style>