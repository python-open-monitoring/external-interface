<template>
    <div class="container container-sm">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h5 text-gray-900 mb-4">Profile</h1>
                                    </div>
                                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link active" id="pills-name-tab" data-toggle="pill" href="#pills-name" role="tab" aria-controls="pills-name" aria-selected="true">General</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="pills-alerts-tab" data-toggle="pill" href="#pills-alerts" role="tab" aria-controls="pills-alert" aria-selected="false">Notifications</a>
                                        </li>   
                                        <!--
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="pills-avatar-tab" data-toggle="pill" href="#pills-avatar" role="tab" aria-controls="pills-avatar" aria-selected="false">Avatar</a>
                                        </li>
                                        -->
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="pills-delete-tab" data-toggle="pill" href="#pills-delete" role="tab" aria-controls="pills-delete" aria-selected="false">Delete profile</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="pills-tabContent">
                                        <div class="tab-pane fade show active" id="pills-name" role="tabpanel" aria-labelledby="pills-name-tab">
                                            <hr class="mb-4 mt-4">
                                            <p>Your name: <b>{{ authUser.username }}</b></p>
                                            <p>Your system ID: <b>{{ authUser.id }}</b></p>
                                            <p>Email: <b>{{ authUser.email }}</b></p>
                                            <div class="text-center">
                                                <h1 class="h6 text-gray-900 mb-4">Change name</h1>
                                            </div>
                                            <form class="user_profile__form" action="" @submit.prevent="changeName">
                                                <div class="user_profile__form__profile_name">                      
                                                    <div class="col-xs-12">
                                                        <input class="form-control" type="text" id="username" required="" placeholder="Новое имя" value="" v-model="username">
                                                    </div>
                                                    <div v-if="!$v.username.maxLength"><font size="2">The name name must contain a maximum {{$v.username.$params.maxLength.max}} characters</font></div>
                                                </div>
                                                <div class="mb-4">
                                                    <small v-if="change_name_success" class="text-green-400">{{ change_name_success }}</small>
                                                    <small v-if="change_name_error">{{ change_name_error }}</small>                                                
                                                </div>
                                                
                                                <div class="user_profile__form__profile_update_button text-center m-t-20">
                                                    <div class="col-xs-12">
                                                        <button class="btn btn-primary btn-user btn-block" type="submit" >Change name</button>
                                                    </div>
                                                </div>                                       
                                            </form>  
                                        </div>
                                        <div class="tab-pane fade" id="pills-alerts" role="tabpanel" aria-labelledby="pills-delete-tab">
                                            <hr class="mb-4 mt-4">
                                            <div class="text-center">
                                                <h1 class="h6 text-gray-900 mb-4">Telegram</h1>
                                            </div>
                                            <div class="card position-relative">
                                                <div class="card-header py-3">
                                                    <h6 class="m-0 font-weight-bold text-primary">Connection instructions</h6>
                                                </div>
                                                <div class="card-body">
                                                    <div class="dropdown mb-4">
                                                        <a href="https://t.me/Mon7Bot_bot" target="_blank" class="btn btn-primary" type="button" aria-haspopup="true" aria-expanded="false">
                                                            Open telegram bot @Mon7Bot_bot
                                                        </a>
                                                    </div>                                                    
                                                    <div class="mb-3">
                                                        <div class="small mb-1">Enter the message in the dialog window:</div>
                                                        <code>/start</code>
                                                    </div>
                                                    <div class="small mb-1">Copy the key:</div>
                                                    <nav class="navbar navbar-expand navbar-light bg-light mb-4">
                                                        {{ telegram_key }}
                                                    </nav>
                                                    <div class="small mb-1">Insert it into the dialog window and click send.</div>
                                                    <p class="mb-0 small">Attention: Only one telegram account can be attached to one account in the system.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="pills-avatar" role="tabpanel" aria-labelledby="pills-avatar-tab">
                                            <hr class="mb-4 mt-4">                              
                                            <div class="text-center">
                                                <h1 class="h6 text-gray-900 mb-4">Avatar</h1>
                                            </div>                                       
                                            <div class="user_profile__avatar text-center p-2 mb-12" v-if="!show_avatar">
                                                <img :src="avatar_url" width="200" height="200" class="image-circle" alt="" v-if="avatar_url">
                                                <img src="../../plugins/images/default-avatar.png" width="200" height="200" class="image-circle" alt="" v-if="!avatar_url">
                                            </div>
                                            <div class="user_profile__avatar_change_button text-center p-2 mb-12" v-if="!show_avatar">
                                                <button class="btn btn-primary btn-user" @click="avatarBlockActivate">Change avatar</button>
                                            </div>
                                            <div class="user_profile__update_avatar text-center p-2" v-if="show_avatar">
                                                <div>
                                                    <croppa 
                                                        v-model="avatar_croppa" 
                                                        canvas-color="transparent" 
                                                        :placeholder-font-size="14"
                                                        :width="200"
                                                        :height="200"
                                                        prevent-white-space
                                                        @init="avatarInit">
                                                    </croppa>
                                                </div>
                                                <div class="user_profile__avatar_change_button text-center p-2 mb-12" v-if="show_avatar">
                                                    <button class="btn btn-primary btn-user mr-4"  @click="generateImage">Load</button>
                                                    <button class="btn btn-primary btn-user" @click="avatarBlockDeactivate">Back</button>
                                                </div>                                                
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="pills-delete" role="tabpanel" aria-labelledby="pills-delete-tab">
                                            <hr class="mb-4 mt-4">  
                                            <div class="text-center">
                                                <h1 class="h6 text-gray-900 mb-4">You are going to delete the profile</h1>
                                            </div>                                   
                                            <div class="user_profile__form__profile_update_button text-center m-t-20">
                                                <div class="col-xs-12">
                                                    <button class="btn btn-danger btn-user" type="submit" @click="deleteProfile">Delete</button>
                                                </div>
                                            </div>                                           
                                        </div>
                                    </div>                              
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
Vue.use(Croppa);

