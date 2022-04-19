<template>
  <h1>Account</h1>

  <template v-if="!isLoggedIn">
    <template v-if="!showForgottenPassword">
      <LoginForm />
      <button type="button" @click="() => (showForgottenPassword = true)">
        Forgotten password?
      </button>
    </template>

    <AccountRecovery v-if="showForgottenPassword" />
  </template>

  <template v-else>
    <button @click="changeClickedMenu('orders')">Orders</button>
    <button @click="changeClickedMenu('details')">Details</button>
    <button @click="changeClickedMenu('loyalty')">Loyalty</button>
    <button @click="changeClickedMenu('edit')">Edit</button>

    <component :is="clickedMenu" @back="changeClickedMenu(null)" />
  </template>
</template>

<script>
import LoginForm from "@/components/navigation/account/LoginForm.vue";
import AccountRecovery from "@/components/navigation/account/AccountRecovery.vue";
import { mapGetters } from "vuex";
import { markRaw, defineAsyncComponent } from "vue";

const Home = markRaw(
  defineAsyncComponent(() => import("@/components/navigation/account/Home.vue"))
);

const Orders = markRaw(
  defineAsyncComponent(() =>
    import("@/components/navigation/account/Orders.vue")
  )
);
const Details = markRaw(
  defineAsyncComponent(() =>
    import("@/components/navigation/account/Details.vue")
  )
);
const Loyalty = markRaw(
  defineAsyncComponent(() =>
    import("@/components/navigation/account/Loyalty.vue")
  )
);
const Edit = markRaw(
  defineAsyncComponent(() => import("@/components/navigation/account/Edit.vue"))
);

export default {
  name: "NavigationAccountPage",
  components: {
    LoginForm,
    AccountRecovery,
    Home,
    Orders,
    Details,
    Loyalty,
    Edit,
  },
  data() {
    return {
      showForgottenPassword: false,
      clickedMenu: Home,
    };
  },
  computed: {
    ...mapGetters("app", ["isLoggedIn"]),
  },
  methods: {
    changeClickedMenu(menu) {
      //todo: This is janky, fix this
      switch (menu) {
        case "home":
          this.clickedMenu = Home;
          break;
        case "orders":
          this.clickedMenu = Orders;
          break;
        case "details":
          this.clickedMenu = Details;
          break;
        case "loyalty":
          this.clickedMenu = Loyalty;
          break;
        case "edit":
          this.clickedMenu = Edit;
          break;
        default:
          this.clickedMenu = Home;
          break;
      }
    },
  },
};
</script>
