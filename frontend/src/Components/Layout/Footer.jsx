import "./Footer.scss";
import playStore from "../../Images/play_store.svg";
import appleStore from "../../Images/apple_store.svg";
import portfolio from "../../Images/portfolio.svg";
import mail from "../../Images/mail.svg";
import linkedin from "../../Images/linkedin.svg";
import github from "../../Images/github.svg";
import instagram from "../../Images/instagram.svg";

export default function Footer() {
	return (
		<footer className="footer">
			<section className="footer_left flex">
				<p className="footer_left__title">DOWNLOAD OUR APP</p>
				<p className="footer_left__description">Download App for Android and IOS mobile phone</p>
				<img src={playStore} className="footer_left__images" alt="play store" />
				<img src={appleStore} className="footer_left__images" alt="apple store" />
			</section>
			<section className="footer_mid flex">
				<p className="footer_mid__branding">PACIFIO</p>
				<p className="footer_mid__description">High quality product is our first priority</p>
				<p className="footer_mid__copyright">Copyrights 2022 &copy; angkushsahu</p>
			</section>
			<section className="flex footer_right">
				<p className="footer_right__title">A project by - Angkush Sahu</p>
				<p className="footer_right__portfolio flex">
					Portfolio
					<a href="https://angkush.vercel.app" target="_blank" rel="noopener noreferrer">
						<img src={portfolio} className="footer_right__image" alt="developer's portfolio" />
					</a>
				</p>
				<div className="footer_right__links">
					<a href="mailto:angkushsahu2502@gmail.com" target="_blank" rel="noopener noreferrer">
						<img src={mail} alt="e-mail" />
					</a>
					<a href="https://www.linkedin.com/in/angkush-sahu-0409311bb" target="_blank" rel="noopener noreferrer">
						<img src={linkedin} alt="linked-in" />
					</a>
					<a href="https://github.com/angkushsahu" target="_blank" rel="noopener noreferrer">
						<img src={github} alt="github" />
					</a>
					<a href="https://www.instagram.com/angkush_sahu" target="_blank" rel="noopener noreferrer">
						<img src={instagram} alt="instagram" />
					</a>
				</div>
			</section>
		</footer>
	);
}
