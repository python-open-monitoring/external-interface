<template>
    <div class="container container-sm mb-0">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card shadow">
                    <div class="card-header">
                        <h6 class="m-0 font-weight-bold text-primary"><router-link :to="{ name: 'MonitorList'}" class="collapse-item">Monitor list</router-link> / {{ monitor.monitor_name }}</h6>
                    </div>
                </div>  
            </div>
        </div> 
        <div class="row justify-content-center mt-0">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Monitor {{ monitor.name }}</h1>
                                    </div>
                                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link active" id="pills-name-tab" data-toggle="pill" href="#pills-name" role="tab" aria-controls="pills-name" aria-selected="true">General</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="pills-edit-tab" data-toggle="pill" href="#pills-edit" role="tab" aria-controls="pills-edit" aria-selected="false">Edit monitor</a>
                                        </li>   
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="pills-restore-tab" data-toggle="pill" href="#pills-restore" role="tab" aria-controls="pills-edit" aria-selected="false">Restore actions</a>
                                        </li>                                        
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="pills-stat-tab" data-toggle="pill" href="#pills-stat" role="tab" aria-controls="pills-stat" aria-selected="false">Statistic</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="pills-delete-tab" data-toggle="pill" href="#pills-delete" role="tab" aria-controls="pills-delete" aria-selected="false">Delete monitor</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="pills-tabContent">
                                        <div class="tab-pane fade show active" id="pills-name" role="tabpanel">
                                            <hr class="mb-4 mt-4">
                                            <div>ID: <b>{{ monitor.monitor_id }}</b></div>
                                            <hr>
                                            <div>Name: <b>{{ monitor.monitor_name }}</b></div>
                                            <div>Host: <b>{{ monitor.monitor_host }}</b></div>
                                            <div>Port: <b>{{ monitor.monitor_port }}</b></div>
                                            <hr>
                                            <div>
                                                Active: 
                                                <b v-if="monitor.monitor_active == 'yes'">Yes</b>
                                                <b v-if="monitor.monitor_active == 'no'">No</b>
                                            </div>
                                            <hr>
                                            <div>Created: <b>{{ monitor.monitor_creation_date }}</b></div>
                                            <hr>                                     
                                            <div v-if="monitor.monitor_last_connection_establish == 'yes'">
                                                <span style="color:green"><i class="fa fa-check"></i> Available</span> 
                                                <br>
                                                <small>Last response time: {{ monitor.monitor_last_response_time }} seconds</small>                               
                                            </div>
                                            <div v-if="monitor.monitor_last_connection_establish == 'no'">
                                                <span style="color:red"><i class="fa fa-exclamation-triangle"></i> Not available</span>                          
                                            </div> 
                                            <small>Last monitoring: <b>{{ monitor.monitor_last_monitoring_date }}</b></small>                                          
                                        </div>
                                        <div class="tab-pane fade" id="pills-edit" role="tabpanel">
                                            <hr class="mb-4 mt-4">
                                            <form id="MonitorView__edit_form" action="" @submit.prevent="editMonitor">
                                                <div class="form-group">
                                                    <div class="col-xs-12">
                                                        <input class="form-control form-control-user" id="MonitorView__edit_form__name" required="" placeholder="Mame" value="" v-model="monitor_name">
                                                    </div>
                                                    <div v-if="!$v.monitor_name.minLength"><font size="2">The name must contain a minimum {{ $v.monitor_name.$params.minLength.min }} characters</font></div>
                                                    <div v-if="!$v.monitor_name.maxLength"><font size="2">The name must contain a maximum {{ $v.monitor_name.$params.minLength.max }} characters</font></div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-xs-12">
                                                        <input class="form-control form-control-user" id="MonitorView__edit_form__host" required="" placeholder="Host" value="" v-model="monitor_host">
                                                    </div>
                                                    <div v-if="!$v.monitor_host.minLength"><font size="2">The host must contain a minimum {{ $v.monitor_host.$params.minLength.min }} characters</font></div>
                                                    <div v-if="!$v.monitor_host.maxLength"><font size="2">The host must contain a maximum {{ $v.monitor_host.$params.minLength.max }} characters</font></div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-xs-12">
                                                        <input class="form-control form-control-user" id="MonitorView__edit_form__port" required="" placeholder="Port" value="" v-model="monitor_port">
                                                    </div>
                                                    <div v-if="!$v.monitor_port.minLength"><font size="2">The port must contain a minimum {{ $v.monitor_port.$params.minLength.min }} characters</font></div>
                                                    <div v-if="!$v.monitor_port.maxLength"><font size="2">The port must contain a maximum {{ $v.monitor_port.$params.minLength.max }} characters</font></div>
                                                    <div v-if="!$v.monitor_port.validValue"><font size="2">The port can only contain numbers</font></div>
                                                </div>                                                                                                
                                                <button class="btn btn-primary btn-user btn-block" type="submit" :disabled="$v.$invalid" id="MonitorView__edit_form__submit">
                                                    Edit monitor
                                                </button >
                                            </form>
                                            <div v-if="edit_monitor_success" class="mt-2">Monitor successfully changed</div>
                                            <div v-if="edit_monitor_error" class="mt-2">{{ edit_monitor_error }}</div>                                           
                                        </div>
                                        <div class="tab-pane fade" id="pills-restore" role="tabpanel">
                                            <hr class="mb-4 mt-4">
                                            <form id="MonitorView__restore_form" action="" @submit.prevent="restoreCommands">
                                                <div class="form-group">
                                                    <div class="col-xs-12">
                                                        <input class="form-control form-control-user" id="MonitorView__restore_form__host" required="" placeholder="Host" value="" v-model="restore_host">
                                                    </div>
                                                    <div v-if="!$v.restore_host.minLength"><font size="2">The host must contain a minimum {{ $v.restore_host.$params.minLength.min }} characters</font></div>
                                                    <div v-if="!$v.restore_host.maxLength"><font size="2">The host must contain a maximum {{ $v.restore_host.$params.minLength.max }} characters</font></div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-xs-12">
                                                        <input class="form-control form-control-user" id="MonitorView__restore_form__port" required="" placeholder="Port" value="" v-model="restore_port">
                                                    </div>
                                                    <div v-if="!$v.restore_port.minLength"><font size="2">The port must contain a minimum {{ $v.restore_port.$params.minLength.min }} characters</font></div>
                                                    <div v-if="!$v.restore_port.maxLength"><font size="2">The port must contain a maximum {{ $v.restore_port.$params.minLength.max }} characters</font></div>
                                                    <div v-if="!$v.restore_port.validValue"><font size="2">The port can only contain numbers</font></div>
                                                </div>  
                                                <div class="form-group">
                                                    <div class="col-xs-12">
                                                        <input class="form-control form-control-user" id="MonitorView__restore_form__username" required="" placeholder="User" value="" v-model="restore_username">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-xs-12">
                                                        <input class="form-control form-control-user" id="MonitorView__restore_form__password" required="" placeholder="Password" value="" v-model="restore_password">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-xs-12">
                                                        <textarea class="form-control form-control-user" id="MonitorView__restore_form__port" required="" placeholder="Commands" value="" v-model="restore_commands" style="height:400px;">
                                                        </textarea>
                                                    </div>
                                                </div>                                                                                                
                                                <button class="btn btn-primary btn-user btn-block" type="submit" :disabled="$v.$invalid" id="MonitorView__restore_form__submit">
                                                    Save
                                                </button >
                                            </form>
                                            <div v-if="edit_restore_success" class="mt-2">Restore commands successfully changed</div>
                                            <div v-if="edit_restore_error" class="mt-2">{{ edit_restore_error }}</div>    
                                            <div v-if="restore_activities.length > 0">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" style="margin-bottom: 0px !important">
                                                        <thead>
                                                            <tr>
                                                                <th>Id</th> 
                                                                <th>StdOut log</th> 
                                                                <th>StdErr log</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for='restore_activity in restore_activities' :key="restore_activity.restore_activity_id">
                                                                <td>{{ restore_activity.restore_activity_id }}</td>
                                                                <td>{{ restore_activity.restore_stdout_log }}</td>
                                                                <td>{{ restore_activity.restore_stderr_log }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>                                                                                    
                                        </div>
                                        <div class="tab-pane fade" id="pills-stat" role="tabpanel" aria-labelledby="pills-avatar-tab">
                                            <hr class="mb-4 mt-4">  
                                            <div class="text-center">
                                                <h1 class="h6 text-gray-900 mb-4">Statistic</h1>
                                            </div>  
                                            <div v-if="monitor_activities.length > 0">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" style="margin-bottom: 0px !important">
                                                        <thead>
                                                            <tr>
                                                                <th>Id</th> 
                                                                <th>Connection establish</th> 
                                                                <th>Data</th>
                                                                <th>Response (in seconds)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for='monitor_activity in monitor_activities' :key="monitor_activity.monitor_activity_id">
                                                                <td>{{ monitor_activity.monitor_activity_id }}</td>
                                                                <td>{{ monitor_activity.monitor_connection_establish }}</td>
                                                                <td>{{ monitor_activity.monitor_monitoring_date }}</td>
                                                                <td>{{ monitor_activity.monitor_response_time }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>                                            
                                        </div>
                                        <div class="tab-pane fade" id="pills-delete" role="tabpanel" aria-labelledby="pills-delete-tab">
                                            <hr class="mb-4 mt-4">  
                                            <div class="text-center">
                                                <h1 class="h6 text-gray-900 mb-4">Are you going to remove the monitor</h1>
                                            </div>                                   
                                            <div class="user_profile__form__profile_update_button text-center m-t-20">
                                                <div class="col-xs-12">
                                                    <button class="btn btn-danger btn-user" type="submit" @click="deleteMonitor">Delete</button>
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
import Swal from 'sweetalert2';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
    name: 'MonitorView',
    data() {
        return {       
            monitor: {},     
            monitor_id: this.$route.params.id,      
            monitor_name: "",
            monitor_host: "",
            monitor_port: "",
            edit_monitor_success: false,
            edit_monitor_error: false,
            user_secret_api_key:"",
            restore_host: "",
            restore_port: "",
            restore_username: "",
            restore_password: "",
            restore_commands: "",
            edit_restore_success: false,
            edit_restore_error: false,
            monitor_activities : [],
            restore_activities: [],
        }
    },
    validations: {
        monitor_name: {
            minLength: minLength(1),
            maxLength: maxLength(30),
        },
        monitor_host: {
            minLength: minLength(3),
            maxLength: maxLength(90),
        },
        monitor_port: {
            minLength: minLength(1),
            maxLength: maxLength(5),
            validValue: val => /^\d+$/.test(val),
        },
        restore_host: {
            minLength: minLength(3),
            maxLength: maxLength(90),
        },
        restore_port: {
            minLength: minLength(1),
            maxLength: maxLength(5),
            validValue: val => /^\d+$/.test(val),
        },       
    },    
    methods: {
        editMonitor: function() {
            let monitor_data = {}
            monitor_data.monitor_id = this.monitor_id;
            monitor_data.monitor_name = this.monitor_name;
            monitor_data.monitor_host = this.monitor_host;
            monitor_data.monitor_port = this.monitor_port;
            var data = JSON.stringify(monitor_data);           
            this.$http({url: `${process.env.VUE_APP_EXTERNAL_API}/api/monitor/edit/`, 
                data: data, 
                method: 'POST' 
            })
            .then(() => {
                this.$http({url: `${process.env.VUE_APP_EXTERNAL_API}/api/monitor/view/`,
                    method: 'POST',
                    data: data, 
                })
                .then(response => {
                    this.monitor = JSON.parse(JSON.stringify(response.data.monitor));
                    this.monitor_name = this.monitor.monitor_name;
                    this.monitor_host = this.monitor.monitor_host;
                    this.monitor_port = this.monitor.monitor_port;
                })
                .catch(error => {
                    return error;
                })
                this.edit_monitor_success = true, this.edit_monitor_error = false;
            })
            .catch(error => {
                this.edit_monitor_success = false;
                this.edit_monitor_error = error;
            })       
        },  
        restoreCommands: function() {
            let restore_data = {}
            restore_data.monitor_id = this.monitor_id;
            restore_data.restore_host = this.restore_host;
            restore_data.restore_port = this.restore_port;
            restore_data.restore_username = this.restore_username;
            restore_data.restore_password = this.restore_password;
            restore_data.restore_commands = this.restore_commands;
            var data = JSON.stringify(restore_data);     
            this.$http({url: `${process.env.VUE_APP_EXTERNAL_API}/api/restore/edit/`, 
                data: data, 
                method: 'POST' 
            })
            .then(() => {
                this.$http({url: `${process.env.VUE_APP_EXTERNAL_API}/api/monitor/view/`,
                    method: 'POST',
                    data: data, 
                })
                .then(response => {
                    console.log(response)
                    this.monitor = JSON.parse(JSON.stringify(response.data.monitor));
                    this.monitor_name = this.monitor.monitor_name;
                    this.monitor_host = this.monitor.monitor_host;
                    this.monitor_port = this.monitor.monitor_port;
                })
                .catch(error => {
                    return error;
                })
                this.edit_restore_success = true, this.edit_restore_error = false;
            })
            .catch(error => {
                this.edit_restore_success = false;
                this.edit_restore_error = error;
            })       
        },  
        deleteMonitor: function() {
            Swal.fire({
                    title: 'Do you really want to delete the monitor?',
                    showDenyButton: true,
                    confirmButtonText: 'Да',
                    denyButtonText: 'Нет',
                }).then((result) => {
                if (result.isConfirmed) {
                    var data = { "monitor_id": this.monitor_id };
                    this.$http({
                        method: 'POST',
                        url: `${process.env.VUE_APP_EXTERNAL_API}/api/monitor/delete/`,
                        data: data, 
                        
                    }).then((response) => {
                        this.change_name_success = JSON.parse(JSON.stringify(response.data.message));
                    })
                    .catch(error => {
                        if (error.response.data == 'Invalid request.') {
                            return this.change_name_error = error.response.data;
                        }
                    }) 

                    Swal.fire({
                        title: 'The monitor was successfully deleted',
                        text: 'Go to the monitors list.',
                        icon: 'success',
                    })
                    .then(() => this.$router.push('/monitor/list'))
                    .catch(err => console.log(err))  
                } 
            })         
        },
        reset_api_secret_key: function() {
            this.$http({url: `${process.env.VUE_APP_EXTERNAL_API}user-profile/user-profile-reset-api-key/`, 
                data: data, 
                method: 'POST' 
            })
            .then(() => {
                this.user_secret_api_key = JSON.parse(JSON.stringify(response.data.secret_api_key));
            })
            .catch(error => {
                console.log(response);
            })
        }      
    },
    mounted() {
        let monitor_id = this.$route.params.id
        var data = JSON.stringify({ monitor_id });

        this.$http({url: `${process.env.VUE_APP_EXTERNAL_API}/api/monitor/view/`,
            method: 'POST',
            data: data, 
        })
        .then(response => {
            this.monitor = JSON.parse(JSON.stringify(response.data.monitor));
            this.monitor_name = this.monitor.monitor_name;
            this.monitor_host = this.monitor.monitor_host;
            this.monitor_port = this.monitor.monitor_port;
            this.restore_host = this.monitor.restore_host;
            this.restore_port = this.monitor.restore_port;
            this.restore_username = this.monitor.restore_username;
            this.restore_password = this.monitor.restore_password;
            this.restore_commands = this.monitor.restore_commands;
        })
        .catch(error => {
            return error;
        })

        this.$http({url: `${process.env.VUE_APP_EXTERNAL_API}/api/monitor/activity/`,
            method: 'POST',
            data: data, 
        })
        .then(response => {
            this.monitor_activities = JSON.parse(JSON.stringify(response.data.monitor_activities));
        })
        .catch(error => {
            console.log(error);
        })

        this.$http({url: `${process.env.VUE_APP_EXTERNAL_API}/api/restore/activity/`,
            method: 'POST',
            data: data, 
        })
        .then(response => {
            this.restore_activities = JSON.parse(JSON.stringify(response.data.restore_activities));
        })
        .catch(error => {
            return error;
        })

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
            this.user_secret_api_key = JSON.parse(JSON.stringify(response.data.secret_api_key));
        })
        .catch(error => {
            return error;
        })
    },  
}
</script>



