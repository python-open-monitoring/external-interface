<template>
    <div class="container-fluid">
        <div class="modal fade" id="MonitorModal" tabindex="-1" aria-labelledby="MonitorModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form id="MonitorList__add_form" action="" @submit.prevent="addMonitor">
                        <div class="modal-header">
                            <h5 class="modal-title">Add monitor</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <input type="text" class="form-control" id="MonitorList__add_form__name" v-model="add_monitor_name" placeholder="Name">
                                <div v-if="!$v.add_monitor_name.minLength"><font size="2">The name must contain a minimum {{ $v.add_monitor_name.$params.minLength.min }} characters</font></div>
                                <div v-if="!$v.add_monitor_name.maxLength"><font size="2">The name must contain a maximum {{ $v.add_monitor_name.$params.minLength.max }} characters</font></div>
                                <div v-if="!$v.add_monitor_name.required"><font size="2">Name is required</font></div>                                 
                            </div> 
                            <div class="form-group">
                                <input type="text" class="form-control" id="MonitorList__add_form__host" v-model="add_monitor_host" placeholder="Host"> 
                                <div v-if="!$v.add_monitor_host.minLength"><font size="2">The host must contain a minimum {{ $v.add_monitor_host.$params.minLength.min }} characters</font></div>
                                <div v-if="!$v.add_monitor_host.maxLength"><font size="2">The host must contain a maximum {{ $v.add_monitor_host.$params.minLength.max }} characters</font></div>
                                <div v-if="!$v.add_monitor_host.required"><font size="2">Host is required</font></div>
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" id="MonitorList__add_form__port" v-model="add_monitor_port" placeholder="Port"> 
                                <div v-if="!$v.add_monitor_port.minLength"><font size="2">The port must contain a minimum {{ $v.add_monitor_port.$params.minLength.min }} characters</font></div>
                                <div v-if="!$v.add_monitor_port.maxLength"><font size="2">The port must contain a maximum {{ $v.add_monitor_port.$params.minLength.max }} characters</font></div>
                                <div v-if="!$v.add_monitor_port.validValue"><font size="2">The port can only contain numbers</font></div>
                                <div v-if="!$v.add_monitor_port.required"><font size="2">Port is required</font></div>
                            </div>             
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" @click="addMonitor" :disabled="$v.$invalid">Add</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="d-sm-flex align-items-center justify-content-between mb-2">
            <h1 class="h5 mb-4 text-gray-800">Monitor list</h1>                 
        </div>
        <div class="card shadow">
            <div class="card-header py-3">
                <a href="#" class="btn btn-success btn-icon-split" data-toggle="modal" data-target="#MonitorModal">
                    <span class="icon text-white-50">
                        <i class="fas fa-plus"></i>
                    </span>
                    <span class="text">Add monitor</span>
                </a>
            </div>
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" style="margin-bottom: 0px !important">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Host</th>
                            <th>Port</th>             
                            <th>Status</th>
                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="monitor in monitors" :key="monitor.monitor_id">
                            <td>{{ monitor.monitor_id }}</td>
                            <td>
                                <router-link :to="{ name: 'MonitorView', params: { id: monitor.monitor_id }}">
                                    {{ monitor.monitor_name }}
                                </router-link>                                    
                            </td>
                            <td>
                                {{ monitor.monitor_host }}
                            </td>
                            <td>
                                {{ monitor.monitor_port }}
                            </td>
                            <td>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div v-if="monitor.monitor_active == 'yes'">
                                            <span class="badge badge-success"><i class="fa fa-play"></i> Start</span>                                 
                                        </div>
                                        <div v-if="monitor.monitor_active == 'no'">
                                            <span class="badge badge-info"><i class="fa fa-stop"></i> Stop</span>                                 
                                        </div>
                                        <div v-if="monitor.monitor_last_monitoring_date"><small>Last monitoring: {{ monitor.monitor_last_monitoring_date }}</small></div>
                                    </div>
                                    <div class="col-md-6">                                     
                                        <div v-if="monitor.monitor_last_connection_establish == 'yes'">
                                            <span style="color:green;font-size:14px;"><i class="fa fa-check"></i> Available</span> 
                                            <br>
                                            <small>Last response time: {{ monitor.monitor_last_response_time }} seconds</small>                               
                                        </div>
                                        <div v-if="monitor.monitor_last_connection_establish == 'no'">
                                            <span style="color:red;font-size:14px;"><i class="fa fa-exclamation-triangle"></i> Not available</span>                          
                                        </div> 
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="player text-center">
                                    <button type="button" id="button_play" class="btn btn-success btn-sm" title="Start monitor" @click="startMonitor(monitor.monitor_id)">
                                        <i class="fa fa-play"></i>
                                    </button>
                                    &nbsp;
                                    <button type="button" id="button_stop" class="btn btn-secondary btn-sm" title="Stop monitor" @click="stopMonitor(monitor.monitor_id)">
                                        <i class="fa fa-stop"></i>
                                    </button>
                                </div>                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import Swal from 'sweetalert2';

