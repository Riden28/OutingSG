<template>
  
    <NavBar />

    <div class="row">
        <!-- left side of the login page -->
        <div class='rowBackground'>
            <div class="column left">
                <h2>Welcome to</h2>
                <p><img src='../assets/Logo/OutingSG_white.png'></p>
                <p>Singapore, a bustling city-state renowned for its vibrant culture and diverse entertainment options, lacks a comprehensive and user-friendly platform that efficiently recommends hangout spots, upcoming events and festivals, and unique date activities. Locals often struggle to discover novel and exciting experiences within their city, leading to repetitive outings and missed opportunities to explore Singapore's dynamic social scene.</p>
                <br><h4>But with OutingSG, we can solve this problem.</h4>
            </div>
        
            <!-- Reset Password Form -->
            <div class="column right">
                <p class='pageTitle'>Reset Password</p>
                <hr>
                <form id="resetPw">

                    <!-- Password and New Password -->
                    <div class="formRow">
                        <!-- Password -->
                        <div class="formColumn">
                            <p>
                                <label for="password"><img src='../assets/icons/password.png' class="smallIcon"> Password</label>
                                <br><input type="password" 
                                            id='password'
                                            placeholder="Enter your password"
                                            required 
                                            v-model="password">
                                <br>
                            </p>
                        </div>

                        <!-- New Password -->
                        <div class="formColumn">
                            <p>
                                <label for="newPassword"><img src='../assets/icons/password.png' class="smallIcon"> New Password</label>
                                <br><input type="password" 
                                            id='newPassword'
                                            placeholder="Enter your new password"
                                            required 
                                            v-model="newPassword">
                            </p>
                        </div>
                    </div>

                    <center>
                    <br><button style="width:80%;">Confirm Change Password</button>

                    <!-- click to go to login page -->
                    <p style="margin-top: 10px;" class="greyText">
                        Back to <router-link to='/login' style="color: var(--secondary) !important;">login</router-link>
                    </p>
                    </center>
                    
                </form>
            </div>
        </div>
    </div>

</template>

<script>
    import '../assets/main.css';
    import '../assets/bootstrap.css';
    import '../router/bootstrap.js';
    import '../assets/loginRegister.css';

    import NavBar from '@/components/NavBar.vue';

    export default {
        name: 'resetPw',
        components: {
            NavBar
        },
    };
</script>