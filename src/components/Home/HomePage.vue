<template>
  <div >
    <home-page-splash-screen ></home-page-splash-screen>
    <transition name="slide-fade-right" v-bind:key="CurrentPage">
      <img v-if="CurrentPage > 0" id="Divider" src="../../assets/images/TitleDividerFlag.png" alt="None">
    </transition>
    <div id="Content">
      <transition name="slide-fade-right" v-bind:key="CurrentPage">
        <AboutUs v-if="CurrentPage === 1" style="margin-top: 5.5%"></AboutUs>
      </transition>
      <transition name="slide-fade-right" v-bind:key="CurrentPage">
        <ContactUs v-if="CurrentPage === 2" style="margin-top: 6%"></ContactUs>
      </transition>
      <transition name="slide-fade-right" v-bind:key="CurrentPage">
        <Events v-if="CurrentPage === 3" style="margin-top: 6%"></Events>
      </transition>
      <transition name="slide-fade-right" v-bind:key="CurrentPage">
        <AllGalleriesModern v-if="CurrentPage === 4"  style="margin-top: 6%"></AllGalleriesModern>
        <AllGalleries v-if="CurrentPage === 5"></AllGalleries>
      </transition>
    </div>
    <HomeFooter v-if="CurrentPage > 0"></HomeFooter>

  </div>
</template>

<script>
    import HomePageSplashScreen from "./HomePageSplashScreen";
    import AboutUs from "../About/AboutUs";
    import AllGalleries from '../Gallery/AllGalleries'
    import ContactUs from "../ContactUs/ContactUsForm";
    //import EventsPage from "../Events/EventsPage";
    import {EventBus} from "../../App";


    import Events from "../Events/Events";
    import JQuery from 'jquery';
    import HomeFooter from "../Global/Footer";
    import AllGalleriesModern from "../Gallery/AllGalleriesModern";
    let $ = JQuery;
    //style="background: linear-gradient(to left,#A4B0F5, #FFFCF2); width: 100vw"
    export default {
        name: "HomePage",
        components: {AllGalleriesModern, HomeFooter, Events, AboutUs, HomePageSplashScreen, AllGalleries, ContactUs},
        data() {
            return {
                CurrentPage: 0,
            }
        },
        methods: {
            ServiceClick() {
                if(this.CurrentPage === 1) {
                    $('html, body').animate({
                        scrollTop: $('#Content').offset().top + 1000
                    }, 2000);
                } else {
                    $('html, body').animate({
                        scrollTop: $('#Content').offset().top
                    }, 2000);
                }

            }
        },
        mounted() {
            let self = this;
            EventBus.$on('Page', changed => {

                self.CurrentPage = changed;
                //console.log(`Oh, that's nice. It's gotten ${self.CurrentPage} clicks! :)`);
                this.ServiceClick();
            });
        }
    }
    //"
</script>

<style scoped>
#Divider {
  position: absolute;
  width: 100vw;
  transform: translate(-49.65vw, 0);
  overflow-x: hidden;
  max-width: 100%;
  background-color: #30011E;
  background-image: url("../../assets/images/BackgroundB.png");
  background-size: 10%;
  z-index: -1;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>