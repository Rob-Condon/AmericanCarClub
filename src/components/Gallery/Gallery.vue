<template>
    <div id="GallerySolo">
        <div >
            <div id="BlackBackground"></div>

            <div style="padding-top: 2%; position: relative">
                <div id="ButtonBoi" v-on:click="BackOut()">
                    <img id="ExitCar" src="../../assets/images/ExitCar.png" alt="None">
                    <h3 id="BackButton">Back!</h3>
                </div>
                <h1 id="Title">{{GalleryVue.Title}}</h1>

                <img class="Thumbnail" :src="myUrl+'/uploads/Thumbnails/'+GalleryVue.Location" alt="None">
            </div>
            <div style="height: 5vw; display: flex; justify-content: center; align-content: center; margin: 2vw">
                <button class="Button1" style="height: 70%; box-shadow: 0 8px 16px 0 rgba(0,0,0,0.8), 0 6px 20px 0 rgba(0,0,0,0.8);" v-on:click="Download">Download Gallery</button>
            </div>
            <div v-for="Image in FilteredList" v-bind:key="Image.id" class="GalleryImages" >
                <img  v-on:click="FullSize" class="ImageGallery" :src="myUrl+'/uploads/'+Image.Location" :alt="Image.Location.toLocaleString()">
            </div>
            <div id="FullScreenImage" v-if="CurrentImage !== ''">
                <img  v-on:click="CheckFull" class="ImageGallery active" :src="CurrentImage" :alt="None">
            </div>
            <div class="close-container" v-if="this.FullSized && !this.FullSize">
                <div class="leftright"></div>
                <div class="rightleft"></div>
                <label id="Close" class="close">close</label>
            </div>

        </div>
    </div>
</template>

<script>
    import BlogController from '@/services/BlogServices'
    import {EventBus} from "../../App";
    import JQuery from 'jquery';
    let $ = JQuery;
    export default {

        data() {
            return {
                blogContent: "",
                blogs: '',
                thumbnail: '',
                TotalBlogSize: 3,

                TransferBlogList: undefined,
                Reversed: false,
                FullSized: false,
                ImageTable: [],
                Start: 0,
                End: 4,
                CurrentImage: ""
            }
        },
        computed: {
            FilteredList() {
                if(this.LoadTabe) {
                    return []
                } else {
                    return this.ImageTable.filter(x => parseInt(x.GalleryLink) === parseInt(this.GalleryVue.id)).slice(0,this.End);
                }
            }
        },
        props: ['GalleryVue', 'LoadTable', 'myUrl'],
        methods: {
            //"
            async Download() {
                window.open('https://inhousewebtest.site:8081/DownloadGallery'+this.GalleryVue.id);
            },

            getThumbnail(pet) {
                var images = require.context('../../../server/uploads/Thumbnails', false, /\.jpeg$/);
                return images('./'+pet);
            },
            getImage(pet) {
                var images = require.context('../../../server/uploads', false, /\.jpeg$/);
                return images('./'+pet);
            },
            CheckFull() {
              if(this.CurrentImage !== '') {
                  this.CurrentImage = ''
              }
            },

            Change(int) {
                this.End += int;
                this.Start += int;
                //console.log(this.End);
            },

          BackOut() {
                  EventBus.$emit('CurrentGallery', undefined);
            },

            FullSize(e) {
                this.CurrentImage = e.target.src;
            }
        },
        async beforeMount() {
            if (this.LoadTable) {
                console.log(this.GalleryVue);
                const images = await BlogController.getImageTables(this.GalleryVue.id);
                this.ImageTable = images.data.Galleries;
                console.log(this.ImageTable);
                this.LoadTable = false;
            }
        },
        mounted() {
            let self = this;
            this.$nextTick(function(){
                window.addEventListener("scroll", function() {
                    self.Scrolled = document.documentElement.scrollTop;
                    if ($(window).scrollTop() + $(window).height() > $(document).height() - 200) {

                            self.End += 2;

                    }
                })
            });
            $("img").click(function() {
                console.log("colorClass");
            });
            $("img").on('click', function (event) {
                event.stopPropagation();
                event.stopImmediatePropagation();
                console.log("Cicked ffs");
                $('.active').not(this).addClass('non_active');
                $('.active').not(this).removeClass('active');

                if ($(this).hasClass('ImageGallery')) {
                    if ($(this).hasClass('active')) {
                        $(this).addClass('non_active');
                        $(this).removeClass('active');
                        $('#BlackBackground').backgroundColor = -1;
                        $('#BlackBackground').backgroundColor = 'rgba(0, 0, 0, 0);';
                        self.FullSized = false;
                    } else {
                        $(this).removeClass('non_active');
                        $(this).addClass('active');
                        $('#BlackBackground').zIndex = 2;
                        $('#BlackBackground').backgroundColor = 'rgba(0, 0, 0, 0.2);';
                        self.FullSized = true;
                    }
                }
            })
        }
    }
