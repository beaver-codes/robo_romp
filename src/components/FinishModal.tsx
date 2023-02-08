import { Modal } from "react-bootstrap";

interface Props {
    show: boolean
    onHide: () => void
}
function FinishModal(props: Props) {
    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>🎉 Congratulation! 🎉</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>You beat the game</p>
            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-success" onClick={props.onHide}>Restart</button>
            </Modal.Footer>
        </Modal>
    );
}

export default FinishModal;