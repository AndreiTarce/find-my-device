import { Container, Image } from "react-bootstrap";
import errorIllustration from "../../assets/error.svg";
import "./Error.css";

const Error = () => {
    return (
        <Container>
            <div className="d-flex justify-content-center flex-wrap">
                <h2 className="pt-5">There was an error loading this page. Please try again later.</h2>
                <Image src={errorIllustration} className="error-illustration mt-5" />
            </div>
        </Container>
    );
};

export default Error;
