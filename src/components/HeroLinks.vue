<template>
  <ul class="hero-links">
    <li v-for="link in links" :key="link.text" class="hero-list-item">
      <a :href="link.url" class="hero-list-link">{{ link.text }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "HeroLinks",
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";
.hero-links {
  display: grid;
  grid-row-gap: 10px;
  grid-template-columns: repeat(12, 1fr);

  @include respond-above(md) {
    grid-template-columns: repeat(5, 1fr);
    max-width: 80%;
    margin: 0 auto;
  }
}

.hero-list-item {
  &:nth-child(-1n + 3) {
    grid-column: span 4;

    @include respond-above(md) {
      grid-column: span 1;
    }
  }
  &:nth-last-child(2) {
    grid-row-start: 2;
    grid-column: 3 / span 4;

    @include respond-above(md) {
      grid-column: span 1;
      grid-row-start: 1;
    }
  }

  &:nth-last-child(1) {
    grid-row-start: 2;
    grid-column: 7 / span 4;
    @include respond-above(md) {
      grid-column: span 1;
      grid-row-start: 1;
    }
  }
}
.hero-list-link {
  color: rgb(255, 255, 255);
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
</style>
