<template>
    <NavBar />

    <div class="content">

        <h3 class="titles">Settings</h3>

        <center>
            <div class="settingsContent">
                <v-row>
                    <v-col>
                        <label for="oldPassword"><img src='../assets/icons/password.png' class="smallIcon"> Change Password</label>
                        <br><input type="password" 
                                    id='oldPassword'
                                    placeholder="Enter your old password"
                                    required 
                                    v-model="oldPassword">
                        <br><input type="password" 
                                    id='newPassword'
                                    placeholder="Enter your new password"
                                    required 
                                    v-model="newPassword">
                        <br><input type="password" 
                                    id='retypeNewPassword'
                                    placeholder="Re-type your new password"
                                    required 
                                    v-model="retypeNewPassword">
                    </v-col>
                    
                    <v-col>
                        <label for="email"><img src='../assets/icons/email.png' class="smallIcon"> Change Email</label>
                        <br><input type="email" 
                                    id='email'
                                    placeholder="Enter your new email"
                                    required 
                                    v-model="email">

                        <br><br>
                        <label for="mobileNumber"><img src='../assets/icons/mobileNumber.png' class="smallIcon"> Change Mobile Number</label>
                        <br><input type="tel" 
                                    id='mobileNumber'
                                    placeholder="Enter your new mobile number"
                                    required 
                                    v-model="mobileNumber">
                    </v-col>
                </v-row>
            
                <!-- Cancel and Save buttons -->
                <v-row>
                    <v-col>
                        <router-link to="/profile"><button class="cancelButton">Cancel</button></router-link>
                    </v-col>
                    <v-col>
                        <router-link to="/profile"><button>Save Changes</button></router-link>
                    </v-col>
                    <br>
                    <hr>
                    <button class='logOut' @click='logOut()'>Log Out</button>
                </v-row>

            </div>
        </center>
    </div>
   
</template>

<script>
    import '../assets/main.css';
    import '../assets/bootstrap.css';
    import '../router/bootstrap.js';

    import NavBar from '@/components/NavBar.vue';

    export default {
        name: 'profile',
        components: {
            NavBar
        },
        data() {
            return {
                username: "Username here",
                bio: "yadyaydgwygwkgnlwrkngkaerngjkrejk",
                categoryPreferences: "F&B, Education, Wellness",
                profilePicture: "/src/assets/icons/profile.png",
            };
        },
        methods: {
            logOut(){
                
            }
        }
    };
</script>

<style scoped>
.content {
    margin-top: 60px;
}

.profilePic {
    width: 100%;
    max-width: 250px;
    height: auto;
    margin-top: -50px;
}

.titles{
    font-weight: 800;
    font-size: 30px;
    text-align: center;
    padding-top: 50px;
}

.settingsContent {
    padding: 30px 250px 30px 250px;
}

@media screen and (max-width: 600px) {
    .settingsContent {
        padding: 30px 30px 30px 30px;
    }
}

.settingsContent h4,h5 {
    font-weight: 800;
}

.icons {
    width: 100px;
}

v-col {
    text-align: center;
}

button {
    padding: 10px 50px 10px 50px;
    background-color: var(--secondary);
    border: solid var(--secondary);
    border-radius: 5px; 
    color: white;
    margin-top: 10px;
}

button:hover {
    background-color: var(--transparent) !important;
    color: black !important;
    border: solid var(--secondary);
}

.cancelButton {
    background-color: var(--transparent) !important;
    color: black !important;
    border: solid var(--secondary);
}

.cancelButton:hover {
    padding: 10px 50px 10px 50px;
    background-color: var(--secondary) !important;
    border: solid var(--secondary);
    border-radius: 5px; 
    color: white !important;
    margin-top: 10px;
}

.editProfile {
    float:right;
    margin-top: -40px;
}

.settings {
    float: right;
    width: 40px;
    margin: 15px 15px 0px 0px;
}

label {
    text-align: left !important;
}

input {
    background: #f5f5f5;
    margin: 5px;
    width: 300px;
}

.logOut{
    background-color: var(--secondary);
    border: solid var(--secondary);
    color: white !important;
}

.logOut:hover {
    background-color: var(--transparent);
    border: solid var(--secondary);
    color: black !important;
}
</style>