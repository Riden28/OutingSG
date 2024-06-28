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
        
            <!-- Get user's email form -->
            <div class="column right">
                <p class='pageTitle'>Forget Password</p>

                <div class='emailSent' v-if="emailSent">
                    <p>
                        <img src="../assets/icons/tick.png" class="smallIcon">
                        We've sent an email to {{ userEmail }}. Click the link in the email to reset your password.
                    </p>
                </div>
                <hr>

                <form id="forgetPw">
                    <!-- Email -->
                    <div class="middleInput">
                        <p>
                            <label for="email"><img src='../assets/icons/email.png' class="smallIcon"> Email</label>
                            <br><input type="email" 
                                        id='email'
                                        placeholder="Enter your email"
                                        required 
                                        v-model="email"
                                        style='width: 80%;'>
                            <br>
                        </p>
                    </div>


                    
                    <center>
                    <br><button style="width:80%;">Send a password reset link</button>

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
        name: 'forgetPw',
        components: {
            NavBar
        },
        data() {
            return {
                emailSent: false,
            };
        },
    };

</script>