export default {
    name: 'MonitorList',
    data() {
        return {
            monitors : {},
            add_monitor_name : "",
            add_monitor_host : "",
            add_monitor_port : "",
            timer: ""
        }
    },
    validations: {
        add_monitor_name: {
            required,
            minLength: minLength(1),
            maxLength: maxLength(30),
        },
        add_monitor_host: {
            required,
            minLength: minLength(2),
            maxLength: maxLength(50),
        },
        add_monitor_port: {
            required,
            minLength: minLength(1),
            maxLength: maxLength(5),
            validValue: val => /^\d+$/.test(val),
        }
    },    
    methods: {
        addMonitor() {
            let monitor_name = this.add_monitor_name;
            let monitor_host = this.add_monitor_host;
            let monitor_port = this.add_monitor_port;
            var data = JSON.stringify({ monitor_name, monitor_host, monitor_port });
            this.$http({
                method: 'POST',
                url: `${process.env.VUE_APP_EXTERNAL_API}/api/monitor/create/`,
                headers: { 'Content-Type': 'text/plain', },
                data: data, 
            })
            .then((response) => {
                if (response.data.status == 'added') {
                    Swal.fire({
                        title: 'New monitor successfully added',
                        text: 'And it has already appeared in the general list of monitors. To start the monitor, click the "Play" button in the general monitor list.',
                        icon: 'success',
                    });
                    let new_monitor = response.data.monitor;
                    this.monitors.push(new_monitor);            
                } 
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong. Please make sure that all the data is entered correctly.',
                    icon: 'error',
                })
            })
        },

        startMonitor(monitor_id) {

            var data = JSON.stringify({ monitor_id });
            this.$http({
                method: 'POST',
                url: `${process.env.VUE_APP_EXTERNAL_API}/api/monitor/start/`,
                headers: { 'Content-Type': 'text/plain', },
                data: data, 
            })
            .then((response) => {
                if (response.status == 200) {
                    this.$http({url: `${process.env.VUE_APP_EXTERNAL_API}/api/monitor/list/`,
                        method: 'GET' 
                    })
                    .then(response => {
                        this.monitors = JSON.parse(JSON.stringify(response.data.monitors));
                    })
                    .catch(error => {
                        return error;
                    })        
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong.',
                    icon: 'error',
                })
            })
        },
        stopMonitor(monitor_id) {
            var data = JSON.stringify({ monitor_id });
            this.$http({
                method: 'POST',
                url: `${process.env.VUE_APP_EXTERNAL_API}/api/monitor/stop/`,
                headers: { 'Content-Type': 'text/plain', },
                data: data, 
            })
            .then((response) => {
                if (response.status == 200) {
                    this.$http({url: `${process.env.VUE_APP_EXTERNAL_API}/api/monitor/list/`,
                        method: 'GET' 
                    })
                    .then(response => {
                        this.monitors = JSON.parse(JSON.stringify(response.data.monitors));
                    })
                    .catch(error => {
                        return error;
                    })        
                }
            })
            .catch(error => {
                console.log(error)
                Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong.',
                    icon: 'error',
                })
            })
        },
        fetchMonitorList () {
            this.$http({url: `${process.env.VUE_APP_EXTERNAL_API}/api/monitor/list/`,
                method: 'GET' 
            })
            .then(response => {
                this.monitors = JSON.parse(JSON.stringify(response.data.monitors));
            })
            .catch(error => {
                return error;
            })
        },
    },
    mounted() {
        this.$http({url: `${process.env.VUE_APP_EXTERNAL_API}/api/monitor/list/`,
            method: 'GET' 
        })
        .then(response => {
            this.monitors = JSON.parse(JSON.stringify(response.data.monitors));
        })
        .catch(error => {
            return error;
        })
        setInterval(this.fetchMonitorList, 60000);
    },
}
</script>