import Swal from 'sweetalert2'
import { required, maxLength, } from 'vuelidate/lib/validators'

export default {
    name: 'UserProfile',
    data() {
        return {
            username : "",
            email : "",           
            change_name_success : "",
            change_name_error : "",
            avatar_url : "",
            show_avatar : false,
            avatar_croppa: null,
            avatar_image_url: "",
            telegram_key: "",
        }
    },

    validations: {
        username: {
            required,
            maxLength: maxLength(30)
        },
    },
    mounted() {
        this.$http({url: `${process.env.VUE_APP_EXTERNAL_API}/user-profile/user-profile/`,
            method: 'GET' 
        })
        .then(response => {
            this.username = JSON.parse(JSON.stringify(response.data.username));
            this.email = JSON.parse(JSON.stringify(response.data.email));
            if (response.data.avatar_url.length > 0) {
                this.avatar_url =  process.env.VUE_APP_EXTERNAL_API + 'media/' + JSON.parse(JSON.stringify(response.data.avatar_url));
            } 
            
            this.telegram_key = JSON.parse(JSON.stringify(response.data.telegram_key));
        })
        .catch(error => {
            return error;
        })
    },
    methods: {
        changeName: function() {
            var data = { "new_username": this.username };
            this.$http({
                method: 'POST',
                url: `${process.env.VUE_APP_EXTERNAL_API}/user-profile/user-profile/`,
                data: data, 
                 
            }).then((response) => {
                this.change_name_success = JSON.parse(JSON.stringify(response.data.message));
            })
            .catch(error => {
                if (error.response.data == 'Invalid request.') {
                    return this.change_name_error = error.response.data;
                }
            })            
        },
        changeAvatar: function() {
            let new_username = this.username;
            var data = JSON.stringify({ new_username });
            this.$http({
                method: 'POST',
                url: `${process.env.VUE_APP_EXTERNAL_API}/user-profile/user-profile/`,
                headers: { 'Content-Type': 'image/jpeg', },
                data: data, 
                 
            })
            .then((response) => {
                this.change_name_success = JSON.parse(JSON.stringify(response.data.message));
            })
            .catch(error => {
                if (error.response.data == 'Invalid request.') {
                    return this.change_name_error = error.response.data;
                }
            })
        },
        
        avatarInit() {
            this.avatar_croppa.addClipPlugin(function (ctx, x, y, w, h) {
                ctx.beginPath()
                ctx.arc(x + w / 2, y + h / 2, w / 2, 0, 2 * Math.PI, true)
                ctx.closePath()
            })
        },

        generateImage: function() {
            let url = this.avatar_croppa.generateDataUrl();
            if (!url) {
                Swal.fire({
                    icon: 'info',
                    title: 'Choose photo',
                    confirmButtonText: 'Back',
                    confirmButtonColor: '#36b9cc',
                });
                return;
            }
            this.avatar_image_url = url;

            var data = this.avatar_image_url
            this.$http({url: `${process.env.VUE_APP_EXTERNAL_API}/user-profile/user-profile-post-avatar/`, 
                data: data, 
                method: 'POST' 
            })
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        avatarBlockActivate: function() {
            this.show_avatar = true
        },

        avatarBlockDeactivate: function() {
            this.show_avatar = false
        },
        deleteProfile() {
            Swal.fire({
                title: 'Do you really want to delete the profile?',
                text: "This action is irreversible.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#36b9cc',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Нет',
                confirmButtonText: 'Да'
            }).then((result) => {
                if (result.isConfirmed) {            
                    var data = { "email": this.email };
                    this.$http({
                        method: 'DELETE',
                        url: `${process.env.VUE_APP_EXTERNAL_API}/user-profile/user-profile/`,
                        data: data, 
                        
                    }).then(response => {
                        console.log(response)
                        window.localStorage.clear();
                        Swal.fire({
                            title: 'Удалено!',
                            text: 'Your profile has been deleted.',
                            icon:'success'
                        });
                        setTimeout(function(){
                            window.location.href = `${process.env.VUE_APP_EXTERNAL_INTERFACE}`;
                        }, 5 * 1000);
                    })
                    .catch(error => {
                        Swal.fire({
                            title: 'Deletion Error',
                            text: error,
                            icon:'error'
                        });

                    }) 

                }
            })
        },             
    },
	computed: {
		authUser: function() {
			return this.$store.getters.authUser
		}
	},
}
</script>
