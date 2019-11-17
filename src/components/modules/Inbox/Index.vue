<template>
  <Loader v-if="isLoading" />
  <inboxLayout v-else>
    <template v-slot:email_list v-if="emails.length > 0">
      <ul>
        <li v-for="(each,index) in emails" :key="index" @click="emailClicked(each)">
          <p class="subtitle is-6">
            <strong class="has-text-primary">{{each.subject}}</strong>
          </p>
          <p class="has-text-white">from: {{each.from}}</p>
        </li>
      </ul>
    </template>

    <template v-slot:email_view>
      <div class="view" v-if="emailContent">
        <div class="view_header level">
          <div class="level_left has-text-left">
            <h4 class="title is-4">{{emailContent.subject}}</h4>
            <p class="label is-small">from: {{emailContent.from}}</p>
            <p class="label is-small">{{emailContent.date}}</p>
            <p v-if="emailContent.spam_score >= 3" class="tag is-danger">SPAM</p>
          </div>
          <div class="level_left has-text-right">
            <a
              :href="emailContent.html_link"
              target="blank"
              class="has-text-secondary label is-small"
            >See Raw</a>
          </div>
        </div>
        <div v-html="emailContent.html_body"></div>
      </div>
    </template>
  </inboxLayout>
</template>
<script>
import inboxLayout from "../../layouts/inboxLayout";
import Loader from "../../ui/Loader";
import apiCall from "../../../utils/apiCall";

export default {
  /* eslint-disable */
  name: "Inbox",
  components: {
    inboxLayout,
    Loader
  },
  data() {
    return {
      isLoading: true,
      emails: [],
      emailContent: ""
    };
  },
  methods: {
    emailClicked(details) {
      this.emailContent = details;
    }
  },
  mounted() {
    let bucketName = this.$route.params.email;
    let that = this;
    let notificationMeta = {
      group: "notify",
      duration: 3000,
      speed: 500
    };

    apiCall("GET", `${bucketName}/emails`).then(
      data => {
        // If Response from server
        /* If has the error key -> Show message and reset state
                        Else Show message, route to the `/{bucketName}/emails/` to view the list */

        if (data.status !== 404) {
          if (data.content.length === 0) {
            notificationMeta.title = "Empty Bucket";
            notificationMeta.text = "Try sending emails and refresh";
            notificationMeta.type = "info";
            that.$notify(notificationMeta);
          }
          that.emails = data.content;
          that.isLoading = false;
        } else {
          notificationMeta.title = "Bucket Not found";
          notificationMeta.text = "Correct the name or create a new bucket";
          notificationMeta.type = "error";
          that.$notify(notificationMeta);
          that.$router.push({ path: `/` });
        }
      },
      err => {
        // If any unknown errors, Sentry them and show notification
        notificationMeta.type = "error";
        notificationMeta.title = "Err..!!";
        notificationMeta.text =
          "Something happened and we are looking into it.";

        that.$notify(notificationMeta);
        that.isLoading = false;
        // TODO: Log the err
      }
    );
  }
};
</script>

<style scoped>
ul {
  margin-top: 24px;
}

li {
  width: 100%;
  color: #fff;
  margin: auto;
  border-radius: 8px;
  margin: 8px auto;
  text-align: left;
  padding: 10px 10px;
  background-color: #333;
  border: 4px solid #333;
  line-break: auto;
}

li:hover {
  border: 4px solid var(--primary-color);
}

.view_header {
  border-bottom: 2px dashed var(--dark-color);
  background: var(--primary-color);
  padding: 8px;
}
</style>