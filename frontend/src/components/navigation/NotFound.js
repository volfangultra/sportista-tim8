import "./NotFound.css";
import { Button } from '@mui/material';

function NotFound() {

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="notFound-page">
            <main>
                <h1 className="h1-404">404</h1>
                <h2 className="h2-404">UH OH! You're lost.</h2>
                <p>The page you are looking for does not exist. How you got here is a mystery.</p>
                <p>But you can click the button below to go back.</p>
                <Button className="custom-button mt-3" onClick={goBack}>GO BACK</Button>
            </main>
        </div>
    );
}

export default NotFound;