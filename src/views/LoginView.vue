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
        
            <!-- User login form -->
            <div class="column right">
                <p class='pageTitle'>User Login</p>
                <hr>
                <form id="login">

                    <!-- Username and Password -->
                    <div class="formRow">
                        <!-- Username -->
                        <div class="formColumn">
                            <p>
                                <label for="username"><img src='../assets/icons/username.png' class="smallIcon"> Username</label>
                                <br><input type="text" 
                                            id='username'
                                            placeholder="Enter your username"
                                            required 
                                            v-model="username">
                                <br>
                            </p>
                        </div>

                        <!-- Password -->
                        <div class="formColumn">
                            <p>
                                <label for="password"><img src='../assets/icons/password.png' class="smallIcon"> Password</label>
                                <br><input type="password" 
                                            id='password'
                                            placeholder="Enter your password"
                                            required 
                                            v-model="password">
                            </p>
                        </div>
                    </div>

                    <!-- Remember Me -->
                    <div class="formRow" style="margin-top: -10px;">
                        <br><input type="checkbox" 
                        id='rememberme'
                        v-model="rememberme">
                        <label for="rememberme" style="font-weight: 100;">&nbsp;Remember Me</label>
                    </div>

                    
                    <center>
                    <br><button style="width:80%;">Login</button>

                    <!-- click to go to register or forget pw page -->
                    <p style="margin-top: 10px;" class="greyText">
                        <router-link to='/forgetPw' id="forgetPw">Forget Password?</router-link><br>
                        Are you a new user? Register <router-link to='/register' style="color: var(--secondary) !important;">here</router-link>
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
        name: 'login',
        components: {
            NavBar
        },
    };
</script>