<template>
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-2">
            <h1 class="h5 mb-0 text-gray-800">Dashboard</h1>                 
        </div>
        <div class="row mt-4">
            <div class="col-xl-6 col-md-6 mb-4">
                <div class="card border-bottom-success shadow h-100 py-2 no-border-radius">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Monitoring</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                    <router-link :to="{ name: 'MonitorList'}" class="collapse-item">Monitor list</router-link>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fa fa-cog fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-md-6 mb-4">
                <div class="card border-bottom-warning shadow h-100 py-2 no-border-radius">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Profile</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                    <router-link :to="{ name: 'UserProfile'}" class="collapse-item">Add telegram notifications</router-link>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="far fa-user fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row d-none"> <!-- TODO graphics-->
            <div class="col-xl-8 col-lg-7">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Monitoring</h6>
                    </div>
                    <div class="card-body">
                        <div class="chart-area"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                            <canvas id="myAreaChart" style="display: block; width: 1037px; height: 320px;" width="1037" height="320" class="chartjs-render-monitor"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-5">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Availability</h6>
                    </div>
                    <div class="card-body">
                        <div class="chart-pie pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                            <canvas id="myPieChart" width="486" height="245" style="display: block; width: 486px; height: 245px;" class="chartjs-render-monitor"></canvas>
                        </div>
                        <div class="mt-4 text-center small"> 
                            <span class="mr-2">
                                <i class="fas fa-circle text-primary"></i> &lt; 1 sec
                            </span>
                            <span class="mr-2">
                                <i class="fas fa-circle text-success"></i> 2-5 sec
                            </span>
                            <span class="mr-2">
                                <i class="fas fa-circle text-info"></i> &gt; 5 sec
                            </span>
                            <span class="mr-2">
                                <i class="fas fa-circle text-danger"></i> Failure
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row" v-if="monitors.length > 0">
            <div class="col-lg-12 mb-4">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Monitors</h6>
                    </div>
                    <div class="card-body p-4">
                        <div class="row">
                            <div v-for="monitor in monitors" :key="monitor.monitor_id" class="col-xs-12 col-md-3 mb-2">
                                <div class="card bg-success text-white shadow">
                                    <div class="card-body">
                                        <router-link :to="{ name: 'MonitorView', params: { id: monitor.monitor_id }}" style="color:#fff">
                                            {{ monitor.monitor_name }}
                                        </router-link>   
                                        <div class="text-white-50 small">{{ monitor.monitor_host }}:{{ monitor.monitor_port }}</div>
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

export default {
    name: "Dashboard",
    metaInfo: {
      title: 'Dashboard',
    },
    data() {
        return {
            monitors : [],
            statistic : [],
        }
    },

    mounted() {

        Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#858796';

        var linechart_data = {
            labels: ["12:00", "12:01", "12:02", "12:03", "12:04", "12:05"],
            datasets: [
                {
                label: "Монитор",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: [5000, 6000, 5000, 5012, 5014, 5025],
                }
            ],
        }
        // Area Chart Example
        var ctx = document.getElementById("myAreaChart");
        var myLineChart = new Chart(ctx, {
        type: 'line',
        data: linechart_data ,
        options: {
            maintainAspectRatio: false,
            layout: {
            padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0
            }
            },
            scales: {
            xAxes: [{
                time: {
                unit: 'date'
                },
                gridLines: {
                display: false,
                drawBorder: false
                },
                ticks: {
                maxTicksLimit: 7
                }
            }],
            yAxes: [{
                ticks: {
                maxTicksLimit: 5,
                padding: 10,
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                    return '' + value;
                }
                },
                gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
                }
            }],
            },
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
                callbacks: {
                    label: function(tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel + ': ' + tooltipItem.yLabel;
                    }
                }
            }
        }
        });

        // Pie Chart Example
        var ctx = document.getElementById("myPieChart");
        var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["< 1 сек", "2-5 сек", "> 5 сек", "Отказ"],
            datasets: [{
            data: [55, 10, 15, 10],
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#e74a3b'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', "#e83e8c"],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
            },
            legend: {
            display: false
            },
            cutoutPercentage: 80,
        },
        });

        var ws = new WebSocket(`${process.env.VUE_APP_EXTERNAL_GATE_SOCKET}channel/ws?channel_name=user_id__` + this.authUser.id);
        ws.onopen = function(event) {
            console.log("WebSocket connected");
            console.log(event);
        };

        ws.onmessage = function(event) {
            let stat = $.parseJSON(event.data);;
            linechart_data.labels.shift();
            linechart_data.labels.push(stat["monitor_request_time"]);
            linechart_data.datasets[0].data.shift()
            linechart_data.datasets[0].data.push(stat["monitor_response_time"]);
            console.log(linechart_data.labels)
            console.log(linechart_data.datasets[0].data)
            myLineChart.update(); 

        };

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

    methods: {

    },
	computed: {
		isLoggedIn: function() {
			return this.$store.getters.isLoggedIn
		},
		authUser: function() {
			return this.$store.getters.authUser
		}
	},
}
</script>
