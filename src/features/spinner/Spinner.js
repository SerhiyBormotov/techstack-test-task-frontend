import './spinner.scss';

const Spinner = () => {
    return(
        <div className="spinner-wrapper">
            <div className="spinner-rolling">
                <div className="spinner">
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Spinner;