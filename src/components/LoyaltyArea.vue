<template>
  <div class="loyalty-area">
    <h3 class="heading">{{ heading }}</h3>
    <Picture :images="images" class="image" />
    <div class="text-block">
      <p class="text">
        Welcome to MEMBERS ONLY. our world of unique rewards and bespoke
        benefits. Create an account to collect style points, access exclusive
        benefits collect credit towards your next order.
      </p>
      <ul class="link-list">
        <li v-for="link in links" :key="link.text" class="link-item">
          <a :href="link.url" class="link">{{ link.text }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Picture from "@/components/Picture.vue";
export default {
  name: "LoyaltyArea",
  components: {
    Picture,
  },
  props: {
    heading: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
    links: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.loyalty-area {
  padding: 60px 0 30px;

  @include respond-above(md) {
    padding: 80px 0 40px;
  }
}

.heading {
  font-size: 30px;
  font-weight: normal;
  margin: 0 0 -19px 0;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  z-index: 2;

  @include respond-above(md) {
    font-size: 90px;
    margin: 0 0 -60px 0;
  }
}

.image {
  position: relative;
  z-index: 1;
}

.link-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.link-item {
  &:last-of-type {
    text-align: right;
  }

  @include respond-above(md) {
    margin: 0 15px 0 0;
    text-align: right;

    &:last-of-type {
      margin: 0 0 0 15px;
      text-align: left;
    }
  }
}

.link {
  color: rgb(7, 7, 7);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.49px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;

  @include respond-above(md) {
    font-size: 10px;
  }
}

.text-block {
  background: rgb(248, 246, 242);
  padding: 15px 20px 60px;

  @include respond-above(md) {
    padding: 30px 20px 80px;
  }
}

.text {
  font-family: $heading-font-family;
  font-size: 14px;
  margin: 0 0 15px 0;
  @include respond-above(md) {
    font-size: 18px;
    margin: 0 auto 20px;
    max-width: 60%;
    text-align: center;
  }
}
</style>
