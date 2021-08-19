import './Notification.css'

function Notification(props){

    const {title, message, handleOkClicked} = props
    
    return(
        <div className='notification'>
            <h2>{title}</h2>
            <h3>{message}</h3>

            <button onClick={handleOkClicked}>Ok</button>
        </div>
    )
}


export default Notification