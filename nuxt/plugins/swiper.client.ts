import { defineNuxtPlugin } from '#app';
import 'swiper/element/css/navigation';
import { register } from 'swiper/element/bundle';

export default defineNuxtPlugin(() => {
  register();
});
