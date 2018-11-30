import * as React from 'react';

class Modal extends React.PureComponent<{ show: boolean, onClose(e: any): any }> {
    backdropStyle: any = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 50
    };
    modalStyle: any = {
        backgroundColor: '#FFF',
        borderRadius: 5,
        maxWidth: 500,
        minHeight: 100,
        margin: '0 auto',
        padding: 30,
        position: 'relative'
    };
    footerStyle: any = {
        position: 'absolute',
        bottom: 20
    };

    onClose = (e: React.FormEvent<Element>) =>
        this.props.onClose && this.props.onClose(e);


    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div style={this.backdropStyle}>
                <div style={this.modalStyle}>
                    {this.props.children}
                    <div style={this.footerStyle}>
                        <button onClick={(e) => {
                            this.onClose(e)
                        }}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;