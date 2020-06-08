const Footer = () => {
    return `
    <div class="container__footer">
        <div class ="footer-container">
            <p class="footer-container__txtlogo">AVi</p>
            <div class ="footer-container__text">
                <p class="footer-container__text__children">Link One</p>
                <p class="footer-container__text__children">Link Two</p>
                <p class="footer-container__text__children">Link Three</p>
                <p class="footer-container__text__children">Link Four</p>
            </div>
            <div class="footer-container__media">
                <a href="#" class="footer-container__media__buttons" > 
                    <img src="../images/twitter.png" alt="twitter icon">
                </a>
                <a href="#" class="footer-container__media__buttons"> 
                    <img  src="../images/instagram.png" alt="instagram icon">
                </a>
                <a href="#" class="footer-container__media__buttons" > 
                    <img src="../images/facebook.png" alt="facebook icon">
                </a>
            </div>
        </div>
    </div>
    `;

};

const addEventsListeners = () => {};

export default Footer;
export { addEventsListeners };
