<template>
  <div class="newsletter">
    <div class="content">
      <h2 class="newsletter__title">
        Sign up to<br />the weekly<br />newsletter
      </h2>
      <a href="#" class="newsletter__link">Subscribe Now</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.newsletter {
  background-image: url("");
  background-position: center center;
  background-size: cover;
  position: relative;
  width: 100%;
  padding: 20px;

  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  .content {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

.newsletter__title {
  font-size: 24px;
  text-transform: uppercase;
  color: $color-white;
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
}

.newsletter__link {
  font-size: 9px;
  color: $color-white;
  text-transform: uppercase;
  text-decoration: none;
}
</style>
