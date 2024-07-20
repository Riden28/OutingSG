<template>
    <NavBar />

    <div class="content">
        <h2><b>Terms and Conditions</b></h2>
        <h5><i>For OutingSG</i></h5>
        <h6 style='text-align: left; color: grey'>Last Updated: 15 July 2024</h6>

        <div class='tnc'>
            <pre>
                <h3><b>Welcome to OutingSG!</b></h3>

                These terms and conditions outline the rules and regulations for the use of OutingSG's Website, located at www.outingsg.com.

                By accessing this website, we assume you accept these terms and conditions. Do not continue to use OutingSG if you do not agree to take all of the terms and conditions stated on this page.

                <hr>
                <b>Cookies:</b>
                We employ the use of cookies. By accessing OutingSG, you agreed to use cookies in agreement with OutingSG's Privacy Policy.
                Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.

                <b>License:</b>
                Unless otherwise stated, OutingSG and/or its licensors own the intellectual property rights for all material on OutingSG. All intellectual property rights are reserved. You may access this from OutingSG for your own personal use subjected to restrictions set in these terms and conditions.

                You must not:
                <ul>
                    <li>Republish material from OutingSG</li>
                    <li>Sell, rent, or sub-license material from OutingSG</li>
                    <li>Reproduce, duplicate or copy material from OutingSG</li>
                    <li>Redistribute content from OutingSG</li>
                    <li>This Agreement shall begin on the date hereof.</li>
                </ul>

                <b>User Comments:</b>

                Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. OutingSG does not filter, edit, publish, or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of OutingSG, its agents, and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, OutingSG shall not be liable for the Comments or for any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
                OutingSG reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive, or causes breach of these Terms and Conditions.
                
                You warrant and represent that:
                <ul>
                    <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                    <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent, or trademark of any third party;</li>
                    <li>The Comments do not contain any defamatory, libelous, offensive, indecent, or otherwise unlawful material which is an invasion of privacy;</li>
                    <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                    <li>You hereby grant OutingSG a non-exclusive license to use, reproduce, edit, and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats, or media.</li>
                </ul>
            </pre>
        </div>
    </div>
    
    <Footer/>
   
</template>

<script>
    import '../assets/main.css';
    import '../router/bootstrap.js';
    import NavBar from '@/components/NavBar.vue';
    import Footer from '@/components/Footer.vue';

    export default {
        name: 'profile',
        components: {
            NavBar, Footer
        },
        mounted(){
            window.scrollTo(0, 0);
        }
    };
</script>

<style scoped>
.content {
    margin-top: 50px;
    text-align: center;
    padding: 50px;
}

.tnc {
    background-color: #bfd3e9;
    text-align:left;
    
}

pre {
    white-space: pre-line;
}

ul {
    margin-left: 30px;
}
li {
    margin-top: -15px;
}

hr {
    border-color: black;
}
</style>