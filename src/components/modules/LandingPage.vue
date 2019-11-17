<template>
  <main>
    <Modal v-if="isModalActive" @onclose="hideModal">
      <h3 class="title is-3">Info</h3>
      <ul>
         <li>
          <a href="https://github.com/Gaurav-Shankar/testbox-email/wiki/doaway.email-API-Documentation">Docs URL</a>
        </li>
        <li>
          <a href="https://github.com/team-underscore/">GitHub Repo</a>
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
      <ul class="navbar-end">
        <li class="navbar-item" @click="showModal">
          <ion-icon name="ios-information-circle-outline" size="large" class="has-text-dark"></ion-icon>
        </li>
      </ul>
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
          <button type="submit" class="button is-fullwidth is-small">Create Bucket</button>
        </form>
      </div>
    </div>

    <div class="faq--wrapper">
      <div class="columns">
        <div class="column">
          <h1 class="title is-1">
            What is
            <span class="has-text-primary">DO</span>AWAY
          </h1>
          <p>DOAWAY is a not a tool with disposable email domains. All the emails are sent to a single domain(doaway.email) which is verified and totally safe to use.</p>
        </div>
      </div>

      <!-- 2 -->
      <div class="columns">
        <div class="column">
          <h3 class="title is-3">
            What is
            <span class="has-text-primary">DO</span>AWAY then?
          </h3>
          <p>doaway is a simple email recording application which can be used for a variety of use cases. Change your test email to a doaway email and you will be inspect all the emails sent.</p>
        </div>

        <div class="column">
          <h3 class="title is-3">
            Why did you
            <span class="has-text-primary has-text-weight-bold">BUILD</span> this?
          </h3>
          <p>I work a lot on testing an application which sends out bulk emails and wanted to write automated tests which could verify the personalised templates sent. Every other tool was a bit complex and unfit for my use case and hence we built this.</p>
        </div>
      </div>

      <!-- 3 -->
      <div class="columns">
        <div class="column">
          <h3 class="title is-3">
            What are the
            <span class="has-text-primary has-text-weight-bold">USE CASES</span> ?
          </h3>
          <p>A couple of use cases I could think of while building this. You can use doaway to</p>
          <ul>
            <li>
              <span class="has-text-primary has-text-weight-bold">BEAT</span> spam.
            </li>
            <li>
              <span class="has-text-primary has-text-weight-bold"><a href="https://github.com/Gaurav-Shankar/testbox-email/wiki/Writing-Automated-Tests-with-doaway.email.">Write complete automated UI tests</a></span> with Capybara, Ghost Inspector, Selenium etc and verify if the emails are sending properly or the content of your email template.
            </li>
            <li>
              <span class="has-text-primary has-text-weight-bold">Check the deliverability</span> of your email with our spam score.
            </li>
            <li>
              <span class="has-text-primary has-text-weight-bold">Benchmark</span> by checking the First and Last received emails timestamps.
            </li>
          </ul>
        </div>
      </div>

      <!-- 4 -->
      <div class="columns">
        <div class="column">
          <h3 class="title is-3">
            How does it
            <span class="has-text-primary has-text-weight-bold">WORK</span>?
          </h3>
          <p>
            Simple! Just create a bucket and start sending emails to your bucketname@doaway.email, give the mail servers a couple of seconds to deliver your email and hit the refresh button on the inbox page.
            Looking to write automated tests or validate spam using our service, please check out our <a href = "https://github.com/Gaurav-Shankar/testbox-email/wiki/doaway.email-API-Documentation">API documentation.</a>
          </p>
        </div>

        <div class="column">
          <h3 class="title is-3">
            Can I use this for something
            <span class="has-text-primary has-text-weight-bold">IMPORTANT</span>?
          </h3>
          <p>Sure, just don’t use it for private or confidential information or for a nuclear power plant or anything like that. I’m using it in a lot of places, and I don’t want it to break. So go for it! And if this doesn't sound like an SLA, that's because it isn't.</p>
        </div>
      </div>

      <!-- 5 -->
      <div class="columns">
        <div class="column">
          <h3 class="title is-3">
            What about
            <span class="has-text-primary has-text-weight-bold">PRIVACY</span>?
          </h3>
          <p>
            Good question. The created buckets are valid for 1 hour from the point they were created. We also use cookies for the same.
            Any email sent to our service is publicly accessible by everyone provided they know your bucket name. Also, we do not any store any emails in our database. All the emails sent are stored for 5 minutes from the point they were received by our service and auto destroyed afterwards making them inaccessible.
          </p>
        </div>

        <div class="column">
          <h3 class="title is-3">I’m not receiving emails?</h3>
          <p>Don’t blame it on us. As long as the email servers deliver emails to us, you should be able to see it too.</p>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
/* eslint-disable */
import apiCall from "../../utils/apiCall";
import Modal from "../ui/Modal";

export default {
  name: "LandingPage",
  data() {
    return {
      isModalActive: false
    };
  },
  components: {
    Modal
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
    showModal() {
      this.isModalActive = true;
    },
    hideModal() {
      this.isModalActive = false;
    },
    createBucket(event) {
      event.preventDefault();

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
          // TODO: If any unknown errors, Sentry them and show notification
          notificationMeta.type = "error";
          notificationMeta.title = "Err..!!";
          notificationMeta.text =
            "Something happened and we are looking into it.";

          that.$notify(notificationMeta);
          // TODO: Log the err
        }
      );
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

.columns {
  margin: 60px 0px;
}
</style>

