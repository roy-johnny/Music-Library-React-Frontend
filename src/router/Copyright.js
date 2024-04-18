import React from "react";
import Container from "@mui/material/Container";
import {Typography} from "@mui/material";

export default function Copyright(props) {
    React.useEffect(() => {
        props.setLoading(false);
    }, []);

    return (
        <main>
            <Container sx={{py: 2}} maxWidth="lg">
                <h3>Report Copyright Infringement</h3>
                <Typography>If you identify any tracks on v-sing.com that you believe infringe your copyright, you can let us know using the method explained on this page. Before making a report concerning any possible copyright infringement, please consider the following:</Typography>
                <ul className="list">
                    <li>Please only report infringement of your own copyright, or the copyright of someone you are authorized to represent. If you believe that someone else’s copyright is being infringed, please tell them and direct them to this page.</li>
                    <li>Please do not report copyright infringement unless you have a genuine claim. If you make groundless or malicious reports of copyright infringement, you risk having your account suspended or terminated. You may also be liable for damages (including costs and legal fees) incurred by v-sing.com, the person whose tracks you report and/or any copyright owner or authorized licensee, as the result of tracks being removed in reliance on your notice.</li>
                    <li>Please provide detail. The more information we have regarding your claim, the quicker we can process your notice.</li>
                </ul>
                <Typography>You can report copyright infringement on v-sing.com via email.</Typography>
                <h3>By writing to us</h3>
                <Typography>To report possible copyright infringement, please do so in writing, making sure that you include the following information:</Typography>
                <ul className="list">
                    <li>a statement that you have identified tracks on v-sing.com which infringe your copyright or the copyright of a third party on whose behalf you are entitled to act;</li>
                    <li>a description of the copyright work(s) that you claim have been infringed;</li>
                    <li>a description of the sound(s) that you claim are infringing and the v-sing.com URL(s) where such tracks can be located;</li>
                    <li>your full name, address and telephone number, a valid email address at which you can be contacted, and your v-sing.com username if you have one;</li>
                    <li>a statement by you that you have a good faith belief that the disputed use of the material is not authorized by the copyright owner, its agent, or the law;</li>
                    <li>a statement by you that the information in your notice is accurate and that you are authorized to act on behalf of the owner of the exclusive right that is allegedly infringed;</li>
                </ul>
                <Typography>In addition, if you wish for your notice to be considered as a notice pursuant to the United States Digital Millennium Copyright Act 17 U.S.C. §512(c), please also include the following:</Typography>
                <ul className="list">
                    <li>with respect to your statement that you are authorized to act on behalf of the owner of the exclusive right that is allegedly infringed, confirmation that such statement is made under penalty of perjury; and</li>
                    <li>your electronic or physical signature (which may be a scanned copy).</li>
                </ul>
                <Typography>Your notice should be sent to us by email to admin@v-sing.com</Typography>
            </Container>
        </main>
    );
}