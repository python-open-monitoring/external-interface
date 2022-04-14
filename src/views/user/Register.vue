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
                                        <h1 class="h5 text-gray-900 mb-4">Registration</h1>
                                    </div>
                                    <form class="user" id="userRegister__registration-form" action="" @submit.prevent="register">
                                        <div class="form-group">
                                            <div class="col-xs-12">
                                                <input class="form-control form-control-user" type="text" id="username" required="" placeholder="Name" value="" v-model="username">
                                            </div>
                                            <div v-if="!$v.username.required"><font size="2">Name is required</font></div>
                                            <div v-if="!$v.username.maxLength"><font size="2">The name must contain a maximum {{$v.username.$params.maxLength.max}} characters</font></div>
                                        </div>                                        
                                        <div class="form-group">
                                            <div class="col-xs-12">
                                                <input class="form-control form-control-user" type="email" id="email" required="" placeholder="Email" value="" v-model="email">
                                            </div>
                                            <span v-if="!$v.email.required"><font size="2">Email is required</font></span>
                                            <span v-if="!$v.email.email"><font size="2">Enter the valid Email address</font></span>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-xs-12">
                                                <input class="form-control form-control-user" type="password" id="password" required="" placeholder="Password" value="" v-model.trim="$v.password.$model">
                                            </div>
                                            <div v-if="!$v.password.required"><font size="2">Password is required</font></div>
                                            <div v-if="!$v.password.minLength"><font size="2">The password must contain a minimum {{$v.password.$params.minLength.min}} characters</font></div>
                                            <div v-if="!$v.password.maxLength"><font size="2">The password must contain a maximum {{$v.password.$params.maxLength.max}} characters</font></div>
                                            <div v-if="!$v.password.validValue"><font size="2">The password must contain english letters in upper and lower case and at least one digit</font></div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-xs-12">
                                                <input class="form-control form-control-user" type="password" id="password_repeat" required="" placeholder="Повторите пароль" value="" v-model.trim="$v.password_repeat.$model">
                                            </div>
                                            <div v-if="!$v.password_repeat.required"><font size="2">This is required field</font></div>
                                            <div v-if="!$v.password_repeat.sameAsPassword"><font size="2">Passwords must match</font></div>
                                        </div>
                                        <div class="form-group text-center m-t-20">
                                            <div class="col-xs-12">
                                                <button class="btn btn-primary btn-user btn-block" type="submit" :disabled="$v.$invalid">Registration</button>
                                            </div>
                                        </div>
                                    </form>
                                    <hr>
                                    <div class="text-center">
                                        <router-link :to="{ name: 'ResetPassword'}" class="small"><b>Reset password</b></router-link>
                                    </div>
                                    <div class="text-center">
                                         <router-link :to="{ name: 'UserLogin'}" class="small"><b>Sign in</b></router-link>
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

import { required, minLength, maxLength, sameAs, email } from 'vuelidate/lib/validators'

export default {
    name: "UserRegister",
    data() {
        return {
            username : "",
            email : "",          
            password : "",
            password_repeat: ""
        }
    },

    validations: {
        username: {
            required,
            maxLength: maxLength(30)
        },
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(30),
            validValue: val => val ? /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g.test(val) : true,
        },
        password_repeat: {
            required,
            sameAsPassword: sameAs('password')
        }
    }, 

    methods: {
        register: function() {
            let username = this.username;
            let email = this.email;            
            let password = this.password;
            this.$store.dispatch("registerUser", { username, email, password })
            .then(() => this.$router.push("/dashboard"))
            .catch(err => console.log(err))
        },           
    }
}
</script>