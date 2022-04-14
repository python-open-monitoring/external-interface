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
                                        <h1 class="h5 text-gray-900 mb-4">Change password</h1>
                                    </div>
                                    <form id="ChangePassword__form" v-if="change_password_form_visibility" action="" @submit.prevent="changePassword">
                                        <div class="form-group">
                                            <div class="col-xs-12">
                                                <input class="form-control form-control-user" type="password" id="ChangePassword__password" required="" placeholder="Password" value="" v-model="new_password">
                                            </div>
                                            <div v-if="!$v.new_password.required"><font size="2">Password is required</font></div>
                                            <div v-if="!$v.new_password.minLength"><font size="2">The password must contain a minimum {{$v.new_password.$params.minLength.min}} characters</font></div>
                                            <div v-if="!$v.new_password.maxLength"><font size="2">The password must contain a maximum {{$v.new_password.$params.maxLength.max}} characters</font></div>
                                            <div v-if="!$v.new_password.validValue"><font size="2">The password must contain english letters in upper and lower case and at least one digit</font></div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-xs-12">
                                                <input class="form-control form-control-user" type="password" id="ChangePassword__confirm_password" required="" placeholder="Repeat password" value="" v-model="new_password_confirm">
                                            </div>
                                            <div v-if="!$v.new_password_confirm.required"><font size="2">This is a required field</font></div>
                                            <div v-if="!$v.new_password_confirm.sameAsPassword"><font size="2">Passwords must match</font></div>
                                        </div>
                                        <div v-if="new_password_confirm_error"><code>{{ new_password_confirm_error }}</code></div>
                                        <button class="btn btn-primary btn-user btn-block" type="submit" :disabled="$v.$invalid" id="ChangePassword" method="post">
                                            Change password
                                        </button >
                                    </form>
                                    <span v-if="change_complited_info_visibility">Your password has been successfully changed.</span>
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
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

export default {
    name: "ChangePassword",
    data() {
        return {
            new_password : "",
            new_password_confirm : "",
            new_password_confirm_error : "",
            change_password_form_visibility : true,
            change_complited_info_visibility : false,
        }
    },
 
    validations: {
        new_password: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(30),
            validValue: val => /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g.test(val),
        },
        new_password_confirm: {
            required,
            sameAsPassword: sameAs('new_password')
        }
    },
    methods: {
        changePassword: function() {
            let new_password = this.new_password;
            var data = JSON.stringify({ new_password });            
            if (this.new_password == this.new_password_confirm){

                this.$http({url: `${process.env.VUE_APP_EXTERNAL_GATE}/user/change-password/`, 
                    data: data, 
                    method: 'POST' 
                })
                .then(() => {
                    this.change_password_form_visibility = false, this.change_complited_info_visibility = true
                })
                .catch(error => {
                    if (error.response.data == 'Invalid request.') {
                        return this.new_password_confirm_error = error.response.data;
                    }
                })
            } else {
                this.new_password_confirm_error = "Password confirmation was entered incorrectly."
            }            
        },           
    }
}
</script>