</script>

<style scoped>
    .Button1:hover {
        background-color: #4CAF50;
        color: white;
        cursor: pointer;
        transform: scale(1.1);
    }
    .Button1 {
        font-size: 16px;
        margin: 4px 2px;
        transition-duration: 0.4s;
        background-color: rgba(100,200,50,0.8);
        border: initial;
    }

    #ButtonBoi {
        position: absolute;
        left: -2%;
        top: 5%;
        margin: 0 1vw 1vw 5vw;
        display: grid;
        grid-template-rows: 50% 50%;
        width: 6vw;
        cursor: pointer;
    }
    #ExitCar {
        width: 6vw;
        transition: 1s;
    }
    #ButtonBoi:hover #ExitCar {
        transform: translateX(-4vw) rotate(10deg);
    }
    #BackButton {
        transform: translateY(-2.7vh);
        width: 6vw;
        text-align: center;
    }
    #Title {
        font-size: 5vw;
        text-align: center;
        font-family: 'Cinzel', serif;
    }
    #AboutUsTitle {

        font-family: 'Cinzel', serif;
        font-size: 2.5vw;
        margin: 0% 15% 3% 1%;

    }

    #GallerySolo {
      color: #D7CDCC;
        width: 100vw;
        text-align: left;

    }
    #AboutUsContent {
        font-size: 1.2vw;
        font-weight: 300;
        margin: 3% 10% 3% 1%;
        font-family: 'Roboto', sans-serif;
    }
    .Thumbnail {
        max-width: 50vw;
        margin-left: 25vw;
    }
    .ImageGallery {
        display: inline-block;
        max-width: 20vw;
        cursor: pointer;
    }
    .ImageGallery:hover {
    }
    .GalleryImages {
        display: inline-block;
        max-width: 25vw;
        margin: 4vw 14.5vw 4vw 14.5vw;
        justify-content: center;
        align-content: center;

    }

    .active {
        z-index: 3;
        max-width: 90vw;
        max-height: 100vh;
        //width: 200%;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow:  0vw  0vw 100vw 100vw rgba(0,0,0,0.7);
    }
    #BlackBackground {
        width: 100vw;
        height: 100vh;
        top: 0;
        position: fixed;
        background-color: rgba(0, 0, 0, 0);
        z-index: -1;
    }
    img {
        max-height: 100%;
        max-width: 100%;
        box-shadow:
          -50px -50px 0 -40px tomato,
          50px 50px 0 -40px tomato;
    }

    .non_active {
        width: initial;
        height: initial;
    }




















    .close-container {
        position: fixed;
        right: 15%;
        width: 50px;
        height: 50px;
        z-index: 6;
        cursor: pointer;
        top: 6%;
    }
    .leftright {
        height: 4px;
        width: 50px;
        position: absolute;
        margin-top: 24px;
        background-color: #f4a259;
        border-radius: 2px;
        transform: rotate(45deg);
        transition: all 0.3s ease-in;
    }
    .rightleft {
        height: 4px;
        width: 50px;
        position: absolute;
        margin-top: 24px;
        background-color: #f4a259;
        border-radius: 2px;
        transform: rotate(-45deg);
        transition: all 0.3s ease-in;
    }
    #Close {
        color: white;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 2px;
        transition: all 0.3s ease-in;
        opacity: 0;
    }
    .close {
        margin: 60px 0 0 5px;
        position: absolute;
    }
    .close-container:hover .leftright {
        transform: rotate(-45deg);
        background-color: #f25c66;
    }
    .close-container:hover .rightleft {
        transform: rotate(45deg);
        background-color: #f25c66;
    }
    .close-container:hover label {
        opacity: 1;
    }

</style>