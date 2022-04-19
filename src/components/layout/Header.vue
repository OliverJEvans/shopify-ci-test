<template>
  <template v-if="!isBurgerMenuOpen">
    <div class="header">
      <div class="header__middle">
        <img src="@/assets/images/logo.svg" class="header__logo" />
      </div>

      <div class="header__left">
        <IconButton
          class="header__icon u__hide--desktop"
          icon="burger"
          @click="toggleMobileMenu"
        />
        <nav class="navigation u__hide--mobile">
          <Button
            :transparent="true"
            class="navigation__item button button--transparent"
          >
            Shop
          </Button>
          <Button
            :transparent="true"
            class="navigation__item button button--transparent"
          >
            Journal
          </Button>
        </nav>
      </div>

      <div class="header__right">
        <IconButton class="header__icon u__hide--desktop" icon="bag" />
        <nav class="navigation u__hide--mobile">
          <Button
            :transparent="true"
            class="navigation__item button button--transparent"
          >
            Search
          </Button>
          <a href="#" class="navigation__item">Members Only.</a>
          <Button
            :transparent="true"
            class="navigation__item button button--transparent"
          >
            Account
          </Button>
          <Button
            :transparent="true"
            class="navigation__item button button--transparent"
          >
            Bag
          </Button>
        </nav>
      </div>
    </div>
  </template>

  <template v-if="isBurgerMenuOpen">
    <div class="menu">
      <div class="header container">
        <div class="header__left">
          <IconButton
            class="header__icon"
            icon="burger"
            @click="toggleMobileMenu"
          />
        </div>

        <div class="header__middle">
          <input
            v-debounce:500ms="handleSearchDebounce"
            type="search"
            class="search-input"
            placeholder="Type here to search..."
            @input="handleSearchInput"
            @focus="(e) => changeActiveMenu(e, 'search-recent')"
          />
        </div>
      </div>

      <div class="menu__header container">{{ activeMenu.title }}</div>
      <component :is="activeMenu.component" />

      <div ref="menu-bottom" class="menu__bottom">
        <button
          class="menu__button menu__button--active"
          @click="(e) => changeActiveMenu(e, 'navigation')"
        >
          Shop
        </button>
        <button
          class="menu__button"
          @click="(e) => changeActiveMenu(e, 'journal')"
        >
          Journal
        </button>
        <button
          class="menu__button"
          @click="(e) => changeActiveMenu(e, 'account')"
        >
          Account Sign In
        </button>
        <button
          class="menu__button"
          @click="(e) => changeActiveMenu(e, 'shipto')"
        >
          Ship to
        </button>
        <button
          class="menu__button"
          @click="(e) => changeActiveMenu(e, 'customercare')"
        >
          Customer Care
        </button>
      </div>
    </div>
  </template>
</template>

<script>
import { markRaw, defineAsyncComponent } from "vue";
import { mapActions, mapState } from "vuex";
import IconButton from "@/components/IconButton.vue";
import Button from "@/components/Button.vue";
const Navigation = markRaw(
  defineAsyncComponent(() => import("@/components/navigation/Navigation.vue"))
);
const Journal = markRaw(
  defineAsyncComponent(() => import("@/components/navigation/Journal.vue"))
);
const Account = markRaw(
  defineAsyncComponent(() => import("@/components/navigation/Account.vue"))
);
const ShipTo = markRaw(
  defineAsyncComponent(() => import("@/components/navigation/ShipTo.vue"))
);
const CustomerCare = markRaw(
  defineAsyncComponent(() => import("@/components/navigation/CustomerCare.vue"))
);
const SearchResults = markRaw(
  defineAsyncComponent(() =>
    import("@/components/navigation/SearchResults.vue")
  )
);
const SearchRecent = markRaw(
  defineAsyncComponent(() => import("@/components/navigation/SearchRecent.vue"))
);

export default {
  name: "HeaderComponent",
  components: {
    IconButton,
    Navigation,
    Journal,
    Account,
    ShipTo,
    CustomerCare,
    SearchResults,
    Button,
    SearchRecent,
  },
  data() {
    return {
      activeMenu: {
        title: "Shop",
        component: Navigation,
      },
      searchTerm: null,
    };
  },
  computed: {
    ...mapState("app", ["isBurgerMenuOpen"]),
  },
  methods: {
    ...mapActions("app", ["toggleMobileMenu"]),
    ...mapActions("search", ["addSearchTerm"]),
    changeActiveMenu(e, menu) {
      //todo: This is all janky, fix this

      if (e) {
        const bottomButtons = this.$refs["menu-bottom"].childNodes;
        bottomButtons.forEach((button) => {
          button.classList.remove("menu__button--active");
        });
        e.target.classList.add("menu__button--active");
      }

      switch (menu) {
        case "navigation":
          this.activeMenu = {
            title: "Shop",
            component: Navigation,
          };
          break;
        case "journal":
          this.activeMenu = {
            title: "Journal",
            component: Journal,
          };
          break;
        case "account":
          this.activeMenu = {
            title: "Account",
            component: Account,
          };
          break;
        case "shipto":
          this.activeMenu = {
            title: "Ship To",
            component: ShipTo,
          };
          break;
        case "customercare":
          this.activeMenu = {
            title: "Customer Care",
            component: CustomerCare,
          };
          break;
        case "search-results":
          this.activeMenu = {
            title: "Search Results",
            component: SearchResults,
          };
          break;
        case "search-recent":
          this.activeMenu = {
            title: "Search Results",
            component: SearchRecent,
          };
          break;
        default:
          this.activeMenu = {
            title: "Shop",
            component: Navigation,
          };
          break;
      }
    },
    handleSearchDebounce(value) {
      if (value !== this.searchTerm && value) {
        this.searchTerm = value;
        this.addSearchTerm(value);
      }
    },
    handleSearchInput(event) {
      console.log(event);
      const value = event.target.value;

      if (value.trim().length === 0) {
        this.changeActiveMenu(null, "search-recent");
      } else {
        this.changeActiveMenu(null, "search-results");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.header {
  display: flex;
  align-items: center;
  gap: 20px;

  &__middle {
    flex: 1 0 auto;
    order: 1;
    text-align: center;
  }

  &__left,
  &__right {
    flex: 0 1 auto;
  }

  &__left {
    order: 0;
  }

  &__right {
    order: 2;
  }

  &__logo {
    vertical-align: top;
    padding: 15px 0;
  }
}

.menu {
  position: absolute;
  background: $color-white;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  &__bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $color-light;
    border-top: 1px solid rgba($color-dark, 0.2);
    display: flex;
    padding: 0 10px;
    justify-content: space-evenly;
  }

  &__button {
    padding: 17px 0;
    flex: 0 0 auto;
    background: none;
    outline: none;
    border: none;
    font-size: 10px;
    opacity: 0.2;

    &--active {
      opacity: 1;
    }
  }

  &__header {
    background: $color-light;
    font-size: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    text-transform: uppercase;
    font-family: $heading-font-family;
    margin-bottom: 10px;
  }
}

.navigation {
  display: flex;
  gap: 20px;
  align-items: center;

  &__item {
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 600;
    text-decoration: none;
    color: $color-dark;
  }
}

.search-input {
  border: none;
  outline: none;
  font-size: 12px;
  font-family: $body-font-family;
  width: 100%;
  padding: 10px 0;

  &::placeholder {
    opacity: 0.3;
  }
}
</style>
